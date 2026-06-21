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
    desc: 'Farmers, cooperatives, panchayats and FPOs set up ground- or stilt-mounted solar power plants on barren or cultivable land and sell the power to the DISCOM.',
    points: ['10,000 MW national target', 'Plant size: 500 kW to 2 MW', 'Power sold to the DISCOM', 'Income from otherwise barren land'],
  },
  {
    id: 'B', label: 'Component B', title: 'Standalone Solar Agriculture Pumps',
    color: '#FF6B1A', icon: '🌱',
    desc: 'Installation of standalone solar agriculture pumps for farmers without a grid connection — replacing diesel pumps with zero fuel cost and zero electricity bill for irrigation.',
    points: ['14 lakh pumps targeted nationally', 'Pump capacity up to 7.5 HP', '30% central + at least 30% state subsidy', 'Farmer pays only 10% upfront after loan'],
  },
  {
    id: 'C', label: 'Component C', title: 'Solarisation of Grid-Connected Pumps',
    color: '#3B82F6', icon: '🔋',
    desc: 'Solarisation of existing grid-connected pumps individually (IPS) or by solarising the whole agriculture feeder (FLS). Farmers use solar by day and feed surplus to the DISCOM.',
    points: ['35 lakh grid-connected pumps targeted', 'Individual (IPS) & Feeder Level (FLS)', 'Net-metering with the DISCOM', '30% central financial assistance'],
  },
]

const STEPS = [
  { n: '01', title: 'Application on PM-KUSUM Portal', desc: 'Suntrik registers you on the official MNRE/HAREDA portal, submits your land details, Aadhaar, and electricity connection documents.' },
  { n: '02', title: 'DPR Preparation & Submission', desc: 'Our engineers prepare the Detailed Project Report — site survey, load calculation, single-line diagram, and equipment specifications per MNRE norms.' },
  { n: '03', title: 'HAREDA Sanction', desc: 'We follow up with HAREDA and the State Nodal Agency to obtain the official sanction letter — typically within 3–4 weeks of submission.' },
  { n: '04', title: 'Turnkey Installation', desc: 'Suntrik\'s NISE-certified team installs the complete system: modules, inverters, mounting, cabling, and pump controller. MNRE Tier-1 components only.' },
  { n: '05', title: 'DISCOM Inspection & Commissioning', desc: 'We coordinate the DISCOM inspection, net-metering connection (Component A/C), and official commissioning certificate.' },
  { n: '06', title: 'Subsidy Disbursement', desc: 'Suntrik tracks and coordinates the subsidy disbursement from HAREDA/MNRE directly to your account. Your full subsidy benefit is credited without any follow-up from your side.' },
]

const FAQS = [
  { q: 'Who is eligible for PM-KUSUM Component B?', a: 'Any farmer with agricultural land (minimum 0.5 acres) who wants to replace their diesel pump or install a new solar pump. No existing electricity connection required.' },
  { q: 'What is the actual cost to the farmer after subsidy?', a: 'Under Component B, the Centre provides 30% Central Financial Assistance and the State at least 30%. The farmer\'s 40% share can be cut to just 10% upfront with bank finance for the remaining 30% — about ₹24,000 upfront on a ₹2.4 lakh 5 HP pump.' },
  { q: 'How long does the entire process take?', a: 'From application to system commissioning, Suntrik\'s process typically takes 45–60 days. HAREDA sanction takes 3–4 weeks; installation takes 5–7 days once approved.' },
  { q: 'Does Suntrik handle all the paperwork?', a: 'Yes. Suntrik manages the complete process — portal registration, DPR, HAREDA coordination, installation, DISCOM inspection, and subsidy disbursement. You only need to provide documents once.' },
  { q: 'Is maintenance covered after installation?', a: 'All Suntrik PM-KUSUM installations come with a 5-year comprehensive AMC covering preventive maintenance, part replacement, and remote monitoring. Module warranty is 25 years.' },
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
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <span style={{ background: 'rgba(16,185,129,0.15)', color: '#10B981', fontSize: '0.72rem', fontWeight: 700, padding: '0.3rem 0.9rem', borderRadius: 100, border: '1px solid rgba(16,185,129,0.3)' }}>🌾 MNRE Scheme</span>
            <span style={{ background: 'rgba(16,185,129,0.15)', color: '#10B981', fontSize: '0.72rem', fontWeight: 700, padding: '0.3rem 0.9rem', borderRadius: 100, border: '1px solid rgba(16,185,129,0.3)' }}>✓ HAREDA Empanelled Installer</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.1, maxWidth: 700 }}>
            PM-KUSUM Scheme —<br />
            <span style={{ background: 'linear-gradient(90deg, #10B981, #34D399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Solar Power for Every Farmer</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 620, lineHeight: 1.85, fontSize: '1rem', marginBottom: '2rem' }}>
            Pradhan Mantri Kisan Urja Suraksha evam Utthaan Mahabhiyan (PM-KUSUM) is India's flagship scheme to solarise agriculture, targeting <strong style={{ color: '#10B981' }}>34,800 MW</strong> of solar capacity by March 2026. Under Component-B, the Centre gives 30% and the State at least 30% — with bank finance the farmer initially pays only <strong style={{ color: '#10B981' }}>10%</strong>. Suntrik handles everything from application to commissioning.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            {[{ v: '34,800 MW', l: 'Target by March 2026' }, { v: '₹34,422 Cr', l: 'Central Outlay' }, { v: '30% + 30%', l: 'Centre + State Subsidy' }, { v: '10%', l: 'Farmer Pays (after loan)' }].map(s => (
              <div key={s.l} style={{ textAlign: 'center', padding: '0.85rem 1.25rem', background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.18)', borderRadius: 10 }}>
                <div style={{ fontFamily: 'Space Grotesk', fontWeight: 900, fontSize: '1.6rem', color: '#10B981', lineHeight: 1 }}>{s.v}</div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: 4 }}>{s.l}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#contact-kusum" className="btn-primary" style={{ background: 'linear-gradient(90deg, #10B981, #059669)', borderColor: 'transparent' }}>Apply for PM-KUSUM →</a>
            <a href="#components" className="btn-outline" style={{ borderColor: 'rgba(16,185,129,0.4)', color: '#10B981' }}>View Components</a>
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
                { icon: '🌱', title: '14 Lakh', desc: 'Standalone solar pumps (Component B)' },
                { icon: '🔋', title: '35 Lakh', desc: 'Grid-connected pumps (Component C)' },
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
            <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, marginBottom: '0.6rem' }}>Three Components of PM-KUSUM</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 500, margin: '0 auto' }}>Suntrik is empanelled and active under all three components in Haryana.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }} className="kusum-comp-grid">
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

      {/* ── Subsidy Structure ── */}
      <div style={{ background: '#0a1020', padding: '4rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '3rem', alignItems: 'start' }} className="kusum-subsidy-grid">
            <div>
              <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, marginBottom: '0.75rem' }}>Subsidy Structure</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                Under Component B (standalone solar pumps), the Centre provides 30% Central Financial Assistance — 50% in special-category regions — and the State adds at least 30%. The farmer&apos;s 40% share drops to just 10% upfront, with bank finance for the remaining 30%.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { label: 'Central Financial Assistance', pct: 30, color: '#10B981' },
                  { label: 'State Government Subsidy', pct: 30, color: '#3B82F6' },
                  { label: 'Farmer Share (10% upfront + 30% loan)', pct: 40, color: '#FF6B1A' },
                ].map(s => (
                  <div key={s.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                      <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{s.label}</span>
                      <span style={{ fontFamily: 'Space Grotesk', fontWeight: 800, color: s.color }}>{s.pct}%</span>
                    </div>
                    <div style={{ height: 8, background: 'rgba(255,255,255,0.06)', borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${s.pct}%`, background: s.color, borderRadius: 4 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1rem', marginBottom: '1rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Sample Cost Breakdown (5 HP Pump)</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {[
                  { label: 'Benchmark Cost (5 HP, indicative)', value: '₹2,40,000', note: 'MNRE benchmark — varies by capacity' },
                  { label: 'Central CFA (30%)', value: '− ₹72,000', color: '#10B981' },
                  { label: 'State Subsidy (30%)', value: '− ₹72,000', color: '#3B82F6' },
                  { label: 'Farmer Upfront (10%)', value: '₹24,000', color: '#FF6B1A', bold: true },
                ].map(r => (
                  <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', background: r.bold ? 'rgba(255,107,26,0.08)' : 'rgba(255,255,255,0.03)', border: `1px solid ${r.bold ? 'rgba(255,107,26,0.2)' : 'rgba(255,255,255,0.06)'}`, borderRadius: 8 }}>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{r.label}</span>
                    <span style={{ fontFamily: 'Space Grotesk', fontWeight: r.bold ? 900 : 700, color: r.color || 'var(--text-primary)', fontSize: r.bold ? '1rem' : '0.9rem' }}>{r.value}</span>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.75rem', lineHeight: 1.6 }}>* Benchmark costs vary by pump capacity and state. Figures above are indicative. Suntrik provides exact cost breakdown at the assessment stage.</p>
            </div>
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }} className="kusum-proj-grid">
            {KUSUM_PROJECTS.map(p => (
              <div key={p.id} style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(16,185,129,0.15)', background: 'rgba(16,185,129,0.04)', display: 'flex' }}>
                {p.img ? (
                  <div style={{ width: 200, flexShrink: 0, backgroundImage: `url(${p.img})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRight: '1px solid rgba(16,185,129,0.12)' }} />
                ) : (
                  <div style={{ width: 90, flexShrink: 0, background: 'linear-gradient(145deg, rgba(16,185,129,0.2) 0%, transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', borderRight: '1px solid rgba(16,185,129,0.12)' }}>🌾</div>
                )}
                <div style={{ flex: 1, padding: '1.25rem' }}>
                  <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{ background: '#10B981', color: '#fff', fontSize: '0.6rem', fontWeight: 800, padding: '0.15rem 0.6rem', borderRadius: 100 }}>PM-KUSUM</span>
                    <span style={{ background: 'rgba(255,184,48,0.1)', color: 'var(--brand-amber)', fontSize: '0.6rem', fontWeight: 700, padding: '0.15rem 0.6rem', borderRadius: 100, border: '1px solid rgba(255,184,48,0.2)' }}>{p.capacity}</span>
                    {p.subsidy && <span style={{ background: 'rgba(16,185,129,0.12)', color: '#10B981', fontSize: '0.6rem', fontWeight: 700, padding: '0.15rem 0.6rem', borderRadius: 100 }}>{p.subsidy} Subsidy</span>}
                  </div>
                  <h3 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1rem', marginBottom: '0.25rem' }}>{p.title}</h3>
                  <p style={{ fontSize: '0.7rem', color: '#10B981', fontWeight: 600, marginBottom: '0.6rem' }}>📍 {p.location} · {p.year}</p>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '0.75rem' }}>{p.desc}</p>
                  <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.3rem' }}>
                    {p.highlights.map(h => (
                      <li key={h} style={{ display: 'flex', gap: '0.35rem', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        <span style={{ color: '#10B981', flexShrink: 0 }}>✓</span>{h}
                      </li>
                    ))}
                  </ul>
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
          .kusum-intro-grid,.kusum-subsidy-grid { grid-template-columns:1fr !important; }
          .kusum-comp-grid,.kusum-steps-grid { grid-template-columns:1fr !important; }
          .kusum-proj-grid { grid-template-columns:1fr !important; }
        }
      `}</style>
    </div>
  )
}
