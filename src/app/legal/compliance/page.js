import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Compliance — Trimora Systems",
  description: "Trimora Systems' compliance documentation. Full details coming soon.",
  path: "/legal/compliance",
});

export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center p-16 text-center">
      <div>
        <h1 className="font-display text-3xl text-ink mb-3">Compliance</h1>
        <p className="text-ink-muted max-w-md mx-auto leading-relaxed">
          We&apos;re finalizing our published compliance documentation. In the meantime, if you
          have specific compliance questions, reach out directly and we&apos;ll answer them.
        </p>
        <p className="text-sm text-ink-soft mt-6">
          <a href="mailto:hello@trimorasystems.com" className="underline hover:text-ink-muted">
            hello@trimorasystems.com
          </a>
        </p>
      </div>
    </main>
  );
}
