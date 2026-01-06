# Chatbot Notifications Setup Guide

This guide will help you set up email and WhatsApp notifications when users chat with your AI bot.

## 📧 Email Notifications (Using EmailJS)

### Step 1: Create EmailJS Template for Chatbot Notifications

1. Go to your [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Navigate to **Email Templates** → **Create New Template**
3. Name it: **"Chatbot Notification"**

### Step 2: Configure the Template

**Subject:** `🤖 New Chatbot Message: {{user_message}}`

**Content:**
```
🤖 NEW CHATBOT MESSAGE FROM PORTFOLIO

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 User Message:
{{user_message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💬 Conversation Summary (Last 3 messages):
{{conversation_summary}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Details:
• Conversation Step: {{conversation_step}}
• Message Count: {{message_count}}
• Timestamp: {{timestamp}}
• Page URL: {{page_url}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📧 Potential Contact Info:
• Email: {{potential_email}}
• Phone: {{potential_phone}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Reply to this email or contact the user directly to follow up!

---
This notification was sent automatically from your portfolio chatbot.
```

### Step 3: Set Template Variables

Make sure your template includes these variables:
- `{{user_message}}` - The user's message
- `{{conversation_summary}}` - Recent conversation context
- `{{conversation_step}}` - Current conversation step
- `{{timestamp}}` - When the message was sent
- `{{page_url}}` - Page where chatbot was used
- `{{potential_email}}` - Email extracted from message (if any)
- `{{potential_phone}}` - Phone extracted from message (if any)
- `{{message_count}}` - Total number of user messages

### Step 4: Set Recipient Email

In the template settings:
- **To Email:** `jay94588@gmail.com`
- **From Name:** `Portfolio Chatbot`
- **From Email:** Your EmailJS service email

### Step 5: Copy Template ID

1. After saving the template, copy the **Template ID** (e.g., `template_xxxxx`)
2. Add it to your `.env` file:

```env
VITE_EMAILJS_CHATBOT_TEMPLATE_ID=your_chatbot_template_id_here
```

**Note:** If you don't set `VITE_EMAILJS_CHATBOT_TEMPLATE_ID`, it will use the same template as the contact form (`VITE_EMAILJS_TEMPLATE_ID`).

### Step 6: Test the Notifications

1. Restart your development server: `npm run dev`
2. Open your website and start chatting with the chatbot
3. Send a test message
4. Check your email (jay94588@gmail.com) for the notification

## 📱 WhatsApp Notifications (Optional)

### Option 1: WhatsApp Business API (Advanced)

For automated WhatsApp notifications, you'll need:
1. WhatsApp Business API account
2. Twilio or similar service
3. Backend server to handle API calls

**This requires backend setup and is more complex.**

### Option 2: Email-to-WhatsApp Service (Recommended)

Use a service like:
- **Zapier** - Connect EmailJS to WhatsApp
- **Integromat/Make** - Automate email to WhatsApp
- **IFTTT** - Simple automation

**Setup:**
1. Create a Zap/Workflow that triggers when you receive an email from EmailJS
2. Set it to send a WhatsApp message to your number
3. Format the message with chatbot details

### Option 3: Manual WhatsApp Link (Current Implementation)

The chatbot already includes a WhatsApp button that opens WhatsApp with a pre-filled message. Users can click it to contact you directly.

## 🔔 Notification Features

### What Gets Notified:

✅ **Every user message** - You'll receive an email for each message
✅ **Conversation context** - Includes recent message history
✅ **Contact info extraction** - Automatically extracts email/phone from messages
✅ **Page tracking** - Knows which page the user was on
✅ **Conversation step** - Tracks where they are in the conversion flow

### Notification Content Includes:

- User's message
- Last 3 user messages (conversation summary)
- Current conversation step
- Timestamp (IST timezone)
- Page URL
- Extracted email/phone (if mentioned)
- Message count

## 🚀 Production Setup

When deploying to production:

1. **Add environment variable** to your hosting platform:
   ```
   VITE_EMAILJS_CHATBOT_TEMPLATE_ID=your_template_id
   ```

2. **Verify EmailJS service** is active in production

3. **Test notifications** after deployment

## 📊 Monitoring

Check your EmailJS dashboard:
- **Logs** → See all sent notifications
- **Email Services** → Verify service is active
- **Templates** → Check template is configured correctly

## 🔧 Troubleshooting

### Not receiving notifications?

1. ✅ Check `.env` file has correct EmailJS credentials
2. ✅ Verify template ID is correct
3. ✅ Check EmailJS dashboard → Logs for errors
4. ✅ Verify email service is active
5. ✅ Check spam folder
6. ✅ Restart dev server after `.env` changes

### Notifications working but missing info?

1. ✅ Check template variables match exactly
2. ✅ Verify all variables are included in template
3. ✅ Check browser console for errors

## 💡 Pro Tips

1. **Set up email filters** - Create a filter in Gmail to label chatbot notifications
2. **Mobile notifications** - Enable email notifications on your phone
3. **Quick replies** - Use Gmail's quick reply feature for faster responses
4. **Follow up** - Reply to users within 2-4 hours as mentioned in your chatbot

## 📝 Example Notification Email

When a user sends: *"I need a business website, budget is ₹20,000, timeline 2 weeks"*

You'll receive:
```
🤖 NEW CHATBOT MESSAGE FROM PORTFOLIO

📝 User Message:
I need a business website, budget is ₹20,000, timeline 2 weeks

💬 Conversation Summary:
I need a business website, budget is ₹20,000, timeline 2 weeks

📊 Details:
• Conversation Step: 1
• Message Count: 1
• Timestamp: Monday, January 15, 2024 at 2:30:45 PM IST
• Page URL: https://yourwebsite.com/portfolio

📧 Potential Contact Info:
• Email: Not provided
• Phone: Not provided
```

This helps you quickly identify leads and respond promptly! 🚀

