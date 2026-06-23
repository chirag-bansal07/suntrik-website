import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { PROJECTS, TYPE_COLOR, TYPE_ICON } from '../data/projects'

const FILTERS = ['PM-KUSUM', 'PM Surya Ghar', 'C&I']

// PM Surya Ghar & C&I are shown as photo galleries (not project cards)
const GALLERY = {
  'PM Surya Ghar': Array.from({ length: 40 }, (_, i) => `/gallery/surya-ghar/sg-${String(i + 1).padStart(2, '0')}.jpg`),
  'C&I':           Array.from({ length: 6 },  (_, i) => `/gallery/ci/ci-${String(i + 1).padStart(2, '0')}.jpg`),
}

export default function ProjectsPage() {
  const [active, setActive] = useState('PM-KUSUM')
  const filtered = PROJECTS.filter(p => p.type === active)

  useEffect(() => { window.scrollTo(0, 0); document.title = 'Projects | Suntrik Green Energy — Solar EPC India' }, [])

  return (
    <div style={{ background: '#060A0F', minHeight: '100vh', color: 'var(--text-primary)' }}>
      <Navbar page />

      {/* Hero banner */}
      <div style={{
        background: 'linear-gradient(135deg, #060A0F 0%, #0d1a2e 50%, #060A0F 100%)',
        padding: '7rem 0 3rem', textAlign: 'center', position: 'relative', overflow: 'hidden',
        borderBottom: '1px solid rgba(255,107,26,0.1)',
      }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 800, height: 400, background: 'radial-gradient(ellipse, rgba(255,107,26,0.08) 0%, transparent 65%)', filter: 'blur(60px)' }} />
        </div>
        <div className="container" style={{ position: 'relative' }}>
          <span className="section-tag" style={{ justifyContent: 'center', marginBottom: '1rem' }}>Portfolio</span>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.1 }}>
            All Projects
          </h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 520, margin: '0 auto', lineHeight: 1.8 }}>
            Every installation Suntrik has delivered — from PM-KUSUM farmer clusters to large industrial rooftops across India.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
            {[{ v: '1000+', l: 'Projects' }, { v: '4', l: 'Sectors' }, { v: '150MW+', l: 'Capacity' }, { v: '100%', l: 'On-Time' }].map(s => (
              <div key={s.l} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'Space Grotesk', fontWeight: 900, fontSize: '1.8rem', background: 'var(--gradient-sun)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{s.v}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter + Grid */}
      <div className="container" style={{ padding: '3rem 0 5rem' }}>
        {/* Filters */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {FILTERS.map(f => (
            <button key={f} onClick={() => setActive(f)} style={{
              padding: '0.55rem 1.35rem', borderRadius: 100, border: '1px solid',
              borderColor: active === f ? 'transparent' : 'rgba(255,255,255,0.12)',
              background: active === f ? 'var(--gradient-sun)' : 'transparent',
              color: active === f ? '#fff' : 'var(--text-secondary)',
              fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer', fontFamily: 'inherit',
              display: 'flex', alignItems: 'center', gap: '0.4rem',
            }}>
              {TYPE_ICON[f] || '☀️'} {f}
              <span style={{ background: active === f ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.08)', borderRadius: 100, padding: '0 0.4rem', fontSize: '0.7rem' }}>
                {GALLERY[f] ? GALLERY[f].length : PROJECTS.filter(p => p.type === f).length}
              </span>
            </button>
          ))}
        </div>

        {active === 'PM-KUSUM' ? (
          /* ── PM-KUSUM: project cards ── */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))', gap: '1.5rem' }} className="all-proj-grid">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <motion.div key={p.id} layout
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6 }}
                  style={{ borderRadius: 18, overflow: 'hidden', border: `1px solid ${TYPE_COLOR[p.type]}2e`, background: 'rgba(255,255,255,0.03)', cursor: 'pointer', transition: 'border-color 0.25s, box-shadow 0.25s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `${TYPE_COLOR[p.type]}88`; e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.45)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = `${TYPE_COLOR[p.type]}2e`; e.currentTarget.style.boxShadow = 'none' }}
                >
                  <div style={{ position: 'relative', height: 260, overflow: 'hidden' }}>
                    {p.img
                      ? <img src={p.img} alt={p.location} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      : <div style={{ width: '100%', height: '100%', background: `linear-gradient(145deg, ${TYPE_COLOR[p.type]}33 0%, #060A0F 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3.5rem' }}>{TYPE_ICON[p.type]}</div>}
                    {/* gradient scrim for legible text */}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,10,15,0.94) 0%, rgba(6,10,15,0.2) 48%, transparent 72%)' }} />
                    {/* scheme tag */}
                    <span style={{ position: 'absolute', top: '0.9rem', left: '0.9rem', background: TYPE_COLOR[p.type], color: '#fff', fontSize: '0.64rem', fontWeight: 800, padding: '0.28rem 0.75rem', borderRadius: 100, letterSpacing: '0.04em' }}>{TYPE_ICON[p.type]} {p.type}</span>
                    {/* subsidy badge (if any) */}
                    {p.subsidy && (
                      <span style={{ position: 'absolute', top: '0.9rem', right: '0.9rem', background: 'rgba(6,10,15,0.6)', color: '#fff', fontSize: '0.6rem', fontWeight: 800, padding: '0.28rem 0.7rem', borderRadius: 100, border: '1px solid rgba(255,255,255,0.25)', backdropFilter: 'blur(6px)' }}>{p.subsidy}</span>
                    )}
                    {/* capacity + location */}
                    <div style={{ position: 'absolute', left: '1.2rem', right: '1.2rem', bottom: '1.1rem' }}>
                      <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 900, fontSize: '2.3rem', lineHeight: 1, color: '#fff', textShadow: '0 2px 18px rgba(0,0,0,0.5)' }}>{p.capacity}</div>
                      <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.9)', fontWeight: 600, marginTop: '0.45rem' }}>📍 {p.location}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          /* ── PM Surya Ghar & C&I: photo gallery + installation team ── */
          <>
            <div style={{ columns: '4 240px', columnGap: '0.85rem' }}>
              {GALLERY[active].map((src, i) => (
                <img key={src} src={src} alt={`${active} installation ${i + 1}`} loading="lazy"
                  style={{ width: '100%', marginBottom: '0.85rem', borderRadius: 12, display: 'block', border: `1px solid ${TYPE_COLOR[active]}22` }} />
              ))}
            </div>

            {/* Installation team photo */}
            <div style={{ marginTop: '3.5rem' }}>
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '0.7rem', color: TYPE_COLOR[active], fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', display: 'block', marginBottom: '0.5rem' }}>Our Team</span>
                <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800 }}>The Team Behind Every Install</h2>
              </div>
              <div style={{ position: 'relative', borderRadius: 18, overflow: 'hidden', border: `1px solid ${TYPE_COLOR[active]}2e`, boxShadow: '0 30px 70px rgba(0,0,0,0.5)' }}>
                <img src="/gallery/team.jpg" alt="Suntrik installation team" loading="lazy" style={{ width: '100%', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,10,15,0.9) 0%, transparent 45%)' }} />
                <div style={{ position: 'absolute', left: '1.5rem', right: '1.5rem', bottom: '1.4rem' }}>
                  <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 900, fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)', color: '#fff' }}>Suntrik Installation Crew</div>
                  <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.85)', fontWeight: 600, marginTop: '0.35rem' }}>13+ NISE-certified technicians · In-house crew, no sub-contractors · Active pan-India</div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '3rem', padding: '2.5rem', background: 'rgba(255,107,26,0.05)', border: '1px solid rgba(255,107,26,0.15)', borderRadius: 16 }}>
          <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.75rem' }}>Have a project in mind?</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem', maxWidth: 420, margin: '0 auto 1.25rem' }}>Get a free feasibility assessment from our NISE-certified engineers within 24 hours.</p>
          <Link to="/#contact" className="btn-primary" style={{ textDecoration: 'none' }}>Get Free Assessment →</Link>
        </div>
      </div>

      <Footer />
      <style>{`
        @media(max-width:900px){ .all-proj-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media(max-width:560px){ .all-proj-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  )
}
