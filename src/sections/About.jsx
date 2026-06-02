import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const values = [
  { icon: '⚡', title: 'Innovation', desc: 'Pushing boundaries with cutting-edge solar technology and smart energy solutions.' },
  { icon: '🌿', title: 'Sustainability', desc: 'Committed to a greener planet through clean, renewable energy for all.' },
  { icon: '🏆', title: 'Excellence', desc: 'ISO-certified manufacturing with uncompromising quality standards.' },
  { icon: '🤝', title: 'Trust', desc: 'Building long-term partnerships through transparency and reliability.' },
]

export default function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['8%', '-8%'])

  const { ref: textRef, inView } = useScrollAnimation(0.1)

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <section id="about" ref={ref} style={{ background: 'var(--bg-base)', padding: '7rem 0', overflow: 'hidden' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
          {/* Image/visual side with parallax */}
          <motion.div style={{ y }} className="about-visual">
            <div style={{ position: 'relative' }}>
              {/* Main image placeholder */}
              <div style={{
                aspectRatio: '4/5', borderRadius: 16, overflow: 'hidden',
                background: 'linear-gradient(135deg, var(--bg-elevated) 0%, var(--bg-surface) 100%)',
                border: '1px solid rgba(255,107,26,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative',
              }}>
                {/* Replace with: <img src="/about-image.jpg" style={{width:'100%',height:'100%',objectFit:'cover'}} /> */}
                <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                  <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>☀️</div>
                  <p style={{ fontSize: '0.85rem' }}>Company photo here</p>
                </div>
                {/* Orange accent border */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: 4,
                  background: 'var(--gradient-sun)',
                }} />
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute', bottom: -24, right: -24,
                  background: 'var(--gradient-sun)', borderRadius: 12, padding: '1.25rem 1.5rem',
                  boxShadow: '0 8px 32px rgba(255,107,26,0.4)',
                  color: '#fff', minWidth: 140, textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '1.75rem', fontWeight: 800, fontFamily: 'Space Grotesk, sans-serif' }}>15+</div>
                <div style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.9 }}>Years of Excellence</div>
              </motion.div>

              {/* Second smaller image */}
              <div style={{
                position: 'absolute', top: 32, left: -40,
                width: 160, height: 120, borderRadius: 10, overflow: 'hidden',
                border: '3px solid var(--bg-base)',
                background: 'var(--bg-surface)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--text-muted)', fontSize: '0.75rem',
                boxShadow: 'var(--shadow-card)',
              }}>
                {/* Replace with: <img src="/factory-image.jpg" /> */}
                <span>Factory photo</span>
              </div>
            </div>
          </motion.div>

          {/* Text side */}
          <motion.div
            ref={textRef}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.span className="section-tag" variants={itemVariants}>About Suntrik</motion.span>
            <motion.h2 variants={itemVariants} style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1.5rem' }}>
              Empowering India With<br />
              <span className="gradient-text">Clean Solar Energy</span>
            </motion.h2>
            <motion.p variants={itemVariants} style={{ color: 'var(--text-secondary)', lineHeight: 1.85, marginBottom: '1rem' }}>
              Founded with a vision to accelerate India's transition to renewable energy, Suntrik has grown into a trusted name in solar solutions. We design, manufacture, and install world-class solar systems for residential, commercial, and industrial clients.
            </motion.p>
            <motion.p variants={itemVariants} style={{ color: 'var(--text-secondary)', lineHeight: 1.85, marginBottom: '2rem' }}>
              From rooftop solar panels to large-scale ground-mount installations, our end-to-end service model ensures seamless execution and lasting performance.
            </motion.p>

            {/* Values grid */}
            <motion.div variants={itemVariants}
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {values.map(v => (
                <div key={v.title} className="glass-card" style={{ padding: '1.25rem', borderColor: 'rgba(255,107,26,0.1)' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{v.icon}</div>
                  <div style={{ fontWeight: 700, marginBottom: '0.25rem', fontFamily: 'Space Grotesk, sans-serif' }}>{v.title}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{v.desc}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-visual { display: none; }
          #about .container > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
