"use client";

// Phase 3 (website), Item 1: Sitewide Analytics Instrumentation.
//
// Wraps a homepage section to log a single "section_viewed" event the
// first time it becomes meaningfully visible (50% threshold, matching
// "the visitor actually looked at this" better than a 0% "any pixel
// entered the viewport" threshold). Fires once per section per page
// load — a ref-backed set, not state, since re-renders on every section
// crossing the threshold would be wasteful and unnecessary here.
//
// Deliberately a thin wrapper (a single div with the section's id) rather
// than modifying each section component internally — most homepage
// sections (SocialProof, Problems, Solution, etc.) don't have ids of
// their own today; this adds one without touching those files' internals.
// Three sections (PosDeepDive, Ecosystem, PricingCta) already have their
// own <section id="..."> — see page.js for how those are handled instead
// (observed directly by id, not double-wrapped).
import { useEffect, useRef } from "react";
import { logPageEvent } from "@/lib/analytics";

function observeOnce(el, id) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          logPageEvent("section_viewed", { sectionId: id });
          observer.disconnect();
          return;
        }
      }
    },
    { threshold: 0.5 }
  );
  observer.observe(el);
  return observer;
}

export function SectionTracker({ id, children }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = observeOnce(el, id);
    return () => observer.disconnect();
  }, [id]);

  return (
    <div id={id} ref={ref}>
      {children}
    </div>
  );
}

// For sections that already render their own `id` internally (PosDeepDive,
// Ecosystem, PricingCta) -- wrapping them would create a duplicate id in
// the DOM (invalid HTML) and some of them are server components, so a
// client-only wrapping div isn't a clean option anyway. This renders
// nothing and just attaches an observer to the existing element by id,
// the same way mobile-action-bar.jsx already looks up #pos/#pricing.
export function ObserveSection({ id }) {
  useEffect(() => {
    const el = document.getElementById(id);
    if (!el) return;
    const observer = observeOnce(el, id);
    return () => observer.disconnect();
  }, [id]);

  return null;
}
