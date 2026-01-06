/**
 * Web Vitals reporting
 * Tracks Core Web Vitals and reports them
 */

import { reportWebVitals } from "@/lib/performance";

/**
 * Web Vitals 指标接口
 * 符合 Web Vitals API 标准
 */
export interface WebVitalsMetric {
  /** 指标唯一标识符 */
  id: string;
  /** 指标名称 (CLS, FID, FCP, LCP, TTFB, INP) */
  name: string;
  /** 指标值 */
  value: number;
  /** 指标变化量 */
  delta: number;
  /** 性能评级 */
  rating: "good" | "needs-improvement" | "poor";
  /** 导航类型 (可选) */
  navigationType?: "navigate" | "reload" | "back-forward" | "prerender";
  /** 指标条目类型 (可选) */
  entries?: PerformanceEntry[];
}

export function onCLS(metric: WebVitalsMetric) {
  reportWebVitals({
    id: metric.id,
    name: "CLS",
    value: metric.value,
    delta: metric.delta,
    rating: metric.rating,
  });
}

export function onFID(metric: WebVitalsMetric) {
  reportWebVitals({
    id: metric.id,
    name: "FID",
    value: metric.value,
    delta: metric.delta,
    rating: metric.rating,
  });
}

export function onFCP(metric: WebVitalsMetric) {
  reportWebVitals({
    id: metric.id,
    name: "FCP",
    value: metric.value,
    delta: metric.delta,
    rating: metric.rating,
  });
}

export function onLCP(metric: WebVitalsMetric) {
  reportWebVitals({
    id: metric.id,
    name: "LCP",
    value: metric.value,
    delta: metric.delta,
    rating: metric.rating,
  });
}

export function onTTFB(metric: WebVitalsMetric) {
  reportWebVitals({
    id: metric.id,
    name: "TTFB",
    value: metric.value,
    delta: metric.delta,
    rating: metric.rating,
  });
}

export function onINP(metric: WebVitalsMetric) {
  reportWebVitals({
    id: metric.id,
    name: "INP",
    value: metric.value,
    delta: metric.delta,
    rating: metric.rating,
  });
}



