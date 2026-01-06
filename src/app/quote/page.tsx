"use client";

import { Suspense } from "react";
import { PageHero } from "../../components/PageHero";
import { Section } from "../../components/Section";
import { QuoteForm } from "../../components/QuoteForm";
import { copy } from "../../content/copy";
import { useLanguage } from "../../components/language";

export default function QuotePage() {
  const { lang } = useLanguage();
  const c = copy(lang);

  return (
    <div className="space-y-12">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="my-10">
          <PageHero
            headline={lang === "zh" ? "请求报价" : "Request a Quote"}
            subhead={
              lang === "zh"
                ? "填写以下表单，我们将在24小时内为您提供详细的报价和项目建议。"
                : "Fill out the form below and we'll provide you with a detailed quote and project recommendations within 24 hours."
            }
            ctaPrimaryHref="/contact"
            ctaSecondaryHref="/products"
            badge={lang === "zh" ? "快速报价" : "Quick Quote"}
          />
        </div>
      </div>

      <Section
        title={lang === "zh" ? "获取报价" : "Get a Quote"}
        subtitle={
          lang === "zh"
            ? "请提供以下信息，以便我们为您准备准确的报价。"
            : "Please provide the following information so we can prepare an accurate quote for you."
        }
      >
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <Suspense
            fallback={
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                {lang === "zh" ? "加载表单中..." : "Loading form..."}
              </div>
            }
          >
            <QuoteForm />
          </Suspense>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-4">
            <h3 className="text-lg font-semibold text-white">
              {lang === "zh" ? "报价包含内容" : "What's Included in Your Quote"}
            </h3>
            <ul className="list-disc space-y-2 pl-5 text-white/70">
              {[
                lang === "zh"
                  ? "详细的产品规格和配置"
                  : "Detailed product specifications and configuration",
                lang === "zh"
                  ? "基于数量的定价信息"
                  : "Quantity-based pricing information",
                lang === "zh"
                  ? "运输和交付时间表"
                  : "Shipping and delivery timeline",
                lang === "zh"
                  ? "安装和售后服务选项"
                  : "Installation and after-sales service options",
                lang === "zh"
                  ? "定制化建议和替代方案"
                  : "Customization suggestions and alternatives",
              ].map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <div className="rounded-xl border border-[#7df6ff]/20 bg-[#7df6ff]/5 p-4 text-sm text-white/80">
              <p className="font-semibold text-[#7df6ff] mb-2">
                {lang === "zh" ? "💬 需要即时回复？" : "💬 Need immediate response?"}
              </p>
              <p>
                {lang === "zh"
                  ? "通过 WhatsApp 联系我们，24小时内回复。"
                  : "Contact us via WhatsApp for a response within 24 hours."}
              </p>
              <a
                href="https://wa.me/8613112959561"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-[#7df6ff] hover:text-[#00eaff] font-semibold"
              >
                {lang === "zh" ? "打开 WhatsApp →" : "Open WhatsApp →"}
              </a>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}









