# Production URL Testing Guide

This guide helps you test your deployed production site with Google Rich Results Test to verify hreflang tags and structured data for all 11 languages.

## Prerequisites

1. **Site Deployed**: Your site must be deployed to production (e.g., Vercel)
2. **Production URL**: Know your production URL (e.g., `https://mying.vercel.app`)
3. **Environment Variable Set**: Ensure `NEXT_PUBLIC_SITE_URL` is set to your production URL in Vercel

## Step 1: Get Your Production URL

### If Deployed to Vercel:

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project
3. Find your **Production URL** (e.g., `https://mying.vercel.app`)

### Verify Environment Variable:

In Vercel Dashboard → Settings → Environment Variables:
- `NEXT_PUBLIC_SITE_URL` should be set to your production URL

## Step 2: Get a Product Slug

Example product: "Nuclear energy crisis"
- **Slug**: `nuclear-energy-crisis`
- **Full URL**: `https://mying.vercel.app/products/nuclear-energy-crisis`

## Step 3: Test URLs (11 Languages + Default)

### Base URL (English - Default)
```
https://mying.vercel.app/products/nuclear-energy-crisis
```

### Language Variants
Replace `YOUR_DOMAIN` with your actual domain:

```
https://YOUR_DOMAIN/products/nuclear-energy-crisis?lang=en
https://YOUR_DOMAIN/products/nuclear-energy-crisis?lang=zh
https://YOUR_DOMAIN/products/nuclear-energy-crisis?lang=ar
https://YOUR_DOMAIN/products/nuclear-energy-crisis?lang=ru
https://YOUR_DOMAIN/products/nuclear-energy-crisis?lang=ja
https://YOUR_DOMAIN/products/nuclear-energy-crisis?lang=ko
https://YOUR_DOMAIN/products/nuclear-energy-crisis?lang=th
https://YOUR_DOMAIN/products/nuclear-energy-crisis?lang=vi
https://YOUR_DOMAIN/products/nuclear-energy-crisis?lang=id
https://YOUR_DOMAIN/products/nuclear-energy-crisis?lang=hi
https://YOUR_DOMAIN/products/nuclear-energy-crisis?lang=es
```

## Step 4: Test with Google Rich Results Test

### Access the Tool

Visit: **https://search.google.com/test/rich-results**

### Test Each URL

For each of the 12 URLs above (default + 11 languages):

1. **Enter the URL** in the test tool
2. **Click "Test URL"**
3. **Wait for results** (may take 10-30 seconds)

### Expected Results

#### ✅ Hreflang Tags (12 total)
You should see 12 alternate language links:
- `en-US` → English URL
- `zh-CN` → Chinese URL  
- `ar-SA` → Arabic URL
- `ru-RU` → Russian URL
- `ja-JP` → Japanese URL
- `ko-KR` → Korean URL
- `th-TH` → Thai URL
- `vi-VN` → Vietnamese URL
- `id-ID` → Indonesian URL
- `hi-IN` → Hindi URL
- `es-ES` → Spanish URL
- `x-default` → English URL (default)

#### ✅ Structured Data
You should see:
- **Product** schema detected
- **BreadcrumbList** schema detected

#### ✅ No Errors
- No warnings or errors should appear
- All hreflang URLs should be valid and accessible

## Step 5: Verify in Browser

### View Page Source

1. Open any product page in your browser
2. Right-click → **"View Page Source"** (or `Ctrl+U` / `Cmd+U`)
3. Search for `hreflang` - Should find 12 `<link>` tags
4. Search for `application/ld+json` - Should find 2 JSON-LD blocks

### Expected HTML Structure

```html
<!-- Hreflang Tags -->
<link rel="alternate" hreflang="en-US" href="https://YOUR_DOMAIN/products/nuclear-energy-crisis" />
<link rel="alternate" hreflang="zh-CN" href="https://YOUR_DOMAIN/products/nuclear-energy-crisis?lang=zh" />
<link rel="alternate" hreflang="ar-SA" href="https://YOUR_DOMAIN/products/nuclear-energy-crisis?lang=ar" />
<!-- ... all 11 languages ... -->
<link rel="alternate" hreflang="x-default" href="https://YOUR_DOMAIN/products/nuclear-energy-crisis" />

<!-- Structured Data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Nuclear energy crisis",
  ...
}
</script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  ...
}
</script>
```

## Step 6: Test Multiple Products

Test at least 3-5 different products to ensure consistency:

1. Get product slugs from your product data
2. Test each product's default URL
3. Verify hreflang tags are consistent across all products

## Step 7: Submit to Google Search Console

### Submit Sitemap

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property (if not already added)
3. Go to **Sitemaps** section
4. Submit: `https://YOUR_DOMAIN/sitemap.xml`

### Request Indexing

1. Go to **URL Inspection** tool
2. Enter a product URL
3. Click **"Request Indexing"**
4. Repeat for a few key product pages

## Testing Checklist

For each product page tested:

- [ ] All 12 hreflang tags present (11 languages + x-default)
- [ ] All hreflang URLs are valid and accessible
- [ ] Product schema detected in Rich Results Test
- [ ] BreadcrumbList schema detected
- [ ] No errors or warnings in Rich Results Test
- [ ] Page source shows correct hreflang tags
- [ ] Page source shows valid JSON-LD structured data
- [ ] All language variants return same hreflang set
- [ ] Production URL matches `NEXT_PUBLIC_SITE_URL` environment variable

## Common Issues & Solutions

### Issue: Hreflang URLs point to localhost

**Cause**: `NEXT_PUBLIC_SITE_URL` not set or incorrect in Vercel

**Solution**:
1. Go to Vercel Dashboard → Settings → Environment Variables
2. Set `NEXT_PUBLIC_SITE_URL` to your production URL
3. Redeploy the site

### Issue: Structured data not detected

**Cause**: Product data missing or component not rendering

**Solution**:
1. Verify product exists in `products_multilingual.ts`
2. Check browser console for errors
3. Verify `ProductStructuredData` component is included

### Issue: Some hreflang tags missing

**Cause**: Language code mapping issue

**Solution**:
1. Check `HREFLANG_CODE_MAP` in `src/utils/hreflang.ts`
2. Verify all 11 languages are in `SUPPORTED_LANGUAGES` array

### Issue: URLs return 404

**Cause**: Product slug doesn't match

**Solution**:
1. Verify product slug generation
2. Check `getProductBySlug()` function
3. Ensure product name matches slug format

## Automated Testing Script

You can use this PowerShell script to test all language variants:

```powershell
# Production Testing Script
$baseUrl = "https://YOUR_DOMAIN"
$productSlug = "nuclear-energy-crisis"
$languages = @("en", "zh", "ar", "ru", "ja", "ko", "th", "vi", "id", "hi", "es")

Write-Host "Testing Production URLs..." -ForegroundColor Green

# Test default (English)
$defaultUrl = "$baseUrl/products/$productSlug"
Write-Host "`nTesting: $defaultUrl" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri $defaultUrl -UseBasicParsing
    Write-Host "✓ Status: $($response.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "✗ Error: $_" -ForegroundColor Red
}

# Test language variants
foreach ($lang in $languages) {
    $url = "$baseUrl/products/$productSlug?lang=$lang"
    Write-Host "`nTesting: $url" -ForegroundColor Yellow
    try {
        $response = Invoke-WebRequest -Uri $url -UseBasicParsing
        Write-Host "✓ Status: $($response.StatusCode)" -ForegroundColor Green
    } catch {
        Write-Host "✗ Error: $_" -ForegroundColor Red
    }
}

Write-Host "`nTesting complete!" -ForegroundColor Green
```

**Usage**:
1. Replace `YOUR_DOMAIN` with your actual domain
2. Replace `nuclear-energy-crisis` with your product slug
3. Run in PowerShell: `.\test-production.ps1`

## Next Steps After Testing

1. **Monitor Search Console**: Check for any errors or warnings
2. **Track Rich Results**: Monitor which pages show rich results
3. **Update Sitemap**: Ensure sitemap includes all products
4. **Regular Testing**: Test new products as they're added

## Additional Resources

- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Google Search Console](https://search.google.com/search-console)
- [Hreflang Documentation](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites)
- [Product Schema](https://schema.org/Product)

---

**Last Updated**: 2024-12-19




















