"use client";

import { useState } from "react";
import { PageHero } from "../../components/PageHero";
import { Section } from "../../components/Section";
import { CasesGrid } from "../../components/CasesGrid";
import { useLanguage } from "../../components/language";
import { cases, getLocalizedCase } from "../../content/cases";
import Image from "next/image";

export default function CasesPage() {
  const { lang } = useLanguage();
  const [selectedCase, setSelectedCase] = useState<typeof cases[0] | null>(null);

  const localizedCases = cases.map((caseItem) => getLocalizedCase(caseItem, lang));

  return (
    <div className="space-y-12">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="my-10">
          <PageHero
            headline={
              lang === "zh"
                ? "成功案例展示"
                : "Our Success Stories"
            }
            subhead={
              lang === "zh"
                ? "探索我们在全球各地的成功项目，了解我们如何帮助客户实现他们的愿景。"
                : "Explore our successful projects around the world and see how we help clients bring their visions to life."
            }
          />
        </div>
      </div>

      <Section
        id="cases"
        title={lang === "zh" ? "项目案例" : "Project Cases"}
        subtitle={
          lang === "zh"
            ? "从主题公园到家庭娱乐中心，我们为全球客户提供专业的解决方案。"
            : "From theme parks to family entertainment centers, we deliver professional solutions for clients worldwide."
        }
      >
        <CasesGrid
          cases={localizedCases}
          onCaseClick={(caseItem) => setSelectedCase(caseItem)}
        />
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
                      <div className="text-sm text-white/60 mb-1">{stat.label}</div>
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
                        <div className="text-sm text-white/60">
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








