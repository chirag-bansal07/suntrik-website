import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const testimonials = [
  {
    id: 1,
    name: 'Rajesh Patel',
    role: 'Director, Patel Textiles Pvt. Ltd.',
    location: 'Surat, Gujarat',
    text: "Suntrik transformed our factory's energy situation completely. The 250 kWp system has reduced our electricity costs by over 68%. Professional team, on-time delivery, and excellent after-sales support.",
    rating: 5,
    avatar: 'RP',
  },
  {
    id: 2,
    name: 'Anita Sharma',
    role: 'Homeowner',
    location: 'Ahmedabad, Gujarat',
    text: "I was skeptical about rooftop solar but Suntrik's team guided me through every step. The 10 kW system was up in 3 days, and my electricity bill went from ₹8,000 to nearly zero. Best investment I've made!",
    rating: 5,
    avatar: 'AS',
  },
  {
    id: 3,
    name: 'Vikram Nair',
    role: 'Plant Manager, Sunrise Pharma',
    location: 'Pune, Maharashtra',
    text: "The quality of Suntrik's mounting structures and panels is top-notch. Over 2 years of operation and the 1.2 MW plant is performing above the guaranteed yield. Highly recommend for industrial projects.",
    rating: 5,
    avatar: 'VN',
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
  const { ref, inView } = useScrollAnimation(0.1)

  const next = () => setActive(a => (a + 1) % testimonials.length)
  const prev = () => setActive(a => (a - 1 + testimonials.length) % testimonials.length)

  return (
    <section style={{ background: 'var(--bg-light)', padding: '7rem 0' }}>
      <div className="container">
        <div ref={ref} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <motion.span className="section-tag" style={{ justifyContent: 'center' }}
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
            Testimonials
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.1 }}
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--text-dark)' }}
          >
            What Our <span className="gradient-text">Clients Say</span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}
          style={{ maxWidth: 760, margin: '0 auto', position: 'relative' }}
        >
          {/* Quote mark */}
          <div style={{
            position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%)',
            fontSize: '6rem', color: 'rgba(255,107,26,0.12)', fontFamily: 'Georgia, serif',
            lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
          }}>"</div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              style={{
                background: '#fff', borderRadius: 16, padding: '2.5rem 3rem',
                boxShadow: '0 4px 40px rgba(0,0,0,0.08)',
                border: '1px solid rgba(255,107,26,0.1)',
                textAlign: 'center',
              }}
            >
              <Stars count={testimonials[active].rating} />
              <p style={{
                fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-dark-2)',
                margin: '1.5rem 0', fontStyle: 'italic',
              }}>
                "{testimonials[active].text}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%',
                  background: 'var(--gradient-sun)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontWeight: 800, fontSize: '0.9rem',
                  flexShrink: 0,
                }}>
                  {testimonials[active].avatar}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 700, color: 'var(--text-dark)', fontFamily: 'Space Grotesk, sans-serif' }}>
                    {testimonials[active].name}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-dark-2)' }}>
                    {testimonials[active].role} · {testimonials[active].location}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem', alignItems: 'center' }}>
            <button onClick={prev} style={{
              width: 44, height: 44, borderRadius: '50%',
              border: '1px solid rgba(255,107,26,0.3)', background: 'transparent',
              color: 'var(--brand-orange)', cursor: 'pointer', fontSize: '1.1rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--brand-orange)'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--brand-orange)' }}
            >‹</button>

            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setActive(i)} style={{
                width: i === active ? 28 : 8, height: 8, borderRadius: 4,
                background: i === active ? 'var(--brand-orange)' : 'rgba(255,107,26,0.25)',
                border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', padding: 0,
              }} />
            ))}

            <button onClick={next} style={{
              width: 44, height: 44, borderRadius: '50%',
              border: '1px solid rgba(255,107,26,0.3)', background: 'transparent',
              color: 'var(--brand-orange)', cursor: 'pointer', fontSize: '1.1rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--brand-orange)'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--brand-orange)' }}
            >›</button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
