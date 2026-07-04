"use client";

// Thin client wrapper so `page.js` (a server component) can render a CTA
// that opens the lead form without itself becoming a client component.
import { Button } from "@/components/ui/button";
import { useLeadForm } from "@/components/lead-form-context";

export function HeroCtaButton({ className }) {
  const { openLeadForm } = useLeadForm();
  return (
    <Button type="button" onClick={() => openLeadForm("hero")} size="lg" className={className}>
      Book a Demo
    </Button>
  );
}
