import { CreditCard, Smartphone, Users } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Badge } from "@/components/ui/badge";
import { PosDeepDive } from "@/components/pos-deep-dive";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BeautyCtaButton } from "@/components/beauty-cta-button";
import { ChatWidget } from "@/components/chat-widget";

export const metadata = buildMetadata({
  title: "Trimora Beauty — Trimora Systems",
  description:
    "Trimora Beauty: point-of-sale, scheduling, inventory, and M-Pesa payments for salons, barbershops, and spas in Kenya — live today.",
  path: "/beauty",
});

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
  {
    id: "multi-branch",
    icon: Users,
    title: "Built for more than one location",
    description:
      "Each business's data stays fully separate from every other business on Trimora — the platform is multi-tenant by design, not bolted on.",
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
        <BeautyCtaButton />
      </div>

      <PosDeepDive />

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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
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
          <BeautyCtaButton />
        </div>
      </section>
      <ChatWidget />
    </main>
  );
}
