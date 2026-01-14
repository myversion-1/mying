# Production Testing Checklist

Use this checklist to systematically test your production deployment.

## Pre-Deployment Checklist

- [ ] `NEXT_PUBLIC_SITE_URL` environment variable set in Vercel
- [ ] All code changes committed and pushed
- [ ] Build passes locally (`npm run build`)
- [ ] No TypeScript errors
- [ ] No linting errors

## Deployment Checklist

- [ ] Site deployed to production
- [ ] Production URL accessible
- [ ] All pages load correctly
- [ ] No console errors in browser

## Hreflang Testing

### Test Product: `nuclear-energy-crisis` (or your product slug)

- [ ] Default URL accessible: `https://YOUR_DOMAIN/products/nuclear-energy-crisis`
- [ ] English variant accessible: `?lang=en`
- [ ] Chinese variant accessible: `?lang=zh`
- [ ] Arabic variant accessible: `?lang=ar`
- [ ] Russian variant accessible: `?lang=ru`
- [ ] Japanese variant accessible: `?lang=ja`
- [ ] Korean variant accessible: `?lang=ko`
- [ ] Thai variant accessible: `?lang=th`
- [ ] Vietnamese variant accessible: `?lang=vi`
- [ ] Indonesian variant accessible: `?lang=id`
- [ ] Hindi variant accessible: `?lang=hi`
- [ ] Spanish variant accessible: `?lang=es`

### Google Rich Results Test

- [ ] Test default URL in Rich Results Test
- [ ] Verify 12 hreflang tags present (11 languages + x-default)
- [ ] Verify all hreflang URLs are valid
- [ ] Test at least 3 language variants
- [ ] Verify consistent hreflang tags across all variants

## Structured Data Testing

- [ ] Product schema detected in Rich Results Test
- [ ] BreadcrumbList schema detected
- [ ] No errors in structured data
- [ ] Product name appears correctly
- [ ] Product image URL is absolute and accessible
- [ ] All required Product schema fields present

## Page Source Verification

- [ ] View page source of product page
- [ ] Search for `hreflang` - find 12 link tags
- [ ] Search for `application/ld+json` - find 2 JSON-LD blocks
- [ ] Verify hreflang URLs use production domain (not localhost)
- [ ] Verify structured data URLs use production domain

## Multiple Products Testing

Test at least 3 different products:

- [ ] Product 1: `[slug]` - All tests pass
- [ ] Product 2: `[slug]` - All tests pass
- [ ] Product 3: `[slug]` - All tests pass

## Sitemap Testing

- [ ] Sitemap accessible: `https://YOUR_DOMAIN/sitemap.xml`
- [ ] Sitemap includes all product pages
- [ ] Sitemap includes language variants
- [ ] All sitemap URLs are valid

## Google Search Console

- [ ] Property added in Search Console
- [ ] Sitemap submitted: `https://YOUR_DOMAIN/sitemap.xml`
- [ ] URL Inspection tool shows no errors
- [ ] Requested indexing for key product pages

## Performance Testing

- [ ] Page loads quickly (< 3 seconds)
- [ ] Images load correctly
- [ ] No broken links
- [ ] Mobile responsive design works

## Language Switching

- [ ] Language switcher works on product pages
- [ ] URL updates correctly when switching languages
- [ ] Content changes to selected language
- [ ] Hreflang tags remain consistent

## Final Verification

- [ ] All tests pass
- [ ] No errors in Google Rich Results Test
- [ ] No errors in Google Search Console
- [ ] Site ready for production use

---

**Testing Date**: _______________
**Tester**: _______________
**Production URL**: _______________





















