/**
 * Web Vitals reporting
 * Tracks Core Web Vitals and reports them
 */

import { reportWebVitals } from "@/lib/performance";

export function onCLS(metric: any) {
  reportWebVitals({
    id: metric.id,
    name: "CLS",
    value: metric.value,
    delta: metric.delta,
    rating: metric.rating,
  });
}

export function onFID(metric: any) {
  reportWebVitals({
    id: metric.id,
    name: "FID",
    value: metric.value,
    delta: metric.delta,
    rating: metric.rating,
  });
}

export function onFCP(metric: any) {
  reportWebVitals({
    id: metric.id,
    name: "FCP",
    value: metric.value,
    delta: metric.delta,
    rating: metric.rating,
  });
}

export function onLCP(metric: any) {
  reportWebVitals({
    id: metric.id,
    name: "LCP",
    value: metric.value,
    delta: metric.delta,
    rating: metric.rating,
  });
}

export function onTTFB(metric: any) {
  reportWebVitals({
    id: metric.id,
    name: "TTFB",
    value: metric.value,
    delta: metric.delta,
    rating: metric.rating,
  });
}

export function onINP(metric: any) {
  reportWebVitals({
    id: metric.id,
    name: "INP",
    value: metric.value,
    delta: metric.delta,
    rating: metric.rating,
  });
}



