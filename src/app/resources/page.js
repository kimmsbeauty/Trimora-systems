import Link from "next/link";
import { BookOpen, Newspaper, MessageCircleQuestion } from "lucide-react";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Resources — Trimora Systems",
  description: "Guides, documentation, and the Trimora Systems blog — plus our policy and trust documentation.",
  path: "/resources",
});

const RESOURCE_LINKS = [
  {
    id: "docs",
    icon: BookOpen,
    title: "Documentation",
    description: "Setup guides and how-tos for Trimora POS.",
    href: "/docs",
  },
  {
    id: "blog",
    icon: Newspaper,
    title: "Blog",
    description: "Product updates and notes from the team.",
    href: "/blog",
  },
  {
    id: "contact",
    icon: MessageCircleQuestion,
    title: "Get in touch",
    description: "Have a question we haven't answered here? Reach out directly.",
    href: "/contact",
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
          Guides and documentation, product updates, and how to reach us if you need more.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          {RESOURCE_LINKS.map(({ id, icon: Icon, title, description, href }) => (
            <Link
              key={id}
              href={href}
              className="flex flex-col gap-3 rounded-2xl border border-rule bg-paper-2/40 p-6 hover:border-accent-ink/40 transition-colors"
            >
              <Icon className="text-accent-ink" size={24} strokeWidth={1.75} aria-hidden="true" />
              <span className="font-body font-semibold text-base text-ink">{title}</span>
              <span className="text-sm text-ink-muted leading-relaxed">{description}</span>
            </Link>
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
