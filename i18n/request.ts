import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // 从请求中获取语言
  let locale = await requestLocale;
  
  // 验证语言是否支持，如果不支持则使用默认语言
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }
  
  // 动态导入对应语言的翻译文件
  return {
    locale,
    messages: (await import(`./messages/${locale}.ts`)).default
  };
});






