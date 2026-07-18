// Flexible credibility section (redesigned per audit feedback, 2026-07-18).
//
// Still no fabricated numbers, logos, or quotes -- that decision stands
// (see below). What changed is the *shape* of this component: it now
// takes typed content slots (stats / logos / testimonials) instead of
// being a single hardcoded line, so that as real proof becomes available
// it can be dropped in here without touching layout or JSX structure
// again. Fill in STATS / LOGOS / TESTIMONIALS below as each becomes real;
// each section only renders once it has content, so partial proof (e.g.
// a couple of stats before any testimonials exist) displays cleanly too.
//
// Original note preserved: the two numeric stats ("Businesses onboarded",
// "Transactions processed") were removed per Lucy's explicit decision --
// rather than leave them as a permanent pending placeholder, or fabricate
// a number, she chose not to show them until real figures exist. Same
// principle now applies to logos and testimonials.

const STATS = [
  // { id: "businesses", value: "50+", label: "Businesses running on Trimora" },
  // { id: "transactions", value: "10,000+", label: "Transactions processed" },
];

const LOGOS = [
  // { id: "example-salon", name: "Example Salon", src: "/logos/example-salon.svg" },
];

const TESTIMONIALS = [
  // { id: "jane", quote: "…", name: "Jane W.", role: "Owner, Example Salon" },
];

function StatStrip() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
      {STATS.map((stat) => (
        <div key={stat.id} className="text-center">
          <p className="font-display text-3xl sm:text-4xl text-ink">{stat.value}</p>
          <p className="text-xs sm:text-sm text-ink-muted mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

function LogoStrip() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 opacity-80">
      {LOGOS.map((logo) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={logo.id} src={logo.src} alt={logo.name} className="h-8 w-auto grayscale" />
      ))}
    </div>
  );
}

function TestimonialStrip() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
      {TESTIMONIALS.map((t) => (
        <blockquote key={t.id} className="text-center sm:text-left">
          <p className="text-sm text-ink-muted leading-relaxed mb-3">&ldquo;{t.quote}&rdquo;</p>
          <cite className="not-italic text-xs font-mono text-ink-soft">
            {t.name} — {t.role}
          </cite>
        </blockquote>
      ))}
    </div>
  );
}

export function SocialProof() {
  const hasProof = STATS.length > 0 || LOGOS.length > 0 || TESTIMONIALS.length > 0;

  return (
    <section aria-label="Social proof" className="border-y border-rule bg-paper-2/40">
      <div className="max-w-6xl mx-auto px-6 py-10 sm:py-12">
        {!hasProof && (
          <div className="flex flex-col items-center text-center gap-2">
            <span className="eyebrow">Trusted by</span>
            <p className="font-display text-lg sm:text-xl text-ink">
              Built for Kenya&rsquo;s growing businesses.
            </p>
          </div>
        )}

        {hasProof && (
          <div className="flex flex-col gap-10">
            {STATS.length > 0 && <StatStrip />}
            {LOGOS.length > 0 && <LogoStrip />}
            {TESTIMONIALS.length > 0 && <TestimonialStrip />}
          </div>
        )}
      </div>
    </section>
  );
}
