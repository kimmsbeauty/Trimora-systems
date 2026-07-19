import { Brain } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Abstract network visual only -- deliberately not a screenshot of a
// feature that doesn't exist yet, per the brief's explicit warning
// against overselling this section.
function IntelligenceVisual() {
  const nodes = [
    { x: 30, y: 40 },
    { x: 170, y: 30 },
    { x: 190, y: 130 },
    { x: 40, y: 150 },
    { x: 110, y: 20 },
    { x: 150, y: 170 },
  ];
  const center = { x: 110, y: 95 };

  return (
    <div className="hidden sm:flex relative w-full max-w-sm mx-auto items-center justify-center aspect-square">
      <div className="absolute w-40 h-40 rounded-full bg-accent-ink/10 blur-2xl" />
      <svg viewBox="0 0 220 190" className="w-full h-full" aria-hidden="true">
        {nodes.map((n, i) => (
          <line
            key={i}
            x1={center.x}
            y1={center.y}
            x2={n.x}
            y2={n.y}
            stroke="var(--color-rule)"
            strokeWidth="1"
          />
        ))}
        {nodes.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={i % 2 === 0 ? 4 : 3}
            fill="var(--color-accent-ink)"
            fillOpacity="0.5"
          />
        ))}
      </svg>
      <div className="absolute w-16 h-16 rounded-full bg-paper-2 border border-accent-ink/40 flex items-center justify-center">
        <Brain className="text-accent-ink" size={26} strokeWidth={1.75} aria-hidden="true" />
      </div>
    </div>
  );
}

export function Intelligence() {
  return (
    <section aria-labelledby="intelligence-heading" className="py-20 sm:py-28 border-t border-rule">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 items-center">
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-3 mb-5">
              <h2
                id="intelligence-heading"
                className="font-display text-2xl sm:text-3xl lg:text-4xl text-ink"
              >
                Trimora AI
              </h2>
              <Badge variant="available">Available Now</Badge>
            </div>
            <p className="text-sm sm:text-base text-ink-muted leading-relaxed max-w-md mx-auto sm:mx-0 mb-4">
              Most POS systems stop at recording the transaction. Trimora goes further — ask
              a question about your business, in plain language, and get an answer.
            </p>
            <p className="text-sm sm:text-base text-ink-muted leading-relaxed max-w-md mx-auto sm:mx-0">
              &quot;How much did I make this week?&quot; &quot;What are my best sellers this
              month?&quot; Ask like you would a colleague, and get an instant answer built
              from your own real data — no digging through reports. Your data stays yours:
              business records are never exposed to a third-party AI provider in the
              process.
            </p>
          </div>

          <IntelligenceVisual />
        </div>
      </div>
    </section>
  );
}
