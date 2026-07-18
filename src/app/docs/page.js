import Link from "next/link";
import { CreditCard, CalendarDays, Package, BarChart3, HelpCircle, Mail } from "lucide-react";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Docs — Trimora Systems",
  description: "Getting started with Trimora POS.",
  path: "/docs",
});

// Deliberately kept at an overview level, not a step-by-step UI walkthrough
// -- exact click-paths/screen layouts in the live product aren't something
// this session can verify firsthand, and guessing at them would be worse
// than not documenting it at all. What's here is all grounded in features
// already published elsewhere on the site (pos-deep-dive.jsx).
const FEATURES = [
  { icon: CreditCard, title: "Checkout", description: "Process payments, manage tabs, and handle walk-ins without friction." },
  { icon: CalendarDays, title: "Staff & scheduling", description: "Manage bookings and staff availability in one place." },
  { icon: Package, title: "Inventory", description: "Know what's in stock without manual counts." },
  { icon: BarChart3, title: "Reporting", description: "See daily, weekly, and monthly performance at a glance." },
];

export default function Page() {
  return (
    <main className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-16 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="h-px w-8 bg-rule" aria-hidden="true" />
          <span className="eyebrow">Docs</span>
          <span className="h-px w-8 bg-rule" aria-hidden="true" />
        </div>
        <h1 className="font-display text-3xl sm:text-4xl text-ink mb-4">
          Getting started with Trimora POS
        </h1>
        <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
          Trimora POS is currently invite-only — book a demo and our team
          will walk you through setup for your specific business. This
          page covers what the product does; for hands-on setup help,
          reach out directly.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-16">
        <h2 className="font-display text-xl text-ink mb-8">What Trimora POS covers</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {FEATURES.map((f) => (
            <div key={f.title} className="border border-rule rounded-2xl p-5">
              <f.icon size={18} className="text-accent-ink mb-3" aria-hidden="true" />
              <h3 className="font-body font-semibold text-sm text-ink mb-1.5">{f.title}</h3>
              <p className="text-sm text-ink-muted leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-24 border-t border-rule pt-16">
        <h2 className="font-display text-xl text-ink mb-8">Need more help?</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <Link
            href="/#faq"
            className="flex items-start gap-4 border border-rule rounded-2xl p-5 hover:border-ink transition-colors"
          >
            <HelpCircle size={20} className="text-accent-ink mt-0.5 shrink-0" aria-hidden="true" />
            <div>
              <h3 className="font-body font-semibold text-sm text-ink mb-1">Frequently asked questions</h3>
              <p className="text-sm text-ink-muted">Common questions about Trimora POS and the wider platform.</p>
            </div>
          </Link>
          <Link
            href="/contact"
            className="flex items-start gap-4 border border-rule rounded-2xl p-5 hover:border-ink transition-colors"
          >
            <Mail size={20} className="text-accent-ink mt-0.5 shrink-0" aria-hidden="true" />
            <div>
              <h3 className="font-body font-semibold text-sm text-ink mb-1">Contact support</h3>
              <p className="text-sm text-ink-muted">support@trimorasystems.com · +254 702 904 562</p>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
