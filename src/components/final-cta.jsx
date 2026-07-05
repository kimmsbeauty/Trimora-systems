"use client";

import { useLeadForm } from "@/components/lead-form-context";
import { Button } from "@/components/ui/button";

// Paper & Ink re-skin: dropped the solid gold background block entirely
// in favor of the editorial pattern -- ruled lines flanking a centered
// eyebrow, serif headline, restrained ink pill button. Same copy as
// before ("Ready to run your business on one platform?" / "Get started
// with Trimora POS today.") -- only the visual treatment changed.
export function FinalCta() {
  const { openLeadForm } = useLeadForm();
  return (
    <section aria-labelledby="final-cta-heading" className="border-t border-rule py-20 sm:py-24">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="h-px w-8 bg-rule" aria-hidden="true" />
          <span className="eyebrow">Get Started</span>
          <span className="h-px w-8 bg-rule" aria-hidden="true" />
        </div>
        <h2
          id="final-cta-heading"
          className="font-display text-2xl sm:text-3xl lg:text-4xl text-ink mb-3 leading-snug"
        >
          Ready to run your business on one platform?
        </h2>
        <p className="text-sm sm:text-base text-ink-muted mb-8">
          Get started with Trimora POS today.
        </p>
        <Button type="button" onClick={() => openLeadForm("final-cta")} size="lg">
          Book a Demo
        </Button>
      </div>
    </section>
  );
}
