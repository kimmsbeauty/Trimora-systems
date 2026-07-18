import { buildMetadata } from "@/lib/seo";
import { AboutHero } from "@/components/about-hero";
import { AboutStatement } from "@/components/about-statement";
import { AboutFeatures } from "@/components/about-features";
import { AboutStats } from "@/components/about-stats";
import { AboutProductHighlight } from "@/components/about-product-highlight";
import { JourneyTimeline } from "@/components/journey-timeline";
import { AboutTrust } from "@/components/about-trust";
import { CtaButton } from "@/components/cta-button";
import { Reveal } from "@/components/reveal";

export const metadata = buildMetadata({
  title: "About — Trimora Systems",
  description:
    "The story and roadmap behind Trimora Systems, from Trimora POS to the wider business software ecosystem being built next.",
  path: "/about",
});

export default function Page() {
  return (
    <main className="min-h-screen">
      <AboutHero />
      <AboutStatement />
      <AboutFeatures />
      <AboutStats />
      <AboutProductHighlight />
      <JourneyTimeline />
      <AboutTrust />

      <section className="py-20 sm:py-28 border-t border-rule text-center">
        <Reveal className="max-w-2xl mx-auto px-6">
          <h2 className="font-display text-2xl sm:text-3xl text-ink mb-4 leading-snug">
            See it running on a real business
          </h2>
          <p className="text-sm sm:text-base text-ink-muted mb-8 leading-relaxed">
            Book a short walkthrough and we&apos;ll show you Trimora set up the way your
            business would actually use it.
          </p>
          <CtaButton source="about-final" label="Book a Demo" />
        </Reveal>
      </section>
    </main>
  );
}
