import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";

// Checklist matches the real, shipped feature set already documented in
// pos-deep-dive.jsx -- not a new or expanded claim.
const CAPABILITIES = [
  "Scheduling & bookings",
  "Point of sale & checkout",
  "Inventory tracking",
  "Staff management",
  "Sales reporting",
];

export function AboutProductHighlight() {
  return (
    <section className="py-16 sm:py-20 border-t border-rule">
      <Reveal className="max-w-2xl mx-auto px-6">
        <Card variant="highlight" className="p-8 sm:p-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl sm:text-3xl text-ink">Trimora POS</h2>
            <Badge variant="available">Available Now</Badge>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {CAPABILITIES.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-ink-muted">
                <Check className="text-accent-ink shrink-0" size={16} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <p className="text-sm text-ink-soft mb-6">
            Already running real businesses — the foundation every future Trimora product
            is built on.
          </p>
          <Button as="a" href="/solutions" variant="ghost" size="sm">
            See it in action
          </Button>
        </Card>
      </Reveal>
    </section>
  );
}
