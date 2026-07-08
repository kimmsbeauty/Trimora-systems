import { ShieldCheck, Calendar, Smartphone, Building2 } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AutoCtaButton } from "@/components/auto-cta-button";
import { ChatWidget } from "@/components/chat-widget";

export const metadata = buildMetadata({
  title: "Trimora Auto — Trimora Systems",
  description: "Coming soon: the Trimora platform, built for car washes and detailing businesses in Kenya.",
  path: "/auto",
});

const BUILT_ON = [
  {
    id: "security",
    icon: ShieldCheck,
    title: "The same trusted engine",
    description:
      "Row-Level Security, hashed staff PINs, and HTTPS everywhere — the same foundation already running real businesses on Trimora POS, not a rebuild from scratch.",
  },
  {
    id: "scheduling",
    icon: Calendar,
    title: "Scheduling that fits how you work",
    description: "Book wash and detailing slots, track staff, and see your day at a glance.",
  },
  {
    id: "payments",
    icon: Smartphone,
    title: "Payments that match how you get paid",
    description: "M-Pesa — Till, Paybill, or Send Money — plus cash, same as the rest of the Trimora platform.",
  },
  {
    id: "multi-branch",
    icon: Building2,
    title: "Built for more than one site",
    description: "Multi-tenant from the ground up, so growing to a second or third location doesn't mean starting over.",
  },
];

export default function Page() {
  return (
    <main className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-4 text-center">
        <div className="flex justify-center mb-5">
          <Badge variant="comingSoon">Coming Soon</Badge>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-ink mb-5 leading-tight">
          Trimora Auto
        </h1>
        <p className="text-base sm:text-lg text-ink-muted max-w-2xl mx-auto mb-10 leading-relaxed">
          We&apos;re extending Trimora to car washes and detailing businesses in Kenya —
          the same platform already running Trimora Beauty for real salons, built for a new kind of business.
        </p>
        <AutoCtaButton />
      </div>

      <section aria-labelledby="built-on-heading" className="py-20 sm:py-28 border-t border-rule">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-14 sm:mb-16">
            <h2
              id="built-on-heading"
              className="font-display text-2xl sm:text-3xl lg:text-4xl text-ink mb-4 leading-snug"
            >
              Built on what already works
            </h2>
            <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
              Trimora Auto isn&apos;t starting from zero — it&apos;s the same platform and the same
              principles behind Trimora Beauty, adapted for car washes and detailing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {BUILT_ON.map(({ id, icon: Icon, title, description }) => (
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
            We&apos;re building this next
          </h2>
          <p className="text-sm sm:text-base text-ink-muted mb-8 leading-relaxed">
            Join the waitlist and we&apos;ll reach out as soon as Trimora Auto is ready for early access.
          </p>
          <AutoCtaButton />
        </div>
      </section>
      <ChatWidget />
    </main>
  );
}
