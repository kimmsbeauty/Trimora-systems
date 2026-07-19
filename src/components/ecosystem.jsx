import { Users, Banknote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// Scope narrowed (2026-07-18, per explicit decision): now that the
// homepage has a dedicated Verticals section showcasing Beauty and Auto
// as available today, Ecosystem no longer repeats that -- it's now
// exclusively the forward-looking roadmap. Everything here is genuinely
// "Coming Soon," not implied to be further along than it is.
//
// Updated same day: Trimora AI shipped and graduated out of this list
// for the same reason Beauty/Auto did -- it's now covered by the
// Intelligence section (live capability), not the roadmap.
const PRODUCTS = [
  {
    id: "crm",
    name: "Trimora CRM",
    icon: Users,
    description: "Manage customer relationships and grow repeat business.",
  },
  {
    id: "payroll",
    name: "Trimora Payroll",
    icon: Banknote,
    description: "Simplify staff pay and compliance.",
  },
];

export function Ecosystem() {
  return (
    <section id="ecosystem" aria-labelledby="ecosystem-heading" className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-14 sm:mb-16">
          <h2
            id="ecosystem-heading"
            className="font-display text-2xl sm:text-3xl lg:text-4xl text-ink mb-4 leading-snug"
          >
            More than a POS. A growing platform.
          </h2>
          <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
            Trimora Beauty and Trimora Auto run on the same underlying platform we&apos;re
            building on top of next — so every future product plugs into the system you
            already use, instead of starting over.
          </p>
        </div>

        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-2 -mx-6 px-6 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 sm:max-w-md sm:overflow-visible">
          {PRODUCTS.map(({ id, name, icon: Icon, description }) => (
            <Card
              key={id}
              variant="muted"
              className="shrink-0 w-64 sm:w-auto snap-start rounded-xl flex flex-col gap-4"
            >
              <CardHeader className="items-center mb-0">
                <Icon className="text-ink-soft" size={26} strokeWidth={1.75} aria-hidden="true" />
                <Badge variant="comingSoon">Coming Soon</Badge>
              </CardHeader>
              <CardTitle>{name}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </Card>
          ))}
        </div>

        <p className="mt-8 text-center sm:text-left text-sm font-mono text-ink-soft">
          + more products on the roadmap.
        </p>
      </div>
    </section>
  );
}
