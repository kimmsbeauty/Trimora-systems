import { cn } from "@/lib/utils";

function Card({ className, muted = false, ...props }) {
  return (
    <div
      className={cn(
        "rounded-lg border p-6 transition-colors",
        muted
          ? "border-ink-700 bg-ink-900/40 grayscale-[0.4] opacity-70"
          : "border-ink-700 bg-ink-900",
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
