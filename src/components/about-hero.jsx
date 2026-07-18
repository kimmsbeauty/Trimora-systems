import { CtaButton } from "@/components/cta-button";
import { Button } from "@/components/ui/button";
import { HeroMockup } from "@/components/hero-mockup";
import { Reveal } from "@/components/reveal";

export function AboutHero() {
  return (
    <section className="pt-32 pb-4">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
        <Reveal className="text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
            <span className="h-px w-8 bg-ink" aria-hidden="true" />
            <span className="eyebrow">About Trimora Systems</span>
          </div>
          <h1 className="font-display text-[32px] sm:text-[44px] lg:text-[52px] leading-[1.1] text-ink mb-6">
            Practical software for businesses that refuse to run on spreadsheets.
          </h1>
          <p className="text-base sm:text-lg text-ink-muted max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
            We&apos;re a Kenya-based, founder-led technology company. Trimora POS is live
            today, handling real operations for real businesses — built as the
            foundation for everything we build next.
          </p>
          <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4">
            <CtaButton source="about-hero" label="Book a Demo" />
            <Button as="a" href="/solutions" variant="ghost" size="lg">
              Learn More
            </Button>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <HeroMockup />
        </Reveal>
      </div>
    </section>
  );
}
