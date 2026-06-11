/**
 * Intro — one-per-session zoom reveal.
 * The page opens on a black screen with the Suntrik logo, then the camera
 * "zooms into" the logo (it scales up and fades) while the black backdrop
 * dissolves to reveal the website behind it.
 */
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SuntrikLogo from './SuntrikLogo'

export default function Preloader() {
  const [done, setDone] = useState(() => {
    if (typeof window === 'undefined') return true
    return sessionStorage.getItem('suntrik-intro') === '1'
  })

  useEffect(() => {
    if (done) return
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => {
      sessionStorage.setItem('suntrik-intro', '1')
      setDone(true)
    }, 1650)
    return () => { clearTimeout(t); document.body.style.overflow = '' }
  }, [done])

  return (
    <AnimatePresence onExitComplete={() => { document.body.style.overflow = '' }}>
      {!done && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 200000, pointerEvents: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
          }}
        >
          {/* Black backdrop that dissolves as we zoom in */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.85, delay: 0.75, ease: 'easeIn' }}
            style={{ position: 'absolute', inset: 0, background: '#000' }}
          />
          {/* Soft glow that blooms as the logo zooms */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: [0, 0.6, 0], scale: [0.6, 1, 3] }}
            transition={{ duration: 1.6, times: [0, 0.4, 1], ease: 'easeIn' }}
            style={{
              position: 'absolute', width: 420, height: 420, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,140,40,0.5) 0%, rgba(255,107,26,0.15) 45%, transparent 72%)',
              filter: 'blur(30px)',
            }}
          />
          {/* Logo zooming into the viewer */}
          <motion.div
            initial={{ scale: 0.82, opacity: 0 }}
            animate={{ scale: [0.82, 1, 1, 17], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.6, times: [0, 0.22, 0.5, 1], ease: [0.6, 0, 0.85, 0.4] }}
            style={{ position: 'relative', filter: 'drop-shadow(0 0 40px rgba(255,107,26,0.5))' }}
          >
            <SuntrikLogo width={220} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
