"use client";

import { useState } from "react";
import { Mail, Check } from "lucide-react";

// Plain mailto: links trigger the OS's "choose an app" dialog on any
// device without a default mail client configured -- a real complaint,
// not a hypothetical one. Click-to-copy sidesteps that entirely: no app
// launch, just the address on the clipboard, with a brief on-screen
// confirmation instead.
export function CopyEmailButton({ email = "support@trimorasystems.com", className = "" }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API can be unavailable (very old browsers, insecure
      // context) -- fall back to a normal mailto link only in that case,
      // rather than doing nothing.
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <button type="button" onClick={handleCopy} className={className} aria-live="polite">
      {copied ? (
        <>
          <Check size={16} strokeWidth={1.75} aria-hidden="true" />
          Copied!
        </>
      ) : (
        <>
          <Mail size={16} strokeWidth={1.75} aria-hidden="true" />
          {email}
        </>
      )}
    </button>
  );
}
