/**
 * Stats — Accomplishments section
 * Dark background with grain overlay, dramatic animated counters,
 * glowing radial highlights, and a "live" capacity ring visual.
 */

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const STATS = [
  {
    value: 8,    suffix: '+',    label: 'Years of Experience',  sub: 'Solar EPC since 2018',            icon: '📅',
    progress: 0.42,
  },
  {
    value: 1000, suffix: '+',    label: 'Happy Clients',        sub: 'Homes, farms & industries served', icon: '⚡',
    progress: 1.0,
  },
  {
    value: 150,  suffix: ' MW+', label: 'Capacity Installed',   sub: 'Cumulative across India',           icon: '☀️',
    progress: 0.88,
  },
  {
    value: 5,    suffix: ' Yr',  label: 'AMC Coverage',         sub: '2 Yr C&I · 5 Yr Residential',     icon: '🔧',
    progress: 0.6,
  },
]

// ── CountUp hook ─────────────────────────────────────────────────────────
function CountUp({ value, suffix, inView }) {
  const ref    = useRef(null)
  const hasRun = useRef(false)

  useEffect(() => {
    if (!inView || hasRun.current || !ref.current) return
    hasRun.current = true

    const duration = 2400
    const start    = performance.now()

    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1)
      const e = 1 - Math.pow(1 - t, 4)  // ease-out quartic
      if (ref.current) ref.current.textContent = Math.round(e * value) + suffix
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, value, suffix])

  return <span ref={ref}>0{suffix}</span>
}

// ── Animated radial progress ring ─────────────────────────────────────────
function Ring({ progress, inView, color = 'url(#rg)' }) {
  const r = 34
  const circ = 2 * Math.PI * r
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" style={{ position: 'absolute', inset: 0 }}>
      <defs>
        <linearGradient id="rg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B1A"/>
          <stop offset="100%" stopColor="#FFB830"/>
        </linearGradient>
      </defs>
      {/* Track */}
      <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(255,107,26,0.1)" strokeWidth="3.5"/>
      {/* Progress */}
      <motion.circle
        cx="40" cy="40" r={r} fill="none"
        stroke={color} strokeWidth="3.5"
        strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={inView ? { strokeDashoffset: circ * (1 - progress) } : { strokeDashoffset: circ }}
        transition={{ duration: 2, ease: 'easeOut', delay: 0.3 }}
        style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
      />
    </svg>
  )
}

export default function Stats() {
  const { ref, inView } = useScrollAnimation(0.12)

  return (
    <section style={{
      position: 'relative', overflow: 'hidden',
      background: '#030609',
      padding: 'clamp(2rem, 3vh, 3rem) 0',
      minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center',
    }}>
      {/* Grain texture overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.35,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E")`,
        backgroundSize: '200px 200px',
      }} />

      {/* Radial glows */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          width: 900, height: 400,
          background: 'radial-gradient(ellipse at center, rgba(255,107,26,0.12) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }} />
      </div>

      {/* Large watermark text */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
      }}>
        <div style={{
          fontFamily: 'Space Grotesk, sans-serif', fontWeight: 900,
          fontSize: 'clamp(8rem, 20vw, 18rem)', lineHeight: 1,
          color: 'rgba(255,107,26,0.025)', userSelect: 'none', whiteSpace: 'nowrap',
          letterSpacing: '-0.05em',
        }}>IMPACT</div>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '1.75rem' }}
        >
          <span className="section-tag" style={{ justifyContent: 'center' }}>Our Accomplishments</span>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3.2vw, 2.2rem)', marginBottom: '0.5rem' }}>
            8+ Years of Solar <span className="gradient-text">Impact</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 480, margin: '0 auto', lineHeight: 1.8 }}>
            Numbers that reflect real projects delivered, real subsidies navigated, and real energy savings created for India.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div
          ref={ref}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '0',
          }}
        >
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.13, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                textAlign: 'center', padding: '1.25rem 1.5rem',
                borderRight: i < STATS.length - 1 ? '1px solid rgba(255,107,26,0.08)' : 'none',
                position: 'relative',
              }}
              className="stat-cell"
            >
              {/* Ring */}
              <div style={{ position: 'relative', width: 80, height: 80, marginBottom: '0.75rem' }}>
                <Ring progress={s.progress} inView={inView} />
                {/* Icon in centre */}
                <div style={{
                  position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.6rem',
                }}>{s.icon}</div>
              </div>

              {/* Number */}
              <div style={{
                fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900,
                fontFamily: 'Space Grotesk, sans-serif',
                background: 'var(--gradient-sun)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                lineHeight: 1, marginBottom: '0.5rem',
              }}>
                <CountUp value={s.value} suffix={s.suffix} inView={inView} />
              </div>

              <div style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.3rem' }}>{s.label}</div>
              <div style={{ fontSize: '0.77rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{s.sub}</div>

              {/* Glow spot */}
              <div style={{
                position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
                width: 60, height: 2, borderRadius: 1,
                background: 'var(--gradient-sun)', opacity: 0.5,
              }} />
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.5 }}
          style={{
            marginTop: '1.75rem', padding: '1.25rem 2rem', borderRadius: 14,
            background: 'linear-gradient(90deg, rgba(255,107,26,0.08), rgba(255,184,48,0.05))',
            border: '1px solid rgba(255,107,26,0.15)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            gap: '2rem', flexWrap: 'wrap',
          }}
        >
          <div>
            <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.3rem' }}>
              Every number here is a real project, a real family, a real farm.
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              No estimates. 150 MW+ across 1,000+ clients — residential clusters, industrial plants, and 85 MWp+ of PM-KUSUM across Rajasthan &amp; Haryana.
            </div>
          </div>
          <a href="#projects" className="btn-primary" style={{ flexShrink: 0 }}>
            See Our Projects →
          </a>
        </motion.div>
      </div>

      <style>{`
        @media(max-width:640px){
          .stat-cell { border-right:none !important; border-bottom:1px solid rgba(255,107,26,0.08); }
          .stat-cell:last-child { border-bottom:none; }
        }
      `}</style>
    </section>
  )
}
