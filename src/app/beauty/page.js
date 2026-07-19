import { CreditCard, Smartphone, Percent, Users, Building2 } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Badge } from "@/components/ui/badge";
import { PosDeepDive } from "@/components/pos-deep-dive";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CtaButton } from "@/components/cta-button";

export const metadata = buildMetadata({
  title: "Trimora Beauty — Trimora Systems",
  description:
    "Trimora Beauty: point-of-sale, scheduling, inventory, and M-Pesa payments for salons, barbershops, and spas in Kenya — live today.",
  path: "/beauty",
});

// Added per audit follow-up (2026-07-18): Beauty previously only surfaced
// the same 4 generic POS features shown on the homepage (PosDeepDive is
// shared between / and /beauty), with no equivalent to the secondary
// feature grid Auto received. Every item below is real, shipped
// capability verified against the schema (sales.is_multi_stylist /
// commission_by_stylist, sales.discount_type / discount_amount /
// discount_reason, customers.visit_count / total_spend) -- not
// aspirational. "Multi-branch ready" moved here from the Payments
// section below, where it didn't belong (multi-tenancy isn't a payment
// method).
const SECONDARY_FEATURES = [
  {
    id: "commission-splits",
    icon: Users,
    title: "Multi-stylist commission splits",
    description: "One service, multiple stylists — commission divides automatically, correctly.",
  },
  {
    id: "discounts",
    icon: Percent,
    title: "Discounts & promotions",
    description: "Percentage, fixed amount, or membership-based — with a reason logged every time.",
  },
  {
    id: "customer-history",
    icon: CreditCard,
    title: "Customer profiles & visit history",
    description: "Visit count, total spend, and history — searchable per customer.",
  },
  {
    id: "multi-branch",
    icon: Building2,
    title: "Built for more than one location",
    description:
      "Each business's data stays fully separate from every other business on Trimora — the platform is multi-tenant by design, not bolted on.",
  },
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
        <p className="text-base sm:text-lg text-ink-muted max-w-2xl mx-auto mb-10 leading-relaxed">
          Trimora POS for salons, barbershops, and spas — live today, handling checkout,
          scheduling, inventory, and reporting for real businesses across Kenya.
        </p>
        <CtaButton source="beauty" />
      </div>

      <PosDeepDive />

      <section aria-labelledby="beauty-secondary-heading" className="py-20 sm:py-28 border-t border-rule">
        <div className="max-w-6xl mx-auto px-6">
          <h2 id="beauty-secondary-heading" className="sr-only">
            More capabilities built for salons
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8">
            {SECONDARY_FEATURES.map(({ id, icon: Icon, title, description }) => (
              <div key={id} className="flex flex-col items-start gap-4">
                <Icon className="text-accent-ink" size={26} strokeWidth={1.75} aria-hidden="true" />
                <h3 className="font-body font-semibold text-base text-ink">{title}</h3>
                <p className="text-sm text-ink-muted leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
