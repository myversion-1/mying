"use client";

import type { Product } from "../content/copy";
import type { Lang } from "./language";
import { copy } from "../content/copy";

interface ProductDecisionSupportProps {
  product: Product;
  lang: Lang;
}

/**
 * Product Decision Support Component
 * 
 * B2B-focused component that helps buyers make purchasing decisions by providing:
 * - Typical client use cases
 * - Problems solved
 * - Key technical advantages compared to alternatives
 * - Industries this product is suitable for
 */
export function ProductDecisionSupport({ product, lang }: ProductDecisionSupportProps) {
  const c = copy(lang);

  // Get localized labels
  const labels = {
    typicalUseCases: lang === "zh" ? "典型客户用例" : "Typical Client Use Cases",
    problemsSolved: lang === "zh" ? "解决的问题" : "Problems Solved",
    technicalAdvantages: lang === "zh" ? "关键技术优势" : "Key Technical Advantages",
    comparedToAlternatives: lang === "zh" ? "与替代品相比" : "Compared to Alternatives",
    suitableIndustries: lang === "zh" ? "适合的行业" : "Suitable Industries",
  };

  // Extract and organize data from product for B2B decision support
  const useCases = product.idealFor || [];
  
  // Problems solved - derive from positioning and idealFor
  const problemsSolved: string[] = [];
  if (product.positioning) {
    problemsSolved.push(product.positioning);
  }
  // Add problems based on usage type
  if (product.usage) {
    const usageProblems: Record<string, { en: string; zh: string }> = {
      "Family Entertainment": {
        en: "Provides safe, family-friendly entertainment that appeals to all ages",
        zh: "提供安全、适合家庭的娱乐体验，吸引所有年龄段"
      },
      "Thrill Adventure": {
        en: "Delivers high-intensity thrills for adventure-seeking visitors",
        zh: "为寻求刺激的游客提供高强度刺激体验"
      },
      "Water Attraction": {
        en: "Offers refreshing water-based entertainment for hot climates",
        zh: "为炎热气候提供清爽的水上娱乐体验"
      },
      "Kiddie Fun": {
        en: "Creates safe, age-appropriate fun for young children",
        zh: "为幼儿创造安全、适龄的娱乐体验"
      }
    };
    const problem = usageProblems[product.usage];
    if (problem) {
      problemsSolved.push(lang === "zh" ? problem.zh : problem.en);
    }
  }

  // Technical advantages - combine safety compliance with other technical features
  const technicalAdvantages: string[] = [];
  if (product.safetyCompliance && product.safetyCompliance.length > 0) {
    technicalAdvantages.push(...product.safetyCompliance);
  }
  if (product.patentCount && product.patentCount > 0) {
    technicalAdvantages.push(
      lang === "zh" 
        ? `${product.patentCount}+ 项专利保护，确保技术创新和知识产权`
        : `${product.patentCount}+ patents protecting innovation and intellectual property`
    );
  }
  if (product.type) {
    const typeAdvantages: Record<string, { en: string; zh: string }> = {
      "electric": {
        en: "Electric power system for quiet operation and lower maintenance",
        zh: "电动系统，运行安静，维护成本更低"
      },
      "mechanical": {
        en: "Proven mechanical design for reliability and durability",
        zh: "成熟的机械设计，可靠耐用"
      },
      "hybrid": {
        en: "Hybrid power system combining efficiency and performance",
        zh: "混合动力系统，兼顾效率和性能"
      }
    };
    const advantage = typeAdvantages[product.type];
    if (advantage) {
      technicalAdvantages.push(lang === "zh" ? advantage.zh : advantage.en);
    }
  }

  // Industries - derive from usage, mainCategory, and targetAudience
  const industries: string[] = [];
  if (product.usage) {
    const usageIndustries: Record<string, { en: string[]; zh: string[] }> = {
      "Family Entertainment": {
        en: ["Theme Parks", "Family Entertainment Centers", "Shopping Malls", "Resorts"],
        zh: ["主题公园", "家庭娱乐中心", "购物中心", "度假村"]
      },
      "Thrill Adventure": {
        en: ["Adventure Parks", "Theme Parks", "Amusement Parks", "Entertainment Complexes"],
        zh: ["冒险乐园", "主题公园", "游乐园", "娱乐综合体"]
      },
      "Water Attraction": {
        en: ["Water Parks", "Resorts", "Beachfront Venues", "Aquatic Centers"],
        zh: ["水上乐园", "度假村", "海滨场所", "水上中心"]
      },
      "Kiddie Fun": {
        en: ["Indoor Playgrounds", "Family Centers", "Shopping Malls", "Preschool Facilities"],
        zh: ["室内游乐场", "家庭中心", "购物中心", "学前教育设施"]
      }
    };
    const industryList = usageIndustries[product.usage];
    if (industryList) {
      industries.push(...(lang === "zh" ? industryList.zh : industryList.en));
    }
  }
  // Add industries from mainCategory if available
  if (product.mainCategory) {
    const categoryIndustries: Record<string, { en: string; zh: string }> = {
      "Family Rides": {
        en: "Family Entertainment Centers",
        zh: "家庭娱乐中心"
      },
      "Thrill Rides": {
        en: "Adventure Parks",
        zh: "冒险乐园"
      },
      "Water Rides": {
        en: "Water Parks",
        zh: "水上乐园"
      }
    };
    const industry = categoryIndustries[product.mainCategory];
    if (industry && !industries.includes(lang === "zh" ? industry.zh : industry.en)) {
      industries.push(lang === "zh" ? industry.zh : industry.en);
    }
  }

  return (
    <div className="space-y-8">
      {/* Typical Client Use Cases - B2B Decision Support */}
      {useCases.length > 0 && (
        <div className="rounded-2xl border border-[var(--accent-primary)]/20 bg-[var(--accent-primary-light)] p-6">
          <h2 className="mb-4 text-2xl font-semibold text-[var(--text-primary)]">
            {labels.typicalUseCases}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {useCases.map((useCase, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 rounded-lg border border-[var(--accent-primary)]/30 bg-[var(--surface-elevated)] p-4"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--accent-primary)] text-[var(--action-primary-text)] font-semibold">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <p className="text-[var(--text-secondary)] leading-relaxed">{useCase}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Problems Solved */}
      {problemsSolved.length > 0 && (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6">
          <h2 className="mb-4 text-2xl font-semibold text-[var(--text-primary)]">
            {labels.problemsSolved}
          </h2>
          <ul className="space-y-3">
            {problemsSolved.map((problem, idx) => (
              <li key={idx} className="flex items-start gap-3 text-[var(--text-secondary)]">
                <svg
                  className="mt-1 h-5 w-5 shrink-0 text-[var(--accent-primary)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="leading-relaxed">{problem}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Key Technical Advantages */}
      {technicalAdvantages.length > 0 && (
        <div className="rounded-2xl border border-[var(--accent-secondary)]/20 bg-gradient-to-br from-[var(--accent-primary-light)] to-[var(--surface-elevated)] p-6">
          <h2 className="mb-2 text-2xl font-semibold text-[var(--text-primary)]">
            {labels.technicalAdvantages}
          </h2>
          <p className="mb-4 text-sm text-[var(--text-tertiary)]">
            {labels.comparedToAlternatives}
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {technicalAdvantages.map((advantage, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 rounded-lg border border-[var(--accent-primary)]/30 bg-[var(--surface-elevated)] p-4"
              >
                <svg
                  className="mt-1 h-5 w-5 shrink-0 text-[var(--accent-primary)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <p className="text-[var(--text-secondary)] leading-relaxed">{advantage}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Suitable Industries */}
      {industries.length > 0 && (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6">
          <h2 className="mb-4 text-2xl font-semibold text-[var(--text-primary)]">
            {labels.suitableIndustries}
          </h2>
          <div className="flex flex-wrap gap-3">
            {industries.map((industry, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-[var(--accent-primary)]/30 bg-[var(--accent-primary-light)] px-4 py-2 text-sm font-medium text-[var(--text-primary)]"
              >
                {industry}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

