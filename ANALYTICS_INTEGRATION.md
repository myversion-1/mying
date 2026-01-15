# Analytics and Conversion Tracking Infrastructure

## Overview

This document describes the analytics and conversion tracking infrastructure implemented in the Miying Web codebase. The system is designed to track user behavior, conversion events, and prepare for future heatmap and A/B testing integration.

## Architecture

### Core Components

1. **`src/lib/analytics.ts`** - Unified tracking system
   - Multi-provider support (Google Analytics, Vercel Analytics, Console)
   - Type-safe event tracking
   - Extensible provider interface

2. **`src/components/AnalyticsProvider.tsx`** - Automatic tracking wrapper
   - Page view tracking
   - Scroll depth monitoring
   - Page exit tracking

3. **`src/lib/ab-testing.ts`** - A/B testing utilities
   - Experiment management
   - Variant selection
   - Exposure tracking

## Tracked Events

### CTA Clicks
- **Event Type**: `cta_click`
- **Category**: `conversion`
- **Tracked Locations**:
  - Header navigation
  - Hero section
  - Product cards
  - Service cards
  - Footer
  - Sticky CTA blocks

**Data Captured**:
- CTA text
- CTA location
- Destination URL
- Page path
- Section identifier

### Form Events
- **Event Types**: `form_start`, `form_submit`, `form_abandon`
- **Category**: `form`
- **Tracked Forms**:
  - Contact form
  - Quote form
  - Quick quote form
  - Lead magnet form

**Data Captured**:
- Form type
- Form ID
- Success/failure status
- Fields filled (for abandonment tracking)
- Completion rate

### Page Events
- **Event Types**: `page_view`, `page_exit`, `scroll_depth`
- **Category**: `navigation` / `engagement`
- **Automatically Tracked**:
  - All page views
  - Scroll depth (25%, 50%, 75%, 100%)
  - Time on page
  - Exit points

## Integration Points

### Google Analytics 4

To enable Google Analytics, set the environment variable:
```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

The system will automatically send events to GA4 using the `gtag` function.

### Vercel Analytics

Vercel Analytics is automatically enabled and tracks page views. Custom events can be added via the Vercel Analytics API.

### Custom Analytics Providers

To add a new analytics provider:

1. Implement the `AnalyticsProvider` interface in `src/lib/analytics.ts`
2. Add the provider to the `AnalyticsTracker` constructor
3. Events will automatically be sent to all configured providers

Example:
```typescript
class CustomAnalyticsProvider implements AnalyticsProvider {
  trackEvent(event: TrackingEvent): void {
    // Send to your analytics service
  }
  // ... implement other methods
}
```

## Heatmap Integration

### Data Attributes

Components are structured with data attributes for easy heatmap tool targeting:

- `data-element-id`: Unique identifier for the element
- `data-section`: Section identifier (e.g., "hero", "product_grid")
- `data-cta-location`: CTA location identifier

### Supported Tools

The codebase is prepared for integration with:
- **Hotjar**: Uses data attributes and standard HTML structure
- **Microsoft Clarity**: Automatically captures interactions
- **FullStory**: Compatible with React component structure
- **LogRocket**: Works with standard event tracking

### Integration Steps

1. Add the heatmap tool script to `src/app/layout.tsx`
2. Configure the tool to track:
   - CTA clicks (via `data-cta-location` attributes)
   - Form interactions (via form IDs)
   - Scroll depth (already tracked via analytics)

Example Hotjar integration:
```typescript
// In layout.tsx
<Script id="hotjar" strategy="afterInteractive">
  {`
    (function(h,o,t,j,a,r){
      h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
      h._hjSettings={hjid:YOUR_HOTJAR_ID,hjsv:6};
      a=o.getElementsByTagName('head')[0];
      r=o.createElement('script');r.async=1;
      r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
      a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
  `}
</Script>
```

## A/B Testing Integration

### Component Structure

Components are designed with data attributes for A/B testing:

```typescript
// Example: Hero CTA button
<Link
  href="/quote"
  data-experiment="hero_cta_text"
  data-variant="control"
  data-element-id="hero-primary-cta"
  onClick={handleClick}
>
  Get a Quote
</Link>
```

### Supported Platforms

- **Optimizely**: Use data attributes for targeting
- **VWO**: Compatible with React component structure
- **Google Optimize**: Works with standard event tracking
- **Custom Solutions**: Use `getABTestAttributes()` utility

### Integration Steps

1. Add A/B testing platform script to `src/app/layout.tsx`
2. Use `getABTestAttributes()` in components:
```typescript
import { getABTestAttributes } from "../lib/ab-testing";

const abAttrs = getABTestAttributes("hero_cta_text", "hero-primary-cta");
<Link {...abAttrs} href="/quote">Get a Quote</Link>
```

3. Track experiment exposure:
```typescript
import { trackExperimentExposure } from "../lib/ab-testing";

useEffect(() => {
  const variant = getVariant("hero_cta_text");
  trackExperimentExposure("hero_cta_text", variant);
}, []);
```

## Event Schema

### CTA Click Event
```typescript
{
  type: "cta_click",
  category: "conversion",
  label: "Get a Quote",
  ctaText: "Get a Quote",
  ctaLocation: "header",
  destination: "/quote",
  page: "/products",
  section: "header",
  element: "header-cta-button"
}
```

### Form Submit Event
```typescript
{
  type: "form_submit",
  category: "form",
  label: "contact_success",
  formType: "contact",
  success: true,
  fields: {
    hasPhone: true,
    hasCountry: false,
    hasMessage: true
  },
  page: "/contact"
}
```

### Scroll Depth Event
```typescript
{
  type: "scroll_depth",
  category: "engagement",
  depth: 75,
  timeToDepth: 45000,
  page: "/products",
  label: "scroll_75%"
}
```

## Best Practices

1. **Always track CTA clicks**: Every CTA button should have tracking
2. **Track form abandonment**: Monitor where users drop off in forms
3. **Use consistent naming**: Use standardized event labels and categories
4. **Include context**: Always include page, section, and element identifiers
5. **Test in development**: Use console provider to verify events in development

## Future Enhancements

- [ ] Session recording integration
- [ ] Advanced funnel analysis
- [ ] Real-time conversion tracking dashboard
- [ ] Automated A/B test result analysis
- [ ] Heatmap overlay component for internal use


















