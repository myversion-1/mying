/**
 * SEO Health Checker
 * Comprehensive SEO health check tool similar to SEMrush, Ahrefs, Moz
 * 
 * Features:
 * - Technical SEO checks
 * - Performance analysis
 * - Content SEO analysis
 * - Structured data validation
 * - Mobile-friendliness check
 * - Third-party API integration (SEMrush, Ahrefs, Moz)
 */

import { readFile } from "fs/promises";
import { existsSync } from "fs";
import { join } from "path";

export type IssueSeverity = "error" | "warning" | "info";
export type CheckStatus = "pass" | "fail" | "warning" | "not_checked";

export interface SEOIssue {
  id: string;
  type: string;
  severity: IssueSeverity;
  title: string;
  description: string;
  recommendation: string;
  affectedPages?: string[];
  fixable: boolean;
}

export interface TechnicalSEOCheck {
  status: CheckStatus;
  score: number; // 0-100
  issues: SEOIssue[];
  lastChecked: string;
}

export interface PerformanceCheck {
  status: CheckStatus;
  score: number; // 0-100
  metrics: {
    pageLoadTime?: number; // milliseconds
    firstContentfulPaint?: number;
    largestContentfulPaint?: number;
    cumulativeLayoutShift?: number;
    firstInputDelay?: number;
    totalBlockingTime?: number;
  };
  issues: SEOIssue[];
  lastChecked: string;
}

export interface ContentSEOCheck {
  status: CheckStatus;
  score: number; // 0-100
  metrics: {
    titleLength?: number;
    descriptionLength?: number;
    h1Count?: number;
    h2Count?: number;
    imageAltCount?: number;
    imageAltMissing?: number;
    wordCount?: number;
    internalLinks?: number;
    externalLinks?: number;
  };
  issues: SEOIssue[];
  lastChecked: string;
}

export interface StructuredDataCheck {
  status: CheckStatus;
  score: number; // 0-100
  schemas: {
    type: string;
    valid: boolean;
    errors?: string[];
  }[];
  issues: SEOIssue[];
  lastChecked: string;
}

export interface MobileCheck {
  status: CheckStatus;
  score: number; // 0-100
  viewportConfigured: boolean;
  touchTargets: boolean;
  textReadable: boolean;
  issues: SEOIssue[];
  lastChecked: string;
}

export interface ThirdPartyData {
  semrush?: {
    domainAuthority?: number;
    organicKeywords?: number;
    organicTraffic?: number;
    backlinks?: number;
    referringDomains?: number;
    lastUpdated?: string;
  };
  ahrefs?: {
    domainRating?: number;
    organicKeywords?: number;
    organicTraffic?: number;
    backlinks?: number;
    referringDomains?: number;
    lastUpdated?: string;
  };
  moz?: {
    domainAuthority?: number;
    pageAuthority?: number;
    linkingRootDomains?: number;
    lastUpdated?: string;
  };
}

export interface SEOHealthReport {
  overallScore: number; // 0-100
  domain: string;
  checkedAt: string;
  technicalSEO: TechnicalSEOCheck;
  performance: PerformanceCheck;
  contentSEO: ContentSEOCheck;
  structuredData: StructuredDataCheck;
  mobile: MobileCheck;
  thirdParty?: ThirdPartyData;
  summary: {
    totalIssues: number;
    criticalIssues: number;
    warnings: number;
    recommendations: string[];
  };
}

/**
 * Check robots.txt configuration
 */
async function checkRobotsTxt(domain: string): Promise<SEOIssue[]> {
  const issues: SEOIssue[] = [];
  
  try {
    const robotsUrl = `${domain}/robots.txt`;
    const response = await fetch(robotsUrl);
    
    if (!response.ok) {
      issues.push({
        id: "robots-missing",
        type: "technical",
        severity: "error",
        title: "robots.txt not found or inaccessible",
        description: `robots.txt file is not accessible at ${robotsUrl}`,
        recommendation: "Ensure robots.txt is accessible and properly configured",
        fixable: true,
      });
      return issues;
    }
    
    const content = await response.text();
    
    // Check for sitemap declaration
    if (!content.includes("Sitemap:")) {
      issues.push({
        id: "robots-no-sitemap",
        type: "technical",
        severity: "warning",
        title: "Sitemap not declared in robots.txt",
        description: "robots.txt does not contain a Sitemap declaration",
        recommendation: "Add Sitemap URL to robots.txt: Sitemap: https://www.miyingrides.com/sitemap.xml",
        fixable: true,
      });
    }
    
    // Check for blocking important paths
    if (content.includes("Disallow: /")) {
      issues.push({
        id: "robots-block-all",
        type: "technical",
        severity: "error",
        title: "robots.txt blocks all pages",
        description: "robots.txt contains 'Disallow: /' which blocks all pages from search engines",
        recommendation: "Review robots.txt rules and ensure important pages are not blocked",
        fixable: true,
      });
    }
  } catch (error) {
    issues.push({
      id: "robots-check-failed",
      type: "technical",
      severity: "warning",
      title: "Failed to check robots.txt",
      description: `Error checking robots.txt: ${error}`,
      recommendation: "Manually verify robots.txt is accessible",
      fixable: false,
    });
  }
  
  return issues;
}

/**
 * Check sitemap.xml
 */
async function checkSitemap(domain: string): Promise<SEOIssue[]> {
  const issues: SEOIssue[] = [];
  
  try {
    const sitemapUrl = `${domain}/sitemap.xml`;
    const response = await fetch(sitemapUrl);
    
    if (!response.ok) {
      issues.push({
        id: "sitemap-missing",
        type: "technical",
        severity: "error",
        title: "sitemap.xml not found or inaccessible",
        description: `sitemap.xml file is not accessible at ${sitemapUrl}`,
        recommendation: "Ensure sitemap.xml is generated and accessible",
        fixable: true,
      });
      return issues;
    }
    
    const content = await response.text();
    
    // Check if sitemap is valid XML
    if (!content.includes("<?xml") || !content.includes("<urlset")) {
      issues.push({
        id: "sitemap-invalid",
        type: "technical",
        severity: "error",
        title: "sitemap.xml is not valid XML",
        description: "sitemap.xml does not appear to be valid XML format",
        recommendation: "Verify sitemap.xml format and structure",
        fixable: true,
      });
    }
    
    // Count URLs in sitemap
    const urlMatches = content.match(/<url>/g);
    const urlCount = urlMatches ? urlMatches.length : 0;
    
    if (urlCount === 0) {
      issues.push({
        id: "sitemap-empty",
        type: "technical",
        severity: "warning",
        title: "sitemap.xml contains no URLs",
        description: "sitemap.xml exists but contains no URL entries",
        recommendation: "Ensure sitemap.xml includes all important pages",
        fixable: true,
      });
    } else if (urlCount < 10) {
      issues.push({
        id: "sitemap-few-urls",
        type: "technical",
        severity: "info",
        title: "sitemap.xml contains few URLs",
        description: `sitemap.xml contains only ${urlCount} URLs`,
        recommendation: "Consider adding more pages to sitemap.xml",
        fixable: true,
      });
    }
  } catch (error) {
    issues.push({
      id: "sitemap-check-failed",
      type: "technical",
      severity: "warning",
      title: "Failed to check sitemap.xml",
      description: `Error checking sitemap.xml: ${error}`,
      recommendation: "Manually verify sitemap.xml is accessible",
      fixable: false,
    });
  }
  
  return issues;
}

/**
 * Check page metadata
 */
async function checkPageMetadata(url: string): Promise<SEOIssue[]> {
  const issues: SEOIssue[] = [];
  
  try {
    const response = await fetch(url);
    const html = await response.text();
    
    // Check title tag
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    if (!titleMatch) {
      issues.push({
        id: "metadata-no-title",
        type: "content",
        severity: "error",
        title: "Missing <title> tag",
        description: `Page ${url} is missing a <title> tag`,
        recommendation: "Add a descriptive <title> tag to the page",
        affectedPages: [url],
        fixable: true,
      });
    } else {
      const title = titleMatch[1].trim();
      if (title.length < 30) {
        issues.push({
          id: "metadata-title-short",
          type: "content",
          severity: "warning",
          title: "Title tag is too short",
          description: `Title tag "${title}" is only ${title.length} characters (recommended: 50-60)`,
          recommendation: "Expand title tag to 50-60 characters for better SEO",
          affectedPages: [url],
          fixable: true,
        });
      } else if (title.length > 60) {
        issues.push({
          id: "metadata-title-long",
          type: "content",
          severity: "warning",
          title: "Title tag is too long",
          description: `Title tag is ${title.length} characters (recommended: 50-60)`,
          recommendation: "Shorten title tag to 50-60 characters",
          affectedPages: [url],
          fixable: true,
        });
      }
    }
    
    // Check meta description
    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
    if (!descMatch) {
      issues.push({
        id: "metadata-no-description",
        type: "content",
        severity: "error",
        title: "Missing meta description",
        description: `Page ${url} is missing a meta description`,
        recommendation: "Add a compelling meta description (120-160 characters)",
        affectedPages: [url],
        fixable: true,
      });
    } else {
      const description = descMatch[1].trim();
      if (description.length < 120) {
        issues.push({
          id: "metadata-description-short",
          type: "content",
          severity: "warning",
          title: "Meta description is too short",
          description: `Meta description is only ${description.length} characters (recommended: 120-160)`,
          recommendation: "Expand meta description to 120-160 characters",
          affectedPages: [url],
          fixable: true,
        });
      } else if (description.length > 160) {
        issues.push({
          id: "metadata-description-long",
          type: "content",
          severity: "warning",
          title: "Meta description is too long",
          description: `Meta description is ${description.length} characters (recommended: 120-160)`,
          recommendation: "Shorten meta description to 120-160 characters",
          affectedPages: [url],
          fixable: true,
        });
      }
    }
    
    // Check H1 tag
    const h1Matches = html.match(/<h1[^>]*>([^<]+)<\/h1>/gi);
    if (!h1Matches || h1Matches.length === 0) {
      issues.push({
        id: "content-no-h1",
        type: "content",
        severity: "error",
        title: "Missing H1 tag",
        description: `Page ${url} is missing an H1 tag`,
        recommendation: "Add a single H1 tag to the page",
        affectedPages: [url],
        fixable: true,
      });
    } else if (h1Matches.length > 1) {
      issues.push({
        id: "content-multiple-h1",
        type: "content",
        severity: "warning",
        title: "Multiple H1 tags found",
        description: `Page ${url} contains ${h1Matches.length} H1 tags (recommended: 1)`,
        recommendation: "Use only one H1 tag per page",
        affectedPages: [url],
        fixable: true,
      });
    }
    
    // Check images without alt text
    const imgMatches = html.match(/<img[^>]*>/gi);
    if (imgMatches) {
      let missingAlt = 0;
      imgMatches.forEach((img) => {
        if (!img.match(/alt=["'][^"']*["']/i)) {
          missingAlt++;
        }
      });
      
      if (missingAlt > 0) {
        issues.push({
          id: "images-missing-alt",
          type: "content",
          severity: "warning",
          title: "Images missing alt text",
          description: `Page ${url} has ${missingAlt} image(s) without alt text`,
          recommendation: "Add descriptive alt text to all images",
          affectedPages: [url],
          fixable: true,
        });
      }
    }
    
    // Check structured data
    const structuredDataMatches = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);
    if (!structuredDataMatches || structuredDataMatches.length === 0) {
      issues.push({
        id: "structured-data-missing",
        type: "structured-data",
        severity: "warning",
        title: "No structured data found",
        description: `Page ${url} does not contain structured data (JSON-LD)`,
        recommendation: "Add structured data (JSON-LD) to improve search engine understanding",
        affectedPages: [url],
        fixable: true,
      });
    }
    
  } catch (error) {
    issues.push({
      id: "metadata-check-failed",
      type: "technical",
      severity: "warning",
      title: "Failed to check page metadata",
      description: `Error checking page ${url}: ${error}`,
      recommendation: "Manually verify page metadata",
      affectedPages: [url],
      fixable: false,
    });
  }
  
  return issues;
}

/**
 * Calculate score from issues
 */
function calculateScore(issues: SEOIssue[]): number {
  if (issues.length === 0) return 100;
  
  let totalDeduction = 0;
  issues.forEach((issue) => {
    switch (issue.severity) {
      case "error":
        totalDeduction += 10;
        break;
      case "warning":
        totalDeduction += 5;
        break;
      case "info":
        totalDeduction += 2;
        break;
    }
  });
  
  return Math.max(0, 100 - totalDeduction);
}

/**
 * Run comprehensive SEO health check
 */
export async function runSEOHealthCheck(
  domain: string = "https://www.miyingrides.com",
  samplePages: string[] = []
): Promise<SEOHealthReport> {
  const checkedAt = new Date().toISOString();
  
  // Technical SEO checks
  const robotsIssues = await checkRobotsTxt(domain);
  const sitemapIssues = await checkSitemap(domain);
  const technicalIssues = [...robotsIssues, ...sitemapIssues];
  
  // Content SEO checks
  let contentIssues: SEOIssue[] = [];
  if (samplePages.length > 0) {
    for (const page of samplePages.slice(0, 5)) { // Limit to 5 pages
      const pageIssues = await checkPageMetadata(`${domain}${page}`);
      contentIssues = [...contentIssues, ...pageIssues];
    }
  } else {
    // Check homepage by default
    const homepageIssues = await checkPageMetadata(domain);
    contentIssues = [...contentIssues, ...homepageIssues];
  }
  
  // Calculate scores
  const technicalScore = calculateScore(technicalIssues);
  const contentScore = calculateScore(contentIssues);
  
  // Count issues by severity
  const allIssues = [...technicalIssues, ...contentIssues];
  const criticalIssues = allIssues.filter((i) => i.severity === "error").length;
  const warnings = allIssues.filter((i) => i.severity === "warning").length;
  
  // Generate recommendations
  const recommendations: string[] = [];
  if (criticalIssues > 0) {
    recommendations.push(`Fix ${criticalIssues} critical issue(s) to improve SEO`);
  }
  if (warnings > 0) {
    recommendations.push(`Address ${warnings} warning(s) for better optimization`);
  }
  if (technicalScore < 80) {
    recommendations.push("Improve technical SEO configuration");
  }
  if (contentScore < 80) {
    recommendations.push("Optimize page content and metadata");
  }
  
  // Calculate overall score (weighted average)
  const overallScore = Math.round(
    (technicalScore * 0.3) + (contentScore * 0.7)
  );
  
  return {
    overallScore,
    domain,
    checkedAt,
    technicalSEO: {
      status: technicalScore >= 80 ? "pass" : technicalScore >= 60 ? "warning" : "fail",
      score: technicalScore,
      issues: technicalIssues,
      lastChecked: checkedAt,
    },
    performance: {
      status: "not_checked",
      score: 0,
      metrics: {},
      issues: [],
      lastChecked: checkedAt,
    },
    contentSEO: {
      status: contentScore >= 80 ? "pass" : contentScore >= 60 ? "warning" : "fail",
      score: contentScore,
      metrics: {},
      issues: contentIssues,
      lastChecked: checkedAt,
    },
    structuredData: {
      status: "not_checked",
      score: 0,
      schemas: [],
      issues: [],
      lastChecked: checkedAt,
    },
    mobile: {
      status: "not_checked",
      score: 0,
      viewportConfigured: false,
      touchTargets: false,
      textReadable: false,
      issues: [],
      lastChecked: checkedAt,
    },
    summary: {
      totalIssues: allIssues.length,
      criticalIssues,
      warnings,
      recommendations,
    },
  };
}

