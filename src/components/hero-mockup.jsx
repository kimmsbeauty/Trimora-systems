import { LayoutDashboard, Calendar, Sparkles, Smartphone, TrendingUp } from "lucide-react";

// This is an illustrative composite — it represents the surfaces (dashboard,
// analytics, calendar, AI insights, mobile) without fabricating real
// business figures. Bars/values are abstract shapes, not claimed data.
const SPARKLINE = [40, 65, 50, 80, 60, 90, 70];

export function HeroMockup() {
  return (
    <div
      className="relative w-full max-w-md mx-auto lg:mx-0"
      role="img"
      aria-label="Illustrative preview of the Trimora POS dashboard, showing analytics, calendar, and AI insights panels"
    >
      {/* Main dashboard card */}
      <div className="rounded-xl border border-ink-700 bg-ink-900 shadow-2xl shadow-black/40 overflow-hidden">
        {/* Window chrome */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-ink-700 bg-ink-900">
          <span className="w-2.5 h-2.5 rounded-full bg-ink-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-ink-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-ink-700" />
          <span className="ml-2 flex items-center gap-1.5 text-[11px] font-mono text-text-faint">
            <LayoutDashboard size={12} aria-hidden="true" />
            Trimora POS — Dashboard
          </span>
        </div>

        <div className="p-5 space-y-4">
          {/* Abstract stat tiles */}
          <div className="grid grid-cols-3 gap-3">
            {["Revenue", "Bookings", "Customers"].map((label) => (
              <div
                key={label}
                className="rounded-md border border-ink-700 bg-ink-950/60 p-3 flex flex-col gap-2"
              >
                <span className="text-[10px] font-mono uppercase tracking-wide text-text-faint">
                  {label}
                </span>
                <span className="h-2 w-3/4 rounded-full bg-gold-500/30" />
              </div>
            ))}
          </div>

          {/* Analytics sparkline */}
          <div className="rounded-md border border-ink-700 bg-ink-950/60 p-3">
            <div className="flex items-center justify-between mb-3">
              <span className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wide text-text-faint">
                <TrendingUp size={12} aria-hidden="true" />
                Analytics
              </span>
            </div>
            <div className="flex items-end gap-1.5 h-16">
              {SPARKLINE.map((h, i) => (
                <span
                  key={i}
                  style={{ height: `${h}%` }}
                  className="flex-1 rounded-sm bg-gold-500/40"
                />
              ))}
            </div>
          </div>

          {/* Calendar + AI insights row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-md border border-ink-700 bg-ink-950/60 p-3">
              <span className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wide text-text-faint mb-2">
                <Calendar size={12} aria-hidden="true" />
                Calendar
              </span>
              <div className="grid grid-cols-5 gap-1">
                {Array.from({ length: 10 }).map((_, i) => (
                  <span
                    key={i}
                    className={`aspect-square rounded-sm ${
                      i === 6 ? "bg-gold-500/60" : "bg-ink-700"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="rounded-md border border-gold-500/30 bg-gold-500/5 p-3 flex flex-col justify-between">
              <span className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wide text-gold-400">
                <Sparkles size={12} aria-hidden="true" />
                AI Insights
              </span>
              <span className="text-[11px] text-text-dim leading-snug">
                Coming soon
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Overlapping mobile app card */}
      <div className="hidden sm:flex absolute -bottom-6 -right-6 w-28 rounded-lg border border-ink-700 bg-ink-900 shadow-xl shadow-black/40 p-3 flex-col gap-2">
        <span className="flex items-center gap-1 text-[9px] font-mono uppercase tracking-wide text-text-faint">
          <Smartphone size={10} aria-hidden="true" />
          Mobile
        </span>
        <span className="h-1.5 w-full rounded-full bg-ink-700" />
        <span className="h-1.5 w-4/5 rounded-full bg-ink-700" />
        <span className="h-1.5 w-full rounded-full bg-gold-500/40" />
      </div>

      <p className="mt-8 sm:mt-4 text-center lg:text-left text-[11px] font-mono text-text-faint">
        Illustrative preview — not actual account data
      </p>
    </div>
  );
}
