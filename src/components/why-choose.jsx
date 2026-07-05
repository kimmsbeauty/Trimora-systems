import { Sprout, Network, Globe, ShieldCheck } from "lucide-react";

const DIFFERENTIATORS = [
  {
    id: "grow-with-you",
    icon: Sprout,
    label: "Built to grow with you",
    description:
      "Start with what you need today, add more as your business grows — without switching platforms.",
  },
  {
    id: "connected-system",
    icon: Network,
    label: "One connected system",
    description: "No more stitching together tools that don't talk to each other.",
  },
  {
    id: "local-support",
    icon: Globe,
    label: "Local support, global standards",
    description:
      "Reach us by email or WhatsApp and get a same-business-day response — from a team that knows how Kenyan salons actually run.",
  },
  {
    id: "data-trust",
    icon: ShieldCheck,
    label: "Data you can trust",
    description:
      "Every salon's data is isolated with row-level security, PINs are stored hashed rather than in plain text, and all traffic runs over HTTPS.",
  },
];

export function WhyChoose() {
  return (
    <section aria-labelledby="why-choose-heading" className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <h2
          id="why-choose-heading"
          className="font-display text-2xl sm:text-3xl lg:text-4xl text-ink max-w-2xl mb-14 sm:mb-16 leading-snug"
        >
          Why businesses choose Trimora
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8">
          {DIFFERENTIATORS.map(({ id, icon: Icon, label, description }) => (
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
