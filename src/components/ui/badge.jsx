import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full font-mono text-xs font-medium tracking-wide px-3 py-1",
  {
    variants: {
      variant: {
        available: "bg-ink text-paper",
        comingSoon: "border border-ink-soft/40 text-ink-soft",
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
