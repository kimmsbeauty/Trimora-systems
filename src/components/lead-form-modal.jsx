"use client";

// Phase 1 lead capture: a single-step form (name, business name, one
// contact method, one open "what are you looking to solve" field) writing
// directly to Supabase. Deliberately NOT a multi-step wizard yet — the
// `leads` table schema already reserves nullable columns (business_type,
// branch_count, employee_count, current_system) for the Phase 2
// qualification funnel described in the Homepage Evolution Roadmap, so
// that funnel can be added later without migrating data or rebuilding
// this submission path.
import { useState } from "react";
import { X } from "lucide-react";
import { track } from "@vercel/analytics";
import { Button } from "@/components/ui/button";
import { useLeadForm } from "@/components/lead-form-context";
import { supabase } from "@/lib/supabase";

const FALLBACK_EMAIL = "hello@trimorasystems.com";

export function LeadFormModal() {
  const { isOpen, source, closeLeadForm } = useLeadForm();
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [contactMethod, setContactMethod] = useState("email");

  if (!isOpen) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.target;
    const fullName = form.full_name.value.trim();
    const businessName = form.business_name.value.trim();
    const contactValue = form.contact_value.value.trim();
    const biggestChallenge = form.biggest_challenge.value.trim();

    const payload = {
      full_name: fullName,
      business_name: businessName,
      email: contactMethod === "email" ? contactValue : null,
      phone: contactMethod === "phone" ? contactValue : null,
      biggest_challenge: biggestChallenge || null,
      source_page: source,
    };

    const { error } = await supabase.from("leads").insert(payload);

    if (error) {
      console.error("Lead submission failed:", error.message);
      setStatus("error");
      track("lead_submit_failed", { source });
      return;
    }

    setStatus("success");
    track("lead_submitted", { source });
  }

  function handleClose() {
    closeLeadForm();
    // Reset after the close animation-equivalent delay isn't needed since
    // there's no exit animation yet — reset immediately so reopening shows
    // a fresh form rather than a stale success/error state.
    setStatus("idle");
    setContactMethod("email");
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
        className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm"
      />

      <div className="relative w-full max-w-md rounded-lg border border-ink-700 bg-ink-900 p-6 sm:p-8 shadow-xl">
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-text-dim hover:text-text transition-colors"
        >
          <X size={20} />
        </button>

        {status === "success" ? (
          <div className="text-center py-6">
            <h2 id="lead-form-heading" className="font-display text-xl text-text mb-2">
              Thanks — we&apos;ve got it.
            </h2>
            <p className="text-sm text-text-dim leading-relaxed mb-6">
              Someone from Trimora will reach out shortly to schedule your demo.
            </p>
            <Button type="button" onClick={handleClose} size="sm">
              Close
            </Button>
          </div>
        ) : (
          <>
            <h2 id="lead-form-heading" className="font-display text-xl text-text mb-1">
              Book a Demo
            </h2>
            <p className="text-sm text-text-dim mb-6">
              Tell us a bit about your business and we&apos;ll be in touch.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="full_name" className="block text-xs text-text-dim mb-1.5">
                  Your name
                </label>
                <input
                  id="full_name"
                  name="full_name"
                  type="text"
                  required
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
                  name="business_name"
                  type="text"
                  required
                  className="w-full rounded-md border border-ink-700 bg-ink-950 px-3 py-2 text-sm text-text placeholder:text-text-faint focus:border-gold-400 outline-none"
                  placeholder="Kimm's Beauty Parlour"
                />
              </div>

              <div>
                <span className="block text-xs text-text-dim mb-1.5">Reach me by</span>
                <div className="flex gap-4 mb-2 text-sm text-text-dim">
                  <label className="flex items-center gap-1.5">
                    <input
                      type="radio"
                      name="contact_method_choice"
                      checked={contactMethod === "email"}
                      onChange={() => setContactMethod("email")}
                    />
                    Email
                  </label>
                  <label className="flex items-center gap-1.5">
                    <input
                      type="radio"
                      name="contact_method_choice"
                      checked={contactMethod === "phone"}
                      onChange={() => setContactMethod("phone")}
                    />
                    Phone / WhatsApp
                  </label>
                </div>
                <input
                  id="contact_value"
                  name="contact_value"
                  type={contactMethod === "email" ? "email" : "tel"}
                  required
                  className="w-full rounded-md border border-ink-700 bg-ink-950 px-3 py-2 text-sm text-text placeholder:text-text-faint focus:border-gold-400 outline-none"
                  placeholder={contactMethod === "email" ? "jane@example.com" : "+254 7XX XXX XXX"}
                />
              </div>

              <div>
                <label htmlFor="biggest_challenge" className="block text-xs text-text-dim mb-1.5">
                  What are you looking to solve? (optional)
                </label>
                <textarea
                  id="biggest_challenge"
                  name="biggest_challenge"
                  rows={3}
                  className="w-full rounded-md border border-ink-700 bg-ink-950 px-3 py-2 text-sm text-text placeholder:text-text-faint focus:border-gold-400 outline-none resize-none"
                  placeholder="e.g. Tracking inventory across two branches"
                />
              </div>

              {status === "error" && (
                <p className="text-sm text-gold-400" role="alert">
                  Something went wrong sending that. You can also reach us directly at{" "}
                  <a href={`mailto:${FALLBACK_EMAIL}`} className="underline">
                    {FALLBACK_EMAIL}
                  </a>
                  .
                </p>
              )}

              <Button type="submit" size="lg" className="w-full" disabled={status === "submitting"}>
                {status === "submitting" ? "Sending…" : "Request Demo"}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
