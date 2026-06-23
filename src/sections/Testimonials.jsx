import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const testimonials = [
  {
    id: 1,
    name: 'Sanjay Bhaambhu',
    role: 'Local Guide',
    location: 'Google Review',
    text: "I recently hired Suntrik for my solar energy needs, and I am extremely satisfied with their services. Rajat and his team were highly professional, delivering top-quality solutions that perfectly met my requirements. What impressed me the most was their ability to offer competitive pricing without compromising on the quality of their work. I highly recommend Suntrik for anyone seeking reliable and cost-effective solar energy solutions.",
    rating: 5,
    avatar: 'SB',
  },
  {
    id: 2,
    name: 'Abhishek Sharma',
    role: 'Verified Customer',
    location: 'Sirsa, Haryana',
    text: "Best vendor in Sirsa for solar installation and other services. Smooth and hassle free process. Best quality products used. The employee (Yogesh) is very understanding and helpful. Recommended.",
    rating: 5,
    avatar: 'AS',
  },
  {
    id: 3,
    name: 'Gaurav Soni',
    role: 'Local Guide',
    location: 'Google Review',
    text: "Dear Suntrik Solutions, I wanted to express my gratitude for the excellent service and expertise you provided in installing the solar rooftop on my property. Your team was knowledgeable, professional, and courteous throughout the entire process, and I am thrilled with the final product.",
    rating: 5,
    avatar: 'GS',
  },
  {
    id: 4,
    name: 'Yogesh Kumar',
    role: 'Verified Customer',
    location: 'Google Review',
    text: "Good work with excellent installation and ever been used best quality in material.",
    rating: 4,
    avatar: 'YK',
  },
  {
    id: 5,
    name: 'Sahil Mehta',
    role: 'Verified Customer',
    location: 'Google Review',
    text: "Good Quality Material at very Reasonable Prices. 100% Recommended.",
    rating: 5,
    avatar: 'SM',
  },
]

function Stars({ count }) {
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: '#FFB830', fontSize: '1.4rem' }}>★</span>
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
    <section style={{ background: 'var(--bg-light)', padding: 'clamp(2rem, 3vh, 3rem) 0', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="container">
        {/* Header */}
        <div ref={ref} style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <motion.span className="section-tag" style={{ justifyContent: 'center' }}
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
            Google Reviews
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.1 }}
            style={{ fontSize: 'clamp(1.5rem, 3.2vw, 2.2rem)', color: 'var(--text-dark)' }}
          >
            Trusted by Homeowners,<br />
            <span className="gradient-text">Industries & Farmers</span>
          </motion.h2>
        </div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}
          style={{ maxWidth: 960, margin: '0 auto', position: 'relative' }}
        >
          {/* Big quote */}
          <div style={{
            position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%)',
            fontSize: '8rem', color: 'rgba(255,107,26,0.08)',
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
                background: '#fff', borderRadius: 20,
                padding: 'clamp(2.5rem,5vw,3.5rem) clamp(2rem,6vw,4.5rem)',
                boxShadow: '0 8px 64px rgba(0,0,0,0.09)',
                border: '1px solid rgba(255,107,26,0.1)',
                textAlign: 'center',
              }}
            >
              <Stars count={testimonials[active].rating} />

              <p style={{
                fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
                lineHeight: 1.9, color: 'var(--text-dark-2)',
                margin: '1.75rem 0 2rem', fontStyle: 'italic',
              }}>
                "{testimonials[active].text}"
              </p>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.25rem' }}>
                <div style={{
                  width: 62, height: 62, borderRadius: '50%',
                  background: 'var(--gradient-sun)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontWeight: 800, fontSize: '1.05rem', flexShrink: 0,
                }}>
                  {testimonials[active].avatar}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 700, color: 'var(--text-dark)', fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.1rem' }}>
                    {testimonials[active].name}
                  </div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-dark-2)', marginTop: '0.2rem' }}>
                    {testimonials[active].role} · {testimonials[active].location}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1.25rem', alignItems: 'center' }}>
            {[['‹', -1], ['›', 1]].map(([arrow, dir]) => (
              <button key={arrow} onClick={() => go(dir)} style={navBtnStyle}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--brand-orange)'; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--brand-orange)' }}>
                {arrow}
              </button>
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
  width: 52, height: 52, borderRadius: '50%',
  border: '1px solid rgba(255,107,26,0.3)', background: 'transparent',
  color: 'var(--brand-orange)', cursor: 'pointer', fontSize: '1.5rem',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  transition: 'all 0.2s',
}
