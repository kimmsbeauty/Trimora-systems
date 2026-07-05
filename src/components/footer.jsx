import Link from "next/link";

// "Resources" column items are intentionally rendered as plain text, not
// links -- Docs/Support/Blog don't exist yet. Linking them would either
// 404 or require stub pages that misrepresent readiness. Per brief 3.16:
// "placeholder for future" links, not live ones.
const COLUMNS = [
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "mailto:hello@trimorasystems.com" },
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
];

const RESOURCES_PLACEHOLDER = ["Docs", "Support", "Blog"];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-700 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 mb-12">
          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h3 className="text-xs font-mono uppercase tracking-wide text-text-faint mb-4">
                {col.heading}
              </h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-dim hover:text-text transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-xs font-mono uppercase tracking-wide text-text-faint mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              {RESOURCES_PLACEHOLDER.map((label) => (
                <li key={label} className="text-sm text-text-faint">
                  {label} <span className="text-[10px]">— coming soon</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 pt-8 border-t border-ink-700">
          <div className="text-center sm:text-left">
            <p className="font-display text-lg text-text mb-1">Trimora Systems</p>
            <p className="text-sm text-text-dim">
              Building the future of business management.
            </p>
          </div>
          <p className="text-xs text-text-faint">
            © {year} Trimora Systems. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
