import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { PROJECTS, TYPE_COLOR, TYPE_ICON } from '../data/projects'

const KUSUM_PROJECTS = PROJECTS.filter(p => p.type === 'PM-KUSUM')

const COMPONENTS = [
  {
    id: 'A', label: 'Component A', title: 'Decentralized Grid-Connected Solar Power Plants',
    color: '#10B981', icon: '⚡',
    desc: 'Farmers, cooperatives, panchayats and FPOs set up ground- or stilt-mounted solar power plants on barren or cultivable land and sell the power to the DISCOM at a fixed tariff.',
    points: ['10,000 MW national target', 'Plant size: 500 kW to 2 MW', 'Power sold to the DISCOM at fixed tariff', 'Income from otherwise barren / cultivable land'],
  },
  {
    id: 'C', label: 'Component C', title: 'Solarisation of Grid-Connected Pumps',
    color: '#3B82F6', icon: '🔋',
    desc: 'Solarisation of existing grid-connected pumps individually (IPS) or by solarising the whole agriculture feeder (FLS). Farmers use solar by day and feed surplus to the DISCOM.',
    points: ['35 lakh grid-connected pumps targeted', 'Individual (IPS) & Feeder Level (FLS)', 'Net-metering — sell surplus to the DISCOM', '30% central financial assistance'],
  },
]

const STEPS = [
  { n: '01', title: 'Application on PM-KUSUM Portal', desc: 'Suntrik registers you on the official MNRE/HAREDA portal, submits your land details, Aadhaar, and electricity connection documents.' },
  { n: '02', title: 'DPR Preparation & Submission', desc: 'Our engineers prepare the Detailed Project Report — site survey, load calculation, single-line diagram, and equipment specifications per MNRE norms.' },
  { n: '03', title: 'HAREDA Sanction', desc: 'We follow up with HAREDA and the State Nodal Agency to obtain the official sanction letter — typically within 3–4 weeks of submission.' },
  { n: '04', title: 'Turnkey Installation', desc: 'Suntrik\'s NISE-certified team installs the complete system: modules, inverters, mounting, cabling, and pump controller. MNRE Tier-1 components only.' },
  { n: '05', title: 'DISCOM Inspection & Commissioning', desc: 'We coordinate the DISCOM inspection, net-metering / PPA connection, and official commissioning certificate.' },
  { n: '06', title: 'Subsidy Disbursement', desc: 'Suntrik tracks and coordinates the subsidy disbursement from HAREDA/MNRE directly to your account. Your full subsidy benefit is credited without any follow-up from your side.' },
]

const FAQS = [
  { q: 'Who is eligible for PM-KUSUM Component A?', a: 'Farmers, cooperatives, panchayats, and Farmer Producer Organisations (FPOs) with barren or cultivable land can set up ground-mount solar plants of 500 kW to 2 MW and sell power to the DISCOM under a 25-year PPA.' },
  { q: 'Who is eligible for PM-KUSUM Component C?', a: 'Any farmer with an existing grid-connected agriculture pump can apply. The pump is solarised under IPS (individual) or FLS (feeder-level) mode. The farmer irrigates free during daylight and earns net-metering credits for surplus power fed to the DISCOM.' },
  { q: 'What CFA (subsidy) is available under Component A and C?', a: 'The Centre provides 30% Central Financial Assistance under both components. States typically add further support — in Haryana, HAREDA supplements the central grant. Suntrik calculates the exact net cost at the free assessment stage.' },
  { q: 'How long does the entire process take?', a: 'From application to commissioning, Suntrik\'s process typically takes 45–60 days for Component C pump solarisation. Component A ground-mount plants (larger scale) take 90–120 days including DISCOM interconnection and PPA signing.' },
  { q: 'Does Suntrik handle all the paperwork?', a: 'Yes. Suntrik manages everything — portal registration, DPR preparation, HAREDA coordination, installation, DISCOM inspection and net-metering, and CFA disbursement follow-up. You provide documents once.' },
  { q: 'Is maintenance covered after installation?', a: 'All Suntrik PM-KUSUM installations include a 5-year comprehensive AMC covering preventive maintenance, inverter health checks, cleaning schedules, and remote monitoring.' },
]

export default function KusumPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div style={{ background: '#060A0F', minHeight: '100vh', color: 'var(--text-primary)' }}>
      <Navbar page />

      {/* ── Hero ── */}
      <div style={{ background: 'linear-gradient(135deg, #060A0F 0%, #0a1f0e 50%, #060A0F 100%)', padding: '7rem 0 4rem', position: 'relative', overflow: 'hidden', borderBottom: '1px solid rgba(16,185,129,0.15)' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 900, height: 500, background: 'radial-gradient(ellipse, rgba(16,185,129,0.1) 0%, transparent 65%)', filter: 'blur(60px)' }} />
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(16,185,129,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.025) 1px, transparent 1px)', backgroundSize: '52px 52px' }} />
        </div>
        <div className="container" style={{ position: 'relative' }}>
          <div className="kusum-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: '2.5rem', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                <span style={{ background: 'rgba(16,185,129,0.15)', color: '#10B981', fontSize: '0.72rem', fontWeight: 700, padding: '0.3rem 0.9rem', borderRadius: 100, border: '1px solid rgba(16,185,129,0.3)' }}>🌾 MNRE Scheme</span>
                <span style={{ background: 'rgba(16,185,129,0.15)', color: '#10B981', fontSize: '0.72rem', fontWeight: 700, padding: '0.3rem 0.9rem', borderRadius: 100, border: '1px solid rgba(16,185,129,0.3)' }}>✓ HAREDA Empanelled Installer</span>
              </div>
              <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.1 }}>
                PM-KUSUM Scheme —<br />
                <span style={{ background: 'linear-gradient(90deg, #10B981, #34D399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Solar Power for Every Farmer</span>
              </h1>
              <p style={{ color: 'var(--text-secondary)', maxWidth: 620, lineHeight: 1.8, fontSize: '1rem', marginBottom: '2rem' }}>
                <strong style={{ color: '#10B981' }}>PM-KUSUM</strong> solarises Indian agriculture: Component A lets farmers earn by selling solar power to the DISCOM, and Component C solarises grid-connected pumps with net-metering. Suntrik handles it end to end — application to commissioning.
              </p>
              <div className="kusum-hero-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.6rem', marginBottom: '2.5rem' }}>
                {[{ v: '34,800 MW', l: 'Target by March 2026' }, { v: '₹34,422 Cr', l: 'Central Outlay' }, { v: '30%', l: 'Central Financial Assistance' }, { v: '35 Lakh', l: 'Grid-Connected Pumps (Comp. C)' }].map(s => (
                  <div key={s.l} style={{ textAlign: 'center', padding: '0.7rem 0.5rem', background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.18)', borderRadius: 10 }}>
                    <div style={{ fontFamily: 'Space Grotesk', fontWeight: 900, fontSize: '1.15rem', color: '#10B981', lineHeight: 1.1, whiteSpace: 'nowrap' }}>{s.v}</div>
                    <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.3 }}>{s.l}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a href="#contact-kusum" className="btn-primary" style={{ background: 'linear-gradient(90deg, #10B981, #059669)', borderColor: 'transparent' }}>Apply for PM-KUSUM →</a>
                <a href="#components" className="btn-outline" style={{ borderColor: 'rgba(16,185,129,0.4)', color: '#10B981' }}>View Components</a>
              </div>
            </div>

            {/* PM portrait */}
            <div className="kusum-hero-portrait" style={{ position: 'relative', alignSelf: 'stretch', minHeight: 340 }}>
              <div style={{ position: 'absolute', inset: '10% -6% 0 6%', background: 'radial-gradient(ellipse at bottom, rgba(16,185,129,0.22) 0%, transparent 65%)', filter: 'blur(45px)', pointerEvents: 'none' }} />
              <img src="/pm-modi.png" alt="Hon'ble Prime Minister Shri Narendra Modi" loading="eager"
                style={{ position: 'absolute', bottom: 'calc(-4rem - 40px)', right: -100, width: '100%', maxWidth: 540, height: 'auto', transform: 'scale(1.82)', transformOrigin: 'bottom right', filter: 'drop-shadow(0 24px 45px rgba(0,0,0,0.55))' }} />
            </div>
          </div>
        </div>
      </div>

      {/* ── What is PM-KUSUM ── */}
      <div style={{ background: '#0a1020', padding: '4rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }} className="kusum-intro-grid">
            <div>
              <span style={{ fontSize: '0.7rem', color: '#10B981', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', display: 'block', marginBottom: '0.75rem' }}>About the Scheme</span>
              <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.2 }}>What is PM-KUSUM?</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, marginBottom: '1rem', fontSize: '0.9rem' }}>
                Launched in 2019 by the Ministry of New and Renewable Energy (MNRE), PM-KUSUM aims to add 34,800 MW of solar capacity by March 2026, with central financial support of ₹34,422 crore, through three components targeting farmers, irrigation pumps, and agricultural feeders.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, fontSize: '0.9rem' }}>
                In Haryana, the scheme is implemented through <strong style={{ color: 'var(--text-primary)' }}>HAREDA (Haryana Renewable Energy Development Agency)</strong>. Suntrik is HAREDA-empanelled, meaning we are an officially approved installer authorised to execute PM-KUSUM projects with full subsidy eligibility.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
              {[
                { icon: '⚡', title: '34,800 MW', desc: 'Solar capacity target by March 2026' },
                { icon: '💰', title: '₹34,422 Cr', desc: 'Total central financial support' },
                { icon: '🌾', title: '10,000 MW', desc: 'Decentralized plants target (Component A)' },
                { icon: '🔋', title: '35 Lakh', desc: 'Grid-connected pumps solarised (Component C)' },
              ].map(c => (
                <div key={c.title} style={{ padding: '1.1rem', background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.12)', borderRadius: 10 }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{c.icon}</div>
                  <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.25rem', color: '#10B981' }}>{c.title}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Components ── */}
      <div id="components" style={{ padding: '4rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, marginBottom: '0.6rem' }}>Components Suntrik Executes</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 500, margin: '0 auto' }}>Suntrik is HAREDA-empanelled for Component A and Component C across Rajasthan and Haryana.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', maxWidth: 780, margin: '0 auto' }} className="kusum-comp-grid">
            {COMPONENTS.map(c => (
              <div key={c.id} style={{ borderRadius: 14, overflow: 'hidden', border: `1px solid ${c.color}22`, background: `linear-gradient(160deg, ${c.color}10 0%, rgba(6,10,15,0.98) 60%)` }}>
                <div style={{ height: 4, background: c.color }} />
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ width: 52, height: 52, borderRadius: 12, background: `${c.color}20`, border: `1px solid ${c.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1rem' }}>{c.icon}</div>
                  <div style={{ fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: c.color, marginBottom: '0.4rem' }}>{c.label}</div>
                  <h3 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1rem', marginBottom: '0.75rem', lineHeight: 1.3 }}>{c.title}</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>{c.desc}</p>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {c.points.map(pt => (
                      <li key={pt} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        <span style={{ color: c.color, flexShrink: 0 }}>✓</span>{pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Process ── */}
      <div style={{ padding: '4rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, marginBottom: '0.6rem' }}>How Suntrik Does It All For You</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 500, margin: '0 auto' }}>You provide your documents once. Suntrik manages every step from portal to power.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }} className="kusum-steps-grid">
            {STEPS.map((s, i) => (
              <div key={s.n} style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(16,185,129,0.1)', borderRadius: 12, position: 'relative' }}>
                <div style={{ fontFamily: 'Space Grotesk', fontWeight: 900, fontSize: '2.5rem', color: 'rgba(16,185,129,0.15)', lineHeight: 1, marginBottom: '0.75rem' }}>{s.n}</div>
                <h3 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.5rem', color: '#10B981' }}>{s.title}</h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Our PM-KUSUM Projects ── */}
      <div style={{ background: '#0a1020', padding: '4rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container">
          <div style={{ marginBottom: '2rem' }}>
            <span style={{ fontSize: '0.7rem', color: '#10B981', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: '0.5rem' }}>Our Work</span>
            <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800 }}>PM-KUSUM Projects by Suntrik</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))', gap: '1.5rem' }} className="kusum-proj-grid">
            {KUSUM_PROJECTS.map(p => (
              <div key={p.id}
                style={{ borderRadius: 18, overflow: 'hidden', border: '1px solid rgba(16,185,129,0.18)', background: 'rgba(16,185,129,0.04)', cursor: 'pointer', transition: 'transform 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.borderColor = 'rgba(16,185,129,0.55)'; e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.45)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'rgba(16,185,129,0.18)'; e.currentTarget.style.boxShadow = 'none' }}
              >
                <div style={{ position: 'relative', height: 260, overflow: 'hidden' }}>
                  {p.img
                    ? <img src={p.img} alt={p.location} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    : <div style={{ width: '100%', height: '100%', background: 'linear-gradient(145deg, rgba(16,185,129,0.25), #060A0F)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3.5rem' }}>🌾</div>}
                  {/* gradient scrim for legible text */}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,10,15,0.94) 0%, rgba(6,10,15,0.2) 48%, transparent 72%)' }} />
                  {/* scheme tag */}
                  <span style={{ position: 'absolute', top: '0.9rem', left: '0.9rem', background: '#10B981', color: '#fff', fontSize: '0.64rem', fontWeight: 800, padding: '0.28rem 0.75rem', borderRadius: 100, letterSpacing: '0.04em' }}>🌾 PM-KUSUM</span>
                  {/* capacity + location */}
                  <div style={{ position: 'absolute', left: '1.2rem', right: '1.2rem', bottom: '1.1rem' }}>
                    <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 900, fontSize: '2.3rem', lineHeight: 1, color: '#fff', textShadow: '0 2px 18px rgba(0,0,0,0.5)' }}>{p.capacity}</div>
                    <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.9)', fontWeight: 600, marginTop: '0.45rem' }}>📍 {p.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <Link to="/projects" className="btn-outline" style={{ textDecoration: 'none', borderColor: 'rgba(16,185,129,0.4)', color: '#10B981' }}>View All Projects →</Link>
          </div>
        </div>
      </div>

      {/* ── FAQs ── */}
      <div style={{ padding: '4rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, marginBottom: '2rem', textAlign: 'center' }}>Frequently Asked Questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {FAQS.map(f => (
              <div key={f.q} style={{ padding: '1.25rem 1.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(16,185,129,0.1)', borderRadius: 10 }}>
                <h3 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '0.92rem', marginBottom: '0.5rem', color: '#10B981' }}>Q: {f.q}</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div id="contact-kusum" style={{ padding: '4rem 0', textAlign: 'center', background: 'linear-gradient(135deg, #060A0F 0%, #0a1f0e 50%, #060A0F 100%)' }}>
        <div className="container" style={{ maxWidth: 600 }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌾</div>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800, marginBottom: '0.75rem' }}>Ready to Apply for PM-KUSUM?</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem' }}>
            Suntrik's HAREDA-empanelled team will assess your land, confirm your eligibility, and handle the complete application — no hassle, no risk. First consultation is free.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/#contact" className="btn-primary" style={{ textDecoration: 'none', background: 'linear-gradient(90deg, #10B981, #059669)', borderColor: 'transparent' }}>Get Free Assessment →</Link>
            <Link to="/projects" className="btn-outline" style={{ textDecoration: 'none', borderColor: 'rgba(16,185,129,0.4)', color: '#10B981' }}>View Our Projects</Link>
          </div>
        </div>
      </div>

      <Footer />
      <style>{`
        @media(max-width:860px){
          .kusum-hero-grid { grid-template-columns:1fr !important; }
          .kusum-hero-stats { grid-template-columns:repeat(2,1fr) !important; }
          .kusum-hero-portrait { order:-1; min-height:0 !important; }
          .kusum-hero-portrait img { position:static !important; bottom:auto !important; right:auto !important; transform:none !important; max-width:280px !important; margin:1rem auto 0 !important; display:block; }
          .kusum-intro-grid { grid-template-columns:1fr !important; }
          .kusum-comp-grid,.kusum-steps-grid { grid-template-columns:1fr !important; }
          .kusum-proj-grid { grid-template-columns:1fr !important; }
        }
      `}</style>
    </div>
  )
}
