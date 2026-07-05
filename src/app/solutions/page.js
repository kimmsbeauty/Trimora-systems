import Link from "next/link";
import { Store, Users, Banknote, Sparkles } from "lucide-react";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Solutions — Trimora Systems",
  description:
    "Business software solutions from Trimora Systems, built around Trimora POS today and a wider platform to come.",
  path: "/solutions",
});

// Every feature and product listed here is already published elsewhere
// on the site (pos-deep-dive.jsx's FEATURES, ecosystem.jsx's product
// list) -- this page consolidates it, it doesn't introduce new claims.
const POS_FEATURES = [
  { title: "Fast, reliable checkout", description: "Process payments, manage tabs, and handle walk-ins without friction." },
  { title: "Staff & scheduling", description: "Manage bookings and staff availability in one place." },
  { title: "Inventory tracking", description: "Know what's in stock without manual counts." },
  { title: "Sales reporting", description: "See daily, weekly, and monthly performance at a glance." },
];

const ROADMAP = [
  { name: "Trimora CRM", icon: Users, description: "Manage customer relationships and grow repeat business." },
  { name: "Trimora Payroll", icon: Banknote, description: "Simplify staff pay and compliance." },
  { name: "Trimora AI", icon: Sparkles, description: "Smart insights to help you make better business decisions." },
];

export default function Page() {
  return (
    <main className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-16 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="h-px w-8 bg-rule" aria-hidden="true" />
          <span className="eyebrow">Solutions</span>
          <span className="h-px w-8 bg-rule" aria-hidden="true" />
        </div>
        <h1 className="font-display text-3xl sm:text-4xl text-ink mb-4">
          One platform, built to grow with your business.
        </h1>
        <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
          Trimora POS is the starting point today — for service and retail
          businesses, currently focused on salons and barbershops — with
          more of the platform arriving as your business grows.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-20">
        <div className="flex items-center gap-3 mb-8">
          <Store size={18} className="text-accent-ink" aria-hidden="true" />
          <h2 className="font-display text-xl text-ink">Trimora POS — available now</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          {POS_FEATURES.map((f) => (
            <div key={f.title} className="border border-rule rounded-2xl p-5">
              <h3 className="font-body font-semibold text-sm text-ink mb-1.5">{f.title}</h3>
              <p className="text-sm text-ink-muted leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
        <Link href="/#pricing" className="text-sm text-accent-ink underline underline-offset-4">
          See Trimora POS pricing →
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-24 border-t border-rule pt-16">
        <h2 className="font-display text-xl text-ink mb-8">What&apos;s coming next</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {ROADMAP.map((p) => (
            <div key={p.name} className="border border-rule rounded-2xl p-5">
              <p.icon size={18} className="text-ink-soft mb-3" aria-hidden="true" />
              <h3 className="font-body font-semibold text-sm text-ink mb-1.5">{p.name}</h3>
              <p className="text-sm text-ink-muted leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
