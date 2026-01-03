# SEO Backlink Tracker

A comprehensive admin module for tracking and monitoring backlinks to your multi-language product pages.

## Features

- ✅ **Multi-language Product URL Management**: Automatically lists all product URLs across 11 languages
- ✅ **Backlink Tracking**: Track external URLs where you've posted links to your products
- ✅ **Automatic Status Detection**: Detects if links are Active, Lost, or No-Follow
- ✅ **Weekly Cron Job**: Automatically checks all backlinks once a week
- ✅ **Manual Check**: Check individual backlinks on-demand
- ✅ **JSON Storage**: Simple file-based storage (easily migratable to Supabase)

## Access

Navigate to: `/admin/seo-tracker`

## Usage

### Adding a Backlink

1. Fill in the form:
   - **External URL**: The URL where you posted your link (e.g., `https://example.com/article`)
   - **Target Product URL**: Select from the dropdown of all available product URLs
   - **Language**: Select the language variant
   - **Notes**: Optional notes about the backlink

2. Click "Add Backlink"

### Checking Backlinks

- **Automatic**: The cron job runs weekly (every Sunday at midnight UTC) to check all backlinks
- **Manual**: Click the "Check" button next to any backlink to verify its status immediately

### Status Types

- **Active**: Link is found and is dofollow
- **Lost**: Link is not found or the page is inaccessible
- **No-Follow**: Link is found but has `rel="nofollow"` attribute
- **Pending**: Newly added backlink, not yet checked

## API Endpoints

### GET `/api/seo-tracker/backlinks`
Get all tracked backlinks

### POST `/api/seo-tracker/backlinks`
Create a new backlink
```json
{
  "externalUrl": "https://example.com/article",
  "targetUrl": "https://mying.vercel.app/products/nuclear-energy-crisis",
  "language": "en",
  "notes": "Posted on industry blog"
}
```

### PUT `/api/seo-tracker/backlinks`
Update a backlink
```json
{
  "id": "bl_1234567890_abc123",
  "status": "Active",
  "linkType": "dofollow"
}
```

### DELETE `/api/seo-tracker/backlinks?id=bl_1234567890_abc123`
Delete a backlink

### POST `/api/seo-tracker/check`
Check a single backlink
```json
{
  "id": "bl_1234567890_abc123"
}
```

### GET `/api/seo-tracker/cron`
Weekly cron job endpoint (automatically called by Vercel)

## Cron Job Setup

The cron job is configured in `vercel.json` to run every Sunday at midnight UTC:

```json
{
  "crons": [
    {
      "path": "/api/seo-tracker/cron",
      "schedule": "0 0 * * 0"
    }
  ]
}
```

### Manual Cron Trigger

You can manually trigger the cron job by calling:
```bash
curl -X GET https://your-domain.vercel.app/api/seo-tracker/cron \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

### Setting Up CRON_SECRET

**Important**: Set `CRON_SECRET` in your Vercel environment variables for security.

1. **Generate a secret**:
   ```bash
   node scripts/generate-cron-secret.js
   ```

2. **Add to Vercel**:
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add new variable:
     - Key: `CRON_SECRET`
     - Value: (paste the generated secret)
     - Environment: All (Production, Preview, Development)
   - Save and redeploy

See `VERCEL_ENV_SETUP.md` for detailed instructions.

## Data Storage

Backlinks are stored in `data/seo-tracker.json`. The file structure:

```json
{
  "backlinks": [
    {
      "id": "bl_1234567890_abc123",
      "externalUrl": "https://example.com/article",
      "targetUrl": "https://mying.vercel.app/products/nuclear-energy-crisis",
      "language": "en",
      "status": "Active",
      "linkType": "dofollow",
      "anchorText": "Check out this product",
      "lastChecked": "2024-01-03T12:00:00.000Z",
      "createdAt": "2024-01-01T10:00:00.000Z",
      "notes": "Posted on industry blog"
    }
  ],
  "lastCronRun": "2024-01-03T00:00:00.000Z"
}
```

## Migration to Supabase

To migrate to Supabase:

1. Create a `backlinks` table in Supabase:
```sql
CREATE TABLE backlinks (
  id TEXT PRIMARY KEY,
  external_url TEXT NOT NULL,
  target_url TEXT NOT NULL,
  language TEXT NOT NULL,
  status TEXT NOT NULL,
  link_type TEXT,
  anchor_text TEXT,
  last_checked TIMESTAMP,
  created_at TIMESTAMP NOT NULL,
  notes TEXT
);
```

2. Update `src/lib/seo-tracker-storage.ts` to use Supabase client instead of file system

## Troubleshooting

### Cron Job Not Running

1. Check Vercel Dashboard → Settings → Cron Jobs
2. Verify `vercel.json` has the cron configuration
3. Check Vercel logs for errors
4. Ensure `CRON_SECRET` is set if using authentication

### Backlinks Not Found

- The checker looks for links containing `mying.vercel.app` in the href
- It handles relative URLs by converting them to absolute
- Check if the external URL is accessible and returns HTML

### Status Always "Lost"

- The external URL might be blocking requests
- Check if the site requires authentication
- Verify the URL is correct and accessible

