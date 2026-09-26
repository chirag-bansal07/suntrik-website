# Final SEO Report — www.suntrik.com

**Date:** 26 Sep 2026 · **Method:** claude-seo `seo-audit` weights, run inline on the live site · **Crawl:** 11/11 URLs, raw HTML · **Lab:** Lighthouse 12 on all 11 pages (mobile) + homepage desktop

## Result

**SEO Health Score: 83 / 100** — up from 72 earlier today, and from an estimated 30–35 before the 25 Sep fixes.

| Category | Weight | Before (26 Sep AM) | Final | Change |
|---|---|---|---|---|
| Technical SEO | 22% | 88 | **95** | +7 |
| Content Quality | 23% | 58 | **70** | +12 |
| On-Page SEO | 20% | 70 | **90** | +20 |
| Schema / Structured Data | 10% | 75 | **87** | +12 |
| Performance (CWV) | 10% | 78 | **80** | +2 |
| AI Search Readiness | 10% | 62 | **72** | +10 |
| Images | 5% | 72 | **88** | +16 |
| **Weighted total** | | **72** | **83** | **+11** |
| Local SEO (separate) | | 50 | 52 | needs off-site work |

## Lighthouse (mobile, live, final)

| Page | Perf | Access. | Best pr. | SEO | LCP |
|---|---|---|---|---|---|
| / | 71 | 100 | 100 | 100 | 4.3 s |
| /solar-company-sirsa | 88 | 100 | 100 | 100 | 3.2 s |
| /projects | 89 | 100 | 100 | 100 | 3.0 s |
| /schemes/surya-ghar | 82 | 100 | 100 | 100 | 3.3 s |
| /schemes/kusum | 83 | 100 | 100 | 100 | 3.4 s |
| /schemes/ci | 85 | 100 | 100 | 100 | 3.5 s |
| /careers | 91 | 100 | 100 | 100 | 2.7 s |
| /blog | 85 | 100 | 100 | 100 | 3.4 s |
| /blog/pm-surya-ghar-subsidy-guide | 86 | 99 | 100 | 100 | 3.5 s |
| /blog/pm-kusum-component-a-c-explained | 86 | 99 | 100 | 100 | 3.3 s |
| /blog/suntrik-80mwp-pm-kusum-milestone | 86 | 100 | 100 | 100 | 3.3 s |

Desktop homepage: 89. CLS is 0.00–0.01 on every page. Lab scores vary ±5 between runs.

## What changed in this round

**Technical**
- Security headers on every response: X-Content-Type-Options, Referrer-Policy, X-Frame-Options, Permissions-Policy
- `/favicon.ico` now served; `llms.txt` generated from the route list on every build

**Content**
- PM Surya Ghar guide rewritten for Haryana: 414 → 1,245 words. Central subsidy, Haryana State Financial Assistance per DHBVN Sales Circular D-20/2024 (₹25,000/kW for income ≤₹1.8 lakh; ₹10,000/kW for ₹1.8–3 lakh; up to 2 kW; ≤200 units/month; 50,000 consumers), step-by-step application, worked example (up to ₹1,10,000 for 2 kW), common mistakes, sources
- PM-KUSUM guide rewritten: 395 → 929 words. Components A/B/C, how each is paid, the MNRE extension to 31 Mar 2027 for projects with PPA/NTP by 31 Dec 2025, sources
- **Accuracy fix:** the site said PM-KUSUM Component A gets 30% central assistance. Per MNRE, Component A pays the DISCOM a performance incentive (₹0.40/unit or ₹6.6 lakh/MW/yr, lower of the two, 5 years); the 30% CFA applies to Components B and C. Fixed in the FAQ, stats strip and guide
- C&I page 419 → 707 words: CAPEX vs OPEX comparison table, net metering vs open access
- Projects page 273 → 362 words: portfolio summary generated from project data (10 PM-KUSUM plants, 64.6 MWp, named sites)
- Visible "Updated 26 Sep 2026" on both guides; `dateModified` and sitemap `lastmod` follow it

**On-page**
- /blog cards are now real links (all 3 posts crawlable from /blog); the preview modal still opens on click
- Homepage H1/title distinct from the Sirsa page ("Solar EPC Company · Haryana & Rajasthan"; "Suntrik Green Energy — Solar EPC Company in Haryana & Rajasthan")
- All titles ≤65 chars (blog titles were 72–80); all descriptions ≤155 chars
- Scheme pages link to their guides; guides link back; projects page links to schemes and guide
- Projects H1 "Solar Projects by Suntrik"

**Schema**
- `JobPosting` for all 5 open roles (datePosted 2026-06-22 from git history, locations Jaipur/Jalore, direct apply)
- `Service` on PM Surya Ghar, PM-KUSUM and C&I pages, linked to the LocalBusiness

**Images**
- 45 gallery/project photos converted to WebP: 8.6 MB → 4.7 MB; all 115 page images now WebP
- Descriptive alt text on gallery photos

**Performance / accessibility**
- Intro animation skipped on phones
- Accessibility 100 on all pages except the two guides (99): contrast on badges and subheadings, footer heading order, careers form labels, underlined in-text links

## Remaining gaps, by score impact

| Category | Gap | Who | Fix |
|---|---|---|---|
| Content (70) | Anonymous blog author | You | Name the author (e.g. a director) and give a 2-line bio; I'll add Person schema |
| Content (70) | Unverified claims: 80 MWp, 150 MW+, 1,000+ clients, 100% on-time, ISO, "India's Most Trusted" | You | Confirm with documents or remove |
| Content (70) | Only 3 posts; the 80 MWp post is 342 words | You + dev | 2 posts/month on Haryana topics (DHBVN net metering, rooftop cost in Sirsa, KUSUM application) |
| Performance (80) | Homepage mobile LCP 4.3 s: the app re-renders the pre-rendered hero after JS loads | Dev | Hydrate the pre-rendered HTML instead of replacing it (needs Preloader/Hero/Cursor made SSR-consistent), code-split below-fold sections |
| AI readiness (72) | Small brand footprint | You | LinkedIn company page, Bing Places, Apple Business Connect, IndiaMART |
| Schema (87) | LocalBusiness lacks `geo` and opening hours | You | Send exact office hours and the map pin from GBP |
| Local (52) | GBP not verified; JustDial shows the HR number 87086 05564 and hr.suntrik@gmail.com (also used on /careers) | You | Verify GBP; use +91 75037 39000 and info@suntrik.com on all listings |
| Technical (95) | Apex → www redirect is two hops for some URLs | — | Vercel domain setting; low impact, leave |

## Limitations
No Search Console, GA4, CrUX, rank-tracking or backlink data were available. Scores are lab-based and from this audit's method; rankings will lag the changes by weeks until Google recrawls. Resubmit `https://www.suntrik.com/sitemap.xml` in Search Console and request indexing for the two rewritten guides and /solar-company-sirsa.

## Update — Local SEO (26 Sep, later): 52 → 78; overall 83 → 84

The Google Business Profile is claimed and active ("Suntrik Solutions", Solar Energy Company, 4.9★ from 35 reviews, owner replies, phone +91 75037 39000). The site now matches and links to it:
- Address wording from GBP ("Rania Bazar, B Block, Subhash Chowk") on site, footer, contact section and schema
- Opening hours Mon–Sat 10:00–19:00 on site and in `openingHoursSpecification`
- `geo` 29.5311993, 75.0242521; `hasMap` and `sameAs` → the GBP listing
- LocalBusiness named "Suntrik Solutions" (as on GBP/JustDial/FB/IG), parent organisation Suntrik Green Energy Pvt. Ltd.
- Sirsa page: embedded map, hours, Google rating with link to read/write reviews

Schema 87 → 92 → weighted total 84.

Remaining (owner): update JustDial phone/email/address wording; edit Bing Places "About" (still says NISE-certified, copied from the old site); ask every customer for a Google review; create Apple Business Connect listing.
