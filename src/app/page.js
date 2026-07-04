import { Button } from "@/components/ui/button";
import { SocialProof } from "@/components/social-proof";

export default function Home() {
  return (
    <main>
      <section className="min-h-screen flex items-center pt-16">
        <div className="max-w-4xl mx-auto px-6 py-24 text-center">
          <p className="font-mono text-xs tracking-widest uppercase text-gold-400 mb-6">
            Trimora Systems
          </p>
          <h1 className="font-display text-[32px] sm:text-[44px] lg:text-[56px] leading-[1.1] text-text mb-6">
            Building the Future of Business Management.
          </h1>
          <p className="text-base sm:text-lg text-text-dim max-w-2xl mx-auto mb-10 leading-relaxed">
            Manage sales, bookings, inventory, customers, payments, and
            business insights from one intelligent platform designed to grow
            with your business.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button as="a" href="mailto:hello@trimorasystems.com" size="lg" className="w-full sm:w-auto">
              Book a Demo
            </Button>
            <Button as="a" href="/#pos" variant="ghost" size="lg" className="w-full sm:w-auto">
              Explore Trimora POS
            </Button>
          </div>
        </div>
      </section>

      <SocialProof />
    </main>
  );
}
