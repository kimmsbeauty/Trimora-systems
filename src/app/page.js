import { Button } from "@/components/ui/button";
import { HeroCtaButton } from "@/components/hero-cta-button";
import { HeroMockup } from "@/components/hero-mockup";
import { SocialProof } from "@/components/social-proof";
import { Problems } from "@/components/problems";
import { Solution } from "@/components/solution";
import { PosDeepDive } from "@/components/pos-deep-dive";
import { WhyChoose } from "@/components/why-choose";
import { BusinessBenefits } from "@/components/business-benefits";
import { Ecosystem } from "@/components/ecosystem";
import { Intelligence } from "@/components/intelligence";
import { WhyTrust } from "@/components/why-trust";
import { PricingCta } from "@/components/pricing-cta";
import { Faq } from "@/components/faq";
import { FinalCta } from "@/components/final-cta";

export default function Home() {
  return (
    <main>
      <section className="min-h-screen flex items-center pt-16">
        <div className="max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          <div className="text-center lg:text-left">
            <p className="font-mono text-xs tracking-widest uppercase text-gold-400 mb-6">
              Trimora Systems
            </p>
            <h1 className="font-display text-[32px] sm:text-[44px] lg:text-[56px] leading-[1.1] text-text mb-6">
              Building the Future of Business Management.
            </h1>
            <p className="text-base sm:text-lg text-text-dim max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed">
              Manage sales, bookings, inventory, customers, payments, and
              business insights from one intelligent platform designed to grow
              with your business.
            </p>
            <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4">
              <HeroCtaButton className="w-full sm:w-auto" />
              <Button as="a" href="/#pos" variant="ghost" size="lg" className="w-full sm:w-auto">
                Explore Trimora POS
              </Button>
            </div>
          </div>

          <HeroMockup />
        </div>
      </section>

      <SocialProof />
      <Problems />
      <Solution />
      <PosDeepDive />
      <WhyChoose />
      <BusinessBenefits />
      <Ecosystem />
      <Intelligence />
      <WhyTrust />
      <PricingCta />
      <Faq />
      <FinalCta />
    </main>
  );
}
