# Miying Rides - Amusement Rides Portfolio & Factory Visits

A modern, multilingual Next.js website for Miying Amusement Equipment, showcasing amusement rides, services, and factory visit booking capabilities.

## 🌟 Features

### Core Features
- **Multilingual Support**: 11 languages (English, Chinese, Arabic, Russian, Japanese, Korean, Thai, Vietnamese, Indonesian, Hindi, Spanish)
- **Product Catalog**: Interactive product grid with filtering and search
- **Dynamic Product Pages**: Individual product detail pages (`/products/[id]`) with comprehensive information
- **Breadcrumbs Navigation**: Visual navigation trail for better UX and SEO
- **Service Showcase**: Consulting, sourcing, refurbishment, and assembly services
- **Factory Visit Booking**: Verification-based booking system for verified clients
- **Contact Forms**: Integrated contact forms with multiple email service options
- **Responsive Design**: Mobile-first, fully responsive UI

### SEO & Performance
- **Comprehensive SEO**: Metadata, Open Graph, Twitter Cards, structured data (JSON-LD)
- **Sitemap & Robots**: Auto-generated sitemap.xml and robots.txt (includes all product pages)
- **Google Search Console**: Integrated verification
- **Structured Data**: Organization, WebSite, Product, Service, BreadcrumbList, LocalBusiness schemas
- **Multilingual SEO**: Hreflang tags for all language variants (automatic for product pages)
- **Dynamic Product SEO**: Each product page has hreflang tags for all 11 languages

### Content Management
- **Decoupled Content**: Content separated from components for easy maintenance
- **Type-Safe**: Full TypeScript support with strict type checking
- **Modular Locales**: Individual language files for easy updates

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mying-web
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (optional):
```bash
# Create .env.local for local development
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
mying-web/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout with global metadata
│   │   ├── page.tsx            # Home page
│   │   ├── about/              # About page
│   │   ├── services/           # Services page
│   │   ├── products/           # Products catalog page
│   │   ├── contact/            # Contact page
│   │   ├── visit/              # Factory visit booking page
│   │   ├── not-found.tsx       # 404 page
│   │   ├── robots.ts           # robots.txt generator
│   │   ├── sitemap.ts          # sitemap.xml generator
│   │   └── api/                # API routes
│   │       └── contact/        # Contact form API
│   ├── components/             # React components
│   │   ├── Header.tsx          # Navigation header
│   │   ├── Footer.tsx          # Site footer
│   │   ├── ProductGrid.tsx     # Product display grid
│   │   ├── ContactForm.tsx     # Contact form component
│   │   ├── StructuredDataServer.tsx  # Server-side structured data
│   │   └── ui/                 # UI components
│   └── content/                # Content management
│       ├── copy.ts             # Main content loader (backward compatible)
│       ├── types.ts            # TypeScript types
│       ├── locales/            # Language-specific files
│       │   ├── index.ts        # Locale loader
│       │   ├── en.ts           # English
│       │   ├── zh.ts           # Chinese
│       │   └── ...             # Other languages
│       ├── products_multilingual.ts  # Product data
│       └── services_multilingual.ts  # Service data
├── public/                     # Static assets
│   ├── logo.jpg               # Site logo
│   └── products/              # Product images
├── SEO_OPTIMIZATION.md         # SEO documentation
├── CONTENT_DECOUPLING.md       # Content management guide
├── CONTENT_MANAGEMENT.md       # Content structure guide
├── GOOGLE_VERIFICATION_GUIDE.md # Google Search Console setup
└── MAINTENANCE.md              # Maintenance guide
```

## 🌐 Multilingual Support

The website supports 11 languages with automatic language detection and manual switching:

- English (en)
- Chinese (zh)
- Arabic (ar)
- Russian (ru)
- Japanese (ja)
- Korean (ko)
- Thai (th)
- Vietnamese (vi)
- Indonesian (id)
- Hindi (hi)
- Spanish (es)

Language is managed via URL query parameter (`?lang=xx`) and stored in browser localStorage.

See [CONTENT_DECOUPLING.md](./CONTENT_DECOUPLING.md) for details on content management.

## 📝 Content Management

All content is centralized in `src/content/`:

- **UI Text**: `src/content/locales/{lang}.ts` - Language-specific UI strings
- **Products**: `src/content/products_multilingual.ts` - Product catalog data
- **Services**: `src/content/services_multilingual.ts` - Service descriptions

### Adding/Editing Content

1. **UI Text**: Edit the appropriate language file in `src/content/locales/`
2. **Products**: Edit `src/content/products_multilingual.ts`
   - Product detail pages are automatically available at `/products/{slug}`
   - Hreflang tags are automatically generated for all 11 languages
3. **Services**: Edit `src/content/services_multilingual.ts`

See [CONTENT_MANAGEMENT.md](./CONTENT_MANAGEMENT.md) for detailed instructions.

## 🔍 SEO Features

### Implemented
- ✅ Page-specific metadata (title, description, keywords)
- ✅ Open Graph and Twitter Cards
- ✅ Structured data (JSON-LD) for Organization, WebSite, Product, Service, BreadcrumbList, LocalBusiness
- ✅ Auto-generated sitemap.xml with all language variants (includes all product pages)
- ✅ robots.txt configuration
- ✅ Google Search Console verification
- ✅ Canonical URLs
- ✅ Hreflang tags for multilingual SEO (automatic for all product pages)
- ✅ Dynamic product page SEO with hreflang for all 11 languages

### SEO Documentation
See [SEO_OPTIMIZATION.md](./SEO_OPTIMIZATION.md) for detailed SEO implementation and optimization suggestions.

## 📧 Contact Form Setup

The contact form supports multiple email service providers with automatic fallback. The system will try providers in this order: Resend → SendGrid → Webhook.

### Option 1: Resend (Recommended)
- Free tier: 3,000 emails/month
- Sign up at [resend.com](https://resend.com)
- Set `RESEND_API_KEY` and `CONTACT_EMAIL` in Vercel environment variables

### Option 2: SendGrid
- Free tier: 100 emails/day
- Sign up at [sendgrid.com](https://sendgrid.com)
- Install: `npm install @sendgrid/mail`
- Set `SENDGRID_API_KEY` and `CONTACT_EMAIL`

### Option 3: Webhook (Formspree)
- Easiest option - no code changes needed
- Sign up at [formspree.io](https://formspree.io) or use [webhook.site](https://webhook.site)
- Set `WEBHOOK_URL` and `CONTACT_EMAIL`

### Email Features
- ✅ Automatic provider fallback
- ✅ HTML and plain text email support
- ✅ Input sanitization (XSS protection)
- ✅ Email validation
- ✅ Error handling and logging

See `src/lib/email.ts` for the email utility implementation.

## 🚢 Deployment

### Vercel (Recommended)

This project is configured for automatic deployment on Vercel:

1. **Automatic Deployment**: Pushes to `main` branch trigger automatic deployment
2. **Manual Deploy**: Use GitHub Actions → "Deploy to Vercel" workflow

### Environment Variables

Set these in Vercel → Project Settings → Environment Variables:

- `NEXT_PUBLIC_SITE_URL`: Your production URL (e.g., `https://mying.vercel.app`)
- `RESEND_API_KEY` (or other email service keys)
- `CONTACT_EMAIL`: Email address to receive form submissions

### Build Commands

```bash
npm run build  # Build for production
npm run start  # Start production server
```

## 🛠️ Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npm test         # Run tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage
```

### Local Cleanup

To clean build files locally:

```powershell
# Windows PowerShell
cd mying-web
Remove-Item -Recurse -Force .next
Remove-Item -Recurse -Force node_modules  # Optional
```

Or use the provided script:
```powershell
.\clean.ps1
```

See [MAINTENANCE.md](./MAINTENANCE.md) for more maintenance tips.

## 📚 Documentation

### Core Documentation
- [SEO_OPTIMIZATION.md](./SEO_OPTIMIZATION.md) - SEO implementation and optimization
- [CONTENT_DECOUPLING.md](./CONTENT_DECOUPLING.md) - Content decoupling architecture
- [CONTENT_MANAGEMENT.md](./CONTENT_MANAGEMENT.md) - Content management guide
- [GOOGLE_VERIFICATION_GUIDE.md](./GOOGLE_VERIFICATION_GUIDE.md) - Google Search Console setup
- [MAINTENANCE.md](./MAINTENANCE.md) - Maintenance and cleanup guide
- [TESTING.md](./TESTING.md) - Testing guide and setup

### Security & Improvements
- [CRITICAL_IMPROVEMENTS.md](./CRITICAL_IMPROVEMENTS.md) - Completed critical improvements
- [ADMIN_AUTH_SETUP.md](./ADMIN_AUTH_SETUP.md) - Admin authentication setup guide
- [IMPROVEMENT_RECOMMENDATIONS.md](./IMPROVEMENT_RECOMMENDATIONS.md) - Comprehensive improvement recommendations
- [QUICK_WINS.md](./QUICK_WINS.md) - Quick improvements you can make today

### Email Setup
- [FORMSPREE_SETUP.md](./FORMSPREE_SETUP.md) - Formspree webhook setup guide
- [FORMSPREE_QUICK_SETUP.md](./FORMSPREE_QUICK_SETUP.md) - Quick Formspree reference

## 🛡️ Tech Stack

- **Framework**: Next.js 16.1.1 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **React**: 19.2.3
- **Email**: Nodemailer (optional, for Gmail SMTP)

## 📄 License

Private project - All rights reserved.

## 🤝 Support

For questions or issues, please contact the development team.

---

**Built with ❤️ for Miying Amusement Equipment**
