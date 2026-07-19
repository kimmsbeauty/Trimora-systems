import { Counter } from "@/components/counter";
import { Reveal } from "@/components/reveal";
import { COMPANY_STATS } from "@/lib/stats";

// Figures now sourced from src/lib/stats.js (single source of truth) --
// only "Kenya" stays local since it's not a number, not a shared metric.
const STATS = [
  { id: "businesses", ...COMPANY_STATS.activeBusinesses },
  { id: "transactions", ...COMPANY_STATS.transactionsProcessed },
  { id: "uptime", ...COMPANY_STATS.systemUptime },
  { id: "market", text: "Kenya", label: "Built for African Businesses" },
];

export function AboutStats() {
  return (
    <section aria-labelledby="about-stats-heading" className="py-16 sm:py-20 border-t border-rule">
      <h2 id="about-stats-heading" className="sr-only">
        Trimora Systems by the numbers
      </h2>
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 text-center">
        {STATS.map((stat, i) => (
          <Reveal key={stat.id} delay={i * 100}>
            <p className="font-display text-3xl sm:text-4xl text-accent-ink mb-2">
              {stat.text ?? (
                <Counter target={stat.value} suffix={stat.suffix} decimals={stat.decimals ?? 0} />
              )}
            </p>
            <p className="text-xs sm:text-sm font-mono uppercase tracking-wide text-ink-soft">
              {stat.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
