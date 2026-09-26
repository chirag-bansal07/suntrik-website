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
 *   cover     image path under /public (e.g. '/gallery/surya-ghar/sg-19.jpg')
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
    title: 'PM Surya Ghar Subsidy in Haryana: 2026 Guide',
    category: 'Government Policy',
    date: '2024-06-15',
    updated: '2026-09-26',
    author: 'Suntrik Editorial',
    cover: '/gallery/surya-ghar/sg-19.jpg',
    excerpt: 'Up to ₹78,000 central subsidy plus up to ₹50,000 from Haryana for eligible families — how PM Surya Ghar works in Haryana and how to claim both.',
    body: [
      { type: 'p', text: 'PM Surya Ghar Muft Bijli Yojana pays Indian households up to ₹78,000 to put solar panels on their roof. In Haryana, families with an annual income up to ₹3 lakh can get a further state subsidy of up to ₹50,000 on top — so a 2 kW system can attract up to ₹1,10,000 in total support.' },
      { type: 'p', text: 'The scheme was launched on 13 February 2024 with a ₹75,021 crore outlay and aims to put rooftop solar on 1 crore homes. This guide explains the subsidy amounts, who qualifies, the exact application steps for DHBVN and UHBVN consumers, and what a system costs after subsidy.' },

      { type: 'h2', text: 'How much central subsidy do you get?' },
      { type: 'p', text: 'The central subsidy (Central Financial Assistance, CFA) is paid by the Ministry of New and Renewable Energy (MNRE) directly into your bank account after your system is installed, inspected and commissioned:' },
      { type: 'ul', items: ['1 kW system: ₹30,000', '2 kW system: ₹60,000 (₹30,000 per kW for the first 2 kW)', '3 kW system: ₹78,000 (₹18,000 for the third kW)', 'Above 3 kW: still ₹78,000 — the subsidy is capped'] },
      { type: 'p', text: 'For the first 2 kW the subsidy is ₹30,000 per kW or 60% of the MNRE benchmark cost per kW, whichever is lower. In practice almost every household gets the full amount.' },

      { type: 'h2', text: 'Haryana\'s extra state subsidy (SFA)' },
      { type: 'p', text: 'Haryana adds State Financial Assistance (SFA) for lower-income households, paid through the DISCOMs. The rules are set out in DHBVN Sales Circular D-20/2024 (17 July 2024):' },
      { type: 'ul', items: [
        'Category I — family income up to ₹1.8 lakh a year: ₹25,000 per kW or 40% of the billed amount per kW, whichever is lower, up to 2 kW',
        'Category II — family income ₹1.8 lakh to ₹3 lakh a year: ₹10,000 per kW or 20% of the billed amount per kW, whichever is lower, up to 2 kW',
        'Income is checked against the Parivar Pehchan Patra (PPP) database',
        'You need a domestic connection with a sanctioned load of 2 kW or less',
        'Average consumption must be 200 units a month or less (2,400 units a year) in the previous financial year',
        'Available to 50,000 consumers on a first-come, first-served basis',
      ] },
      { type: 'p', text: 'If the central and state subsidy together would exceed what you actually paid, the state amount is reduced so the total never exceeds your bill. SFA-eligible applicants also have the ₹1,000 DISCOM application fee waived.' },

      { type: 'h2', text: 'Worked example: 2 kW system for a Category I family' },
      { type: 'ul', items: ['Central subsidy: 2 kW × ₹30,000 = ₹60,000', 'Haryana SFA: 2 kW × ₹25,000 = ₹50,000 (if 40% of the bill per kW is higher than this)', 'Total support: up to ₹1,10,000'] },
      { type: 'p', text: 'Your actual out-of-pocket cost depends on the quote for your roof. Ask any installer for a written quote that shows the price before subsidy, each subsidy separately, and your net cost.' },

      { type: 'h2', text: 'Who is eligible?' },
      { type: 'ul', items: ['An Indian household with its own house and a roof suitable for solar panels', 'A valid electricity connection in the applicant\'s name (for Haryana SFA: a domestic connection up to 2 kW sanctioned load)', 'The household must not have taken another subsidy for rooftop solar', 'Rented homes generally need the owner\'s consent'] },

      { type: 'h2', text: 'Step-by-step: how to apply in Haryana' },
      { type: 'p', text: 'Central subsidy is claimed on the national portal; the Haryana state subsidy is claimed on the DHBVN solar portal. The order below follows DHBVN\'s standard operating procedure.' },
      { type: 'ul', items: [
        '1. State subsidy check (only if you may qualify for SFA): apply on sfa.dhbvn.org.in with your PPP ID. Select the applicant, verify with an OTP, and confirm your electricity account. Enter last year\'s consumption; the sub-division verifies it within about 5 days.',
        '2. Register on pmsuryaghar.gov.in: choose Haryana, your DISCOM (DHBVN or UHBVN), enter your consumer number and mobile number.',
        '3. Apply for rooftop solar on the national portal and wait for the DISCOM\'s feasibility approval.',
        '4. Choose a registered vendor and get the system installed to the scheme\'s technical specifications.',
        '5. Submit the installation details and apply for a net meter.',
        '6. The DISCOM inspects the system, installs the net meter and issues the commissioning report.',
        '7. Submit your bank details and a cancelled cheque on the portal. The central subsidy is credited to your account; the state subsidy is processed through the DISCOM.',
      ] },

      { type: 'h2', text: 'How much electricity will you get?' },
      { type: 'p', text: 'In north India a well-installed system typically produces about 4 units per kW per day on sunny days. A 3 kW system therefore makes roughly 360–400 units a month, which covers the scheme\'s 300-unit target for most homes. A 2 kW system makes roughly 240–260 units — a good fit for the Haryana SFA, which is aimed at homes using up to 200 units a month.' },
      { type: 'p', text: 'With net metering, units you do not use during the day are exported to the grid and credited against the units you draw at night, so your bill reflects only the difference.' },

      { type: 'h2', text: 'Loans for the remaining cost' },
      { type: 'p', text: 'Public-sector banks offer collateral-free loans for rooftop systems up to 3 kW under the scheme, at interest rates around 7%. Rates change with the repo rate, so confirm the current rate with your bank before you apply.' },

      { type: 'h2', text: 'Common mistakes that delay the subsidy' },
      { type: 'ul', items: ['Name on the electricity bill does not match the bank account or PPP record', 'Installing before the DISCOM feasibility approval', 'Using panels or inverters that do not meet the scheme\'s specifications', 'Missing the net-meter application, so the system is never commissioned', 'Bank account not linked correctly on the portal'] },

      { type: 'h2', text: 'How Suntrik helps' },
      { type: 'p', text: 'Suntrik is based in Sirsa and installs rooftop systems for DHBVN consumers across Sirsa, Hisar and Fatehabad. We handle the national portal registration, the DHBVN SFA application where you qualify, feasibility, installation, net metering and both subsidy claims — you provide your documents once.' },
      { type: 'links', title: 'Related on Suntrik', items: [
        { label: 'PM Surya Ghar scheme page', href: '/schemes/surya-ghar' },
        { label: 'Solar company in Sirsa', href: '/solar-company-sirsa' },
        { label: 'Get a free site survey', href: '/#contact' },
      ] },
      { type: 'links', title: 'Sources', items: [
        { label: 'PM Surya Ghar national portal', href: 'https://pmsuryaghar.gov.in/' },
        { label: 'DHBVN Sales Circular D-20/2024: SOP for State Financial Assistance in Rooftop Solar', href: 'https://dhbvn.org.in/staticContent/saleregulation/salecircular/circular2024/20_D_2024.pdf' },
        { label: 'DHBVN solar SFA portal', href: 'https://sfa.dhbvn.org.in/' },
      ] },
    ],
  },
  {
    slug: 'pm-kusum-component-a-c-explained',
    title: 'PM-KUSUM Component A & C Explained (2026)',
    category: 'Government Policy',
    date: '2024-05-28',
    updated: '2026-09-26',
    author: 'Suntrik Editorial',
    cover: '/reels/bhojasar.jpg',
    excerpt: 'Earn from a solar plant on your land or solarise your grid-connected pump: how PM-KUSUM Components A and C work, who pays what, and 2026 status.',
    body: [
      { type: 'p', text: 'PM-KUSUM (Pradhan Mantri Kisan Urja Suraksha evam Utthaan Mahabhiyan) is the central government\'s scheme to bring solar power to farms. Component A lets farmers earn money by hosting a small solar power plant on their land; Component C cuts a farmer\'s irrigation power cost by putting solar on an existing grid-connected pump. The two work very differently, including how the subsidy is paid.' },
      { type: 'p', text: 'Under MNRE\'s guidelines the scheme targets 34,800 MW of solar capacity with ₹34,422 crore of central support. The original deadline was 31 March 2026; on 28 March 2026 MNRE extended the completion deadline to 31 March 2027 for projects whose PPA or notice to proceed was issued by 31 December 2025. A successor phase, PM-KUSUM 2.0, is being prepared.' },

      { type: 'h2', text: 'The three components at a glance' },
      { type: 'ul', items: ['Component A: 10,000 MW of small grid-connected solar plants (500 kW to 2 MW) on farmland', 'Component B: 14 lakh standalone solar pumps for farms without a grid connection', 'Component C: solarisation of 35 lakh existing grid-connected pumps, individually (IPS) or for a whole agriculture feeder (FLS)'] },

      { type: 'h2', text: 'Component A — earn from a solar plant on your land' },
      { type: 'p', text: 'Individual farmers, groups of farmers, cooperatives, panchayats, Farmer Producer Organisations (FPOs) and water user associations can set up a solar plant of 500 kW to 2 MW on barren, fallow or cultivable land. Plants on cultivable land are usually raised on stilts so farming can continue underneath.' },
      { type: 'p', text: 'The DISCOM buys all the power at a feed-in tariff fixed by the State Electricity Regulatory Commission, under a long-term power purchase agreement (PPA). A farmer who cannot invest can lease the land to a developer, who builds and runs the plant and pays rent.' },
      { type: 'p', text: 'Component A has no capital subsidy for the farmer. Instead MNRE pays the DISCOM a performance-based incentive of ₹0.40 per unit bought, or ₹6.6 lakh per MW per year, whichever is lower, for five years. The farmer\'s return comes from selling the power (or from the land lease).' },
      { type: 'ul', items: ['Land: typically 4–5 acres per MW, close to a 33/11 kV substation', 'Income: tariff × units generated, paid by the DISCOM', 'Financing: bank loans are commonly used; lenders look at the PPA and the tariff'] },

      { type: 'h2', text: 'Component C — solar for your existing pump' },
      { type: 'p', text: 'If your farm already has a grid-connected pump, Component C adds solar panels to it. Under individual pump solarisation (IPS) the panels are sized up to twice the pump capacity in kW; the pump runs on solar during the day and surplus power is sold to the DISCOM. Under feeder-level solarisation (FLS) a single solar plant supplies the whole agriculture feeder.' },
      { type: 'p', text: 'The centre pays 30% of the benchmark cost as Central Financial Assistance (CFA) for IPS, and 30% (up to ₹1.05 crore per MW) for FLS. In the north-eastern and hill states the central share is 50%. The state government usually adds its own share and the farmer pays the rest, often with a bank loan. State top-ups differ and change from year to year — in Haryana, check the current farmer share with HAREDA or on the Saral Haryana portal before you apply.' },

      { type: 'h2', text: 'Which component is right for you?' },
      { type: 'ul', items: ['You own 2 acres or more of land near a substation and want a steady income → Component A', 'You already pay for power for a grid-connected pump and want lower bills plus income from surplus → Component C (IPS)', 'Your farm has no grid connection → Component B (standalone pump)'] },

      { type: 'h2', text: 'Where the scheme stands in 2026' },
      { type: 'p', text: 'Projects already awarded before 31 December 2025 can be completed until 31 March 2027 under the current rules. New applications depend on each state\'s open rounds and on PM-KUSUM 2.0 once it is notified. Watch HAREDA (Haryana) and RRECL (Rajasthan) announcements for new allocation rounds.' },

      { type: 'h2', text: 'How Suntrik helps' },
      { type: 'p', text: 'Suntrik builds ground-mount PM-KUSUM plants and solarises pumps in Haryana and Rajasthan — including site and substation checks, the application and DPR, HAREDA coordination, installation, DISCOM inspection and subsidy follow-up.' },
      { type: 'links', title: 'Related on Suntrik', items: [
        { label: 'PM-KUSUM scheme page', href: '/schemes/kusum' },
        { label: 'Our PM-KUSUM projects', href: '/projects' },
        { label: 'Talk to our team', href: '/#contact' },
      ] },
      { type: 'links', title: 'Sources', items: [
        { label: 'MNRE — PM-KUSUM scheme page', href: 'https://mnre.gov.in/en/pradhan-mantri-kisan-urja-suraksha-evam-utthaan-mahabhiyaan-pm-kusum/' },
        { label: 'Energetica India — MNRE extends PM-KUSUM deadline to 31 March 2027', href: 'https://www.energetica-india.net/news/mnre-extends-pm-kusum-project-completion-deadline-to-march-31-2027' },
      ] },
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
      { type: 'p', text: 'Every project is delivered by our own trained in-house field crew — no sub-contracting. The same engineers who design your plant build and commission it, ensuring accountability and the quality our 5-year AMC depends on.' },
      { type: 'ul', items: ['150 MW+ cumulative capacity installed', '1,000+ clients across homes, farms and industries', 'In-house mounting structures via SunMount'] },
      { type: 'p', text: 'As government schemes like PM Surya Ghar and PM-KUSUM accelerate India\'s energy transition, we remain committed to delivering bankable, end-to-end solar EPC across the country.' },
    ],
  },
]

export const getPost = slug => POSTS.find(p => p.slug === slug)
