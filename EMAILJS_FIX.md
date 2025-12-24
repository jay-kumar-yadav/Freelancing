# Fix for EmailJS 412 Error (Gmail Authentication)

## The Problem
You're getting this error: `412 (Precondition Failed) - Gmail_API: Request had insufficient authentication scopes`

This happens when your Gmail service in EmailJS doesn't have the proper OAuth permissions.

## Solution 1: Use EmailJS Default Email Service (RECOMMENDED - Easiest)

Instead of using Gmail, use EmailJS's own email service which is simpler and doesn't require OAuth:

### Steps:

1. **Go to EmailJS Dashboard** → **Email Services**
2. **Delete your current Gmail service** (if you have one)
3. **Click "Add New Service"**
4. **Choose "EmailJS"** (not Gmail)
5. **Enter your email**: `jay94588@gmail.com`
6. **Click "Create Service"**
7. **Copy the Service ID** (e.g., `service_xxxxx`)

8. **Update your Email Template**:
   - Go to **Email Templates** → Edit your template
   - Make sure the template uses these variables:
     - `{{from_name}}` - Sender's name
     - `{{from_email}}` - Sender's email
     - `{{message}}` - The message content
   - **To Email**: Set to `jay94588@gmail.com` (or use `{{to_email}}` variable)
   - **Subject**: `New Contact Form Message from {{from_name}}`

9. **Update your `.env` file** with the new Service ID

10. **Restart your dev server** and test again

## Solution 2: Fix Gmail OAuth (If you want to use Gmail)

If you prefer to use Gmail, you need to reconnect it with proper scopes:

### Steps:

1. **Go to EmailJS Dashboard** → **Email Services**
2. **Click on your Gmail service**
3. **Click "Reconnect"** or **"Disconnect and Reconnect"**
4. **Grant all requested permissions** when Google asks
5. **Make sure you grant:**
   - Send email on your behalf
   - Read email (if needed)
   - All requested OAuth scopes

6. **If reconnecting doesn't work:**
   - Delete the Gmail service completely
   - Create a new Gmail service
   - Connect with a fresh OAuth connection
   - Grant all permissions

## Solution 3: Use a Different Email Provider

You can also use:
- **Outlook** (similar setup to Gmail)
- **Yahoo** (similar setup)
- **Custom SMTP** (requires SMTP server details)

## Verify Your Template Variables

Make sure your EmailJS template uses these exact variable names:
- `{{from_name}}` - for the sender's name
- `{{from_email}}` - for the sender's email  
- `{{message}}` - for the message content
- `{{to_email}}` - optional, for recipient email

These must match what we're sending in the code:
```javascript
{
  from_name: formData.name,
  from_email: formData.email,
  message: formData.message,
  to_email: 'jay94588@gmail.com',
}
```

## Test After Fixing

1. Restart your dev server: `npm run dev`
2. Go to the Contact page
3. Fill out the form
4. Submit and check for errors in the console
5. Check your email inbox (and spam folder)

## Still Having Issues?

1. **Check EmailJS Dashboard** → **Logs** to see detailed error messages
2. **Verify all environment variables** are set correctly in `.env`
3. **Make sure you restarted the dev server** after changing `.env`
4. **Check the browser console** for any other errors

## Quick Checklist

- [ ] Service ID is correct in `.env`
- [ ] Template ID is correct in `.env`
- [ ] Public Key is correct in `.env`
- [ ] Email service is active in EmailJS dashboard
- [ ] Template variables match: `{{from_name}}`, `{{from_email}}`, `{{message}}`
- [ ] Dev server was restarted after `.env` changes
- [ ] No typos in environment variable names (must start with `VITE_`)

