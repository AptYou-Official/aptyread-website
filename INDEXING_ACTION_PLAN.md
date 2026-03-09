# Google Search Console – Indexing action plan

You got an email because some pages on **aptyread.ai** are not being indexed. Here’s what each reason means and what was done.

---

## 1. Not found (404) – 9 pages ✅ FIXED

**URLs from GSC (old site structure):**

| Old URL | Redirects to |
|--------|----------------|
| `/index.html` | `/` |
| `/terms-of-use-aptyread` | `/terms` |
| `/refund-policy-aptyread` | `/terms` |
| `/privacy-policy-aptyread` | `/privacy` |
| `/about-aptyread` | `/about` |
| `/contact-aptyread` | `/contact` |
| `/why-choose-aptyread` | `/` |
| `/download-aptyread-app` | `/download` |

**Done in code:** All of the above are now **301 redirects** in `next.config.mjs`. A custom **404 page** (`app/not-found.tsx`) handles any other missing URLs.

---

## 2. Page with redirect – 5 pages

**Meaning:** These URLs redirect (301/302) to another URL. Google does not index the redirecting URL; it indexes the destination. That’s normal.

**What’s in place:** The site redirects legacy `.html` URLs to the clean ones:

- `/privacy.html` → `/privacy`
- `/delete-account.html` → `/delete-account`
- `/terms.html` → `/terms`
- `/faq.html` → `/faq`

The 5th may be something like `http`→`https` or non-www→www (handled by Vercel/hosting).

**What to do:** No change needed. This is intentional. In GSC you can ignore these or mark as “Intentional” if there’s an option.

---

## 3. Alternate page with proper canonical tag – 1 page ✅ NO ACTION NEEDED

**URL from GSC:**  
`https://www.aptyread.ai/?from=AppAgg.com&utm_campaign=AppAgg.com&utm_medium=referral&utm_source=AppAgg.com`

**Meaning:** This is the homepage with UTM parameters (from AppAgg.com). The page correctly has a canonical pointing to `https://www.aptyread.ai/`, so Google does not index this URL and instead indexes the canonical. This is **intentional and correct** — no fix needed.

---

## 4. Crawled – currently not indexed – 8 pages ✅ PARTIALLY FIXED

**URLs from GSC:** Old paths and one static file:

| URL | Action taken |
|-----|----------------|
| `/child-safety-policy-aptyread` | Redirect → `/privacy` |
| `/aptyread-pricing-plans` | Redirect → `/` |
| `/courses` | Redirect → `/` |
| `/contact-aptyread` | Redirect → `/contact` |
| `/for-parents` | Redirect → `/` |
| `/about-aptyread` | Redirect → `/about` |
| `/_next/static/media/...woff2` (font) | `robots.txt` now disallows `/_next/` so Google won’t treat it as a page |

**Done in code:** Redirects added for old paths. `robots.ts` now disallows `/_next/` so static assets (JS, CSS, fonts) are not crawled as pages. After deploy, you can use **URL Inspection** → **Request indexing** on important live URLs (e.g. `/`, `/download`, `/educators`) if you want them re-checked.

---

## Quick checklist

| Issue                         | Count | Status |
|------------------------------|-------|--------|
| Not found (404)              | 9     | ✅ Redirects added for all old URLs. |
| Page with redirect           | 5     | No action; redirects are intentional. |
| Alternate with canonical     | 1     | ✅ UTM homepage URL; correct, no action. |
| Crawled - not indexed        | 8     | ✅ Old paths redirect; `/_next/` disallowed in robots. |

---

## After you deploy

1. Deploy this commit so the new redirects and `robots.txt` go live.
2. In GSC, open **Not found (404)** → click **VALIDATE FIX** so Google re-crawls and clears the 404s.
3. Optionally use **URL Inspection** on `https://www.aptyread.ai/`, `/download`, `/educators` and click **Request indexing** to speed up re-indexing of key pages.
