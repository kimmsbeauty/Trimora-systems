import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-150 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-gold-500 text-ink-950 hover:bg-gold-400 hover:-translate-y-0.5",
        ghost:
          "bg-transparent text-text border border-text/40 hover:border-text/70 hover:-translate-y-0.5",
        link: "bg-transparent text-gold-400 hover:text-gold-300 underline-offset-4 hover:underline",
      },
      size: {
        default: "text-sm px-6 py-3",
        sm: "text-sm px-4 py-2",
        lg: "text-base px-8 py-4",
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
