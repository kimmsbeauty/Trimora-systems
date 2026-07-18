"use client";

import {
  Check,
  CreditCard,
  Package,
  UserCheck,
  Users,
  BarChart3,
  Cloud,
  ShieldCheck,
  MessageSquare,
  Gift,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useLeadForm } from "@/components/lead-form-context";

// Phase: real tiered pricing, replacing the placeholder single-CTA section.
// Figures sourced from the Trimora POS pricing flyer (KES). Kept as plain
// data here rather than hardcoded JSX so the numbers are easy to audit and
// update in one place.
const TIERS = [
  {
    id: "monthly",
    label: "Monthly",
    tagline: "Flexible & easy to start",
    price: "1,200",
    period: "/ month",
    ctaLabel: "Pay Monthly",
  },
  {
    id: "quarterly",
    label: "Quarterly",
    tagline: "Save more every 3 months",
    price: "3,300",
    period: "/ 3 months",
    equivalent: "1,100 / month",
    savePct: "8%",
    ctaLabel: "Pay Quarterly",
  },
  {
    id: "semi-annual",
    label: "Semi-Annually",
    tagline: "Greater value, more savings",
    price: "6,000",
    period: "/ 6 months",
    equivalent: "1,000 / month",
    savePct: "17%",
    ctaLabel: "Pay Semi-Annually",
  },
  {
    id: "annual",
    label: "Annual",
    tagline: "One payment, one year of peace of mind",
    price: "10,800",
    period: "/ 12 months",
    equivalent: "900 / month",
    savePct: "25%",
    ctaLabel: "Pay Annually",
    bestValue: true,
  },
  {
    id: "one-off",
    label: "One-Off Purchase",
    tagline: "Own it. Use it forever.",
    price: "35,000\u201345,000",
    period: "one-time payment",
    ctaLabel: "One-Time Payment",
    features: [
      "Lifetime access to current version",
      "1 year of updates",
      "Basic support",
      "Optional paid upgrades for new features",
    ],
  },
];

const SHARED_FEATURES = [
  "Full POS access",
  "Sales tracking",
  "Inventory management",
  "Staff management",
  "Basic reports",
  "Customer management",
  "Ongoing support",
];

const INCLUDES = [
  { id: "sales", icon: CreditCard, label: "Sales & billing" },
  { id: "inventory", icon: Package, label: "Inventory management" },
  { id: "staff", icon: Users, label: "Staff & user management" },
  { id: "customers", icon: UserCheck, label: "Customer management" },
  { id: "reports", icon: BarChart3, label: "Reports & insights" },
  { id: "backup", icon: Cloud, label: "Secure cloud backup" },
];

const TRUST = [
  { id: "secure", icon: ShieldCheck, title: "Secure payments", detail: "100% safe & encrypted" },
  { id: "support", icon: MessageSquare, title: "Reliable support", detail: "We're here to help you" },
  { id: "cloud", icon: Cloud, title: "Cloud powered", detail: "Access your business anywhere" },
];

export function PricingCta() {
  const { openLeadForm } = useLeadForm();

  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="py-20 sm:py-28 border-t border-rule">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-14 sm:mb-16">
          <h2
            id="pricing-heading"
            className="font-display text-2xl sm:text-3xl lg:text-4xl text-ink mb-4 leading-snug"
          >
            Choose the plan that works for you
          </h2>
          <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
            Start with Trimora POS today, on the plan that fits how your business pays for things.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {TIERS.map((tier) => (
            <Card
              key={tier.id}
              variant={tier.bestValue ? "highlight" : "default"}
              className="flex flex-col p-5"
            >
              {tier.bestValue && (
                <Badge variant="available" className="self-start mb-3">
                  Best Value
                </Badge>
              )}
              <p className="eyebrow mb-1">{tier.label}</p>
              <p className="text-xs text-ink-soft mb-4 leading-snug">{tier.tagline}</p>

              <p className="font-display text-2xl sm:text-3xl text-ink leading-none mb-1">
                KES {tier.price}
              </p>
              <p className="text-xs text-ink-muted mb-3">{tier.period}</p>

              {tier.equivalent && (
                <p className="text-xs text-ink-soft border border-rule rounded-full px-3 py-1 self-start mb-3">
                  Equivalent to {tier.equivalent}
                </p>
              )}
              {tier.savePct && (
                <p className="text-xs font-medium text-accent-ink mb-4">Save {tier.savePct}</p>
              )}

              <ul className="flex flex-col gap-2 mb-6 flex-1">
                {(tier.features ?? SHARED_FEATURES).map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-xs text-ink-muted leading-snug">
                    <Check className="text-accent-ink shrink-0 mt-0.5" size={14} aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                type="button"
                variant={tier.bestValue ? "primary" : "ghost"}
                size="sm"
                onClick={() => openLeadForm(`pricing-${tier.id}`)}
                className="w-full"
              >
                {tier.ctaLabel}
              </Button>
            </Card>
          ))}
        </div>

        <div className="mt-14 sm:mt-16 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6">
          <Card className="p-6">
            <p className="eyebrow mb-4">All plans include</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {INCLUDES.map(({ id, icon: Icon, label }) => (
                <div key={id} className="flex items-center gap-2.5">
                  <Icon className="text-accent-ink shrink-0" size={18} strokeWidth={1.75} aria-hidden="true" />
                  <span className="text-xs text-ink-muted leading-snug">{label}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <p className="eyebrow mb-4">One-off purchase notes</p>
            <ul className="flex flex-col gap-2">
              {[
                "You own the current version of the app.",
                "Includes 1 year of updates and basic support.",
                "Major new features and premium modules may require additional payment.",
                "Best for businesses that prefer a one-time investment.",
              ].map((note) => (
                <li key={note} className="flex items-start gap-2 text-xs text-ink-muted leading-snug">
                  <span className="text-accent-ink mt-0.5" aria-hidden="true">
                    &bull;
                  </span>
                  {note}
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {TRUST.map(({ id, icon: Icon, title, detail }) => (
            <div key={id} className="flex items-center gap-3">
              <Icon className="text-accent-ink shrink-0" size={22} strokeWidth={1.75} aria-hidden="true" />
              <div>
                <p className="text-sm text-ink font-medium leading-snug">{title}</p>
                <p className="text-xs text-ink-soft leading-snug">{detail}</p>
              </div>
            </div>
          ))}
        </div>

        <Card variant="highlight" className="mt-10 p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
          <Gift className="text-accent-ink shrink-0" size={32} strokeWidth={1.5} aria-hidden="true" />
          <div className="flex-1 text-center sm:text-left">
            <p className="eyebrow mb-2">Early adopter offer</p>
            <p className="text-sm sm:text-base text-ink leading-relaxed">
              <span className="font-medium">First 20 salons get exclusive pricing:</span>{" "}
              KES 999 / month forever, or KES 9,000 / year. Limited slots available.
            </p>
          </div>
          <Button type="button" onClick={() => openLeadForm("pricing-early-adopter")} size="lg">
            Claim This Offer
          </Button>
        </Card>
      </div>
    </section>
  );
}
