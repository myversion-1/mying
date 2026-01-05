"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../../../components/language";
import { getPostBySlug, getLatestPosts } from "../../../content/blog";

type Props = {
  params: Promise<{ slug: string }>;
};

export default function BlogPostPage({ params }: Props) {
  const resolvedParams = use(params);
  const { lang } = useLanguage();
  const post = getPostBySlug(resolvedParams.slug, lang);

  if (!post) {
    return (
      <div className="mx-auto max-w-4xl px-4 md:px-8 py-20">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-semibold text-white">
            {lang === "zh" ? "文章未找到" : "Post Not Found"}
          </h1>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#00eaff] hover:text-[#7df6ff] transition"
          >
            {lang === "zh" ? "返回博客" : "Back to Blog"}
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const latestPosts = getLatestPosts(lang, 3).filter((p) => p.id !== post.id);

  return (
    <div className="space-y-12">
      {/* Article Header */}
      <article className="mx-auto max-w-4xl px-4 md:px-8">
        {/* Back to Blog */}
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-[#00eaff]"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          {lang === "zh" ? "返回博客" : "Back to Blog"}
        </Link>

        {/* Featured Image */}
        <div className="relative mb-8 h-96 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            sizes="100vw"
            unoptimized
          />
        </div>

        {/* Article Meta */}
        <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-white/60">
          <span className="rounded-full bg-[#00eaff]/20 px-3 py-1 text-xs font-semibold text-[#00eaff]">
            {post.category}
          </span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {post.readTime && (
            <>
              <span>•</span>
              <span>{post.readTime} read</span>
            </>
          )}
          {post.author && (
            <>
              <span>•</span>
              <span>{post.author}</span>
            </>
          )}
        </div>

        {/* Article Title */}
        <h1 className="mb-6 text-4xl font-bold text-white">{post.title}</h1>

        {/* Article Content */}
        {post.content ? (
          <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        ) : (
          <div className="prose prose-invert max-w-none">
            <p className="text-lg leading-relaxed text-white/90">{post.excerpt}</p>
            <p className="mt-4 text-white/70">
              {lang === "zh"
                ? "完整文章内容即将发布，敬请期待。"
                : "Full article content coming soon. Stay tuned!"}
            </p>
          </div>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="rounded-full bg-white/5 px-3 py-1 text-sm text-white/70"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>

      {/* Related Posts */}
      {latestPosts.length > 0 && (
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
            <h2 className="mb-6 text-2xl font-semibold text-white">
              {lang === "zh" ? "相关文章" : "Related Articles"}
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {latestPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="group rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-[#7df6ff]/30 hover:bg-white/10"
                >
                  <h3 className="mb-2 font-semibold text-white transition group-hover:text-[#00eaff]">
                    {relatedPost.title}
                  </h3>
                  <p className="text-sm text-white/70 line-clamp-2">
                    {relatedPost.excerpt}
                  </p>
                  <div className="mt-2 text-xs text-white/50">
                    {formatDate(relatedPost.date)}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

