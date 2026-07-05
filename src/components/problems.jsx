import { Unplug, ClipboardX, EyeOff } from "lucide-react";

const PROBLEMS = [
  {
    id: "disconnected-tools",
    icon: Unplug,
    label: "Disconnected tools",
    description:
      "Sales, inventory, staff, and payments live in separate apps that don't talk to each other.",
  },
  {
    id: "manual-processes",
    icon: ClipboardX,
    label: "Manual, error-prone processes",
    description:
      "Spreadsheets and paper records slow you down and leave room for costly mistakes.",
  },
  {
    id: "no-visibility",
    icon: EyeOff,
    label: "No real visibility",
    description:
      "Without one place to see what's happening, it's hard to make fast, confident decisions.",
  },
];

export function Problems() {
  return (
    <section aria-labelledby="problems-heading" className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <h2
          id="problems-heading"
          className="font-display text-2xl sm:text-3xl lg:text-4xl text-ink max-w-2xl mb-14 sm:mb-16 leading-snug"
        >
          Running a business shouldn&rsquo;t mean juggling five different
          systems.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">
          {PROBLEMS.map(({ id, icon: Icon, label, description }) => (
            <div key={id} className="flex flex-col items-start gap-4">
              <Icon
                className="text-accent-ink"
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
