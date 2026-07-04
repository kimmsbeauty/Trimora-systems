import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Resources — Trimora Systems",
  description:
    "Guides and resources for running your business with Trimora Systems. Coming soon.",
  path: "/resources",
});

export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center p-16 text-center">
      <div>
        <h1 className="font-display text-3xl text-text mb-3 capitalize">resources</h1>
        <p className="text-text-dim">Coming soon.</p>
      </div>
    </main>
  );
}
