# 🚀 DEPLOYMENT STEPS - Follow These Now

## Step 1: Login to Vercel (REQUIRED)

**Run this command in PowerShell:**
```powershell
cd "C:\Users\Administrator\Desktop\Miying Web\mying-web"
vercel login
```

**What happens:**
- Browser will open automatically
- Sign in with GitHub/Google/GitLab
- Return to PowerShell when done

## Step 2: Deploy to Production

**After login, run:**
```powershell
vercel --prod --yes
```

**OR use the deploy script:**
```powershell
.\deploy.ps1
# Then run: vercel --prod
```

## Step 3: Copy Your Production URL

After deployment, Vercel will show:
```
✅ Production: https://your-project-name.vercel.app
```

**COPY THIS URL!**

## Step 4: Set Environment Variable in Vercel Dashboard

1. Go to: https://vercel.com/dashboard
2. Click your project
3. Go to: **Settings** → **Environment Variables**
4. Add:
   - **Key**: `NEXT_PUBLIC_SITE_URL`
   - **Value**: `https://your-project-name.vercel.app` (use your actual URL)
   - **Environment**: Production, Preview, Development (select all)
5. Click **Save**
6. Go to **Deployments** tab
7. Click **⋯** (three dots) on latest deployment
8. Click **Redeploy**

## Step 5: Update Test Script

Edit `test-production.ps1` line 5:
```powershell
[string]$BaseUrl = "https://your-actual-url.vercel.app",
```

## Step 6: Run Tests

```powershell
.\test-production.ps1
```

---

## ⚡ Quick Commands (Copy & Paste)

```powershell
# 1. Navigate
cd "C:\Users\Administrator\Desktop\Miying Web\mying-web"

# 2. Login (opens browser)
vercel login

# 3. Deploy
vercel --prod --yes

# 4. After getting URL, update test script, then:
.\test-production.ps1
```












