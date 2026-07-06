// Phase 2, Item 6: the two numeric stats ("Businesses onboarded",
// "Transactions processed") were removed per Lucy's explicit decision --
// rather than leave them as a permanent pending placeholder, or fabricate
// a number, she chose to not show them at all for now. If real figures
// become available later, this is the file to bring them back into.
export function SocialProof() {
  return (
    <section aria-label="Social proof" className="border-y border-rule bg-paper-2/40">
      <div className="max-w-6xl mx-auto px-6 py-10 flex items-center justify-center text-center">
        <p className="font-display text-lg sm:text-xl text-ink">
          Built for Kenya&rsquo;s growing businesses.
        </p>
      </div>
    </section>
  );
}
