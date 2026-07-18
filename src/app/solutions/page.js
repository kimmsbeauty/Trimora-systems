import Link from "next/link";
import { ArrowRight, Sparkles, Car, Layers } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Badge } from "@/components/ui/badge";

export const metadata = buildMetadata({
  title: "Solutions — Trimora Systems",
  description:
    "Trimora POS is one platform, built for how service businesses actually run — Trimora Beauty for salons, and Trimora Auto for car washes and detailing.",
  path: "/solutions",
});

const POS_VERTICALS = [
  {
    id: "beauty",
    href: "/beauty",
    name: "Trimora Beauty",
    icon: Sparkles,
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
    statusLabel: "Live Today",
    description:
      "For car washes and detailing businesses. Bay queues, vehicle inspections, wash packages, and M-Pesa payments — live today, running real businesses across Kenya.",
    cta: "Explore Trimora Auto",
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

      <section aria-labelledby="pos-heading" className="py-20 sm:py-28 border-t border-rule">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Layers className="text-accent-ink" size={22} strokeWidth={1.75} aria-hidden="true" />
            <h2 id="pos-heading" className="font-display text-2xl sm:text-3xl text-ink">
              Trimora POS
            </h2>
          </div>
          <p className="text-sm sm:text-base text-ink-muted text-center max-w-xl mx-auto mb-12 leading-relaxed">
            The platform, built out for two kinds of business so far — each with its own
            dedicated experience.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {POS_VERTICALS.map(({ id, href, name, icon: Icon, statusLabel, description, cta }) => (
              <Link
                key={id}
                href={href}
                className="group flex flex-col gap-4 rounded-lg border border-rule bg-paper-2 p-8 hover:border-accent-ink/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <Icon className="text-accent-ink" size={28} strokeWidth={1.75} aria-hidden="true" />
                  <Badge variant="available">{statusLabel}</Badge>
                </div>
                <h3 className="font-display text-2xl text-ink">{name}</h3>
                <p className="text-sm text-ink-muted leading-relaxed flex-1">{description}</p>
                <span className="flex items-center gap-1.5 text-sm text-accent-ink group-hover:gap-2.5 transition-all">
                  {cta}
                  <ArrowRight size={16} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
