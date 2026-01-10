"use client";

import Image from "next/image";
import Link from "next/link";
import { partners } from "../content/partners";
import { useLanguage } from "./language";
import { copy } from "../content/copy";

type TrustLayerProps = {
  variant?: "compact" | "full";
  showPartners?: boolean;
  showCertifications?: boolean;
  showFactoryPhotos?: boolean;
  showProjectHighlights?: boolean;
  maxPartners?: number;
};

/**
 * Trust Layer Component
 * 
 * Comprehensive social proof module that builds credibility and trust.
 * Includes:
 * - Client logos (partners)
 * - Partnership badges
 * - Certifications
 * - Factory photos
 * - Project highlights
 * 
 * Designed to appear immediately after hero or before final CTA
 * to reinforce purchase confidence.
 */
export function TrustLayer({
  variant = "full",
  showPartners = true,
  showCertifications = true,
  showFactoryPhotos = true,
  showProjectHighlights = true,
  maxPartners = 10,
}: TrustLayerProps) {
  const { lang } = useLanguage();
  const c = copy(lang);

  // Certifications data
  const certifications = [
    {
      name: "ISO 9001",
      description: lang === "zh" 
        ? "质量管理体系认证，确保一致的质量标准" 
        : "Quality Management System certification ensuring consistent quality standards",
      badge: lang === "zh" ? "已认证" : "Certified",
    },
    {
      name: "CE Marking",
      description: lang === "zh"
        ? "欧洲符合性认证，符合安全和环境标准"
        : "European Conformity certification for safety and environmental standards",
      badge: lang === "zh" ? "合规" : "Compliant",
    },
    {
      name: "EN 13814",
      description: lang === "zh"
        ? "欧洲游乐设备安全标准"
        : "European standard for safety of amusement rides and devices",
      badge: lang === "zh" ? "合规" : "Compliant",
    },
    {
      name: "ASTM F24",
      description: lang === "zh"
        ? "美国游乐设备安全标准"
        : "American standard for amusement rides and devices safety",
      badge: lang === "zh" ? "合规" : "Compliant",
    },
  ];

  // Factory gallery images (placeholder - replace with actual images)
  const factoryPhotos = [
    "/products/米盈游乐设备产品介绍 conv 0.jpeg",
    "/products/米盈游乐设备产品介绍 conv 1.jpeg",
    "/products/米盈游乐设备产品介绍 conv 10.jpeg",
  ];

  // Project highlights (placeholder data - can be enhanced with actual project data)
  const projectHighlights = [
    {
      title: lang === "zh" ? "全球交付" : "Global Delivery",
      description: lang === "zh" ? "80+ 国家，500+ 项目" : "80+ countries, 500+ projects",
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: lang === "zh" ? "工厂测试" : "Factory Tested",
      description: lang === "zh" ? "交付前全面安全检测" : "Comprehensive safety testing before delivery",
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: lang === "zh" ? "专利保护" : "Patent Protected",
      description: lang === "zh" ? "30+ 研发专利" : "30+ R&D patents",
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
    },
    {
      title: lang === "zh" ? "15年经验" : "15 Years Experience",
      description: lang === "zh" ? "行业领先的专业知识" : "Industry-leading expertise",
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  const displayPartners = maxPartners ? partners.slice(0, maxPartners) : partners;

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        {/* Section Header - Only show in full variant */}
        {variant === "full" && (
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-3xl font-bold text-[var(--text-primary)] md:text-4xl">
              {lang === "zh" ? "值得信赖的合作伙伴" : "Trusted by Industry Leaders"}
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              {lang === "zh"
                ? "全球领先的游乐园和娱乐中心选择 Miying"
                : "Leading theme parks and entertainment centers worldwide choose Miying"}
            </p>
          </div>
        )}

        <div className={variant === "compact" ? "space-y-8" : "space-y-12"}>
          {/* Client Logos / Partners */}
          {showPartners && displayPartners.length > 0 && (
            <div>
              {variant === "full" && (
                <h3 className="mb-6 text-center text-xl font-semibold text-[var(--text-primary)]">
                  {lang === "zh" ? "我们的客户" : "Our Clients"}
                </h3>
              )}
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
                {displayPartners.map((partner) => (
                  <div
                    key={partner.id}
                    className="group relative flex items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6 transition hover:border-[var(--accent-primary)]/30 hover:bg-[var(--surface-hover)]"
                  >
                    {partner.logo ? (
                      <div className="relative h-16 w-full">
                        <Image
                          src={partner.logo}
                          alt={partner.name}
                          fill
                          className="object-contain opacity-70 transition group-hover:opacity-100"
                          quality={85}
                          loading="lazy"
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                        />
                      </div>
                    ) : (
                      <div className="flex h-16 w-full items-center justify-center text-[var(--text-tertiary)]">
                        <span className="text-sm font-medium">{partner.name}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications & Compliance */}
          {showCertifications && certifications.length > 0 && (
            <div>
              {variant === "full" && (
                <h3 className="mb-6 text-center text-xl font-semibold text-[var(--text-primary)]">
                  {c.aboutPage?.certifications?.title || (lang === "zh" ? "行业认证与合规" : "Industry Certifications & Compliance")}
                </h3>
              )}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {certifications.map((cert, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6 text-center transition hover:border-[var(--accent-primary)]/30 hover:bg-[var(--surface-hover)]"
                  >
                    <div className="mb-3 flex items-center justify-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent-primary-light)] text-[var(--accent-primary)] text-xl font-bold">
                        ✓
                      </div>
                    </div>
                    <h4 className="mb-2 text-lg font-semibold text-[var(--text-primary)]">
                      {cert.name}
                    </h4>
                    <p className="mb-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                      {cert.description}
                    </p>
                    <span className="inline-flex items-center rounded-full bg-[var(--accent-primary-light)] px-3 py-1 text-xs font-semibold text-[var(--accent-primary)] border border-[var(--accent-primary)]/30">
                      {cert.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Factory Photos */}
          {showFactoryPhotos && factoryPhotos.length > 0 && (
            <div>
              <h3 className="mb-6 text-center text-xl font-semibold text-[var(--text-primary)]">
                {lang === "zh" ? "工厂实景" : "Factory Facilities"}
              </h3>
              <div className="grid gap-4 md:grid-cols-3">
                {factoryPhotos.map((photo, idx) => (
                  <div
                    key={idx}
                    className="group relative aspect-video overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] transition hover:border-[var(--accent-primary)]/30"
                  >
                    <Image
                      src={photo}
                      alt={lang === "zh" ? `工厂照片 ${idx + 1}` : `Factory photo ${idx + 1}`}
                      fill
                      className="object-cover transition group-hover:scale-105"
                      quality={85}
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-lg border border-[var(--action-secondary-border)] bg-[var(--action-secondary)] px-6 py-3 text-sm font-semibold text-[var(--action-secondary-text)] transition-colors hover:bg-[var(--action-secondary-hover-bg)] min-h-[44px] touch-manipulation"
                >
                  <span>{c.aboutPage?.factoryTour?.ctaText || (lang === "zh" ? "查看工厂参观" : "View Factory Tour")}</span>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          )}

          {/* Project Highlights */}
          {showProjectHighlights && projectHighlights.length > 0 && (
            <div>
              {variant === "full" && (
                <h3 className="mb-6 text-center text-xl font-semibold text-[var(--text-primary)]">
                  {lang === "zh" ? "项目亮点" : "Project Highlights"}
                </h3>
              )}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {projectHighlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6 text-center transition hover:border-[var(--accent-primary)]/30 hover:bg-[var(--surface-hover)]"
                  >
                    <div className="mb-4 flex items-center justify-center text-[var(--accent-primary)]">
                      {highlight.icon}
                    </div>
                    <h4 className="mb-2 text-lg font-semibold text-[var(--text-primary)]">
                      {highlight.title}
                    </h4>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {highlight.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

