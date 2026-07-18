"use client";

// Phase 2, Item 3: multi-step qualification funnel, replacing the Phase 1
// single-step form. v1 depth is 3 additional steps beyond contact info
// (business type, branch count, employee count) -- a deliberate scope
// decision to not build the full 7-step funnel from the Next-Gen doc yet.
// Maps directly onto columns already reserved in `leads` for this exact
// purpose (business_type, branch_count, employee_count -- verified against
// the live schema before writing this, not assumed from memory).
//
// Calendar step (Cal.com) is wired to activate the moment
// NEXT_PUBLIC_CAL_LINK is set -- no Cal.com account/link exists yet, so
// it degrades to the existing text-only success message until then. Same
// graceful-degradation pattern as the Item 1 notification secrets.
//
// No automated confirmation email to the lead is sent in v1 -- that's a
// separate feature (would need its own Resend usage) that hasn't been
// scoped or approved. Confirmation is on-screen only for now.
import { useEffect, useRef, useState } from "react";
import { X, ChevronLeft } from "lucide-react";
import { track } from "@vercel/analytics";
import { Button } from "@/components/ui/button";
import { useLeadForm } from "@/components/lead-form-context";
import { supabase } from "@/lib/supabase";
import { CopyEmailButton } from "@/components/copy-email-button";

const FALLBACK_EMAIL = "support@trimorasystems.com";
const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK; // e.g. "trimora/demo" -- not set yet

const STEPS = ["contact", "business_type", "branches", "employees"];
const BUSINESS_TYPES = ["Salon", "Spa", "Barbershop", "Car Wash / Detailing", "Other"];

const initialFormData = {
  full_name: "",
  business_name: "",
  contact_method: "email",
  contact_value: "",
  biggest_challenge: "",
  business_type: "",
  branch_count: "",
  employee_count: "",
};

export function LeadFormModal() {
  const { isOpen, source, closeLeadForm } = useLeadForm();
  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);

  const step = STEPS[stepIndex];

  // Focus management: move focus into the dialog on open/step-change, trap
  // Tab/Shift+Tab within it, close on Escape, return focus to the trigger
  // on close, lock background scroll. Re-runs on step/status change since
  // the focusable set changes each time.
  useEffect(() => {
    if (!isOpen) return;

    triggerRef.current = document.activeElement;
    const dialogNode = dialogRef.current;
    const focusable = () => Array.from(dialogNode.querySelectorAll(FOCUSABLE_SELECTOR));

    const firstFocusable = focusable()[0];
    (firstFocusable ?? dialogNode)?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(e) {
      if (e.key === "Escape") {
        e.preventDefault();
        closeLeadForm();
        return;
      }
      if (e.key !== "Tab") return;

      const items = focusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      triggerRef.current?.focus?.();
    };
  }, [isOpen, step, status, closeLeadForm]);

  if (!isOpen) return null;

  function update(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function isStepValid() {
    if (step === "contact") {
      return formData.full_name.trim() && formData.business_name.trim() && formData.contact_value.trim();
    }
    if (step === "business_type") return Boolean(formData.business_type);
    if (step === "branches") return Number(formData.branch_count) > 0;
    if (step === "employees") return Number(formData.employee_count) > 0;
    return true;
  }

  function goNext() {
    if (!isStepValid()) return;
    if (stepIndex < STEPS.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      handleSubmit();
    }
  }

  function goBack() {
    if (stepIndex > 0) setStepIndex(stepIndex - 1);
  }

  async function handleSubmit() {
    setStatus("submitting");

    const payload = {
      full_name: formData.full_name.trim(),
      business_name: formData.business_name.trim(),
      email: formData.contact_method === "email" ? formData.contact_value.trim() : null,
      phone: formData.contact_method === "phone" ? formData.contact_value.trim() : null,
      biggest_challenge: formData.biggest_challenge.trim() || null,
      business_type: formData.business_type,
      branch_count: Number(formData.branch_count),
      employee_count: Number(formData.employee_count),
      source_page: source,
    };

    if (!supabase) {
      console.error("Supabase client not configured — cannot submit lead.");
      setStatus("error");
      track("lead_submit_failed", { source, reason: "not_configured" });
      return;
    }

    const { error } = await supabase.from("leads").insert(payload);

    if (error) {
      console.error("Lead submission failed:", error.message);
      setStatus("error");
      track("lead_submit_failed", { source });
      return;
    }

    setStatus("success");
    track("lead_submitted", {
      source,
      business_type: formData.business_type,
      branch_count: formData.branch_count,
      employee_count: formData.employee_count,
    });
  }

  function handleClose() {
    closeLeadForm();
    setStatus("idle");
    setStepIndex(0);
    setFormData(initialFormData);
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-form-heading"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={handleClose}
        className="absolute inset-0 bg-paper/80 backdrop-blur-sm"
      />

      <div
        ref={dialogRef}
        tabIndex={-1}
        className="relative w-full max-w-md rounded-lg border border-rule bg-paper-2 p-6 sm:p-8 shadow-xl outline-none"
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-ink-muted hover:text-ink transition-colors"
        >
          <X size={20} />
        </button>

        {status === "success" ? (
          <div className="text-center py-6">
            <h2 id="lead-form-heading" className="font-display text-xl text-ink mb-2">
              Thanks — we&apos;ve got it.
            </h2>
            {CAL_LINK ? (
              <>
                <p className="text-sm text-ink-muted leading-relaxed mb-4">
                  Pick a time that works for you:
                </p>
                <iframe
                  title="Book a time"
                  src={`https://cal.com/${CAL_LINK}?embed=true&theme=dark`}
                  className="w-full h-96 rounded-md border border-rule mb-4"
                />
              </>
            ) : (
              <p className="text-sm text-ink-muted leading-relaxed mb-6">
                Someone from Trimora will reach out shortly to schedule your demo.
              </p>
            )}
            <Button type="button" onClick={handleClose} size="sm">
              Close
            </Button>
          </div>
        ) : (
          <>
            <p className="text-xs text-ink-soft mb-1">
              Step {stepIndex + 1} of {STEPS.length}
            </p>
            <h2 id="lead-form-heading" className="font-display text-xl text-ink mb-1">
              {step === "contact" && "Book a Demo"}
              {step === "business_type" && "What kind of business?"}
              {step === "branches" && "How many branches?"}
              {step === "employees" && "How many employees?"}
            </h2>
            <p className="text-sm text-ink-muted mb-6">
              {step === "contact" && "Tell us a bit about your business and we'll be in touch."}
              {step === "business_type" && "Helps us show you the right setup."}
              {step === "branches" && "Including this one, if you have more than one location."}
              {step === "employees" && "Across all branches — a rough number is fine."}
            </p>

            <div className="space-y-4">
              {step === "contact" && (
                <>
                  <div>
                    <label htmlFor="full_name" className="block text-xs text-ink-muted mb-1.5">
                      Your name
                    </label>
                    <input
                      id="full_name"
                      type="text"
                      required
                      value={formData.full_name}
                      onChange={(e) => update("full_name", e.target.value)}
                      className="w-full rounded-md border border-rule bg-paper px-3 py-2 text-sm text-ink placeholder:text-ink-soft focus:border-accent-ink outline-none"
                      placeholder="Jane Wanjiru"
                    />
                  </div>

                  <div>
                    <label htmlFor="business_name" className="block text-xs text-ink-muted mb-1.5">
                      Business name
                    </label>
                    <input
                      id="business_name"
                      type="text"
                      required
                      value={formData.business_name}
                      onChange={(e) => update("business_name", e.target.value)}
                      className="w-full rounded-md border border-rule bg-paper px-3 py-2 text-sm text-ink placeholder:text-ink-soft focus:border-accent-ink outline-none"
                      placeholder="Kimm's Beauty Parlour"
                    />
                  </div>

                  <div>
                    <span className="block text-xs text-ink-muted mb-1.5">Reach me by</span>
                    <div className="flex gap-4 mb-2 text-sm text-ink-muted">
                      <label className="flex items-center gap-1.5">
                        <input
                          type="radio"
                          name="contact_method_choice"
                          checked={formData.contact_method === "email"}
                          onChange={() => update("contact_method", "email")}
                        />
                        Email
                      </label>
                      <label className="flex items-center gap-1.5">
                        <input
                          type="radio"
                          name="contact_method_choice"
                          checked={formData.contact_method === "phone"}
                          onChange={() => update("contact_method", "phone")}
                        />
                        Phone / WhatsApp
                      </label>
                    </div>
                    <input
                      id="contact_value"
                      type={formData.contact_method === "email" ? "email" : "tel"}
                      required
                      value={formData.contact_value}
                      onChange={(e) => update("contact_value", e.target.value)}
                      className="w-full rounded-md border border-rule bg-paper px-3 py-2 text-sm text-ink placeholder:text-ink-soft focus:border-accent-ink outline-none"
                      placeholder={
                        formData.contact_method === "email" ? "jane@example.com" : "+254 7XX XXX XXX"
                      }
                    />
                  </div>

                  <div>
                    <label htmlFor="biggest_challenge" className="block text-xs text-ink-muted mb-1.5">
                      What are you looking to solve? (optional)
                    </label>
                    <textarea
                      id="biggest_challenge"
                      rows={2}
                      value={formData.biggest_challenge}
                      onChange={(e) => update("biggest_challenge", e.target.value)}
                      className="w-full rounded-md border border-rule bg-paper px-3 py-2 text-sm text-ink placeholder:text-ink-soft focus:border-accent-ink outline-none resize-none"
                      placeholder="e.g. Tracking inventory across two branches"
                    />
                  </div>
                </>
              )}

              {step === "business_type" && (
                <div className="grid grid-cols-2 gap-2">
                  {BUSINESS_TYPES.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => update("business_type", type)}
                      className={`rounded-md border px-4 py-3 text-sm text-left transition-colors ${
                        formData.business_type === type
                          ? "border-accent-ink bg-accent-ink/10 text-ink"
                          : "border-rule text-ink-muted hover:border-rule/70 hover:text-ink"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              )}

              {step === "branches" && (
                <div>
                  <label htmlFor="branch_count" className="block text-xs text-ink-muted mb-1.5">
                    Number of branches
                  </label>
                  <input
                    id="branch_count"
                    type="number"
                    min="1"
                    required
                    value={formData.branch_count}
                    onChange={(e) => update("branch_count", e.target.value)}
                    className="w-full rounded-md border border-rule bg-paper px-3 py-2 text-sm text-ink placeholder:text-ink-soft focus:border-accent-ink outline-none"
                    placeholder="1"
                  />
                </div>
              )}

              {step === "employees" && (
                <div>
                  <label htmlFor="employee_count" className="block text-xs text-ink-muted mb-1.5">
                    Number of employees
                  </label>
                  <input
                    id="employee_count"
                    type="number"
                    min="1"
                    required
                    value={formData.employee_count}
                    onChange={(e) => update("employee_count", e.target.value)}
                    className="w-full rounded-md border border-rule bg-paper px-3 py-2 text-sm text-ink placeholder:text-ink-soft focus:border-accent-ink outline-none"
                    placeholder="3"
                  />
                </div>
              )}

              {status === "error" && (
                <p className="text-sm text-destructive" role="alert">
                  Something went wrong sending that. You can also reach us directly:{" "}
                  <CopyEmailButton email={FALLBACK_EMAIL} className="underline inline-flex items-center gap-1" />
                </p>
              )}

              <div className="flex gap-2 pt-2">
                {stepIndex > 0 && (
                  <Button type="button" onClick={goBack} variant="ghost" size="lg" className="gap-1">
                    <ChevronLeft size={16} />
                    Back
                  </Button>
                )}
                <Button
                  type="button"
                  onClick={goNext}
                  size="lg"
                  className="flex-1"
                  disabled={!isStepValid() || status === "submitting"}
                >
                  {status === "submitting"
                    ? "Sending…"
                    : stepIndex === STEPS.length - 1
                      ? "Request Demo"
                      : "Next"}
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
