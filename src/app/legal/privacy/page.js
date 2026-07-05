import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy — Trimora Systems",
  description: "How Trimora Systems handles your data. Full policy coming soon.",
  path: "/legal/privacy",
});

export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center p-16 text-center">
      <div>
        <h1 className="font-display text-3xl text-ink mb-3">Privacy Policy</h1>
        <p className="text-ink-muted">Coming soon.</p>
      </div>
    </main>
  );
}
