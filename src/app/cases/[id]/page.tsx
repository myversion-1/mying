import { notFound } from "next/navigation";
import Image from "next/image";
import { cases } from "../../../content/cases";
import { CaseStructuredData } from "../../../components/CaseStructuredData";
import { getLocalizedCase } from "../../../content/cases";
import { getCopy } from "../../../content/locales";
import type { CaseItem } from "../../../content/types/case";
import { getApplicableStandards, generateComplianceStatement } from "../../../lib/safety-standards";
import { Breadcrumbs } from "../../../components/Breadcrumbs";

interface CasePageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    lang?: string;
  }>;
}

// Helper to get localized text from multilingual object
function getLocalizedText(
  text: string | Record<string, string | undefined> | undefined,
  lang: string,
  fallback: string = ""
): string {
  if (!text) return fallback;
  if (typeof text === "string") return text;
  return text[lang] || text.en || text.zh || fallback;
}

// Helper to get case by ID
function getCaseById(id: string): CaseItem | undefined {
  return cases.find((c) => c.id === id || c.slug === id);
}

export default async function CasePage({ params, searchParams }: CasePageProps) {
  const { id } = await params;
  const { lang = "en" } = await searchParams;
  const c = getCopy(lang as any);

  const caseItem = getCaseById(id);
  if (!caseItem) {
    notFound();
  }

  const localizedCase = getLocalizedCase(caseItem, lang);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.miyingrides.com";
  const caseUrl = `${baseUrl}/cases/${id}${lang !== "en" ? `?lang=${lang}` : ""}`;

  // Get applicable safety standards
  const applicableStandards = getApplicableStandards(
    caseItem.projectType,
    caseItem.countryCode
  );
  const complianceStatement = generateComplianceStatement(applicableStandards, lang);

  // Get localized content
  const clientPainPoints = getLocalizedText(
    caseItem.clientPainPoints,
    lang,
    lang === "zh"
      ? "客户在项目初期面临的主要挑战和问题"
      : "Main challenges and issues faced by the client at the project's initial stage"
  );

  const solution = getLocalizedText(
    caseItem.solution,
    lang,
    lang === "zh"
      ? "Miying 提供的定制化解决方案"
      : "Customized solution provided by Miying"
  );

  // Space constraints
  const ceilingHeight = caseItem.spaceConstraints?.ceilingHeight
    ? getLocalizedText(
        {
          en: caseItem.spaceConstraints.ceilingHeightEn || caseItem.spaceConstraints.ceilingHeight,
          zh: caseItem.spaceConstraints.ceilingHeightZh || caseItem.spaceConstraints.ceilingHeight,
        },
        lang,
        caseItem.spaceConstraints.ceilingHeight
      )
    : null;

  return (
    <>
      <CaseStructuredData
        caseItem={caseItem}
        lang={lang}
        caseUrl={caseUrl}
        baseUrl={baseUrl}
      />

      <div className="min-h-screen bg-[#0c1014]">
        {/* Breadcrumbs */}
        <div className="mx-auto w-full max-w-screen-2xl px-4 pt-8 md:px-8">
          <Breadcrumbs
            items={[
              { label: lang === "zh" ? "首页" : "Home", href: "/" },
              { label: lang === "zh" ? "案例" : "Cases", href: "/cases" },
              { label: localizedCase.title, href: caseUrl },
            ]}
          />
        </div>

        {/* Hero Section */}
        <div className="relative mx-auto w-full max-w-screen-2xl px-4 py-12 md:px-8">
          <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden rounded-2xl">
            <Image
              src={localizedCase.image}
              alt={localizedCase.title}
              fill
              className="object-cover"
              priority
              quality={90}
              sizes="(max-width: 768px) 100vw, 90vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c1014] via-[#0c1014]/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="rounded-full bg-[#00eaff]/90 px-4 py-2 text-sm font-semibold text-[#0c1014]">
                  {localizedCase.projectType}
                </span>
                <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
                  {localizedCase.country}
                </span>
                {localizedCase.year && (
                  <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
                    {localizedCase.year}
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {localizedCase.title}
              </h1>
              {localizedCase.description && (
                <p className="text-lg text-white/90 max-w-3xl">
                  {localizedCase.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mx-auto w-full max-w-screen-2xl px-4 pb-16 md:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-12">
              {/* 1. Client Pain Points */}
              <section className="rounded-2xl border border-white/10 bg-white/5 p-8">
                <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                  <span className="h-1 w-12 bg-[#00eaff]" />
                  {lang === "zh" ? "客户痛点" : "Client Pain Points"}
                </h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-lg text-white/90 leading-relaxed whitespace-pre-line">
                    {clientPainPoints}
                  </p>
                </div>
              </section>

              {/* 2. Space Constraints */}
              <section className="rounded-2xl border border-white/10 bg-white/5 p-8">
                <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                  <span className="h-1 w-12 bg-[#00eaff]" />
                  {lang === "zh" ? "空间约束条件" : "Space Constraints"}
                </h2>
                <div className="space-y-4">
                  {ceilingHeight && (
                    <div className="rounded-xl bg-white/5 p-6 border border-white/10">
                      <div className="text-sm text-[var(--dark-bg-text-tertiary)] mb-2">
                        {lang === "zh" ? "天花板高度" : "Ceiling Height"}
                      </div>
                      <div className="text-2xl font-bold text-[#00eaff]">{ceilingHeight}</div>
                    </div>
                  )}
                  {caseItem.spaceConstraints?.floorArea && (
                    <div className="rounded-xl bg-white/5 p-6 border border-white/10">
                      <div className="text-sm text-[var(--dark-bg-text-tertiary)] mb-2">
                        {lang === "zh" ? "占地面积" : "Floor Area"}
                      </div>
                      <div className="text-xl font-semibold text-white">
                        {getLocalizedText(
                          {
                            en: caseItem.spaceConstraints.floorAreaEn || caseItem.spaceConstraints.floorArea,
                            zh: caseItem.spaceConstraints.floorAreaZh || caseItem.spaceConstraints.floorArea,
                          },
                          lang,
                          caseItem.spaceConstraints.floorArea
                        )}
                      </div>
                    </div>
                  )}
                  {caseItem.spaceConstraints?.otherConstraints && (
                    <div className="mt-4">
                      <p className="text-white/90 whitespace-pre-line">
                        {getLocalizedText(caseItem.spaceConstraints.otherConstraints, lang)}
                      </p>
                    </div>
                  )}
                </div>
              </section>

              {/* 3. Miying Solution */}
              <section className="rounded-2xl border border-white/10 bg-white/5 p-8">
                <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                  <span className="h-1 w-12 bg-[#00eaff]" />
                  {lang === "zh" ? "Miying 解决方案" : "Miying Solution"}
                </h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-lg text-white/90 leading-relaxed whitespace-pre-line">
                    {solution}
                  </p>
                </div>
              </section>

              {/* 4. Project Completion Photos */}
              {caseItem.completionPhotos && caseItem.completionPhotos.length > 0 && (
                <section className="rounded-2xl border border-white/10 bg-white/5 p-8">
                  <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                    <span className="h-1 w-12 bg-[#00eaff]" />
                    {lang === "zh" ? "项目完工实景图" : "Project Completion Photos"}
                  </h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    {caseItem.completionPhotos.map((photo, index) => (
                      <div
                        key={index}
                        className="relative aspect-video w-full overflow-hidden rounded-xl"
                      >
                        <Image
                          src={photo}
                          alt={`${localizedCase.title} - ${lang === "zh" ? "完工实景" : "Completion Photo"} ${index + 1}`}
                          fill
                          className="object-cover"
                          quality={85}
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Safety Compliance */}
              {applicableStandards.length > 0 && (
                <section className="rounded-2xl border border-[#00eaff]/30 bg-[#00eaff]/5 p-8">
                  <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                    <span className="h-1 w-12 bg-[#00eaff]" />
                    {lang === "zh" ? "安全标准合规性" : "Safety Compliance"}
                  </h2>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {applicableStandards.map((standard) => (
                        <span
                          key={standard.code}
                          className="rounded-full bg-[#00eaff]/20 border border-[#00eaff]/50 px-4 py-2 text-sm font-semibold text-[#00eaff]"
                        >
                          {standard.code}
                        </span>
                      ))}
                    </div>
                    <p className="text-white/90 leading-relaxed">{complianceStatement}</p>
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Project Stats */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-xl font-semibold text-white mb-4">
                  {lang === "zh" ? "项目数据" : "Project Statistics"}
                </h3>
                <div className="space-y-4">
                  {localizedCase.stats.map((stat, index) => (
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
              {localizedCase.highlights && localizedCase.highlights.length > 0 && (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {lang === "zh" ? "项目亮点" : "Project Highlights"}
                  </h3>
                  <ul className="space-y-3">
                    {localizedCase.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-3 text-white/80">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#00eaff]" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Testimonial */}
              {localizedCase.testimonial && (
                <div className="rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[#0a1628] to-[#0c1014] p-6 dark:border-white/10 dark:bg-white/5">
                  <h3 className="text-xl font-semibold text-white mb-4 dark:text-white">
                    {lang === "zh" ? "客户评价" : "Client Testimonial"}
                  </h3>
                  <div className="space-y-4">
                    <p className="text-white/95 italic dark:text-white/90">
                      "{getLocalizedText(
                        {
                          en: localizedCase.testimonial.textEn || localizedCase.testimonial.text,
                          zh: localizedCase.testimonial.textZh || localizedCase.testimonial.text,
                        },
                        lang,
                        localizedCase.testimonial.text
                      )}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-[var(--accent-primary)]/20 flex items-center justify-center text-[var(--accent-primary)] font-semibold">
                        {localizedCase.testimonial.author[0]}
                      </div>
                      <div>
                        <div className="font-semibold text-white dark:text-white">
                          {localizedCase.testimonial.author}
                        </div>
                        {localizedCase.testimonial.position && (
                          <div className="text-sm text-[var(--dark-bg-text-secondary)]">
                            {localizedCase.testimonial.position}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



