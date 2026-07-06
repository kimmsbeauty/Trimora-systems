import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource-variable/work-sans";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { MobileActionBar } from "@/components/mobile-action-bar";
import { LeadFormProvider } from "@/components/lead-form-context";
import { LeadFormModal } from "@/components/lead-form-modal";
import { buildMetadata, SITE_URL } from "@/lib/seo";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  ...buildMetadata({ path: "/" }),
  // Icons/manifest are only set here, not in buildMetadata() -- unlike
  // openGraph/twitter (which Next.js replaces wholesale per segment, so
  // every page must redefine them), icons and manifest are inherited by
  // child routes when they don't define their own, so one definition here
  // covers the whole site.
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#D1A13C" }],
  },
  manifest: "/site.webmanifest",
  other: {
    "msapplication-config": "/browserconfig.xml",
  },
};

export const viewport = {
  themeColor: "#D1A13C",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-body pb-20 md:pb-0">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-paper"
        >
          Skip to content
        </a>
        <LeadFormProvider>
          <Nav />
          <div id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
            {children}
          </div>
          <Footer />
          <MobileActionBar />
          <LeadFormModal />
        </LeadFormProvider>
        <Analytics />
      </body>
    </html>
  );
}
