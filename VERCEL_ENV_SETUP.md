# Vercel Environment Variables Setup

## Adding CRON_SECRET

To secure your cron job endpoint, you need to add a `CRON_SECRET` environment variable in Vercel.

### Steps:

1. **Go to Vercel Dashboard**
   - Visit [vercel.com/dashboard](https://vercel.com/dashboard)
   - Select your project (`mying-web`)

2. **Navigate to Settings**
   - Click on your project
   - Go to **Settings** tab
   - Click on **Environment Variables** in the sidebar

3. **Add CRON_SECRET**
   - Click **Add New**
   - **Key**: `CRON_SECRET`
   - **Value**: Generate a secure random string (see below)
   - **Environment**: Select all environments (Production, Preview, Development)
   - Click **Save**

4. **Generate a Secure Secret**
   You can generate a secure random string using one of these methods:

   **Option 1: Using Node.js**
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

   **Option 2: Using OpenSSL**
   ```bash
   openssl rand -hex 32
   ```

   **Option 3: Using Online Generator**
   - Visit: https://randomkeygen.com/
   - Use a "CodeIgniter Encryption Keys" or similar

5. **Redeploy Your Project**
   - After adding the environment variable, you need to redeploy
   - Go to **Deployments** tab
   - Click the **⋯** menu on the latest deployment
   - Select **Redeploy**
   - Or push a new commit to trigger a deployment

### Testing the Cron Job

After setting up `CRON_SECRET`, you can test the cron endpoint:

```bash
# Replace YOUR_SECRET with the value you set
curl -X GET https://mying.vercel.app/api/seo-tracker/cron \
  -H "Authorization: Bearer YOUR_SECRET"
```

### Verifying It Works

1. Check Vercel logs after the cron runs (every Sunday at midnight UTC)
2. Or manually trigger it using the curl command above
3. Check the response - it should return a JSON with results

### Security Notes

- **Never commit** `CRON_SECRET` to your repository
- Keep the secret secure and rotate it periodically
- The cron job will only run if the Authorization header matches
- If `CRON_SECRET` is not set, the cron endpoint will still work but won't be protected
- **Important**: Vercel Cron Jobs will automatically call your endpoint, but you should still set `CRON_SECRET` for manual triggers and additional security

### How Vercel Cron Works

When Vercel's cron job runs (every Sunday at midnight UTC), it will automatically call your endpoint. However:

1. **For manual testing**: You need to provide the `Authorization: Bearer CRON_SECRET` header
2. **For production security**: Always set `CRON_SECRET` to prevent unauthorized access
3. **Vercel's automatic calls**: Will work regardless, but having `CRON_SECRET` adds an extra layer of security

### Optional: Local Development

For local development, create a `.env.local` file:

```env
CRON_SECRET=your-secret-here
```

Make sure `.env.local` is in your `.gitignore` (it should be already).
