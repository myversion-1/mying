"use client";

import { useState, useMemo, Suspense } from "react";
import dynamic from "next/dynamic";
import { PageHero } from "../../components/PageHero";
import { Section } from "../../components/Section";
import { useLanguage } from "../../components/language";
import { blogPosts, getLocalizedBlogPost, getPostsByCategory, type BlogCategory } from "../../content/blog";

// Code splitting: Lazy load BlogGrid to reduce initial bundle size
// This component is below the fold, so it can be loaded after initial render
const BlogGrid = dynamic(() => import("../../components/BlogGrid").then((mod) => ({ default: mod.BlogGrid })), {
  loading: () => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="h-64 animate-pulse rounded-2xl bg-[var(--surface-elevated)]" />
      ))}
    </div>
  ),
  ssr: false, // Disable SSR for below-the-fold content to improve initial load
});

export default function BlogPage() {
  const { lang } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | "all">("all");

  const localizedPosts = useMemo(() => {
    return blogPosts.map((post) => getLocalizedBlogPost(post, lang));
  }, [lang]);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(localizedPosts.map((p) => p.category))
    ) as BlogCategory[];
    return uniqueCategories;
  }, [localizedPosts]);

  const filteredPosts = useMemo(() => {
    if (selectedCategory === "all") {
      return localizedPosts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }
    return getPostsByCategory(selectedCategory, lang).sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [selectedCategory, localizedPosts, lang]);

  const categoryLabels: Record<BlogCategory | "all", { en: string; zh: string }> = {
    all: { en: "All Posts", zh: "全部文章" },
    "Industry News": { en: "Industry News", zh: "行业资讯" },
    "Company Updates": { en: "Company Updates", zh: "公司动态" },
    "Technical Articles": { en: "Technical Articles", zh: "技术文章" },
    "Product Updates": { en: "Product Updates", zh: "产品更新" },
    "Trade Shows": { en: "Trade Shows", zh: "展会报道" },
  };

  return (
    <div className="space-y-12">
      <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-8">
        <div className="my-10">
          <PageHero
            headline={lang === "zh" ? "博客与新闻" : "Blog & News"}
            subhead={
              lang === "zh"
                ? "了解行业动态、公司新闻和技术文章"
                : "Stay updated with industry news, company updates, and technical articles"
            }
          />
        </div>
      </div>

      {/* Category Filter */}
      <Section>
        <div className="flex flex-wrap items-center gap-3">
          <label className="text-sm font-medium text-[var(--text-secondary)]">
            {lang === "zh" ? "分类：" : "Category:"}
          </label>
          <button
            onClick={() => setSelectedCategory("all")}
            className={`rounded-full px-4 py-2 text-sm font-medium transition min-h-[44px] min-w-[44px] touch-manipulation ${
              selectedCategory === "all"
                ? "bg-[var(--action-primary)] text-[var(--action-primary-text)]"
                : "bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
            }`}
          >
            {categoryLabels.all?.[lang === "zh" ? "zh" : "en"] || "All Posts"}
          </button>
          {categories.map((category) => {
            const label = categoryLabels[category];
            const displayText = label 
              ? label[lang === "zh" ? "zh" : "en"] 
              : category; // Fallback to category name if label not found
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition min-h-[44px] min-w-[44px] touch-manipulation ${
                  selectedCategory === category
                    ? "bg-[var(--action-primary)] text-[var(--action-primary-text)]"
                    : "bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
                }`}
              >
                {displayText}
              </button>
            );
          })}
        </div>
      </Section>

      {/* Blog Posts Grid - Lazy loaded with Suspense */}
      <Section>
        <Suspense
          fallback={
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-64 animate-pulse rounded-2xl bg-[var(--surface-elevated)]" />
              ))}
            </div>
          }
        >
          {filteredPosts.length > 0 ? (
            <BlogGrid posts={filteredPosts} showFeatured={selectedCategory === "all"} />
          ) : (
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-12 text-center">
              <p className="text-[var(--text-secondary)]">
                {lang === "zh" ? "该分类下暂无文章" : "No posts found in this category"}
              </p>
            </div>
          )}
        </Suspense>
      </Section>
    </div>
  );
}










