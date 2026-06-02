import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const reasons = [
  {
    num: '01', title: 'Single EPC Responsibility',
    desc: 'Design, procurement, construction, and O&M — all under one contract. You deal with one team, one SLA, and one throat to choke if anything goes wrong.',
    icon: '🔗',
  },
  {
    num: '02', title: 'NISE-Certified Engineers',
    desc: 'Every installation is led by NISE (National Institute of Solar Energy) certified professionals — a standard required for MNRE subsidised projects.',
    icon: '🏅',
  },
  {
    num: '03', title: 'DISCOM & Net-Metering Expertise',
    desc: 'We handle all paperwork, approvals, and co-ordination with your local DISCOM for net-metering and grid interconnection — zero burden on you.',
    icon: '📋',
  },
  {
    num: '04', title: 'PM Surya Ghar & Kusum Navigation',
    desc: 'Our team is well-versed in PM Surya Ghar Muft Bijli Yojana (residential subsidy) and PM-KUSUM (agricultural & rural solar) schemes — maximising your government incentives.',
    icon: '🏛️',
  },
  {
    num: '05', title: '25-Year Performance Assurance',
    desc: 'We only procure Tier-1 MNRE-listed modules with 25-year linear power output warranty. Your investment is protected for decades.',
    icon: '📜',
  },
  {
    num: '06', title: '24/7 Remote Monitoring',
    desc: 'Real-time performance dashboards and alert systems — our O&M team tracks every plant we build so you know your money is working.',
    icon: '📡',
  },
]

export default function WhyUs() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  const { ref, inView } = useScrollAnimation(0.08)

  return (
    <section id="why-us" ref={sectionRef} style={{ position: 'relative', padding: '7rem 0', overflow: 'hidden', background: 'var(--bg-base)' }}>
      {/* Parallax background */}
      <motion.div style={{ y: bgY, position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(ellipse 70% 50% at 65% 50%, rgba(255,107,26,0.07) 0%, transparent 60%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(rgba(255,107,26,0.025) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,107,26,0.025) 1px, transparent 1px)`,
          backgroundSize: '42px 42px',
        }} />
      </motion.div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div ref={ref} style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.span className="section-tag" style={{ justifyContent: 'center' }}
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
            Why Suntrik
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.1 }}
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem' }}
          >
            The Suntrik <span className="gradient-text">Difference</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
            style={{ color: 'var(--text-secondary)', maxWidth: 520, margin: '0 auto' }}
          >
            We don't just install solar — we take full ownership of your project's performance for its entire lifetime.
          </motion.p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}>
          {reasons.map((r, i) => (
            <motion.div
              key={r.num}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              style={{
                padding: '2rem', borderRadius: 12,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                position: 'relative', overflow: 'hidden', cursor: 'default',
                transition: 'border-color 0.25s, background 0.25s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,107,26,0.25)'; e.currentTarget.style.background = 'rgba(255,107,26,0.04)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}
            >
              <div style={{
                position: 'absolute', top: '1rem', right: '1.25rem',
                fontSize: '3rem', fontWeight: 900, fontFamily: 'Space Grotesk, sans-serif',
                color: 'rgba(255,107,26,0.07)', lineHeight: 1, userSelect: 'none',
              }}>{r.num}</div>

              <div style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>{r.icon}</div>
              <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.7rem' }}>{r.title}</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>{r.desc}</p>

              <motion.div
                initial={{ scaleX: 0 }} whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
                style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'var(--gradient-sun)', transformOrigin: 'left' }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
