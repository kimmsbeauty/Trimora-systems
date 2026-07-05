import { buildMetadata } from "@/lib/seo";
import { LegalSection } from "@/components/legal-section";

export const metadata = buildMetadata({
  title: "Compliance — Trimora Systems",
  description: "Trimora Systems' approach to data protection and payment compliance.",
  path: "/legal/compliance",
});

const SECTIONS = [
  {
    heading: "Data protection",
    body: [
      "Trimora is designed with data protection principles aligned to the Kenya Data Protection Act, 2019 — see our Privacy Policy for the full detail on what we collect, how it's used, and the rights available to you.",
    ],
  },
  {
    heading: "Payment compliance",
    body: [
      "Payment processing runs through licensed providers such as M-Pesa. Trimora does not store payment credentials — M-Pesa PINs, card numbers, or CVV codes never touch our systems.",
    ],
  },
  {
    heading: "Certifications",
    body: [
      "Trimora does not currently hold formal third-party certifications such as ISO 27001 or SOC 2. If a certification is part of your own procurement requirements, get in touch and we'll talk through what's realistic and on what timeline.",
    ],
  },
  {
    heading: "Questions",
    body: [
      "For compliance questions specific to your business — including due-diligence or procurement requirements — reach out at support@trimorasystems.com.",
    ],
  },
];

export default function Page() {
  return (
    <main className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        <h1 className="font-display text-3xl sm:text-4xl text-ink mb-2">Compliance</h1>
        <p className="text-ink-soft text-sm mb-12">Our approach to data protection and payment compliance</p>

        {SECTIONS.map((section) => (
          <LegalSection key={section.heading} {...section} />
        ))}
      </div>
    </main>
  );
}
