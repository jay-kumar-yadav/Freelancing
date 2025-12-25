# Google Analytics Setup Guide

This guide will help you set up Google Analytics 4 (GA4) for your portfolio website.

## Step 1: Create a Google Analytics Account

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click **"Start measuring"** or **"Get started"**
3. Sign in with your Google account
4. Create an account name (e.g., "Jay Kumar Yadav Portfolio")
5. Set up a property:
   - Property name: "Portfolio Website"
   - Time zone: Select your timezone (India Standard Time)
   - Currency: Select your currency (INR)
6. Fill in business information:
   - Industry category: Technology
   - Business size: Small
   - How you intend to use Google Analytics: Select appropriate options
7. Click **"Create"**

## Step 2: Get Your Measurement ID

1. After creating the property, you'll see a **Data Streams** section
2. Click **"Add stream"** → **"Web"**
3. Enter your website URL (e.g., `https://yourdomain.com` or `http://localhost:5173` for development)
4. Enter a stream name (e.g., "Portfolio Website")
5. Click **"Create stream"**
6. You'll see your **Measurement ID** (format: `G-XXXXXXXXXX`)
7. **Copy this Measurement ID** - you'll need it in the next step

## Step 3: Add Measurement ID to Your Project

1. In your project root (`/Users/jaykumaryadav/Desktop/Freelancing/frontend/`), create or edit the `.env` file
2. Add your Google Analytics Measurement ID:

```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Important:** 
- Replace `G-XXXXXXXXXX` with your actual Measurement ID
- The variable name must start with `VITE_` for Vite to expose it to your app
- Do NOT commit the `.env` file to Git (it's already in `.gitignore`)

### Example `.env` file:

```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key

# Google Analytics
VITE_GA_MEASUREMENT_ID=G-ABC123XYZ789
```

## Step 4: Verify Installation

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open your website in the browser
3. Open browser DevTools (F12) → Console tab
4. You should see no errors related to Google Analytics
5. Navigate to different pages on your website

## Step 5: Test in Google Analytics Dashboard

1. Go back to [Google Analytics Dashboard](https://analytics.google.com/)
2. Navigate to **Reports** → **Realtime**
3. Visit your website and navigate between pages
4. You should see activity in the Realtime report within a few seconds

## What's Being Tracked

The following events are automatically tracked:

### Page Views
- Every page navigation is tracked automatically
- Pages tracked:
  - `/` (Landing page)
  - `/portfolio`
  - `/projects`
  - `/project/:id` (Individual project pages)
  - `/contact`
  - `/services`
  - `/pricing`

### Custom Events
- **Contact Form Submission**: When someone submits the contact form
- **Project Views**: When someone views a project detail page

## Advanced: Adding More Tracking

You can add custom tracking to any component by importing the analytics functions:

```javascript
import { trackEvent, trackButtonClick, trackExternalLink } from '../utils/analytics';

// Track a button click
trackButtonClick('Get Started Button', 'Hero Section');

// Track an external link
trackExternalLink('https://github.com/jay-kumar-yadav', 'GitHub Profile');

// Track a custom event
trackEvent('newsletter_signup', {
  source: 'footer',
  method: 'email'
});
```

## Troubleshooting

### Analytics not working?

1. **Check your Measurement ID**:
   - Make sure it's in `.env` file
   - Format should be `G-XXXXXXXXXX`
   - Variable name must be `VITE_GA_MEASUREMENT_ID`

2. **Check browser console**:
   - Open DevTools (F12) → Console
   - Look for any errors
   - You should see a warning if `VITE_GA_MEASUREMENT_ID` is not set

3. **Verify in Network tab**:
   - Open DevTools → Network tab
   - Filter by "collect" or "gtag"
   - You should see requests to `google-analytics.com`

4. **Check Google Analytics Dashboard**:
   - Go to Realtime reports
   - Make sure you're viewing the correct property
   - Wait a few minutes for data to appear

5. **Ad blockers**:
   - Some ad blockers prevent Google Analytics
   - Test in incognito mode or disable ad blockers

### Still not working?

- Make sure you've restarted your dev server after adding the `.env` file
- Clear browser cache
- Check that the `.env` file is in the correct location (`frontend/.env`)
- Verify the Measurement ID is correct (no extra spaces or quotes)

## Production Deployment

When deploying to production:

1. Add the `VITE_GA_MEASUREMENT_ID` to your hosting platform's environment variables:
   - **Vercel**: Settings → Environment Variables
   - **Netlify**: Site settings → Build & deploy → Environment variables
   - **Other platforms**: Check their documentation for environment variables

2. Make sure to use the same Measurement ID or create a separate property for production

3. Test in production to ensure tracking is working

## Privacy & GDPR Compliance

If you're targeting EU users, consider:
- Adding a cookie consent banner
- Implementing Google Analytics with consent mode
- Providing a privacy policy that mentions Google Analytics

For more information, see [Google Analytics Privacy](https://support.google.com/analytics/answer/9019185)

## Support

If you need help:
- [Google Analytics Help Center](https://support.google.com/analytics)
- [GA4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)

