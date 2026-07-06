import { SITE_URL } from "@/lib/seo";
import { BLOG_POSTS } from "@/lib/blog-posts";

const ROUTES = [
  { path: "/", priority: 1.0 },
  { path: "/about", priority: 0.6 },
  { path: "/solutions", priority: 0.8 },
  { path: "/resources", priority: 0.6 },
  { path: "/docs", priority: 0.6 },
  { path: "/blog", priority: 0.5 },
  { path: "/careers", priority: 0.4 },
  { path: "/legal/privacy", priority: 0.2 },
  { path: "/legal/terms", priority: 0.2 },
  { path: "/legal/security", priority: 0.2 },
  { path: "/legal/compliance", priority: 0.2 },
  { path: "/legal/status", priority: 0.2 },
];

export default function sitemap() {
  const staticEntries = ROUTES.map(({ path, priority }) => ({
    url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
    lastModified: new Date(),
    priority,
  }));

  const blogEntries = BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    priority: 0.4,
  }));

  return [...staticEntries, ...blogEntries];
}
