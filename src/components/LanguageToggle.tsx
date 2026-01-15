"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useLanguage, type Lang } from "./language";
import { useRouter } from "next/navigation";

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
  const { lang, setLang, isReady } = useLanguage();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Mount check for portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate dropdown position
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 });

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 8, // 8px gap (mt-2)
        right: window.innerWidth - rect.right + window.scrollX,
      });
    }
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        buttonRef.current &&
        dropdownRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Handle language change with smooth transition
  const handleLanguageChange = (newLang: Lang) => {
    if (newLang === lang || isChanging) return;

    setIsChanging(true);
    setIsOpen(false);

    // Update language state
    setLang(newLang);

    // Force a re-render by refreshing the page content
    // Use a small delay to ensure state is updated
    setTimeout(() => {
      // Trigger a soft refresh to update all content
      router.refresh();
      setIsChanging(false);
    }, 100);
  };

  // Show loading state if language is not ready
  if (!isReady) {
    return (
      <div className="flex h-[44px] min-w-[80px] items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]">
        <div className="h-4 w-12 animate-pulse rounded bg-[var(--text-tertiary)]/20" />
      </div>
    );
  }

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        disabled={isChanging}
        className={`flex items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] px-3 py-2 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-hover)] min-h-[44px] min-w-[80px] touch-manipulation ${
          isChanging ? "opacity-50 cursor-wait" : ""
        }`}
        aria-label="Select language"
        aria-busy={isChanging}
      >
        <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
        <span className="min-w-[2ch] text-center">{languageCodes[lang]}</span>
        {isChanging ? (
          <svg className="h-4 w-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        ) : (
          <svg
            className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </button>

      {mounted && isOpen && !isChanging && typeof window !== "undefined" && createPortal(
        <div
          ref={dropdownRef}
          className="fixed w-48 rounded-xl border border-[var(--border)] bg-[var(--glass-bg)] backdrop-blur-md shadow-lg p-2 z-[9999] max-h-[400px] overflow-y-auto"
          style={{
            top: `${dropdownPosition.top}px`,
            right: `${dropdownPosition.right}px`,
          }}
        >
          {languages.map((l) => (
            <button
              key={l}
              onClick={() => handleLanguageChange(l)}
              disabled={isChanging}
              className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition min-h-[44px] touch-manipulation ${
                lang === l
                  ? "bg-[var(--action-primary)]/10 text-[var(--action-primary)] font-semibold"
                  : "text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
              } ${isChanging ? "opacity-50 cursor-wait" : ""}`}
              aria-label={`Switch to ${languageNames[l]}`}
            >
              <span className="font-medium">{languageCodes[l]}</span>
              <span className="text-xs text-[var(--text-tertiary)]">{languageNames[l]}</span>
            </button>
          ))}
        </div>,
        document.body
      )}
    </>
  );
}

