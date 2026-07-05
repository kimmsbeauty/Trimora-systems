import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Paper & Ink re-skin: restrained editorial buttons -- solid ink pill for
// primary actions, hairline outline for secondary, no hover-lift (that
// was a gold-on-black era flourish; this system uses opacity/border
// changes instead, matching the Lovable design exploration this was
// adapted from).
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-150 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-ink text-paper hover:opacity-90",
        ghost: "bg-transparent text-ink border border-ink/25 hover:border-ink",
        link: "bg-transparent text-accent-ink hover:underline underline-offset-4",
      },
      size: {
        default: "text-sm px-6 py-3",
        sm: "text-sm px-4 py-2",
        lg: "text-base px-8 py-3.5",
        compact: "text-xs px-4 py-2",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

function Button({ className, variant, size, as: Comp = "button", ...props }) {
  return (
    <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />
  );
}

export { Button, buttonVariants };
