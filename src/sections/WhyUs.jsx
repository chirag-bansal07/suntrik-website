import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const reasons = [
  {
    num: '01', title: 'End-to-End Solutions',
    desc: 'From design and procurement to installation and AMC — we handle every stage of your solar project under one roof.',
    icon: '🔧',
  },
  {
    num: '02', title: 'ISO Certified Quality',
    desc: 'Our products meet rigorous international quality standards with full IEC, MNRE, and BIS certifications.',
    icon: '✅',
  },
  {
    num: '03', title: 'In-House R&D',
    desc: 'A dedicated engineering team constantly innovating to deliver more efficient and durable solar solutions.',
    icon: '🧪',
  },
  {
    num: '04', title: '25-Year Performance Warranty',
    desc: 'Our panels come with a linear power output warranty, giving you confidence for decades.',
    icon: '📜',
  },
  {
    num: '05', title: 'Pan-India Presence',
    desc: 'With projects across 20+ states, our nationwide network ensures fast delivery and local support.',
    icon: '🗺️',
  },
  {
    num: '06', title: 'Smart Monitoring',
    desc: 'Real-time energy monitoring via our app lets you track performance and savings 24/7.',
    icon: '📱',
  },
]

export default function WhyUs() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  const { ref, inView } = useScrollAnimation(0.08)

  return (
    <section id="why-us" ref={sectionRef} style={{ position: 'relative', padding: '7rem 0', overflow: 'hidden', background: 'var(--bg-base)' }}>
      {/* Parallax background texture */}
      <motion.div style={{ y: bgY, position: 'absolute', inset: 0, zIndex: 0 }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle at 70% 50%, rgba(255,107,26,0.08) 0%, transparent 55%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(rgba(255,107,26,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,26,0.03) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
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
            The Suntrik <span className="gradient-text">Advantage</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
            style={{ color: 'var(--text-secondary)', maxWidth: 540, margin: '0 auto' }}
          >
            We don't just sell solar — we build lasting energy partnerships. Here's what sets us apart.
          </motion.p>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}>
          {reasons.map((r, i) => (
            <motion.div
              key={r.num}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              style={{
                padding: '2rem', borderRadius: 12,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                position: 'relative', overflow: 'hidden',
                transition: 'border-color 0.25s, background 0.25s',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(255,107,26,0.25)'
                e.currentTarget.style.background = 'rgba(255,107,26,0.04)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
              }}
            >
              {/* Number watermark */}
              <div style={{
                position: 'absolute', top: '1rem', right: '1.25rem',
                fontSize: '3rem', fontWeight: 900, fontFamily: 'Space Grotesk, sans-serif',
                color: 'rgba(255,107,26,0.07)', lineHeight: 1,
              }}>
                {r.num}
              </div>

              <div style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>{r.icon}</div>
              <h3 style={{
                fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.1rem',
                fontWeight: 700, marginBottom: '0.75rem',
              }}>
                {r.title}
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>{r.desc}</p>

              {/* Bottom accent */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
                  background: 'var(--gradient-sun)', transformOrigin: 'left',
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
