"use client";

import { useLeadForm } from "@/components/lead-form-context";

export function FinalCta() {
  const { openLeadForm } = useLeadForm();
  return (
    <section aria-labelledby="final-cta-heading" className="bg-gold-500 py-20 sm:py-24">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h2
          id="final-cta-heading"
          className="font-display text-2xl sm:text-3xl lg:text-4xl text-ink-950 mb-3 leading-snug"
        >
          Ready to run your business on one platform?
        </h2>
        <p className="text-sm sm:text-base text-ink-900/80 mb-8">
          Get started with Trimora POS today.
        </p>
        <button
          type="button"
          onClick={() => openLeadForm("final-cta")}
          className="inline-flex items-center justify-center rounded-md bg-ink-950 text-text px-6 py-3 text-sm font-medium hover:bg-ink-900 transition-colors"
        >
          Book a Demo
        </button>
      </div>
    </section>
  );
}
