# Quick Deployment Steps

## Step 1: Login to Vercel

Open PowerShell and run:
```powershell
cd "C:\Users\Administrator\Desktop\Miying Web\mying-web"
vercel login
```

This will open your browser for authentication. Complete the login.

## Step 2: Deploy to Production

After login, run:
```powershell
vercel --prod --yes
```

## Step 3: Get Your Production URL

After deployment completes, Vercel will show:
- **Production URL**: `https://your-project-name.vercel.app`

Copy this URL!

## Step 4: Update Test Script

Edit `test-production.ps1` and change:
```powershell
[string]$BaseUrl = "https://your-project-name.vercel.app",
```

Replace `your-project-name.vercel.app` with your actual URL.

## Step 5: Run Tests

```powershell
.\test-production.ps1
```

---

**Alternative: Deploy via Vercel Dashboard**

1. Go to https://vercel.com
2. Sign in with GitHub/GitLab/Bitbucket
3. Click "Add New Project"
4. Import your repository
5. Vercel will auto-detect Next.js and deploy
6. Get your production URL from the dashboard







