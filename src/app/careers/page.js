import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Careers — Trimora Systems",
  description: "Careers at Trimora Systems. Open roles coming soon.",
  path: "/careers",
});

export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center p-16 text-center">
      <div>
        <h1 className="font-display text-3xl text-text mb-3 capitalize">careers</h1>
        <p className="text-text-dim">Coming soon.</p>
      </div>
    </main>
  );
}
