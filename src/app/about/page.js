import { JourneyTimeline } from "@/components/journey-timeline";

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
