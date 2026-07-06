import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return buildMetadata({ title: "Post not found", path: `/blog/${slug}` });
  return buildMetadata({
    title: `${post.title} — Trimora Systems Blog`,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
  });
}

export default async function Page({ params }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen">
      <div className="max-w-2xl mx-auto px-6 pt-32 pb-24">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm text-ink-muted hover:text-ink transition-colors mb-10"
        >
          <ChevronLeft size={16} aria-hidden="true" />
          Back to blog
        </Link>

        <time dateTime={post.date} className="text-xs font-mono text-ink-soft">
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <h1 className="font-display text-3xl sm:text-4xl text-ink mt-2 mb-8">{post.title}</h1>

        <div className="space-y-5">
          {post.body.map((paragraph, i) => (
            <p key={i} className="text-base text-ink-muted leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </main>
  );
}
