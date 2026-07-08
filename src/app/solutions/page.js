import Link from "next/link";
import { ArrowRight, Sparkles, Car } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Badge } from "@/components/ui/badge";

export const metadata = buildMetadata({
  title: "Solutions — Trimora Systems",
  description:
    "Trimora POS is one platform, built for how service businesses actually run — starting with Trimora Beauty, and now expanding into Trimora Auto.",
  path: "/solutions",
});

const VERTICALS = [
  {
    id: "beauty",
    href: "/beauty",
    name: "Trimora Beauty",
    icon: Sparkles,
    status: "available",
    statusLabel: "Live Today",
    description:
      "For salons, barbershops, and spas. Checkout, scheduling, inventory, and M-Pesa payments — live today, running real businesses across Kenya.",
    cta: "Explore Trimora Beauty",
  },
  {
    id: "auto",
    href: "/auto",
    name: "Trimora Auto",
    icon: Car,
    status: "comingSoon",
    statusLabel: "Coming Soon",
    description:
      "For car washes and detailing businesses. The same trusted platform, built for a new kind of business.",
    cta: "Learn more",
  },
];

export default function Page() {
  return (
    <main className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-4 text-center">
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-ink mb-5 leading-tight">
          One platform. Purpose-built for how you run your business.
        </h1>
        <p className="text-base sm:text-lg text-ink-muted max-w-2xl mx-auto leading-relaxed">
          Trimora POS is the platform underneath every Trimora product — the same trusted
          foundation, adapted for the specific business you run.
        </p>
      </div>

      <section aria-label="Trimora verticals" className="py-20 sm:py-28 border-t border-rule">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {VERTICALS.map(({ id, href, name, icon: Icon, status, statusLabel, description, cta }) => (
            <Link
              key={id}
              href={href}
              className="group flex flex-col gap-4 rounded-lg border border-rule bg-paper-2 p-8 hover:border-accent-ink/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <Icon className="text-accent-ink" size={28} strokeWidth={1.75} aria-hidden="true" />
                <Badge variant={status}>{statusLabel}</Badge>
              </div>
              <h2 className="font-display text-2xl text-ink">{name}</h2>
              <p className="text-sm text-ink-muted leading-relaxed flex-1">{description}</p>
              <span className="flex items-center gap-1.5 text-sm text-accent-ink group-hover:gap-2.5 transition-all">
                {cta}
                <ArrowRight size={16} aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
