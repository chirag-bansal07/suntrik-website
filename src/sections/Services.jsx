/**
 * Services — EPC Process diagram + service cards
 * Background: solar-panel grid texture
 */

import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import TiltCard from '../components/ui/TiltCard'

// ── 5-Step EPC Process ────────────────────────────────────────────────────
const PROCESS = [
  {
    n: '01', icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="5" fill="url(#pg1)" opacity="0.8"/>
        <path d="M14 3v3M14 22v3M3 14h3M22 14h3M6.2 6.2l2.1 2.1M19.7 19.7l2.1 2.1M6.2 21.8l2.1-2.1M19.7 8.3l2.1-2.1"
          stroke="url(#pg1)" strokeWidth="1.6" strokeLinecap="round"/>
        <defs><linearGradient id="pg1" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF6B1A"/><stop offset="1" stopColor="#FFB830"/>
        </linearGradient></defs>
      </svg>
    ),
    title: 'Site Survey', desc: 'Shadow analysis, irradiation mapping, load study, payback model',
  },
  {
    n: '02', icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="3" width="22" height="22" rx="3" stroke="url(#pg2)" strokeWidth="1.6"/>
        <path d="M8 14h12M14 8v12" stroke="url(#pg2)" strokeWidth="1.6" strokeLinecap="round"/>
        <rect x="8" y="8" width="5" height="5" rx="1" fill="url(#pg2)" opacity="0.4"/>
        <rect x="15" y="15" width="5" height="5" rx="1" fill="url(#pg2)" opacity="0.4"/>
        <defs><linearGradient id="pg2" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF6B1A"/><stop offset="1" stopColor="#FFB830"/>
        </linearGradient></defs>
      </svg>
    ),
    title: 'Engineering', desc: 'PVsyst simulation, AutoCAD SLD, structural design, DPR drafting',
  },
  {
    n: '03', icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="5" y="10" width="18" height="14" rx="2" stroke="url(#pg3)" strokeWidth="1.6"/>
        <path d="M10 10V8a4 4 0 018 0v2" stroke="url(#pg3)" strokeWidth="1.6" strokeLinecap="round"/>
        <circle cx="14" cy="17" r="2.5" fill="url(#pg3)" opacity="0.7"/>
        <defs><linearGradient id="pg3" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF6B1A"/><stop offset="1" stopColor="#FFB830"/>
        </linearGradient></defs>
      </svg>
    ),
    title: 'Procurement', desc: 'MNRE Tier-1 modules, inverters, mounting structure, BOS',
  },
  {
    n: '04', icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M6 22V13l8-8 8 8v9H6z" stroke="url(#pg4)" strokeWidth="1.6" strokeLinejoin="round"/>
        <path d="M11 22v-5h6v5" stroke="url(#pg4)" strokeWidth="1.6" strokeLinejoin="round"/>
        <defs><linearGradient id="pg4" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF6B1A"/><stop offset="1" stopColor="#FFB830"/>
        </linearGradient></defs>
      </svg>
    ),
    title: 'Installation', desc: 'NISE teams, DISCOM liaison, net-metering, commissioning & testing',
  },
  {
    n: '05', icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="9" stroke="url(#pg5)" strokeWidth="1.6"/>
        <path d="M14 9v5l3.5 2.5" stroke="url(#pg5)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 4l3 3M24 4l-3 3" stroke="url(#pg5)" strokeWidth="1.6" strokeLinecap="round"/>
        <defs><linearGradient id="pg5" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF6B1A"/><stop offset="1" stopColor="#FFB830"/>
        </linearGradient></defs>
      </svg>
    ),
    title: 'O&M', desc: '24/7 remote monitoring, AMC, performance analytics, fault response',
  },
]

// ── 6 Service Cards ───────────────────────────────────────────────────────
const SERVICES = [
  {
    id: 1,
    icon: (
      <svg width="26" height="26" viewBox="0 0 34 34" fill="none">
        <circle cx="17" cy="17" r="16" stroke="url(#sg1)" strokeWidth="1.4"/>
        <path d="M17 7v4M17 23v4M7 17h4M23 17h4M10.5 10.5l2.8 2.8M20.7 20.7l2.8 2.8M10.5 23.5l2.8-2.8M20.7 13.3l2.8-2.8"
          stroke="url(#sg1)" strokeWidth="1.4" strokeLinecap="round"/>
        <circle cx="17" cy="17" r="3.5" fill="url(#sg1)" opacity="0.7"/>
        <defs><linearGradient id="sg1" x1="0" y1="0" x2="34" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF6B1A"/><stop offset="1" stopColor="#FFB830"/>
        </linearGradient></defs>
      </svg>
    ),
    title: 'Site Survey & Feasibility',
    desc: 'Detailed solar resource assessment, shadow analysis, load study, and ROI projection before a single rupee is committed.',
    points: ['Shadow & irradiation mapping', 'Load & tariff analysis', 'Detailed payback model'],
  },
  {
    id: 2,
    icon: (
      <svg width="26" height="26" viewBox="0 0 34 34" fill="none">
        <rect x="3" y="3" width="28" height="28" rx="4" stroke="url(#sg2)" strokeWidth="1.4"/>
        <path d="M9 17h16M17 9v16" stroke="url(#sg2)" strokeWidth="1.4" strokeLinecap="round"/>
        <rect x="9" y="9" width="7" height="7" rx="1" fill="url(#sg2)" opacity="0.4"/>
        <rect x="18" y="18" width="7" height="7" rx="1" fill="url(#sg2)" opacity="0.4"/>
        <defs><linearGradient id="sg2" x1="0" y1="0" x2="34" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF6B1A"/><stop offset="1" stopColor="#FFB830"/>
        </linearGradient></defs>
      </svg>
    ),
    title: 'Engineering & Design',
    desc: 'AutoCAD & PVsyst-based system design, single-line diagrams, structure engineering, and complete DPR preparation.',
    points: ['PVsyst energy simulation', 'Structural load calculations', 'Electrical SLD & compliance docs'],
  },
  {
    id: 3,
    icon: (
      <svg width="26" height="26" viewBox="0 0 34 34" fill="none">
        <path d="M5 28l24-4M5 20l24-4M5 12l24-4" stroke="url(#sg3)" strokeWidth="1.4" strokeLinecap="round"/>
        <rect x="13" y="7" width="8" height="6" rx="1" stroke="url(#sg3)" strokeWidth="1.4"/>
        <defs><linearGradient id="sg3" x1="0" y1="0" x2="34" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF6B1A"/><stop offset="1" stopColor="#FFB830"/>
        </linearGradient></defs>
      </svg>
    ),
    title: 'Procurement',
    desc: 'Supply of MNRE-approved, Tier-1 solar modules, inverters, mounting structures, cables, and BOS components.',
    points: ['Tier-1 / MNRE-listed modules', 'String & central inverters', 'Certified mounting structures'],
  },
  {
    id: 4,
    icon: (
      <svg width="26" height="26" viewBox="0 0 34 34" fill="none">
        <path d="M9 27V15l8-8 8 8v12H9z" stroke="url(#sg4)" strokeWidth="1.4" strokeLinejoin="round"/>
        <path d="M14 27v-6h6v6" stroke="url(#sg4)" strokeWidth="1.4" strokeLinejoin="round"/>
        <defs><linearGradient id="sg4" x1="0" y1="0" x2="34" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF6B1A"/><stop offset="1" stopColor="#FFB830"/>
        </linearGradient></defs>
      </svg>
    ),
    title: 'Installation & Commissioning',
    desc: 'Turnkey rooftop and ground-mount installation by NISE-certified engineers, with full safety compliance and DISCOM approvals.',
    points: ['NISE-certified install teams', 'Net-metering & DISCOM liaison', 'Grid sync & commissioning test'],
  },
  {
    id: 5,
    icon: (
      <svg width="26" height="26" viewBox="0 0 34 34" fill="none">
        <circle cx="17" cy="17" r="10" stroke="url(#sg5)" strokeWidth="1.4"/>
        <path d="M17 11v6l4 2.5" stroke="url(#sg5)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 5l4 4M29 5l-4 4" stroke="url(#sg5)" strokeWidth="1.4" strokeLinecap="round"/>
        <defs><linearGradient id="sg5" x1="0" y1="0" x2="34" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF6B1A"/><stop offset="1" stopColor="#FFB830"/>
        </linearGradient></defs>
      </svg>
    ),
    title: 'Operations & Maintenance',
    desc: 'Comprehensive AMC packages — preventive maintenance, remote monitoring, performance analytics, and rapid fault response.',
    points: ['24/7 remote monitoring', 'Preventive & corrective maintenance', 'Performance ratio reporting'],
  },
  {
    id: 6,
    icon: (
      <svg width="26" height="26" viewBox="0 0 34 34" fill="none">
        <rect x="3" y="21" width="6" height="10" rx="1" fill="url(#sg6)" opacity="0.45"/>
        <rect x="12" y="15" width="6" height="16" rx="1" fill="url(#sg6)" opacity="0.7"/>
        <rect x="21" y="9"  width="6" height="22" rx="1" fill="url(#sg6)"/>
        <path d="M5.5 14l9-6 9 6" stroke="url(#sg6)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <defs><linearGradient id="sg6" x1="0" y1="0" x2="34" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF6B1A"/><stop offset="1" stopColor="#FFB830"/>
        </linearGradient></defs>
      </svg>
    ),
    title: 'Solar Advisory & DPR',
    desc: 'Independent consultancy for developers, industries, and institutions — scheme navigation, DPR drafting, and subsidy maximisation.',
    points: ['PM Surya Ghar & PM-KUSUM advisory', 'DPR drafting for banks / MNRE', 'Subsidy & incentive mapping'],
  },
]

// ── Arrow connector (between process steps) ───────────────────────────────
function Arrow() {
  return (
    <div style={{
      flexShrink: 0, display: 'flex', alignItems: 'center',
      padding: '0 0.25rem', color: 'rgba(255,107,26,0.4)',
    }}>
      <svg width="24" height="16" viewBox="0 0 24 16" fill="none">
        <path d="M0 8h20M14 2l8 6-8 6" stroke="url(#arw)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <defs><linearGradient id="arw" x1="0" y1="0" x2="24" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF6B1A" stopOpacity="0.3"/><stop offset="1" stopColor="#FFB830" stopOpacity="0.7"/>
        </linearGradient></defs>
      </svg>
    </div>
  )
}

export default function Services() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  const { ref: headRef,    inView: headIn    } = useScrollAnimation(0.08)
  const { ref: processRef, inView: processIn } = useScrollAnimation(0.1)
  const { ref: cardsRef,   inView: cardsIn   } = useScrollAnimation(0.06)

  return (
    <section
      id="services"
      ref={sectionRef}
      style={{
        position: 'relative', overflow: 'hidden',
        background: '#070B12',
        padding: 'clamp(2rem, 3vh, 3rem) 0',
        minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center',
      }}
    >
      {/* ── Solar-panel grid background ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(255,107,26,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,107,26,0.04) 1px, transparent 1px),
          linear-gradient(rgba(255,107,26,0.015) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,107,26,0.015) 1px, transparent 1px)
        `,
        backgroundSize: '72px 72px, 72px 72px, 18px 18px, 18px 18px',
      }} />

      {/* Parallax glow */}
      <motion.div style={{ y: bgY, position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: '5%', left: '50%', transform: 'translateX(-50%)',
          width: 800, height: 400,
          background: 'radial-gradient(ellipse at center, rgba(255,107,26,0.07) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }} />
      </motion.div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Header ── */}
        <div ref={headRef} style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <motion.span
            className="section-tag" style={{ justifyContent: 'center' }}
            initial={{ opacity: 0, y: 20 }} animate={headIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
          >Our Services</motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 28 }} animate={headIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.1 }}
            style={{ fontSize: 'clamp(1.5rem, 3.2vw, 2.2rem)', marginBottom: '0.6rem' }}
          >
            End-to-End <span className="gradient-text">Solar EPC</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }} animate={headIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
            style={{ color: 'var(--text-secondary)', maxWidth: 560, margin: '0 auto', lineHeight: 1.8 }}
          >
            From the first site visit to lifetime O&amp;M — Suntrik manages every phase of your solar
            project under one roof, so you never have to coordinate multiple vendors.
          </motion.p>
        </div>

        {/* ── EPC Process Flow ── */}
        <div ref={processRef} style={{ marginBottom: '2rem' }}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={processIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{
              textAlign: 'center', fontSize: '0.72rem', color: 'var(--text-muted)',
              textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 600,
              marginBottom: '2rem',
            }}
          >The Suntrik EPC Journey</motion.p>

          {/* Process steps row */}
          <div style={{
            display: 'flex', alignItems: 'stretch',
            gap: 0, flexWrap: 'wrap', justifyContent: 'center',
          }} className="process-row">
            {PROCESS.map((step, i) => (
              <>
                <motion.div
                  key={step.n}
                  initial={{ opacity: 0, y: 32 }}
                  animate={processIn ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    flex: '1 1 150px', maxWidth: 200,
                    padding: '1.6rem 1.25rem',
                    borderRadius: 12,
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,107,26,0.12)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    textAlign: 'center', gap: '0.6rem',
                    cursor: 'default', transition: 'background 0.25s, border-color 0.25s',
                    position: 'relative',
                  }}
                  whileHover={{ y: -4 }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(255,107,26,0.07)'
                    e.currentTarget.style.borderColor = 'rgba(255,107,26,0.35)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                    e.currentTarget.style.borderColor = 'rgba(255,107,26,0.12)'
                  }}
                >
                  {/* Step number */}
                  <span style={{
                    fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.18em',
                    color: 'var(--brand-orange)', fontFamily: 'Space Grotesk, sans-serif',
                  }}>{step.n}</span>
                  {/* Icon */}
                  <div style={{ marginBottom: '0.25rem' }}>{step.icon}</div>
                  {/* Title */}
                  <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '0.95rem' }}>
                    {step.title}
                  </div>
                  {/* Desc */}
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    {step.desc}
                  </div>
                  {/* Bottom glow bar */}
                  <div style={{
                    position: 'absolute', bottom: 0, left: '20%', right: '20%', height: 2,
                    background: 'var(--gradient-sun)', borderRadius: '2px 2px 0 0', opacity: 0.6,
                  }} />
                </motion.div>
                {i < PROCESS.length - 1 && <Arrow key={`a-${i}`} />}
              </>
            ))}
          </div>
        </div>

        {/* ── Divider ── */}
        <div style={{
          width: '100%', height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(255,107,26,0.2), transparent)',
          marginBottom: '1.5rem',
        }} />

        {/* ── Service cards (compact) ── */}
        <div ref={cardsRef}>
          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            animate={cardsIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{
              textAlign: 'center', fontSize: '0.66rem', color: 'var(--text-muted)',
              textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 600,
              marginBottom: '1rem',
            }}
          >What We Deliver</motion.h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '0.85rem',
          }}>
            {SERVICES.map((svc, i) => (
              <TiltCard key={svc.id} max={7} style={{ borderRadius: 12 }}>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={cardsIn ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="glass-card"
                style={{ padding: '1rem 1.1rem', position: 'relative', overflow: 'hidden', cursor: 'default', display: 'flex', gap: '0.85rem', alignItems: 'flex-start', height: '100%', borderRadius: 12 }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,107,26,0.3)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
              >
                <div style={{ flexShrink: 0, marginTop: 2 }}>{svc.icon}</div>
                <div>
                  <h3 style={{
                    fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700,
                    fontSize: '0.88rem', marginBottom: '0.3rem',
                  }}>{svc.title}</h3>
                  <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {svc.desc}
                  </p>
                </div>
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
                  background: 'var(--gradient-sun)', opacity: 0.5,
                }} />
              </motion.div>
              </TiltCard>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={cardsIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{ textAlign: 'center', marginTop: '1.5rem' }}
          >
            <Link to="/#contact" className="btn-primary">Request a Free Site Assessment →</Link>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media(max-width:700px){
          .process-row > div { flex: 1 1 140px !important; }
        }
        @media(max-width:520px){
          .process-row svg[width="24"] { display:none; }
        }
      `}</style>
    </section>
  )
}
