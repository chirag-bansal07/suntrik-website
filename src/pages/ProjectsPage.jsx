import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { PROJECTS, TYPE_COLOR, TYPE_ICON } from '../data/projects'

const FILTERS = ['All', 'PM-KUSUM', 'PM Surya Ghar', 'Commercial', 'Industrial']

export default function ProjectsPage() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? PROJECTS : PROJECTS.filter(p => p.type === active)

  useEffect(() => { window.scrollTo(0, 0) }, [])

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
            Every installation Suntrik has delivered — from PM-KUSUM farmer clusters to large industrial rooftops across Haryana and North India.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
            {[{ v: `${PROJECTS.length}+`, l: 'Projects' }, { v: '4', l: 'Sectors' }, { v: '150MW+', l: 'Capacity' }, { v: '100%', l: 'On-Time' }].map(s => (
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
                {f === 'All' ? PROJECTS.length : PROJECTS.filter(p => p.type === f).length}
              </span>
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }} className="all-proj-grid">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div key={p.id} layout
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -5 }}
                style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.03)', cursor: 'pointer', display: 'flex', flexDirection: 'column', transition: 'border-color 0.25s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = `${TYPE_COLOR[p.type]}44`}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
              >
                {/* Top accent */}
                <div style={{ height: 3, background: `linear-gradient(90deg, ${TYPE_COLOR[p.type]}, transparent)`, flexShrink: 0 }} />
                {/* Icon header */}
                <div style={{ height: 100, background: `linear-gradient(135deg, ${TYPE_COLOR[p.type]}20 0%, #060A0F 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', position: 'relative', flexShrink: 0 }}>
                  {TYPE_ICON[p.type]}
                  {p.subsidy && (
                    <div style={{ position: 'absolute', top: '0.6rem', right: '0.6rem', background: 'rgba(16,185,129,0.15)', color: '#10B981', fontSize: '0.6rem', fontWeight: 800, padding: '0.2rem 0.6rem', borderRadius: 100, border: '1px solid rgba(16,185,129,0.3)' }}>
                      {p.subsidy} Subsidy
                    </div>
                  )}
                </div>
                {/* Info */}
                <div style={{ padding: '1.1rem 1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.6rem', flexWrap: 'wrap' }}>
                    <span style={{ background: TYPE_COLOR[p.type], color: '#fff', fontSize: '0.6rem', fontWeight: 800, padding: '0.15rem 0.6rem', borderRadius: 100 }}>{p.type}</span>
                    <span style={{ background: 'rgba(255,184,48,0.1)', color: 'var(--brand-amber)', fontSize: '0.6rem', fontWeight: 700, padding: '0.15rem 0.6rem', borderRadius: 100, border: '1px solid rgba(255,184,48,0.2)' }}>{p.capacity}</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.6rem', marginLeft: 'auto', alignSelf: 'center' }}>{p.year}</span>
                  </div>
                  <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.25rem', lineHeight: 1.3 }}>{p.title}</h3>
                  <p style={{ fontSize: '0.7rem', color: TYPE_COLOR[p.type], fontWeight: 600, marginBottom: '0.7rem' }}>📍 {p.location}</p>
                  <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '0.85rem', flex: 1 }}>{p.desc}</p>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.28rem' }}>
                    {p.highlights.map(h => (
                      <li key={h} style={{ display: 'flex', gap: '0.4rem', fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.35 }}>
                        <span style={{ color: TYPE_COLOR[p.type], flexShrink: 0 }}>▸</span>{h}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

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
