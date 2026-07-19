import { Check } from "lucide-react";

// Redesigned as part of the Problem -> Solution -> Value consolidation
// (2026-07-18, per explicit direction): previously a 3-card grid in the
// exact same shape as Problems, restating "connected platform / automated
// workflows / real-time dashboards" -- nouns that echoed Problems'
// "disconnected tools / manual processes / no visibility" almost 1:1.
// That made Solution feel like a point-by-point rebuttal rather than an
// introduction to Trimora itself.
//
// Now: a narrative paragraph that introduces Trimora as the answer and
// describes the transformation in outcome terms (not features), paired
// with a compact, differently-worded outcome list -- deliberately not
// reusing ValueProposition's noun-phrases ("one connected platform",
// "real-time visibility", etc.) so the two sections don't echo each
// other either. Different layout entirely from both Problems (3-col
// card grid) and ValueProposition (row-based comparison table), so the
// three sections read as three different kinds of content, not the same
// idea three times.
const OUTCOMES = [
  "Less admin, more time with customers",
  "Nothing falls through the cracks",
  "Numbers you can trust, the moment you need them",
];

export function Solution() {
  return (
    <section aria-labelledby="solution-heading" className="py-20 sm:py-28 border-t border-rule">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-16 items-start">
          <div>
            <h2
              id="solution-heading"
              className="font-display text-2xl sm:text-3xl lg:text-4xl text-ink mb-5 leading-snug"
            >
              Meet Trimora
            </h2>
            <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
              Trimora replaces the disconnected tools, manual records, and guesswork with one
              platform that runs your business end to end. Sales, bookings, staff, and inventory
              update each other automatically — so the numbers you see are always the numbers
              that are actually true, whether it&rsquo;s a slow Tuesday morning or your busiest
              Saturday of the month.
            </p>
          </div>

          <ul className="flex flex-col gap-5">
            {OUTCOMES.map((outcome) => (
              <li key={outcome} className="flex items-start gap-3">
                <Check className="text-accent-ink shrink-0 mt-0.5" size={20} strokeWidth={1.75} aria-hidden="true" />
                <span className="text-sm sm:text-base text-ink leading-relaxed">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
