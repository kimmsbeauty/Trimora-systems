import { Store, Users, Banknote, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// Config-driven per brief requirement -- not hardcoded cards.
// Trimora POS is the only shipped product; everything else is genuinely
// "Coming Soon," not implied to be further along than it is.
const PRODUCTS = [
  {
    id: "pos",
    name: "Trimora POS",
    icon: Store,
    status: "available",
    description: "Point of sale built for service and retail businesses.",
  },
  {
    id: "crm",
    name: "Trimora CRM",
    icon: Users,
    status: "comingSoon",
    description: "Manage customer relationships and grow repeat business.",
  },
  {
    id: "payroll",
    name: "Trimora Payroll",
    icon: Banknote,
    status: "comingSoon",
    description: "Simplify staff pay and compliance.",
  },
  {
    id: "ai",
    name: "Trimora AI",
    icon: Sparkles,
    status: "comingSoon",
    description: "Smart insights to help you make better business decisions.",
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
            One platform. A growing ecosystem.
          </h2>
          <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
            Trimora POS is just the beginning. Every future product is built
            on the same platform — so you never have to start over.
          </p>
        </div>

        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-2 -mx-6 px-6 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible">
          {PRODUCTS.map(({ id, name, icon: Icon, status, description }) => {
            const available = status === "available";
            return (
              <Card
                key={id}
                variant={available ? "highlight" : "muted"}
                className="shrink-0 w-64 sm:w-auto snap-start rounded-xl flex flex-col gap-4"
              >
                <CardHeader className="items-center mb-0">
                  <Icon
                    className={available ? "text-accent-ink" : "text-ink-soft"}
                    size={26}
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <Badge variant={status}>
                    {available ? "Available" : "Coming Soon"}
                  </Badge>
                </CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </Card>
            );
          })}
        </div>

        <p className="mt-8 text-center sm:text-left text-sm font-mono text-ink-soft">
          + more products on the roadmap.
        </p>
      </div>
    </section>
  );
}
