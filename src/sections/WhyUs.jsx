/**
 * WhyUs — The Suntrik Difference
 * Alternating feature rows + animated grid background
 */

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const FEATURES = [
  {
    num: '01',
    title: 'Single EPC Responsibility',
    desc: "Design, procurement, construction, and O&M — all under one contract. You deal with one team, one SLA, and one point of accountability for the full project lifetime. No vendor finger-pointing, no co-ordination overhead.",
    icon: (
      <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
        <path d="M24 8l14 8v16l-14 8L10 32V16L24 8z" stroke="url(#wg1)" strokeWidth="1.6" strokeLinejoin="round"/>
        <path d="M24 8v24M10 16l14 8M38 16l-14 8" stroke="url(#wg1)" strokeWidth="1.2" strokeLinecap="round"/>
        <circle cx="24" cy="32" r="3" fill="url(#wg1)"/>
        <defs><linearGradient id="wg1" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF6B1A"/><stop offset="1" stopColor="#FFB830"/>
        </linearGradient></defs>
      </svg>
    ),
    stat: '1 Contract',
    statSub: 'covers the full lifecycle',
    bullets: ['End-to-end project ownership', 'Single SLA, single point of contact', 'Co-ordination risk eliminated'],
  },
  {
    num: '02',
    title: 'NISE-Certified Engineering Team',
    desc: "Every installation is led by professionals certified by the National Institute of Solar Energy — the standard required for all MNRE-subsidised projects. Our engineers bring PVsyst simulation expertise and AutoCAD system design to every project.",
    icon: (
      <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
        <rect x="8" y="12" width="32" height="24" rx="4" stroke="url(#wg2)" strokeWidth="1.6"/>
        <path d="M18 22l4 4 8-8" stroke="url(#wg2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="24" cy="24" r="10" stroke="url(#wg2)" strokeWidth="1.2" strokeDasharray="3 2"/>
        <defs><linearGradient id="wg2" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF6B1A"/><stop offset="1" stopColor="#FFB830"/>
        </linearGradient></defs>
      </svg>
    ),
    stat: 'NISE Certified',
    statSub: 'mandatory for MNRE projects',
    bullets: ['NISE-certified installation leads', 'PVsyst & AutoCAD design team', 'MNRE-empanelled organisation'],
  },
  {
    num: '03',
    title: 'DISCOM & Net-Metering Mastery',
    desc: "We handle all paperwork, portal submissions, and co-ordination with your DISCOM for net-metering and grid interconnection. Our team knows the exact DHBVN / DHEVCL requirements and has a 100% approval rate across all submitted applications.",
    icon: (
      <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
        <path d="M8 24h32" stroke="url(#wg3)" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="4 3"/>
        <circle cx="16" cy="24" r="5" stroke="url(#wg3)" strokeWidth="1.6"/>
        <circle cx="32" cy="24" r="5" stroke="url(#wg3)" strokeWidth="1.6"/>
        <path d="M16 10v5M32 10v5M16 33v5M32 33v5" stroke="url(#wg3)" strokeWidth="1.4" strokeLinecap="round"/>
        <defs><linearGradient id="wg3" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF6B1A"/><stop offset="1" stopColor="#FFB830"/>
        </linearGradient></defs>
      </svg>
    ),
    stat: '100%',
    statSub: 'net-metering approvals',
    bullets: ['DHBVN / DHEVCL net-metering expertise', 'Portal submission to approval managed', 'Grid-sync testing & commissioning'],
  },
  {
    num: '04',
    title: 'PM Surya Ghar & PM-KUSUM Navigation',
    desc: "Our team is deeply versed in PM Surya Ghar Muft Bijli Yojana (residential subsidy) and PM-KUSUM (agricultural & rural solar). We handle registration, inspection, and disbursement — so clients receive maximum government benefit without the paperwork burden.",
    icon: (
      <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
        <path d="M24 6l4 12h12l-10 7 4 12-10-7-10 7 4-12L8 18h12L24 6z" stroke="url(#wg4)" strokeWidth="1.6" strokeLinejoin="round" fill="url(#wg4)" fillOpacity="0.1"/>
        <defs><linearGradient id="wg4" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF6B1A"/><stop offset="1" stopColor="#FFB830"/>
        </linearGradient></defs>
      </svg>
    ),
    stat: '90% Subsidy',
    statSub: 'for PM-KUSUM eligible farmers',
    bullets: ['PM-KUSUM empanelled installer', 'PM Surya Ghar portal to disbursement', 'State scheme maximisation advisory'],
  },
  {
    num: '05',
    title: '25-Year Performance Assurance',
    desc: "We only procure Tier-1 MNRE-listed modules with 25-year linear power output warranty. Combined with our engineering discipline and bankable DPR standards, your investment is protected for the full asset life of the plant.",
    icon: (
      <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
        <path d="M24 6C14 6 8 14 8 22c0 11 16 20 16 20s16-9 16-20c0-8-6-16-16-16z" stroke="url(#wg5)" strokeWidth="1.6" fill="url(#wg5)" fillOpacity="0.1"/>
        <path d="M18 22l4 4 8-8" stroke="url(#wg5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <defs><linearGradient id="wg5" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF6B1A"/><stop offset="1" stopColor="#FFB830"/>
        </linearGradient></defs>
      </svg>
    ),
    stat: '25 Years',
    statSub: 'module output warranty',
    bullets: ['MNRE Tier-1 modules only', 'Bankable DPR standards', 'Performance guarantee commitment'],
  },
  {
    num: '06',
    title: '24/7 Remote Monitoring & O&M',
    desc: "Real-time performance dashboards and alert systems ensure our O&M team tracks every plant we build. Preventive maintenance schedules, remote fault detection, and rapid on-site response keeps your plant generating at peak yield.",
    icon: (
      <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="20" r="10" stroke="url(#wg6)" strokeWidth="1.6"/>
        <path d="M24 10v10l6 4" stroke="url(#wg6)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 38c0-6 7-10 16-10s16 4 16 10" stroke="url(#wg6)" strokeWidth="1.6" strokeLinecap="round"/>
        <circle cx="24" cy="20" r="2.5" fill="url(#wg6)"/>
        <defs><linearGradient id="wg6" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF6B1A"/><stop offset="1" stopColor="#FFB830"/>
        </linearGradient></defs>
      </svg>
    ),
    stat: '24/7',
    statSub: 'remote plant monitoring',
    bullets: ['Real-time performance dashboard', 'Preventive & corrective maintenance', 'Performance ratio reporting'],
  },
]

export default function WhyUs() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  const { ref: headRef, inView: headIn } = useScrollAnimation(0.08)
  const { ref: gridRef, inView: gridIn  } = useScrollAnimation(0.05)

  return (
    <section
      id="why-us"
      ref={sectionRef}
      style={{
        position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(175deg, #0A1020 0%, #111827 50%, #0A1020 100%)',
        padding: 'clamp(2rem, 3vh, 3rem) 0',
        minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center',
      }}
    >
      {/* Animated background grid */}
      <motion.div style={{ y: bgY, position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        {/* Grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,107,26,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,107,26,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }} />
        {/* Ellipse glow */}
        <div style={{
          position: 'absolute', top: '30%', right: '10%',
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,107,26,0.07) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }} />
      </motion.div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div ref={headRef} style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <motion.span
            className="section-tag" style={{ justifyContent: 'center' }}
            initial={{ opacity: 0, y: 20 }} animate={headIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
          >Why Suntrik</motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 28 }} animate={headIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.1 }}
            style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.5rem)', marginBottom: '0.55rem' }}
          >
            The Suntrik <span className="gradient-text">Difference</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }} animate={headIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
            style={{ color: 'var(--text-secondary)', maxWidth: 500, margin: '0 auto', lineHeight: 1.7, fontSize: '0.875rem' }}
          >
            We don't just install solar panels — we take full ownership of your plant's performance
            for its entire 25-year operating life.
          </motion.p>
        </div>

        {/* Feature grid — 3 cols × 2 rows */}
        <div
          ref={gridRef}
          className="whyus-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
          }}
        >
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.num}
              initial={{ opacity: 0, y: 36 }}
              animate={gridIn ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              style={{
                padding: '1.25rem 1.35rem', borderRadius: 13,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                position: 'relative', overflow: 'hidden',
                cursor: 'default', transition: 'border-color 0.25s, background 0.25s',
                display: 'flex', gap: '1rem', alignItems: 'flex-start',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(255,107,26,0.28)'
                e.currentTarget.style.background  = 'rgba(255,107,26,0.04)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                e.currentTarget.style.background  = 'rgba(255,255,255,0.03)'
              }}
            >
              {/* Left: icon + stat */}
              <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem', minWidth: 65 }}>
                <div>{f.icon}</div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontFamily: 'Space Grotesk, sans-serif', fontWeight: 900, fontSize: '1.05rem',
                    background: 'var(--gradient-sun)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    lineHeight: 1, marginBottom: 2,
                  }}>{f.stat}</div>
                  <div style={{ fontSize: '0.59rem', color: 'var(--text-muted)', lineHeight: 1.3, maxWidth: 62 }}>{f.statSub}</div>
                </div>
              </div>

              {/* Right: title + desc + bullets */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '0.88rem', marginBottom: '0.4rem', lineHeight: 1.25 }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: '0.73rem', color: 'var(--text-secondary)', lineHeight: 1.62, marginBottom: '0.55rem' }}>
                  {f.desc}
                </p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.26rem' }}>
                  {f.bullets.map(b => (
                    <li key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem', fontSize: '0.7rem', color: 'var(--text-muted)', lineHeight: 1.38 }}>
                      <span style={{ color: 'var(--brand-orange)', flexShrink: 0 }}>▸</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hover bottom bar */}
              <motion.div
                initial={{ scaleX: 0 }} whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
                  background: 'var(--gradient-sun)', transformOrigin: 'left',
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={gridIn ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
          style={{ textAlign: 'center', marginTop: '1.75rem' }}
        >
          <a href="#contact" className="btn-primary">Get Your Free Assessment →</a>
        </motion.div>
      </div>
      <style>{`
        @media(max-width:900px){
          .whyus-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media(max-width:560px){
          .whyus-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
