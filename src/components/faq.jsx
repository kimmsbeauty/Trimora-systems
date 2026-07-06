"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/lib/faq-data";

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
