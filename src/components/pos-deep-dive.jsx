import { CreditCard, CalendarDays, Package, BarChart3, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Feature copy reflects real, shipped Trimora POS capabilities (checkout,
// staff/booking scheduling, stock tracking, sales reporting) -- not
// aspirational features. Mockups are illustrative abstractions, not real
// screenshots or real business data (no fabricated figures).
const FEATURES = [
  {
    id: "checkout",
    title: "Fast, reliable checkout",
    description:
      "Process payments, manage tabs, and handle walk-ins without friction.",
    mockup: "checkout",
  },
  {
    id: "scheduling",
    title: "Staff & scheduling",
    description: "Manage bookings and staff availability in one place.",
    mockup: "scheduling",
  },
  {
    id: "inventory",
    title: "Inventory tracking",
    description: "Know what's in stock without manual counts.",
    mockup: "inventory",
  },
  {
    id: "reporting",
    title: "Sales reporting",
    description: "See daily, weekly, and monthly performance at a glance.",
    mockup: "reporting",
  },
];

function MockupFrame({ label, icon: Icon, children }) {
  return (
    <div className="w-full max-w-md mx-auto lg:mx-0">
      <div className="rounded-xl border border-ink-700 bg-ink-900 shadow-xl shadow-black/30 overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-ink-700">
          <span className="w-2.5 h-2.5 rounded-full bg-ink-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-ink-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-ink-700" />
          <span className="ml-2 flex items-center gap-1.5 text-[11px] font-mono text-text-faint">
            <Icon size={12} aria-hidden="true" />
            {label}
          </span>
        </div>
        <div className="p-5">{children}</div>
      </div>
      <p className="mt-3 text-center lg:text-left text-[11px] font-mono text-text-faint">
        Illustrative preview
      </p>
    </div>
  );
}

function CheckoutMockup() {
  const lines = ["Haircut — Classic", "Beard trim", "Product — Pomade"];
  return (
    <MockupFrame label="Checkout" icon={CreditCard}>
      <div className="space-y-2.5 mb-4">
        {lines.map((line) => (
          <div key={line} className="flex items-center justify-between">
            <span className="text-xs text-text-dim">{line}</span>
            <span className="h-2 w-10 rounded-full bg-ink-700" />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-ink-700 mb-4">
        <span className="text-xs font-mono uppercase tracking-wide text-text-faint">
          Total
        </span>
        <span className="h-2.5 w-14 rounded-full bg-gold-500/40" />
      </div>
      <div className="h-9 rounded-md bg-gold-500/30 flex items-center justify-center gap-1.5">
        <Check size={12} className="text-gold-400" aria-hidden="true" />
        <span className="text-[11px] font-mono uppercase tracking-wide text-gold-400">
          Charge
        </span>
      </div>
    </MockupFrame>
  );
}

function SchedulingMockup() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const filled = [1, 2, 3, 4, 5, 8, 9, 10, 12, 15, 16];
  return (
    <MockupFrame label="Scheduling" icon={CalendarDays}>
      <div className="grid grid-cols-7 gap-1.5 mb-3">
        {days.map((d, i) => (
          <span
            key={i}
            className="text-center text-[10px] font-mono text-text-faint"
          >
            {d}
          </span>
        ))}
        {Array.from({ length: 21 }).map((_, i) => (
          <span
            key={i}
            className={`aspect-square rounded-sm ${
              filled.includes(i) ? "bg-gold-500/40" : "bg-ink-700"
            }`}
          />
        ))}
      </div>
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-gold-500/40" />
        <span className="text-[11px] text-text-dim">Booked</span>
        <span className="w-2 h-2 rounded-full bg-ink-700 ml-3" />
        <span className="text-[11px] text-text-dim">Open</span>
      </div>
    </MockupFrame>
  );
}

function InventoryMockup() {
  const items = [
    { name: "Shampoo — 500ml", level: 70 },
    { name: "Pomade", level: 35 },
    { name: "Razor blades", level: 15 },
    { name: "Towels", level: 85 },
  ];
  return (
    <MockupFrame label="Inventory" icon={Package}>
      <div className="space-y-3.5">
        {items.map((item) => (
          <div key={item.name}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-text-dim">{item.name}</span>
            </div>
            <div className="h-1.5 rounded-full bg-ink-700 overflow-hidden">
              <div
                style={{ width: `${item.level}%` }}
                className={`h-full rounded-full ${
                  item.level < 20 ? "bg-gold-300" : "bg-gold-500/50"
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </MockupFrame>
  );
}

function ReportingMockup() {
  const bars = [45, 70, 55, 85, 60, 95, 75];
  return (
    <MockupFrame label="Reports" icon={BarChart3}>
      <div className="flex items-end gap-2 h-24 mb-3">
        {bars.map((h, i) => (
          <span
            key={i}
            style={{ height: `${h}%` }}
            className="flex-1 rounded-sm bg-gold-500/40"
          />
        ))}
      </div>
      <div className="flex justify-between text-[10px] font-mono text-text-faint">
        <span>Mon</span>
        <span>Sun</span>
      </div>
    </MockupFrame>
  );
}

const MOCKUPS = {
  checkout: CheckoutMockup,
  scheduling: SchedulingMockup,
  inventory: InventoryMockup,
  reporting: ReportingMockup,
};

export function PosDeepDive() {
  return (
    <section id="pos" aria-labelledby="pos-heading" className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-16 sm:mb-20">
          <h2
            id="pos-heading"
            className="font-display text-2xl sm:text-3xl lg:text-4xl text-text"
          >
            Trimora POS
          </h2>
          <Badge variant="available">Available Now</Badge>
        </div>

        <div className="space-y-20 sm:space-y-24">
          {FEATURES.map((feature, i) => {
            const Mockup = MOCKUPS[feature.mockup];
            const imageRight = i % 2 === 1;
            return (
              <div
                key={feature.id}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
              >
                <div
                  className={imageRight ? "lg:order-2" : "lg:order-1"}
                >
                  <Mockup />
                </div>
                <div
                  className={`text-center lg:text-left ${
                    imageRight ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <h3 className="font-body font-semibold text-xl sm:text-2xl text-text mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-text-dim leading-relaxed max-w-md mx-auto lg:mx-0">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
