// Centralized locale exports
import type { Lang } from "../../components/language";
import type { CopyContent } from "../types";

// Import available locale files
import { en } from "./en";
import { zh } from "./zh";
import { ar } from "./ar";
import { ru } from "./ru";

// Locale map - add more languages as files are created
const locales: Partial<Record<Lang, CopyContent>> = {
  en,
  zh,
  ar,
  ru,
  // TODO: Add remaining languages (ja, ko, th, vi, id, hi, es)
  // Import and add them here as separate files are created
};

// Get content for a specific language
// Falls back to English if locale not found
export function getCopy(lang: Lang): CopyContent {
  return locales[lang] || locales.en || en;
}

// Export available locales for direct access
export { en, zh, ar, ru };

