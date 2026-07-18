"use client";

import { CheckCircle2, CircleDot } from "lucide-react";
import { Reveal } from "@/components/reveal";

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
    <section aria-labelledby="journey-heading" className="py-16 sm:py-20 border-t border-rule">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal as="h2" id="journey-heading" className="font-display text-2xl sm:text-3xl text-ink mb-3 text-center">
          Our journey
        </Reveal>
        <Reveal as="p" delay={100} className="text-sm sm:text-base text-ink-muted text-center mb-14 sm:mb-16">
          Trimora POS is the beginning of a platform built to grow, one product at a time.
        </Reveal>

        {/* Mobile: vertical list. Desktop: horizontal flow with a
            connecting line, revealed left-to-right as the section scrolls
            into view -- reads as the line "drawing itself" without any
            animation library, just staggered per-item delays. */}
        <ol className="flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-0">
          {MILESTONES.map((m, i) => {
            const Icon = m.complete ? CheckCircle2 : CircleDot;
            return (
              <li key={m.id} className="relative flex-1 flex lg:flex-col items-start lg:items-center gap-4 lg:gap-0">
                {/* Connecting line to the next item (desktop only) */}
                {i < MILESTONES.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="hidden lg:block absolute top-2 left-1/2 w-full h-px bg-rule"
                  />
                )}
                <Reveal delay={i * 120} className="relative z-10 flex lg:flex-col items-start lg:items-center gap-4 lg:gap-4">
                  <span
                    className={`shrink-0 flex items-center justify-center w-4 h-4 rounded-full ${
                      m.complete ? "bg-ink" : "bg-paper-2 border border-rule"
                    }`}
                  >
                    <Icon
                      size={10}
                      className={m.complete ? "text-paper" : "text-ink-soft"}
                      aria-hidden="true"
                    />
                  </span>
                  <div className="lg:text-center">
                    <h3 className="font-body font-semibold text-base text-ink">{m.label}</h3>
                    <p
                      className={`text-sm font-mono mt-1 ${
                        m.complete ? "text-accent-ink" : "text-ink-soft"
                      }`}
                    >
                      {m.status}
                    </p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
