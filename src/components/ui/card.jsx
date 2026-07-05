import { cn } from "@/lib/utils";

// Paper & Ink re-skin: cards are hairline-bordered on the paper-2 tint
// (subtle section background), not the heavier dark-mode borders/fills
// from the gold-on-black system.
const CARD_VARIANTS = {
  default: "border-rule bg-paper-2/40",
  // Used for the single visually-distinct "available" item in a set
  // (e.g. Trimora POS in the ecosystem grid) — accent-ink border.
  highlight: "border-accent-ink/40 bg-paper-2/40",
  // Used for "coming soon" / not-yet-available items — muted and grayscale.
  muted: "border-rule bg-paper-2/20 grayscale opacity-60",
};

function Card({ className, variant = "default", ...props }) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-6 transition-colors",
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
      className={cn("font-body font-semibold text-base text-ink", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }) {
  return (
    <p className={cn("text-sm leading-relaxed text-ink-muted", className)} {...props} />
  );
}

function CardContent({ className, ...props }) {
  return <div className={cn("", className)} {...props} />;
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent };
