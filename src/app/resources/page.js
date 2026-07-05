import { Mail, MessageCircle } from "lucide-react";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const metadata = buildMetadata({
  title: "Resources — Trimora Systems",
  description: "Get help with Trimora Systems products, or find our policy and trust documentation.",
  path: "/resources",
});

const CONTACT_METHODS = [
  {
    id: "email",
    icon: Mail,
    title: "Email",
    description: "support@trimorasystems.com — we aim to respond the same business day.",
    href: "mailto:support@trimorasystems.com",
  },
  {
    id: "whatsapp",
    icon: MessageCircle,
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
          {CONTACT_METHODS.map(({ id, icon: Icon, title, description, href }) => (
            <a key={id} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>
              <Card className="flex flex-col gap-3 hover:border-accent-ink/40 transition-colors">
                <CardHeader className="mb-0">
                  <Icon className="text-accent-ink" size={24} strokeWidth={1.75} aria-hidden="true" />
                </CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </Card>
            </a>
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
