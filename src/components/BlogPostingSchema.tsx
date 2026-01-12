import type { BlogPost } from "../content/types/blog";

interface BlogPostingSchemaProps {
  post: BlogPost;
  baseUrl?: string;
}

/**
 * BlogPosting Schema for SEO optimization
 * Provides structured data for Google Search rich results
 */
export function BlogPostingSchema({
  post,
  baseUrl = typeof window !== "undefined"
    ? window.location.origin
    : "https://mying.vercel.app",
}: BlogPostingSchemaProps) {
  const postUrl = `${baseUrl}/blog/${post.slug}`;
  const imageUrl = post.image ? `${baseUrl}${post.image}` : `${baseUrl}/logo.jpg`;

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: imageUrl,
    datePublished: post.date,
    dateModified: (post as any).dateModified || post.date,
    author: {
      "@type": "Organization",
      name: "Miying Amusement Equipment",
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Miying Amusement Equipment",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.jpg`,
        width: 600,
        height: 600,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    description: post.metaDescription || post.excerpt,
    articleSection: post.category,
    keywords: post.tags?.join(", ") || "",
    ...(post.readTime && {
      timeRequired: `PT${post.readTime.replace(/\s*min\s*/i, "M").replace(/\D/g, "")}M`,
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
    />
  );
}

