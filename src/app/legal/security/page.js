import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Security — Trimora Systems",
  description: "How Trimora Systems approaches security. Full documentation coming soon.",
  path: "/legal/security",
});

export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center p-16 text-center">
      <div>
        <h1 className="font-display text-3xl text-ink mb-3">Security</h1>
        <p className="text-ink-muted max-w-md mx-auto leading-relaxed">
          We&apos;re finalizing our published security documentation. In the meantime, if you
          have specific security questions, reach out directly and we&apos;ll answer them.
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
