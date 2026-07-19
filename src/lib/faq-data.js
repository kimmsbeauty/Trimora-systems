// Shared FAQ data -- deliberately NOT in faq.jsx (which is "use client"),
// because a Server Component can't import a plain data value out of a
// client-boundary module and use it directly (it resolves to an unusable
// client-reference proxy at build time, not the actual array -- this
// broke the FAQPage structured data in page.js with "FAQS.map is not a
// function" until moved here). This file has no "use client" directive,
// so both the client FAQ accordion (faq.jsx) and the server-rendered
// structured data (page.js) can import the same array safely.
//
// Every answer here is grounded in what's already true and already
// published elsewhere on this site (Hero, Ecosystem, Problems/Solution,
// Journey timeline, Pricing, Security). Support model, trial policy, and
// hardware requirements are still not included, since none of that is
// confirmed yet. Expand this list once those details are finalized.
export const FAQS = [
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
      "Trimora POS is built for service businesses — currently salons, spas, barbershops, and car washes — that need to manage sales, bookings, staff, and inventory in one place.",
  },
  {
    id: "how-much",
    question: "How much does Trimora POS cost?",
    answer:
      "Plans start from KES 1,200/month, with quarterly, semi-annual, and annual options that cost less per month the longer you commit. Setup and onboarding are included on every plan. See the Pricing section above for full details.",
  },
  {
    id: "is-it-secure",
    question: "Is my business data secure?",
    answer:
      "Yes. Every business's data is isolated with row-level security, PINs are stored hashed rather than in plain text, and all traffic runs over HTTPS. See our Security page for full details.",
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
