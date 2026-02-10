# Environment Variables Documentation

## 📋 Overview

This document provides comprehensive information about all environment variables used in the Nukkad Shops website project.

---

## 🚀 Quick Start

### 1. Setup Environment File

```bash
# Copy the example file
cp .env.example .env

# Edit with your actual values
nano .env  # or use your preferred editor
```

### 2. Accessing Environment Variables in Code

```typescript
// In React/TypeScript components
const apiUrl = import.meta.env.VITE_API_BASE_URL;
const companyPhone = import.meta.env.VITE_COMPANY_PHONE;
```

### 3. Important Notes

⚠️ **Security:**
- Never commit `.env` file with real credentials
- Always use `.env.example` as a template
- Use `.gitignore` to exclude `.env` files

⚠️ **Vite Prefix:**
- All variables must start with `VITE_` to be exposed to client-side code
- Variables without `VITE_` prefix are server-side only

---

## 📂 Variable Categories

### 1. Application Configuration

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `VITE_APP_NAME` | Application name | Nukkad Shops | ✅ |
| `VITE_APP_VERSION` | Current version | 2.0.0 | ✅ |
| `VITE_APP_ENV` | Environment | production/development | ✅ |

**Usage Example:**
```typescript
const appName = import.meta.env.VITE_APP_NAME;
document.title = `${appName} - Smart POS Solutions`;
```

---

### 2. Company Contact Information

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `VITE_COMPANY_PHONE` | Main contact number | +917997095678 | ✅ |
| `VITE_COMPANY_EMAIL` | Sales email | sales@nukkadshops.com | ✅ |
| `VITE_COMPANY_SUPPORT_EMAIL` | Support email | support@nukkadshops.com | ✅ |
| `VITE_COMPANY_ADDRESS` | Office location | Hyderabad, India | ✅ |

**Usage Example:**
```typescript
// In CallToAction component
<a href={`tel:${import.meta.env.VITE_COMPANY_PHONE}`}>
  Call Now
</a>

<a href={`mailto:${import.meta.env.VITE_COMPANY_EMAIL}`}>
  Email Us
</a>
```

---

### 3. Social Media Links

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `VITE_SOCIAL_FACEBOOK` | Facebook page URL | https://facebook.com/... | ❌ |
| `VITE_SOCIAL_TWITTER` | Twitter profile URL | https://twitter.com/... | ❌ |
| `VITE_SOCIAL_INSTAGRAM` | Instagram profile URL | https://instagram.com/... | ❌ |
| `VITE_SOCIAL_LINKEDIN` | LinkedIn company page | https://linkedin.com/... | ❌ |
| `VITE_SOCIAL_YOUTUBE` | YouTube channel | https://youtube.com/... | ❌ |

**Usage Example:**
```typescript
// In Footer component
const socialLinks = {
  facebook: import.meta.env.VITE_SOCIAL_FACEBOOK,
  twitter: import.meta.env.VITE_SOCIAL_TWITTER,
  instagram: import.meta.env.VITE_SOCIAL_INSTAGRAM,
};
```

---

### 4. WhatsApp Configuration

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `VITE_WHATSAPP_NUMBER` | WhatsApp number (no +) | 917997095678 | ❌ |
| `VITE_WHATSAPP_MESSAGE` | Pre-filled message | Hi, I'm interested... | ❌ |

**Usage Example:**
```typescript
const whatsappUrl = `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}?text=${encodeURIComponent(import.meta.env.VITE_WHATSAPP_MESSAGE)}`;
```

---

### 5. API Endpoints

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `VITE_API_BASE_URL` | Backend API URL | https://api.nukkadshops.com/v1 | ❌ |
| `VITE_API_TIMEOUT` | Request timeout (ms) | 30000 | ❌ |

**Usage Example:**
```typescript
// API configuration
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT),
});

// Making requests
api.get('/products').then(response => console.log(response.data));
```

---

### 6. Analytics & Tracking

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `VITE_GOOGLE_ANALYTICS_ID` | GA4 measurement ID | G-XXXXXXXXXX | ❌ |
| `VITE_FACEBOOK_PIXEL_ID` | Facebook Pixel ID | 123456789012345 | ❌ |
| `VITE_GTM_ID` | Google Tag Manager ID | GTM-XXXXXXX | ❌ |
| `VITE_HOTJAR_ID` | Hotjar site ID | 1234567 | ❌ |
| `VITE_HOTJAR_VERSION` | Hotjar version | 6 | ❌ |

**Usage Example:**
```typescript
// Google Analytics 4
import ReactGA from 'react-ga4';

if (import.meta.env.VITE_GOOGLE_ANALYTICS_ID) {
  ReactGA.initialize(import.meta.env.VITE_GOOGLE_ANALYTICS_ID);
}

// Track page views
ReactGA.send({ hitType: "pageview", page: window.location.pathname });
```

---

### 7. Payment Gateway

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `VITE_RAZORPAY_KEY_ID` | Razorpay public key | rzp_test_... | ❌ |
| `VITE_STRIPE_PUBLIC_KEY` | Stripe publishable key | pk_test_... | ❌ |

**Usage Example:**
```typescript
// Razorpay integration
const options = {
  key: import.meta.env.VITE_RAZORPAY_KEY_ID,
  amount: 10000, // Amount in paise
  currency: "INR",
  name: "Nukkad Shops",
};

const razorpay = new Razorpay(options);
razorpay.open();
```

---

### 8. Map & Location Services

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `VITE_GOOGLE_MAPS_API_KEY` | Google Maps API key | AIza... | ❌ |

**Usage Example:**
```typescript
// Google Maps embed
<iframe
  src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&q=Hyderabad+India`}
  allowFullScreen
/>
```

---

### 9. Feature Flags

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `VITE_FEATURE_CAREERS_PAGE` | Enable careers page | true | ❌ |
| `VITE_FEATURE_BLOG` | Enable blog section | false | ❌ |
| `VITE_FEATURE_LIVE_CHAT` | Enable live chat | false | ❌ |
| `VITE_FEATURE_BOOKING_SYSTEM` | Enable booking system | false | ❌ |
| `VITE_FEATURE_NEWSLETTER` | Enable newsletter | true | ❌ |

**Usage Example:**
```typescript
// Conditional rendering
{import.meta.env.VITE_FEATURE_CAREERS_PAGE === 'true' && (
  <Link to="/careers">Careers</Link>
)}

// Feature check
const isBlogEnabled = import.meta.env.VITE_FEATURE_BLOG === 'true';
```

---

### 10. Demo & Booking

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `VITE_DEMO_BOOKING_URL` | Calendly/booking URL | https://calendly.com/... | ❌ |
| `VITE_DEMO_VIDEO_URL` | Demo video URL | https://youtube.com/... | ❌ |

**Usage Example:**
```typescript
// Open booking in new tab
<button onClick={() => window.open(import.meta.env.VITE_DEMO_BOOKING_URL)}>
  Book a Demo
</button>
```

---

### 11. Downloads

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `VITE_BROCHURE_PDF_URL` | Brochure PDF path | /downloads/brochure.pdf | ❌ |
| `VITE_PRODUCT_CATALOG_URL` | Product catalog path | /downloads/catalog.pdf | ❌ |

**Usage Example:**
```typescript
// Download brochure
<a 
  href={import.meta.env.VITE_BROCHURE_PDF_URL} 
  download
>
  Download Brochure
</a>
```

---

### 12. SEO & Metadata

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `VITE_SITE_URL` | Website URL | https://nukkadshops.com | ✅ |
| `VITE_SITE_DESCRIPTION` | Meta description | Smart POS solutions... | ✅ |
| `VITE_SITE_KEYWORDS` | Meta keywords | POS, retail, billing | ✅ |

**Usage Example:**
```typescript
// In index.html or SEO component
<meta name="description" content={import.meta.env.VITE_SITE_DESCRIPTION} />
<meta name="keywords" content={import.meta.env.VITE_SITE_KEYWORDS} />
<link rel="canonical" href={import.meta.env.VITE_SITE_URL} />
```

---

### 13. Multi-Language Support

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `VITE_DEFAULT_LANGUAGE` | Default language code | en | ✅ |
| `VITE_SUPPORTED_LANGUAGES` | Comma-separated codes | en,hi,te,ta | ✅ |

**Usage Example:**
```typescript
const supportedLangs = import.meta.env.VITE_SUPPORTED_LANGUAGES.split(',');
const defaultLang = import.meta.env.VITE_DEFAULT_LANGUAGE;
```

---

## 🔒 Security Best Practices

### 1. Never Expose Sensitive Data
```typescript
// ❌ DON'T expose secret keys
VITE_API_SECRET_KEY=secret123  // Will be visible in browser!

// ✅ DO keep secrets server-side only
API_SECRET_KEY=secret123  // Not accessible from client
```

### 2. Use Different Values Per Environment

**Development (.env.development):**
```bash
VITE_API_BASE_URL=http://localhost:3000/api
VITE_ENABLE_DEV_TOOLS=true
```

**Production (.env.production):**
```bash
VITE_API_BASE_URL=https://api.nukkadshops.com/v1
VITE_ENABLE_DEV_TOOLS=false
```

### 3. Validate Environment Variables

```typescript
// config/env.ts
export const validateEnv = () => {
  const required = [
    'VITE_APP_NAME',
    'VITE_COMPANY_PHONE',
    'VITE_COMPANY_EMAIL',
  ];
  
  const missing = required.filter(key => !import.meta.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required env variables: ${missing.join(', ')}`);
  }
};

// Call at app startup
validateEnv();
```

---

## 🛠 Development Setup

### Local Development
```bash
# 1. Copy example file
cp .env.example .env

# 2. Update with your local values
# Edit .env file

# 3. Start development server
npm run dev
```

### Production Build
```bash
# 1. Set production variables
# Use .env.production or CI/CD secrets

# 2. Build
npm run build

# 3. Preview build
npm run preview
```

---

## 🔄 Environment-Specific Files

Vite supports multiple environment files:

```
.env                # Loaded in all cases
.env.local          # Loaded in all cases, ignored by git
.env.[mode]         # Only loaded in specified mode
.env.[mode].local   # Only loaded in specified mode, ignored by git
```

**Priority (highest to lowest):**
1. `.env.[mode].local`
2. `.env.[mode]`
3. `.env.local`
4. `.env`

---

## 📝 TypeScript Support

Create type definitions for environment variables:

```typescript
// src/env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string;
  readonly VITE_COMPANY_PHONE: string;
  readonly VITE_COMPANY_EMAIL: string;
  readonly VITE_API_BASE_URL: string;
  readonly VITE_GOOGLE_ANALYTICS_ID?: string;
  // Add more as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

---

## 🧪 Testing

### Mock Environment Variables in Tests

```typescript
// vitest.config.ts or jest.config.ts
export default {
  test: {
    env: {
      VITE_APP_NAME: 'Test App',
      VITE_COMPANY_PHONE: '+911234567890',
    },
  },
};
```

---

## 📊 CI/CD Configuration

### GitHub Actions Example

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Create .env file
        run: |
          echo "VITE_APP_NAME=${{ secrets.APP_NAME }}" >> .env
          echo "VITE_API_BASE_URL=${{ secrets.API_URL }}" >> .env
          echo "VITE_GOOGLE_ANALYTICS_ID=${{ secrets.GA_ID }}" >> .env
      
      - name: Build
        run: npm run build
```

---

## ✅ Checklist

Before deployment, ensure:

- [ ] All required variables are set
- [ ] `.env` file is in `.gitignore`
- [ ] `.env.example` is committed
- [ ] No sensitive data in client-side variables
- [ ] Production values are configured
- [ ] Analytics IDs are set (if using)
- [ ] API endpoints are correct
- [ ] Feature flags are appropriate
- [ ] TypeScript types are updated

---

## 🆘 Troubleshooting

### Variable Not Loading

**Problem:** Environment variable returns `undefined`

**Solutions:**
1. Check the variable starts with `VITE_`
2. Restart dev server after changing `.env`
3. Verify the variable is in the correct `.env` file
4. Check for typos in variable name

### Build Issues

**Problem:** Build fails with missing variables

**Solution:**
```bash
# Check which variables are available during build
npm run build -- --debug
```

---

## 📚 Resources

- [Vite Environment Variables Guide](https://vitejs.dev/guide/env-and-mode.html)
- [Best Practices for Environment Variables](https://12factor.net/config)
- [Security Considerations](https://owasp.org/www-community/vulnerabilities/Sensitive_Data_Exposure)

---

**Last Updated:** December 29, 2025  
**Version:** 2.0.0  
**Maintained by:** Nukkad Shops Development Team
