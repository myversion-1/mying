import type { BlogPost, BlogCategory } from "./types/blog";

// Re-export types for convenience
export type { BlogCategory, BlogPost } from "./types/blog";

// Blog posts data
// Based on Arrowy's Blogs page strategy
export const blogPosts: BlogPost[] = [
  {
    id: "trends-2025",
    title: "Latest Trends in Amusement Rides 2025",
    titleEn: "Latest Trends in Amusement Rides 2025",
    titleZh: "2025年游乐设备最新趋势",
    slug: "latest-trends-amusement-rides-2025",
    date: "2025-01-15",
    category: "Industry News",
    categoryEn: "Industry News",
    categoryZh: "行业资讯",
    excerpt: "Exploring the latest innovations and trends shaping the amusement ride industry in 2025, from AI integration to sustainable design.",
    excerptEn: "Exploring the latest innovations and trends shaping the amusement ride industry in 2025, from AI integration to sustainable design.",
    excerptZh: "探索2025年塑造游乐设备行业的最新创新和趋势，从AI集成到可持续设计。",
    image: "/blog/trends-2025.jpg", // Placeholder
    readTime: "5 min",
    author: "Miying Team",
    tags: ["trends", "innovation", "2025", "amusement rides"],
    featured: true,
  },
  {
    id: "factory-expansion",
    title: "Factory Expansion: Doubling Our Production Capacity",
    titleEn: "Factory Expansion: Doubling Our Production Capacity",
    titleZh: "工厂扩建：产能翻倍",
    slug: "factory-expansion-doubling-production-capacity",
    date: "2024-12-20",
    category: "Company Updates",
    categoryEn: "Company Updates",
    categoryZh: "公司动态",
    excerpt: "We're excited to announce the expansion of our manufacturing facility, doubling our production capacity to meet growing global demand.",
    excerptEn: "We're excited to announce the expansion of our manufacturing facility, doubling our production capacity to meet growing global demand.",
    excerptZh: "我们很高兴地宣布扩建我们的制造设施，产能翻倍以满足不断增长的全球需求。",
    image: "/blog/factory-expansion.jpg", // Placeholder
    readTime: "3 min",
    author: "Miying Team",
    tags: ["factory", "expansion", "production", "capacity"],
    featured: true,
  },
  {
    id: "safety-standards",
    title: "Understanding International Safety Standards for Amusement Rides",
    titleEn: "Understanding International Safety Standards for Amusement Rides",
    titleZh: "了解游乐设备国际安全标准",
    slug: "understanding-international-safety-standards",
    date: "2024-11-10",
    category: "Technical Articles",
    categoryEn: "Technical Articles",
    categoryZh: "技术文章",
    excerpt: "A comprehensive guide to international safety standards including EN 13814, ASTM F24, and how they ensure rider safety.",
    excerptEn: "A comprehensive guide to international safety standards including EN 13814, ASTM F24, and how they ensure rider safety.",
    excerptZh: "国际安全标准综合指南，包括EN 13814、ASTM F24，以及它们如何确保乘客安全。",
    image: "/blog/safety-standards.jpg", // Placeholder
    readTime: "8 min",
    author: "Technical Team",
    tags: ["safety", "standards", "EN 13814", "ASTM F24", "compliance"],
    featured: false,
  },
  {
    id: "new-product-launch",
    title: "Introducing Our New Family Ride Collection",
    titleEn: "Introducing Our New Family Ride Collection",
    titleZh: "推出全新家庭游乐设备系列",
    slug: "new-family-ride-collection",
    date: "2024-10-05",
    category: "Product Updates",
    categoryEn: "Product Updates",
    categoryZh: "产品更新",
    excerpt: "Discover our latest family-friendly amusement rides designed for indoor entertainment centers and shopping malls.",
    excerptEn: "Discover our latest family-friendly amusement rides designed for indoor entertainment centers and shopping malls.",
    excerptZh: "探索我们专为室内娱乐中心和购物中心设计的最新家庭友好型游乐设备。",
    image: "/blog/new-products.jpg", // Placeholder
    readTime: "4 min",
    author: "Product Team",
    tags: ["products", "family rides", "new launch", "indoor"],
    featured: false,
  },
  {
    id: "iaapa-2024",
    title: "Highlights from IAAPA Expo 2024",
    titleEn: "Highlights from IAAPA Expo 2024",
    titleZh: "IAAPA 2024展会亮点",
    slug: "iaapa-expo-2024-highlights",
    date: "2024-09-18",
    category: "Trade Shows",
    categoryEn: "Trade Shows",
    categoryZh: "展会报道",
    excerpt: "Recap of our participation in IAAPA Expo 2024, showcasing innovative rides and connecting with industry leaders worldwide.",
    excerptEn: "Recap of our participation in IAAPA Expo 2024, showcasing innovative rides and connecting with industry leaders worldwide.",
    excerptZh: "回顾我们在IAAPA 2024展会的参与，展示创新游乐设备并与全球行业领导者建立联系。",
    image: "/blog/iaapa-2024.jpg", // Placeholder
    readTime: "6 min",
    author: "Marketing Team",
    tags: ["IAAPA", "trade show", "expo", "2024"],
    featured: false,
  },
  {
    id: "sustainability-initiatives",
    title: "Our Commitment to Sustainable Manufacturing",
    titleEn: "Our Commitment to Sustainable Manufacturing",
    titleZh: "我们对可持续制造的承诺",
    slug: "sustainable-manufacturing-commitment",
    date: "2024-08-22",
    category: "Company Updates",
    categoryEn: "Company Updates",
    categoryZh: "公司动态",
    excerpt: "Learn about our environmental initiatives and how we're reducing our carbon footprint while maintaining quality standards.",
    excerptEn: "Learn about our environmental initiatives and how we're reducing our carbon footprint while maintaining quality standards.",
    excerptZh: "了解我们的环保举措以及如何在保持质量标准的同时减少碳足迹。",
    image: "/blog/sustainability.jpg", // Placeholder
    readTime: "5 min",
    author: "Miying Team",
    tags: ["sustainability", "environment", "manufacturing", "green"],
    featured: false,
  },
];

// Helper function to get localized blog post
export function getLocalizedBlogPost(post: BlogPost, lang: string): BlogPost {
  if (lang === "zh") {
    return {
      ...post,
      title: post.titleZh || post.title,
      category: (post.categoryZh || post.category) as BlogCategory,
      excerpt: post.excerptZh || post.excerpt,
      content: post.contentZh || post.content,
    };
  }
  return {
    ...post,
    title: post.titleEn || post.title,
    category: (post.categoryEn || post.category) as BlogCategory,
    excerpt: post.excerptEn || post.excerpt,
    content: post.contentEn || post.content,
  };
}

// Get posts by category
export function getPostsByCategory(category: BlogCategory, lang: string = "en"): BlogPost[] {
  return blogPosts
    .filter((post) => post.category === category)
    .map((post) => getLocalizedBlogPost(post, lang));
}

// Get featured posts
export function getFeaturedPosts(lang: string = "en", limit?: number): BlogPost[] {
  const featured = blogPosts
    .filter((post) => post.featured)
    .map((post) => getLocalizedBlogPost(post, lang))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  return limit ? featured.slice(0, limit) : featured;
}

// Get latest posts
export function getLatestPosts(lang: string = "en", limit?: number): BlogPost[] {
  const latest = blogPosts
    .map((post) => getLocalizedBlogPost(post, lang))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  return limit ? latest.slice(0, limit) : latest;
}

// Get post by slug
export function getPostBySlug(slug: string, lang: string = "en"): BlogPost | undefined {
  const post = blogPosts.find((p) => p.slug === slug);
  return post ? getLocalizedBlogPost(post, lang) : undefined;
}



