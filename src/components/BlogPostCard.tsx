"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { BlogPost } from "../content/types/blog";

type BlogPostCardProps = {
  post: BlogPost;
  featured?: boolean;
};

export function BlogPostCard({ post, featured = false }: BlogPostCardProps) {
  const [imageError, setImageError] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Link href={`/blog/${post.slug}`}>
      <article
        className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 transition hover:border-[#7df6ff]/30 hover:bg-white/10 ${
          featured ? "md:col-span-2" : ""
        }`}
      >
        {/* Featured Image */}
        <div className={`relative overflow-hidden bg-gradient-to-br from-white/10 to-white/5 ${
          featured ? "h-64" : "h-48"
        }`}>
          {!imageError ? (
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes={featured ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 50vw"}
              onError={() => setImageError(true)}
              quality={85}
              loading="lazy"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-white/10 to-white/5">
              <div className="text-center">
                <svg
                  className="mx-auto h-12 w-12 text-white/30"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
                <p className="mt-2 text-sm text-white/50">Blog Image</p>
              </div>
            </div>
          )}
          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="rounded-full bg-[#00eaff]/90 px-3 py-1 text-xs font-semibold text-[#0c1014]">
              {post.category}
            </span>
          </div>
          {/* Featured Badge */}
          {post.featured && (
            <div className="absolute top-3 right-3">
              <span className="rounded-full bg-[#7df6ff]/90 px-3 py-1 text-xs font-semibold text-[#0c1014]">
                Featured
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-3">
          {/* Date and Read Time */}
          <div className="flex items-center gap-3 text-xs text-white/60">
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

          {/* Title */}
          <h3 className={`font-semibold text-white transition group-hover:text-[#00eaff] ${
            featured ? "text-2xl" : "text-xl"
          }`}>
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-white/70 line-clamp-3">
            {post.excerpt}
          </p>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {post.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="rounded-full bg-white/5 px-2 py-1 text-xs text-white/60"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Read More */}
          <div className="flex items-center gap-2 pt-2 text-sm font-semibold text-[#00eaff] transition group-hover:gap-3">
            <span>Read more</span>
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[#7df6ff]/0 transition-colors group-hover:bg-[#7df6ff]/5 pointer-events-none" />
      </article>
    </Link>
  );
}








