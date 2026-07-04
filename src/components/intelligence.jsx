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
      <div className="absolute w-40 h-40 rounded-full bg-gold-500/10 blur-2xl" />
      <svg viewBox="0 0 220 190" className="w-full h-full" aria-hidden="true">
        {nodes.map((n, i) => (
          <line
            key={i}
            x1={center.x}
            y1={center.y}
            x2={n.x}
            y2={n.y}
            stroke="var(--color-ink-700)"
            strokeWidth="1"
          />
        ))}
        {nodes.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={i % 2 === 0 ? 4 : 3}
            fill="var(--color-gold-500)"
            fillOpacity="0.5"
          />
        ))}
      </svg>
      <div className="absolute w-16 h-16 rounded-full bg-ink-900 border border-gold-500/40 flex items-center justify-center">
        <Brain className="text-gold-400" size={26} strokeWidth={1.75} aria-hidden="true" />
      </div>
    </div>
  );
}

export function Intelligence() {
  return (
    <section aria-labelledby="intelligence-heading" className="py-20 sm:py-28 border-t border-ink-700">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 items-center">
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-3 mb-5">
              <h2
                id="intelligence-heading"
                className="font-display text-2xl sm:text-3xl lg:text-4xl text-text"
              >
                Trimora AI
              </h2>
              <Badge variant="comingSoon">Coming Soon</Badge>
            </div>
            <p className="text-sm sm:text-base text-text-dim leading-relaxed max-w-md mx-auto sm:mx-0">
              Smarter tools are on the way to help you understand your
              business and make better decisions — from spotting trends to
              flagging what needs your attention. Built to assist, not
              replace, your judgment.
            </p>
          </div>

          <IntelligenceVisual />
        </div>
      </div>
    </section>
  );
}
