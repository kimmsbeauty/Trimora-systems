import { cn } from "@/lib/utils";

const CARD_VARIANTS = {
  default: "border-ink-700 bg-ink-900",
  // Used for the single visually-distinct "available" item in a set
  // (e.g. Trimora POS in the ecosystem grid) — gold border, full color.
  highlight: "border-gold-500/40 bg-ink-900",
  // Used for "coming soon" / not-yet-available items — muted and grayscale.
  muted: "border-ink-700 bg-ink-900/40 grayscale opacity-60",
};

function Card({ className, variant = "default", ...props }) {
  return (
    <div
      className={cn(
        "rounded-lg border p-6 transition-colors",
        CARD_VARIANTS[variant] ?? CARD_VARIANTS.default,
        className
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }) {
  return <div className={cn("flex items-start justify-between gap-3 mb-3", className)} {...props} />;
}

function CardTitle({ className, ...props }) {
  return (
    <h3
      className={cn("font-body font-semibold text-base text-text", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }) {
  return (
    <p className={cn("text-sm leading-relaxed text-text-dim", className)} {...props} />
  );
}

function CardContent({ className, ...props }) {
  return <div className={cn("", className)} {...props} />;
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent };
