import { Counter } from "@/components/counter";
import { Reveal } from "@/components/reveal";

// Deliberately only includes numbers we can actually stand behind today:
// named active clients (4: Kimms Beauty, Urban Streets, Lavish Lux, Grace
// Beauty) and confirmed-live verticals (Beauty + Auto). No transaction
// volume or uptime % included -- those weren't in the brief as confirmed
// facts, and publishing an invented "1000+" or "99.9%" would be exactly
// the kind of unverified claim to avoid. Swap in real figures here the
// moment they exist.
const STATS = [
  { id: "businesses", value: 4, suffix: "+", label: "Active Businesses" },
  { id: "verticals", value: 2, suffix: "", label: "Live Product Verticals" },
  { id: "architecture", text: "Multi-Tenant", label: "Platform Architecture" },
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
              {stat.text ?? <Counter target={stat.value} suffix={stat.suffix} />}
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
