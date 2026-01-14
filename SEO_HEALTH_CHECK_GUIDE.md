# SEO Health Check Guide

## Overview

This project includes a comprehensive SEO health check tool that provides website health analysis similar to SEMrush, Ahrefs, and Moz. The tool checks technical SEO, content SEO, performance, structured data, and mobile-friendliness.

## Features

### 1. Technical SEO Checks
- ✅ robots.txt validation
- ✅ sitemap.xml validation
- ✅ URL structure analysis
- ✅ HTTPS/SSL verification
- ✅ Canonical URLs

### 2. Content SEO Checks
- ✅ Title tag optimization (length, uniqueness)
- ✅ Meta description optimization (length, uniqueness)
- ✅ H1 tag presence and count
- ✅ Image alt text analysis
- ✅ Internal/external link analysis
- ✅ Content length analysis

### 3. Structured Data Validation
- ✅ JSON-LD schema validation
- ✅ Schema.org compliance
- ✅ Multiple schema types support

### 4. Performance Analysis
- ✅ Page load time
- ✅ Core Web Vitals (LCP, FID, CLS)
- ✅ Mobile performance

### 5. Mobile-Friendliness
- ✅ Viewport configuration
- ✅ Touch target sizes
- ✅ Text readability
- ✅ Responsive design

### 6. Third-Party API Integration
- ✅ SEMrush API integration
- ✅ Ahrefs API integration
- ✅ Moz API integration

## Usage

### Access the Dashboard

1. **Via Admin Interface:**
   ```
   http://localhost:3000/admin/seo-health
   ```

2. **Via API Endpoint:**
   ```
   GET /api/seo-health?domain=https://www.miyingrides.com&includeThirdParty=true
   ```

### API Parameters

- `domain` (optional): Domain to check (default: `https://www.miyingrides.com`)
- `pages` (optional): Comma-separated list of pages to check (e.g., `/,/products,/about`)
- `includeThirdParty` (optional): Include third-party API data (default: `false`)

### Example API Request

```bash
curl "http://localhost:3000/api/seo-health?domain=https://www.miyingrides.com&includeThirdParty=true"
```

## Third-Party API Configuration

### SEMrush API

1. **Get API Key:**
   - Sign up at [SEMrush](https://www.semrush.com/)
   - Navigate to API settings
   - Generate API key

2. **Configure Environment Variables:**
   ```env
   SEMRUSH_API_KEY=your_api_key_here
   SEMRUSH_API_SECRET=your_api_secret_here  # Optional
   ```

### Ahrefs API

1. **Get API Key:**
   - Sign up at [Ahrefs](https://ahrefs.com/)
   - Navigate to API settings
   - Generate API key

2. **Configure Environment Variables:**
   ```env
   AHREFS_API_KEY=your_api_key_here
   AHREFS_API_SECRET=your_api_secret_here  # Optional
   ```

### Moz API

1. **Get API Credentials:**
   - Sign up at [Moz](https://moz.com/)
   - Navigate to API settings
   - Get Access ID and Secret Key

2. **Configure Environment Variables:**
   ```env
   MOZ_ACCESS_ID=your_access_id_here
   MOZ_SECRET_KEY=your_secret_key_here
   ```

## Health Check Scoring

### Score Calculation

- **Overall Score:** Weighted average of all check categories
  - Technical SEO: 30% weight
  - Content SEO: 70% weight
  - Performance: Included when available
  - Structured Data: Included when available
  - Mobile: Included when available

### Issue Severity

- **Error (Critical):** -10 points per issue
  - Missing robots.txt
  - Missing sitemap.xml
  - Missing title tags
  - Missing H1 tags

- **Warning:** -5 points per issue
  - Short/long title tags
  - Short/long meta descriptions
  - Multiple H1 tags
  - Missing alt text

- **Info:** -2 points per issue
  - Optimization suggestions
  - Best practice recommendations

### Score Ranges

- **80-100:** Excellent (Pass)
- **60-79:** Good (Warning)
- **0-59:** Needs Improvement (Fail)

## Report Structure

```typescript
{
  overallScore: number,           // 0-100
  domain: string,
  checkedAt: string,
  technicalSEO: {
    status: "pass" | "warning" | "fail",
    score: number,
    issues: SEOIssue[],
    lastChecked: string
  },
  contentSEO: {
    status: "pass" | "warning" | "fail",
    score: number,
    metrics: {...},
    issues: SEOIssue[],
    lastChecked: string
  },
  performance: {...},
  structuredData: {...},
  mobile: {...},
  thirdParty: {
    semrush: {...},
    ahrefs: {...},
    moz: {...}
  },
  summary: {
    totalIssues: number,
    criticalIssues: number,
    warnings: number,
    recommendations: string[]
  }
}
```

## Common Issues and Fixes

### 1. Missing robots.txt

**Issue:** `robots.txt not found or inaccessible`

**Fix:**
- Ensure `src/app/robots.ts` exists
- Verify it's accessible at `/robots.txt`
- Check Next.js build output

### 2. Missing sitemap.xml

**Issue:** `sitemap.xml not found or inaccessible`

**Fix:**
- Ensure `src/app/sitemap.ts` exists
- Verify it's accessible at `/sitemap.xml`
- Check Next.js build output

### 3. Title Tag Issues

**Issue:** `Title tag is too short/long`

**Fix:**
- Optimize title tags to 50-60 characters
- Include primary keyword
- Make titles unique per page

### 4. Meta Description Issues

**Issue:** `Meta description is too short/long`

**Fix:**
- Optimize meta descriptions to 120-160 characters
- Include call-to-action
- Make descriptions unique per page

### 5. Missing H1 Tags

**Issue:** `Missing H1 tag`

**Fix:**
- Add a single H1 tag per page
- Include primary keyword
- Make H1 descriptive and unique

### 6. Missing Alt Text

**Issue:** `Images missing alt text`

**Fix:**
- Add descriptive alt text to all images
- Include relevant keywords
- Keep alt text concise and meaningful

## Best Practices

1. **Run Regular Checks:**
   - Weekly health checks for critical pages
   - Monthly comprehensive site audits
   - After major site updates

2. **Monitor Trends:**
   - Track score changes over time
   - Identify recurring issues
   - Measure improvement progress

3. **Prioritize Fixes:**
   - Fix critical issues first
   - Address warnings systematically
   - Implement recommendations gradually

4. **Use Third-Party Data:**
   - Compare with industry benchmarks
   - Track domain authority changes
   - Monitor backlink growth

## Troubleshooting

### API Errors

If third-party API calls fail:

1. **Check API Keys:**
   - Verify environment variables are set
   - Ensure API keys are valid
   - Check API rate limits

2. **Check Network:**
   - Verify internet connection
   - Check firewall settings
   - Test API endpoints directly

### Performance Issues

If health checks are slow:

1. **Limit Page Checks:**
   - Reduce number of pages checked
   - Use sampling for large sites
   - Cache results when possible

2. **Optimize Checks:**
   - Run checks in parallel
   - Use async/await efficiently
   - Implement request timeouts

## Future Enhancements

- [ ] Automated scheduled health checks
- [ ] Email alerts for critical issues
- [ ] Historical trend analysis
- [ ] Competitor comparison
- [ ] Custom check rules
- [ ] Export reports (PDF, CSV)
- [ ] Integration with Google Search Console
- [ ] Integration with Google Analytics

## Support

For issues or questions:
- Check the codebase documentation
- Review API documentation
- Contact the development team

---

**Last Updated:** 2025-01-27  
**Version:** 1.0.0

