"use client";

import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

// Phase 1: a single, static, always-visible CTA on mobile — fixes the
// audit finding that the only mobile CTA was hidden inside the hamburger
// panel (violates the brief's "never hide it inside the hamburger" spec).
//
// `label` and `href` are accepted as props (not hardcoded) specifically so
// Phase 2 (per the Homepage Evolution Roadmap) can layer in scroll-aware
// behavior — swapping copy as the visitor moves through Learn More -> See
// Trimora POS -> Book Your Demo — by changing what's passed in from a
// parent scroll listener, without touching this component's markup,
// positioning, or safe-area handling again.
export function MobileActionBar({
  label = "Book a Demo",
  href = "mailto:hello@trimorasystems.com",
}) {
  return (
    <div
      role="region"
      aria-label="Quick actions"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-ink-700 bg-ink-950/95 backdrop-blur-md px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]"
    >
      <Button as="a" href={href} className="w-full justify-center gap-2">
        <Calendar size={16} aria-hidden="true" />
        {label}
      </Button>
    </div>
  );
}
