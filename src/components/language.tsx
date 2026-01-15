"use client";

import { createContext, useContext, useState, useEffect } from "react";

export type Lang = "en" | "es" | "ru" | "ar" | "zh" | "ja" | "ko" | "th" | "vi" | "id" | "hi";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  isReady: boolean; // Indicates if language state is initialized
};

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

const STORAGE_KEY = "miying-language-preference";
const DEFAULT_LANG: Lang = "en";

// Get initial language from localStorage or browser preference
function getInitialLanguage(): Lang {
  if (typeof window === "undefined") {
    return DEFAULT_LANG;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && isValidLang(stored)) {
      return stored as Lang;
    }
  } catch (error) {
    // localStorage might not be available
    console.warn("Failed to read language from localStorage:", error);
  }

  // Try to detect from browser language
  if (typeof navigator !== "undefined" && navigator.language) {
    const browserLang = navigator.language.split("-")[0];
    if (isValidLang(browserLang)) {
      return browserLang as Lang;
    }
  }

  return DEFAULT_LANG;
}

function isValidLang(lang: string): lang is Lang {
  return ["en", "es", "ru", "ar", "zh", "ja", "ko", "th", "vi", "id", "hi"].includes(lang);
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);
  const [isReady, setIsReady] = useState(false);

  // Initialize language on mount
  useEffect(() => {
    const initialLang = getInitialLanguage();
    setLangState(initialLang);
    setIsReady(true);
  }, []);

  // Persist language changes to localStorage
  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
    } catch (error) {
      console.warn("Failed to save language to localStorage:", error);
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, isReady }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}

