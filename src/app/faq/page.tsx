"use client";

import { useState } from "react";
import { faqs, getFAQsByCategory, getLocalizedFAQ } from "../../content/faq";
import type { FAQ } from "../../content/types/faq";
import { useLanguage } from "../../components/language";
import { FAQSchema } from "../../components/FAQSchema";

type FAQCategory = FAQ["category"];

export default function FAQPage() {
  const { lang } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<FAQCategory | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const categories: (FAQCategory | "All")[] = [
    "All",
    "Product",
    "Service",
    "Shipping",
    "Payment",
    "Installation",
    "Maintenance",
    "Warranty",
    "Other",
  ];

  const categoryLabels: Record<string, { en: string; zh: string }> = {
    All: { en: "All", zh: "全部" },
    Product: { en: "Product", zh: "产品" },
    Service: { en: "Service", zh: "服务" },
    Shipping: { en: "Shipping", zh: "运输" },
    Payment: { en: "Payment", zh: "付款" },
    Installation: { en: "Installation", zh: "安装" },
    Maintenance: { en: "Maintenance", zh: "维护" },
    Warranty: { en: "Warranty", zh: "保修" },
    Other: { en: "Other", zh: "其他" },
  };

  // Filter FAQs
  const filteredFAQs = (selectedCategory === "All" 
    ? faqs 
    : getFAQsByCategory(selectedCategory)
  ).filter((faq) => {
    if (!searchQuery) return true;
    const localized = getLocalizedFAQ(faq, lang);
    const query = searchQuery.toLowerCase();
    return (
      localized.question.toLowerCase().includes(query) ||
      localized.answer.toLowerCase().includes(query)
    );
  });

  const toggleExpanded = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:px-8 md:py-16">
      {/* Page Header */}
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-4xl font-bold text-[var(--text-primary)] md:text-5xl">
          {lang === "zh" ? "常见问题" : "Frequently Asked Questions"}
        </h1>
        <p className="text-lg text-[var(--text-secondary)]">
          {lang === "zh" 
            ? "查找您需要的答案，或联系我们的团队获取更多帮助" 
            : "Find answers to your questions, or contact our team for more help"}
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder={lang === "zh" ? "搜索问题..." : "Search questions..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 pl-10 text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--accent-primary)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20"
          />
          <svg
            className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--text-tertiary)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((category) => {
          // Category labels only support en and zh, default to en for other languages
          const supportedLang: "en" | "zh" = (lang === "en" || lang === "zh") ? lang : "en";
          const label = categoryLabels[category]?.[supportedLang] || category;
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-lg border px-4 py-2 text-sm font-semibold transition min-h-[44px] touch-manipulation ${
                isActive
                  ? "border-[var(--action-primary)] bg-[var(--action-primary)] text-[var(--action-primary-text)]"
                  : "border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:border-[var(--accent-primary)]/30 hover:bg-[var(--surface-hover)]"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        {filteredFAQs.length === 0 ? (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-8 text-center">
            <p className="text-[var(--text-secondary)]">
              {lang === "zh" 
                ? "未找到相关问题，请尝试其他搜索词或联系我们的团队" 
                : "No questions found. Try different search terms or contact our team"}
            </p>
          </div>
        ) : (
          filteredFAQs.map((faq) => {
            const localized = getLocalizedFAQ(faq, lang);
            const isExpanded = expandedIds.has(faq.id);
            return (
              <div
                key={faq.id}
                className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] transition hover:border-[var(--accent-primary)]/30"
              >
                <button
                  onClick={() => toggleExpanded(faq.id)}
                  className="w-full px-6 py-4 text-left transition hover:bg-[var(--surface-hover)] min-h-[44px] touch-manipulation"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="flex-1 font-semibold text-[var(--text-primary)]">
                      {localized.question}
                    </h3>
                    <svg
                      className={`h-5 w-5 shrink-0 text-[var(--text-tertiary)] transition-transform ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>
                {isExpanded && (
                  <div className="border-t border-[var(--border)] px-6 py-4">
                    <p className="leading-relaxed text-[var(--text-secondary)]">
                      {localized.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Contact CTA */}
      <div className="mt-12 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-8 text-center">
        <h2 className="mb-2 text-2xl font-bold text-[var(--text-primary)]">
          {lang === "zh" ? "还有问题？" : "Still have questions?"}
        </h2>
        <p className="mb-6 text-[var(--text-secondary)]">
          {lang === "zh" 
            ? "联系我们的团队，我们很乐意为您提供帮助" 
            : "Contact our team, we're happy to help"}
        </p>
        <a
          href="/contact"
          className="inline-flex items-center gap-2 rounded-lg bg-[var(--action-primary)] px-6 py-3 font-semibold text-[var(--action-primary-text)] !text-[var(--action-primary-text)] transition-colors hover:bg-[var(--action-primary-hover)] min-h-[44px] touch-manipulation"
        >
          <span>{lang === "zh" ? "联系我们" : "Contact Us"}</span>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      </div>

      {/* FAQ Schema for SEO */}
      <FAQSchema faqs={filteredFAQs} lang={lang} />
    </div>
  );
}



