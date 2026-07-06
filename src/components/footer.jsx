import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { CopyEmailButton } from "@/components/copy-email-button";

const COLUMNS = [
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Solutions", href: "/solutions" },
    ],
  },
  {
    heading: "Product",
    links: [
      { label: "Trimora POS", href: "/#pos" },
      { label: "Pricing", href: "/#pricing" },
      { label: "Roadmap", href: "/#ecosystem" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Terms", href: "/legal/terms" },
      { label: "Security", href: "/legal/security" },
      { label: "Compliance", href: "/legal/compliance" },
      { label: "Status", href: "/legal/status" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Help & Support", href: "/resources" },
    ],
  },
];

const RESOURCES_PLACEHOLDER = ["Docs", "Blog"];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-rule mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 mb-12">
          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h3 className="text-xs font-mono uppercase tracking-wide text-ink-soft mb-4">
                {col.heading}
              </h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-muted hover:text-ink transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                {col.heading === "Resources" &&
                  RESOURCES_PLACEHOLDER.map((label) => (
                    <li key={label} className="text-sm text-ink-soft">
                      {label} <span className="text-[10px]">— coming soon</span>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 py-8 border-t border-rule">
          <div className="text-center sm:text-left">
            <p className="font-display text-lg text-ink mb-1">Trimora Systems</p>
            <p className="text-sm text-ink-muted">
              Building the future of business management.
            </p>
          </div>

          <div className="flex flex-col items-center sm:items-end gap-3">
            <h3 className="text-xs font-mono uppercase tracking-wide text-ink-soft">
              Get in touch
            </h3>
            <CopyEmailButton className="flex items-center gap-2 text-sm text-ink hover:text-accent-ink transition-colors" />
            <a
              href="https://wa.me/254702904562"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-ink hover:text-accent-ink transition-colors"
            >
              <MessageCircle size={16} strokeWidth={1.75} aria-hidden="true" />
              +254 702 904 562
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-rule">
          <p className="text-xs text-ink-soft">
            © {year} Trimora Systems. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
