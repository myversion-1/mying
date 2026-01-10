// Blog post types - shared between client and server
export type BlogCategory = 
  | "Industry News"      // 行业资讯
  | "Company Updates"    // 公司动态
  | "Technical Articles" // 技术文章
  | "Product Updates"    // 产品更新
  | "Trade Shows";       // 展会报道

export type BlogPost = {
  id: string;
  title: string;
  titleEn?: string;
  titleZh?: string;
  slug: string; // URL-friendly identifier
  date: string; // ISO date string (e.g., "2025-01-15")
  category: BlogCategory;
  categoryEn?: string;
  categoryZh?: string;
  excerpt: string;
  excerptEn?: string;
  excerptZh?: string;
  content?: string; // Full article content (for detail page)
  contentEn?: string;
  contentZh?: string;
  image: string; // Path to featured image in /public folder
  imageAlt?: string; // Alt text for the hero image
  readTime?: string; // Estimated reading time (e.g., "5 min")
  author?: string;
  tags?: string[]; // SEO tags
  featured?: boolean; // Featured post
  keyTakeaways?: string[]; // Key takeaways for the takeaways box
  metaDescription?: string; // SEO-optimized meta description (150-160 chars)
  metaDescriptionEn?: string;
  metaDescriptionZh?: string;
};










