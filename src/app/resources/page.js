import Link from "next/link";
import { HelpCircle, Calendar, Mail } from "lucide-react";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Resources — Trimora Systems",
  description: "Getting-started resources for running your business with Trimora Systems.",
  path: "/resources",
});

// Deliberately not a docs/blog hub -- neither exists yet, and linking to
// pages that 404 or building placeholder content for them would misstate
// readiness. Points to real, already-live destinations instead.
const LINKS = [
  {
    icon: HelpCircle,
    title: "Frequently asked questions",
    description: "Common questions about Trimora POS and the wider platform.",
    href: "/#faq",
  },
  {
    icon: Calendar,
    title: "Book a demo",
    description: "See Trimora POS and talk through what your business needs.",
    href: "/#pricing",
  },
  {
    icon: Mail,
    title: "Contact us",
    description: "hello@trimorasystems.com · +254 702 904 562",
    href: "mailto:hello@trimorasystems.com",
  },
];

export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center p-16">
      <div className="max-w-xl w-full text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="h-px w-8 bg-rule" aria-hidden="true" />
          <span className="eyebrow">Resources</span>
          <span className="h-px w-8 bg-rule" aria-hidden="true" />
        </div>
        <h1 className="font-display text-3xl text-ink mb-4">
          Getting started with Trimora
        </h1>
        <p className="text-ink-muted leading-relaxed mb-10">
          A dedicated guides and documentation hub isn&apos;t built yet —
          in the meantime, here&apos;s where to go.
        </p>
        <div className="space-y-3 text-left">
          {LINKS.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="flex items-start gap-4 border border-rule rounded-2xl p-5 hover:border-ink transition-colors"
            >
              <item.icon size={20} className="text-accent-ink mt-0.5 shrink-0" aria-hidden="true" />
              <div>
                <h2 className="font-body font-semibold text-sm text-ink mb-1">{item.title}</h2>
                <p className="text-sm text-ink-muted">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
