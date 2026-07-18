import { LayoutDashboard, CreditCard, CalendarDays, Package, BarChart3, Sparkles } from "lucide-react";

// This is an illustrative composite — it represents the surfaces (checkout,
// scheduling, inventory, reporting) without fabricating real business
// figures. Bars/values are abstract shapes, not claimed data.
//
// Redesigned per audit feedback (2026-07-18): the previous version gave a
// full, primary-weight panel to "AI Insights — Coming soon" in the hero,
// the very first thing a visitor sees, alongside three real feature tiles.
// That gave a not-yet-built feature equal billing with live capabilities.
// This version showcases the four real, shipped Trimora POS features —
// same names and icons as pos-deep-dive.jsx, so the hero reads as an
// honest trailer for what's detailed further down the page, not a
// separate or inflated claim — and demotes AI to a small secondary badge,
// consistent with how it's framed everywhere else on the site (Ecosystem,
// Intelligence, WhyTrust, JourneyTimeline all label it "Coming Soon" /
// "In Development", never presented as available today).
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

          {/* AI: small, secondary, honestly labeled -- not a feature tile */}
          <div className="mt-3 flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wide text-ink-soft">
            <Sparkles size={11} className="text-accent-ink/70" aria-hidden="true" />
            AI Insights — on the roadmap
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
