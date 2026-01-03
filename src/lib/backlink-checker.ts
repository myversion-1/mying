/**
 * Backlink Checker Utility
 * Checks if an external URL contains a backlink to mying.vercel.app
 */

import { BacklinkStatus } from "./seo-tracker-storage";

export interface BacklinkCheckResult {
  status: BacklinkStatus;
  linkType?: "dofollow" | "nofollow" | "meta";
  anchorText?: string;
  error?: string;
  httpStatus?: number;
}

const TARGET_DOMAIN = "mying.vercel.app";

/**
 * Check if an external URL contains a backlink to the target domain
 */
export async function checkBacklink(
  externalUrl: string,
  targetUrl: string
): Promise<BacklinkCheckResult> {
  try {
    // Normalize URL
    let url = externalUrl.trim();
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = `https://${url}`;
    }

    // Fetch the page
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      // Set a reasonable timeout
      signal: AbortSignal.timeout(30000), // 30 seconds
    });

    if (!response.ok) {
      return {
        status: "Lost",
        error: `HTTP ${response.status}`,
        httpStatus: response.status,
      };
    }

    const html = await response.text();

    // Parse HTML to find links
    // Simple regex-based approach (can be enhanced with proper HTML parser)
    const linkRegex = /<a\s+[^>]*href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi;
    const links: Array<{ href: string; text: string; rel?: string }> = [];

    let match;
    while ((match = linkRegex.exec(html)) !== null) {
      const href = match[1];
      const text = match[2].replace(/<[^>]*>/g, "").trim(); // Remove HTML tags from text
      
      // Extract rel attribute
      const tagContent = match[0];
      const relMatch = tagContent.match(/rel=["']([^"']+)["']/i);
      const rel = relMatch ? relMatch[1] : undefined;

      links.push({ href, text, rel });
    }

    // Check if any link points to target domain
    for (const link of links) {
      // Handle relative URLs
      let absoluteUrl = link.href;
      if (link.href.startsWith("/")) {
        const urlObj = new URL(url);
        absoluteUrl = `${urlObj.protocol}//${urlObj.host}${link.href}`;
      } else if (!link.href.startsWith("http")) {
        const urlObj = new URL(url);
        absoluteUrl = `${urlObj.protocol}//${urlObj.host}/${link.href}`;
      }

      // Check if link contains target domain
      if (absoluteUrl.includes(TARGET_DOMAIN)) {
        // Check if it's nofollow
        const isNofollow =
          link.rel?.toLowerCase().includes("nofollow") || false;

        // Check if it matches the specific target URL
        const matchesTarget = absoluteUrl.includes(
          targetUrl.replace("https://", "").replace("http://", "")
        );

        if (matchesTarget || absoluteUrl.includes(TARGET_DOMAIN)) {
          return {
            status: isNofollow ? "No-Follow" : "Active",
            linkType: isNofollow ? "nofollow" : "dofollow",
            anchorText: link.text || link.href,
            httpStatus: response.status,
          };
        }
      }
    }

    // Also check in meta tags and other places
    const metaRegex = /<(?:meta|link)\s+[^>]*(?:content|href)=["']([^"']+)["'][^>]*>/gi;
    while ((match = metaRegex.exec(html)) !== null) {
      const content = match[1];
      if (content.includes(TARGET_DOMAIN)) {
        return {
          status: "Active",
          linkType: "meta",
          anchorText: "Meta/Link tag",
          httpStatus: response.status,
        };
      }
    }

    // No backlink found
    return {
      status: "Lost",
      httpStatus: response.status,
    };
  } catch (error: any) {
    // Handle timeout and other errors
    if (error.name === "AbortError" || error.name === "TimeoutError") {
      return {
        status: "Lost",
        error: "Request timeout",
      };
    }

    return {
      status: "Lost",
      error: error.message || "Unknown error",
    };
  }
}

