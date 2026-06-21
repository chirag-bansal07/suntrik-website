import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const CI_PHOTOS = Array.from({ length: 6 }, (_, i) => `/gallery/ci/ci-${String(i + 1).padStart(2, '0')}.jpg`)

const HIGHLIGHTS = [
  { icon: '⚡', title: 'Up to 1 MW+', desc: 'We design and commission rooftop and ground-mount systems for factories, warehouses, hospitals, schools, and commercial complexes.' },
  { icon: '🔧', title: '2-Year AMC', desc: 'All C&I installations come with a 2-year comprehensive AMC — preventive maintenance, remote monitoring, and guaranteed uptime.' },
  { icon: '📊', title: 'PVsyst-Verified Yield', desc: 'Every project is modelled in PVsyst before installation. Guaranteed energy yield backed by performance data from day one.' },
  { icon: '🏦', title: 'CAPEX & OPEX Models', desc: 'Choose between outright ownership (CAPEX) or zero-investment solar under a power purchase agreement (OPEX/PPA).' },
  { icon: '🔌', title: 'Net Metering & Open Access', desc: 'We handle DISCOM net-metering approvals and state-level open access filings for larger plants — typically within 30–45 days.' },
  { icon: '🛡️', title: 'End-to-End EPC', desc: 'Suntrik delivers turnkey: structural audit, module supply, inverter installation, SCADA wiring, DISCOM interface, and commissioning.' },
]

export default function CIPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div style={{ background: '#060A0F', minHeight: '100vh', color: 'var(--text-primary)' }}>
      <Navbar page />

      {/* ── Hero ── */}
      <div style={{ background: 'linear-gradient(135deg, #060A0F 0%, #0d0a20 50%, #060A0F 100%)', padding: '7rem 0 4rem', position: 'relative', overflow: 'hidden', borderBottom: '1px solid rgba(139,92,246,0.15)' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 900, height: 500, background: 'radial-gradient(ellipse, rgba(139,92,246,0.1) 0%, transparent 65%)', filter: 'blur(60px)' }} />
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(139,92,246,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.025) 1px, transparent 1px)', backgroundSize: '52px 52px' }} />
        </div>
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <span style={{ background: 'rgba(139,92,246,0.15)', color: '#8B5CF6', fontSize: '0.72rem', fontWeight: 700, padding: '0.3rem 0.9rem', borderRadius: 100, border: '1px solid rgba(139,92,246,0.3)' }}>🏗️ Commercial & Industrial Solar</span>
            <span style={{ background: 'rgba(139,92,246,0.15)', color: '#8B5CF6', fontSize: '0.72rem', fontWeight: 700, padding: '0.3rem 0.9rem', borderRadius: 100, border: '1px solid rgba(139,92,246,0.3)' }}>✓ Turnkey EPC</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.1, maxWidth: 720 }}>
            Solar for Business —<br />
            <span style={{ background: 'linear-gradient(90deg, #8B5CF6, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Cut Bills. Earn Credits. Go Green.</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 620, lineHeight: 1.85, fontSize: '1rem', marginBottom: '2rem' }}>
            Suntrik delivers end-to-end commercial & industrial rooftop solar — from <strong style={{ color: '#8B5CF6' }}>100 kWp to 1 MW+</strong>. Factories, warehouses, hospitals, schools, and housing societies across India trust Suntrik for DISCOM-approved, PVsyst-verified installations.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            {[{ v: '150 MW+', l: 'Cumulative C&I Capacity' }, { v: '2 Yr', l: 'AMC Coverage' }, { v: '100%', l: 'On-Time Delivery' }, { v: '30–45 d', l: 'Net-Meter Approval' }].map(s => (
              <div key={s.l} style={{ textAlign: 'center', padding: '0.85rem 1.25rem', background: 'rgba(139,92,246,0.07)', border: '1px solid rgba(139,92,246,0.18)', borderRadius: 10 }}>
                <div style={{ fontFamily: 'Space Grotesk', fontWeight: 900, fontSize: '1.6rem', color: '#8B5CF6', lineHeight: 1 }}>{s.v}</div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: 4 }}>{s.l}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/#contact" className="btn-primary" style={{ textDecoration: 'none', background: 'linear-gradient(90deg, #8B5CF6, #7C3AED)', borderColor: 'transparent' }}>Get a Free Site Assessment →</Link>
            <a href="#gallery" className="btn-outline" style={{ borderColor: 'rgba(139,92,246,0.4)', color: '#8B5CF6' }}>View Our Installations</a>
          </div>
        </div>
      </div>

      {/* ── What We Offer ── */}
      <div style={{ background: '#0a1020', padding: '4rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, marginBottom: '0.6rem' }}>What Suntrik Delivers for C&I</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 500, margin: '0 auto' }}>From feasibility to commissioning — every stage handled by our in-house engineers.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.1rem' }} className="ci-highlights-grid">
            {HIGHLIGHTS.map(h => (
              <div key={h.title} style={{ padding: '1.4rem', background: 'rgba(139,92,246,0.04)', border: '1px solid rgba(139,92,246,0.12)', borderRadius: 12, display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: 46, height: 46, borderRadius: 10, background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0 }}>{h.icon}</div>
                <div>
                  <h3 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '0.88rem', marginBottom: '0.35rem', color: '#8B5CF6' }}>{h.title}</h3>
                  <p style={{ fontSize: '0.77rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Installation Gallery ── */}
      <div id="gallery" style={{ padding: '4rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '0.7rem', color: '#8B5CF6', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', display: 'block', marginBottom: '0.6rem' }}>Our Installations</span>
            <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, marginBottom: '0.5rem' }}>C&I Projects Gallery</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 500, margin: '0 auto', fontSize: '0.9rem' }}>Factories, commercial complexes, and industrial plants powered by Suntrik — built to perform for 25+ years.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem' }} className="ci-gallery-grid">
            {CI_PHOTOS.map((src, i) => (
              <div key={i} style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(139,92,246,0.15)', background: '#06090e', aspectRatio: '16/10' }}>
                <img src={src} alt={`C&I installation ${i + 1}`} loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{ padding: '4rem 0', textAlign: 'center', background: 'linear-gradient(135deg, #060A0F 0%, #0d0a20 50%, #060A0F 100%)' }}>
        <div className="container" style={{ maxWidth: 600 }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏗️</div>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800, marginBottom: '0.75rem' }}>Ready to Cut Your Commercial Power Bill?</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem' }}>
            Our engineers will visit your site, assess your load profile and roof, and deliver a full techno-commercial proposal within 48 hours — completely free.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/#contact" className="btn-primary" style={{ textDecoration: 'none', background: 'linear-gradient(90deg, #8B5CF6, #7C3AED)', borderColor: 'transparent' }}>Get Free Assessment →</Link>
            <Link to="/projects" className="btn-outline" style={{ textDecoration: 'none', borderColor: 'rgba(139,92,246,0.4)', color: '#8B5CF6' }}>View All Projects</Link>
          </div>
        </div>
      </div>

      <Footer />
      <style>{`
        @media(max-width:860px){
          .ci-highlights-grid { grid-template-columns:1fr !important; }
          .ci-gallery-grid { grid-template-columns:1fr !important; }
        }
        @media(max-width:600px){
          .ci-highlights-grid { grid-template-columns:1fr !important; }
        }
      `}</style>
    </div>
  )
}
