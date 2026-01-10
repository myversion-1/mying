/**
 * Analytics and Conversion Tracking Infrastructure
 * 
 * Unified tracking system for:
 * - CTA clicks
 * - Form submissions
 * - Page-level drop-off points
 * - Conversion events
 * 
 * Structured for future integration with:
 * - Heatmap tools (Hotjar, Microsoft Clarity, etc.)
 * - A/B testing platforms (Optimizely, VWO, etc.)
 */

// Event types for type safety
export type TrackingEventType =
  | "cta_click"
  | "form_submit"
  | "form_start"
  | "form_abandon"
  | "page_view"
  | "page_exit"
  | "scroll_depth"
  | "time_on_page"
  | "download"
  | "video_play"
  | "product_view"
  | "category_view"
  | "search"
  | "filter_apply";

// Event categories for organization
export type EventCategory =
  | "conversion"
  | "engagement"
  | "navigation"
  | "form"
  | "product"
  | "content";

// Base event structure
export interface TrackingEvent {
  type: TrackingEventType;
  category: EventCategory;
  label?: string;
  value?: number;
  // Contextual data
  page?: string;
  section?: string;
  element?: string;
  // User context
  userId?: string;
  sessionId?: string;
  // Custom properties
  properties?: Record<string, unknown>;
}

// CTA-specific event
export interface CTAClickEvent extends TrackingEvent {
  type: "cta_click";
  category: "conversion";
  ctaText: string;
  ctaLocation: string; // "header", "hero", "product", etc.
  destination?: string;
}

// Form-specific event
export interface FormEvent extends TrackingEvent {
  type: "form_submit" | "form_start" | "form_abandon";
  category: "form";
  formType: string; // "contact", "quote", "lead-magnet", etc.
  formId?: string;
  fields?: Record<string, unknown>;
}

// Page view event
export interface PageViewEvent extends TrackingEvent {
  type: "page_view";
  category: "navigation";
  pagePath: string;
  pageTitle?: string;
  referrer?: string;
  timeOnPage?: number;
}

// Scroll depth event
export interface ScrollDepthEvent extends TrackingEvent {
  type: "scroll_depth";
  category: "engagement";
  depth: number; // 25, 50, 75, 100
  timeToDepth?: number;
}

/**
 * Analytics Provider Interface
 * Allows easy switching between analytics services
 */
export interface AnalyticsProvider {
  trackEvent(event: TrackingEvent): void;
  trackPageView(event: PageViewEvent): void;
  identifyUser(userId: string, traits?: Record<string, unknown>): void;
  setUserProperties(properties: Record<string, unknown>): void;
}

/**
 * Google Analytics 4 Provider
 */
class GoogleAnalyticsProvider implements AnalyticsProvider {
  private gtag?: (
    command: string,
    targetId: string | Date,
    config?: Record<string, unknown>
  ) => void;

  constructor() {
    if (typeof window !== "undefined") {
      this.gtag = (window as any).gtag;
    }
  }

  trackEvent(event: TrackingEvent): void {
    if (!this.gtag) return;

    const eventParams: Record<string, unknown> = {
      event_category: event.category,
      ...(event.label && { event_label: event.label }),
      ...(event.value && { value: event.value }),
      ...(event.page && { page_path: event.page }),
      ...(event.section && { section: event.section }),
      ...(event.element && { element: event.element }),
      ...(event.properties || {}),
    };

    this.gtag("event", event.type, eventParams);
  }

  trackPageView(event: PageViewEvent): void {
    if (!this.gtag) return;

    this.gtag("config", process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXXXXX", {
      page_path: event.pagePath,
      page_title: event.pageTitle,
    });
  }

  identifyUser(userId: string, traits?: Record<string, unknown>): void {
    if (!this.gtag) return;

    this.gtag("set", "user_id", userId);
    if (traits) {
      this.gtag("set", "user_properties", traits);
    }
  }

  setUserProperties(properties: Record<string, unknown>): void {
    if (!this.gtag) return;

    this.gtag("set", "user_properties", properties);
  }
}

/**
 * Vercel Analytics Provider
 * Uses Vercel's built-in analytics
 */
class VercelAnalyticsProvider implements AnalyticsProvider {
  trackEvent(event: TrackingEvent): void {
    // Vercel Analytics automatically tracks page views
    // Custom events can be sent via their API if needed
    if (process.env.NODE_ENV === "development") {
      console.log("[Vercel Analytics] Event:", event);
    }
  }

  trackPageView(event: PageViewEvent): void {
    // Vercel Analytics handles this automatically
    if (process.env.NODE_ENV === "development") {
      console.log("[Vercel Analytics] Page View:", event);
    }
  }

  identifyUser(userId: string, traits?: Record<string, unknown>): void {
    if (process.env.NODE_ENV === "development") {
      console.log("[Vercel Analytics] Identify:", userId, traits);
    }
  }

  setUserProperties(properties: Record<string, unknown>): void {
    if (process.env.NODE_ENV === "development") {
      console.log("[Vercel Analytics] User Properties:", properties);
    }
  }
}

/**
 * Console Provider (for development)
 */
class ConsoleProvider implements AnalyticsProvider {
  trackEvent(event: TrackingEvent): void {
    console.log("[Analytics] Event:", event);
  }

  trackPageView(event: PageViewEvent): void {
    console.log("[Analytics] Page View:", event);
  }

  identifyUser(userId: string, traits?: Record<string, unknown>): void {
    console.log("[Analytics] Identify:", userId, traits);
  }

  setUserProperties(properties: Record<string, unknown>): void {
    console.log("[Analytics] User Properties:", properties);
  }
}

/**
 * Multi-provider analytics tracker
 * Sends events to all configured providers
 */
class AnalyticsTracker {
  private providers: AnalyticsProvider[] = [];

  constructor() {
    // Initialize providers based on environment
    if (typeof window !== "undefined") {
      // Google Analytics (if configured)
      if (process.env.NEXT_PUBLIC_GA_ID) {
        this.providers.push(new GoogleAnalyticsProvider());
      }

      // Vercel Analytics (always available)
      this.providers.push(new VercelAnalyticsProvider());
    }

    // Console provider for development
    if (process.env.NODE_ENV === "development") {
      this.providers.push(new ConsoleProvider());
    }
  }

  /**
   * Track a custom event
   */
  track(event: TrackingEvent): void {
    this.providers.forEach((provider) => {
      try {
        provider.trackEvent(event);
      } catch (error) {
        console.error("Analytics tracking error:", error);
      }
    });
  }

  /**
   * Track CTA click
   */
  trackCTAClick(params: {
    ctaText: string;
    ctaLocation: string;
    destination?: string;
    page?: string;
    section?: string;
    element?: string;
    productName?: string;
    serviceName?: string;
  }): void {
    const event: CTAClickEvent = {
      type: "cta_click",
      category: "conversion",
      label: params.ctaText,
      ctaText: params.ctaText,
      ctaLocation: params.ctaLocation,
      destination: params.destination,
      page: params.page || (typeof window !== "undefined" ? window.location.pathname : ""),
      section: params.section,
      element: params.element || params.productName || params.serviceName,
    };

    this.track(event);
  }

  /**
   * Track form submission
   */
  trackFormSubmit(params: {
    formType: string;
    formId?: string;
    success: boolean;
    fields?: Record<string, unknown>;
    page?: string;
  }): void {
    const event: FormEvent = {
      type: "form_submit",
      category: "form",
      label: `${params.formType}_${params.success ? "success" : "error"}`,
      formType: params.formType,
      formId: params.formId,
      fields: params.fields,
      page: params.page || (typeof window !== "undefined" ? window.location.pathname : ""),
      value: params.success ? 1 : 0,
    };

    this.track(event);
  }

  /**
   * Track form start
   */
  trackFormStart(params: {
    formType: string;
    formId?: string;
    page?: string;
  }): void {
    const event: FormEvent = {
      type: "form_start",
      category: "form",
      label: `${params.formType}_start`,
      formType: params.formType,
      formId: params.formId,
      page: params.page || (typeof window !== "undefined" ? window.location.pathname : ""),
    };

    this.track(event);
  }

  /**
   * Track form abandonment
   */
  trackFormAbandon(params: {
    formType: string;
    formId?: string;
    fieldsFilled?: number;
    totalFields?: number;
    page?: string;
  }): void {
    const event: FormEvent = {
      type: "form_abandon",
      category: "form",
      label: `${params.formType}_abandon`,
      formType: params.formType,
      formId: params.formId,
      page: params.page || (typeof window !== "undefined" ? window.location.pathname : ""),
      properties: {
        fieldsFilled: params.fieldsFilled,
        totalFields: params.totalFields,
        completionRate: params.fieldsFilled && params.totalFields
          ? (params.fieldsFilled / params.totalFields) * 100
          : 0,
      },
    };

    this.track(event);
  }

  /**
   * Track page view
   */
  trackPageView(params: {
    pagePath: string;
    pageTitle?: string;
    referrer?: string;
  }): void {
    const event: PageViewEvent = {
      type: "page_view",
      category: "navigation",
      pagePath: params.pagePath,
      pageTitle: params.pageTitle,
      referrer: params.referrer,
    };

    this.providers.forEach((provider) => {
      try {
        provider.trackPageView(event);
      } catch (error) {
        console.error("Page view tracking error:", error);
      }
    });
  }

  /**
   * Track scroll depth
   */
  trackScrollDepth(params: {
    depth: number;
    timeToDepth?: number;
    page?: string;
  }): void {
    const event: ScrollDepthEvent = {
      type: "scroll_depth",
      category: "engagement",
      depth: params.depth,
      timeToDepth: params.timeToDepth,
      page: params.page || (typeof window !== "undefined" ? window.location.pathname : ""),
      label: `scroll_${params.depth}%`,
    };

    this.track(event);
  }

  /**
   * Track page exit
   */
  trackPageExit(params: {
    page?: string;
    timeOnPage?: number;
    scrollDepth?: number;
  }): void {
    const event: TrackingEvent = {
      type: "page_exit",
      category: "engagement",
      page: params.page || (typeof window !== "undefined" ? window.location.pathname : ""),
      value: params.timeOnPage,
      properties: {
        timeOnPage: params.timeOnPage,
        scrollDepth: params.scrollDepth,
      },
    };

    this.track(event);
  }

  /**
   * Identify user
   */
  identifyUser(userId: string, traits?: Record<string, unknown>): void {
    this.providers.forEach((provider) => {
      try {
        provider.identifyUser(userId, traits);
      } catch (error) {
        console.error("User identification error:", error);
      }
    });
  }

  /**
   * Set user properties
   */
  setUserProperties(properties: Record<string, unknown>): void {
    this.providers.forEach((provider) => {
      try {
        provider.setUserProperties(properties);
      } catch (error) {
        console.error("User properties error:", error);
      }
    });
  }
}

// Singleton instance
export const analytics = new AnalyticsTracker();

// Convenience functions for common tracking scenarios
export const trackCTAClick = analytics.trackCTAClick.bind(analytics);
export const trackFormSubmit = analytics.trackFormSubmit.bind(analytics);
export const trackFormStart = analytics.trackFormStart.bind(analytics);
export const trackFormAbandon = analytics.trackFormAbandon.bind(analytics);
export const trackPageView = analytics.trackPageView.bind(analytics);
export const trackScrollDepth = analytics.trackScrollDepth.bind(analytics);
export const trackPageExit = analytics.trackPageExit.bind(analytics);

