import { FileText, MessageCircle, Calculator, Store, Layers, Zap, TrendingUp, Target, Cloud } from "lucide-react";

// Added per explicit request (2026-07-18): the site never explicitly
// answered "why Trimora instead of how I already run my business."
// Deliberately framed against what prospects are actually comparing
// Trimora to -- paper, spreadsheets, WhatsApp, manual cash counting,
// generic retail POS -- not named competitor products. No "we're better
// than X" claims; each row states what replaces what and why that
// matters, factually.
const COMPARISONS = [
  {
    id: "scattered",
    fromIcon: FileText,
    from: "Paper records & spreadsheets",
    toIcon: Layers,
    to: "One connected platform",
    description: "Sales, staff, inventory, and customers in one place — not five places that don't talk to each other.",
  },
  {
    id: "whatsapp",
    fromIcon: MessageCircle,
    from: "WhatsApp bookings & sticky notes",
    toIcon: Zap,
    to: "Scheduling that runs itself",
    description: "Appointments, reminders, and staff assignments update automatically as bookings come in.",
  },
  {
    id: "cash",
    fromIcon: Calculator,
    from: "Manual cash counting",
    toIcon: TrendingUp,
    to: "Real-time visibility",
    description: "See exactly where every shilling went, the moment it moves — not at end-of-month reconciliation.",
  },
  {
    id: "generic",
    fromIcon: Store,
    from: "Generic retail POS",
    toIcon: Target,
    to: "Built for service businesses",
    description: "Designed around appointments, staff time, and service delivery — not shelf inventory and barcodes.",
  },
  {
    id: "scale",
    fromIcon: Cloud,
    from: "Growing means starting over",
    toIcon: Cloud,
    to: "Scale without switching systems",
    description: "Cloud-based and accessible from anywhere — add staff, services, or locations without a system change.",
  },
];

export function ValueProposition() {
  return (
    <section aria-labelledby="value-prop-heading" className="py-20 sm:py-28 border-t border-rule">
      <div className="max-w-5xl mx-auto px-6">
        <div className="max-w-2xl mb-14 sm:mb-16">
          <h2
            id="value-prop-heading"
            className="font-display text-2xl sm:text-3xl lg:text-4xl text-ink mb-4 leading-snug"
          >
            Why businesses choose Trimora
          </h2>
          <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
            Not a comparison to other software — a comparison to how most service businesses
            actually run today.
          </p>
        </div>

        <div className="flex flex-col divide-y divide-rule border-y border-rule">
          {COMPARISONS.map(({ id, fromIcon: FromIcon, from, toIcon: ToIcon, to, description }) => (
            <div key={id} className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_1.4fr] gap-4 sm:gap-8 items-center py-6">
              <div className="flex items-center gap-3">
                <FromIcon className="text-ink-soft shrink-0" size={20} strokeWidth={1.75} aria-hidden="true" />
                <span className="text-sm text-ink-soft line-through decoration-ink-soft/40">{from}</span>
              </div>
              <div className="flex items-center gap-3">
                <ToIcon className="text-accent-ink shrink-0" size={20} strokeWidth={1.75} aria-hidden="true" />
                <span className="text-sm font-medium text-ink">{to}</span>
              </div>
              <p className="text-sm text-ink-muted leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
