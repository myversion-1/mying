"use client";
import Link from "next/link";
import { useLanguage } from "../language";

export function PDFDownloadCTA() {
  const { lang } = useLanguage();

  return (
    <div className="pdf-download-cta my-12 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-8 text-center">
      <h3 className="mb-4 font-serif text-2xl font-semibold text-[var(--text-primary)]">
        {lang === "zh" ? "下载技术白皮书" : "Download Technical White Paper"}
      </h3>
      <p className="mb-6 text-[var(--text-secondary)]">
        {lang === "zh"
          ? "获取我们的翻新标准PDF，了解专业翻新流程的详细技术规范。"
          : "Download our Refurbishment Standards PDF to access detailed technical specifications for professional refurbishment processes."}
      </p>
      <Link
        href="/contact"
        className="inline-block rounded-xl bg-gradient-to-r from-[var(--action-primary)] to-[var(--accent-primary)] px-6 py-4 sm:px-10 sm:py-4 text-base sm:text-lg font-semibold shadow-lg shadow-[var(--action-primary)]/30 hover:shadow-2xl hover:shadow-[var(--action-primary)]/50 transition-all duration-200 hover:-translate-y-1 hover:brightness-110 active:scale-95 min-h-[44px] min-w-[44px] touch-manipulation text-[var(--action-primary-text)] border border-[var(--action-primary)]/20"
      >
        {lang === "zh" ? "下载翻新标准PDF" : "Download Refurbishment Standards PDF"}
      </Link>
    </div>
  );
}

