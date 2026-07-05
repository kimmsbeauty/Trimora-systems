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
      <div className="max-w-2xl mx-auto px-6 pt-32 pb-4 text-center">
        <h1 className="font-display text-3xl sm:text-4xl text-ink mb-6">About Trimora Systems</h1>
        <p className="text-base text-ink-muted leading-relaxed mb-6">
          Trimora Systems is a Kenya-based, founder-led company building practical business
          software for growing businesses — starting with the day-to-day operational challenges
          faced by service businesses like salons and barbershops.
        </p>
        <p className="text-base text-ink-muted leading-relaxed mb-6">
          Trimora POS is our first product: live today, and already running the daily
          operations — checkout, scheduling, inventory, reporting — of real salons across Kenya.
          It&apos;s built multi-tenant from the ground up, so it&apos;s the foundation for a wider platform,
          not a one-off tool.
        </p>
        <p className="text-base text-ink-muted leading-relaxed">
          Every future Trimora product is built on that same foundation, so businesses that grow
          with us never have to start over on a new system.
        </p>
      </div>
      <JourneyTimeline />
    </main>
  );
}
