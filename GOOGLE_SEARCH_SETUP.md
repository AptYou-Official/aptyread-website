# Google Search Setup Guide for AptyRead

## Why Your Site Isn't Showing in Google Search

New websites typically take **2-4 weeks** to appear in Google search results. However, you can speed this up by:

1. ✅ **Submitting your site to Google Search Console** (Most Important)
2. ✅ **Creating a sitemap** (Done - automatically generated at `/sitemap.xml`)
3. ✅ **Adding structured data** (Done - JSON-LD added to homepage)
4. ✅ **Ensuring proper metadata** (Done - enhanced with canonical URLs)

---

## Step-by-Step: Google Search Console Setup

### Step 1: Verify Your Website Ownership

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click **"Add Property"**
3. Enter your website URL: `https://www.aptyread.ai`
4. Choose verification method:
   - **Recommended:** HTML file upload
   - **Alternative:** HTML tag (add to `<head>` in `app/layout.tsx`)

### Step 2: Submit Your Sitemap

1. After verification, go to **"Sitemaps"** in the left menu
2. Enter: `https://www.aptyread.ai/sitemap.xml`
3. Click **"Submit"**

### Step 3: Request Indexing (Optional but Recommended)

1. Go to **"URL Inspection"** in the left menu
2. Enter your homepage URL: `https://www.aptyread.ai`
3. Click **"Request Indexing"**
4. Repeat for important pages:
   - `https://www.aptyread.ai/faq`
   - `https://www.aptyread.ai/privacy`
   - `https://www.aptyread.ai/terms`

---

## What We've Already Done

### ✅ Sitemap.xml
- **Location:** Automatically generated at `https://www.aptyread.ai/sitemap.xml`
- **Contains:** All public pages with priorities and update frequencies
- **File:** `app/sitemap.ts`

### ✅ Robots.txt
- **Location:** Automatically generated at `https://www.aptyread.ai/robots.txt`
- **Allows:** All search engines to crawl your site
- **Blocks:** Admin and API routes
- **File:** `app/robots.ts`

### ✅ Structured Data (JSON-LD)
- **Added to:** Homepage (`app/page.tsx`)
- **Types:** EducationalOrganization and SoftwareApplication
- **Helps:** Google understand what your site is about

### ✅ Enhanced Metadata
- **Canonical URLs:** Prevents duplicate content issues
- **Open Graph:** Better social media sharing
- **Twitter Cards:** Better Twitter sharing
- **Robots meta:** Explicitly allows indexing

---

## Additional SEO Improvements

### 1. Get Backlinks
- Submit to educational directories
- Get featured in "best reading apps" lists
- Partner with parenting blogs
- Share on social media

### 2. Create Quality Content
- Blog posts about reading tips
- Parent guides
- Success stories
- Educational resources

### 3. Monitor Performance
- Check Google Search Console weekly
- Monitor which keywords bring traffic
- Fix any crawl errors
- Improve pages with low performance

---

## Expected Timeline

- **Week 1-2:** Google discovers your site
- **Week 2-4:** Your site appears in search results
- **Month 2-3:** Rankings improve as Google learns about your site
- **Month 3+:** Consistent search visibility

---

## Quick Checklist

- [ ] Verify website in Google Search Console
- [ ] Submit sitemap (`/sitemap.xml`)
- [ ] Request indexing for homepage
- [ ] Check for crawl errors (after 1 week)
- [ ] Monitor search performance (after 2 weeks)

---

## Need Help?

If your site still doesn't appear after 4 weeks:
1. Check Google Search Console for errors
2. Verify your site is accessible (no password protection)
3. Ensure your domain is properly configured
4. Check if your site is mobile-friendly (it is!)
5. Verify HTTPS is working (Vercel handles this automatically)

---

## Current SEO Status

✅ **Sitemap:** Created and ready  
✅ **Robots.txt:** Created and ready  
✅ **Structured Data:** Added to homepage  
✅ **Metadata:** Enhanced with all SEO best practices  
⏳ **Google Search Console:** Needs manual setup (follow steps above)

---

**Next Step:** Go to [Google Search Console](https://search.google.com/search-console) and follow Step 1-3 above.

