# Fix Hreflang URLs - Update Environment Variable

## Issue

The hreflang tags are pointing to `https://mying.vercel.app` but your actual production URL is `https://mying-web.vercel.app`.

## Solution: Update Environment Variable in Vercel

### Step 1: Access Vercel Dashboard

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project: **mying-web**

### Step 2: Update Environment Variable

1. Click **Settings** (in the top navigation)
2. Click **Environment Variables** (in the left sidebar)
3. Find `NEXT_PUBLIC_SITE_URL` in the list
4. Click **Edit** (or **Add** if it doesn't exist)
5. Set the value to: `https://mying-web.vercel.app`
6. Make sure it's enabled for:
   - ✅ Production
   - ✅ Preview (optional)
   - ✅ Development (optional)
7. Click **Save**

### Step 3: Redeploy

After updating the environment variable, you need to redeploy:

**Option A: Via Vercel Dashboard**
1. Go to **Deployments** tab
2. Click the **⋯** (three dots) menu on the latest deployment
3. Click **Redeploy**

**Option B: Via CLI**
```powershell
cd "C:\Users\Administrator\Desktop\Miying Web\mying-web"
vercel --prod --yes
```

### Step 4: Verify

After redeployment, check the page source:

1. Visit: `https://mying-web.vercel.app/products/nuclear-energy-crisis`
2. View page source (Ctrl+U)
3. Search for `hrefLang` - all URLs should now point to `https://mying-web.vercel.app`

## Expected Result

After the fix, hreflang tags should look like:
```html
<link rel="alternate" hrefLang="en-US" href="https://mying-web.vercel.app/products/nuclear-energy-crisis"/>
<link rel="alternate" hrefLang="zh-CN" href="https://mying-web.vercel.app/products/nuclear-energy-crisis?lang=zh"/>
<!-- ... etc for all 11 languages + x-default -->
```

## Why This Matters

- **SEO**: Search engines use hreflang URLs to understand language versions
- **Canonical URLs**: Ensures all structured data points to the correct domain
- **Consistency**: All internal links and metadata will use the correct base URL

---

**Note**: The fallback URL in code (`https://mying.vercel.app`) is just a default. The environment variable takes precedence when set in Vercel.


















