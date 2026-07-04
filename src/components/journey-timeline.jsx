import { CheckCircle2, CircleDot } from "lucide-react";

// Status reflects what's genuinely true today (per project history):
// Trimora POS is live; TIP already has real infrastructure in progress
// (Gemini-powered classification wired into the POS via a Supabase Edge
// Function), so "In Development" is accurate, not aspirational. CRM,
// Payroll, and further products are planned but not yet started.
const MILESTONES = [
  {
    id: "pos",
    label: "Trimora POS",
    status: "Available Now",
    complete: true,
  },
  {
    id: "tip",
    label: "Trimora AI",
    status: "In Development",
    complete: false,
  },
  {
    id: "crm",
    label: "Trimora CRM",
    status: "Planned",
    complete: false,
  },
  {
    id: "payroll",
    label: "Trimora Payroll",
    status: "Planned",
    complete: false,
  },
  {
    id: "more",
    label: "More Solutions",
    status: "Coming Soon",
    complete: false,
  },
];

export function JourneyTimeline() {
  return (
    <section aria-labelledby="journey-heading" className="py-16 sm:py-20">
      <div className="max-w-2xl mx-auto px-6">
        <h2
          id="journey-heading"
          className="font-display text-2xl sm:text-3xl text-text mb-3 text-center"
        >
          Our Journey
        </h2>
        <p className="text-sm sm:text-base text-text-dim text-center mb-12">
          Trimora POS is the beginning of a platform built to grow, one
          product at a time.
        </p>

        <ol className="relative border-l border-ink-700 pl-8 space-y-10">
          {MILESTONES.map((m) => {
            const Icon = m.complete ? CheckCircle2 : CircleDot;
            return (
              <li key={m.id} className="relative">
                <span
                  className={`absolute -left-[calc(2rem+9px)] top-0.5 flex items-center justify-center w-4 h-4 rounded-full ${
                    m.complete ? "bg-gold-500" : "bg-ink-800 border border-ink-700"
                  }`}
                >
                  <Icon
                    size={10}
                    className={m.complete ? "text-ink-950" : "text-text-faint"}
                    aria-hidden="true"
                  />
                </span>
                <h3 className="font-body font-semibold text-base text-text">
                  {m.label}
                </h3>
                <p
                  className={`text-sm font-mono mt-1 ${
                    m.complete ? "text-gold-400" : "text-text-faint"
                  }`}
                >
                  {m.status}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
