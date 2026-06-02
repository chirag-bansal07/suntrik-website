import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const stats = [
  { value: 8,    suffix: '+',    label: 'Years of Experience', desc: 'Solar EPC since 2018 across North India' },
  { value: 500,  suffix: '+',    label: 'Projects Completed',  desc: 'Residential, commercial & industrial' },
  { value: 10,   suffix: 'MW+',  label: 'Capacity Installed',  desc: 'Aggregate solar capacity commissioned' },
  { value: 100,  suffix: '%',    label: 'DISCOM Approvals',    desc: 'Net-metering cleared, zero rejections' },
]

function CountUp({ value, suffix, inView }) {
  const numRef  = useRef(null)
  const hasRun  = useRef(false)

  useEffect(() => {
    if (inView && !hasRun.current && numRef.current) {
      hasRun.current = true
      // Tween a DOM text node via a counter variable — works in all GSAP 3.x versions
      let current = 0
      const total = value
      const duration = 2200 // ms
      const start = performance.now()

      const tick = (now) => {
        const elapsed = now - start
        const progress = Math.min(elapsed / duration, 1)
        // ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3)
        current = Math.round(eased * total)
        if (numRef.current) numRef.current.textContent = current + suffix
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }
  }, [inView, value, suffix])

  return <span ref={numRef}>0{suffix}</span>
}

export default function Stats() {
  const { ref, inView } = useScrollAnimation(0.12)

  return (
    <section style={{ background: 'var(--gradient-sun)', padding: '5rem 0', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)`,
        backgroundSize: '48px 48px',
      }} />

      <div className="container" ref={ref} style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '2.5rem',
          textAlign: 'center',
        }}>
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <div style={{
                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                fontWeight: 900, fontFamily: 'Space Grotesk, sans-serif',
                color: '#fff', lineHeight: 1, marginBottom: '0.5rem',
              }}>
                <CountUp value={s.value} suffix={s.suffix} inView={inView} />
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'rgba(255,255,255,0.95)', marginBottom: '0.35rem' }}>
                {s.label}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.68)', lineHeight: 1.5 }}>
                {s.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
