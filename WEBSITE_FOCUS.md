# AptyRead Business Website - Focus Document

## 🎯 Current Focus: Business Website Only

This document outlines the current state of the business website. Admin panel and Firebase integration will be added later.

## ✅ Completed Features

### Homepage Components
- ✅ **Header** - Sticky navigation with "Coming Soon" badge
- ✅ **Hero Section** - "Learn to Read English Naturally" with environmental sounds messaging
- ✅ **Features Section** - 6 key features (One Lesson a Day, Environmental Sounds, etc.)
- ✅ **How It Works** - 4-level course structure explanation
- ✅ **Screenshots Section** - Placeholder for app screenshots (ready for real images)
- ✅ **Testimonials** - 3 parent testimonials
- ✅ **Trust Badges** - 5 trust indicators
- ✅ **CTA Section** - "Available soon on Google Play Store" messaging
- ✅ **Footer** - Complete with contact emails and links

### Additional Pages
- ✅ **Privacy Policy** (`/privacy.html` via rewrite to `/privacy`)
- ✅ **Delete Account** (`/delete-account.html` via rewrite to `/delete-account`)

### Design & Branding
- ✅ **Warm Background** (#FFF9F7) - Unique 5% coral + white throughout
- ✅ **Brand Colors** - Coral (#FF6B35), Cyan (#0099CC), Gold (#FFB300)
- ✅ **Typography** - Inter font family, large readable text
- ✅ **Mobile Responsive** - Works on all devices
- ✅ **ESL-Friendly** - Simple language, clear structure

### Technical
- ✅ **Next.js 14** with App Router
- ✅ **TypeScript** for type safety
- ✅ **Tailwind CSS** with custom brand colors
- ✅ **SEO Optimized** - Meta tags, Open Graph
- ✅ **Accessibility** - Semantic HTML, proper contrast

## 📝 Current Status: "Coming Soon"

The website is configured for "Coming Soon" status:
- Hero CTA shows "Available soon on Google Play Store"
- Header shows "Coming Soon" badge
- Footer indicates "Available soon on Google Play Store"

**To change to "Live" status:**
1. Update `components/public/Hero.tsx` - Change button to active link
2. Update `components/public/Header.tsx` - Change to active download link
3. Update `components/public/CTA.tsx` - Change to active download link
4. Update `components/public/Footer.tsx` - Change to active download link

## 🚀 Next Steps

### Immediate (Before Launch)
1. **Add Real Screenshots**
   - Replace placeholders in `components/public/Screenshots.tsx`
   - Add images to `public/images/` folder
   - Update image paths

2. **Update Testimonials** (Optional)
   - Replace placeholder testimonials with real ones
   - Add parent photos (with permission)

3. **Add Favicon**
   - Create favicon.ico
   - Add to `public/` folder
   - Update `app/layout.tsx` with favicon link

4. **Deploy to Vercel**
   - Connect GitHub repository
   - Deploy to production
   - Update domain DNS if needed

### Future Enhancements
- Add analytics (Google Analytics, etc.)
- Add newsletter signup (optional)
- Add blog section (optional)
- Add more language support pages

## 📁 File Structure

```
app/
├── page.tsx              # Homepage
├── layout.tsx            # Root layout with metadata
├── privacy/
│   └── page.tsx          # Privacy Policy
└── delete-account/
    └── page.tsx          # Delete Account page

components/public/
├── Header.tsx
├── Hero.tsx
├── Features.tsx
├── HowItWorks.tsx
├── Screenshots.tsx
├── Testimonials.tsx
├── TrustBadges.tsx
├── CTA.tsx
└── Footer.tsx
```

## 🎨 Brand Colors Reference

```css
--apty-coral: #FF6B35        /* Primary CTAs */
--apty-cyan: #0099CC         /* Links */
--apty-gold: #FFB300         /* Success/achievements */
--apty-warm: #FFF9F7         /* Background (5% coral + white) */
--apty-dark: #2D3748         /* Text */
--apty-gray: #64748B         /* Secondary text */
--apty-coral-accent: #FFE5DD /* Borders */
```

## 📞 Contact Information

- **Support**: support@aptyread.ai
- **Contact**: contact@aptyread.ai
- **Website**: https://www.aptyread.ai/

## 🔗 Important Links

- **Privacy Policy**: https://www.aptyread.ai/privacy.html
- **Delete Account**: https://www.aptyread.ai/delete-account.html

## 📝 Notes

- Admin panel components exist but are not integrated yet
- Firebase configuration files exist but are not required for business website
- All components use the warm background (#FFF9F7) for consistency
- Website is production-ready once screenshots are added

