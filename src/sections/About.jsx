import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const pillars = [
  { icon: '⚡', title: 'Technical Excellence', desc: 'NISE-certified engineers and AutoCAD/PVsyst-trained designers ensuring every system performs beyond guarantee.' },
  { icon: '🏛️', title: 'Proven Heritage', desc: 'Built on Suntrik Solutions (est. 2018), now operating as Suntrik Green Energy Pvt. Ltd. — 8+ years of track record.' },
  { icon: '🗺️', title: 'North India Focus', desc: 'Deep expertise in Haryana and surrounding states — we know local DISCOM requirements, net-metering rules, and subsidies cold.' },
  { icon: '🔒', title: 'Single-Vendor Accountability', desc: 'From survey to O&M, one team, one contract, one point of contact — no finger-pointing between vendors.' },
]

export default function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])

  const { ref: textRef, inView } = useScrollAnimation(0.1)

  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }
  const item    = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } } }

  return (
    <section id="about" ref={ref} style={{ background: 'var(--bg-base)', padding: '7rem 0', overflow: 'hidden' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }} className="about-grid">

          {/* ── Visual / parallax side ──────────────────────────────────── */}
          <motion.div style={{ y: imgY }} className="about-visual">
            <div style={{ position: 'relative' }}>

              {/* Main image placeholder */}
              <div style={{
                aspectRatio: '4/5', borderRadius: 16, overflow: 'hidden',
                background: 'linear-gradient(140deg, var(--bg-elevated) 0%, var(--bg-surface) 100%)',
                border: '1px solid rgba(255,107,26,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative',
              }}>
                {/* ↓ Replace with: <img src="/about.jpg" style={{width:'100%',height:'100%',objectFit:'cover'}}/> */}
                <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                  <div style={{ fontSize: '4rem', marginBottom: '0.75rem' }}>☀️</div>
                  <p style={{ fontSize: '0.8rem' }}>Company / site photo</p>
                </div>

                {/* Orange bottom bar */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, background: 'var(--gradient-sun)' }} />
              </div>

              {/* Floating year badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute', bottom: -28, right: -28,
                  background: 'var(--gradient-sun)', borderRadius: 12,
                  padding: '1.2rem 1.5rem', boxShadow: '0 8px 32px rgba(255,107,26,0.4)',
                  color: '#fff', minWidth: 148, textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '1.7rem', fontWeight: 900, fontFamily: 'Space Grotesk, sans-serif', lineHeight: 1 }}>2018</div>
                <div style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.9, marginTop: 4 }}>
                  Est. · Suntrik Solutions
                </div>
              </motion.div>

              {/* Certification badge */}
              <div style={{
                position: 'absolute', top: 28, left: -36,
                borderRadius: 10, overflow: 'hidden',
                border: '3px solid var(--bg-base)',
                background: 'var(--bg-elevated)',
                padding: '0.9rem 1.1rem',
                boxShadow: 'var(--shadow-card)',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '1.4rem', marginBottom: 4 }}>🏅</div>
                <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--brand-orange)', lineHeight: 1.3 }}>NISE<br/>Certified</div>
              </div>
            </div>
          </motion.div>

          {/* ── Text side ─────────────────────────────────────────────────── */}
          <motion.div ref={textRef} variants={stagger} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <motion.span className="section-tag" variants={item}>About Suntrik</motion.span>

            <motion.h2 variants={item} style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1.5rem' }}>
              North India's Trusted<br />
              <span className="gradient-text">Solar EPC Partner</span>
            </motion.h2>

            <motion.p variants={item} style={{ color: 'var(--text-secondary)', lineHeight: 1.85, marginBottom: '1rem' }}>
              Founded in 2018 as <strong style={{ color: 'var(--text-primary)' }}>Suntrik Solutions</strong> and incorporated in 2024 as <strong style={{ color: 'var(--text-primary)' }}>Suntrik Green Energy Pvt. Ltd.</strong>, we have spent over eight years building deep expertise in solar EPC across Haryana and North India.
            </motion.p>

            <motion.p variants={item} style={{ color: 'var(--text-secondary)', lineHeight: 1.85, marginBottom: '2rem' }}>
              We serve residential homeowners, commercial establishments, industrial units, and rural communities — providing advisory, engineering design, turnkey construction, and lifetime O&amp;M support. Our NISE-certified engineers deliver every project with a single-vendor discipline that removes co-ordination risk and keeps timelines tight.
            </motion.p>

            {/* Pillar cards */}
            <motion.div variants={item} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {pillars.map(p => (
                <div key={p.title} className="glass-card" style={{ padding: '1.2rem', borderColor: 'rgba(255,107,26,0.1)' }}>
                  <div style={{ fontSize: '1.4rem', marginBottom: '0.4rem' }}>{p.icon}</div>
                  <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.3rem' }}>{p.title}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{p.desc}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .about-visual { display: none; }
        }
      `}</style>
    </section>
  )
}
