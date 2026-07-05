import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Careers — Trimora Systems",
  description: "Careers at Trimora Systems. No open roles right now, but we'd like to hear from you.",
  path: "/careers",
});

// Honest, not aspirational: no fabricated job listings. Trimora doesn't
// have open roles published right now, so this says exactly that rather
// than implying a hiring pipeline that doesn't exist.
export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center p-16 text-center">
      <div className="max-w-xl">
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="h-px w-8 bg-rule" aria-hidden="true" />
          <span className="eyebrow">Careers</span>
          <span className="h-px w-8 bg-rule" aria-hidden="true" />
        </div>
        <h1 className="font-display text-3xl text-ink mb-4">
          No open roles right now.
        </h1>
        <p className="text-ink-muted leading-relaxed">
          Trimora Systems isn&apos;t actively hiring at the moment. If
          you&apos;re excited about what we&apos;re building and want to
          get in touch anyway, reach out at{" "}
          <a href="mailto:hello@trimorasystems.com" className="text-ink underline underline-offset-4">
            hello@trimorasystems.com
          </a>
          .
        </p>
      </div>
    </main>
  );
}
