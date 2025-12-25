# AptyRead Business Website

A beautiful, parent-friendly business website and admin panel for AptyRead - a literacy learning platform for children ages 4-10.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Firebase project with Firestore and Authentication enabled

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:

Create a `.env.local` file in the root directory:

```env
# Firebase Client SDK
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin SDK
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY=your_private_key
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
aptyread-business/
├── app/
│   ├── admin/              # Admin panel pages
│   │   ├── page.tsx        # Dashboard
│   │   ├── users/          # User management
│   │   ├── payments/       # Payment analytics
│   │   └── login/          # Admin login
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   └── globals.css         # Global styles
├── components/
│   ├── public/             # Public website components
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Screenshots.tsx
│   │   ├── Testimonials.tsx
│   │   ├── TrustBadges.tsx
│   │   ├── CTA.tsx
│   │   └── Footer.tsx
│   └── admin/              # Admin panel components
│       ├── Layout.tsx
│       ├── Sidebar.tsx
│       ├── StatsCard.tsx
│       ├── UserTable.tsx
│       └── PaymentChart.tsx
├── lib/
│   ├── firebase-admin.ts   # Firebase Admin SDK
│   ├── firebase-client.ts  # Firebase Client SDK
│   ├── auth.ts             # Authentication helpers
│   └── queries/            # Data fetching functions
│       ├── users.ts
│       └── payments.ts
└── public/                 # Static assets
```

## 🎨 Brand Colors

- **Apty Coral**: `#FF6B35` - Primary brand color
- **Apty Cyan**: `#0099CC` - Secondary brand color
- **Apty Gold**: `#FFB300` - Accent color
- **Apty Warm**: `#FFF9F7` - Unique 5% coral + white background
- **Apty Dark**: `#2D3748` - Dark text
- **Apty Gray**: `#64748B` - Gray text

## 🔐 Admin Panel Setup

1. Create an `admin_users` collection in Firestore
2. Add admin user documents with the user's Firebase UID as the document ID
3. Admin users can access `/admin` routes after logging in

## 📝 Features

### Public Website
- Beautiful, parent-friendly homepage
- ESL-friendly content and design
- Trust-building elements
- Mobile responsive
- SEO optimized

### Admin Panel
- User management
- Payment analytics
- Revenue tracking
- Dashboard with key metrics

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 📞 Support

- **Support Email**: support@aptyread.ai
- **Contact Email**: contact@aptyread.ai
- **Website**: https://www.aptyread.ai/

## 📄 License

© 2025 AptYou Services Pvt Ltd. All rights reserved.

