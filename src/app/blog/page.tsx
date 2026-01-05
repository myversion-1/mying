"use client";

import { useState, useMemo } from "react";
import { PageHero } from "../../components/PageHero";
import { Section } from "../../components/Section";
import { BlogGrid } from "../../components/BlogGrid";
import { useLanguage } from "../../components/language";
import { blogPosts, getLocalizedBlogPost, getPostsByCategory, type BlogCategory } from "../../content/blog";

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
      <div className="mx-auto max-w-6xl px-4 md:px-8">
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
          <label className="text-sm font-medium text-white/70">
            {lang === "zh" ? "分类：" : "Category:"}
          </label>
          <button
            onClick={() => setSelectedCategory("all")}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              selectedCategory === "all"
                ? "bg-[#00eaff] text-[#0c1014]"
                : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            {categoryLabels.all[lang === "zh" ? "zh" : "en"]}
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                selectedCategory === category
                  ? "bg-[#00eaff] text-[#0c1014]"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {categoryLabels[category][lang === "zh" ? "zh" : "en"]}
            </button>
          ))}
        </div>
      </Section>

      {/* Blog Posts Grid */}
      <Section>
        {filteredPosts.length > 0 ? (
          <BlogGrid posts={filteredPosts} showFeatured={selectedCategory === "all"} />
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center">
            <p className="text-white/70">
              {lang === "zh" ? "该分类下暂无文章" : "No posts found in this category"}
            </p>
          </div>
        )}
      </Section>
    </div>
  );
}







