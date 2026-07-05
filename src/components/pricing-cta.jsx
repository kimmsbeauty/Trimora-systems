"use client";

import { Button } from "@/components/ui/button";
import { useLeadForm } from "@/components/lead-form-context";

export function PricingCta() {
  const { openLeadForm } = useLeadForm();
  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="py-20 sm:py-28 border-t border-rule">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h2
          id="pricing-heading"
          className="font-display text-2xl sm:text-3xl lg:text-4xl text-ink mb-4 leading-snug"
        >
          Simple pricing, built to grow with your business.
        </h2>
        <p className="text-sm sm:text-base text-ink-muted leading-relaxed mb-8">
          Start with Trimora POS today. Add more products as your business
          needs them.
        </p>
        <Button type="button" onClick={() => openLeadForm("pricing")} size="lg">
          Book a Demo
        </Button>
      </div>
    </section>
  );
}
