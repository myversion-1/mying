"use client";

import { useState } from "react";
import Link from "next/link";
import { PageHero } from "../../components/PageHero";
import { Section } from "../../components/Section";
import { getServices, copy } from "../../content/copy";
import { useLanguage } from "../../components/language";
import { ConsultationBooking } from "../../components/ConsultationBooking";

export default function ServicesPage() {
  const { lang } = useLanguage();
  const c = copy(lang);
  const services = getServices(lang);
  const [bookingService, setBookingService] = useState<string | null>(null);

  // Services that require technical consultation booking
  const consultationServices = [
    lang === "zh" ? "评估服务" : "Appraisal",
    lang === "zh" ? "翻新服务" : "Refurbishment",
  ];
  return (
    <div className="space-y-12">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="my-10">
          <PageHero
            headline="End-to-end ride support: sourcing, appraisal, refurbishment, assembly."
            subhead="Modeled after industry leaders, we help you choose, acquire, and deploy rides with clear documentation and timelines."
            ctaPrimaryHref="/contact"
            ctaSecondaryHref="/products"
            badge={c.pageBadges.serviceSuite}
          />
        </div>
      </div>

      <Section title="Service catalog">
        <div className="grid gap-4 md:grid-cols-2">
          {services.map((service) => {
            const requiresConsultation = consultationServices.includes(service.title);
            return (
              <div
                key={service.title}
                className="rounded-2xl border border-white/5 bg-white/5 p-5 flex flex-col"
              >
                <div className="flex-1">
                  <div className="text-xs uppercase tracking-[0.14em] text-[var(--dark-bg-text-tertiary)]">
                    {service.title}
                  </div>
                  <p className="mt-2 text-white/80">{service.desc}</p>
                </div>
                {/* All services get a CTA - either consultation booking or contact form */}
                {requiresConsultation ? (
                  <button
                    onClick={() => setBookingService(service.title)}
                    className="mt-4 w-full rounded-lg bg-[var(--action-primary)] px-4 py-2.5 text-sm font-semibold text-[var(--action-primary-text)] !text-[var(--action-primary-text)] transition-colors hover:bg-[var(--action-primary-hover)] min-h-[44px] touch-manipulation"
                  >
                    {c.cta.scheduleConsultation || (lang === "zh" ? "预约技术咨询" : "Schedule Technical Consultation")}
                  </button>
                ) : (
                  <Link
                    href={`/contact?service=${encodeURIComponent(service.title)}`}
                    className="mt-4 w-full rounded-lg bg-[var(--action-primary)] px-4 py-2.5 text-sm font-semibold text-[var(--action-primary-text)] !text-[var(--action-primary-text)] transition-colors hover:bg-[var(--action-primary-hover)] min-h-[44px] touch-manipulation text-center"
                  >
                    {c.cta.getTechnicalConsultation || (lang === "zh" ? "获取服务咨询" : "Get Service Consultation")}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </Section>

      <Section
        title={lang === "zh" ? "服务流程" : "Service Process"}
        subtitle={lang === "zh" ? "从市场调研到售后支持，一站式解决方案" : "From market research to after-sales support, one-stop solutions"}
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              step: "01",
              title: lang === "zh" ? "市场调研与咨询" : "Market Research & Consultation",
              desc: lang === "zh" ? "深入了解您的场地需求、预算和目标市场，提供专业的设备选择建议和布局设计方案。" : "Deep understanding of your venue needs, budget, and target market. Professional equipment selection advice and layout design solutions.",
              icon: (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              ),
            },
            {
              step: "02",
              title: lang === "zh" ? "产品选择与布局设计" : "Product Selection & Layout Design",
              desc: lang === "zh" ? "根据场地特点和目标客户，选择最适合的产品组合，并提供专业的布局设计方案，最大化空间利用率和客户体验。" : "Select the most suitable product combinations based on venue characteristics and target customers. Provide professional layout design solutions to maximize space utilization and customer experience.",
              icon: (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              ),
            },
            {
              step: "03",
              title: lang === "zh" ? "定制制造" : "Custom Manufacturing",
              desc: lang === "zh" ? "根据您的具体需求进行定制化生产，包括主题设计、尺寸调整、功能定制等，确保产品完美匹配您的场地和品牌。" : "Customized manufacturing based on your specific needs, including themed design, size adjustments, and functional customization, ensuring products perfectly match your venue and brand.",
              icon: (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ),
            },
            {
              step: "04",
              title: lang === "zh" ? "安装与培训" : "Installation & Training",
              desc: lang === "zh" ? "由经验丰富的工程师进行现场安装，确保设备安全可靠运行。同时提供操作培训，帮助您的团队快速掌握设备操作和维护知识。" : "On-site installation by experienced engineers ensures safe and reliable operation. Operator training helps your team quickly master equipment operation and maintenance knowledge.",
              icon: (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              ),
            },
            {
              step: "05",
              title: lang === "zh" ? "运输与物流" : "Shipping & Logistics",
              desc: lang === "zh" ? "专业的出口包装和全球物流服务，确保设备安全运输到目的地。我们与可靠的物流合作伙伴合作，提供全程跟踪和保险服务。" : "Professional export packaging and global logistics services ensure safe transportation to destination. We work with reliable logistics partners to provide full tracking and insurance services.",
              icon: (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              ),
            },
            {
              step: "06",
              title: lang === "zh" ? "售后服务" : "After-Sales Support",
              desc: lang === "zh" ? "提供全面的售后服务，包括备件供应、远程技术支持、定期维护检查等，确保设备长期稳定运行，最大化投资回报。" : "Comprehensive after-sales support including spare parts supply, remote technical support, and regular maintenance checks to ensure long-term stable operation and maximize ROI.",
              icon: (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ),
            },
          ].map((step) => (
            <div
              key={step.step}
              className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6 transition hover:border-[var(--accent-primary)]/30 hover:bg-[var(--surface-hover)]"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--surface-elevated)] text-[var(--text-primary)] border border-[var(--accent-primary)]/30">
                  {step.icon}
                </div>
                <div className="flex-1">
                  <div className="mb-1 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--accent-primary)]">
                    {step.step}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-[var(--text-primary)]">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Consultation Booking Modal */}
      {bookingService && (
        <ConsultationBooking
          serviceName={bookingService}
          onClose={() => setBookingService(null)}
        />
      )}
    </div>
  );
}

