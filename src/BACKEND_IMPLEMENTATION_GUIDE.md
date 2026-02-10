# Backend Implementation Guide: Brochure Email System

This guide covers implementing the complete email delivery and lead tracking system for the Nukkad Shops brochure downloads.

## Overview

The system needs to:
1. ✅ Store customer lead information in a database
2. ✅ Send the brochure PDF via email to customers
3. ✅ Track download timestamps and user engagement
4. ✅ Provide analytics on brochure downloads

---

## Option 1: Supabase Implementation (Recommended)

### Step 1: Database Setup

Create a `brochure_leads` table in Supabase:

```sql
-- Create the brochure_leads table
CREATE TABLE brochure_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  mobile TEXT NOT NULL,
  city TEXT NOT NULL,
  source TEXT DEFAULT 'website_brochure_popup',
  downloaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email_sent BOOLEAN DEFAULT false,
  email_sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_brochure_leads_email ON brochure_leads(email);
CREATE INDEX idx_brochure_leads_created_at ON brochure_leads(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE brochure_leads ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from authenticated or anonymous users
CREATE POLICY "Allow insert for all users" ON brochure_leads
  FOR INSERT
  WITH CHECK (true);

-- Create policy for reading (only for authenticated admin users)
CREATE POLICY "Allow read for authenticated users" ON brochure_leads
  FOR SELECT
  USING (auth.role() = 'authenticated');
```

### Step 2: Upload Brochure PDF to Supabase Storage

1. Go to Supabase Dashboard > Storage
2. Create a new bucket called `brochures`
3. Make it public (for download links)
4. Upload your `nukkad-shops-brochure.pdf` file

### Step 3: Email Service Setup (Resend - Recommended)

1. Sign up at https://resend.com
2. Get your API key
3. Add it to Supabase Edge Function secrets:

```bash
supabase secrets set RESEND_API_KEY=re_xxxxxxxxxxxxx
```

### Step 4: Create Supabase Edge Function

Create `supabase/functions/send-brochure/index.ts`:

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { 
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      }
    })
  }

  try {
    const { name, email, mobile, city } = await req.json()

    // Initialize Supabase client
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!)

    // 1. Store lead in database
    const { data: lead, error: dbError } = await supabase
      .from('brochure_leads')
      .insert({
        name,
        email,
        mobile,
        city,
        source: 'website_brochure_popup'
      })
      .select()
      .single()

    if (dbError) throw dbError

    // 2. Get brochure PDF URL from Supabase Storage
    const { data: brochureData } = supabase
      .storage
      .from('brochures')
      .getPublicUrl('nukkad-shops-brochure.pdf')

    const brochureUrl = brochureData.publicUrl

    // 3. Send email with Resend
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Nukkad Shops <hello@nukkadshops.com>',
        to: [email],
        subject: 'Your Nukkad Shops POS Device Brochure',
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #2EA7E0 0%, #1e88c7 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                .button { display: inline-block; background: #2EA7E0; color: white; padding: 15px 30px; text-decoration: none; border-radius: 50px; margin: 20px 0; }
                .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Welcome to Nukkad Shops!</h1>
                </div>
                <div class="content">
                  <p>Dear ${name},</p>
                  
                  <p>Thank you for your interest in Nukkad Shops POS devices!</p>
                  
                  <p>We've attached our comprehensive brochure that showcases our complete range of POS solutions designed specifically for small retailers like you.</p>
                  
                  <p><strong>Inside the brochure, you'll discover:</strong></p>
                  <ul>
                    <li>Complete product lineup (Aspire, Elite-A, Pro2)</li>
                    <li>Feature comparisons and specifications</li>
                    <li>Pricing and payment options</li>
                    <li>Success stories from retailers using our devices</li>
                  </ul>
                  
                  <p style="text-align: center;">
                    <a href="${brochureUrl}" class="button">Download Your Brochure</a>
                  </p>
                  
                  <p>Have questions? Our team is ready to help you find the perfect POS solution for your store.</p>
                  
                  <p><strong>Contact us:</strong></p>
                  <p>📞 Phone: +91-XXXXXXXXXX<br>
                  📧 Email: hello@nukkadshops.com<br>
                  🌐 Website: www.nukkadshops.com</p>
                  
                  <p>Best regards,<br>
                  <strong>The Nukkad Shops Team</strong></p>
                </div>
                <div class="footer">
                  <p>© 2025 Nukkad Shops. All rights reserved.</p>
                  <p>Location: ${city}</p>
                </div>
              </div>
            </body>
          </html>
        `,
        // Optional: Attach the PDF directly
        attachments: [
          {
            filename: 'nukkad-shops-brochure.pdf',
            path: brochureUrl
          }
        ]
      }),
    })

    const emailResult = await emailResponse.json()

    // 4. Update lead record with email status
    if (emailResponse.ok) {
      await supabase
        .from('brochure_leads')
        .update({
          email_sent: true,
          email_sent_at: new Date().toISOString()
        })
        .eq('id', lead.id)
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Brochure sent successfully',
        leadId: lead.id,
        emailSent: emailResponse.ok
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        status: 400,
      },
    )
  }
})
```

### Step 5: Deploy Edge Function

```bash
supabase functions deploy send-brochure
```

### Step 6: Update Frontend Code

Update `/components/BrochurePopup.tsx` to call the Edge Function:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!formData.recaptcha) {
    alert('Please verify that you are not a robot');
    return;
  }

  setIsSubmitting(true);

  try {
    // Call Supabase Edge Function
    const response = await fetch(
      'https://YOUR_PROJECT_ID.supabase.co/functions/v1/send-brochure',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer YOUR_ANON_KEY`
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          city: formData.city
        })
      }
    );

    const result = await response.json();

    if (result.success) {
      setSubmitSuccess(true);
      
      setTimeout(() => {
        setSubmitSuccess(false);
        setIsSubmitting(false);
        onClose();
        setFormData({
          name: '',
          mobile: '',
          city: '',
          email: '',
          recaptcha: false,
        });
      }, 3000);
    } else {
      throw new Error(result.error);
    }

  } catch (error) {
    console.error('Error submitting form:', error);
    alert('Something went wrong. Please try again.');
    setIsSubmitting(false);
  }
};
```

---

## Option 2: Custom Backend API (Node.js/Express)

If you prefer to use your own backend:

### Step 1: Install Dependencies

```bash
npm install express nodemailer pg
```

### Step 2: Create API Endpoint

```javascript
// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Email transporter (using Gmail as example)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Brochure endpoint
app.post('/api/send-brochure', async (req, res) => {
  const { name, email, mobile, city } = req.body;

  try {
    // 1. Store in database
    const result = await pool.query(
      'INSERT INTO brochure_leads (name, email, mobile, city) VALUES ($1, $2, $3, $4) RETURNING id',
      [name, email, mobile, city]
    );

    // 2. Send email with brochure
    await transporter.sendMail({
      from: '"Nukkad Shops" <hello@nukkadshops.com>',
      to: email,
      subject: 'Your Nukkad Shops POS Device Brochure',
      html: '...', // Use the same HTML template from above
      attachments: [
        {
          filename: 'nukkad-shops-brochure.pdf',
          path: './brochures/nukkad-shops-brochure.pdf'
        }
      ]
    });

    // 3. Update email sent status
    await pool.query(
      'UPDATE brochure_leads SET email_sent = true, email_sent_at = NOW() WHERE id = $1',
      [result.rows[0].id]
    );

    res.json({
      success: true,
      message: 'Brochure sent successfully'
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

---

## Analytics Dashboard

Create a simple analytics view in your admin panel:

```sql
-- Total downloads
SELECT COUNT(*) as total_downloads FROM brochure_leads;

-- Downloads by city
SELECT city, COUNT(*) as count 
FROM brochure_leads 
GROUP BY city 
ORDER BY count DESC;

-- Downloads over time
SELECT DATE(downloaded_at) as date, COUNT(*) as count
FROM brochure_leads
GROUP BY DATE(downloaded_at)
ORDER BY date DESC;

-- Email delivery success rate
SELECT 
  COUNT(*) as total,
  SUM(CASE WHEN email_sent THEN 1 ELSE 0 END) as sent,
  ROUND(100.0 * SUM(CASE WHEN email_sent THEN 1 ELSE 0 END) / COUNT(*), 2) as success_rate
FROM brochure_leads;
```

---

## Security Considerations

1. **Never expose API keys** in frontend code
2. **Validate email addresses** before sending
3. **Rate limit** the API endpoint to prevent abuse
4. **Use HTTPS** for all API calls
5. **Implement CAPTCHA** verification properly (integrate real reCAPTCHA)
6. **GDPR Compliance**: Add privacy policy and data consent
7. **Sanitize inputs** to prevent SQL injection

---

## Testing

1. Test with a real email address (your own)
2. Verify PDF attachment arrives correctly
3. Check database entries are created
4. Test error handling (invalid emails, network issues)
5. Monitor email delivery rates

---

## Production Checklist

- [ ] Database table created with proper indexes
- [ ] Brochure PDF uploaded to storage
- [ ] Email service configured (Resend/SendGrid)
- [ ] Edge Function deployed and tested
- [ ] Frontend updated with production API URLs
- [ ] Environment variables secured
- [ ] Rate limiting implemented
- [ ] Error monitoring set up (Sentry, etc.)
- [ ] Analytics dashboard created
- [ ] Privacy policy updated
- [ ] GDPR consent flow added

---

## Cost Estimates

**Supabase + Resend:**
- Supabase: Free tier (up to 500MB database, 1GB storage)
- Resend: Free tier (100 emails/day, 3,000/month)
- **Total: $0 to start, scales as needed**

**Custom Backend + Gmail:**
- Server hosting: $5-20/month
- Gmail: 500 emails/day limit (free)
- **Total: $5-20/month**

---

## Support

For implementation help:
- Supabase Docs: https://supabase.com/docs
- Resend Docs: https://resend.com/docs
- Nodemailer Docs: https://nodemailer.com

---

**Current Status**: Demo mode with localStorage simulation
**Next Step**: Choose implementation option and deploy backend
