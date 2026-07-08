"use client";

// Thin client wrapper, same pattern as beauty-cta-button.jsx. Renamed
// from "waitlist" framing (2026-07-08) -- Trimora Auto is confirmed
// fully live with real car wash/detailing customers signing up and
// using it today, not pre-launch. Source tag updated from
// "auto-waitlist" to "auto" to match.
import { Button } from "@/components/ui/button";
import { useLeadForm } from "@/components/lead-form-context";

export function AutoCtaButton({ className }) {
  const { openLeadForm } = useLeadForm();
  return (
    <Button type="button" onClick={() => openLeadForm("auto")} size="lg" className={className}>
      Book a Demo
    </Button>
  );
}
