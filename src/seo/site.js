/**
 * Single source of truth for SEO — per-route <head> tags, structured data and
 * the sitemap. Used by the client (RouteMeta keeps tags in sync on navigation)
 * and by scripts/prerender.js (bakes them into each route's static HTML).
 *
 * Keep BUSINESS identical to the Google Business Profile, JustDial, Facebook
 * and Instagram listings — name, address and phone must match everywhere.
 */
import { POSTS, getPost } from '../data/blog'
import { SURYA_GHAR_FAQS, KUSUM_FAQS, SIRSA_FAQS } from '../data/faqs'
import { JOBS, JOBS_POSTED } from '../data/jobs'

export const SITE_URL = 'https://www.suntrik.com'
export const SITE_NAME = 'Suntrik Green Energy'
export const DEFAULT_IMAGE = '/hero-frames/frame-0001.jpg'

export const BUSINESS = {
  legalName: 'Suntrik Green Energy Pvt. Ltd.',
  name: 'Suntrik Green Energy',
  alternateName: 'Suntrik Solutions',
  telephone: '+91-75037-39000',
  email: 'info@suntrik.com',
  foundingDate: '2018',
  address: {
    streetAddress: 'Rania Bazar, B Block, Subhash Chowk',
    addressLocality: 'Sirsa',
    addressRegion: 'Haryana',
    postalCode: '125055',
    addressCountry: 'IN',
  },
  jaipurAddress: {
    streetAddress: '#601 Elemental Mall, DCM, Ajmer Road',
    addressLocality: 'Jaipur',
    addressRegion: 'Rajasthan',
    postalCode: '302201',
    addressCountry: 'IN',
  },
  areaServed: ['Sirsa', 'Hisar', 'Fatehabad', 'Bathinda', 'Haryana', 'Rajasthan', 'Punjab'],
  // From the Google Business Profile ("Suntrik Solutions", Solar Energy Company) — keep in sync with it
  gbpUrl: 'https://maps.google.com/?cid=3598524479219070442',
  geo: { latitude: 29.5311993, longitude: 75.0242521 },
  hours: { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '10:00', closes: '19:00' },
  // Official profiles
  sameAs: [
    'https://maps.google.com/?cid=3598524479219070442',
    'https://www.facebook.com/suntriksolutions/',
    'https://www.instagram.com/suntriksolutions/',
    'https://www.justdial.com/Sirsa-Haryana/Suntrik-Solutions-Near-Red-Cross-Office-Rania-Bazar/9999P1666-1666-190220063002-A3Z7_BZDET',
  ],
}

// Static routes, in sitemap order. `lastmod` = date the page content last changed.
const ROUTES = {
  '/': {
    name: 'Home',
    title: 'Suntrik Green Energy — Solar EPC Company in Haryana & Rajasthan',
    description: 'Solar EPC from Sirsa, Haryana since 2018: rooftop solar with PM Surya Ghar subsidy, PM-KUSUM for farmers and commercial solar across Haryana & Rajasthan.',
    lastmod: '2026-09-26',
    priority: '1.0',
  },
  '/solar-company-sirsa': {
    name: 'Solar Company in Sirsa',
    title: 'Solar Company in Sirsa — Rooftop, PM Surya Ghar & KUSUM | Suntrik',
    description: 'Suntrik, Rania Bazar, Sirsa: rooftop solar with up to ₹78,000 subsidy, PM-KUSUM for farmers and commercial solar. Free site survey: +91 75037 39000.',
    lastmod: '2026-09-26',
    priority: '0.9',
    faqs: SIRSA_FAQS,
  },
  '/projects': {
    name: 'Projects',
    title: 'Solar Projects — PM-KUSUM, Rooftop & C&I | Suntrik Green Energy',
    description: 'PM-KUSUM ground-mount plants, PM Surya Ghar rooftops and commercial solar projects delivered by Suntrik across Haryana and Rajasthan.',
    lastmod: '2026-09-25',
    priority: '0.8',
  },
  '/schemes/surya-ghar': {
    name: 'PM Surya Ghar',
    title: 'PM Surya Ghar Yojana in Haryana — Subsidy up to ₹78,000 | Suntrik',
    description: 'PM Surya Ghar rooftop solar in Haryana: up to ₹78,000 central subsidy plus state aid. Suntrik handles registration, DHBVN net metering and claims.',
    lastmod: '2026-09-25',
    priority: '0.9',
    faqs: SURYA_GHAR_FAQS,
    service: { name: 'PM Surya Ghar rooftop solar installation', type: 'Rooftop solar installation' },
  },
  '/schemes/kusum': {
    name: 'PM-KUSUM',
    title: 'PM-KUSUM Solar in Haryana & Rajasthan — Component A & C | Suntrik',
    description: 'PM-KUSUM Component A solar plants and Component C pump solarisation for farmers in Haryana and Rajasthan: application, HAREDA liaison, EPC.',
    lastmod: '2026-09-25',
    priority: '0.9',
    faqs: KUSUM_FAQS,
    service: { name: 'PM-KUSUM solar plants and pump solarisation', type: 'Agricultural solar EPC' },
  },
  '/schemes/ci': {
    name: 'Commercial & Industrial Solar',
    title: 'Commercial & Industrial Solar EPC | Suntrik Green Energy',
    description: 'Rooftop and ground-mount solar for factories, warehouses, hospitals and schools — PVsyst-verified yield, net metering, open access, CAPEX or OPEX.',
    service: { name: 'Commercial & industrial solar EPC', type: 'Commercial solar installation' },
    lastmod: '2026-09-25',
    priority: '0.8',
  },
  '/careers': {
    name: 'Careers',
    title: 'Careers in Solar — Jobs at Suntrik Green Energy, Sirsa',
    description: 'Open roles at Suntrik Green Energy in solar design, project management, site execution, sales and marketing across Haryana and Rajasthan.',
    lastmod: '2026-09-25',
    priority: '0.5',
  },
  '/blog': {
    name: 'Blog',
    title: 'Solar Blog — PM Surya Ghar, PM-KUSUM & Policy Updates | Suntrik',
    description: 'Plain-English guides to PM Surya Ghar, PM-KUSUM, net metering and solar subsidies in Haryana and Rajasthan, plus Suntrik company updates.',
    lastmod: POSTS.map(p => p.date).sort().at(-1),
    priority: '0.7',
  },
}

const abs = path => SITE_URL + (path === '/' ? '/' : path)

/** Every indexable path — used by the prerenderer and the sitemap. */
export function allRoutes() {
  return [
    ...Object.entries(ROUTES).map(([path, r]) => ({ path, lastmod: r.lastmod, priority: r.priority })),
    ...POSTS.map(p => ({ path: `/blog/${p.slug}`, lastmod: p.updated || p.date, priority: '0.6' })),
  ]
}

/** Head tags + JSON-LD for a pathname. Returns null for unknown paths (404). */
export function getMeta(pathname) {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : '/'
  const url = abs(path)

  const route = ROUTES[path]
  if (route) {
    const jsonLd = [breadcrumbs(path, route.name)]
    if (path === '/') jsonLd.unshift(organization(), localBusiness(), website())
    if (route.faqs) jsonLd.push(faqPage(route.faqs))
    if (route.service) jsonLd.push(service(route.service, url))
    if (path === '/careers') jsonLd.push(...JOBS.map(jobPosting))
    return { title: route.title, description: route.description, url, image: abs(DEFAULT_IMAGE), type: 'website', jsonLd: jsonLd.filter(Boolean) }
  }

  const blog = path.match(/^\/blog\/([^/]+)$/)
  const post = blog && getPost(blog[1])
  if (post) {
    return {
      // Keep the <title> within ~60 chars: long headlines drop the suffix
      title: post.title.length <= 46 ? `${post.title} | Suntrik Blog` : post.title,
      description: post.excerpt,
      url,
      image: abs(post.cover),
      type: 'article',
      jsonLd: [article(post, url), breadcrumbs(path, post.title)],
    }
  }

  return null
}

export const NOT_FOUND_META = {
  title: 'Page not found | Suntrik Green Energy',
  description: 'The page you are looking for does not exist or has moved.',
  noindex: true,
  jsonLd: [],
}

// ── Structured data ──────────────────────────────────────────────────────────

const postal = a => ({ '@type': 'PostalAddress', ...a })

function organization() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    alternateName: BUSINESS.alternateName,
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/Suntrik-logo.png`,
    email: BUSINESS.email,
    telephone: BUSINESS.telephone,
    foundingDate: BUSINESS.foundingDate,
    address: postal(BUSINESS.address),
    ...(BUSINESS.sameAs.length && { sameAs: BUSINESS.sameAs }),
  }
}

function localBusiness() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#business`,
    // The Sirsa storefront is listed as "Suntrik Solutions" on Google Business Profile,
    // JustDial, Facebook and Instagram — use that name here so the entities match.
    name: BUSINESS.alternateName,
    alternateName: BUSINESS.name,
    parentOrganization: { '@id': `${SITE_URL}/#organization` },
    url: `${SITE_URL}/`,
    image: abs(DEFAULT_IMAGE),
    logo: `${SITE_URL}/Suntrik-logo.png`,
    description: 'Solar EPC company in Sirsa, Haryana — rooftop solar, PM Surya Ghar, PM-KUSUM and commercial & industrial solar installation.',
    telephone: BUSINESS.telephone,
    email: BUSINESS.email,
    priceRange: '₹₹',
    address: postal(BUSINESS.address),
    geo: { '@type': 'GeoCoordinates', ...BUSINESS.geo },
    hasMap: BUSINESS.gbpUrl,
    openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: BUSINESS.hours.days, opens: BUSINESS.hours.opens, closes: BUSINESS.hours.closes }],
    areaServed: BUSINESS.areaServed.map(name => ({ '@type': 'Place', name })),
    department: [{
      '@type': 'LocalBusiness',
      name: `${BUSINESS.name} — Jaipur Office`,
      telephone: BUSINESS.telephone,
      address: postal(BUSINESS.jaipurAddress),
    }],
    ...(BUSINESS.sameAs.length && { sameAs: BUSINESS.sameAs }),
  }
}

function website() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'en-IN',
  }
}

function service({ name, type }, url) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    serviceType: type,
    url,
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: BUSINESS.areaServed.map(n => ({ '@type': 'Place', name: n })),
  }
}

function jobPosting(job) {
  // e.g. 'Jalore, Rajasthan' or 'Jaipur (Office-based)'
  const [rawCity, rawRegion] = job.location.split(',').map(s => s.trim())
  const city = rawCity.replace(/\s*\(.*\)$/, '')
  const region = rawRegion || { Jaipur: 'Rajasthan', Jalore: 'Rajasthan', Sirsa: 'Haryana' }[city]
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: `<p>${job.summary}</p><ul>${job.points.map(p => `<li>${p}</li>`).join('')}</ul><p>Skills: ${job.skills.join(', ')}</p>`,
    datePosted: JOBS_POSTED,
    employmentType: 'FULL_TIME',
    hiringOrganization: { '@type': 'Organization', name: BUSINESS.legalName, sameAs: `${SITE_URL}/`, logo: `${SITE_URL}/Suntrik-logo.png` },
    jobLocation: { '@type': 'Place', address: { '@type': 'PostalAddress', addressLocality: city, addressRegion: region, addressCountry: 'IN' } },
    directApply: true,
    url: `${SITE_URL}/careers#openings`,
  }
}

function faqPage(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

function article(post, url) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: abs(post.cover),
    datePublished: post.date,
    dateModified: post.updated || post.date,
    author: { '@type': 'Organization', name: post.author },
    publisher: { '@id': `${SITE_URL}/#organization` },
    mainEntityOfPage: url,
  }
}

function breadcrumbs(path, lastName) {
  if (path === '/') return null
  const parts = path.split('/').filter(Boolean)
  const items = [{ name: 'Home', url: `${SITE_URL}/` }]
  parts.forEach((_, i) => {
    const p = '/' + parts.slice(0, i + 1).join('/')
    if (p === '/schemes') return // no /schemes index page
    const name = ROUTES[p]?.name ?? lastName
    items.push({ name, url: abs(p) })
  })
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: it.url })),
  }
}
