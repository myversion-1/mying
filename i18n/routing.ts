import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

// 支持的语言列表（12 种语言）
export const routing = defineRouting({
  // 支持的语言列表
  locales: [
    'en',  // English
    'zh',  // Chinese
    'ar',  // Arabic
    'ru',  // Russian
    'ja',  // Japanese
    'ko',  // Korean
    'th',  // Thai
    'vi',  // Vietnamese
    'id',  // Indonesian
    'hi',  // Hindi
    'es',  // Spanish
    'fr',  // French
  ],
  
  // 默认语言
  defaultLocale: 'en',
  
  // 语言检测策略
  // 'as-needed': 默认语言不显示前缀，其他语言显示前缀
  localePrefix: 'as-needed'
});

// 导出导航工具（用于客户端组件）
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);

// 语言显示名称映射
export const LANGUAGE_NAMES: Record<string, string> = {
  en: 'English',
  zh: '中文',
  ar: 'العربية',
  ru: 'Русский',
  ja: '日本語',
  ko: '한국어',
  th: 'ไทย',
  vi: 'Tiếng Việt',
  id: 'Bahasa Indonesia',
  hi: 'हिन्दी',
  es: 'Español',
  fr: 'Français',
};

// 语言方向映射（LTR/RTL）
export const LANGUAGE_DIRECTIONS: Record<string, 'ltr' | 'rtl'> = {
  en: 'ltr',
  zh: 'ltr',
  ar: 'rtl',  // 阿拉伯语从右到左
  ru: 'ltr',
  ja: 'ltr',
  ko: 'ltr',
  th: 'ltr',
  vi: 'ltr',
  id: 'ltr',
  hi: 'ltr',
  es: 'ltr',
  fr: 'ltr',
};










