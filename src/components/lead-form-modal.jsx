"use client";

// Phase 2 qualification funnel: a 5-screen wizard (4 question steps +
// success screen) writing a single row to Supabase on final submit.
//
// v1 scope (per Homepage Evolution Roadmap, Phase 2 Item 3):
//   1. Contact Details — name, business name, phone (required), email
//      (optional), biggest challenge (optional)
//   2. Business Type
//   3. Branch Count
//   4. Employee Count
//   5. Success screen
//
// Deliberately NOT the full 7-step funnel from the Next-Gen doc — v1 stops
// at business type/branches/employees per Lucy's greenlight. `current_system`
// stays unused for now; the column is still reserved for when that step
// is added.
//
// Phone is now a REQUIRED field (previously an either/or toggle with
// email). Rationale (Lucy, 2026-07-05): the WhatsApp confirmation this
// funnel triggers is the point of collecting a phone number at all —
// without it there's no automated follow-up channel, which is the core
// conversion lever this funnel exists to pull. Email stays optional.
//
// Submission happens once, at the end (leaving the last question step),
// same resilience trade-off as the Phase 1 single-step form — not a
// multi-write-per-step pattern.
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { track } from "@vercel/analytics";
import { Button } from "@/components/ui/button";
import { useLeadForm } from "@/components/lead-form-context";
import { supabase } from "@/lib/supabase";

const FALLBACK_EMAIL = "hello@trimorasystems.com";
const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

const STEP_CONTACT = 1;
const STEP_BUSINESS_TYPE = 2;
const STEP_BRANCHES = 3;
const STEP_EMPLOYEES = 4;
const STEP_SUCCESS = 5;
const TOTAL_STEPS = 5;

const BUSINESS_TYPE_OPTIONS = ["Salon", "Barbershop", "Spa / Wellness Center", "Other"];

const INITIAL_FORM_DATA = {
  fullName: "",
  businessName: "",
  phone: "",
  email: "",
  biggestChallenge: "",
  businessType: "",
  branchCount: "",
  employeeCount: "",
};

export function LeadFormModal() {
  const { isOpen, source, closeLeadForm } = useLeadForm();
  const [step, setStep] = useState(STEP_CONTACT);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [status, setStatus] = useState("idle"); // idle | submitting | error
  const [stepError, setStepError] = useState("");
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);

  // Focus management: move focus into the dialog on open, trap Tab/Shift+Tab
  // within it, close on Escape, and return focus to whatever triggered it
  // on close. Re-runs on step changes too, since each step mounts a
  // different focusable set (same principle as the Phase 1 idle<->success
  // re-run, extended to every step transition).
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
  }, [isOpen, step, closeLeadForm]);

  if (!isOpen) return null;

  function updateField(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function handleClose() {
    closeLeadForm();
    setStep(STEP_CONTACT);
    setFormData(INITIAL_FORM_DATA);
    setStatus("idle");
    setStepError("");
  }

  function goBack() {
    setStepError("");
    setStep((s) => Math.max(STEP_CONTACT, s - 1));
  }

  function validateContactStep() {
    if (!formData.fullName.trim()) return "Please enter your name.";
    if (!formData.businessName.trim()) return "Please enter your business name.";
    if (!formData.phone.trim())
      return "A phone number is required so we can follow up on WhatsApp.";
    return "";
  }

  function validateBusinessTypeStep() {
    if (!formData.businessType) return "Please select a business type.";
    return "";
  }

  function validateBranchesStep() {
    if (!formData.branchCount || Number(formData.branchCount) < 1) {
      return "Please enter how many branches you have.";
    }
    return "";
  }

  function validateEmployeesStep() {
    if (!formData.employeeCount || Number(formData.employeeCount) < 1) {
      return "Please enter how many employees you have.";
    }
    return "";
  }

  function goNext() {
    let error = "";
    if (step === STEP_CONTACT) error = validateContactStep();
    else if (step === STEP_BUSINESS_TYPE) error = validateBusinessTypeStep();
    else if (step === STEP_BRANCHES) error = validateBranchesStep();

    if (error) {
      setStepError(error);
      return;
    }

    setStepError("");
    track("lead_funnel_step_advanced", { source, step });
    setStep((s) => s + 1);
  }

  async function handleFinalSubmit() {
    const error = validateEmployeesStep();
    if (error) {
      setStepError(error);
      return;
    }

    setStepError("");
    setStatus("submitting");

    const payload = {
      full_name: formData.fullName.trim(),
      business_name: formData.businessName.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim() || null,
      biggest_challenge: formData.biggestChallenge.trim() || null,
      source_page: source,
      business_type: formData.businessType,
      branch_count: Number(formData.branchCount),
      employee_count: Number(formData.employeeCount),
    };

    if (!supabase) {
      console.error("Supabase client not configured — cannot submit lead.");
      setStatus("error");
      track("lead_submit_failed", { source, reason: "not_configured" });
      return;
    }

    const { error: insertError } = await supabase.from("leads").insert(payload);

    if (insertError) {
      console.error("Lead submission failed:", insertError.message);
      setStatus("error");
      track("lead_submit_failed", { source });
      return;
    }

    setStatus("idle");
    track("lead_submitted", { source });
    setStep(STEP_SUCCESS);
  }

  const isQuestionStep = step >= STEP_CONTACT && step <= STEP_EMPLOYEES;

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
        className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm"
      />

      <div
        ref={dialogRef}
        tabIndex={-1}
        className="relative w-full max-w-md rounded-lg border border-ink-700 bg-ink-900 p-6 sm:p-8 shadow-xl outline-none"
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-text-dim hover:text-text transition-colors"
        >
          <X size={20} />
        </button>

        {step === STEP_SUCCESS ? (
          <div className="text-center py-6">
            <h2 id="lead-form-heading" className="font-display text-xl text-text mb-2">
              Thanks — we&apos;ve got it.
            </h2>
            <p className="text-sm text-text-dim leading-relaxed mb-6">
              Someone from Trimora will reach out shortly to schedule your demo. We&apos;ve
              also sent a WhatsApp confirmation to the number you provided.
            </p>
            <Button type="button" onClick={handleClose} size="sm">
              Close
            </Button>
          </div>
        ) : (
          <>
            {isQuestionStep && (
              <p className="text-xs text-text-faint mb-1.5 uppercase tracking-wide">
                Step {step} of {TOTAL_STEPS}
              </p>
            )}
            <h2 id="lead-form-heading" className="font-display text-xl text-text mb-1">
              Book a Demo
            </h2>
            <p className="text-sm text-text-dim mb-6">
              Tell us a bit about your business and we&apos;ll be in touch.
            </p>

            <div className="space-y-4">
              {step === STEP_CONTACT && (
                <>
                  <div>
                    <label htmlFor="full_name" className="block text-xs text-text-dim mb-1.5">
                      Your name
                    </label>
                    <input
                      id="full_name"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => updateField("fullName", e.target.value)}
                      className="w-full rounded-md border border-ink-700 bg-ink-950 px-3 py-2 text-sm text-text placeholder:text-text-faint focus:border-gold-400 outline-none"
                      placeholder="Jane Wanjiru"
                    />
                  </div>

                  <div>
                    <label htmlFor="business_name" className="block text-xs text-text-dim mb-1.5">
                      Business name
                    </label>
                    <input
                      id="business_name"
                      type="text"
                      value={formData.businessName}
                      onChange={(e) => updateField("businessName", e.target.value)}
                      className="w-full rounded-md border border-ink-700 bg-ink-950 px-3 py-2 text-sm text-text placeholder:text-text-faint focus:border-gold-400 outline-none"
                      placeholder="Kimm's Beauty Parlour"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs text-text-dim mb-1.5">
                      Phone / WhatsApp number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      className="w-full rounded-md border border-ink-700 bg-ink-950 px-3 py-2 text-sm text-text placeholder:text-text-faint focus:border-gold-400 outline-none"
                      placeholder="+254 7XX XXX XXX"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs text-text-dim mb-1.5">
                      Email <span className="text-text-faint">(optional)</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className="w-full rounded-md border border-ink-700 bg-ink-950 px-3 py-2 text-sm text-text placeholder:text-text-faint focus:border-gold-400 outline-none"
                      placeholder="jane@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="biggest_challenge" className="block text-xs text-text-dim mb-1.5">
                      What are you looking to solve? <span className="text-text-faint">(optional)</span>
                    </label>
                    <textarea
                      id="biggest_challenge"
                      rows={3}
                      value={formData.biggestChallenge}
                      onChange={(e) => updateField("biggestChallenge", e.target.value)}
                      className="w-full rounded-md border border-ink-700 bg-ink-950 px-3 py-2 text-sm text-text placeholder:text-text-faint focus:border-gold-400 outline-none resize-none"
                      placeholder="e.g. Tracking inventory across two branches"
                    />
                  </div>
                </>
              )}

              {step === STEP_BUSINESS_TYPE && (
                <div>
                  <label htmlFor="business_type" className="block text-xs text-text-dim mb-1.5">
                    What type of business do you run?
                  </label>
                  <select
                    id="business_type"
                    value={formData.businessType}
                    onChange={(e) => updateField("businessType", e.target.value)}
                    className="w-full rounded-md border border-ink-700 bg-ink-950 px-3 py-2 text-sm text-text focus:border-gold-400 outline-none"
                  >
                    <option value="" disabled>
                      Select one
                    </option>
                    {BUSINESS_TYPE_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {step === STEP_BRANCHES && (
                <div>
                  <label htmlFor="branch_count" className="block text-xs text-text-dim mb-1.5">
                    How many branches do you have?
                  </label>
                  <input
                    id="branch_count"
                    type="number"
                    min="1"
                    value={formData.branchCount}
                    onChange={(e) => updateField("branchCount", e.target.value)}
                    className="w-full rounded-md border border-ink-700 bg-ink-950 px-3 py-2 text-sm text-text placeholder:text-text-faint focus:border-gold-400 outline-none"
                    placeholder="1"
                  />
                </div>
              )}

              {step === STEP_EMPLOYEES && (
                <div>
                  <label htmlFor="employee_count" className="block text-xs text-text-dim mb-1.5">
                    How many employees do you have?
                  </label>
                  <input
                    id="employee_count"
                    type="number"
                    min="1"
                    value={formData.employeeCount}
                    onChange={(e) => updateField("employeeCount", e.target.value)}
                    className="w-full rounded-md border border-ink-700 bg-ink-950 px-3 py-2 text-sm text-text placeholder:text-text-faint focus:border-gold-400 outline-none"
                    placeholder="3"
                  />
                </div>
              )}

              {stepError && (
                <p className="text-sm text-gold-400" role="alert">
                  {stepError}
                </p>
              )}

              {status === "error" && (
                <p className="text-sm text-gold-400" role="alert">
                  Something went wrong sending that. You can also reach us directly at{" "}
                  <a href={`mailto:${FALLBACK_EMAIL}`} className="underline">
                    {FALLBACK_EMAIL}
                  </a>
                  .
                </p>
              )}

              <div className="flex gap-3 pt-2">
                {step > STEP_CONTACT && (
                  <Button type="button" variant="ghost" size="lg" onClick={goBack} className="flex-1">
                    Back
                  </Button>
                )}
                {step < STEP_EMPLOYEES ? (
                  <Button type="button" size="lg" onClick={goNext} className="flex-1">
                    Next
                  </Button>
                ) : (
                  <Button
                    type="button"
                    size="lg"
                    onClick={handleFinalSubmit}
                    disabled={status === "submitting"}
                    className="flex-1"
                  >
                    {status === "submitting" ? "Sending…" : "Request Demo"}
                  </Button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
