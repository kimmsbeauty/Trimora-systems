import { Banknote, ClipboardX, CalendarX, PackageSearch, FileBarChart } from "lucide-react";

// Redesigned as part of the Problem -> Solution -> Value consolidation
// (2026-07-18, per explicit direction): expanded from 3 abstract
// categories to 5 specific, concrete pain points, matching the examples
// given. "Disconnected tools" dropped as its own card -- it's the root
// cause tying the other five together, not a parallel symptom, so it now
// lives in the framing sentence instead of competing for a card slot.
// Icons deliberately muted (text-ink-soft), not accent-colored: this
// section names what's broken, it doesn't answer anything yet -- accent
// gold is reserved for Solution and Value, which do.
const PROBLEMS = [
  {
    id: "revenue-leakage",
    icon: Banknote,
    label: "Revenue leakage",
    description: "Cash goes missing between the till and the books, and you don't find out until it's too late.",
  },
  {
    id: "manual-records",
    icon: ClipboardX,
    label: "Manual record keeping",
    description: "Paper and spreadsheets slow you down and leave room for costly mistakes.",
  },
  {
    id: "missed-appointments",
    icon: CalendarX,
    label: "Missed appointments",
    description: "Bookings scattered across WhatsApp and sticky notes mean no-shows and double-bookings.",
  },
  {
    id: "inventory-visibility",
    icon: PackageSearch,
    label: "Poor inventory visibility",
    description: "You don't know what's running low until a customer asks for something you don't have.",
  },
  {
    id: "difficult-reporting",
    icon: FileBarChart,
    label: "Difficult reporting",
    description: "Making sense of how the business is actually doing takes hours of manual work, not minutes.",
  },
];

export function Problems() {
  return (
    <section aria-labelledby="problems-heading" className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <h2
          id="problems-heading"
          className="font-display text-2xl sm:text-3xl lg:text-4xl text-ink max-w-2xl mb-4 leading-snug"
        >
          Does any of this sound familiar?
        </h2>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl mb-14 sm:mb-16 leading-relaxed">
          Every one of these is a symptom of the same root cause: running your business across
          tools that don&rsquo;t talk to each other.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-8">
          {PROBLEMS.map(({ id, icon: Icon, label, description }) => (
            <div key={id} className="flex flex-col items-start gap-4">
              <Icon
                className="text-ink-soft"
                size={28}
                strokeWidth={1.75}
                aria-hidden="true"
              />
              <h3 className="font-body font-semibold text-base sm:text-lg text-ink">
                {label}
              </h3>
              <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
