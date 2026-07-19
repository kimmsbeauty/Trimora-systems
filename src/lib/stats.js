// Single source of truth for confirmed company metrics that get reused
// across multiple pages (currently the homepage and About; extend this
// same pattern to future case studies, press pages, etc.). Update a
// number here once, and every component that imports it stays in sync --
// no more editing the same figure in two files and risking drift.
//
// Deliberately simple: one flat object, one metric per key. Add new
// metrics here as they become real and confirmed. Do not add a number
// here that isn't backed by something real -- a "source of truth" that
// contains an invented figure is worse than no figure at all.
//
// Each entry:
//   value       — the number itself
//   suffix      — appended after the number (e.g. "+", "%")
//   decimals    — digits after the decimal point (omit for whole numbers)
//   label       — default display label; callers may override per
//                 placement (e.g. shorter wording in a tight layout)
//   confirmedBy — who confirmed it and when, for future audits
export const COMPANY_STATS = {
  activeBusinesses: {
    value: 50,
    suffix: "+",
    label: "Active Businesses",
    confirmedBy: "Wangui, 2026-07-18",
  },
  transactionsProcessed: {
    value: 500,
    suffix: "+",
    label: "Transactions Processed",
    confirmedBy: "Wangui, 2026-07-18",
  },
  systemUptime: {
    value: 99.9,
    suffix: "%",
    decimals: 1,
    label: "System Availability",
    confirmedBy: "Wangui, 2026-07-18",
  },
};
