const BENEFITS = [
  "Save hours every week with automated, connected workflows.",
  "Reduce costly errors from manual tracking and disconnected systems.",
  "Make faster, more confident decisions with real-time visibility into your business.",
];

export function BusinessBenefits() {
  return (
    <section aria-label="Business benefits" className="py-16 sm:py-20 border-y border-rule">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-rule">
          {BENEFITS.map((text, i) => (
            <p
              key={i}
              className="text-center text-sm sm:text-base text-ink leading-relaxed px-0 sm:px-8 py-6 sm:py-0"
            >
              {text}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
