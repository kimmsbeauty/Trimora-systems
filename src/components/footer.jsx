import Link from "next/link";

const COLUMNS = [
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
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

const CONTACT = {
  email: "hello@trimorasystems.com",
  phone: "+254 702 904 562",
  phoneHref: "+254702904562",
};

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
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-xs font-mono uppercase tracking-wide text-ink-soft mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-sm text-ink-muted hover:text-ink transition-colors"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT.phoneHref}`}
                  className="text-sm text-ink-muted hover:text-ink transition-colors"
                >
                  {CONTACT.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 pt-8 border-t border-rule">
          <div className="text-center sm:text-left">
            <p className="font-display text-lg text-ink mb-1">Trimora Systems</p>
            <p className="text-sm text-ink-muted">
              Building the future of business management.
            </p>
          </div>
          <p className="text-xs text-ink-soft">
            © {year} Trimora Systems. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
