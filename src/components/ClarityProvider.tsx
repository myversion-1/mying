/**
 * Microsoft Clarity Provider
 * 
 * Integrates Microsoft Clarity for heatmaps, session recordings, and user behavior analytics.
 * 
 * Uses the traditional script tag method for better compatibility and reliability.
 * 
 * Project ID: v0r0wchwpj
 * 
 * Setup:
 * 1. Project ID is configured by default: v0r0wchwpj
 * 2. To use a different ID, set NEXT_PUBLIC_CLARITY_ID environment variable
 * 3. Clarity will automatically start tracking
 */

"use client";

import { useEffect } from "react";

export function ClarityProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Use environment variable if set, otherwise use default project ID
    const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID || "v0r0wchwpj";

    // Check if Clarity is already loaded
    if (typeof window !== "undefined" && (window as any).clarity) {
      return; // Already initialized
    }

    // Load Clarity using traditional script tag method (more reliable)
    // This matches the official Clarity installation code
    let clarityScript: HTMLScriptElement | null = null;
    
    (function (c: any, l: Document, a: string, r: string, i: string, t: HTMLScriptElement | null, y: HTMLScriptElement | null) {
      c[a] = c[a] || function () {
        (c[a].q = c[a].q || []).push(arguments);
      };
      t = l.createElement(r) as HTMLScriptElement;
      t.async = 1;
      t.src = "https://www.clarity.ms/tag/" + i;
      clarityScript = t; // Store reference for cleanup
      y = l.getElementsByTagName(r)[0] as HTMLScriptElement;
      if (y && y.parentNode) {
        y.parentNode.insertBefore(t, y);
      } else {
        l.head.appendChild(t);
      }
    })(window, document, "clarity", "script", clarityId, null, null);

    if (process.env.NODE_ENV === "development") {
      console.log("[Clarity] Initialized with ID:", clarityId);
    }

    // Cleanup function (optional - Clarity typically doesn't need cleanup)
    return () => {
      // Note: In most cases, Clarity script should remain loaded
      // Only remove if explicitly needed (e.g., for testing)
      if (clarityScript && clarityScript.parentNode) {
        // Uncomment if cleanup is needed:
        // clarityScript.parentNode.removeChild(clarityScript);
      }
    };
  }, []);

  return <>{children}</>;
}

