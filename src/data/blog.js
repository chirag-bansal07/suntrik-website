/**
 * Blog posts — Suntrik Green Energy
 *
 * ── HOW TO ADD A NEW BLOG (admin-only / Git-controlled) ──────────────────────
 * Only the team with repo access can publish: add a new object to the TOP of the
 * POSTS array below, then commit + push. Each post needs:
 *   slug      unique URL id (lowercase-with-hyphens) → /blog/<slug>
 *   title     headline
 *   category  'Government Policy' | 'Company Update'
 *   date      'YYYY-MM-DD'
 *   author    name
 *   cover     image path under /public (e.g. '/gallery/surya-ghar/sg-06.jpg')
 *   excerpt   1–2 line summary for cards & previews
 *   body      array of blocks:
 *               { type: 'p',     text: '...' }
 *               { type: 'h2',    text: '...' }
 *               { type: 'ul',    items: ['...', '...'] }
 *               { type: 'quote', text: '...' }
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const CATEGORIES = ['All', 'Government Policy', 'Company Update']

export const CATEGORY_COLOR = {
  'Government Policy': '#10B981',
  'Company Update':    '#FF6B1A',
}

export const POSTS = [
  {
    slug: 'pm-surya-ghar-subsidy-guide',
    title: 'PM Surya Ghar Muft Bijli Yojana: The Complete 2024 Subsidy Guide',
    category: 'Government Policy',
    date: '2024-06-15',
    author: 'Suntrik Editorial',
    cover: '/gallery/surya-ghar/sg-06.jpg',
    excerpt: 'Up to ₹78,000 subsidy, 300 free units a month, and a near-zero electricity bill — here is exactly how PM Surya Ghar works and how to claim it.',
    body: [
      { type: 'p', text: 'Launched on 13 February 2024 with a ₹75,021 crore outlay, PM Surya Ghar Muft Bijli Yojana is the world\'s largest domestic rooftop solar programme — targeting 1 crore Indian households by March 2027.' },
      { type: 'h2', text: 'How much subsidy do you get?' },
      { type: 'p', text: 'The central government provides a direct subsidy credited to your bank account after the system is installed and commissioned:' },
      { type: 'ul', items: ['Up to 2 kW: ₹30,000 per kW', '3rd kW: additional ₹18,000', 'Above 3 kW: capped at ₹78,000 total'] },
      { type: 'h2', text: 'Why a 3 kW system is the sweet spot' },
      { type: 'p', text: 'A 3 kW system generates roughly 360–400 units per month in India (≈340 sunny days × 4 units/kW/day). That exceeds the 300-unit free threshold, so most households effectively reach a zero electricity bill — while surplus units earn net-metering credits.' },
      { type: 'quote', text: 'Combined with net-metering, most households achieve near-zero bills and a payback period of just 2–3 years.' },
      { type: 'h2', text: 'How Suntrik handles it end to end' },
      { type: 'p', text: 'Suntrik manages the entire journey — national portal registration, DISCOM feasibility, system design, NISE-certified installation, inspection, net-meter, and subsidy disbursement follow-up — so you only provide your documents once.' },
    ],
  },
  {
    slug: 'pm-kusum-component-a-c-explained',
    title: 'PM-KUSUM Component A & C: What Farmers and Landowners Should Know',
    category: 'Government Policy',
    date: '2024-05-28',
    author: 'Suntrik Editorial',
    cover: '/reels/bhojasar.jpg',
    excerpt: 'Earn income from barren land or solarise your grid-connected pump — a plain-English breakdown of PM-KUSUM Components A and C, with 30% central assistance.',
    body: [
      { type: 'p', text: 'Pradhan Mantri Kisan Urja Suraksha evam Utthaan Mahabhiyan (PM-KUSUM) is India\'s flagship scheme to solarise agriculture, targeting 34,800 MW of solar capacity by March 2026 with ₹34,422 crore of central support.' },
      { type: 'h2', text: 'Component A — Decentralised ground-mount plants' },
      { type: 'p', text: 'Farmers, cooperatives, panchayats and FPOs set up ground- or stilt-mounted solar plants (500 kW to 2 MW) on barren or cultivable land and sell the power to the DISCOM at a fixed tariff under a 25-year PPA — turning idle land into steady income.' },
      { type: 'h2', text: 'Component C — Solarisation of grid-connected pumps' },
      { type: 'p', text: 'Existing grid-connected agricultural pumps are solarised individually (IPS) or by feeder (FLS). Farmers irrigate free during daylight and earn net-metering credits for surplus power fed back to the grid.' },
      { type: 'ul', items: ['30% Central Financial Assistance under both components', 'States typically add further support', '10,000 MW Component A target · 35 lakh pumps under Component C'] },
      { type: 'quote', text: 'Suntrik is HAREDA-empanelled for Component A and Component C across Rajasthan and Haryana — handling everything from application to commissioning.' },
    ],
  },
  {
    slug: 'suntrik-80mwp-pm-kusum-milestone',
    title: 'Suntrik Crosses 80 MWp of PM-KUSUM Orders Under Execution',
    category: 'Company Update',
    date: '2024-04-10',
    author: 'Team Suntrik',
    cover: '/gallery/team.jpg',
    excerpt: 'An active order book of ₹150 Cr+ and 80 MWp of ground-mount PM-KUSUM projects under execution across Rajasthan and Haryana — a milestone for our team.',
    body: [
      { type: 'p', text: 'Incorporated in 2024 as Suntrik Green Energy Pvt. Ltd. (originally founded in 2018 as Suntrik Solutions), our team now has 80 MWp of PM-KUSUM ground-mount orders under execution across Rajasthan and Haryana, with an active order book exceeding ₹150 crore.' },
      { type: 'h2', text: 'Built on in-house capability' },
      { type: 'p', text: 'Every project is delivered by our own NISE-certified field crew — no sub-contracting. The same engineers who design your plant build and commission it, ensuring accountability and the quality our 5-year AMC depends on.' },
      { type: 'ul', items: ['150 MW+ cumulative capacity installed', '1,000+ clients across homes, farms and industries', 'In-house mounting structures via SunMount'] },
      { type: 'p', text: 'As government schemes like PM Surya Ghar and PM-KUSUM accelerate India\'s energy transition, we remain committed to delivering bankable, end-to-end solar EPC across the country.' },
    ],
  },
]

export const getPost = slug => POSTS.find(p => p.slug === slug)
