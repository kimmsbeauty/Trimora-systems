"use client";

// Thin client wrapper, same pattern as hero-cta-button.jsx and
// solutions-cta-button.jsx, so page.js stays a server component.
//
// Reuses the exact same LeadFormModal every other CTA on the site uses
// -- no new form, no new insert logic, zero new untested code paths.
// Tagged with source: "auto-waitlist" so these leads are distinguishable
// from salon/spa/barbershop leads (visible in the notify-new-lead email
// body, which includes source_page) without needing a new business_type
// value that hasn't been verified against the live database schema.
import { Button } from "@/components/ui/button";
import { useLeadForm } from "@/components/lead-form-context";

export function AutoCtaButton({ className }) {
  const { openLeadForm } = useLeadForm();
  return (
    <Button type="button" onClick={() => openLeadForm("auto-waitlist")} size="lg" className={className}>
      Join the Waitlist
    </Button>
  );
}
