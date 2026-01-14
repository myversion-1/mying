"use client";

import { useState } from "react";
import { useLanguage } from "../../components/language";
import Link from "next/link";

type GlossaryTerm = {
  term: string;
  definition: { en: string; zh: string };
  category: string;
};

const glossaryTerms: GlossaryTerm[] = [
  {
    term: "ASTM F24",
    definition: {
      en: "The ASTM International committee responsible for amusement ride safety standards. ASTM F24 standards cover design, manufacturing, operation, and maintenance of amusement rides and devices.",
      zh: "负责游乐设备安全标准的ASTM国际委员会。ASTM F24标准涵盖游乐设备和装置的设计、制造、操作和维护。",
    },
    category: "Standards",
  },
  {
    term: "Bumper Cars",
    definition: {
      en: "Also known as dodgems, electric-powered vehicles designed for collision-based entertainment. Typically operate on a conductive floor with overhead power supply.",
      zh: "也称为碰碰车，设计用于碰撞娱乐的电动车辆。通常在导电地板上运行，由架空电源供电。",
    },
    category: "Products",
  },
  {
    term: "Capacity Factor",
    definition: {
      en: "The ratio of actual riders to theoretical maximum capacity over a given time period. Used to measure ride efficiency and revenue potential.",
      zh: "在给定时间段内实际乘客数与理论最大容量的比率。用于衡量设备效率和收入潜力。",
    },
    category: "Operations",
  },
  {
    term: "CE Marking",
    definition: {
      en: "A conformity marking indicating that a product meets European Union safety, health, and environmental protection requirements. Required for amusement rides sold in the EU.",
      zh: "表明产品符合欧盟安全、健康和环境保护要求的符合性标记。在欧盟销售的游乐设备需要此标记。",
    },
    category: "Standards",
  },
  {
    term: "FEC (Family Entertainment Center)",
    definition: {
      en: "An indoor/outdoor entertainment venue that combines various amusement rides, games, and attractions designed for families and children of all ages.",
      zh: "结合各种游乐设备、游戏和景点的室内/室外娱乐场所，专为家庭和所有年龄段的儿童设计。",
    },
    category: "Venues",
  },
  {
    term: "EN 13814",
    definition: {
      en: "European standard for the safety of amusement rides and devices. Specifies requirements for design, manufacturing, installation, operation, and maintenance.",
      zh: "游乐设备和装置安全的欧洲标准。规定了设计、制造、安装、操作和维护的要求。",
    },
    category: "Standards",
  },
  {
    term: "G-Force",
    definition: {
      en: "The force of acceleration experienced by riders, measured in multiples of Earth's gravity. Critical for ride safety and rider comfort.",
      zh: "乘客体验的加速度力，以地球重力的倍数测量。对设备安全和乘客舒适度至关重要。",
    },
    category: "Technical",
  },
  {
    term: "Load Testing",
    definition: {
      en: "A safety procedure where a ride is tested with maximum weight capacity to ensure structural integrity and safe operation.",
      zh: "一种安全程序，用最大重量容量测试设备，以确保结构完整性和安全操作。",
    },
    category: "Safety",
  },
  {
    term: "Ride Cycle",
    definition: {
      en: "The complete sequence of a ride's operation from start to finish, including loading, ride duration, and unloading phases.",
      zh: "设备从开始到结束的完整操作序列，包括装载、运行持续时间和卸载阶段。",
    },
    category: "Operations",
  },
  {
    term: "Theming",
    definition: {
      en: "The process of applying decorative elements, storytelling, and immersive environments to amusement rides to create a cohesive experience.",
      zh: "将装饰元素、故事叙述和沉浸式环境应用于游乐设备以创造连贯体验的过程。",
    },
    category: "Design",
  },
  {
    term: "Throughput",
    definition: {
      en: "The number of riders a ride can accommodate per hour. A key metric for revenue calculation and capacity planning.",
      zh: "设备每小时可容纳的乘客数。收入计算和容量规划的关键指标。",
    },
    category: "Operations",
  },
  {
    term: "Turnkey Solution",
    definition: {
      en: "A complete package where the manufacturer handles all aspects from design and manufacturing to installation and commissioning, ready for immediate operation.",
      zh: "制造商处理从设计和制造到安装和调试的所有方面的完整包，可立即投入使用。",
    },
    category: "Services",
  },
];

const categories = ["All", "Standards", "Products", "Operations", "Venues", "Technical", "Safety", "Design", "Services"];

export default function GlossaryPage() {
  const { lang } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTerms = glossaryTerms.filter((term) => {
    const matchesCategory = selectedCategory === "All" || term.category === selectedCategory;
    if (!matchesCategory) return false;
    
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    const localized = lang === "zh" ? term.definition.zh : term.definition.en;
    return term.term.toLowerCase().includes(query) || localized.toLowerCase().includes(query);
  });

  // Group terms by first letter
  const groupedTerms = filteredTerms.reduce((acc, term) => {
    const firstLetter = term.term.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(term);
    return acc;
  }, {} as Record<string, GlossaryTerm[]>);

  const sortedLetters = Object.keys(groupedTerms).sort();

  return (
    <div className="mx-auto w-full max-w-screen-2xl px-4 py-12 md:px-8 md:py-16">
      {/* Page Header */}
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-4xl font-bold text-[var(--text-primary)] md:text-5xl">
          {lang === "zh" ? "行业术语词汇表" : "Amusement Industry Glossary"}
        </h1>
        <p className="text-lg text-[var(--text-secondary)]">
          {lang === "zh"
            ? "了解游乐设备行业的关键术语和定义，帮助您做出明智的决策"
            : "Understand key terms and definitions in the amusement industry to help you make informed decisions"}
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder={lang === "zh" ? "搜索术语..." : "Search terms..."}
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
              {category}
            </button>
          );
        })}
      </div>

      {/* Glossary Terms */}
      {filteredTerms.length === 0 ? (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-12 text-center">
          <p className="text-[var(--text-secondary)]">
            {lang === "zh" ? "未找到相关术语" : "No terms found"}
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {sortedLetters.map((letter) => (
            <div key={letter} className="space-y-4">
              <h2 className="text-3xl font-bold text-[var(--text-primary)] border-b border-[var(--border)] pb-2">
                {letter}
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {groupedTerms[letter].map((term) => (
                  <div
                    key={term.term}
                    className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6 transition hover:border-[var(--accent-primary)]/30 hover:bg-[var(--surface-hover)]"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="text-xl font-bold text-[var(--text-primary)]">{term.term}</h3>
                      <span className="rounded-full bg-[var(--surface-elevated)] px-3 py-1 text-xs font-semibold text-[var(--text-secondary)] border border-[var(--accent-primary)]/30">
                        {term.category}
                      </span>
                    </div>
                    <p className="leading-relaxed text-[var(--text-secondary)]">
                      {lang === "zh" ? term.definition.zh : term.definition.en}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CTA */}
      <div className="mt-12 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-8 text-center">
        <h2 className="mb-2 text-2xl font-bold text-[var(--text-primary)]">
          {lang === "zh" ? "需要更多信息？" : "Need More Information?"}
        </h2>
        <p className="mb-6 text-[var(--text-secondary)]">
          {lang === "zh"
            ? "联系我们的团队获取专业咨询和技术支持"
            : "Contact our team for professional consultation and technical support"}
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-lg bg-[var(--action-primary)] px-6 py-3 font-semibold text-[var(--action-primary-text)] !text-[var(--action-primary-text)] transition-colors hover:bg-[var(--action-primary-hover)] min-h-[44px] touch-manipulation"
        >
          <span>{lang === "zh" ? "联系我们" : "Contact Us"}</span>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

