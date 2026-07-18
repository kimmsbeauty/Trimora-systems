import Link from "next/link";
import { ArrowRight, Sparkles, Car } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Added per audit follow-up (2026-07-18): the homepage never mentioned
// Trimora Auto anywhere -- a second live, real vertical (per /solutions),
// only discoverable by clicking into Solutions specifically. For a
// platform whose whole "ecosystem" pitch is about growing beyond one
// product, having the homepage itself only ever speak in
// salon-flavored/generic language undersold that. Config mirrors
// /solutions' POS_VERTICALS so the two stay in sync -- add a third
// vertical there and it belongs here too.
const VERTICALS = [
  {
    id: "beauty",
    href: "/beauty",
    name: "Trimora Beauty",
    icon: Sparkles,
    description: "For salons, barbershops, and spas.",
  },
  {
    id: "auto",
    href: "/auto",
    name: "Trimora Auto",
    icon: Car,
    description: "For car washes and detailing businesses.",
  },
];

export function Verticals() {
  return (
    <section aria-labelledby="verticals-heading" className="py-20 sm:py-28 border-t border-rule">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-14 sm:mb-16">
          <h2
            id="verticals-heading"
            className="font-display text-2xl sm:text-3xl lg:text-4xl text-ink mb-4 leading-snug"
          >
            Already running two kinds of business.
          </h2>
          <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
            The same platform, adapted for the business you run — live today, not a
            someday roadmap item.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          {VERTICALS.map(({ id, href, name, icon: Icon, description }) => (
            <Link
              key={id}
              href={href}
              className="group flex flex-col gap-4 rounded-lg border border-rule bg-paper-2 p-8 hover:border-accent-ink/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <Icon className="text-accent-ink" size={28} strokeWidth={1.75} aria-hidden="true" />
                <Badge variant="available">Live Today</Badge>
              </div>
              <h3 className="font-display text-xl text-ink">{name}</h3>
              <p className="text-sm text-ink-muted leading-relaxed flex-1">{description}</p>
              <span className="flex items-center gap-1.5 text-sm text-accent-ink group-hover:gap-2.5 transition-all">
                Explore {name}
                <ArrowRight size={16} aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>

        <Link
          href="/solutions"
          className="text-sm text-ink-muted hover:text-ink underline underline-offset-4 transition-colors"
        >
          See all solutions
        </Link>
      </div>
    </section>
  );
}
