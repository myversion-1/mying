"use client";

import { useState, useEffect } from "react";
import { useWebVitals } from "../../components/web-vitals";

/**
 * Performance Dashboard Page
 * Development-only page for monitoring performance metrics
 */

interface MetricData {
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  timestamp: number;
  id: string;
}

interface PerformanceMetrics {
  LCP?: MetricData;
  FCP?: MetricData;
  CLS?: MetricData;
  TTFB?: MetricData;
  INP?: MetricData;
}

export default function PerformanceDashboard() {
  const [vitals, setVitals] = useState<PerformanceMetrics>({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Load web vitals from sessionStorage
    const loadVitals = () => {
      try {
        const stored = sessionStorage.getItem("web-vitals");
        if (stored) {
          setVitals(JSON.parse(stored));
        }
      } catch (error) {
        console.error("Failed to load web vitals:", error);
      }
    };

    loadVitals();

    // Refresh every 2 seconds
    const interval = setInterval(loadVitals, 2000);

    // Also listen to custom event from WebVitals component
    const handleVitalsUpdate = () => {
      loadVitals();
    };

    window.addEventListener("web-vitals-update", handleVitalsUpdate);

    return () => {
      clearInterval(interval);
      window.removeEventListener("web-vitals-update", handleVitalsUpdate);
    };
  }, []);

  const getRatingColor = (rating?: string) => {
    if (!rating) return "text-gray-400";
    if (rating === "good") return "text-green-500";
    if (rating === "needs-improvement") return "text-yellow-500";
    return "text-red-500";
  };

  const getRatingBg = (rating?: string) => {
    if (!rating) return "bg-gray-500/10";
    if (rating === "good") return "bg-green-500/10";
    if (rating === "needs-improvement") return "bg-yellow-500/10";
    return "bg-red-500/10";
  };

  const formatValue = (name: string, value?: number) => {
    if (value === undefined) return "N/A";
    if (name === "CLS") return value.toFixed(3);
    return `${Math.round(value)}ms`;
  };

  const getMetricEmoji = (name: string) => {
    const emojis: Record<string, string> = {
      LCP: "🎨",
      FCP: "🚀",
      CLS: "📐",
      TTFB: "🌐",
      INP: "🖱️",
    };
    return emojis[name] || "📊";
  };

  const getThresholds = (name: string) => {
    const thresholds: Record<string, { good: number; poor: number }> = {
      LCP: { good: 2500, poor: 4000 },
      FCP: { good: 1800, poor: 3000 },
      CLS: { good: 0.1, poor: 0.25 },
      TTFB: { good: 800, poor: 1800 },
      INP: { good: 200, poor: 500 },
    };
    return thresholds[name] || { good: 0, poor: 0 };
  };

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-[var(--accent-primary)] border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-[var(--text-secondary)]">Loading performance data...</p>
        </div>
      </div>
    );
  }

  const metrics: Array<keyof PerformanceMetrics> = ["LCP", "FCP", "CLS", "TTFB", "INP"];

  return (
    <div className="min-h-screen bg-[var(--background)] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
            Performance Dashboard
          </h1>
          <p className="text-[var(--text-secondary)]">
            Real-time Core Web Vitals monitoring (Development only)
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {metrics.map((metricName) => {
            const metric = vitals[metricName];
            const threshold = getThresholds(metricName);

            return (
              <div
                key={metricName}
                className={`rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6 transition-all hover:border-[var(--accent-primary)]/30`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getMetricEmoji(metricName)}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                        {metricName}
                      </h3>
                      <p className="text-xs text-[var(--text-tertiary)]">
                        {metricName === "LCP" && "Largest Contentful Paint"}
                        {metricName === "FCP" && "First Contentful Paint"}
                        {metricName === "CLS" && "Cumulative Layout Shift"}
                        {metricName === "TTFB" && "Time to First Byte"}
                        {metricName === "INP" && "Interaction to Next Paint"}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getRatingBg(metric?.rating)} ${getRatingColor(metric?.rating)}`}
                  >
                    {metric?.rating || "N/A"}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-3xl font-bold text-[var(--text-primary)]">
                    {formatValue(metricName, metric?.value)}
                  </div>
                </div>

                {/* Threshold indicators */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-[var(--text-tertiary)]">
                    <span>Good: &lt;{formatValue(metricName, threshold.good)}</span>
                    <span>Poor: &gt;{formatValue(metricName, threshold.poor)}</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        !metric
                          ? "bg-gray-600 w-0"
                          : metric.rating === "good"
                          ? "bg-green-500"
                          : metric.rating === "needs-improvement"
                          ? "bg-yellow-500 w-2/3"
                          : "bg-red-500 w-full"
                      }`}
                      style={{
                        width: metric
                          ? `${Math.min((metric.value / threshold.poor) * 100, 100)}%`
                          : "0%",
                      }}
                    />
                  </div>
                </div>

                {metric?.timestamp && (
                  <div className="mt-4 text-xs text-[var(--text-tertiary)]">
                    Last updated: {new Date(metric.timestamp).toLocaleTimeString()}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6">
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
            Quick Actions
          </h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => window.location.reload()}
              className="rounded-lg bg-[var(--action-primary)] px-6 py-3 font-semibold text-[var(--action-primary-text)] transition hover:bg-[var(--action-primary-hover)] min-h-[44px]"
            >
              Refresh Page
            </button>
            <button
              onClick={() => {
                sessionStorage.removeItem("web-vitals");
                window.location.reload();
              }}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-6 py-3 font-semibold text-[var(--text-primary)] transition hover:bg-[var(--surface-hover)] min-h-[44px]"
            >
              Clear Metrics
            </button>
            <a
              href="/"
              className="rounded-lg border border-[var(--accent-primary)] bg-transparent px-6 py-3 font-semibold text-[var(--accent-primary)] transition hover:bg-[var(--accent-primary)]/10 min-h-[44px] inline-block"
            >
              Back to Home
            </a>
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6">
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
            About Core Web Vitals
          </h2>
          <div className="space-y-4 text-sm text-[var(--text-secondary)]">
            <div>
              <strong className="text-[var(--text-primary)]">LCP (Largest Contentful Paint):</strong>{" "}
              Measures loading performance. Ideally, the largest content element should load within 2.5 seconds.
            </div>
            <div>
              <strong className="text-[var(--text-primary)]">FCP (First Contentful Paint):</strong>{" "}
              Measures when the first content is painted. Should be under 1.8 seconds.
            </div>
            <div>
              <strong className="text-[var(--text-primary)]">CLS (Cumulative Layout Shift):</strong>{" "}
              Measures visual stability. Should be less than 0.1.
            </div>
            <div>
              <strong className="text-[var(--text-primary)]">TTFB (Time to First Byte):</strong>{" "}
              Measures server response time. Should be under 800ms.
            </div>
            <div>
              <strong className="text-[var(--text-primary)]">INP (Interaction to Next Paint):</strong>{" "}
              Measures responsiveness to user input. Should be under 200ms.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
