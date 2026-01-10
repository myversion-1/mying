"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "../../components/language";
import { LeadMagnetForm } from "../../components/LeadMagnetForm";

type ResourceCategory = "maintenance" | "technical" | "downloads";

type Resource = {
  id: string;
  title: { en: string; zh: string };
  category: ResourceCategory;
  description: { en: string; zh: string };
  type: { en: string; zh: string };
  requiresForm?: boolean;
  downloadUrl?: string;
};

export default function ResourcesPage() {
  const { lang } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory | "all">("all");
  const [selectedResource, setSelectedResource] = useState<string | null>(null);

  const categories: { id: ResourceCategory | "all"; label: { en: string; zh: string } }[] = [
    { id: "all", label: { en: "All Resources", zh: "所有资源" } },
    { id: "maintenance", label: { en: "Maintenance Library", zh: "维护库" } },
    { id: "technical", label: { en: "Technical Support", zh: "技术支持" } },
    { id: "downloads", label: { en: "Download Center", zh: "下载中心" } },
  ];

  const maintenanceResources: Resource[] = [
    {
      id: "daily-inspection",
      title: { en: "Daily Inspection Checklist", zh: "日常检查清单" },
      category: "maintenance" as const,
      description: {
        en: "A comprehensive checklist for daily ride inspections to ensure safety and optimal performance.",
        zh: "全面的日常设备检查清单，确保安全性和最佳性能。",
      },
      type: { en: "PDF Guide", zh: "PDF 指南" },
    },
    {
      id: "weekly-maintenance",
      title: { en: "Weekly Maintenance Procedures", zh: "每周维护程序" },
      category: "maintenance" as const,
      description: {
        en: "Step-by-step guide for weekly maintenance tasks including lubrication and component checks.",
        zh: "每周维护任务的分步指南，包括润滑和组件检查。",
      },
      type: { en: "PDF Guide", zh: "PDF 指南" },
    },
    {
      id: "troubleshooting",
      title: { en: "Common Issues & Troubleshooting", zh: "常见问题与故障排除" },
      category: "maintenance" as const,
      description: {
        en: "Solutions to common ride issues and troubleshooting procedures.",
        zh: "常见设备问题的解决方案和故障排除程序。",
      },
      type: { en: "PDF Guide", zh: "PDF 指南" },
    },
  ];

  const technicalResources: Resource[] = [
    {
      id: "support-process",
      title: { en: "Technical Support Process", zh: "技术支持流程" },
      category: "technical" as const,
      description: {
        en: "Learn how to request technical support and what information to provide for faster resolution.",
        zh: "了解如何申请技术支持以及需要提供哪些信息以加快解决速度。",
      },
      type: { en: "Information", zh: "信息" },
    },
    {
      id: "remote-support",
      title: { en: "Remote Support Services", zh: "远程支持服务" },
      category: "technical" as const,
      description: {
        en: "Our remote support services can help diagnose and resolve issues without on-site visits.",
        zh: "我们的远程支持服务可以帮助诊断和解决问题，无需现场访问。",
      },
      type: { en: "Information", zh: "信息" },
    },
    {
      id: "spare-parts",
      title: { en: "Spare Parts Ordering", zh: "备件订购" },
      category: "technical" as const,
      description: {
        en: "How to order spare parts and check availability. Fast shipping worldwide.",
        zh: "如何订购备件和检查可用性。全球快速发货。",
      },
      type: { en: "Information", zh: "信息" },
    },
  ];

  const downloadResources: Resource[] = [
    {
      id: "product-catalog",
      title: { en: "Product Catalog 2025", zh: "产品目录 2025" },
      category: "downloads" as const,
      description: {
        en: "Complete product catalog with specifications, dimensions, and technical details.",
        zh: "完整的产品目录，包含规格、尺寸和技术细节。",
      },
      type: { en: "PDF Catalog", zh: "PDF 目录" },
      requiresForm: true,
      downloadUrl: "/resources/product-catalog-2025.pdf",
    },
    {
      id: "installation-guide",
      title: { en: "Installation Guide", zh: "安装指南" },
      category: "downloads" as const,
      description: {
        en: "Comprehensive installation guide with step-by-step instructions and safety requirements.",
        zh: "全面的安装指南，包含分步说明和安全要求。",
      },
      type: { en: "PDF Guide", zh: "PDF 指南" },
      requiresForm: true,
      downloadUrl: "/resources/installation-guide.pdf",
    },
    {
      id: "safety-manual",
      title: { en: "Safety Manual", zh: "安全手册" },
      category: "downloads" as const,
      description: {
        en: "Safety guidelines and compliance information for all our rides.",
        zh: "所有设备的安全指南和合规信息。",
      },
      type: { en: "PDF Manual", zh: "PDF 手册" },
      requiresForm: true,
      downloadUrl: "/resources/safety-manual.pdf",
    },
    {
      id: "technical-whitepaper",
      title: { en: "Technical Whitepaper", zh: "技术白皮书" },
      category: "downloads" as const,
      description: {
        en: "In-depth technical analysis and industry best practices for amusement equipment.",
        zh: "深入的游乐设备技术分析和行业最佳实践。",
      },
      type: { en: "PDF Whitepaper", zh: "PDF 白皮书" },
      requiresForm: true,
      downloadUrl: "/resources/technical-whitepaper.pdf",
    },
    {
      id: "industry-solution",
      title: { en: "Industry Solution Guide", zh: "行业解决方案指南" },
      category: "downloads" as const,
      description: {
        en: "Comprehensive guide for selecting and implementing amusement equipment solutions.",
        zh: "选择和实施游乐设备解决方案的综合指南。",
      },
      type: { en: "PDF Guide", zh: "PDF 指南" },
      requiresForm: true,
      downloadUrl: "/resources/industry-solution-guide.pdf",
    },
  ];

  const allResources = [...maintenanceResources, ...technicalResources, ...downloadResources];

  const filteredResources = selectedCategory === "all"
    ? allResources
    : allResources.filter((r) => r.category === selectedCategory);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-16">
      {/* Page Header */}
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-4xl font-bold text-[var(--text-primary)] md:text-5xl">
          {lang === "zh" ? "资源中心" : "Resource Center"}
        </h1>
        <p className="text-lg text-[var(--text-secondary)]">
          {lang === "zh" 
            ? "访问维护库、技术支持和下载中心，获取您需要的所有资源" 
            : "Access maintenance library, technical support, and download center for all the resources you need"}
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-8 flex flex-wrap gap-3 justify-center">
        {categories.map((category) => {
          // Category labels only support en and zh, default to en for other languages
          const supportedLang: "en" | "zh" = (lang === "en" || lang === "zh") ? lang : "en";
          const label = category.label[supportedLang] || category.label.en;
          const isActive = selectedCategory === category.id;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`rounded-lg border px-6 py-2 text-sm font-semibold transition min-h-[44px] touch-manipulation ${
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

      {/* Resources Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
        {filteredResources.length === 0 ? (
          <div className="col-span-full rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-12 text-center">
            <p className="text-[var(--text-secondary)]">
              {lang === "zh" 
                ? "暂无资源" 
                : "No resources available at the moment."}
            </p>
          </div>
        ) : (
          filteredResources.map((resource) => {
            // Resource labels only support en and zh, default to en for other languages
            const supportedLang: "en" | "zh" = (lang === "en" || lang === "zh") ? lang : "en";
            const title = resource.title[supportedLang] || resource.title.en;
            const description = resource.description[supportedLang] || resource.description.en;
            const type = resource.type[supportedLang] || resource.type.en;
            return (
              <div
                key={resource.id}
                className="group rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6 transition hover:border-[var(--accent-primary)]/30 hover:bg-[var(--surface-hover)]"
              >
                <div className="mb-4">
                  <span className="inline-flex items-center rounded-full bg-[var(--surface-elevated)] px-3 py-1 text-xs font-semibold text-[var(--text-primary)] border border-[var(--accent-primary)]/30">
                    {type}
                  </span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition">
                  {title}
                </h3>
                <p className="mb-4 text-[var(--text-secondary)] leading-relaxed">
                  {description}
                </p>
                {resource.requiresForm ? (
                  <button
                    onClick={() => setSelectedResource(resource.id)}
                    className="w-full rounded-lg bg-[var(--action-primary)] px-4 py-2.5 text-sm font-semibold text-[var(--action-primary-text)] !text-[var(--action-primary-text)] transition-colors hover:bg-[var(--action-primary-hover)] min-h-[44px] touch-manipulation"
                  >
                    {lang === "zh" ? "获取下载链接" : "Get Download Link"}
                  </button>
                ) : (
                  <button className="text-sm font-semibold text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition flex items-center gap-2 min-h-[32px] touch-manipulation group">
                    <span>{lang === "zh" ? "查看详情" : "View Details"}</span>
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Lead Magnet Form Modal */}
      {selectedResource && (() => {
        const resource = allResources.find((r) => r.id === selectedResource) as Resource | undefined;
        if (!resource || !resource.requiresForm) return null;
        
        const supportedLang: "en" | "zh" = (lang === "en" || lang === "zh") ? lang : "en";
        const title = resource.title[supportedLang] || resource.title.en;
        const description = resource.description[supportedLang] || resource.description.en;
        
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <div className="relative max-w-lg w-full">
              <button
                onClick={() => setSelectedResource(null)}
                className="absolute -top-4 -right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-colors min-h-[44px] min-w-[44px] touch-manipulation"
                aria-label={lang === "zh" ? "关闭" : "Close"}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <LeadMagnetForm
                asset={{
                  id: resource.id,
                  title,
                  description,
                  downloadUrl: resource.downloadUrl || "/resources/default.pdf",
                  fileType: "PDF",
                }}
                onClose={() => setSelectedResource(null)}
              />
            </div>
          </div>
        );
      })()}

      {/* Contact CTA */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-8 text-center">
        <h2 className="mb-2 text-2xl font-bold text-[var(--text-primary)]">
          {lang === "zh" ? "需要更多帮助？" : "Need More Help?"}
        </h2>
        <p className="mb-6 text-[var(--text-secondary)]">
          {lang === "zh" 
            ? "联系我们的技术支持团队获取专业协助" 
            : "Contact our technical support team for professional assistance"}
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-lg bg-[var(--action-primary)] px-6 py-3 font-semibold text-[var(--action-primary-text)] !text-[var(--action-primary-text)] transition-colors hover:bg-[var(--action-primary-hover)] min-h-[44px] touch-manipulation"
        >
          <span>{lang === "zh" ? "联系技术支持" : "Contact Technical Support"}</span>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}



