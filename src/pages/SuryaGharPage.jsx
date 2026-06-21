import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { PROJECTS, TYPE_COLOR, TYPE_ICON } from '../data/projects'

const SUBSIDY_SLABS = [
  { range: 'Up to 1 kW', central: '₹30,000', total: '₹30,000', note: 'Per household' },
  { range: '1 kW – 2 kW', central: '₹30,000–₹60,000', total: 'Up to ₹60,000', note: 'Per kW above 1 kW: +₹30,000' },
  { range: '2 kW – 3 kW', central: '₹60,000–₹78,000', total: 'Up to ₹78,000', note: 'Additional ₹18,000 for 3rd kW' },
  { range: 'Above 3 kW', central: '₹78,000 (capped)', total: '₹78,000 max', note: 'No additional subsidy beyond 3 kW' },
]

const BENEFITS = [
  { icon: '💡', title: '300 Free Units/Month', desc: 'The scheme is specifically designed to provide 300 units of free electricity per month to eligible beneficiaries — effectively a zero-bill home.' },
  { icon: '💰', title: 'Up to ₹78,000 Subsidy', desc: 'Central government subsidy of up to ₹78,000 per household, directly credited to your bank account after successful installation and inspection.' },
  { icon: '🔌', title: 'Net Metering Credits', desc: 'Surplus solar energy is fed back to the grid and credited to your account at the DISCOM-approved rate — additional income beyond zero bills.' },
  { icon: '🏦', title: 'Collateral-Free Loan', desc: 'Nationalised and scheduled commercial banks provide collateral-free loans for the remaining cost after subsidy, under RBI priority lending norms.' },
  { icon: '📱', title: 'National Portal Tracking', desc: 'The entire process — registration, inspection, commissioning, and subsidy — is tracked on the National Portal with full transparency.' },
  { icon: '🌱', title: '25-Year Savings', desc: 'With Tier-1 modules and 25-year output warranty, your household saves lakhs over the plant lifetime. Post-payback energy is virtually free.' },
]

const STEPS = [
  { n: '01', title: 'Registration on National Portal', desc: 'Suntrik registers your household on pmsuryaghar.gov.in using your Aadhaar, electricity consumer number, and bank details. This takes one working day.' },
  { n: '02', title: 'DISCOM Feasibility Check', desc: 'We submit a feasibility application to your DISCOM (DHBVN/DHEVCL) for net-metering connection approval. Suntrik tracks and follows up until approved.' },
  { n: '03', title: 'System Design & Quotation', desc: 'Our engineers design the optimal system for your roof — load analysis, shading study, module layout — and provide a detailed cost sheet including post-subsidy outlay.' },
  { n: '04', title: 'Turnkey Installation', desc: 'Suntrik\'s NISE-certified team installs the complete rooftop system: modules, grid-tied inverter, net-metering cabling, and monitoring device.' },
  { n: '05', title: 'DISCOM Inspection & Net Meter', desc: 'We coordinate the DISCOM site inspection, net-meter installation, and issue the official commissioning certificate — required for subsidy release.' },
  { n: '06', title: 'Subsidy Disbursement', desc: 'After commissioning, Suntrik submits the disbursement claim on the national portal. The subsidy is credited directly to your registered bank account within 30 days.' },
]

const FAQS = [
  { q: 'Who is eligible for PM Surya Ghar Muft Bijli Yojana?', a: 'Any Indian household with a valid electricity connection (single residential meter), a suitable rooftop, and Aadhaar-linked bank account is eligible. Rented properties require landlord NOC.' },
  { q: 'How much does a 3 kW system cost after subsidy?', a: 'A 3 kW system typically costs ₹1,80,000–₹2,10,000 installed (MNRE benchmark). After the ₹78,000 central subsidy, the net cost is approximately ₹1,00,000–₹1,30,000. Bank loans are available for the remainder.' },
  { q: 'Will I actually get 300 free units per month?', a: 'A 3 kW system in India generates approximately 360–400 units per month (340 sunny days × 4 units/kW/day). This exceeds the 300-unit threshold, so most households effectively have zero electricity bills.' },
  { q: 'How does net metering work?', a: 'When your solar panels generate more than your household consumes, the surplus is exported to the DISCOM grid and credited to your electricity account. This credit offsets your night-time or cloudy-day grid consumption.' },
  { q: 'Does Suntrik handle the entire process or do I have to do anything?', a: 'Suntrik handles everything — portal registration, DISCOM application, installation, inspection coordination, and subsidy disbursement. You need to provide your documents (Aadhaar, consumer number, bank details) and be available for the DISCOM inspection visit.' },
]

export default function SuryaGharPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div style={{ background: '#060A0F', minHeight: '100vh', color: 'var(--text-primary)' }}>
      <Navbar page />

      {/* ── Hero ── */}
      <div style={{ background: 'linear-gradient(135deg, #060A0F 0%, #1a0f06 50%, #060A0F 100%)', padding: '7rem 0 4rem', position: 'relative', overflow: 'hidden', borderBottom: '1px solid rgba(255,107,26,0.15)' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 900, height: 500, background: 'radial-gradient(ellipse, rgba(255,107,26,0.1) 0%, transparent 65%)', filter: 'blur(60px)' }} />
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,107,26,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,26,0.025) 1px, transparent 1px)', backgroundSize: '52px 52px' }} />
        </div>
        <div className="container" style={{ position: 'relative' }}>
          <div className="sg-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: '2.5rem', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                <span style={{ background: 'rgba(255,107,26,0.15)', color: 'var(--brand-orange)', fontSize: '0.72rem', fontWeight: 700, padding: '0.3rem 0.9rem', borderRadius: 100, border: '1px solid rgba(255,107,26,0.3)' }}>🏠 MNRE Scheme</span>
                <span style={{ background: 'rgba(255,107,26,0.15)', color: 'var(--brand-orange)', fontSize: '0.72rem', fontWeight: 700, padding: '0.3rem 0.9rem', borderRadius: 100, border: '1px solid rgba(255,107,26,0.3)' }}>✓ Empanelled Installer</span>
              </div>
              <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.1 }}>
                PM Surya Ghar —<br />
                <span className="gradient-text">300 Free Units Every Month</span>
              </h1>
              <p style={{ color: 'var(--text-secondary)', maxWidth: 640, lineHeight: 1.85, fontSize: '1rem', marginBottom: '2rem' }}>
                PM Surya Ghar Muft Bijli Yojana provides <strong style={{ color: 'var(--brand-orange)' }}>up to ₹78,000 subsidy</strong> on residential rooftop solar. With a 3 kW system, most Indian households get 300+ free units per month — effectively a zero electricity bill. Suntrik handles everything from registration to disbursement.
              </p>
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                {[{ v: '₹78,000', l: 'Max Subsidy' }, { v: '300', l: 'Free Units/Month' }, { v: '1 Cr', l: 'Homes Target' }, { v: '2–3 Yr', l: 'Payback Period' }].map(s => (
                  <div key={s.l} style={{ textAlign: 'center', padding: '0.85rem 1.25rem', background: 'rgba(255,107,26,0.07)', border: '1px solid rgba(255,107,26,0.18)', borderRadius: 10 }}>
                    <div style={{ fontFamily: 'Space Grotesk', fontWeight: 900, fontSize: '1.6rem', color: 'var(--brand-orange)', lineHeight: 1 }}>{s.v}</div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: 4 }}>{s.l}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a href="#contact-sg" className="btn-primary">Apply for PM Surya Ghar →</a>
                <a href="#subsidy" className="btn-outline">View Subsidy Slabs</a>
              </div>
            </div>

            {/* PM portrait */}
            <div className="sg-hero-portrait" style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
              <div style={{ position: 'absolute', inset: '-10%', background: 'radial-gradient(ellipse, rgba(255,107,26,0.18) 0%, transparent 68%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
              <img src="/pm-modi.png" alt="Hon'ble Prime Minister Shri Narendra Modi" loading="eager"
                style={{ position: 'relative', width: '100%', maxWidth: 380, height: 'auto', filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.55))' }} />
            </div>
          </div>
        </div>
      </div>

      {/* ── What is it ── */}
      <div style={{ background: '#0a1020', padding: '4rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }} className="sg-intro-grid">
            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--brand-orange)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', display: 'block', marginBottom: '0.75rem' }}>About the Scheme</span>
              <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.2 }}>What is PM Surya Ghar?</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, marginBottom: '1rem', fontSize: '0.9rem' }}>
                Launched on 13 February 2024 with a ₹75,021 crore outlay, PM Surya Ghar Muft Bijli Yojana targets 1 crore Indian households for rooftop solar by March 2027. It is the world's largest domestic rooftop solar programme.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, fontSize: '0.9rem', marginBottom: '1rem' }}>
                The scheme provides a direct central subsidy of up to ₹78,000 credited to the homeowner's bank account after a grid-tied solar system is installed and commissioned. Combined with net-metering, most households achieve near-zero electricity bills.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, fontSize: '0.9rem' }}>
                Suntrik is an empanelled installer with a 100% success rate across all PM Surya Ghar applications submitted in Haryana. We manage the entire process — from your first call to subsidy in your account.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
              {[
                { icon: '🏠', title: '1 Crore Homes', desc: 'National target under this scheme by 2027' },
                { icon: '💰', title: '₹75,021 Cr', desc: 'Total government outlay for the scheme' },
                { icon: '🌞', title: '30 GW Target', desc: 'Additional residential solar capacity' },
                { icon: '⚡', title: 'Net Metering', desc: 'Mandatory grid-tied system with surplus export' },
              ].map(c => (
                <div key={c.title} style={{ padding: '1.1rem', background: 'rgba(255,107,26,0.05)', border: '1px solid rgba(255,107,26,0.12)', borderRadius: 10 }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{c.icon}</div>
                  <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.25rem', color: 'var(--brand-orange)' }}>{c.title}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Benefits ── */}
      <div style={{ padding: '4rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, marginBottom: '0.6rem' }}>Why PM Surya Ghar Changes Everything</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 500, margin: '0 auto' }}>Six reasons why every eligible homeowner should act now.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }} className="sg-benefits-grid">
            {BENEFITS.map(b => (
              <div key={b.title} style={{ padding: '1.4rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,107,26,0.1)', borderRadius: 12, display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: 48, height: 48, borderRadius: 10, background: 'rgba(255,107,26,0.1)', border: '1px solid rgba(255,107,26,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0 }}>{b.icon}</div>
                <div>
                  <h3 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '0.88rem', marginBottom: '0.4rem', color: 'var(--brand-orange)' }}>{b.title}</h3>
                  <p style={{ fontSize: '0.77rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Subsidy Slabs ── */}
      <div id="subsidy" style={{ background: '#0a1020', padding: '4rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '3rem', alignItems: 'start' }} className="sg-subsidy-grid">
            <div>
              <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, marginBottom: '0.75rem' }}>Central Subsidy Slabs</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.25rem', fontSize: '0.9rem' }}>
                The central subsidy is paid as a direct benefit transfer (DBT) to your bank account after installation and DISCOM commissioning. Additional state subsidies may apply in some states.
              </p>
              <div style={{ padding: '1.25rem', background: 'rgba(255,107,26,0.06)', border: '1px solid rgba(255,107,26,0.15)', borderRadius: 10 }}>
                <div style={{ fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: '1.1rem', color: 'var(--brand-orange)', marginBottom: '0.5rem' }}>Recommendation for India</div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  For a typical Indian household consuming 200–400 units/month, a <strong style={{ color: 'var(--text-primary)' }}>3 kW system</strong> is optimal — it maximises the ₹78,000 subsidy and generates ~400 units/month, ensuring zero bills year-round.
                </p>
              </div>
            </div>
            <div>
              <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(255,107,26,0.15)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.3fr 1.2fr', background: 'rgba(255,107,26,0.12)', padding: '0.75rem 1rem', gap: '0.5rem' }}>
                  {['System Size', 'Central Subsidy', 'Notes'].map(h => (
                    <div key={h} style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--brand-orange)' }}>{h}</div>
                  ))}
                </div>
                {SUBSIDY_SLABS.map((row, i) => (
                  <div key={row.range} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.3fr 1.2fr', padding: '0.85rem 1rem', gap: '0.5rem', background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>{row.range}</div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--brand-orange)', fontFamily: 'Space Grotesk' }}>{row.total}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{row.note}</div>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.75rem', lineHeight: 1.6 }}>* Subsidy applicable on MNRE benchmark cost. State subsidies may provide additional benefit. Suntrik provides exact figures at assessment.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Process ── */}
      <div style={{ padding: '4rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, marginBottom: '0.6rem' }}>Portal to Power — Suntrik Handles It All</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 500, margin: '0 auto' }}>We manage every step so you don't have to visit any office or follow up with anyone.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }} className="sg-steps-grid">
            {STEPS.map(s => (
              <div key={s.n} style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,107,26,0.1)', borderRadius: 12 }}>
                <div style={{ fontFamily: 'Space Grotesk', fontWeight: 900, fontSize: '2.5rem', color: 'rgba(255,107,26,0.15)', lineHeight: 1, marginBottom: '0.75rem' }}>{s.n}</div>
                <h3 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--brand-orange)' }}>{s.title}</h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Installation Gallery (horizontal tray) ── */}
      <div style={{ padding: '4rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--brand-orange)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', display: 'block', marginBottom: '0.6rem' }}>Our Installations</span>
            <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, marginBottom: '0.5rem' }}>Real Homes. Real Savings.</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 500, margin: '0 auto', fontSize: '0.9rem' }}>Every photo is a family across India that now pays zero electricity bills — installed and commissioned by Suntrik. <span style={{ color: 'var(--brand-orange)' }}>Scroll to explore →</span></p>
          </div>
        </div>
        {/* full-bleed scrolling tray */}
        <div className="sg-gallery-tray" style={{ display: 'flex', gap: '1rem', overflowX: 'auto', padding: '0.5rem 2rem 1.5rem', scrollSnapType: 'x proximity', WebkitOverflowScrolling: 'touch' }}>
          {Array.from({ length: 40 }, (_, i) => (
            <img key={i} src={`/gallery/surya-ghar/sg-${String(i + 1).padStart(2, '0')}.jpg`}
              alt={`Surya Ghar installation ${i + 1}`} loading="lazy"
              style={{ height: 300, width: 'auto', flexShrink: 0, borderRadius: 12, display: 'block', border: '1px solid rgba(255,107,26,0.12)', scrollSnapAlign: 'center', boxShadow: '0 12px 30px rgba(0,0,0,0.35)' }} />
          ))}
        </div>
      </div>

      {/* ── Installation Team ── */}
      <div style={{ background: '#0a1020', padding: '4rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem', alignItems: 'center' }} className="sg-team-grid">
            <div style={{ position: 'relative' }}>
              <img src="/gallery/team.jpg" alt="Suntrik installation team" loading="lazy"
                style={{ width: '100%', borderRadius: 18, display: 'block', border: '2px solid rgba(255,107,26,0.25)', boxShadow: '0 30px 70px rgba(0,0,0,0.5)' }} />
              <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.25rem', background: 'rgba(6,10,15,0.75)', backdropFilter: 'blur(8px)', borderRadius: 10, padding: '0.7rem 1rem', border: '1px solid rgba(255,107,26,0.2)' }}>
                <div style={{ fontFamily: 'Space Grotesk', fontWeight: 900, fontSize: '1.1rem', color: 'var(--brand-orange)' }}>13+ Technicians</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>NISE-certified field crew</div>
              </div>
            </div>
            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--brand-orange)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', display: 'block', marginBottom: '0.75rem' }}>Our Team</span>
              <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.2 }}>The People Who Install Your Solar</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, marginBottom: '1rem', fontSize: '0.9rem' }}>
                Every Suntrik installation is carried out by our in-house field crew — trained, uniformed, and NISE-certified. They handle everything on-site: structural mounting, module placement, inverter wiring, net-meter cabling, and final commissioning checks.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                We don't outsource to local contractors. The same crew that designs your system builds it — ensuring quality, accountability, and the 5-year AMC you can count on.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                {[
                  { icon: '🎓', t: 'NISE-Certified', s: 'Every field engineer' },
                  { icon: '🔧', t: 'In-House Crew', s: 'No sub-contractors' },
                  { icon: '🛡️', t: '5-Year AMC', s: 'Residential installs' },
                  { icon: '📍', t: 'Pan-India', s: 'Active across states' },
                ].map(c => (
                  <div key={c.t} style={{ padding: '0.9rem 1rem', background: 'rgba(255,107,26,0.05)', border: '1px solid rgba(255,107,26,0.12)', borderRadius: 10 }}>
                    <div style={{ fontSize: '1.2rem', marginBottom: '0.3rem' }}>{c.icon}</div>
                    <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '0.85rem', color: 'var(--brand-orange)', marginBottom: '0.15rem' }}>{c.t}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{c.s}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── FAQs ── */}
      <div style={{ padding: '4rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, marginBottom: '2rem', textAlign: 'center' }}>Frequently Asked Questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {FAQS.map(f => (
              <div key={f.q} style={{ padding: '1.25rem 1.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,107,26,0.1)', borderRadius: 10 }}>
                <h3 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '0.92rem', marginBottom: '0.5rem', color: 'var(--brand-orange)' }}>Q: {f.q}</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div id="contact-sg" style={{ padding: '4rem 0', textAlign: 'center', background: 'linear-gradient(135deg, #060A0F 0%, #1a0f06 50%, #060A0F 100%)' }}>
        <div className="container" style={{ maxWidth: 600 }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏠</div>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800, marginBottom: '0.75rem' }}>Start Getting Free Electricity</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem' }}>
            Suntrik's team will assess your roof, confirm subsidy eligibility, and handle the entire PM Surya Ghar process — from portal to power to your bank account.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/#contact" className="btn-primary" style={{ textDecoration: 'none' }}>Get Free Assessment →</Link>
            <Link to="/projects" className="btn-outline" style={{ textDecoration: 'none' }}>View Our Projects</Link>
          </div>
        </div>
      </div>

      <Footer />
      <style>{`
        .sg-gallery-tray::-webkit-scrollbar { height: 8px; }
        .sg-gallery-tray::-webkit-scrollbar-track { background: rgba(255,255,255,0.04); border-radius: 100px; }
        .sg-gallery-tray::-webkit-scrollbar-thumb { background: rgba(255,107,26,0.4); border-radius: 100px; }
        .sg-gallery-tray::-webkit-scrollbar-thumb:hover { background: rgba(255,107,26,0.6); }
        .sg-gallery-tray { scrollbar-color: rgba(255,107,26,0.4) rgba(255,255,255,0.04); scrollbar-width: thin; }
        @media(max-width:860px){
          .sg-hero-grid { grid-template-columns:1fr !important; }
          .sg-hero-portrait { max-width:340px; margin:1.5rem auto 0; order:-1; }
          .sg-intro-grid,.sg-subsidy-grid { grid-template-columns:1fr !important; }
          .sg-benefits-grid,.sg-steps-grid { grid-template-columns:1fr !important; }
          .sg-team-grid { grid-template-columns:1fr !important; }
          .sg-gallery-tray img { height: 220px !important; }
        }
      `}</style>
    </div>
  )
}
