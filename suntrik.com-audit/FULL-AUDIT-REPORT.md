# Full SEO Audit — www.suntrik.com

**Date:** 26 Sep 2026 · **Method:** claude-seo `seo-audit` skill (v2.4.0), run inline · **Pages crawled:** 11 of 11 (raw HTML, no JavaScript) · **Lab tools:** Lighthouse 12 (mobile + desktop), curl header/redirect checks, AI-crawler user-agent tests · **Field data:** Vercel Web Analytics + Speed Insights (last 30 days)

## Executive summary

**SEO Health Score: 72 / 100** (estimated 30–35 before the 25 Sep fixes).

**Business type:** Local service business (hybrid: office in Sirsa + service area across Haryana/Rajasthan), solar EPC.

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 88 | 19.4 |
| Content Quality | 23% | 58 | 13.3 |
| On-Page SEO | 20% | 70 | 14.0 |
| Schema / Structured Data | 10% | 75 | 7.5 |
| Performance (CWV) | 10% | 78 | 7.8 |
| AI Search Readiness | 10% | 62 | 6.2 |
| Images | 5% | 72 | 3.6 |
| **Total** | 100% | | **71.8** |

Local SEO (reported separately, not in the weighted score): **50 / 100** — limited by what could be verified without GBP access.

### Top 5 issues
1. **Blog is thin and stale** — 3 posts, 342–414 words each (gate: 1,500), newest dated 10 Apr 2024, author "Suntrik Editorial", no source links.
2. **/blog does not link to its posts in HTML** — cards open a modal; posts get only 1–3 internal links (the 80 MWp post has 1).
3. **Homepage and /solar-company-sirsa share the same H1** ("Solar Company in Sirsa, Haryana") and similar titles — the two pages compete for the same query.
4. **NAP mismatch off-site** — JustDial lists 87086 05564 / hr.suntrik@gmail.com; website uses +91 75037 39000 / info@suntrik.com. Google Business Profile status unknown.
5. **Unverified claims still published** — "80 MWp", "150 MW+", "1,000+ clients", "ISO Certified", "India's Most Trusted".

### Top 5 quick wins
1. Make blog cards real `<a href="/blog/<slug>">` links (15 min).
2. Change homepage H1/title to a broader brand + service phrase; keep "Sirsa" as the Sirsa page's H1 (15 min).
3. Add `JobPosting` schema for the 5 open roles on /careers (30 min) — eligible for Google Jobs.
4. Add security headers (X-Content-Type-Options, Referrer-Policy, X-Frame-Options/CSP frame-ancestors, Permissions-Policy) in `vercel.json` (10 min).
5. Shorten the 3 blog titles to ≤60 characters and link each post to its scheme page (15 min).

---

## 1. Technical SEO — 88 / 100

**What works**
- Every route is pre-rendered: raw HTML has full body text (273–1,381 words) and a unique, self-referencing canonical.
- All 11 sitemap URLs return 200; sitemap has `lastmod`; robots.txt allows all and points to the sitemap.
- Unknown URLs return a real 404 (`/blog/not-a-post` → 404, noindex).
- HTTPS enforced, HSTS set (`max-age=63072000`); single canonical host `www.suntrik.com`.
- Old O&M URL 308 → /blog; `.html` and trailing-slash variants 308 → clean URL.

**Findings**
| Severity | Finding | Evidence | Fix |
|---|---|---|---|
| Medium | Security headers missing | Only HSTS present; no CSP, X-Content-Type-Options, Referrer-Policy, X-Frame-Options, Permissions-Policy | Add a `headers` block for `/(.*)` in `vercel.json` |
| Low | Two-hop redirect chains | `https://suntrik.com/schemes/kusum/` → `www…/kusum/` → `/schemes/kusum`; `http://suntrik.com/` → `https://suntrik.com/` → www | Acceptable; Vercel domain redirect cannot be merged. Keep internal links clean |
| Low | `/favicon.ico` 404 | Browsers and some bots request it directly | Add `public/favicon.ico` |
| Info | Indexation not verified | No Search Console access in this run | Check Pages report; resubmit sitemap |

## 2. Content Quality — 58 / 100

**What works**
- Scheme pages are substantial: PM Surya Ghar 1,360 words, PM-KUSUM 983 words, both with FAQs, steps and figures.
- Real experience signals: named directors with photos, 5 attributed Google reviews, 16 named projects with capacities and locations.
- New Sirsa page (728 words) has unique local content — above the 600-word location-page gate.

**Findings**
| Severity | Finding | Evidence | Fix |
|---|---|---|---|
| High | Blog posts thin | 414 / 395 / 342 words vs 1,500 gate | Expand each to 1,200–1,800 words; add Haryana-specific steps, costs, DHBVN process |
| High | Blog stale | Newest post 10 Apr 2024; title "Complete 2024 Subsidy Guide" | Publish 2 posts/month; refresh the 2 guides with 2026 figures and an `updated` date |
| High | Anonymous authorship | All posts by "Suntrik Editorial"/"Team Suntrik" | Byline a named director (e.g. Rajat Goyal, solar engineer) with a short bio |
| Medium | C&I page below gate | 419 words vs 800 for a service page | Add a worked example (kW, cost, payback), net-metering vs open-access explainer |
| Medium | Projects page thin | 273 words; H1 "All Projects" | Intro paragraph + per-project case-study pages |
| Medium | Unverified claims | 80 MWp, 150 MW+, 1,000+ clients, ISO, "India's Most Trusted" | Keep only what documents support |
| Low | No sources cited | Posts quote ₹75,021 cr, 34,800 MW etc. with no links | Link pmsuryaghar.gov.in, MNRE, HAREDA |

## 3. On-Page SEO — 70 / 100

**What works**
- 11/11 pages have one H1, a unique title and a unique description.
- 8/11 titles are 54–65 characters; descriptions 137–164 characters.
- Every page links to all main sections via navbar/footer; `tel:` and Maps links on the Sirsa page.

**Findings**
| Severity | Finding | Evidence | Fix |
|---|---|---|---|
| High | Blog posts not linked from /blog | /blog raw HTML links only to nav pages; posts have 1–3 inbound links | Render cards as `<Link to="/blog/slug">` (modal optional) |
| High | Duplicate H1 / overlapping titles | Home and Sirsa H1 both "Solar Company in Sirsa, Haryana" | Home H1 → "Solar EPC Company in Haryana & Rajasthan"; title → "Suntrik Green Energy — Solar EPC, Sirsa, Haryana" |
| Medium | Blog titles too long | 72, 79, 80 chars — truncated in results | ≤60 chars each |
| Medium | Weak contextual linking | Scheme pages don't link to their blog guides; blog posts don't link to scheme pages in body | Add 2–3 in-body links per page |
| Low | Generic H1s | /projects "All Projects", /careers "Build India's Solar Future With Us" | Include the topic: "Solar Projects by Suntrik", "Careers at Suntrik — Solar Jobs in Sirsa" |
| Low | Descriptions slightly long | 5 are 161–164 chars | Trim to ≤155 |

## 4. Schema / Structured Data — 75 / 100

**Present:** Organization, LocalBusiness (+ Jaipur department, areaServed, alternateName, sameAs), WebSite, FAQPage (3 pages), BlogPosting (3), BreadcrumbList (10).

| Severity | Finding | Fix |
|---|---|---|
| Medium | No `JobPosting` for 5 open roles on /careers | Add JobPosting per role (title, description, datePosted, employmentType, hiringOrganization, jobLocation Sirsa) |
| Medium | LocalBusiness lacks `geo` and `openingHoursSpecification` | Add lat/long (5 decimals) and hours — must match GBP |
| Low | No `Service` schema on scheme pages | Add Service with provider → #business, areaServed |
| Low | BlogPosting author is an Organization | Use a Person with `url` to a bio |
| Info | FAQ rich results | Google shows FAQ rich results mainly for government/health sites since Aug 2023; FAQPage still helps AI answers — keep it |

## 5. Performance (CWV) — 78 / 100

| Page (mobile lab) | Perf | LCP | TBT | CLS |
|---|---|---|---|---|
| / | 78 | 4.4 s | — | 0.00 |
| /solar-company-sirsa | 90 | 3.0 s | — | — |
| /schemes/surya-ghar | 84 | 3.5 s | 100 ms | 0 |
| /projects | 93 | 2.9 s | 10 ms | 0 |
| /blog/pm-surya-ghar-subsidy-guide | 86 | 3.6 s | 10 ms | 0 |
| / (desktop) | 97 | | | |

Field (Vercel Speed Insights, before 26 Sep fixes): desktop RES 97, mobile RES 72.

| Severity | Finding | Fix |
|---|---|---|
| Medium | Mobile LCP 2.9–4.4 s (lab) vs 2.5 s "good" | Lazy-load below-fold homepage sections; shorten/skip the 1.65 s intro on mobile; `fetchpriority="high"` on each page's hero image |
| Low | ~80 KB unused JS on homepage | Code-split GSAP/Framer per section |

## 6. AI Search Readiness — 62 / 100

**What works:** Pre-rendered HTML; GPTBot, OAI-SearchBot, ClaudeBot, Claude-SearchBot, PerplexityBot and Googlebot all receive 200 with the full 1,708-word page; robots.txt allows all; FAQ Q&A blocks and step lists are extractable.

| Severity | Finding | Fix |
|---|---|---|
| High | Weak authority signals | Named author bylines, last-updated dates, links to government sources |
| Medium | Stale content (AI answers favour content <3 months old) | Quarterly refresh of scheme pages with a visible "Updated" date |
| Medium | Thin brand footprint | No LinkedIn company page, no Wikipedia/Wikidata; only FB/IG/JustDial | Create LinkedIn company page; list on Bing Places, Apple Business, IndiaMART |
| Low | No llms.txt | Carries no ranking weight; optional |

## 7. Images — 72 / 100

**What works:** 115/115 images have `alt` (3 intentionally empty, decorative); 83 lazy-loaded; team, reel posters, logo and PM photo are WebP.

| Severity | Finding | Fix |
|---|---|---|
| Medium | 45 gallery/project JPGs = 8.8 MB, 12 over 200 KB | Convert to WebP at display size (like the 26 Sep batch) |
| Low | 90/115 `<img>` lack width/height | Add dimensions (CLS is already ~0, so low impact) |
| Low | Generic alt text on galleries ("C&I installation 1") | Describe place and capacity |

## Local SEO — 50 / 100 (separate)

| Dimension | Status |
|---|---|
| Location page | Done — /solar-company-sirsa, 728 words, unique, FAQ schema |
| NAP on site | Consistent (Rania Bazar, Sirsa 125055, +91 75037 39000) |
| NAP off site | **Mismatch** — JustDial phone 87086 05564 and email hr.suntrik@gmail.com |
| Google Business Profile | Not verified in this audit; not linked in `sameAs` |
| Reviews | JustDial 4.8 (23 reviews); GBP count unknown |
| Citations | Facebook, Instagram, JustDial found; Bing Places / Apple / IndiaMART not found |
| Local schema | LocalBusiness present; missing geo + hours |

## Limitations
No Google Search Console, GA4, CrUX, DataForSEO or backlink API access in this run, so indexation status, rankings, backlinks and GBP data were not measured. Performance figures are Lighthouse lab runs (simulated mobile) on 26 Sep 2026.
