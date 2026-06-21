/**
 * Projects — Homepage showcase
 * Featured card + grid preview → "View All Projects" CTA
 */
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { PROJECTS, TYPE_COLOR, TYPE_ICON } from '../data/projects'
import TiltCard from '../components/ui/TiltCard'
import CountUp  from '../components/ui/CountUp'

const FEATURED = PROJECTS[0]
const SIDE     = [PROJECTS[3], PROJECTS[1]]

export default function Projects() {
  const { ref: headRef, inView: headIn } = useScrollAnimation(0.08)
  const { ref: gridRef, inView: gridIn } = useScrollAnimation(0.05)

  return (
    <section
      id="projects"
      style={{
        position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(175deg, #060A0F 0%, #0A1020 50%, #060A0F 100%)',
        padding: 'clamp(2rem, 3vh, 3rem) 0',
        minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '20%', right: '8%', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,26,0.06) 0%, transparent 65%)', filter: 'blur(70px)' }} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div ref={headRef} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.25rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <motion.span className="section-tag" initial={{ opacity: 0, y: 20 }} animate={headIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>Our Work</motion.span>
            <motion.h2 initial={{ opacity: 0, y: 28 }} animate={headIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.1 }} style={{ fontSize: 'clamp(1.8rem, 3.6vw, 2.6rem)' }}>
              Proven Across <span className="gradient-text">India</span>
            </motion.h2>
          </div>
          <motion.p initial={{ opacity: 0 }} animate={headIn ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
            style={{ color: 'var(--text-secondary)', maxWidth: 380, lineHeight: 1.75, textAlign: 'right', fontSize: '0.95rem' }} className="proj-subhead">
            From farmer solar pumps to industrial rooftops — delivered on time, every time.
          </motion.p>
        </div>

        <div ref={gridRef}>
          {/* Top row: large featured + 2 stacked */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }} className="proj-top-row">

            {/* Featured */}
            <TiltCard style={{ borderRadius: 16 }} max={6}>
            <motion.div
              initial={{ opacity: 0, y: 32 }} animate={gridIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ borderRadius: 16, overflow: 'hidden', border: `1px solid ${TYPE_COLOR[FEATURED.type]}33`, background: `linear-gradient(140deg, ${TYPE_COLOR[FEATURED.type]}15 0%, rgba(6,10,15,0.98) 65%)`, position: 'relative', cursor: 'pointer', minHeight: 440, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = `${TYPE_COLOR[FEATURED.type]}55`}
              onMouseLeave={e => e.currentTarget.style.borderColor = `${TYPE_COLOR[FEATURED.type]}33`}
            >
              <div style={{ height: 3, background: `linear-gradient(90deg, ${TYPE_COLOR[FEATURED.type]}, transparent)` }} />
              <div style={{ padding: '2.5rem 2.75rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.4rem', flexWrap: 'wrap' }}>
                  <span style={{ background: TYPE_COLOR[FEATURED.type], color: '#fff', fontSize: '0.72rem', fontWeight: 800, padding: '0.28rem 0.85rem', borderRadius: 100 }}>{TYPE_ICON[FEATURED.type]} {FEATURED.type}</span>
                  <span style={{ background: 'rgba(255,184,48,0.15)', color: 'var(--brand-amber)', fontSize: '0.72rem', fontWeight: 700, padding: '0.28rem 0.85rem', borderRadius: 100, border: '1px solid rgba(255,184,48,0.25)' }}>{FEATURED.capacity}</span>
                  {FEATURED.subsidy && <span style={{ background: 'rgba(16,185,129,0.15)', color: '#10B981', fontSize: '0.72rem', fontWeight: 700, padding: '0.28rem 0.85rem', borderRadius: 100, border: '1px solid rgba(16,185,129,0.25)' }}>{FEATURED.subsidy} Subsidy</span>}
                </div>
                <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(1.5rem, 2.6vw, 2rem)', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.2 }}>{FEATURED.title}</h3>
                <p style={{ fontSize: '0.88rem', color: TYPE_COLOR[FEATURED.type], fontWeight: 600, marginBottom: '1.1rem' }}>📍 {FEATURED.location} · {FEATURED.year}</p>
                <p style={{ fontSize: '0.98rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.6rem', maxWidth: 580 }}>{FEATURED.desc}</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.7rem' }}>
                  {FEATURED.highlights.map(h => (
                    <div key={h} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.86rem', color: 'var(--text-muted)' }}>
                      <span style={{ color: TYPE_COLOR[FEATURED.type], flexShrink: 0 }}>▸</span>{h}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ position: 'absolute', bottom: '1.25rem', right: '1.75rem', fontSize: '7.5rem', opacity: 0.06, lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>{TYPE_ICON[FEATURED.type]}</div>
            </motion.div>
            </TiltCard>

            {/* Side stack */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {SIDE.map((p, i) => (
                <motion.div key={p.id}
                  initial={{ opacity: 0, x: 30 }} animate={gridIn ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.55, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -3 }}
                  style={{ flex: 1, borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.03)', cursor: 'pointer', display: 'flex', transition: 'border-color 0.25s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = `${TYPE_COLOR[p.type]}44`}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
                >
                  <div style={{ width: 4, flexShrink: 0, background: TYPE_COLOR[p.type] }} />
                  <div style={{ width: 72, flexShrink: 0, background: `linear-gradient(145deg, ${TYPE_COLOR[p.type]}18 0%, transparent 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem' }}>{TYPE_ICON[p.type]}</div>
                  <div style={{ flex: 1, padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 0 }}>
                    <div style={{ display: 'flex', gap: '0.35rem', marginBottom: '0.3rem', flexWrap: 'wrap', alignItems: 'center' }}>
                      <span style={{ background: TYPE_COLOR[p.type], color: '#fff', fontSize: '0.55rem', fontWeight: 800, padding: '0.12rem 0.5rem', borderRadius: 100 }}>{p.type}</span>
                      <span style={{ color: 'var(--brand-amber)', fontSize: '0.6rem', fontWeight: 700 }}>{p.capacity}</span>
                    </div>
                    <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.18rem', lineHeight: 1.25, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.title}</h3>
                    <p style={{ fontSize: '0.66rem', color: TYPE_COLOR[p.type], fontWeight: 600, marginBottom: '0.38rem' }}>📍 {p.location} · {p.year}</p>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.16rem' }}>
                      {p.highlights.slice(0, 2).map(h => (
                        <li key={h} style={{ display: 'flex', gap: '0.3rem', fontSize: '0.64rem', color: 'var(--text-muted)', lineHeight: 1.3 }}>
                          <span style={{ color: TYPE_COLOR[p.type], flexShrink: 0 }}>▸</span>{h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>


          {/* Stats + CTA */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={gridIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.5 }} style={{ textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '2.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '1.1rem 2.5rem', marginBottom: '1.25rem' }} className="proj-stats-bar">
              {[{ to: 1000, suffix: '+', l: 'Projects' }, { to: 4, suffix: '', l: 'Sectors' }, { to: 150, suffix: 'MW+', l: 'Capacity' }, { to: 100, suffix: '%', l: 'On-Time' }].map(s => (
                <div key={s.l} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 900, fontSize: '1.3rem', background: 'var(--gradient-sun)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1 }}><CountUp to={s.to} suffix={s.suffix} /></div>
                  <div style={{ fontSize: '0.63rem', color: 'var(--text-muted)', marginTop: 3, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.l}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/projects" className="btn-primary" style={{ textDecoration: 'none' }}>View All Projects →</Link>
              <a href="#contact" className="btn-outline">Discuss Your Project</a>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media(max-width:900px){ .proj-top-row { grid-template-columns:1fr !important; } }
        @media(max-width:700px){ .proj-bottom-row { grid-template-columns:1fr !important; } }
        @media(max-width:560px){ .proj-subhead{text-align:left!important} .proj-stats-bar{flex-wrap:wrap;gap:1rem!important;padding:1rem 1.5rem!important} }
      `}</style>
    </section>
  )
}
