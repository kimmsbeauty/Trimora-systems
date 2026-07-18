import { Button } from "@/components/ui/button";
import { CtaButton } from "@/components/cta-button";
import { HeroMockup } from "@/components/hero-mockup";
import { POS_LOGIN_URL } from "@/lib/pos";
import { SocialProof } from "@/components/social-proof";
import { Problems } from "@/components/problems";
import { Solution } from "@/components/solution";
import { PosDeepDive } from "@/components/pos-deep-dive";
import { WhyChoose } from "@/components/why-choose";
import { Verticals } from "@/components/verticals";
import { Ecosystem } from "@/components/ecosystem";
import { Intelligence } from "@/components/intelligence";
import { WhyTrust } from "@/components/why-trust";
import { PricingCta } from "@/components/pricing-cta";
import { Faq } from "@/components/faq";
import { FAQS } from "@/lib/faq-data";
import { SITE_URL } from "@/lib/seo";
import { FinalCta } from "@/components/final-cta";
import { SectionTracker, ObserveSection } from "@/components/section-tracker";

// Phase 3, Item 1 (Sitewide Analytics Instrumentation): each section below
// is wrapped in <SectionTracker id="..."> so we can see how far down the
// page real visitors actually reach -- data that didn't exist anywhere on
// this site before this item. Three sections (PosDeepDive, Ecosystem,
// PricingCta) already render their own <section id="...">, so those are
// left un-wrapped and observed instead via <ObserveSection id="..."> --
// wrapping them would create a duplicate id in the DOM. See
// section-tracker.jsx for why.
export default function Home() {
  return (
    <main>
      <section id="hero" className="min-h-screen flex items-center pt-16">
        {/* Organization structured data -- deliberately partial. Only
            fields backed by facts already confirmed elsewhere on this site
            are included (name, url, logo, phone, email -- same ones used
            in the footer/Why Choose). `address` and `sameAs` (social
            profile URLs) are omitted rather than guessed; schema.org
            doesn't require them, so this is honest and still useful,
            not broken. Add them here the moment those facts exist. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Trimora Systems",
              url: SITE_URL,
              logo: `${SITE_URL}/android-chrome-512x512.png`,
              address: {
                "@type": "PostalAddress",
                streetAddress: "Prestige Plaza, 3rd Floor, Kimathi Street",
                addressLocality: "Nyeri",
                addressCountry: "KE",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+254-702-904-562",
                email: "support@trimorasystems.com",
                contactType: "customer support",
              },
            }),
          }}
        />
        <div className="max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
              <span className="h-px w-8 bg-ink" aria-hidden="true" />
              <span className="eyebrow">Trimora Systems</span>
            </div>
            <h1 className="font-display text-[32px] sm:text-[44px] lg:text-[56px] leading-[1.1] text-ink mb-6">
              Building the Future of Business Management.
            </h1>
            <p className="text-base sm:text-lg text-ink-muted max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed">
              Manage sales, bookings, inventory, customers, payments, and
              business insights from one intelligent platform designed to grow
              with your business.
            </p>
            <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4">
              <CtaButton source="hero" className="w-full sm:w-auto" />
              <Button as="a" href="/#pos" variant="ghost" size="lg" className="w-full sm:w-auto">
                Explore Trimora POS
              </Button>
              <Button
                as="a"
                href={POS_LOGIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                variant="link"
                size="lg"
                className="w-full sm:w-auto"
              >
                Login to Trimora POS
              </Button>
            </div>
          </div>

          <HeroMockup />
        </div>
      </section>

      <SectionTracker id="social-proof">
        <SocialProof />
      </SectionTracker>
      <SectionTracker id="problems">
        <Problems />
      </SectionTracker>
      <SectionTracker id="solution">
        <Solution />
      </SectionTracker>
      <PosDeepDive />
      <ObserveSection id="pos" />
      <SectionTracker id="verticals">
        <Verticals />
      </SectionTracker>
      <SectionTracker id="why-choose">
        <WhyChoose />
      </SectionTracker>
      <Ecosystem />
      <ObserveSection id="ecosystem" />
      <SectionTracker id="intelligence">
        <Intelligence />
      </SectionTracker>
      <SectionTracker id="why-trust">
        <WhyTrust />
      </SectionTracker>
      <PricingCta />
      <ObserveSection id="pricing" />
      <SectionTracker id="faq">
        {/* Phase 2, Item 5: FAQPage structured data, built from the exact
            same FAQS array the visible component renders -- one source of
            truth, so this can never drift out of sync with what's actually
            on the page. No new facts needed; this is pure markup for
            search engines around content that's already real. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: FAQS.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            }),
          }}
        />
        <Faq />
      </SectionTracker>
      <SectionTracker id="final-cta">
        <FinalCta />
      </SectionTracker>
    </main>
  );
}
