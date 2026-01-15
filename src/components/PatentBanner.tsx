"use client";

import type { Lang } from "./language";

interface PatentBannerProps {
  count: string;
  label: string;
  description: string;
  lang: Lang;
}

/**
 * Patent Statistics Banner Component
 * 
 * Displays patent count with minimal design
 * Separated from business logic for maintainability
 */
export function PatentBanner({ count, label, description, lang }: PatentBannerProps) {
  return (
    <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-8">
      <div className="flex items-center justify-center gap-6 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div className="text-center md:text-left">
            <div className="text-3xl font-bold text-[var(--accent-primary)]">{count}</div>
            <div className="text-base font-semibold text-[var(--text-primary)]">{label}</div>
          </div>
        </div>
        <div className="hidden h-12 w-px bg-[var(--border)] md:block" />
        <div className="hidden text-sm text-[var(--text-secondary)] md:block">
          {description}
        </div>
      </div>
    </div>
  );
}






