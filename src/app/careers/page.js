import { Scissors, Armchair, Flower2, Sparkles, ShoppingBag, TrendingUp, ShieldCheck, Users, Coins, MessageCircle } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata = buildMetadata({
  title: "Careers — Trimora Systems",
  description: "We're hiring a Marketing Partner to help bring Trimora POS to more beauty and wellness businesses.",
  path: "/careers",
});

const TARGET_BUSINESSES = [
  { id: "salons", icon: Scissors, label: "Salons" },
  { id: "barbershops", icon: Armchair, label: "Barbershops" },
  { id: "parlours", icon: Flower2, label: "Beauty Parlours" },
  { id: "spas", icon: Sparkles, label: "Spas" },
  { id: "shops", icon: ShoppingBag, label: "Beauty Shops" },
];

const WHY_THIS_ROLE = [
  {
    id: "demand",
    icon: TrendingUp,
    title: "High demand",
    description: "The beauty industry is growing fast — and so is the need for smarter business tools.",
  },
  {
    id: "proven",
    icon: ShieldCheck,
    title: "Proven solution",
    description: "A complete business management platform, already live and trusted by real salons, barbershops, spas, and beauty shops.",
  },
  {
    id: "impact",
    icon: Users,
    title: "Make an impact",
    description: "Help business owners work smarter, serve more clients, and increase profits.",
  },
  {
    id: "opportunity",
    icon: Coins,
    title: "Great opportunity",
    description: "Real earning potential and a long-term partnership as we grow together.",
  },
];

export default function Page() {
  return (
    <main className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-4 text-center">
        <div className="flex justify-center mb-5">
          <Badge variant="available">Hiring</Badge>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-ink mb-3 leading-tight">
          We&apos;re looking for a Marketing Partner
        </h1>
        <p className="text-sm font-mono text-ink-soft mb-8">Full-time · Hybrid</p>
        <p className="text-base sm:text-lg text-ink-muted max-w-2xl mx-auto mb-4 leading-relaxed">
          Help us bring Trimora POS — our all-in-one business management solution — to more
          beauty and wellness businesses across Kenya.
        </p>
      </div>

      <section aria-labelledby="target-heading" className="py-16 sm:py-20 border-t border-rule">
        <div className="max-w-5xl mx-auto px-6">
          <h2 id="target-heading" className="font-display text-xl sm:text-2xl text-ink mb-10 text-center">
            You&apos;ll be helping us reach
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-6">
            {TARGET_BUSINESSES.map(({ id, icon: Icon, label }) => (
              <div key={id} className="flex flex-col items-center gap-3 text-center">
                <span className="flex items-center justify-center w-14 h-14 rounded-full bg-ink text-paper">
                  <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span className="text-sm text-ink-muted">{label}</span>
              </div>
            ))}
          </div>
          <p className="text-sm sm:text-base text-ink-muted text-center max-w-2xl mx-auto mt-10 leading-relaxed">
            Our all-in-one solution helps beauty businesses streamline operations — managing
            clients, appointments, staff, inventory, and sales — so they can focus on what they
            do best and grow faster.
          </p>
        </div>
      </section>

      <section aria-labelledby="why-role-heading" className="py-16 sm:py-20 border-t border-rule">
        <div className="max-w-5xl mx-auto px-6">
          <h2 id="why-role-heading" className="font-display text-xl sm:text-2xl text-ink mb-10 text-center">
            Why this role
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_THIS_ROLE.map(({ id, icon: Icon, title, description }) => (
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

      <section className="py-16 sm:py-20 border-t border-rule">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="text-base text-ink-muted mb-8 leading-relaxed">
            If you have a passion for sales and marketing — or know someone who&apos;d be a great
            fit — message us on WhatsApp for more details.
          </p>
          <Button
            as="a"
            href="https://wa.me/254702904562"
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            className="inline-flex items-center gap-2"
          >
            <MessageCircle size={18} strokeWidth={1.75} aria-hidden="true" />
            WhatsApp +254 702 904 562
          </Button>
          <p className="text-sm font-mono text-ink-soft mt-10">Let&apos;s grow businesses. Together.</p>
        </div>
      </section>
    </main>
  );
}
