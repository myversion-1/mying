/**
 * A/B Testing Infrastructure
 * 
 * Provides utilities for A/B testing integration.
 * Structured to work with platforms like Optimizely, VWO, Google Optimize, etc.
 * 
 * Components are designed with data attributes for easy targeting.
 */

/**
 * Experiment configuration
 */
export interface Experiment {
  id: string;
  name: string;
  variants: string[];
  active: boolean;
}

/**
 * Get current variant for an experiment
 * In production, this would integrate with your A/B testing platform
 */
export function getVariant(experimentId: string, defaultVariant: string = "control"): string {
  if (typeof window === "undefined") {
    return defaultVariant;
  }

  // Check if variant is stored in sessionStorage (for consistency)
  const stored = sessionStorage.getItem(`ab_test_${experimentId}`);
  if (stored) {
    return stored;
  }

  // In production, this would call your A/B testing platform API
  // For now, return default variant
  return defaultVariant;
}

/**
 * Set variant for an experiment
 */
export function setVariant(experimentId: string, variant: string): void {
  if (typeof window === "undefined") {
    return;
  }

  sessionStorage.setItem(`ab_test_${experimentId}`, variant);
}

/**
 * Track experiment exposure
 */
export function trackExperimentExposure(experimentId: string, variant: string): void {
  if (typeof window === "undefined") {
    return;
  }

  // Track in analytics
  if ((window as any).gtag) {
    (window as any).gtag("event", "experiment_exposure", {
      experiment_id: experimentId,
      variant: variant,
    });
  }
}

/**
 * Get data attributes for A/B testing
 * Components should use these attributes for easy targeting
 */
export function getABTestAttributes(experimentId: string, elementId: string): Record<string, string> {
  const variant = getVariant(experimentId);
  
  return {
    "data-experiment": experimentId,
    "data-variant": variant,
    "data-element-id": elementId,
  };
}



