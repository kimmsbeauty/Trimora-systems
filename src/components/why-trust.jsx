import { Cloud, TrendingUp, Sparkles, Rocket, Cpu, MessageSquare } from "lucide-react";

// Replaces the brief's 3.12 Testimonials slot. We have no live customer
// testimonials yet (still onboarding), and per explicit decision we will
// not publish fabricated or placeholder quotes. These six statements are
// all verifiable facts about the platform itself, not customer claims --
// this section is designed to be swapped for real Customer Success
// content (verified quotes, names with permission, measurable results)
// once that content genuinely exists.
const TRUST_SIGNALS = [
  {
    id: "cloud-secure",
    icon: Cloud,
    label: "Cloud-Based & Secure",
    description: "Your business data is securely stored and accessible from anywhere.",
  },
  {
    id: "growth",
    icon: TrendingUp,
    label: "Designed for Growth",
    description: "Built on a scalable architecture that grows with your business.",
  },
  {
    id: "ai-ready",
    icon: Sparkles,
    label: "AI-Ready Platform",
    description:
      "The foundation is designed to support intelligent business insights as the ecosystem evolves.",
  },
  {
    id: "innovation",
    icon: Rocket,
    label: "Continuous Innovation",
    description: "Trimora Systems is actively expanding with new products and capabilities.",
  },
  {
    id: "modern-tech",
    icon: Cpu,
    label: "Reliable & Modern Technology",
    description: "Built using modern technologies for speed, security, and maintainability.",
  },
  {
    id: "customer-centric",
    icon: MessageSquare,
    label: "Customer-Centric Development",
    description: "We improve the platform based on real customer feedback and business needs.",
  },
];

export function WhyTrust() {
  return (
    <section aria-labelledby="why-trust-heading" className="py-20 sm:py-28 border-t border-rule">
      <div className="max-w-6xl mx-auto px-6">
        <h2
          id="why-trust-heading"
          className="font-display text-2xl sm:text-3xl lg:text-4xl text-ink max-w-2xl mb-14 sm:mb-16 leading-snug"
        >
          Why Trust Trimora Systems
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-8">
          {TRUST_SIGNALS.map(({ id, icon: Icon, label, description }) => (
            <div key={id} className="flex flex-col items-start gap-4">
              <Icon
                className="text-accent-ink"
                size={26}
                strokeWidth={1.75}
                aria-hidden="true"
              />
              <h3 className="font-body font-semibold text-base text-ink">
                {label}
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
