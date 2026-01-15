"use client";

import { useState } from "react";
import type { Lang } from "./language";
import {
  Search,
  Layout,
  Settings,
  FileCheck,
  Factory,
  CheckCircle2,
  Truck,
  Wrench,
  Headphones,
} from "lucide-react";

type Phase = {
  number: number;
  title: { en: string; zh: string };
  duration: { en: string; zh: string };
  deliverables: { en: string[]; zh: string[] };
  icon: React.ReactNode;
  description: { en: string; zh: string };
};

const phases: Phase[] = [
  {
    number: 1,
    title: { en: "Needs Analysis", zh: "需求分析" },
    duration: { en: "1-2 weeks", zh: "1-2 周" },
    deliverables: {
      en: ["Requirements Document", "Initial Proposal"],
      zh: ["需求文档", "初步方案"],
    },
    icon: <Search className="h-6 w-6" />,
    description: {
      en: "Deep understanding of your venue needs, budget, and target market. Professional equipment selection advice and layout design solutions.",
      zh: "深入了解您的场地需求、预算和目标市场，提供专业的设备选择建议和布局设计方案。",
    },
  },
  {
    number: 2,
    title: { en: "Solution Design", zh: "方案设计" },
    duration: { en: "2-3 weeks", zh: "2-3 周" },
    deliverables: {
      en: ["3D Design Drawings", "Technical Specifications", "Quote"],
      zh: ["3D 设计图", "技术规格书", "报价单"],
    },
    icon: <Layout className="h-6 w-6" />,
    description: {
      en: "Select the most suitable product combinations based on venue characteristics and target customers. Provide professional layout design solutions.",
      zh: "根据场地特点和目标客户，选择最适合的产品组合，并提供专业的布局设计方案，最大化空间利用率和客户体验。",
    },
  },
  {
    number: 3,
    title: { en: "Contract Signing", zh: "合同签署" },
    duration: { en: "1 week", zh: "1 周" },
    deliverables: {
      en: ["Formal Contract", "Payment Plan"],
      zh: ["正式合同", "付款计划"],
    },
    icon: <FileCheck className="h-6 w-6" />,
    description: {
      en: "Finalize contract terms, payment schedule, and project timeline. Ensure all requirements are clearly documented.",
      zh: "确定合同条款、付款计划和项目时间表，确保所有要求都清晰记录。",
    },
  },
  {
    number: 4,
    title: { en: "Manufacturing", zh: "生产制造" },
    duration: { en: "8-12 weeks", zh: "8-12 周" },
    deliverables: {
      en: ["Production Progress Reports", "Quality Inspection Reports"],
      zh: ["生产进度报告", "质量检测报告"],
    },
    icon: <Factory className="h-6 w-6" />,
    description: {
      en: "Customized manufacturing based on your specific needs, including themed design, size adjustments, and functional customization.",
      zh: "根据您的具体需求进行定制化生产，包括主题设计、尺寸调整、功能定制等，确保产品完美匹配您的场地和品牌。",
    },
  },
  {
    number: 5,
    title: { en: "Factory Testing", zh: "出厂测试" },
    duration: { en: "1-2 weeks", zh: "1-2 周" },
    deliverables: {
      en: ["Test Videos", "Acceptance Report"],
      zh: ["测试视频", "验收报告"],
    },
    icon: <CheckCircle2 className="h-6 w-6" />,
    description: {
      en: "Comprehensive load tests and safety inspections before delivery. All equipment must pass strict quality standards.",
      zh: "交付前进行全面负载测试和安全检测，所有设备必须通过严格的质量标准。",
    },
  },
  {
    number: 6,
    title: { en: "Shipping & Delivery", zh: "运输交付" },
    duration: { en: "4-8 weeks", zh: "4-8 周" },
    deliverables: {
      en: ["Logistics Tracking", "Arrival Notification"],
      zh: ["物流跟踪", "到货通知"],
    },
    icon: <Truck className="h-6 w-6" />,
    description: {
      en: "Professional export packaging and global logistics services ensure safe transportation to destination. Full tracking and insurance services.",
      zh: "专业的出口包装和全球物流服务，确保设备安全运输到目的地。我们与可靠的物流合作伙伴合作，提供全程跟踪和保险服务。",
    },
  },
  {
    number: 7,
    title: { en: "Installation & Training", zh: "安装调试" },
    duration: { en: "2-4 weeks", zh: "2-4 周" },
    deliverables: {
      en: ["Installation Completion Report", "Operation Training"],
      zh: ["安装完成报告", "操作培训"],
    },
    icon: <Wrench className="h-6 w-6" />,
    description: {
      en: "On-site installation by experienced engineers ensures safe and reliable operation. Operator training helps your team quickly master equipment operation and maintenance knowledge.",
      zh: "由经验丰富的工程师进行现场安装，确保设备安全可靠运行。同时提供操作培训，帮助您的团队快速掌握设备操作和维护知识。",
    },
  },
  {
    number: 8,
    title: { en: "After-Sales Support", zh: "售后服务" },
    duration: { en: "Ongoing", zh: "持续" },
    deliverables: {
      en: ["Maintenance Plan", "Technical Support"],
      zh: ["维护计划", "技术支持"],
    },
    icon: <Headphones className="h-6 w-6" />,
    description: {
      en: "Comprehensive after-sales support including spare parts supply, remote technical support, and regular maintenance checks to ensure long-term stable operation and maximize ROI.",
      zh: "提供全面的售后服务，包括备件供应、远程技术支持、定期维护检查等，确保设备长期稳定运行，最大化投资回报。",
    },
  },
];

interface ServiceTimelineProps {
  lang: Lang;
  className?: string;
}

/**
 * ServiceTimeline Component - B2B Optimized
 * 
 * Interactive timeline visualization of the 8-phase service process.
 * Features:
 * - Horizontal timeline on desktop, vertical on mobile
 * - Expandable phase details
 * - Clear deliverables and duration for each phase
 * - Professional B2B design
 */
export function ServiceTimeline({ lang, className = "" }: ServiceTimelineProps) {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null);
  const isZh = lang === "zh";

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Desktop: Horizontal Timeline */}
      <div className="hidden lg:block">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 right-0 top-12 h-0.5 bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-primary)]/50 to-[var(--accent-primary)]" />
          
          {/* Phases */}
          <div className="relative grid grid-cols-8 gap-4">
            {phases.map((phase, index) => {
              const isExpanded = expandedPhase === phase.number;
              const isActive = expandedPhase === null || isExpanded;
              
              return (
                <div
                  key={phase.number}
                  className="relative"
                >
                  {/* Phase Node */}
                  <button
                    onClick={() => setExpandedPhase(isExpanded ? null : phase.number)}
                    className="group relative mx-auto flex h-24 w-24 flex-col items-center justify-center rounded-full border-2 border-[var(--border)] bg-[var(--surface-elevated)] transition-all hover:border-[var(--accent-primary)] hover:bg-[var(--surface-hover)] hover:shadow-lg"
                  >
                    <div className={`mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent-primary-light)] text-[var(--accent-primary)] transition-colors group-hover:bg-[var(--accent-primary)]/20 ${isExpanded ? "bg-[var(--accent-primary)]/20" : ""}`}>
                      {phase.icon}
                    </div>
                    <div className="text-xs font-semibold text-[var(--text-primary)]">
                      {phase.number}
                    </div>
                  </button>
                  
                  {/* Phase Info Card */}
                  {isExpanded && (
                    <div className="absolute top-32 left-1/2 z-10 w-80 -translate-x-1/2 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6 shadow-lg">
                      <h3 className="mb-2 text-lg font-semibold text-[var(--text-primary)]">
                        {phase.title[isZh ? "zh" : "en"]}
                      </h3>
                      <p className="mb-4 text-sm text-[var(--text-secondary)]">
                        {phase.description[isZh ? "zh" : "en"]}
                      </p>
                      <div className="mb-3 space-y-2">
                        <div className="text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
                          {isZh ? "交付周期" : "Duration"}
                        </div>
                        <div className="text-sm font-medium text-[var(--accent-primary)]">
                          {phase.duration[isZh ? "zh" : "en"]}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
                          {isZh ? "交付物" : "Deliverables"}
                        </div>
                        <ul className="space-y-1">
                          {phase.deliverables[isZh ? "zh" : "en"].map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-primary)]" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile/Tablet: Vertical Timeline */}
      <div className="lg:hidden">
        <div className="relative space-y-6">
          {phases.map((phase, index) => {
            const isExpanded = expandedPhase === phase.number;
            
            return (
              <div
                key={phase.number}
                className="relative flex gap-4"
              >
                {/* Timeline Line */}
                {index < phases.length - 1 && (
                  <div className="absolute left-6 top-16 h-full w-0.5 bg-[var(--border)]" />
                )}
                
                {/* Phase Node */}
                <button
                  onClick={() => setExpandedPhase(isExpanded ? null : phase.number)}
                  className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-[var(--border)] bg-[var(--surface-elevated)] transition-all hover:border-[var(--accent-primary)] hover:bg-[var(--surface-hover)]"
                >
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent-primary-light)] text-[var(--accent-primary)] transition-colors ${isExpanded ? "bg-[var(--accent-primary)]/20" : ""}`}>
                    {phase.icon}
                  </div>
                </button>
                
                {/* Phase Content */}
                <div className="flex-1">
                  <div
                    className={`rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-4 transition-all ${
                      isExpanded ? "border-[var(--accent-primary)]/30 shadow-lg" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-[var(--accent-primary)]">
                          {isZh ? "阶段" : "Phase"} {phase.number}
                        </div>
                        <h3 className="mb-2 text-lg font-semibold text-[var(--text-primary)]">
                          {phase.title[isZh ? "zh" : "en"]}
                        </h3>
                        <div className="mb-2 text-sm font-medium text-[var(--accent-primary)]">
                          {phase.duration[isZh ? "zh" : "en"]}
                        </div>
                      </div>
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
                    
                    {isExpanded && (
                      <div className="mt-4 space-y-4 border-t border-[var(--border)] pt-4">
                        <p className="text-sm text-[var(--text-secondary)]">
                          {phase.description[isZh ? "zh" : "en"]}
                        </p>
                        <div>
                          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
                            {isZh ? "交付物" : "Deliverables"}
                          </div>
                          <ul className="space-y-1">
                            {phase.deliverables[isZh ? "zh" : "en"].map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-primary)]" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

