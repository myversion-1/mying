"use client";

import Link from "next/link";
import { copy } from "../content/copy";
import { useLanguage } from "./language";

// Social media links
const SOCIAL_LINKS = {
  tiktok: "https://www.tiktok.com/@miying_amusements",
  youtube: "https://www.youtube.com/@MiyingAmusementEquipment",
  whatsapp: "https://wa.me/8613112959561",
  email: "mailto:miyingyoule@gmail.com",
};

export function Footer() {
  const { lang } = useLanguage();
  const c = copy(lang);
  
  // Technical expert contact links (direct to technical team, not general customer service)
  const TECHNICAL_EXPERT_PHONE = "+86-131-1295-9561";
  const TECHNICAL_EXPERT_WHATSAPP = "https://wa.me/8613112959561?text=" + encodeURIComponent(
    lang === "zh" 
      ? "您好，我想咨询技术问题" 
      : "Hello, I'd like to consult about technical matters"
  );

  return (
    <>
      {/* Quick Contact Bar - Persistent at bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[var(--border)] bg-[var(--glass-bg)] backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-3 md:px-8">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-[var(--text-primary)]">
              {lang === "zh" ? "快速联系技术专家" : "Quick Contact Technical Expert"}
            </div>
            <div className="flex items-center gap-3">
              {/* WhatsApp Link */}
              <a
                href={TECHNICAL_EXPERT_WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-[var(--accent-primary)]/50 bg-[var(--accent-primary-light)] px-4 py-2 text-sm font-semibold text-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/20 transition min-h-[44px] touch-manipulation"
              >
                <svg
                  className="w-5 h-5 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                <span className="hidden sm:inline">WhatsApp</span>
              </a>

              {/* Mobile Direct Link */}
              <a
                href={`tel:${TECHNICAL_EXPERT_PHONE.replace(/-/g, "")}`}
                className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-2 text-sm font-semibold text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition min-h-[44px] touch-manipulation"
              >
                <svg
                  className="w-5 h-5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="hidden sm:inline">{TECHNICAL_EXPERT_PHONE}</span>
                <span className="sm:hidden">{lang === "zh" ? "电话" : "Call"}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-[var(--border)] bg-[var(--surface)] pb-28 md:pb-6 transition-colors">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 mb-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                  {c.footer.companyName}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {c.footer.tagline}
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-primary)]">
                {c.footer.quickLinks.title}
              </h4>
              <nav className="flex flex-col gap-3">
                <Link
                  href="/products"
                  className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors touch-manipulation"
                >
                  {c.footer.quickLinks.products}
                </Link>
                <Link
                  href="/services"
                  className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors touch-manipulation"
                >
                  {c.footer.quickLinks.services}
                </Link>
                <Link
                  href="/cases"
                  className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors touch-manipulation"
                >
                  {c.footer.quickLinks.cases}
                </Link>
                <Link
                  href="/about"
                  className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors touch-manipulation"
                >
                  {c.footer.quickLinks.about}
                </Link>
                <Link
                  href="/blog"
                  className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors touch-manipulation"
                >
                  {c.footer.quickLinks.blog}
                </Link>
                <Link
                  href="/resources"
                  className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors touch-manipulation"
                >
                  {c.footer.quickLinks.resources}
                </Link>
                <Link
                  href="/faq"
                  className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors touch-manipulation"
                >
                  {c.footer.quickLinks.faq}
                </Link>
              </nav>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-primary)]">
                {c.footer.contact.title}
              </h4>
              <div className="flex flex-col gap-3">
                <a
                  href={SOCIAL_LINKS.email}
                  className="flex items-start gap-3 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors touch-manipulation group"
                >
                  <svg
                    className="w-5 h-5 shrink-0 mt-0.5 text-[var(--text-tertiary)] group-hover:text-[var(--text-primary)] transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="break-all">{c.footer.contact.email}</span>
                </a>
                <a
                  href={`tel:${TECHNICAL_EXPERT_PHONE.replace(/-/g, "")}`}
                  className="flex items-start gap-3 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors touch-manipulation group"
                >
                  <svg
                    className="w-5 h-5 shrink-0 mt-0.5 text-[var(--text-tertiary)] group-hover:text-[var(--text-primary)] transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>{c.footer.contact.phone}</span>
                </a>
                <div className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                  <svg
                    className="w-5 h-5 shrink-0 mt-0.5 text-[var(--text-tertiary)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>{c.footer.contact.address}</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                  <svg
                    className="w-5 h-5 shrink-0 mt-0.5 text-[var(--text-tertiary)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{c.footer.contact.workingHours}</span>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-primary)]">
                {c.footer.socialMedia.title}
              </h4>
              <p className="text-sm text-[var(--text-secondary)]">
                {c.footer.socialMedia.followUs}
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={SOCIAL_LINKS.email}
                  className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-2.5 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--surface-hover)] hover:border-[var(--border-hover)] transition-colors min-h-[44px] touch-manipulation group"
                  aria-label={c.footer.socialMedia.email}
                >
                  <svg
                    className="w-5 h-5 shrink-0 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="hidden sm:inline">{c.footer.socialMedia.email}</span>
                </a>

                <a
                  href={SOCIAL_LINKS.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-2.5 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--surface-hover)] hover:border-[var(--border-hover)] transition-colors min-h-[44px] touch-manipulation group"
                  aria-label={c.footer.socialMedia.tiktok}
                >
                  <svg
                    className="w-5 h-5 shrink-0 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                  <span className="hidden sm:inline">{c.footer.socialMedia.tiktok}</span>
                </a>

                <a
                  href={SOCIAL_LINKS.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-2.5 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--surface-hover)] hover:border-[var(--border-hover)] transition-colors min-h-[44px] touch-manipulation group"
                  aria-label={c.footer.socialMedia.youtube}
                >
                  <svg
                    className="w-5 h-5 shrink-0 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  <span className="hidden sm:inline">{c.footer.socialMedia.youtube}</span>
                </a>

                <a
                  href={SOCIAL_LINKS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-[var(--accent-primary)]/50 bg-[var(--accent-primary-light)] px-4 py-2.5 text-sm font-semibold text-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/20 transition-colors min-h-[44px] touch-manipulation group"
                  aria-label={c.footer.socialMedia.whatsapp}
                >
                  <svg
                    className="w-5 h-5 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  <span className="hidden sm:inline">{c.footer.socialMedia.whatsapp}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Footer CTA Section */}
          <div className="border-t border-[var(--border)] pt-8 pb-6">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6 text-center">
              <h3 className="mb-2 text-lg font-semibold text-[var(--text-primary)]">
                {lang === "zh" ? "准备开始您的项目？" : "Ready to Start Your Project?"}
              </h3>
              <p className="mb-6 text-sm text-[var(--text-secondary)]">
                {lang === "zh" ? "获取定制报价或与技术团队讨论您的需求" : "Get a custom quote or discuss your needs with our technical team"}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/quote"
                  className="inline-flex items-center justify-center rounded-lg bg-[var(--action-primary)] px-8 py-4 text-base font-semibold text-[var(--action-primary-text)] !text-[var(--action-primary-text)] transition-colors hover:bg-[var(--action-primary-hover)] min-h-[44px] touch-manipulation"
                >
                  {c.cta.getCustomQuote || (lang === "zh" ? "获取定制报价" : "Get Custom Quote")}
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg border border-[var(--action-secondary-border)] bg-[var(--action-secondary)] px-8 py-4 text-base font-semibold text-[var(--action-secondary-text)] transition-colors hover:bg-[var(--action-secondary-hover-bg)] min-h-[44px] touch-manipulation"
                >
                  {c.cta.contactSales || (lang === "zh" ? "联系销售团队" : "Contact Sales Team")}
                </Link>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-[var(--border)] pt-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="text-sm text-[var(--text-tertiary)]">{c.footer.rights}</div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
