import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full font-mono text-xs font-medium tracking-wide px-3 py-1",
  {
    variants: {
      variant: {
        available: "bg-gold-500 text-ink-950",
        comingSoon: "border border-text-dim/40 text-text-dim",
      },
    },
    defaultVariants: {
      variant: "comingSoon",
    },
  }
);

function Badge({ className, variant, ...props }) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />;
}

export { Badge, badgeVariants };
