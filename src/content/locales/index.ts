// Centralized locale exports
import type { Lang } from "../../components/language";
import type { CopyContent } from "../types";

// Import all locale files
import { en } from "./en";
import { zh } from "./zh";
import { ar } from "./ar";
import { ru } from "./ru";
import { ja } from "./ja";
import { ko } from "./ko";
import { th } from "./th";
import { vi } from "./vi";
import { id } from "./id";
import { hi } from "./hi";
import { es } from "./es";

// Locale map - all languages migrated
const locales: Record<Lang, CopyContent> = {
  en,
  zh,
  ar,
  ru,
  ja,
  ko,
  th,
  vi,
  id,
  hi,
  es,
};

// Get content for a specific language
// Falls back to English if locale not found (shouldn't happen with all languages migrated)
export function getCopy(lang: Lang): CopyContent {
  return locales[lang] || locales.en;
}

// Export all locales for direct access
export { en, zh, ar, ru, ja, ko, th, vi, id, hi, es };

