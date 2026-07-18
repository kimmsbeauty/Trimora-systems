import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/reveal";

// Grounded in facts already documented elsewhere on the site (RLS, hashed
// credentials, multi-tenant architecture, cloud-based on Supabase) --
// deliberately not a duplicate of why-choose.jsx's homepage copy, since
// a visitor could land on either page independently.
const INDICATORS = [
  "Modern cloud platform",
  "Designed for African businesses",
  "Multi-branch ready",
  "Row-level data isolation",
  "Hashed credentials, HTTPS everywhere",
  "Built to scale with you",
];

export function AboutTrust() {
  return (
    <section aria-labelledby="about-trust-heading" className="py-16 sm:py-20 border-t border-rule">
      <div className="max-w-4xl mx-auto px-6">
        <Reveal as="h2" id="about-trust-heading" className="font-display text-2xl sm:text-3xl text-ink text-center mb-10 sm:mb-12">
          Why businesses trust Trimora
        </Reveal>
        <Reveal delay={100}>
          <Card className="p-6 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              {INDICATORS.map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <Check className="text-accent-ink shrink-0" size={16} aria-hidden="true" />
                  <span className="text-sm text-ink-muted">{item}</span>
                </div>
              ))}
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
