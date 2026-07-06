import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Blog — Trimora Systems",
  description: "Updates from Trimora Systems.",
  path: "/blog",
});

export default function Page() {
  return (
    <main className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-16 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="h-px w-8 bg-rule" aria-hidden="true" />
          <span className="eyebrow">Blog</span>
          <span className="h-px w-8 bg-rule" aria-hidden="true" />
        </div>
        <h1 className="font-display text-3xl sm:text-4xl text-ink">Updates from Trimora</h1>
      </div>

      <div className="max-w-2xl mx-auto px-6 pb-24 space-y-6">
        {BLOG_POSTS.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block border border-rule rounded-2xl p-6 hover:border-ink transition-colors"
          >
            <time dateTime={post.date} className="text-xs font-mono text-ink-soft">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <h2 className="font-display text-xl text-ink mt-2 mb-2">{post.title}</h2>
            <p className="text-sm text-ink-muted leading-relaxed">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
