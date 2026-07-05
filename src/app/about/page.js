import { JourneyTimeline } from "@/components/journey-timeline";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About — Trimora Systems",
  description:
    "The story and roadmap behind Trimora Systems, from Trimora POS to the wider business software ecosystem being built next.",
  path: "/about",
});

// Every claim on this page is grounded in what's already established
// elsewhere on the site (Hero, Ecosystem, FAQ, Journey timeline) -- no
// founding date, team size, funding, or customer-count figures are
// included, since none of those are confirmed for public use yet.
export default function Page() {
  return (
    <main className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-20 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="h-px w-8 bg-rule" aria-hidden="true" />
          <span className="eyebrow">About</span>
          <span className="h-px w-8 bg-rule" aria-hidden="true" />
        </div>
        <h1 className="font-display text-3xl sm:text-4xl text-ink mb-6">
          Building the future of business management.
        </h1>
        <p className="text-base sm:text-lg text-ink-muted leading-relaxed mb-4">
          Trimora Systems is building a connected platform for running a
          business — starting with Trimora POS for service and retail
          businesses, currently focused on salons and barbershops, and
          growing into a wider ecosystem of products over time.
        </p>
        <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
          Rather than a single tool, Trimora is designed so a business can
          start with what it needs today and add more as it grows —
          Trimora AI, CRM, and Payroll are already in development or
          planned next — without switching platforms along the way.
        </p>
      </div>
      <JourneyTimeline />
    </main>
  );
}
