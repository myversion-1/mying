# Formspree Quick Setup

## Quick Steps

1. **Sign up at [formspree.io](https://formspree.io)** (free account)

2. **Create a new form** and copy the endpoint URL:
   ```
   https://formspree.io/f/YOUR_FORM_ID
   ```

3. **Set in Vercel Environment Variables**:
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add:
     - **Key**: `WEBHOOK_URL`
     - **Value**: `https://formspree.io/f/YOUR_FORM_ID`
     - **Environment**: All (Production, Preview, Development)
   - Also add:
     - **Key**: `CONTACT_EMAIL`
     - **Value**: Your email address

4. **Redeploy** your application

5. **Test** by submitting the contact form on your website

## That's it! 

Formspree will automatically:
- ✅ Send emails to the address you configured
- ✅ Handle spam protection
- ✅ Store submissions in your dashboard

## Free Tier Limits

- 50 submissions per month
- Email notifications
- Basic spam protection

For more details, see [FORMSPREE_SETUP.md](./FORMSPREE_SETUP.md)













