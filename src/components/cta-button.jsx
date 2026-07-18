"use client";

// Thin client wrapper so page.js (a server component) can render a CTA
// that opens the lead form without itself becoming a client component.
//
// Consolidates hero-cta-button.jsx / beauty-cta-button.jsx /
// auto-cta-button.jsx, which were byte-for-byte identical apart from the
// `source` tag passed to openLeadForm(). One component now; source is
// passed explicitly at each call site so lead attribution is unchanged.
import { Button } from "@/components/ui/button";
import { useLeadForm } from "@/components/lead-form-context";

export function CtaButton({ source, label = "Book a Demo", className }) {
  const { openLeadForm } = useLeadForm();
  return (
    <Button type="button" onClick={() => openLeadForm(source)} size="lg" className={className}>
      {label}
    </Button>
  );
}
