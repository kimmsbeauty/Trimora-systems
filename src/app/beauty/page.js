import { CreditCard, Smartphone, CheckCircle2 } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Badge } from "@/components/ui/badge";
import { PosDeepDive } from "@/components/pos-deep-dive";
import { HeroMockup } from "@/components/hero-mockup";
import { BeautyDeepDive } from "@/components/beauty-deep-dive";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CtaButton } from "@/components/cta-button";

export const metadata = buildMetadata({
  title: "Trimora Beauty — Trimora Systems",
  description:
    "Trimora Beauty: point-of-sale, scheduling, inventory, and M-Pesa payments for salons, barbershops, beauty shops, spas, and nail studios in Kenya — live today.",
  path: "/beauty",
});

// Quick-scan feature badges (audit follow-up, 2026-07-18): lets a visitor
// confirm what the product does in seconds, without reading the full
// PosDeepDive section below. Every label maps directly to a real,
// shipped feature already detailed in PosDeepDive -- not a separate or
// broader claim, just a faster-to-scan summary of the same four
// capabilities plus the two platform-level facts (cloud-based,
// multi-tenant) already stated elsewhere on this page.
const FEATURE_BADGES = [
  "Appointments",
  "POS & Checkout",
  "Inventory",
  "Staff Management",
  "Reports",
  "Cloud-Based",
];

const PAYMENT_METHODS = [
  {
    id: "mpesa",
    icon: Smartphone,
    title: "M-Pesa built in",
    description:
      "Accept Till, Paybill, or Send Money — configured per business, so each salon uses the setup that already works for them.",
  },
  {
    id: "cash",
    icon: CreditCard,
    title: "Cash, still supported",
    description: "Not every transaction is digital. Cash is a first-class payment option, not an afterthought.",
  },
];

export default function Page() {
  return (
    <main className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 pt-32 pb-4 text-center">
        <div className="flex justify-center mb-5">
          <Badge variant="available">Live Today</Badge>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-ink mb-5 leading-tight">
          Trimora Beauty
        </h1>
        <p className="text-base sm:text-lg text-ink-muted max-w-2xl mx-auto mb-8 leading-relaxed">
          Trimora POS for salons, barbershops, beauty shops, spas, and nail studios — live
          today, handling checkout, scheduling, inventory, and reporting for real businesses
          across Kenya.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {FEATURE_BADGES.map((label) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 rounded-full border border-rule bg-paper-2/60 px-3 py-1.5 text-xs text-ink-muted"
            >
              <CheckCircle2 className="text-accent-ink" size={13} strokeWidth={2} aria-hidden="true" />
              {label}
            </span>
          ))}
        </div>
        <CtaButton source="beauty" />
      </div>

      <div className="max-w-md mx-auto px-6 pt-16 sm:pt-20">
        <HeroMockup />
      </div>

      <PosDeepDive />

      <BeautyDeepDive />

      <section aria-labelledby="payments-heading" className="py-20 sm:py-28 border-t border-rule">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-14 sm:mb-16">
            <h2
              id="payments-heading"
              className="font-display text-2xl sm:text-3xl lg:text-4xl text-ink mb-4 leading-snug"
            >
              Payments that match how Kenyan businesses get paid
            </h2>
            <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
              No forcing customers into one payment flow. Trimora supports the ways your
              customers already pay.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
            {PAYMENT_METHODS.map(({ id, icon: Icon, title, description }) => (
              <Card key={id} className="flex flex-col gap-3">
                <CardHeader className="mb-0">
                  <Icon className="text-accent-ink" size={24} strokeWidth={1.75} aria-hidden="true" />
                </CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 border-t border-rule text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display text-2xl sm:text-3xl text-ink mb-4 leading-snug">
            See it running on a real business
          </h2>
          <p className="text-sm sm:text-base text-ink-muted mb-8 leading-relaxed">
            Book a short walkthrough and we&apos;ll show you Trimora Beauty set up the way your
            business would actually use it.
          </p>
          <CtaButton source="beauty" />
        </div>
      </section>
    </main>
  );
}
