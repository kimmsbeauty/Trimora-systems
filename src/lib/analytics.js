// Phase 3 (website), Item 1: Sitewide Analytics Instrumentation.
//
// Single choke point for logging observational events (section views, CTA
// clicks) to both Vercel Analytics (track()) and Supabase (page_events
// table), so the same call site doesn't need to know about both.
//
// session_id is generated once per page load (module-level, not persisted
// to localStorage/cookies/sessionStorage) — deliberately NOT a durable
// visitor identity. This groups events within a single page view only;
// it says nothing about returning visitors. That's an explicit boundary,
// not an oversight: cross-visit identity is personalization/"Visitor
// Intelligence Layer" territory, marked not-actionable in the Phase 3
// scope draft until there's a real feature that needs it.
//
// Fire-and-forget by design: a failed analytics write must never surface
// to the visitor or block anything else on the page. Errors are logged to
// the console (visible in dev / Vercel function logs) and swallowed
// everywhere else.
import { track } from "@vercel/analytics";
import { supabase } from "@/lib/supabase";

const sessionId =
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);

/**
 * Log an observational event to Vercel Analytics and Supabase.
 * @param {"section_viewed" | "cta_click"} eventType
 * @param {{ sectionId?: string, source?: string }} [extra]
 */
export function logPageEvent(eventType, extra = {}) {
  const { sectionId, source } = extra;

  // Vercel Analytics — same track() pattern already used by the lead funnel.
  track(eventType, { ...(sectionId ? { section: sectionId } : {}), ...(source ? { source } : {}) });

  // Supabase mirror — best-effort, never blocks or throws for the caller.
  if (!supabase || typeof window === "undefined") return;

  supabase
    .from("page_events")
    .insert({
      event_type: eventType,
      section_id: sectionId ?? null,
      source: source ?? null,
      path: window.location.pathname,
      session_id: sessionId,
    })
    .then(({ error }) => {
      if (error) console.error("page_events insert failed:", error.message);
    });
}
