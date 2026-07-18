"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

const STORAGE_KEY = "trimora-cookie-notice-dismissed";

// Honest disclosure banner, not a hard consent gate -- doesn't block any
// analytics/functionality from loading either way. This is a UX/disclosure
// improvement, not a legal compliance certification: whether this alone
// satisfies the Kenya Data Protection Act, 2019 (or any other jurisdiction
// Trimora sells into) is a question for counsel, not something to claim
// here. The Privacy Policy already discloses cookie/analytics use in
// detail; this banner just surfaces that disclosure more visibly instead
// of leaving it buried in a policy page most visitors never open.
//
// Deliberately a bottom-fixed overlay, same standard pattern most sites
// use. Positioned at bottom-20 (5rem) on mobile -- matching the same
// spacing layout.js already reserves for the mobile action bar via
// pb-20 -- so it sits above that bar instead of covering it. On md+,
// where the mobile action bar is hidden, it drops back to bottom-0.
export function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        // This effect exists specifically to read a browser-only API
        // (localStorage) that isn't available during SSR. Starting
        // `visible` at false on both server and client, then updating it
        // here after mount, is the correct hydration-safe pattern for
        // this exact case -- computing it eagerly (e.g. via a lazy
        // useState initializer) would make the client's first render
        // diverge from the server's, causing a real hydration mismatch,
        // which is worse than this lint warning.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setVisible(true);
      }
    } catch {
      // localStorage unavailable (private browsing, disabled storage) --
      // fail open by just not showing the banner, rather than showing it
      // on every page load with no way to dismiss it permanently.
    }
  }, []);

  function dismiss() {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Nothing to do if storage isn't available -- it'll just show
      // again next visit, which is an acceptable degradation.
    }
  }

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="fixed bottom-20 md:bottom-0 inset-x-0 z-[70] border-t border-rule bg-paper-2/98 backdrop-blur-md px-4 py-4 sm:px-6"
    >
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
        <p className="text-sm text-ink-muted leading-relaxed flex-1 text-center sm:text-left">
          We use cookies to keep the site secure and understand how it&apos;s used. See our{" "}
          <Link href="/legal/privacy" className="text-accent-ink underline underline-offset-2">
            Privacy Policy
          </Link>{" "}
          for details.
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={dismiss}
            className="rounded-md bg-ink text-paper text-sm px-4 py-2 hover:opacity-90 transition-opacity"
          >
            Got it
          </button>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss cookie notice"
            className="text-ink-muted hover:text-ink transition-colors sm:hidden"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
