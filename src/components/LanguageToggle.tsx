"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage, type Lang } from "./language";

const languages: Lang[] = ["en", "es", "ru", "ar", "zh", "ja", "ko", "th", "vi", "id", "hi"];

const languageNames: Record<Lang, string> = {
  en: "English",
  es: "Español",
  ru: "Русский",
  ar: "العربية",
  zh: "中文",
  ja: "日本語",
  ko: "한국어",
  th: "ไทย",
  vi: "Tiếng Việt",
  id: "Bahasa Indonesia",
  hi: "हिन्दी",
};

const languageCodes: Record<Lang, string> = {
  en: "EN",
  es: "ES",
  ru: "RU",
  ar: "عربي",
  zh: "中文",
  ja: "日本語",
  ko: "한국어",
  th: "ไทย",
  vi: "VI",
  id: "ID",
  hi: "हिन्दी",
};

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] px-3 py-2 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-hover)] min-h-[44px] touch-manipulation"
        aria-label="Select language"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
        <span className="hidden sm:inline">{languageCodes[lang]}</span>
        <span className="sm:hidden">{languageCodes[lang]}</span>
        <svg
          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-[var(--border)] bg-[var(--glass-bg)] backdrop-blur-md shadow-lg p-2 z-50 max-h-[400px] overflow-y-auto">
          {languages.map((l) => (
            <button
              key={l}
              onClick={() => {
                setLang(l);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition min-h-[44px] touch-manipulation ${
                lang === l
                  ? "bg-[var(--action-primary)]/10 text-[var(--action-primary)] font-semibold"
                  : "text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
              }`}
              aria-label={`Switch to ${languageNames[l]}`}
            >
              <span className="font-medium">{languageCodes[l]}</span>
              <span className="text-xs text-[var(--text-tertiary)]">{languageNames[l]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

