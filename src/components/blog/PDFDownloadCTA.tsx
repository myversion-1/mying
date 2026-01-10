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
        className="inline-block rounded-lg bg-[var(--action-primary)] px-8 py-4 font-semibold text-[var(--action-primary-text)] !text-[var(--action-primary-text)] transition-colors hover:bg-[var(--action-primary-hover)] min-h-[44px] min-w-[44px] touch-manipulation"
      >
        {lang === "zh" ? "下载翻新标准PDF" : "Download Refurbishment Standards PDF"}
      </Link>
    </div>
  );
}

