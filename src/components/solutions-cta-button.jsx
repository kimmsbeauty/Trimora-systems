"use client";

// Thin client wrapper, same pattern as hero-cta-button.jsx, so page.js
// stays a server component.
import { Button } from "@/components/ui/button";
import { useLeadForm } from "@/components/lead-form-context";

export function SolutionsCtaButton({ className }) {
  const { openLeadForm } = useLeadForm();
  return (
    <Button type="button" onClick={() => openLeadForm("solutions")} size="lg" className={className}>
      Book a Demo
    </Button>
  );
}
