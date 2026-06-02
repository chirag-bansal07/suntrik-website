import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const testimonials = [
  {
    id: 1,
    name: 'Suresh Bansal',
    role: 'Director, Bansal Steel Works',
    location: 'Faridabad, Haryana',
    text: "Suntrik handled our 180 kWp industrial rooftop from design to DISCOM approval without us lifting a finger. The system went live on schedule and our unit's electricity cost dropped by 65% in the first month.",
    rating: 5,
    avatar: 'SB',
  },
  {
    id: 2,
    name: 'Manpreet Kaur',
    role: 'Homeowner (PM Surya Ghar)',
    location: 'Panipat, Haryana',
    text: "I was worried about the subsidy process being complicated, but Suntrik's team managed everything — registration, inspection, subsidy disbursement. My 8 kW system cost me almost nothing after the government benefit.",
    rating: 5,
    avatar: 'MK',
  },
  {
    id: 3,
    name: 'Ramesh Yadav',
    role: 'Farmer, PM-KUSUM Beneficiary',
    location: 'Rohtak, Haryana',
    text: "Our farmer group was skeptical about solar pumps but Suntrik explained every step, got the scheme approved, and installed the system in 10 days. No electricity bills for irrigation now — it changed our economics.",
    rating: 5,
    avatar: 'RY',
  },
  {
    id: 4,
    name: 'Priya Sharma',
    role: 'CFO, Logistics Hub Pvt. Ltd.',
    location: 'Gurugram, Haryana',
    text: "From the detailed PVsyst simulation report to the 24/7 monitoring portal, Suntrik brought a level of technical rigour we hadn't seen from other EPC vendors. Our 300 kWp plant is performing above the guaranteed yield.",
    rating: 5,
    avatar: 'PS',
  },
]

function Stars({ count }) {
  return (
    <div style={{ display: 'flex', gap: 3 }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: '#FFB830', fontSize: '1rem' }}>★</span>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const timerRef = useRef(null)
  const { ref, inView } = useScrollAnimation(0.1)

  // Auto-advance
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActive(a => (a + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timerRef.current)
  }, [])

  const go = (dir) => {
    clearInterval(timerRef.current)
    setActive(a => (a + dir + testimonials.length) % testimonials.length)
  }

  return (
    <section style={{ background: 'var(--bg-light)', padding: '7rem 0' }}>
      <div className="container">
        {/* Header */}
        <div ref={ref} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <motion.span className="section-tag" style={{ justifyContent: 'center' }}
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
            Client Stories
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.1 }}
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--text-dark)' }}
          >
            Trusted by Homeowners,<br />
            <span className="gradient-text">Industries & Farmers</span>
          </motion.h2>
        </div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}
          style={{ maxWidth: 800, margin: '0 auto', position: 'relative' }}
        >
          {/* Big quote */}
          <div style={{
            position: 'absolute', top: -30, left: '50%', transform: 'translateX(-50%)',
            fontSize: '7rem', color: 'rgba(255,107,26,0.1)',
            fontFamily: 'Georgia, serif', lineHeight: 1,
            userSelect: 'none', pointerEvents: 'none',
          }}>"</div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              style={{
                background: '#fff', borderRadius: 16,
                padding: 'clamp(2rem,4vw,2.75rem) clamp(1.5rem,5vw,3.5rem)',
                boxShadow: '0 4px 48px rgba(0,0,0,0.07)',
                border: '1px solid rgba(255,107,26,0.08)',
                textAlign: 'center',
              }}
            >
              <Stars count={testimonials[active].rating} />

              <p style={{
                fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                lineHeight: 1.85, color: 'var(--text-dark-2)',
                margin: '1.5rem 0', fontStyle: 'italic',
              }}>
                "{testimonials[active].text}"
              </p>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%',
                  background: 'var(--gradient-sun)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontWeight: 800, fontSize: '0.9rem', flexShrink: 0,
                }}>
                  {testimonials[active].avatar}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 700, color: 'var(--text-dark)', fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.95rem' }}>
                    {testimonials[active].name}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-dark-2)' }}>
                    {testimonials[active].role} · {testimonials[active].location}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem', alignItems: 'center' }}>
            {[['‹', -1], ['›', 1]].map(([arrow, dir], idx) => (
              idx === 1 ? (
                <button key={arrow} onClick={() => go(dir)} style={navBtnStyle}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--brand-orange)'; e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--brand-orange)' }}>
                  {arrow}
                </button>
              ) : (
                <button key={arrow} onClick={() => go(dir)} style={navBtnStyle}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--brand-orange)'; e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--brand-orange)' }}>
                  {arrow}
                </button>
              )
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', marginTop: '1rem' }}>
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setActive(i)} style={{
                width: i === active ? 28 : 8, height: 8, borderRadius: 4,
                background: i === active ? 'var(--brand-orange)' : 'rgba(255,107,26,0.2)',
                border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', padding: 0,
              }} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const navBtnStyle = {
  width: 44, height: 44, borderRadius: '50%',
  border: '1px solid rgba(255,107,26,0.3)', background: 'transparent',
  color: 'var(--brand-orange)', cursor: 'pointer', fontSize: '1.2rem',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  transition: 'all 0.2s',
}
