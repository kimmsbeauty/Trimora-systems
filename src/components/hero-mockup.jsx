import { LayoutDashboard, CreditCard, CalendarDays, Package, BarChart3, Sparkles } from "lucide-react";

// This is an illustrative composite — it represents the surfaces (checkout,
// scheduling, inventory, reporting, and now AI) without fabricating real
// business figures. Bars/values are abstract shapes, not claimed data.
//
// Updated (2026-07-18): Trimora AI ("Ask Trimora" -- a plain-language
// question box answering revenue/customer/top-items questions from the
// business's own data, powered by a live Gemini-backed Edge Function)
// shipped today. Promoted from a demoted "on the roadmap" footnote to
// its own tile, consistent with how it's now labeled everywhere else on
// the site (Ecosystem no longer lists it -- Ecosystem is exclusively
// forward-looking now that this has graduated; Intelligence, WhyTrust,
// JourneyTimeline all updated to reflect it's live).
const FEATURES = [
  { id: "checkout", label: "Checkout", icon: CreditCard, fill: 70 },
  { id: "scheduling", label: "Scheduling", icon: CalendarDays, fill: 55 },
  { id: "inventory", label: "Inventory", icon: Package, fill: 40 },
  { id: "reporting", label: "Reports", icon: BarChart3, fill: 80 },
];

export function HeroMockup() {
  return (
    <div
      className="relative w-full max-w-md mx-auto lg:mx-0"
      role="img"
      aria-label="Illustrative preview of the Trimora POS dashboard, showing checkout, scheduling, inventory, and reporting"
    >
      {/* Main dashboard card */}
      <div className="rounded-xl border border-rule bg-paper-2 shadow-2xl shadow-black/40 overflow-hidden">
        {/* Window chrome */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-rule bg-paper-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rule" />
          <span className="w-2.5 h-2.5 rounded-full bg-rule" />
          <span className="w-2.5 h-2.5 rounded-full bg-rule" />
          <span className="ml-2 flex items-center gap-1.5 text-[11px] font-mono text-ink-soft">
            <LayoutDashboard size={12} aria-hidden="true" />
            Trimora POS — Dashboard
          </span>
        </div>

        <div className="p-5">
          {/* The four real, shipped features -- same set as pos-deep-dive.jsx */}
          <div className="grid grid-cols-2 gap-3">
            {FEATURES.map(({ id, label, icon: Icon, fill }) => (
              <div
                key={id}
                className="rounded-md border border-rule bg-paper/60 p-3 flex flex-col gap-3"
              >
                <span className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wide text-ink-soft">
                  <Icon size={12} aria-hidden="true" />
                  {label}
                </span>
                <div className="h-1.5 rounded-full bg-rule overflow-hidden">
                  <div
                    style={{ width: `${fill}%` }}
                    className="h-full rounded-full bg-accent-ink/50"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* AI: now live, styled distinctly from the metric tiles above
              since it's conversational (a question box), not a bar chart */}
          <div className="mt-3 rounded-md border border-accent-ink/30 bg-paper/60 p-3 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wide text-ink-soft">
              <Sparkles size={12} className="text-accent-ink" aria-hidden="true" />
              Ask Trimora AI
            </span>
            <span className="text-[10px] font-mono uppercase tracking-wide text-accent-ink">Live</span>
          </div>
        </div>
      </div>

      {/* Overlapping mobile app card */}
      <div className="hidden sm:flex absolute -bottom-6 -right-6 w-28 rounded-lg border border-rule bg-paper-2 shadow-xl shadow-black/40 p-3 flex-col gap-2">
        <span className="flex items-center gap-1 text-[9px] font-mono uppercase tracking-wide text-ink-soft">
          Mobile
        </span>
        <span className="h-1.5 w-full rounded-full bg-rule" />
        <span className="h-1.5 w-4/5 rounded-full bg-rule" />
        <span className="h-1.5 w-full rounded-full bg-accent-ink/40" />
      </div>

      <p className="mt-8 sm:mt-4 text-center lg:text-left text-[11px] font-mono text-ink-soft">
        Illustrative preview — not actual account data
      </p>
    </div>
  );
}
