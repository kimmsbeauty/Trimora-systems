import { Link2, Workflow, LayoutDashboard } from "lucide-react";

// Same order/position as PROBLEMS in problems.jsx so each solution reads as
// a direct reply to the problem in the same grid slot.
const SOLUTIONS = [
  {
    id: "connected-platform",
    icon: Link2,
    label: "One connected platform",
    description:
      "All your business operations — sales, inventory, staff — run from one connected platform.",
  },
  {
    id: "automated-workflows",
    icon: Workflow,
    label: "Automated workflows",
    description:
      "Automated workflows replace manual entry, reducing errors and saving hours every week.",
  },
  {
    id: "real-time-dashboards",
    icon: LayoutDashboard,
    label: "Real-time dashboards",
    description:
      "Real-time dashboards give you a clear view of your business, anytime, anywhere.",
  },
];

export function Solution() {
  return (
    <section aria-labelledby="solution-heading" className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <h2
          id="solution-heading"
          className="font-display text-2xl sm:text-3xl lg:text-4xl text-text max-w-2xl mb-14 sm:mb-16 leading-snug"
        >
          One platform. Everything connected.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">
          {SOLUTIONS.map(({ id, icon: Icon, label, description }) => (
            <div key={id} className="flex flex-col items-start gap-4">
              <Icon
                className="text-gold-400"
                size={28}
                strokeWidth={1.75}
                aria-hidden="true"
              />
              <h3 className="font-body font-semibold text-base sm:text-lg text-text">
                {label}
              </h3>
              <p className="text-sm sm:text-base text-text-dim leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
