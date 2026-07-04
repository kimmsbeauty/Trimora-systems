// Single source of truth for page metadata (title, description, OpenGraph,
// Twitter card, canonical URL). Every route builds its `metadata` export
// from `buildMetadata()` below instead of hand-writing tags — so future
// product/docs/portal pages (Phase 4) inherit correct SEO/sharing metadata
// automatically, and a future site-wide change (e.g. a new OG image, a
// domain change) happens in one place.

// PROVISIONAL: the production domain has not been purchased/DNS-configured
// yet. Using this as the working canonical domain per explicit instruction
// so the metadata plumbing (canonical URLs, OG absolute URLs, sitemap) can
// be built now — swap this one constant the moment the real domain is live.
export const SITE_URL = "https://trimorasystems.com";

export const SITE_NAME = "Trimora Systems";

const DEFAULT_TITLE = "Trimora Systems — Building the Future of Business Management";
const DEFAULT_DESCRIPTION =
  "Helping businesses operate smarter today while building the intelligent software ecosystem they'll rely on tomorrow.";

/**
 * @param {Object} opts
 * @param {string} [opts.title] - Page title. Falls back to the site default.
 * @param {string} [opts.description] - Page description. Falls back to the site default.
 * @param {string} opts.path - Route path, e.g. "/about". Use "/" for the homepage.
 */
export function buildMetadata({ title, description, path }) {
  const pageTitle = title ?? DEFAULT_TITLE;
  const pageDescription = description ?? DEFAULT_DESCRIPTION;
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  // Referenced explicitly (not left to inherit from the root layout) because
  // Next.js replaces the whole openGraph/twitter object per segment rather
  // than deep-merging it — a page defining its own openGraph without this
  // would silently lose the image.
  const ogImageUrl = `${SITE_URL}/opengraph-image`;

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url,
      siteName: SITE_NAME,
      type: "website",
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: pageTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [ogImageUrl],
    },
  };
}
