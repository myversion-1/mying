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

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mying.vercel.app";
  const postUrl = `${baseUrl}/blog/${slug}`;

  return {
    title: `${post.title} | Miying Rides Blog`,
    description: post.excerpt || (post.content ? post.content.substring(0, 160) + "..." : ""),
    keywords: [
      post.category,
      "amusement rides",
      "theme park",
      "industry news",
      "amusement equipment",
      ...(post.tags || []),
    ],
    authors: [{ name: "Miying Amusement Equipment" }],
    openGraph: {
      title: `${post.title} | Miying Rides Blog`,
      description: post.excerpt || post.content.substring(0, 160) + "...",
      url: postUrl,
      type: "article",
      publishedTime: post.date,
      images: post.image
        ? [
            {
              url: `${baseUrl}${post.image}`,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Miying Rides Blog`,
      description: post.excerpt || post.content.substring(0, 160) + "...",
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



