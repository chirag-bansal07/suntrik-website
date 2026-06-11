/**
 * Preloader — a one-per-session animated sunrise.
 * A sun disc rises over a horizon while the SUNTRIK wordmark and a thin
 * loading line fill in, then the whole panel lifts away.
 */
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LETTERS = 'SUNTRIK'.split('')

export default function Preloader() {
  const [done, setDone] = useState(() => {
    if (typeof window === 'undefined') return true
    return sessionStorage.getItem('suntrik-preloaded') === '1'
  })

  useEffect(() => {
    if (done) return
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => {
      sessionStorage.setItem('suntrik-preloaded', '1')
      setDone(true)
    }, 2000)
    return () => { clearTimeout(t); document.body.style.overflow = '' }
  }, [done])

  return (
    <AnimatePresence onExitComplete={() => { document.body.style.overflow = '' }}>
      {!done && (
        <motion.div
          key="preloader"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed', inset: 0, zIndex: 200000,
            background: 'radial-gradient(ellipse 90% 70% at 50% 100%, #1a1200 0%, #0a0a0f 55%, #060A0F 100%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Rays */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0, scale: 0.6, rotate: 0 }}
            animate={{ opacity: 0.5, scale: 1, rotate: 40 }}
            transition={{ duration: 2, ease: 'easeOut' }}
            style={{
              position: 'absolute', bottom: '34%', width: 520, height: 520,
              background: 'repeating-conic-gradient(from 0deg, rgba(255,184,48,0.16) 0deg 6deg, transparent 6deg 18deg)',
              borderRadius: '50%', filter: 'blur(2px)',
              maskImage: 'radial-gradient(circle, black 30%, transparent 70%)',
              WebkitMaskImage: 'radial-gradient(circle, black 30%, transparent 70%)',
            }}
          />

          {/* Sun disc rising */}
          <motion.div
            initial={{ y: 140, scale: 0.7, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: 110, height: 110, borderRadius: '50%',
              background: 'radial-gradient(circle at 38% 36%, #FFE08A 0%, #FFB830 35%, #FF6B1A 75%)',
              boxShadow: '0 0 70px rgba(255,140,40,0.7), 0 0 140px rgba(255,107,26,0.4)',
              marginBottom: '1.75rem',
            }}
          />

          {/* Horizon line sweeping out */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: '60vw', maxWidth: 420, height: 1, marginBottom: '1.5rem',
              background: 'linear-gradient(90deg, transparent, rgba(255,107,26,0.7), transparent)',
            }}
          />

          {/* Wordmark */}
          <div style={{ display: 'flex', gap: '0.08em', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: 'clamp(1.6rem, 5vw, 2.6rem)', letterSpacing: '0.12em' }}>
            {LETTERS.map((l, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.07 }}
                className="gradient-text"
              >
                {l}
              </motion.span>
            ))}
          </div>

          {/* Loading line */}
          <div style={{ width: 160, height: 2, marginTop: '1.5rem', background: 'rgba(255,255,255,0.08)', borderRadius: 2, overflow: 'hidden' }}>
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.7, ease: 'easeInOut' }}
              style={{ height: '100%', background: 'linear-gradient(90deg, #FF6B1A, #FFB830)' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
