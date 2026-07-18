import { buildMetadata } from "@/lib/seo";
import { LegalSection } from "@/components/legal-section";

export const metadata = buildMetadata({
  title: "Security — Trimora Systems",
  description: "How Trimora Systems protects your business data.",
  path: "/legal/security",
});

const SECTIONS = [
  {
    heading: "Multi-tenant data isolation",
    body: [
      "Trimora POS is built multi-tenant from the ground up. Row-Level Security (RLS) is enforced on every table in the database, so one business's records — customers, appointments, sales, inventory — are never visible or reachable from another business's account.",
    ],
  },
  {
    heading: "Authentication and access control",
    body: [
      "Staff and admin PINs are hashed before storage and are never stored or transmitted as plain text. Admin and Staff roles have distinct permission levels, so day-to-day staff access is limited to what their role actually needs.",
    ],
  },
  {
    heading: "Encryption in transit",
    body: ["All traffic between your device and Trimora runs over HTTPS/TLS."],
  },
  {
    heading: "Audit logging",
    body: [
      "Key administrative actions are recorded in an audit log, so there's a traceable record of who did what and when.",
    ],
  },
  {
    heading: "Backups",
    body: [
      "We're in the process of establishing a formal automated backup schedule for production data. If backup status is part of your own due diligence, reach out at support@trimorasystems.com for the current state.",
    ],
  },
  {
    heading: "Ongoing security review",
    body: [
      "We conduct periodic reviews of our infrastructure and access controls, and act on findings promptly when they're identified. This is treated as an ongoing practice, not a one-time check.",
    ],
  },
  {
    heading: "Payment data",
    body: [
      "Trimora does not store M-Pesa PINs, card numbers, CVV codes, or online banking passwords. Payment credentials remain with the relevant payment provider — see our Privacy Policy for details.",
    ],
  },
  {
    heading: "Questions",
    body: [
      "If you have a specific security question — as part of your own due diligence, or anything else — reach out directly at support@trimorasystems.com and we'll answer it.",
    ],
  },
];

export default function Page() {
  return (
    <main className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        <h1 className="font-display text-3xl sm:text-4xl text-ink mb-2">Security</h1>
        <p className="text-ink-soft text-sm mb-12">How Trimora Systems protects your business data</p>

        {SECTIONS.map((section) => (
          <LegalSection key={section.heading} {...section} />
        ))}
      </div>
    </main>
  );
}
