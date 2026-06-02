import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const services = [
  {
    id: 1,
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="17" stroke="url(#g1)" strokeWidth="1.5"/>
        <path d="M18 8v4M18 24v4M8 18h4M24 18h4M11.3 11.3l2.8 2.8M21.9 21.9l2.8 2.8M11.3 24.7l2.8-2.8M21.9 14.1l2.8-2.8" stroke="url(#g1)" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="18" cy="18" r="4" fill="url(#g1)" opacity="0.7"/>
        <defs><linearGradient id="g1" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse"><stop stopColor="#FF6B1A"/><stop offset="1" stopColor="#FFB830"/></linearGradient></defs>
      </svg>
    ),
    title: 'Site Survey & Feasibility',
    shortTitle: '01 · Survey',
    desc: 'Detailed solar resource assessment, shadow analysis, load study, and ROI projection before a single rupee is committed.',
    points: ['Shadow & irradiation mapping', 'Load and tariff analysis', 'Detailed financial model & payback'],
  },
  {
    id: 2,
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="4" y="4" width="28" height="28" rx="4" stroke="url(#g2)" strokeWidth="1.5"/>
        <path d="M10 18h16M18 10v16" stroke="url(#g2)" strokeWidth="1.5" strokeLinecap="round"/>
        <rect x="10" y="10" width="7" height="7" rx="1" fill="url(#g2)" opacity="0.4"/>
        <rect x="19" y="19" width="7" height="7" rx="1" fill="url(#g2)" opacity="0.4"/>
        <defs><linearGradient id="g2" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse"><stop stopColor="#FF6B1A"/><stop offset="1" stopColor="#FFB830"/></linearGradient></defs>
      </svg>
    ),
    title: 'Engineering & Design',
    shortTitle: '02 · Engineering',
    desc: 'AutoCAD & PVsyst-based system design, single-line diagrams, structure engineering, and complete DPR preparation.',
    points: ['PVsyst energy simulation', 'Structural load calculations', 'Electrical SLD & compliance docs'],
  },
  {
    id: 3,
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M6 28l24-4M6 20l24-4M6 12l24-4" stroke="url(#g3)" strokeWidth="1.5" strokeLinecap="round"/>
        <rect x="14" y="8" width="8" height="6" rx="1" stroke="url(#g3)" strokeWidth="1.5"/>
        <defs><linearGradient id="g3" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse"><stop stopColor="#FF6B1A"/><stop offset="1" stopColor="#FFB830"/></linearGradient></defs>
      </svg>
    ),
    title: 'Procurement',
    shortTitle: '03 · Procurement',
    desc: 'Supply of MNRE-approved, Tier-1 solar modules, inverters, mounting structures, cables, and BOS components.',
    points: ['Tier-1 / MNRE-listed modules', 'String & central inverters', 'Certified mounting structures'],
  },
  {
    id: 4,
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M10 26V16l8-8 8 8v10H10z" stroke="url(#g4)" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M15 26v-6h6v6" stroke="url(#g4)" strokeWidth="1.5" strokeLinejoin="round"/>
        <defs><linearGradient id="g4" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse"><stop stopColor="#FF6B1A"/><stop offset="1" stopColor="#FFB830"/></linearGradient></defs>
      </svg>
    ),
    title: 'Installation & Commissioning',
    shortTitle: '04 · Installation',
    desc: 'Turnkey rooftop and ground-mount installation by NISE-certified engineers, with full safety compliance and DISCOM approvals.',
    points: ['NISE-certified install teams', 'Net-metering & DISCOM liaison', 'Grid synchronisation & testing'],
  },
  {
    id: 5,
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="11" stroke="url(#g5)" strokeWidth="1.5"/>
        <path d="M18 12v6l4 3" stroke="url(#g5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 6l4 4M30 6l-4 4" stroke="url(#g5)" strokeWidth="1.5" strokeLinecap="round"/>
        <defs><linearGradient id="g5" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse"><stop stopColor="#FF6B1A"/><stop offset="1" stopColor="#FFB830"/></linearGradient></defs>
      </svg>
    ),
    title: 'Operations & Maintenance',
    shortTitle: '05 · O&M',
    desc: 'Comprehensive AMC packages — preventive maintenance, remote monitoring, performance analytics, and rapid fault response.',
    points: ['24/7 remote monitoring', 'Preventive & corrective maintenance', 'Performance ratio reporting'],
  },
  {
    id: 6,
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="4" y="22" width="6" height="10" rx="1" fill="url(#g6)" opacity="0.5"/>
        <rect x="13" y="16" width="6" height="16" rx="1" fill="url(#g6)" opacity="0.7"/>
        <rect x="22" y="10" width="6" height="22" rx="1" fill="url(#g6)"/>
        <path d="M6 14l9-6 9 6" stroke="url(#g6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <defs><linearGradient id="g6" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse"><stop stopColor="#FF6B1A"/><stop offset="1" stopColor="#FFB830"/></linearGradient></defs>
      </svg>
    ),
    title: 'Solar Advisory & DPR',
    shortTitle: '06 · Advisory',
    desc: 'Independent consultancy for developers, industries, and institutions — subsidy mapping, DPR drafting, and government scheme navigation.',
    points: ['PM Surya Ghar & Kusum advisory', 'DPR drafting for banks / MNRE', 'Subsidy & incentive maximisation'],
  },
]

export default function Services() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  const { ref: headRef, inView } = useScrollAnimation(0.08)

  return (
    <section
      id="services"
      ref={sectionRef}
      style={{ position: 'relative', background: 'var(--bg-elevated)', padding: '7rem 0', overflow: 'hidden' }}
    >
      {/* Parallax background glow */}
      <motion.div style={{ y: bgY, position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: '10%', right: '5%',
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,107,26,0.07) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }} />
      </motion.div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div ref={headRef} style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.span
            className="section-tag" style={{ justifyContent: 'center' }}
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
          >Our Services</motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.1 }}
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem' }}
          >
            End-to-End <span className="gradient-text">Solar EPC</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
            style={{ color: 'var(--text-secondary)', maxWidth: 560, margin: '0 auto' }}
          >
            From the first site visit to long-term O&amp;M, Suntrik manages every phase of your solar project under one roof — so you never have to co-ordinate multiple vendors.
          </motion.p>
        </div>

        {/* Service cards — 3 × 2 grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
          gap: '1.5rem',
        }}>
          {services.map((svc, i) => (
            <ServiceCard key={svc.id} svc={svc} index={i} inView={inView} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.7 }}
          style={{ textAlign: 'center', marginTop: '3.5rem' }}
        >
          <a href="#contact" className="btn-primary">Request a Free Site Assessment</a>
        </motion.div>
      </div>
    </section>
  )
}

function ServiceCard({ svc, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5 }}
      className="glass-card"
      style={{ padding: '2rem', position: 'relative', overflow: 'hidden', cursor: 'default' }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,107,26,0.3)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
    >
      {/* Number watermark */}
      <span style={{
        position: 'absolute', top: '1rem', right: '1.25rem',
        fontFamily: 'Space Grotesk, sans-serif', fontWeight: 900,
        fontSize: '3.5rem', lineHeight: 1,
        color: 'rgba(255,107,26,0.06)',
        pointerEvents: 'none', userSelect: 'none',
      }}>
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Icon */}
      <div style={{ marginBottom: '1.25rem' }}>{svc.icon}</div>

      {/* Title */}
      <h3 style={{
        fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700,
        fontSize: '1.1rem', marginBottom: '0.75rem',
      }}>{svc.title}</h3>

      {/* Description */}
      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '1.25rem' }}>
        {svc.desc}
      </p>

      {/* Bullet points */}
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
        {svc.points.map(pt => (
          <li key={pt} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <span style={{ color: 'var(--brand-orange)', flexShrink: 0, marginTop: 1 }}>▸</span>
            {pt}
          </li>
        ))}
      </ul>

      {/* Bottom accent line — animates on hover */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px',
          background: 'var(--gradient-sun)', transformOrigin: 'left',
        }}
      />
    </motion.div>
  )
}
