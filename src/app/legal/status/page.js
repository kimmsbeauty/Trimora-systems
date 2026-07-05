import { buildMetadata } from "@/lib/seo";
import { CopyEmailButton } from "@/components/copy-email-button";

export const metadata = buildMetadata({
  title: "System Status — Trimora Systems",
  description: "Trimora Systems service status. Live status page coming soon.",
  path: "/legal/status",
});

export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center p-16 text-center">
      <div>
        <h1 className="font-display text-3xl text-ink mb-3">System Status</h1>
        <p className="text-ink-muted max-w-md mx-auto leading-relaxed">
          A live status page is coming soon. In the meantime, if you&apos;re experiencing an
          issue, reach out directly and we&apos;ll look into it right away.
        </p>
        <div className="text-sm text-ink-soft mt-6 flex justify-center">
          <CopyEmailButton className="underline hover:text-ink-muted" />
        </div>
      </div>
    </main>
  );
}
