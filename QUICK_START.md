# Quick Start Guide - AptyRead Business Website

## 🚀 Getting Started (Business Website Only)

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your website.

### 3. Build for Production

```bash
npm run build
npm start
```

## 📝 What's Included

✅ Complete business website with all sections
✅ Privacy Policy and Delete Account pages
✅ Mobile responsive design
✅ SEO optimized
✅ Brand colors configured

## 🎨 Customization

### Add App Screenshots

1. Add images to `public/images/` folder
2. Update `components/public/Screenshots.tsx` with real image paths

### Update "Coming Soon" to "Live"

When the app is available on Play Store:

1. **Hero Section** (`components/public/Hero.tsx`):
   - Change the disabled button to an active link
   - Update href to Play Store URL

2. **Header** (`components/public/Header.tsx`):
   - Change "Coming Soon" to active download link

3. **CTA Section** (`components/public/CTA.tsx`):
   - Change disabled button to active link

4. **Footer** (`components/public/Footer.tsx`):
   - Update download section with active link

### Update Testimonials

Edit `components/public/Testimonials.tsx` to add real parent testimonials.

## 🌐 Deploy to Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy (no environment variables needed for business website)

## 📦 Dependencies Note

The `package.json` includes Firebase dependencies, but they're not required for the business website. They're there for future admin panel integration. You can ignore them for now.

## ✅ Ready to Deploy

The website is production-ready! Just add screenshots and deploy.

