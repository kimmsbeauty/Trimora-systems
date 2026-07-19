import {
  CalendarClock,
  Percent,
  ShoppingBag,
  Wallet,
  Layers,
  Tag,
  Building2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MockupFrame } from "@/components/mockup-frame";

// Built per direct feedback (2026-07-18): Beauty's page previously only
// showed the same 4 generic POS features shared with the homepage
// (PosDeepDive), with no equivalent to Auto's industry-specific
// deep-dive. Every capability below was verified against the live
// schema before being written, same standard as auto-deep-dive.jsx:
//
//   - Appointments & walk-ins: bookings table, real
//   - Staff commission: sales.is_multi_stylist / commission_by_stylist,
//     real (already referenced in the secondary grid on this page)
//   - Retail alongside services: sales + stock share the same checkout
//     and inventory system -- a product line and a service line are
//     both just sale line items, real
//   - Customer history & wallet: customers.visit_count/total_spend,
//     and customer_wallet_transactions/customers.wallet_balance --
//     confirmed generic (references salons(id), not an auto_-prefixed
//     table), not an Auto-exclusive feature
//
// Two things deliberately NOT included, because they didn't check out:
// "service packages" (services has no bundling/package mechanism on the
// Beauty side, unlike Auto's wash packages) and "loyalty programmes" as
// literally named (customer_memberships.plan_id FKs to
// auto_membership_plans specifically -- Auto-exclusive, no Beauty
// equivalent membership-plan table exists). Customer wallet is the real,
// verified alternative for the loyalty/retention angle.
const HEADLINE_FEATURES = [
  {
    id: "appointments",
    title: "Appointments & walk-ins",
    description:
      "Book ahead or take walk-ins as they come — reduce missed appointments and never double-book a chair.",
    mockup: "appointments",
  },
  {
    id: "commission",
    title: "Staff commission tracking",
    description:
      "Commission calculates itself on every sale, split automatically when more than one stylist works a service.",
    mockup: "commission",
  },
  {
    id: "retail",
    title: "Retail alongside services",
    description:
      "Ring up a haircut and the shampoo that goes with it in the same sale — track every sale, service or product, in one place.",
    mockup: "retail",
  },
  {
    id: "wallet",
    title: "Customer history & wallet",
    description:
      "See every client's visit history at a glance, and let regulars top up store credit to spend across future visits — the kind of detail that improves retention.",
    mockup: "wallet",
  },
];

const SECONDARY_FEATURES = [
  {
    id: "categories",
    icon: Layers,
    title: "Service categories",
    description: "Organize your menu by category — Hair, Nails, Beauty, Spa — so staff and clients find what they need fast.",
  },
  {
    id: "discounts",
    icon: Tag,
    title: "Discounts & promotions",
    description: "Percentage or fixed amount — with a reason logged every time.",
  },
  {
    id: "multi-branch",
    icon: Building2,
    title: "Built for more than one location",
    description:
      "Each business's data stays fully separate from every other business on Trimora — the platform is multi-tenant by design, not bolted on.",
  },
];

function AppointmentsMockup() {
  const slots = [
    { time: "9:00 AM", client: "Jane M.", service: "Haircut" },
    { time: "9:30 AM", client: "Walk-in", service: "Blowout" },
    { time: "10:00 AM", client: "—", service: "Open" },
  ];
  return (
    <MockupFrame label="Schedule" icon={CalendarClock}>
      <div className="space-y-2.5">
        {slots.map((s) => (
          <div
            key={s.time}
            className="flex items-center justify-between rounded-md border border-rule bg-paper/60 px-3 py-2.5"
          >
            <span className="text-[11px] font-mono text-ink-soft w-16 shrink-0">{s.time}</span>
            <span className="text-xs text-ink-muted flex-1 text-right">
              {s.client === "—" ? s.service : `${s.client} — ${s.service}`}
            </span>
          </div>
        ))}
      </div>
    </MockupFrame>
  );
}

function CommissionMockup() {
  const staff = [
    { name: "A. Wanjiru", pct: 80 },
    { name: "B. Kamau", pct: 55 },
    { name: "C. Njeri", pct: 65 },
  ];
  return (
    <MockupFrame label="Commission" icon={Percent}>
      <div className="space-y-3">
        {staff.map((s) => (
          <div key={s.name} className="flex items-center justify-between gap-3">
            <span className="text-xs text-ink-muted w-24 shrink-0">{s.name}</span>
            <div className="h-1.5 flex-1 rounded-full bg-rule overflow-hidden">
              <div
                style={{ width: `${s.pct}%` }}
                className="h-full rounded-full bg-accent-ink/50"
              />
            </div>
          </div>
        ))}
      </div>
    </MockupFrame>
  );
}

function RetailMockup() {
  const lines = [
    { label: "Haircut & Style", tag: "Service" },
    { label: "Shampoo", tag: "Retail" },
    { label: "Styling Gel", tag: "Retail" },
  ];
  return (
    <MockupFrame label="Checkout" icon={ShoppingBag}>
      <div className="space-y-2.5 mb-4">
        {lines.map((line) => (
          <div key={line.label} className="flex items-center justify-between">
            <span className="text-xs text-ink-muted">{line.label}</span>
            <span className="text-[10px] font-mono uppercase tracking-wide text-ink-soft">
              {line.tag}
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-rule">
        <span className="text-xs font-mono uppercase tracking-wide text-ink-soft">Total</span>
        <span className="h-2.5 w-14 rounded-full bg-accent-ink/40" />
      </div>
    </MockupFrame>
  );
}

function WalletMockup() {
  return (
    <MockupFrame label="Customer" icon={Wallet}>
      <div className="mb-4">
        <span className="text-xs font-medium text-ink">Jane M.</span>
        <div className="flex items-center justify-between mt-2">
          <span className="text-[11px] text-ink-soft">Visits</span>
          <span className="text-xs text-ink-muted">14</span>
        </div>
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-[11px] text-ink-soft">Last visit</span>
          <span className="text-xs text-ink-muted">3 days ago</span>
        </div>
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-rule">
        <span className="text-xs font-mono uppercase tracking-wide text-ink-soft">Wallet balance</span>
        <span className="h-2.5 w-14 rounded-full bg-accent-ink/40" />
      </div>
    </MockupFrame>
  );
}

const MOCKUPS = {
  appointments: AppointmentsMockup,
  commission: CommissionMockup,
  retail: RetailMockup,
  wallet: WalletMockup,
};

export function BeautyDeepDive() {
  return (
    <section aria-labelledby="beauty-deep-dive-heading" className="py-20 sm:py-28 border-t border-rule">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-4">
          <h2
            id="beauty-deep-dive-heading"
            className="font-display text-2xl sm:text-3xl lg:text-4xl text-ink"
          >
            Built for how beauty businesses actually run
          </h2>
          <Badge variant="available">Available Now</Badge>
        </div>
        <p className="text-sm sm:text-base text-ink-muted leading-relaxed max-w-2xl mb-16 sm:mb-20">
          Appointments and walk-ins, commission splits, retail alongside services, client
          history — the operational detail of running a salon, not a generic POS with different
          labels.
        </p>

        <div className="space-y-20 sm:space-y-24 mb-20 sm:mb-24">
          {HEADLINE_FEATURES.map((feature, i) => {
            const Mockup = MOCKUPS[feature.mockup];
            const imageRight = i % 2 === 1;
            return (
              <div
                key={feature.id}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
              >
                <div className={imageRight ? "lg:order-2" : "lg:order-1"}>
                  <Mockup />
                </div>
                <div
                  className={`text-center lg:text-left ${
                    imageRight ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <h3 className="font-body font-semibold text-xl sm:text-2xl text-ink mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-ink-muted leading-relaxed max-w-md mx-auto lg:mx-0">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8">
          {SECONDARY_FEATURES.map(({ id, icon: Icon, title, description }) => (
            <div key={id} className="flex flex-col items-start gap-4">
              <Icon className="text-accent-ink" size={26} strokeWidth={1.75} aria-hidden="true" />
              <h3 className="font-body font-semibold text-base text-ink">{title}</h3>
              <p className="text-sm text-ink-muted leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
