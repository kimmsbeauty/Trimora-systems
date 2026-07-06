"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// Email needs copy-to-clipboard (see copy-email-button.jsx for why); other
// contact methods like WhatsApp are normal links. One component handles
// both so the Resources contact grid stays visually consistent.
export function ContactCard({ icon, title, description, href, copyValue, copiedDescription }) {
  const [copied, setCopied] = useState(false);

  if (copyValue) {
    async function handleCopy() {
      try {
        await navigator.clipboard.writeText(copyValue);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        window.location.href = `mailto:${copyValue}`;
      }
    }

    return (
      <button type="button" onClick={handleCopy} className="text-left w-full" aria-live="polite">
        <Card className="flex flex-col gap-3 hover:border-accent-ink/40 transition-colors">
          <CardHeader className="mb-0">{icon}</CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{copied ? copiedDescription ?? "Copied to clipboard!" : description}</CardDescription>
        </Card>
      </button>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <Card className="flex flex-col gap-3 hover:border-accent-ink/40 transition-colors">
        <CardHeader className="mb-0">{icon}</CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </Card>
    </a>
  );
}
