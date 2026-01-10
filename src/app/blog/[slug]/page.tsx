"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../../../components/language";
import { getPostBySlug, getLatestPosts } from "../../../content/blog";
import { RefurbishmentProcess } from "../../../components/blog/RefurbishmentProcess";
import { RefurbishmentComparison } from "../../../components/blog/RefurbishmentComparison";
import { BeforeAfter } from "../../../components/blog/BeforeAfter";
import { TechnicalSpotlight } from "../../../components/blog/TechnicalSpotlight";
import { PDFDownloadCTA } from "../../../components/blog/PDFDownloadCTA";
import { BlogContentWithComponents } from "./BlogContentWithComponents";
import { RetailStatsSidebar } from "../../../components/blog/RetailStatsSidebar";
import { SpatialAuditForm } from "../../../components/blog/SpatialAuditForm";

type Props = {
  params: Promise<{ slug: string }>;
};

// Helper function to process content and bold key phrases
function processContent(content: string, postId?: string): string {
  // Bold key phrases - common across all posts
  const commonPhrases = [
    'ROI',
    'EN 13814',
    'ASTM',
  ];
  
  // Post-specific key phrases
  const postSpecificPhrases: Record<string, string[]> = {
    'low-height-engineering-star-nuclear-guard': [
      'Low-Height Engineering',
      'Star Nuclear Guard',
    ],
    'renaissance-of-assets-refurbishment': [
      'Asset Fatigue',
      'Capital Preservation',
      'Lifecycle Asset Management',
      'IRR',
      'ESG',
    ],
    'corner-strategy-mall-spaces': [
      'Dead Corner',
      'Corner-Specific Engineering',
      'Secondary Anchor',
      'RevPAM',
      'Revenue Per Available Meter',
      'Space Efficiency',
      'Dimensional Intelligence',
    ],
  };
  
  const allPhrases = [
    ...commonPhrases,
    ...(postId && postSpecificPhrases[postId] ? postSpecificPhrases[postId] : []),
  ];
  
  let processed = content;
  allPhrases.forEach((phrase) => {
    // Escape special regex characters
    const escapedPhrase = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedPhrase})`, 'gi');
    processed = processed.replace(regex, '<strong>$1</strong>');
  });
  
  return processed;
}

// Check if post should use White Paper layout
function isWhitePaperPost(postId?: string): boolean {
  return postId === "renaissance-of-assets-refurbishment";
}

// Check if post should use Corner Strategy layout
function isCornerStrategyPost(postId?: string): boolean {
  return postId === "corner-strategy-mall-spaces";
}

// Blog Hero Image Component with error handling
function BlogHeroImage({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState(src || "/logo.jpg");
  const [usePriority, setUsePriority] = useState(true);

  const handleError = () => {
    if (imageSrc !== "/logo.jpg") {
      // Fallback to logo if original image fails
      setImageSrc("/logo.jpg");
      setImageError(false);
      setUsePriority(false); // Don't preload fallback
    } else {
      // If logo also fails, show placeholder
      setImageError(true);
      setUsePriority(false);
    }
  };

  if (imageError) {
    return (
      <div className="flex h-full items-center justify-center text-[var(--dark-bg-text-tertiary)]">
        <div className="text-center">
          <svg
            className="mx-auto h-16 w-16 text-[var(--dark-bg-text-tertiary)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="mt-2 text-sm">Blog Image</p>
        </div>
      </div>
    );
  }

  // Use eager loading for LCP optimization (hero image is above the fold)
  // But don't use priority to avoid preload warnings for potentially missing images
  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill
      className="object-cover"
      sizes="(max-width: 768px) calc(100vw - 2rem), (max-width: 1200px) calc(896px + 4rem), 960px"
      quality={75}
      loading="eager"
      onError={handleError}
    />
  );
}

// Component for Key Takeaways box
function KeyTakeaways({ takeaways, isCornerStrategy = false }: { takeaways: string[]; isCornerStrategy?: boolean }) {
  return (
    <div className={`mb-12 rounded-lg border p-6 md:p-8 ${isCornerStrategy ? "border-[var(--border)] bg-[var(--surface-elevated)]" : "border-white/20 bg-gray-100/10"}`}>
      <h3 className={`mb-4 font-serif text-xl font-semibold md:text-2xl ${isCornerStrategy ? "text-[var(--corner-strategy-heading)]" : "text-white"}`}>
        Key Takeaways
      </h3>
      <ul className="space-y-3">
        {takeaways.map((takeaway, index) => (
          <li key={index} className={`flex items-start gap-3 ${isCornerStrategy ? "text-[var(--corner-strategy-text)]" : "text-[var(--dark-bg-text-secondary)]"}`}>
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-primary)]"></span>
            <span className="leading-relaxed">{takeaway}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Component for CTA section
function BlogCTA() {
  const { lang } = useLanguage();
  
  return (
    <div className="mt-16 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-8 md:p-12 text-center">
      <p className="mb-6 text-xl font-semibold text-white md:text-2xl">
        {lang === "zh" 
          ? "准备好优化您的受限空间了吗？下载我们的技术规格指南。"
          : "Ready to optimize your restricted space? Download our Technical Specification Guide."}
      </p>
      <Link
        href="/contact"
        className="inline-block rounded-lg bg-[var(--action-primary)] px-8 py-4 font-semibold text-[var(--action-primary-text)] !text-[var(--action-primary-text)] transition-colors hover:bg-[var(--action-primary-hover)] min-h-[44px] min-w-[44px] touch-manipulation"
      >
        {lang === "zh" ? "获取技术规格指南" : "Get Technical Specification Guide"}
      </Link>
    </div>
  );
}

export default function BlogPostPage({ params }: Props) {
  const resolvedParams = use(params);
  const { lang } = useLanguage();
  const post = getPostBySlug(resolvedParams.slug, lang);

  if (!post) {
    return (
      <div className="mx-auto max-w-4xl px-4 md:px-8 py-20">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-semibold text-white">
            {lang === "zh" ? "文章未找到" : "Post Not Found"}
          </h1>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[var(--accent-primary)] hover:text-[var(--accent-primary-hover)] transition min-h-[44px] touch-manipulation"
          >
            {lang === "zh" ? "返回博客" : "Back to Blog"}
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const latestPosts = getLatestPosts(lang, 3).filter((p) => p.id !== post.id);

  // Extract key takeaways from post metadata or use defaults
  const keyTakeaways = (post as any).keyTakeaways || [
    "Low-Height Engineering enables optimal space utilization in restricted venues",
    "Star Nuclear Guard delivers exceptional ROI for indoor entertainment centers",
    "Professional B2B solutions maximize revenue potential in limited spaces",
  ];

  return (
    <div className="space-y-16 py-8 md:py-12">
      {/* Article Header */}
      <article className={`mx-auto max-w-4xl px-4 md:px-8 rounded-2xl p-6 md:p-8 ${isCornerStrategyPost(post.id) ? "bg-transparent" : "bg-[var(--dark-bg-base)]/50"}`}>
        {/* Back to Blog */}
        <Link
          href="/blog"
          className={`mb-8 inline-flex items-center gap-2 text-sm transition-colors hover:text-[var(--accent-primary)] min-h-[44px] touch-manipulation ${isCornerStrategyPost(post.id) ? "text-[var(--text-tertiary)]" : "text-[var(--dark-bg-text-secondary)]"}`}
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          {lang === "zh" ? "返回博客" : "Back to Blog"}
        </Link>

        {/* Hero Image */}
        <div className="relative mb-12 h-64 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 md:h-96">
          <BlogHeroImage 
            src={post.image} 
            alt={post.imageAlt || post.title}
          />
        </div>

        {/* Article Meta */}
        <div className={`mb-8 flex flex-wrap items-center gap-4 text-sm ${isCornerStrategyPost(post.id) ? "text-[var(--text-tertiary)]" : "text-[var(--dark-bg-text-tertiary)]"}`}>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${isCornerStrategyPost(post.id) ? "bg-[var(--accent-primary-light)] text-[var(--accent-primary)]" : "bg-[var(--accent-primary-light)] text-[var(--accent-primary)]"}`}>
            {post.category}
          </span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {post.readTime && (
            <>
              <span>•</span>
              <span>{post.readTime} read</span>
            </>
          )}
          {post.author && (
            <>
              <span>•</span>
              <span>{post.author}</span>
            </>
          )}
        </div>

        {/* Article Title - Serif font */}
        <h1 className={`mb-8 font-serif text-4xl font-bold leading-tight md:text-5xl ${isCornerStrategyPost(post.id) ? "text-[var(--corner-strategy-heading)]" : "text-white"}`}>
          {post.title}
        </h1>

        {/* Key Takeaways Box */}
        <KeyTakeaways takeaways={keyTakeaways} isCornerStrategy={isCornerStrategyPost(post.id)} />

        {/* Article Content - Sans-serif with 1.5x line spacing */}
        {post.content ? (
          <div className={isWhitePaperPost(post.id) ? "white-paper-layout" : isCornerStrategyPost(post.id) ? "corner-strategy-layout" : ""}>
            {isWhitePaperPost(post.id) ? (
              <div className="grid gap-8 md:grid-cols-[1fr_300px]">
                {/* Main Content */}
                <div className="blog-content space-y-6 text-base leading-[1.6] text-[var(--dark-bg-text-secondary)] md:text-lg">
                  <BlogContentWithComponents content={post.content} postId={post.id} />
                </div>
                
                {/* Technical Spotlight Sidebar */}
                <div className="hidden md:block">
                  <TechnicalSpotlight>
                    <div className="space-y-4">
                      <div>
                        <h4 className="mb-2 font-semibold text-white">Key Metrics</h4>
                        <ul className="space-y-1 text-sm text-[var(--dark-bg-text-secondary)]">
                          <li>• 40-60% cost savings</li>
                          <li>• Reduced lead times</li>
                          <li>• EN 13814 compliant</li>
                          <li>• ESG aligned</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="mb-2 font-semibold text-white">Process</h4>
                        <ul className="space-y-1 text-sm text-[var(--dark-bg-text-secondary)]">
                          <li>1. Structural audit</li>
                          <li>2. Electronic upgrade</li>
                          <li>3. Thematic refresh</li>
                        </ul>
                      </div>
                    </div>
                  </TechnicalSpotlight>
                </div>
              </div>
            ) : isCornerStrategyPost(post.id) ? (
              <div className="grid gap-8 md:grid-cols-[1fr_280px]">
                {/* Main Content */}
                <div className="blog-content corner-strategy-content space-y-6 text-base leading-[1.7] md:text-lg">
                  <BlogContentWithComponents content={post.content} postId={post.id} />
                </div>
                
                {/* Retail Stats Sidebar */}
                <div className="hidden md:block">
                  <RetailStatsSidebar />
                </div>
              </div>
            ) : (
              <div
                className="blog-content space-y-6 text-base leading-[1.7] md:text-lg"
                dangerouslySetInnerHTML={{ __html: processContent(post.content, post.id) }}
              />
            )}
          </div>
        ) : (
          <div className="blog-content space-y-6 text-base leading-[1.5] text-white/90 md:text-lg">
            <p>{post.excerpt}</p>
            <p className="text-[var(--dark-bg-text-secondary)]">
              {lang === "zh"
                ? "完整文章内容即将发布，敬请期待。"
                : "Full article content coming soon. Stay tuned!"}
            </p>
          </div>
        )}

        {/* Secondary Image Placeholder - Next to Star Nuclear Guard section */}
        {post.content && post.content.includes('Star Nuclear Guard') && (
          <div className="my-12">
            <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 md:h-80">
              <Image
                src={post.image || "/blog/low-height-engineering.jpg"}
                alt="Low height amusement ride for FEC indoor mall"
                fill
                className="object-cover"
                sizes="(max-width: 768px) calc(100vw - 2rem), (max-width: 1200px) calc(896px + 4rem), 960px"
                quality={75}
              />
            </div>
          </div>
        )}

        {/* PDF Download CTA for Refurbishment post */}
        {isWhitePaperPost(post.id) && <PDFDownloadCTA />}
        
        {/* Spatial Audit Form for Corner Strategy post */}
        {isCornerStrategyPost(post.id) && (
          <div className="spatial-audit-form">
            <SpatialAuditForm />
          </div>
        )}
        
        {/* Standard CTA Section */}
        {!isWhitePaperPost(post.id) && !isCornerStrategyPost(post.id) && <BlogCTA />}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="rounded-full bg-white/5 px-3 py-1 text-sm text-[var(--dark-bg-text-secondary)]"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>

      {/* Related Posts */}
      {latestPosts.length > 0 && (
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
            <h2 className="mb-6 font-serif text-2xl font-semibold text-white md:text-3xl">
              {lang === "zh" ? "相关文章" : "Related Articles"}
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {latestPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="group rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-[var(--accent-secondary)]/30 hover:bg-white/10 touch-manipulation"
                >
                  <h3 className="mb-2 font-semibold text-white transition group-hover:text-[var(--accent-primary)]">
                    {relatedPost.title}
                  </h3>
                  <p className="text-sm text-[var(--dark-bg-text-secondary)] line-clamp-2">
                    {relatedPost.excerpt}
                  </p>
                  <div className="mt-2 text-xs text-[var(--dark-bg-text-tertiary)]">
                    {formatDate(relatedPost.date)}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
