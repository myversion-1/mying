"use client";

import { useEffect, useState } from "react";
import type { Metric } from "web-vitals";

/**
 * Web Vitals Performance Monitoring Component
 *
 * Tracks Core Web Vitals and sends to analytics:
 * - LCP (Largest Contentful Paint) - Loading performance
 * - FID (First Input Delay) - Interactivity
 * - CLS (Cumulative Layout Shift) - Visual stability
 * - FCP (First Contentful Paint) - Loading performance
 * - TTFB (Time to First Byte) - Server response time
 * - INP (Interaction to Next Paint) - Interactivity (replaces FID)
 */

interface WebVitalsProps {
  /**
   * Whether to show debug overlay in development
   * @default false
   */
  debug?: boolean;
}

/**
 * Web Vitals component for performance monitoring
 * Place this in your layout.tsx to track performance
 */
export function WebVitals({ debug = false }: WebVitalsProps) {
  useEffect(() => {
    // Only run in browser
    if (typeof window === "undefined") return;

    // Dynamic import web-vitals to reduce bundle size
    let isLoaded = false;

    const loadWebVitals = async () => {
      if (isLoaded) return;
      isLoaded = true;

      try {
        const { onCLS, onFCP, onLCP, onTTFB, onINP } = await import("web-vitals");

        // Track Cumulative Layout Shift (CLS)
        onCLS((metric) => {
          handleMetric(metric);
          if (debug) showDebugOverlay(metric);
        });

        // Track First Contentful Paint (FCP)
        onFCP((metric) => {
          handleMetric(metric);
          if (debug) showDebugOverlay(metric);
        });

        // Track Largest Contentful Paint (LCP)
        onLCP((metric) => {
          handleMetric(metric);
          if (debug) showDebugOverlay(metric);
        });

        // Track Time to First Byte (TTFB)
        onTTFB((metric) => {
          handleMetric(metric);
          if (debug) showDebugOverlay(metric);
        });

        // Track Interaction to Next Paint (INP)
        onINP((metric) => {
          handleMetric(metric);
          if (debug) showDebugOverlay(metric);
        });
      } catch (error) {
        console.error("Failed to load web-vitals:", error);
      }
    };

    // Load web-vitals after page is interactive
    if (document.readyState === "complete") {
      loadWebVitals();
    } else {
      window.addEventListener("load", loadWebVitals);
    }

    return () => {
      window.removeEventListener("load", loadWebVitals);
    };
  }, [debug]);

  /**
   * Handle metric - send to analytics and console
   */
  const handleMetric = (metric: Metric) => {
    // Send to Vercel Analytics
    if (process.env.NODE_ENV === "production") {
      // @ts-ignore - Vercel Analytics is loaded globally
      if (window.va) {
        // @ts-ignore
        window.va("event", {
          name: metric.name,
          value: Math.round(metric.value),
          label: metric.rating,
        });
      }
    }

    // Log to console in development
    if (process.env.NODE_ENV === "development") {
      const emoji = getMetricEmoji(metric.name);
      const rating = getRatingColor(metric.rating);
      console.log(
        `%c${emoji} ${metric.name}`,
        `color: ${rating}; font-weight: bold; font-size: 12px;`,
        `${metric.value.toFixed(0)}ms (${metric.rating})`,
        metric
      );
    }

    // Store in sessionStorage for debugging
    try {
      const vitals = JSON.parse(sessionStorage.getItem("web-vitals") || "{}");
      vitals[metric.name] = {
        value: metric.value,
        rating: metric.rating,
        timestamp: Date.now(),
        id: metric.id,
      };
      sessionStorage.setItem("web-vitals", JSON.stringify(vitals));

      // Dispatch custom event for other components to listen
      window.dispatchEvent(new CustomEvent("web-vitals-update", { detail: vitals }));
    } catch {
      // Ignore sessionStorage errors
    }
  };

  /**
   * Show debug overlay in development
   */
  const showDebugOverlay = (metric: Metric) => {
    if (process.env.NODE_ENV !== "development") return;

    const existing = document.getElementById("web-vitals-debug");
    if (existing) {
      existing.remove();
    }

    const overlay = document.createElement("div");
    overlay.id = "web-vitals-debug";
    overlay.style.cssText = `
      position: fixed;
      bottom: 10px;
      right: 10px;
      background: rgba(0, 0, 0, 0.9);
      color: white;
      padding: 8px 12px;
      border-radius: 4px;
      font-family: monospace;
      font-size: 12px;
      z-index: 9999;
      pointer-events: none;
    `;

    const emoji = getMetricEmoji(metric.name);
    const rating = getRatingColor(metric.rating);
    const formattedValue = formatMetricValue(metric.name, metric.value);

    overlay.innerHTML = `
      <div style="display: flex; align-items: center; gap: 8px;">
        <span style="font-size: 16px;">${emoji}</span>
        <div>
          <div style="font-weight: bold; color: ${rating}">${metric.name}</div>
          <div>${formattedValue} (${metric.rating})</div>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    // Auto-remove after 3 seconds
    setTimeout(() => {
      overlay.remove();
    }, 3000);
  };

  return null; // This component doesn't render anything
}

/**
 * Get emoji for metric type
 */
function getMetricEmoji(name: string): string {
  const emojis: Record<string, string> = {
    LCP: "🎨",
    FID: "⚡",
    CLS: "📐",
    FCP: "🚀",
    TTFB: "🌐",
    INP: "🖱️",
  };
  return emojis[name] || "📊";
}

/**
 * Get color for rating
 */
function getRatingColor(rating: string): string {
  const colors: Record<string, string> = {
    good: "#4ade80", // green
    "needs-improvement": "#fbbf24", // yellow
    poor: "#f87171", // red
  };
  return colors[rating] || "#ffffff";
}

/**
 * Format metric value based on unit
 */
function formatMetricValue(name: string, value: number): string {
  // CLS is unitless (score), others are in milliseconds
  if (name === "CLS") {
    return value.toFixed(3);
  }
  return `${Math.round(value)}ms`;
}

/**
 * Hook to get stored web vitals
 */
export function useWebVitals() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const vitals = sessionStorage.getItem("web-vitals");
    return vitals ? JSON.parse(vitals) : null;
  } catch {
    return null;
  }
}

/**
 * Web Vitals debug panel component
 * Shows all metrics in a nice UI
 * Hidden by default, toggles on click
 */
export function WebVitalsDebugPanel() {
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  const [isOpen, setIsOpen] = useState(false);
  const vitals = useWebVitals();

  // If no vitals yet, show a collapsed loading indicator
  if (!vitals) {
    return (
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 bg-black/90 text-white px-3 py-2 rounded-lg text-xs font-mono z-50 hover:bg-black/80 transition-colors cursor-pointer"
        title="Click to toggle Web Vitals"
      >
        <span className="flex items-center gap-2">
          <span>📊</span>
          <span>Web Vitals</span>
        </span>
      </button>
    );
  }

  const metrics = ["LCP", "FCP", "CLS", "TTFB", "INP"] as const;

  return (
    <div className="fixed bottom-4 right-4 z-50 shadow-xl">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-black/90 text-white px-3 py-2 rounded-t-lg text-xs font-mono hover:bg-black/80 transition-colors cursor-pointer flex items-center gap-2"
        title="Click to toggle Web Vitals"
      >
        <span>📊</span>
        <span>Core Web Vitals</span>
        <span className="ml-auto">{isOpen ? "▼" : "▲"}</span>
      </button>

      {/* Collapsible Panel */}
      {isOpen && (
        <div className="bg-black/90 text-white p-4 rounded-b-lg text-xs font-mono max-w-xs">
          <div className="space-y-2">
            {metrics.map((name) => {
              const metric = vitals[name];
              if (!metric) return null;

              const emoji = getMetricEmoji(name);
              const rating = getRatingColor(metric.rating);
              const value = formatMetricValue(name, metric.value);

              return (
                <div key={name} className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-1">
                    <span>{emoji}</span>
                    <span className="font-semibold">{name}</span>
                  </span>
                  <div className="text-right">
                    <div style={{ color: rating }} className="font-bold">
                      {value}
                    </div>
                    <div className="text-[10px] text-gray-400 capitalize">
                      {metric.rating}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
