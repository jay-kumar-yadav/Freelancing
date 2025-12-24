# EmailJS Setup Guide

This guide will help you set up EmailJS to make your contact form functional.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (200 emails/month free)
3. Verify your email address

## Step 2: Add Email Service

**RECOMMENDED: Use EmailJS Default Service (Easiest - No OAuth issues)**

1. Log in to your EmailJS dashboard
2. Go to **Email Services** → **Add New Service**
3. Choose **EmailJS** (the default option, NOT Gmail)
4. Enter your email address: `jay94588@gmail.com`
5. Click **Create Service**
6. Copy the **Service ID** (e.g., `service_xxxxx`)

**Alternative: Gmail Service (Requires OAuth setup)**
- If you choose Gmail, make sure to grant ALL requested permissions when connecting
- If you get a 412 error, see `EMAILJS_FIX.md` for troubleshooting

## Step 3: Create Email Template

1. Go to **Email Templates** → **Create New Template**
2. Use this template structure:

**Template Name:** Contact Form

**Subject:** New Contact Form Message from {{from_name}}

**Content:**
```
Hello,

You have received a new message from your portfolio contact form:

Name: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This message was sent from your portfolio website.
```

3. Save the template and copy the **Template ID** (e.g., `template_xxxxx`)

## Step 4: Get Public Key

1. Go to **Account** → **General**
2. Copy your **Public Key** (e.g., `xxxxxxxxxxxxx`)

## Step 5: Configure Environment Variables

1. In the `frontend` folder, create a `.env` file (copy from `.env.example`)
2. Add your EmailJS credentials:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

Replace the placeholder values with your actual credentials.

## Step 6: Test the Form

1. Start your development server: `npm run dev`
2. Navigate to the Contact page
3. Fill out and submit the form
4. Check your email (jay94588@gmail.com) for the message

## For Production Deployment

When deploying to Vercel, Netlify, or other platforms:

1. Add the same environment variables in your hosting platform's dashboard
2. Go to **Settings** → **Environment Variables**
3. Add all three variables:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
4. Redeploy your application

## Troubleshooting

- **Form not sending emails?** Check that all environment variables are set correctly
- **Getting errors?** Make sure your EmailJS service is connected and active
- **Not receiving emails?** Check your spam folder and verify your email service connection in EmailJS dashboard

## Security Note

The Public Key is safe to expose in frontend code. EmailJS handles rate limiting and security on their end. However, make sure your Service ID and Template ID are kept in environment variables and not hardcoded in your source code.

