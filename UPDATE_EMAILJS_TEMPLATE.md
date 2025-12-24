# How to Update EmailJS Template to Show Sender's Email

## Quick Fix: Update Your EmailJS Template

You're receiving emails but not seeing the sender's email address. Follow these steps to fix it:

### Step 1: Go to EmailJS Dashboard

1. Log in to [EmailJS Dashboard](https://dashboard.emailjs.com/admin)
2. Go to **Email Templates**
3. Click on your contact form template (or create a new one)

### Step 2: Update the Email Template

**Subject Line:**
```
New Contact Form Message from {{from_name}} ({{from_email}})
```

**Email Content/Body:**
```
Hello,

You have received a new message from your portfolio contact form:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Reply to: {{from_email}}

---
This message was sent from your portfolio website.
```

### Step 3: Alternative Template (More Detailed)

If you want more information, use this template:

```
Hello,

You have received a new message from your portfolio contact form.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CONTACT INFORMATION:
Name: {{from_name}}
Email: {{from_email}}
Reply To: {{reply_to}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MESSAGE:
{{message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

To reply to this message, simply reply to this email or contact:
{{from_email}}

---
This message was sent from your portfolio website contact form.
```

### Step 4: Important Settings

1. **To Email Field**: Set to `jay94588@gmail.com` (or use `{{to_email}}` variable)
2. **From Name**: Can be `Portfolio Contact Form` or `{{from_name}}`
3. **Reply To**: Set to `{{from_email}}` or `{{reply_to}}` (this allows you to reply directly)

### Step 5: Save and Test

1. Click **Save** on your template
2. Go back to your website
3. Submit a test message from the contact form
4. Check your email - you should now see the sender's email address

## Available Template Variables

The code sends these variables that you can use in your template:

- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email address ⭐ **USE THIS**
- `{{sender_name}}` - Same as from_name
- `{{sender_email}}` - Same as from_email ⭐ **USE THIS**
- `{{user_email}}` - Same as from_email ⭐ **USE THIS**
- `{{message}}` - The message content
- `{{to_email}}` - Recipient email (jay94588@gmail.com)
- `{{reply_to}}` - Reply-to email (same as sender's email)

## Pro Tip: Make Email Clickable

You can make the email address clickable in your template:

```
Email: <a href="mailto:{{from_email}}">{{from_email}}</a>
```

Or in plain text format:
```
Email: {{from_email}}
(You can copy and paste this into your email client)
```

## Troubleshooting

**Still not seeing the email?**
1. Make sure you saved the template after editing
2. Check that you're using `{{from_email}}` (with double curly braces)
3. Verify the variable name matches exactly (case-sensitive)
4. Try using `{{sender_email}}` or `{{user_email}}` as alternatives
5. Check your spam folder - sometimes formatted emails go there

**Want to test quickly?**
- Use the EmailJS dashboard's "Test" feature
- Or submit a test message from your contact form
- Check both inbox and spam folder

