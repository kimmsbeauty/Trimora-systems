import { Rocket, Cpu, MessageSquare, Compass } from "lucide-react";

// Refocused (2026-07-18, per explicit decision): previously overlapped
// with WhyChoose (growth, security) and with Ecosystem/Intelligence (AI
// roadmap) -- three of the six original signals repeated claims already
// made elsewhere on the page, just reworded. WhyChoose stays the section
// for concrete product/technical strengths; this section now answers a
// different question entirely -- not "what does the product do" but "why
// trust Trimora as a company and long-term technology partner." Copy is
// written as a statement of philosophy/commitment, not a feature list.
const PRINCIPLES = [
  {
    id: "innovation",
    icon: Rocket,
    label: "Continuous Innovation",
    description:
      "We treat Trimora as a living product, not a finished one — continuously refining it around how our customers actually run their businesses.",
  },
  {
    id: "modern-tech",
    icon: Cpu,
    label: "Reliable & Modern Technology",
    description:
      "Built on a secure, scalable, cloud-native foundation — engineered to be dependable today and adaptable as your business grows.",
  },
  {
    id: "customer-centric",
    icon: MessageSquare,
    label: "Customer-Centric Development",
    description:
      "Every feature we ship is driven by real operational challenges our customers raise, not by technology for its own sake.",
  },
  {
    id: "long-term-vision",
    icon: Compass,
    label: "Long-Term Vision",
    description:
      "Trimora POS is the start of a broader business platform — choosing us means investing in software built to keep evolving with you.",
  },
];

export function WhyTrust() {
  return (
    <section aria-labelledby="why-trust-heading" className="py-20 sm:py-28 border-t border-rule">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-14 sm:mb-16">
          <h2
            id="why-trust-heading"
            className="font-display text-2xl sm:text-3xl lg:text-4xl text-ink mb-4 leading-snug"
          >
            Why trust Trimora as a partner
          </h2>
          <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
            Beyond what the product does today, this is how we build, and what you can
            expect from us over the long run.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8">
          {PRINCIPLES.map(({ id, icon: Icon, label, description }) => (
            <div key={id} className="flex flex-col items-start gap-4">
              <Icon className="text-accent-ink" size={26} strokeWidth={1.75} aria-hidden="true" />
              <h3 className="font-body font-semibold text-base text-ink">{label}</h3>
              <p className="text-sm text-ink-muted leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
