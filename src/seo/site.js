/**
 * Single source of truth for SEO — per-route <head> tags, structured data and
 * the sitemap. Used by the client (RouteMeta keeps tags in sync on navigation)
 * and by scripts/prerender.js (bakes them into each route's static HTML).
 *
 * Keep BUSINESS identical to the Google Business Profile, JustDial, Facebook
 * and Instagram listings — name, address and phone must match everywhere.
 */
import { POSTS, getPost } from '../data/blog'
import { SURYA_GHAR_FAQS, KUSUM_FAQS } from '../data/faqs'

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
    streetAddress: 'Rania Bazar',
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
  // Add the real profile URLs (GBP, JustDial, Facebook, Instagram) once aligned.
  sameAs: [],
}

// Static routes, in sitemap order. `lastmod` = date the page content last changed.
const ROUTES = {
  '/': {
    name: 'Home',
    title: 'Solar Company in Sirsa, Haryana | Suntrik Green Energy',
    description: 'Suntrik Green Energy (Suntrik Solutions), Rania Bazar, Sirsa — rooftop solar, PM Surya Ghar subsidy, PM-KUSUM and commercial solar EPC across Haryana & Rajasthan.',
    lastmod: '2026-09-25',
    priority: '1.0',
  },
  '/projects': {
    name: 'Projects',
    title: 'Solar Projects — PM-KUSUM, Rooftop & C&I | Suntrik Green Energy',
    description: 'Ground-mount PM-KUSUM plants, PM Surya Ghar rooftop installations and commercial & industrial solar projects delivered by Suntrik across Haryana and Rajasthan.',
    lastmod: '2026-09-25',
    priority: '0.8',
  },
  '/schemes/surya-ghar': {
    name: 'PM Surya Ghar',
    title: 'PM Surya Ghar Yojana in Haryana — Subsidy up to ₹78,000 | Suntrik',
    description: 'Get PM Surya Ghar rooftop solar in Sirsa and across Haryana. Suntrik handles portal registration, DHBVN net metering, installation and the ₹78,000 subsidy claim.',
    lastmod: '2026-09-25',
    priority: '0.9',
    faqs: SURYA_GHAR_FAQS,
  },
  '/schemes/kusum': {
    name: 'PM-KUSUM',
    title: 'PM-KUSUM Solar in Haryana & Rajasthan — Component A & C | Suntrik',
    description: 'PM-KUSUM Component A ground-mount plants and Component C pump solarisation for farmers in Haryana and Rajasthan — application, HAREDA coordination, EPC and subsidy.',
    lastmod: '2026-09-25',
    priority: '0.9',
    faqs: KUSUM_FAQS,
  },
  '/schemes/ci': {
    name: 'Commercial & Industrial Solar',
    title: 'Commercial & Industrial Solar EPC | Suntrik Green Energy',
    description: 'Rooftop and ground-mount solar for factories, warehouses, hospitals and schools — PVsyst-verified yield, net metering, open access, CAPEX or OPEX models.',
    lastmod: '2026-09-25',
    priority: '0.8',
  },
  '/careers': {
    name: 'Careers',
    title: 'Careers in Solar — Jobs at Suntrik Green Energy, Sirsa',
    description: 'Join Suntrik Green Energy — open roles in solar engineering, site execution and sales for rooftop, ground-mount and PM-KUSUM projects in Haryana and Rajasthan.',
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
    return { title: route.title, description: route.description, url, image: abs(DEFAULT_IMAGE), type: 'website', jsonLd: jsonLd.filter(Boolean) }
  }

  const blog = path.match(/^\/blog\/([^/]+)$/)
  const post = blog && getPost(blog[1])
  if (post) {
    return {
      title: `${post.title} | Suntrik Blog`,
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
    name: BUSINESS.name,
    alternateName: BUSINESS.alternateName,
    parentOrganization: { '@id': `${SITE_URL}/#organization` },
    url: `${SITE_URL}/`,
    image: abs(DEFAULT_IMAGE),
    logo: `${SITE_URL}/Suntrik-logo.png`,
    description: 'Solar EPC company in Sirsa, Haryana — rooftop solar, PM Surya Ghar, PM-KUSUM and commercial & industrial solar installation.',
    telephone: BUSINESS.telephone,
    email: BUSINESS.email,
    priceRange: '₹₹',
    address: postal(BUSINESS.address),
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
