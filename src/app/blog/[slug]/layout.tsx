import type { Metadata } from "next";
import { getPostBySlug } from "../../../content/blog";

interface BlogPostLayoutProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generate metadata for blog post pages
 */
export async function generateMetadata({
  params,
}: BlogPostLayoutProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug, "en"); // Use English for metadata

  if (!post) {
    return {
      title: "Post Not Found | Miying Rides Blog",
      description: "The requested blog post could not be found.",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.miyingrides.com";
  const postUrl = `${baseUrl}/blog/${slug}`;

  // Use optimized meta description if available, otherwise fall back to excerpt or content
  const metaDescription = post.metaDescription || post.excerpt || (post.content ? post.content.substring(0, 157) + "..." : "");
  
  // Ensure description is within optimal length (150-160 chars for SEO)
  const optimizedDescription = metaDescription.length > 160 
    ? metaDescription.substring(0, 157) + "..." 
    : metaDescription;

  // Determine if this is a refurbishment post for specific SEO
  const isRefurbishmentPost = post.slug.includes("refurbishment") || post.slug.includes("renaissance");
  const isCornerStrategyPost = post.slug.includes("corner-strategy") || post.slug.includes("mall-spaces");
  
  const baseKeywords = [
    post.category,
    "amusement rides",
    "theme park",
    "industry news",
    "amusement equipment",
  ];
  
  const specificKeywords = isRefurbishmentPost
    ? [
        "amusement ride restoration",
        "asset lifecycle",
        "ride refurbishment",
        "equipment refurbishment",
        "FEC maintenance",
        "ride modernization",
        "asset management",
        "sustainable operations",
      ]
    : isCornerStrategyPost
    ? [
        "amusement equipment for shopping mall corners",
        "mall corner equipment",
        "retail space optimization",
        "dead corner monetization",
        "mall space efficiency",
        "corner-specific engineering",
        "RevPAM optimization",
        "secondary anchor effect",
      ]
    : [
        "low-height engineering",
        "indoor rides",
        "FEC equipment",
        "space optimization",
      ];

  return {
    title: isRefurbishmentPost 
      ? "Professional Refurbishment Services for Amusement Rides | Miying Rides"
      : isCornerStrategyPost
      ? "Amusement Equipment for Shopping Mall Corners | Space Efficiency Solutions"
      : `${post.title} | Miying Rides Blog`,
    description: optimizedDescription,
    keywords: [
      ...baseKeywords,
      ...specificKeywords,
      ...(post.tags || []),
    ],
    authors: [{ name: "Miying Amusement Equipment" }],
    openGraph: {
      title: `${post.title} | Miying Rides Blog`,
      description: optimizedDescription,
      url: postUrl,
      type: "article",
      publishedTime: post.date,
      images: post.image
        ? [
            {
              url: `${baseUrl}${post.image}`,
              width: 1200,
              height: 630,
              alt: post.imageAlt || post.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Miying Rides Blog`,
      description: optimizedDescription,
      images: post.image ? [`${baseUrl}${post.image}`] : undefined,
    },
    alternates: {
      canonical: postUrl,
    },
  };
}

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}



