# Formspree Webhook Setup Guide

This guide will help you set up Formspree.io as your email service provider for the contact and quote forms.

## Step 1: Create a Formspree Account

1. Go to [formspree.io](https://formspree.io)
2. Sign up for a free account (or log in if you already have one)
3. The free tier includes:
   - 50 submissions per month
   - Email notifications
   - Basic spam protection

## Step 2: Create a New Form

1. After logging in, click **"New Form"** or go to your dashboard
2. Give your form a name (e.g., "Miying Contact Form")
3. Formspree will generate a unique endpoint URL like:
   ```
   https://formspree.io/f/YOUR_FORM_ID
   ```
4. Copy this URL - you'll need it in the next step

## Step 3: Configure Formspree Form Settings

1. In your Formspree form settings, configure:
   - **Email**: Set the email address where you want to receive submissions
   - **Subject**: Optional - you can set a default subject line
   - **Notifications**: Enable email notifications

## Step 4: Set Environment Variables in Vercel

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project (`mying` or `mying-web`)
3. Go to **Settings** → **Environment Variables**
4. Add the following variables:

   **For Contact Form:**
   - **Key**: `WEBHOOK_URL`
   - **Value**: `https://formspree.io/f/YOUR_FORM_ID` (replace with your actual Formspree endpoint)
   - **Environment**: Select all (Production, Preview, Development)

   **For Quote Form (if using separate form):**
   - You can use the same `WEBHOOK_URL` or create a separate Formspree form
   - If using a separate form, you'll need to update the code to use a different variable

5. Also set:
   - **Key**: `CONTACT_EMAIL`
   - **Value**: Your email address (e.g., `miyingyoule@gmail.com`)
   - **Environment**: Select all

6. Click **Save** for each variable

## Step 5: Redeploy Your Application

After adding environment variables, you need to redeploy:

1. Go to **Deployments** tab in Vercel
2. Click the **⋯** menu on the latest deployment
3. Select **Redeploy**
4. Or push a new commit to trigger automatic deployment

## Step 6: Test the Setup

1. Visit your website's contact page
2. Fill out and submit the contact form
3. Check your email inbox (the one you set in Formspree)
4. You should receive an email with the form submission

## Troubleshooting

### Form submissions not working?

1. **Check Vercel Logs**:
   - Go to Vercel Dashboard → Your Project → **Logs**
   - Look for any errors related to webhook calls

2. **Verify Environment Variables**:
   - Make sure `WEBHOOK_URL` is set correctly
   - The URL should be exactly: `https://formspree.io/f/YOUR_FORM_ID`
   - No trailing slashes

3. **Check Formspree Dashboard**:
   - Log into Formspree
   - Check the **Submissions** tab to see if submissions are being received
   - Formspree might be blocking submissions if they look like spam

4. **Test the Webhook Directly**:
   ```bash
   curl -X POST https://formspree.io/f/YOUR_FORM_ID \
     -H "Content-Type: application/json" \
     -d '{"subject":"Test","text":"Test message"}'
   ```

### Rate Limiting

- Free tier: 50 submissions per month
- If you exceed the limit, upgrade to a paid plan or use a different email provider

### Spam Protection

Formspree has built-in spam protection. If legitimate submissions are being blocked:
1. Check Formspree dashboard for blocked submissions
2. Whitelist your domain if needed
3. Consider upgrading to a paid plan for better spam handling

## Alternative: Using Multiple Forms

If you want separate forms for contact and quote requests:

1. Create two forms in Formspree:
   - One for contact form
   - One for quote requests

2. Set environment variables:
   - `WEBHOOK_URL` - for contact form
   - `QUOTE_WEBHOOK_URL` - for quote form (requires code update)

3. Update the code to use different webhook URLs for different forms

## Upgrading Formspree

If you need more submissions:
- **Hobby Plan**: $10/month - 1,000 submissions/month
- **Pro Plan**: $30/month - 10,000 submissions/month
- Visit [formspree.io/pricing](https://formspree.io/pricing) for details

## Security Notes

- Never commit your Formspree endpoint URL to version control
- Keep your Formspree account secure
- Monitor submissions in the Formspree dashboard regularly












