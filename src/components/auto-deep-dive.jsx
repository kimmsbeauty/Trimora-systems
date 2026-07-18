import {
  Car,
  ClipboardCheck,
  Droplets,
  BarChart3,
  Check,
  X as XIcon,
  Award,
  Gift,
  History,
  Boxes,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MockupFrame } from "@/components/mockup-frame";

// Built per audit follow-up (2026-07-18): Trimora Auto previously only
// marketed the shared platform foundation (security, scheduling, payments,
// multi-site) -- nothing about what's actually distinct to running a car
// wash on Trimora. Every capability below is real, shipped Auto-module
// functionality (bay/queue management, vehicle inspections, memberships,
// referrals, per-line commission, detergent/consumable stock tracking --
// not aspirational), mirroring pos-deep-dive.jsx's own "real, shipped,
// not aspirational" standard. Four headline features get full mockups,
// matching Beauty's visual weight; the remaining four get a compact grid
// below rather than doubling the page length with mockups for every one.
const HEADLINE_FEATURES = [
  {
    id: "queue",
    title: "Vehicle check-in & bay queue",
    description:
      "Check a vehicle in, assign it to a bay, and track every job from waiting to ready for collection.",
    mockup: "queue",
  },
  {
    id: "inspection",
    title: "Vehicle inspection records",
    description:
      "Log condition at check-in and pickup, so both you and the customer have a record if a dispute ever comes up.",
    mockup: "inspection",
  },
  {
    id: "packages",
    title: "Wash packages & add-ons",
    description:
      "Build packages from your service catalog, then add extras — interior detail, wax, tire shine — at checkout.",
    mockup: "packages",
  },
  {
    id: "performance",
    title: "Reports & staff performance",
    description:
      "See revenue by day, and commission earned per staff member on every job they worked.",
    mockup: "performance",
  },
];

const SECONDARY_FEATURES = [
  {
    id: "memberships",
    icon: Award,
    title: "Memberships & loyalty",
    description: "Sell recurring wash plans customers pay for once and redeem over time.",
  },
  {
    id: "referrals",
    icon: Gift,
    title: "Referral management",
    description: "Track who referred whom, and reward both sides automatically.",
  },
  {
    id: "customer-history",
    icon: History,
    title: "Customer & vehicle history",
    description: "Every visit, every vehicle, every job — searchable per customer.",
  },
  {
    id: "inventory",
    icon: Boxes,
    title: "Detergent & consumables stock",
    description: "Track usage of soap, wax, and supplies per job, not just at month-end.",
  },
];

function QueueMockup() {
  const bays = [
    { id: "1", label: "Bay 1", vehicle: "KDA 245B", status: "In Progress" },
    { id: "2", label: "Bay 2", vehicle: "KCY 019X", status: "Ready" },
    { id: "3", label: "Bay 3", vehicle: "—", status: "Open" },
  ];
  const statusColor = {
    "In Progress": "text-accent-ink",
    Ready: "text-ink",
    Open: "text-ink-soft",
  };
  return (
    <MockupFrame label="Bay Queue" icon={Car}>
      <div className="space-y-2.5">
        {bays.map((bay) => (
          <div
            key={bay.id}
            className="flex items-center justify-between rounded-md border border-rule bg-paper/60 px-3 py-2.5"
          >
            <div className="flex flex-col">
              <span className="text-[10px] font-mono uppercase tracking-wide text-ink-soft">
                {bay.label}
              </span>
              <span className="text-xs text-ink-muted mt-0.5">{bay.vehicle}</span>
            </div>
            <span className={`text-[11px] font-mono ${statusColor[bay.status]}`}>
              {bay.status}
            </span>
          </div>
        ))}
      </div>
    </MockupFrame>
  );
}

function InspectionMockup() {
  const points = [
    { label: "Exterior", ok: true },
    { label: "Interior", ok: true },
    { label: "Wheels & tires", ok: true },
    { label: "Windows & mirrors", ok: false },
  ];
  return (
    <MockupFrame label="Inspection" icon={ClipboardCheck}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-mono uppercase tracking-wide text-ink-soft">
          Check-in — KDA 245B
        </span>
      </div>
      <div className="space-y-2.5">
        {points.map((p) => (
          <div key={p.label} className="flex items-center justify-between">
            <span className="text-xs text-ink-muted">{p.label}</span>
            {p.ok ? (
              <Check size={14} className="text-accent-ink" aria-hidden="true" />
            ) : (
              <XIcon size={14} className="text-destructive" aria-hidden="true" />
            )}
          </div>
        ))}
      </div>
    </MockupFrame>
  );
}

function PackagesMockup() {
  const lines = ["Premium Wash + Wax", "Interior Detail (add-on)", "Tire Shine (add-on)"];
  return (
    <MockupFrame label="Packages" icon={Droplets}>
      <div className="space-y-2.5 mb-4">
        {lines.map((line) => (
          <div key={line} className="flex items-center justify-between">
            <span className="text-xs text-ink-muted">{line}</span>
            <span className="h-2 w-10 rounded-full bg-rule" />
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

function PerformanceMockup() {
  const bars = [50, 75, 60, 90, 70];
  const staff = [
    { name: "J. Mwangi", amount: 65 },
    { name: "A. Otieno", amount: 45 },
  ];
  return (
    <MockupFrame label="Reports" icon={BarChart3}>
      <div className="flex items-end gap-2 h-14 mb-4">
        {bars.map((h, i) => (
          <span
            key={i}
            style={{ height: `${h}%` }}
            className="flex-1 rounded-sm bg-accent-ink/40"
          />
        ))}
      </div>
      <div className="space-y-2 pt-3 border-t border-rule">
        {staff.map((s) => (
          <div key={s.name} className="flex items-center justify-between">
            <span className="text-[11px] text-ink-muted">{s.name}</span>
            <div className="h-1.5 w-16 rounded-full bg-rule overflow-hidden">
              <div
                style={{ width: `${s.amount}%` }}
                className="h-full rounded-full bg-accent-ink/50"
              />
            </div>
          </div>
        ))}
      </div>
    </MockupFrame>
  );
}

const MOCKUPS = {
  queue: QueueMockup,
  inspection: InspectionMockup,
  packages: PackagesMockup,
  performance: PerformanceMockup,
};

export function AutoDeepDive() {
  return (
    <section aria-labelledby="auto-deep-dive-heading" className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-4">
          <h2
            id="auto-deep-dive-heading"
            className="font-display text-2xl sm:text-3xl lg:text-4xl text-ink"
          >
            Built for car washes, not adapted for them
          </h2>
          <Badge variant="available">Available Now</Badge>
        </div>
        <p className="text-sm sm:text-base text-ink-muted leading-relaxed max-w-2xl mb-16 sm:mb-20">
          Bay queues, vehicle inspections, wash packages, membership plans — the operational
          detail of running a car wash, not a salon tool with the labels swapped.
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
