"use client";

import { useState, Suspense } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { PageHero } from "../../components/PageHero";
import { Section } from "../../components/Section";
import { ServiceTimeline } from "../../components/ServiceTimeline";
import { getServices, copy } from "../../content/copy";
import { useLanguage } from "../../components/language";

// Code splitting: Lazy load ConsultationBooking (only needed when user clicks)
const ConsultationBooking = dynamic(() => import("../../components/ConsultationBooking").then((mod) => ({ default: mod.ConsultationBooking })), {
  loading: () => (
    <div className="rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[#0a1628] to-[#0c1014] p-6 dark:border-white/10 dark:bg-white/5">
      <div className="h-32 animate-pulse" />
    </div>
  ),
  ssr: false, // Consultation booking is interactive, doesn't need SSR
});

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
      <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-8">
        <div className="my-10">
          <PageHero
            headline={lang === "zh" ? "游乐设备安装服务 | 主题公园设备供应商服务" : "Amusement Ride Installation Services | Theme Park Equipment Supplier Services"}
            subhead={lang === "zh" ? "作为领先的游乐设备制造商和主题公园设备供应商，我们提供端到端的游乐设备安装服务，包括采购咨询、设备评估、翻新服务和组装服务。我们帮助您选择、采购和部署游乐设备，提供清晰的文档和时间表。" : "As a leading amusement rides manufacturer and theme park equipment supplier, we provide end-to-end amusement ride installation services including sourcing consultation, equipment appraisal, refurbishment services, and assembly services. We help you choose, acquire, and deploy rides with clear documentation and timelines."}
            ctaPrimaryHref="/contact"
            ctaSecondaryHref="/products"
            badge={c.pageBadges.serviceSuite}
          />
        </div>
      </div>

      <Section title={lang === "zh" ? "游乐设备安装服务目录" : "Amusement Ride Installation Services Catalog"}>
        <div className="grid gap-4 md:grid-cols-2">
          {services.map((service) => {
            const requiresConsultation = consultationServices.includes(service.title);
            return (
              <div
                key={service.title}
                className="rounded-2xl border border-white/10 bg-[var(--glass-bg)] backdrop-blur-md p-6 flex flex-col h-full transition-all duration-300 hover:border-[var(--accent-primary)]/30 hover:shadow-lg"
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
        title={lang === "zh" ? "主题公园设备供应商服务流程" : "Theme Park Equipment Supplier Service Process"}
        subtitle={lang === "zh" ? "从需求分析到售后支持，8个阶段一站式解决方案" : "From needs analysis to after-sales support, 8-phase one-stop solution"}
      >
        <ServiceTimeline lang={lang} />
      </Section>

      {/* Consultation Booking Modal - Lazy loaded */}
      {bookingService && (
        <Suspense
          fallback={
            <div className="rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[#0a1628] to-[#0c1014] p-6 dark:border-white/10 dark:bg-white/5">
              <div className="h-32 animate-pulse" />
            </div>
          }
        >
          <ConsultationBooking
            serviceName={bookingService}
            onClose={() => setBookingService(null)}
          />
        </Suspense>
      )}
    </div>
  );
}

