# Quick Testing Reference

## Test Product Pages with Google Rich Results Test

### 1. Start Development Server
```bash
cd mying-web
npm run dev
```

### 2. Get a Product Slug
Example: `nuclear-energy-crisis` (from product name "Nuclear energy crisis")

### 3. Test URLs (11 languages + default)

**Base URL (English)**:
```
http://localhost:3000/products/nuclear-energy-crisis
```

**Language Variants**:
- Chinese: `?lang=zh`
- Arabic: `?lang=ar`
- Russian: `?lang=ru`
- Japanese: `?lang=ja`
- Korean: `?lang=ko`
- Thai: `?lang=th`
- Vietnamese: `?lang=vi`
- Indonesian: `?lang=id`
- Hindi: `?lang=hi`
- Spanish: `?lang=es`

### 4. Google Rich Results Test
Visit: https://search.google.com/test/rich-results

**What to Check**:
- ✅ 12 hreflang tags (11 languages + x-default)
- ✅ Product schema (JSON-LD)
- ✅ BreadcrumbList schema (JSON-LD)
- ✅ No errors or warnings

### 5. View Page Source Verification

In browser, View Page Source and search for:
- `hreflang` - Should find 12 link tags
- `application/ld+json` - Should find 2 JSON-LD blocks

---

**Full Guide**: See `GOOGLE_RICH_RESULTS_TESTING.md`
















