import Link from "next/link";
import { ArrowRight, Sparkles, Car, Layers } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Badge } from "@/components/ui/badge";
import { CtaButton } from "@/components/cta-button";

export const metadata = buildMetadata({
  title: "Solutions — Trimora Systems",
  description:
    "Trimora POS is one platform, built for how service businesses actually run — Trimora Beauty for salons, and Trimora Auto for car washes and detailing.",
  path: "/solutions",
});

// "bestFor" added per explicit decision (2026-07-18): a one-line
// differentiator so the page answers "which product is right for my
// business" at a glance, without duplicating the full feature
// breakdowns that already live on /beauty and /auto.
const POS_VERTICALS = [
  {
    id: "beauty",
    href: "/beauty",
    name: "Trimora Beauty",
    icon: Sparkles,
    statusLabel: "Live Today",
    bestFor: "Best for salons, barbershops, spas, and other beauty businesses.",
    description:
      "Checkout, scheduling, inventory, and M-Pesa payments — live today, running real businesses across Kenya.",
    cta: "Explore Trimora Beauty",
  },
  {
    id: "auto",
    href: "/auto",
    name: "Trimora Auto",
    icon: Car,
    statusLabel: "Live Today",
    bestFor: "Best for car washes and detailing businesses.",
    description:
      "Bay queues, vehicle inspections, wash packages, and M-Pesa payments — live today, running real businesses across Kenya.",
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
            Built out for two kinds of business today — each with its own dedicated
            experience.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {POS_VERTICALS.map(({ id, href, name, icon: Icon, statusLabel, bestFor, description, cta }) => (
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
                <p className="text-sm font-medium text-ink">{bestFor}</p>
                <p className="text-sm text-ink-muted leading-relaxed flex-1">{description}</p>
                <span className="flex items-center gap-1.5 text-sm text-accent-ink group-hover:gap-2.5 transition-all">
                  {cta}
                  <ArrowRight size={16} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>

          {/* Subtle forward-looking note, per explicit decision: acknowledge
              the platform is growing without turning this page into a
              roadmap -- that content lives on the homepage Ecosystem
              section, linked here rather than duplicated. */}
          <p className="text-center text-sm text-ink-soft mt-10">
            Trimora is continuously expanding into new business verticals as part of our
            growing platform.{" "}
            <Link href="/#ecosystem" className="text-accent-ink hover:underline">
              Learn about the Trimora ecosystem
            </Link>
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-28 border-t border-rule text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display text-2xl sm:text-3xl text-ink mb-4 leading-snug">
            Not sure which one fits? Let&apos;s talk.
          </h2>
          <p className="text-sm sm:text-base text-ink-muted mb-8 leading-relaxed">
            Book a short walkthrough and we&apos;ll show you Trimora set up the way your
            business would actually use it.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <CtaButton source="solutions" label="Book a Demo" />
            <Link href="/#pricing" className="text-sm text-ink-muted hover:text-accent-ink transition-colors">
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
