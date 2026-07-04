// Numeric stats are real metrics we don't have confirmed numbers for yet.
// Per the no-hallucination rule, these render as an explicit pending state
// (dashed border + reduced opacity) rather than a fabricated figure.
const PENDING_STATS = [
  { id: "onboarded", label: "Businesses onboarded" },
  { id: "transactions", label: "Transactions processed" },
];

export function SocialProof() {
  return (
    <section aria-label="Social proof" className="border-y border-ink-700 bg-ink-900/40">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-8 sm:gap-6">
        {PENDING_STATS.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center sm:items-start gap-2 text-center sm:text-left"
          >
            <span
              className="inline-flex items-center font-mono text-lg sm:text-2xl text-text-dim/60 tracking-tight border border-dashed border-text-dim/30 rounded-md px-3 py-1"
              aria-label={`${item.label}: figure pending, not yet available`}
            >
              <span aria-hidden="true">[STAT PENDING]</span>
            </span>
            <p className="text-xs sm:text-sm text-text-dim">{item.label}</p>
          </div>
        ))}

        {/* Not a numeric claim, so it's stated directly rather than marked pending. */}
        <div className="col-span-2 sm:col-span-1 flex flex-col items-center sm:items-start justify-center gap-2 text-center sm:text-left">
          <p className="font-display text-lg sm:text-xl text-text">
            Built for Kenya&rsquo;s growing businesses.
          </p>
        </div>
      </div>
    </section>
  );
}
