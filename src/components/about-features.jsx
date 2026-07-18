import { Sprout, Layers, Zap, ShieldCheck } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Reveal } from "@/components/reveal";

// Grounded in facts already established elsewhere on the site (RLS,
// hashed credentials, multi-tenant architecture, real named businesses
// live today) -- not new claims invented for this section.
const FEATURES = [
  {
    id: "practical",
    icon: Sprout,
    title: "Built for growing businesses",
    description: "Practical software designed around everyday operations, not enterprise overkill.",
  },
  {
    id: "multi-tenant",
    icon: Layers,
    title: "Multi-tenant platform",
    description: "One system, cleanly isolated per business, built to scale from day one.",
  },
  {
    id: "real-usage",
    icon: Zap,
    title: "Real businesses. Real usage.",
    description: "Already powering daily operations for salons and car washes across Kenya.",
  },
  {
    id: "secure",
    icon: ShieldCheck,
    title: "Secure & reliable",
    description: "Cloud-based with row-level security, hashed credentials, and automatic backups.",
  },
];

export function AboutFeatures() {
  return (
    <section aria-labelledby="about-features-heading" className="py-16 sm:py-20 border-t border-rule">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal as="h2" id="about-features-heading" className="font-display text-2xl sm:text-3xl text-ink text-center mb-14 sm:mb-16">
          What we&apos;re building
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map(({ id, icon: Icon, title, description }, i) => (
            <Reveal key={id} delay={i * 100}>
              <Card className="h-full flex flex-col gap-3 hover:border-accent-ink/40 hover:-translate-y-1 transition-all duration-300">
                <CardHeader className="mb-0">
                  <Icon className="text-accent-ink" size={24} strokeWidth={1.75} aria-hidden="true" />
                </CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
