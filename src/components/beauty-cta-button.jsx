"use client";

// Thin client wrapper, same pattern as hero-cta-button.jsx, so page.js
// stays a server component. Renamed from solutions-cta-button.jsx now
// that this content lives at /beauty under the Trimora Beauty vertical
// -- source tag updated to match, so leads from this page are
// distinguishable from the /auto waitlist and any future vertical.
import { Button } from "@/components/ui/button";
import { useLeadForm } from "@/components/lead-form-context";

export function BeautyCtaButton({ className }) {
  const { openLeadForm } = useLeadForm();
  return (
    <Button type="button" onClick={() => openLeadForm("beauty")} size="lg" className={className}>
      Book a Demo
    </Button>
  );
}
