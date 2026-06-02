import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { gsap } from 'gsap'

const stats = [
  { value: 500, suffix: '+', label: 'Projects Completed', desc: 'Across residential, commercial & industrial sectors' },
  { value: 50, suffix: 'MW+', label: 'Capacity Installed', desc: 'Total solar energy capacity commissioned' },
  { value: 15, suffix: '+', label: 'Years of Experience', desc: 'Delivering clean energy solutions since 2009' },
  { value: 20, suffix: '+', label: 'States Covered', desc: 'Pan-India presence with local support teams' },
]

function CountUp({ value, suffix, inView }) {
  const numRef = useRef(null)
  const hasRun = useRef(false)

  useEffect(() => {
    if (inView && !hasRun.current && numRef.current) {
      hasRun.current = true
      gsap.fromTo(
        { v: 0 },
        { v: value, duration: 2.2, ease: 'power2.out',
          onUpdate() { if (numRef.current) numRef.current.textContent = Math.round(this.targets()[0].v) + suffix }
        }
      )
    }
  }, [inView, value, suffix])

  return <span ref={numRef}>0{suffix}</span>
}

export default function Stats() {
  const { ref, inView } = useScrollAnimation(0.1)

  return (
    <section style={{
      background: 'var(--gradient-sun)', padding: '5rem 0',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Background pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)`,
        backgroundSize: '50px 50px',
      }} />

      <div className="container" ref={ref} style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
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
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'rgba(255,255,255,0.95)', marginBottom: '0.4rem' }}>
                {s.label}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
                {s.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
