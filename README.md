This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

### Automatic Deployment

This project includes a GitHub Actions workflow that automatically deploys to Vercel:
- **Auto-deploy**: Pushes to `main` branch trigger automatic deployment
- **Manual deploy**: Go to GitHub Actions tab → "Deploy to Vercel" → "Run workflow"

The deploy hook is configured in `.github/workflows/deploy.yml`.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Contact Form Setup

The contact form is now using a Next.js API route. To receive email notifications:

### Option 1: Resend (Recommended - Free Tier: 3,000 emails/month)

1. Sign up at [resend.com](https://resend.com)
2. Get your API key from the dashboard
3. In Vercel → Your Project → Settings → Environment Variables:
   - Add `RESEND_API_KEY` = your API key
   - Add `CONTACT_EMAIL` = your email address
4. Uncomment the Resend code in `src/app/api/contact/route.ts`
5. Install Resend: `npm install resend`
6. Redeploy

### Option 2: Gmail SMTP (Simple, No API Needed)

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account → Security → 2-Step Verification → App passwords
   - Create an app password for "Mail"
3. In Vercel → Your Project → Settings → Environment Variables:
   - Add `GMAIL_USER` = your Gmail address
   - Add `GMAIL_APP_PASSWORD` = the app password you generated
   - Add `CONTACT_EMAIL` = your email address
4. Install Nodemailer: `npm install nodemailer`
5. Uncomment the Gmail SMTP code in `src/app/api/contact/route.ts` (Option 2)
6. Redeploy

### Option 3: Webhook (Easiest - No Setup Needed)

Use a free webhook-to-email service:

1. Go to [webhook.site](https://webhook.site) or [formspree.io](https://formspree.io)
2. Get your webhook URL
3. In Vercel → Your Project → Settings → Environment Variables:
   - Add `WEBHOOK_URL` = your webhook URL
   - Add `CONTACT_EMAIL` = your email address
4. Redeploy

**Note:** The webhook code is already active in the API route (Option 4).

### Option 4: SendGrid (Free Tier: 100 emails/day)

1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Get your API key
3. In Vercel → Your Project → Settings → Environment Variables:
   - Add `SENDGRID_API_KEY` = your API key
   - Add `CONTACT_EMAIL` = your email address
4. Install SendGrid: `npm install @sendgrid/mail`
5. Uncomment the SendGrid code in `src/app/api/contact/route.ts`
6. Redeploy

### Option 3: View in Vercel Logs (Temporary)

For now, form submissions are logged to Vercel's function logs. You can view them in:
- Vercel Dashboard → Your Project → Logs

**Note:** Currently, the API route logs submissions but doesn't send emails. You must set up one of the email services above for production use.
