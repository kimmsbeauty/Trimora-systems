import { Mail, MessageCircle } from "lucide-react";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { ContactCard } from "@/components/contact-card";

export const metadata = buildMetadata({
  title: "Resources — Trimora Systems",
  description: "Get help with Trimora Systems products, or find our policy and trust documentation.",
  path: "/resources",
});

const CONTACT_METHODS = [
  {
    id: "email",
    icon: <Mail className="text-accent-ink" size={24} strokeWidth={1.75} aria-hidden="true" />,
    title: "Email",
    description: "support@trimorasystems.com — we aim to respond the same business day.",
    copyValue: "support@trimorasystems.com",
    copiedDescription: "Copied! Paste it into your email app.",
  },
  {
    id: "whatsapp",
    icon: <MessageCircle className="text-accent-ink" size={24} strokeWidth={1.75} aria-hidden="true" />,
    title: "WhatsApp",
    description: "+254 702 904 562 — for a quicker back-and-forth.",
    href: "https://wa.me/254702904562",
  },
];

const POLICY_LINKS = [
  { label: "Security", href: "/legal/security" },
  { label: "Compliance", href: "/legal/compliance" },
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Terms of Service", href: "/legal/terms" },
];

export default function Page() {
  return (
    <main className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        <h1 className="font-display text-3xl sm:text-4xl text-ink mb-3 text-center">Resources</h1>
        <p className="text-ink-muted text-center max-w-xl mx-auto mb-14 leading-relaxed">
          Guides and how-tos are on the way. In the meantime, here&apos;s how to reach us — and where
          to find our policy documentation.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          {CONTACT_METHODS.map((method) => (
            <ContactCard key={method.id} {...method} />
          ))}
        </div>

        <div className="border-t border-rule pt-10">
          <h2 className="font-display text-xl text-ink mb-5 text-center">Policies &amp; Trust</h2>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {POLICY_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-ink-muted hover:text-ink underline underline-offset-4 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
