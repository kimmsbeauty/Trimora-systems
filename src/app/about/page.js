import { JourneyTimeline } from "@/components/journey-timeline";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About — Trimora Systems",
  description:
    "The story and roadmap behind Trimora Systems, from Trimora POS to the wider business software ecosystem being built next.",
  path: "/about",
});

export default function Page() {
  return (
    <main className="min-h-screen">
      <div className="flex items-center justify-center p-16 text-center">
        <div>
          <h1 className="font-display text-3xl text-text mb-3 capitalize">about</h1>
          <p className="text-text-dim">More about Trimora Systems is coming soon.</p>
        </div>
      </div>
      <JourneyTimeline />
    </main>
  );
}
