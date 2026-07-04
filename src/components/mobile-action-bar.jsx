"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Calendar, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLeadForm } from "@/components/lead-form-context";

// Phase 2, Item 2: real-time scroll-aware CTA, replacing the static Phase 1
// bar. Watches the #pos and #pricing sections (real anchor IDs already on
// pos-deep-dive.jsx / pricing-cta.jsx) via IntersectionObserver -- not a
// scroll-percentage calculation, which breaks the moment page content
// changes length. Tracks whether the visitor has scrolled past each
// section's starting point, in either direction, so scrolling back up
// correctly reverts the label too.
//
// Three states (homepage only -- #pos/#pricing don't exist on other
// routes, so this bar renders the final "Book a Demo" state everywhere
// else via layout.js):
//   1. Before #pos reached       -> "See Trimora POS", scrolls to #pos
//   2. Past #pos, before pricing -> "See Pricing", scrolls to #pricing
//   3. Past #pricing             -> "Book a Demo", opens the lead form
export function MobileActionBar() {
  const { openLeadForm } = useLeadForm();
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const [pastPos, setPastPos] = useState(false);
  const [pastPricing, setPastPricing] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    if (!isHomepage) return;

    const posEl = document.getElementById("pos");
    const pricingEl = document.getElementById("pricing");
    if (!posEl || !pricingEl) return;

    // Fires whenever an observed element's top edge crosses the viewport
    // top, in either scroll direction -- exactly the "have we scrolled
    // past this section's start" signal, kept live rather than computed
    // once.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const scrolledPast = entry.boundingClientRect.top <= 0;
          if (entry.target.id === "pos") setPastPos(scrolledPast);
          if (entry.target.id === "pricing") setPastPricing(scrolledPast);
        }
      },
      { threshold: 0 }
    );

    observer.observe(posEl);
    observer.observe(pricingEl);
    observerRef.current = observer;

    return () => observer.disconnect();
  }, [isHomepage]);

  function scrollToSection(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  let label, icon, onActivate;
  if (!isHomepage || pastPricing) {
    label = "Book a Demo";
    icon = Calendar;
    onActivate = () => openLeadForm("mobile-action-bar");
  } else if (pastPos) {
    label = "See Pricing";
    icon = ArrowDown;
    onActivate = () => scrollToSection("pricing");
  } else {
    label = "See Trimora POS";
    icon = ArrowDown;
    onActivate = () => scrollToSection("pos");
  }

  const Icon = icon;

  return (
    <div
      role="region"
      aria-label="Quick actions"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-ink-700 bg-ink-950/95 backdrop-blur-md px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]"
    >
      <Button type="button" onClick={onActivate} className="w-full justify-center gap-2">
        <Icon size={16} aria-hidden="true" />
        {label}
      </Button>
    </div>
  );
}
