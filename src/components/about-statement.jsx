import { Reveal } from "@/components/reveal";

export function AboutStatement() {
  return (
    <section className="py-16 sm:py-20 border-t border-rule">
      <Reveal className="max-w-3xl mx-auto px-6 text-center">
        <p className="font-display text-2xl sm:text-3xl lg:text-4xl leading-snug text-ink">
          We build software that helps service businesses spend{" "}
          <span className="text-accent-ink">less time managing operations</span> and
          more time <span className="text-accent-ink">growing</span>.
        </p>
      </Reveal>
    </section>
  );
}
