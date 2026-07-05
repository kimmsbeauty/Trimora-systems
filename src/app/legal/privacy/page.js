import { buildMetadata } from "@/lib/seo";
import { LegalSection, LegalDocLayout } from "@/components/legal-section";

export const metadata = buildMetadata({
  title: "Privacy Policy — Trimora Systems",
  description: "How Trimora Systems collects, uses, and protects information across Trimora products.",
  path: "/legal/privacy",
});

const EFFECTIVE_DATE = "5 July 2026";

const SECTIONS = [
  {
    heading: "1. Introduction",
    body: [
      "Welcome to Trimora Systems Limited (\u201cTrimora\u201d, \u201cwe\u201d, \u201cour\u201d, or \u201cus\u201d). Your privacy is important to us.",
      "This Privacy Policy explains how Trimora collects, uses, stores, protects, and shares personal information when you use any Trimora product, service, website, application, API, or future platform operated by Trimora Systems Limited.",
      "This policy applies to all current and future Trimora products unless explicitly stated otherwise, including Trimora POS, the Trimora Intelligence Platform (branded as \u201cTrimora AI\u201d), and future modules such as CRM, payroll, finance, inventory, booking, marketing, APIs, customer portal, and developer platform offerings.",
    ],
  },
  {
    heading: "2. Our Commitment",
    body: [
      "Privacy is not merely a legal obligation. It is one of the core principles guiding how Trimora designs, builds, and operates its products.",
    ],
    list: [
      "Protecting customer information",
      "Collecting only information that serves legitimate business purposes",
      "Implementing security by design",
      "Maintaining transparency",
      "Respecting customer ownership of business data",
      "Continuously improving our security practices",
    ],
  },
  {
    heading: "3. Company Information",
    body: [
      "Trimora Systems Limited, registered in Kenya.",
      "Website: trimorasystems.com",
      "Email: support@trimorasystems.com",
    ],
  },
  {
    heading: "4. Information We Collect",
    body: ["Depending on the services you use, we may collect:"],
    subsections: [
      {
        label: "Business Information",
        list: ["Business name", "Business profile", "Industry", "Business preferences"],
      },
      {
        label: "Account Information",
        list: ["Owner name", "Email address", "Phone number"],
      },
      {
        label: "Operational Data",
        list: ["Customer records", "Appointments", "Inventory", "Sales", "Analytics", "Reports"],
      },
      {
        label: "Technical Information",
        list: ["Device information", "Browser type", "IP address", "Operating system", "Session information", "Log files"],
      },
      {
        label: "Usage Information",
        list: ["Pages visited", "Features used", "Navigation behaviour", "Session duration", "Product interactions"],
      },
      {
        label: "Location Information",
        body: ["Approximate geographic location derived from IP address or user-provided information."],
      },
    ],
  },
  {
    heading: "5. Information We Do Not Collect",
    body: ["Trimora does not intentionally collect:"],
    list: ["M-Pesa PINs", "Debit card PINs", "Credit card numbers", "CVV codes", "Online banking passwords"],
    footnote: "Payment credentials remain with the relevant payment provider.",
  },
  {
    heading: "6. How We Use Information",
    body: ["We use information to:"],
    list: [
      "Provide our services",
      "Create and manage accounts",
      "Process transactions",
      "Deliver customer support",
      "Improve our products",
      "Generate analytics",
      "Detect fraud",
      "Maintain platform security",
      "Comply with legal obligations",
      "Communicate service updates",
      "Develop future Trimora products",
    ],
  },
  {
    heading: "7. Artificial Intelligence",
    body: [
      "Trimora Systems is building an AI-first business technology platform. Artificial intelligence may be used to generate business insights, automate workflows, improve customer experience, detect anomalies, recommend business improvements, and power future intelligent features.",
      "AI processing is implemented with appropriate privacy, security, and governance controls. Human oversight remains available where appropriate.",
    ],
  },
  {
    heading: "8. Customer Data Ownership",
    body: [
      "Your business data belongs to you. Trimora does not claim ownership of customer records, inventory, appointments, sales, reports, or other operational information.",
      "You retain ownership of all business information uploaded to our platform.",
    ],
  },
  {
    heading: "9. Data Sharing",
    body: [
      "We do not sell personal information. Information may be shared only where necessary with trusted service providers, including providers supporting cloud hosting, authentication, analytics, email delivery, AI services, payment processing, and customer support.",
      "All providers are expected to maintain appropriate security standards.",
    ],
  },
  {
    heading: "10. International Data Transfers",
    body: [
      "Customer information may be stored or processed using secure cloud infrastructure located outside Kenya where operationally necessary. Where cross-border transfers occur, Trimora takes reasonable steps to ensure appropriate safeguards are applied in accordance with applicable law.",
    ],
  },
  {
    heading: "11. Security",
    body: ["Trimora implements security measures including, where applicable:"],
    list: [
      "HTTPS encryption",
      "Secure authentication",
      "Role-based access controls",
      "Password hashing",
      "Audit logging",
      "Secure cloud infrastructure",
      "Regular backups",
      "Continuous monitoring",
    ],
    footnote: "Security controls evolve as the platform grows.",
  },
  {
    heading: "12. Data Retention",
    body: [
      "Information is retained only for as long as necessary to provide services, comply with legal obligations, maintain financial records, resolve disputes, and enforce agreements.",
      "Following account closure, certain information may be retained where required by law or legitimate business purposes.",
    ],
  },
  {
    heading: "13. Your Rights",
    body: ["Subject to applicable law, you may have the right to:"],
    list: [
      "Access your information",
      "Correct inaccurate information",
      "Request deletion where appropriate",
      "Export your business data",
      "Object to certain processing",
      "Withdraw consent where applicable",
    ],
    footnote: "Requests may be submitted to support@trimorasystems.com.",
  },
  {
    heading: "14. Cookies and Analytics",
    body: [
      "Trimora uses cookies and similar technologies to maintain secure sessions, improve user experience, analyse platform usage, and enhance platform performance.",
    ],
  },
  {
    heading: "15. Children's Privacy",
    body: ["Trimora products are intended for businesses and business users. They are not directed at children."],
  },
  {
    heading: "16. Third-Party Services",
    body: [
      "Trimora may integrate with third-party providers including cloud infrastructure, payment providers, analytics platforms, AI providers, and communication services. Use of those services may also be governed by the providers' own privacy policies.",
    ],
  },
  {
    heading: "17. Changes to This Policy",
    body: [
      "This Privacy Policy may be updated from time to time. Material changes will be communicated through appropriate channels where required. The latest version will always be available at trimorasystems.com/legal/privacy.",
    ],
  },
  {
    heading: "18. Contact Us",
    body: ["Trimora Systems Limited", "Website: trimorasystems.com", "Email: support@trimorasystems.com"],
  },
];

export default function Page() {
  return (
    <LegalDocLayout title="Privacy Policy" effectiveDate={EFFECTIVE_DATE}>
      {SECTIONS.map((section) => (
        <LegalSection key={section.heading} {...section} />
      ))}
    </LegalDocLayout>
  );
}
