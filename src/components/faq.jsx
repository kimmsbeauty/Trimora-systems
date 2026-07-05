"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

// Every answer here is grounded in what's already true and already
// published elsewhere on this site (Hero, Ecosystem, Problems/Solution,
// Journey timeline) -- nothing about pricing, security posture, support
// model, trial policy, or hardware is included, since none of that is
// confirmed yet. Expand this list once those details are finalized.
const FAQS = [
  {
    id: "what-is-trimora",
    question: "What is Trimora Systems?",
    answer:
      "Trimora Systems is a platform for running your business, starting with Trimora POS and growing into a connected ecosystem of products over time.",
  },
  {
    id: "who-is-pos-for",
    question: "Who is Trimora POS designed for?",
    answer:
      "Trimora POS is built for service and retail businesses — currently focused on salons and barbershops — that need to manage sales, bookings, staff, and inventory in one place.",
  },
  {
    id: "more-products",
    question: "Will more Trimora products become available?",
    answer:
      "Yes. Trimora POS is the first product on the platform, with Trimora AI, CRM, and Payroll in development or planned next.",
  },
  {
    id: "grow-with-trimora",
    question: "Can my business grow with Trimora?",
    answer:
      "Yes. Trimora is built as one connected platform, so you can start with what you need today, like Trimora POS, and add more products as your business grows — without switching platforms.",
  },
  {
    id: "get-started",
    question: "How do I get started?",
    answer: "Book a demo and we'll walk you through getting set up with Trimora POS.",
  },
];

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-rule">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-body font-medium text-sm sm:text-base text-ink">
          {question}
        </span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-ink-soft transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>
      {open && (
        <p className="pb-5 text-sm sm:text-base text-ink-muted leading-relaxed pr-8">
          {answer}
        </p>
      )}
    </div>
  );
}

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="py-20 sm:py-28 border-t border-rule">
      <div className="max-w-2xl mx-auto px-6">
        <h2
          id="faq-heading"
          className="font-display text-2xl sm:text-3xl lg:text-4xl text-ink mb-10 sm:mb-12 text-center"
        >
          Frequently asked questions
        </h2>

        <div>
          {FAQS.map((faq) => (
            <FaqItem key={faq.id} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
