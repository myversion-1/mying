"use client";

import { useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { PageHero } from "../../components/PageHero";
import { Section } from "../../components/Section";
import { useLanguage } from "../../components/language";
import { cases, getLocalizedCase } from "../../content/cases";
import Image from "next/image";
import type { CaseItem } from "../../content/types/case";

// Code splitting: Lazy load heavy components below the fold
// CasesGrid and GlobalMap are not critical for initial render
const CasesGrid = dynamic(() => import("../../components/CasesGrid").then((mod) => ({ default: mod.CasesGrid })), {
  loading: () => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="h-64 animate-pulse rounded-2xl bg-[var(--surface-elevated)]" />
      ))}
    </div>
  ),
  ssr: false, // Disable SSR for client-side filtering components
});

const GlobalMap = dynamic(() => import("../../components/GlobalMap").then((mod) => ({ default: mod.GlobalMap })), {
  loading: () => <div className="h-96 animate-pulse rounded-2xl bg-[var(--surface-elevated)]" />,
  ssr: false, // Map component doesn't need SSR
});

export default function CasesPage() {
  const { lang } = useLanguage();
  const router = useRouter();
  const [selectedCase, setSelectedCase] = useState<CaseItem | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedProjectType, setSelectedProjectType] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  const localizedCases = cases.map((caseItem) => getLocalizedCase(caseItem, lang));

  // Get unique filter options
  const countries = Array.from(new Set(cases.map((c) => c.country))).sort();
  const projectTypes = Array.from(new Set(cases.map((c) => c.projectType))).sort();
  const years = Array.from(new Set(cases.map((c) => c.year).filter(Boolean))).sort((a, b) => (b || "").localeCompare(a || ""));

  // Filter cases
  const filteredCases = localizedCases.filter((caseItem) => {
    if (selectedCountry && caseItem.country !== selectedCountry) return false;
    if (selectedProjectType && caseItem.projectType !== selectedProjectType) return false;
    if (selectedYear && caseItem.year !== selectedYear) return false;
    return true;
  });

  // Calculate statistics
  const totalCases = cases.length;
  const uniqueCountries = new Set(cases.map((c) => c.countryCode || c.country)).size;
  const totalInvestment = cases.reduce((sum, c) => {
    const investmentStat = c.stats.find((s) => s.labelEn === "Investment" || s.labelZh === "投资额");
    if (investmentStat) {
      const value = investmentStat.value.replace(/[^0-9.]/g, "");
      return sum + parseFloat(value || "0");
    }
    return sum;
  }, 0);

  const handleCountryClick = (countryCode: string, countryCases: CaseItem[]) => {
    setSelectedCountry(countryCode);
    // Optionally filter cases by country
  };

  const handleCaseClick = (caseItem: CaseItem) => {
    // Navigate to case detail page instead of modal
    router.push(`/cases/${caseItem.id}${lang !== "en" ? `?lang=${lang}` : ""}`);
  };

  return (
    <div className="space-y-12">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="my-10">
          <PageHero
            headline={
              lang === "zh"
                ? "主题公园设备案例研究 | 游乐设备制造商项目展示"
                : "Theme Park Equipment Case Studies | Amusement Rides Manufacturer Projects"
            }
            subhead={
              lang === "zh"
                ? "作为领先的游乐设备制造商和主题公园设备供应商，我们已在全球50多个国家完成500+成功项目。探索我们的主题公园设备案例研究，了解我们如何帮助FEC和主题公园客户实现他们的愿景。"
                : "As a leading amusement rides manufacturer and theme park equipment supplier, we've completed 500+ successful projects across 50+ countries. Explore our theme park equipment case studies and see how we help FEC and theme park clients bring their visions to life."
            }
          />
        </div>
      </div>

      {/* Global Map Section */}
      <Section
        id="global-map"
        title={lang === "zh" ? "国际游乐设备供应商全球项目分布" : "International Amusement Rides Supplier Global Projects"}
        subtitle={
          lang === "zh"
            ? "查看 Miying 在全球各地的项目分布，点击国家查看详细案例"
            : "View Miying's project distribution worldwide. Click on countries to see detailed case studies"
        }
      >
        <GlobalMap
          cases={localizedCases}
          onCountryClick={handleCountryClick}
          className="mb-8"
        />
      </Section>

      {/* Statistics Section */}
      <Section
        id="case-stats"
        title={lang === "zh" ? "ISO认证游乐设备制造商案例统计" : "ISO Certified Amusement Rides Manufacturer Statistics"}
        subtitle={
          lang === "zh"
            ? "我们的成功案例遍布全球，为各种类型的项目提供专业解决方案"
            : "Our successful cases span the globe, delivering professional solutions for various project types"
        }
      >
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6 text-center">
            <div className="text-4xl font-bold text-[var(--accent-primary)] mb-2">{totalCases}+</div>
            <div className="text-[var(--text-secondary)]">
              {lang === "zh" ? "成功案例" : "Successful Cases"}
            </div>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6 text-center">
            <div className="text-4xl font-bold text-[var(--accent-primary)] mb-2">{uniqueCountries}+</div>
            <div className="text-[var(--text-secondary)]">
              {lang === "zh" ? "覆盖国家" : "Countries Covered"}
            </div>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6 text-center">
            <div className="text-4xl font-bold text-[var(--accent-primary)] mb-2">
              ${totalInvestment > 0 ? `${(totalInvestment / 1000).toFixed(0)}M+` : "N/A"}
            </div>
            <div className="text-[var(--text-secondary)]">
              {lang === "zh" ? "总投资额" : "Total Investment"}
            </div>
          </div>
        </div>
      </Section>

      {/* Filter Section */}
      <Section
        id="cases"
        title={lang === "zh" ? "主题公园设备安装服务案例" : "Theme Park Equipment Installation Services Cases"}
        subtitle={
          lang === "zh"
            ? "从主题公园到家庭娱乐中心，我们为全球客户提供专业的解决方案。"
            : "From theme parks to family entertainment centers, we deliver professional solutions for clients worldwide."
        }
      >
        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-wrap gap-3">
            {/* Country Filter */}
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">
                {lang === "zh" ? "按国家筛选" : "Filter by Country"}
              </label>
              <select
                value={selectedCountry || ""}
                onChange={(e) => setSelectedCountry(e.target.value || null)}
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-2 text-[var(--text-primary)] focus:border-[var(--accent-primary)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20 min-h-[44px] touch-manipulation"
              >
                <option value="">{lang === "zh" ? "所有国家" : "All Countries"}</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            {/* Project Type Filter */}
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">
                {lang === "zh" ? "按项目类型筛选" : "Filter by Project Type"}
              </label>
              <select
                value={selectedProjectType || ""}
                onChange={(e) => setSelectedProjectType(e.target.value || null)}
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-2 text-[var(--text-primary)] focus:border-[var(--accent-primary)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20 min-h-[44px] touch-manipulation"
              >
                <option value="">{lang === "zh" ? "所有类型" : "All Types"}</option>
                {projectTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Year Filter */}
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">
                {lang === "zh" ? "按年份筛选" : "Filter by Year"}
              </label>
              <select
                value={selectedYear || ""}
                onChange={(e) => setSelectedYear(e.target.value || null)}
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-2 text-[var(--text-primary)] focus:border-[var(--accent-primary)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20 min-h-[44px] touch-manipulation"
              >
                <option value="">{lang === "zh" ? "所有年份" : "All Years"}</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filters & Clear */}
          {(selectedCountry || selectedProjectType || selectedYear) && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-[var(--text-secondary)]">
                {lang === "zh" ? "当前筛选：" : "Active filters:"}
              </span>
              {selectedCountry && (
                <button
                  onClick={() => setSelectedCountry(null)}
                  className="inline-flex items-center gap-1 rounded-full bg-[var(--action-informational)] px-3 py-1 text-sm font-semibold text-[var(--action-informational-text)] border border-[var(--accent-primary)]/30 hover:bg-[var(--accent-primary)]/20 transition min-h-[32px] touch-manipulation"
                >
                  {selectedCountry}
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              {selectedProjectType && (
                <button
                  onClick={() => setSelectedProjectType(null)}
                  className="inline-flex items-center gap-1 rounded-full bg-[var(--action-informational)] px-3 py-1 text-sm font-semibold text-[var(--action-informational-text)] border border-[var(--accent-primary)]/30 hover:bg-[var(--accent-primary)]/20 transition min-h-[32px] touch-manipulation"
                >
                  {selectedProjectType}
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              {selectedYear && (
                <button
                  onClick={() => setSelectedYear(null)}
                  className="inline-flex items-center gap-1 rounded-full bg-[var(--action-informational)] px-3 py-1 text-sm font-semibold text-[var(--action-informational-text)] border border-[var(--accent-primary)]/30 hover:bg-[var(--accent-primary)]/20 transition min-h-[32px] touch-manipulation"
                >
                  {selectedYear}
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              <button
                onClick={() => {
                  setSelectedCountry(null);
                  setSelectedProjectType(null);
                  setSelectedYear(null);
                }}
                className="text-sm text-[var(--accent-primary)] hover:text-[var(--accent-primary-hover)] transition min-h-[32px] touch-manipulation"
              >
                {lang === "zh" ? "清除所有" : "Clear all"}
              </button>
            </div>
          )}

          {/* Results Count */}
          <div className="text-sm text-[var(--text-secondary)]">
            {lang === "zh" 
              ? `显示 ${filteredCases.length} 个案例（共 ${localizedCases.length} 个）`
              : `Showing ${filteredCases.length} of ${localizedCases.length} cases`}
          </div>
        </div>

        {/* Cases Grid */}
        {filteredCases.length > 0 ? (
          <CasesGrid
            cases={filteredCases}
            onCaseClick={handleCaseClick}
          />
        ) : (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-12 text-center">
            <p className="text-[var(--text-secondary)]">
              {lang === "zh" 
                ? "没有找到匹配的案例，请尝试其他筛选条件" 
                : "No cases found matching your filters. Try different criteria."}
            </p>
          </div>
        )}
      </Section>

      {/* Case Detail Modal */}
      {selectedCase && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedCase(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-[#0c1014] rounded-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedCase(null)}
              className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition"
              aria-label="Close"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Case Image */}
            <div className="relative h-64 w-full overflow-hidden">
              <Image
                src={selectedCase.image}
                alt={selectedCase.title}
                fill
                className="object-cover"
                quality={85}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 90vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c1014] to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h2 className="text-3xl font-bold text-white mb-2">
                  {selectedCase.title}
                </h2>
                <div className="flex gap-2">
                  <span className="rounded-full bg-[#00eaff]/90 px-3 py-1 text-sm font-semibold text-[#0c1014]">
                    {selectedCase.projectType}
                  </span>
                  <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-semibold text-white backdrop-blur">
                    {selectedCase.country}
                  </span>
                  {selectedCase.year && (
                    <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-semibold text-white backdrop-blur">
                      {selectedCase.year}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Case Content */}
            <div className="p-8 space-y-6">
              {/* Description */}
              {selectedCase.description && (
                <p className="text-lg text-white/90">{selectedCase.description}</p>
              )}

              {/* Stats */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {lang === "zh" ? "项目数据" : "Project Statistics"}
                </h3>
                <div className="grid gap-4 md:grid-cols-3">
                  {selectedCase.stats.map((stat, index) => (
                    <div
                      key={index}
                      className="rounded-xl bg-white/5 p-4 border border-white/10"
                    >
                      <div className="text-sm text-[var(--dark-bg-text-tertiary)] mb-1">{stat.label}</div>
                      <div className="text-2xl font-bold text-[#00eaff]">{stat.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              {selectedCase.highlights && selectedCase.highlights.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {lang === "zh" ? "项目亮点" : "Project Highlights"}
                  </h3>
                  <ul className="space-y-2">
                    {selectedCase.highlights.map((highlight, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-white/80"
                      >
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#00eaff]" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Testimonial */}
              {selectedCase.testimonial && (
                <div className="rounded-xl bg-white/5 p-6 border border-white/10">
                  <p className="text-white/90 italic mb-4">
                    "{selectedCase.testimonial.text}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-[#00eaff]/20 flex items-center justify-center text-[#00eaff] font-semibold">
                      {selectedCase.testimonial.author[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-white">
                        {selectedCase.testimonial.author}
                      </div>
                      {selectedCase.testimonial.position && (
                        <div className="text-sm text-[var(--dark-bg-text-tertiary)]">
                          {selectedCase.testimonial.position}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}








