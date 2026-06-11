/**
 * CustomCursor — a glowing solar cursor that replaces the native pointer.
 * Inner amber dot tracks 1:1; outer orange ring lags with a spring and
 * expands when hovering interactive elements. Desktop / fine-pointer only.
 */
import { useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [enabled, setEnabled]   = useState(false)
  const [hovering, setHovering] = useState(false)
  const [down, setDown]         = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 350, damping: 30, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 350, damping: 30, mass: 0.5 })

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    setEnabled(true)
    document.body.classList.add('custom-cursor-active')

    const move  = e => { x.set(e.clientX); y.set(e.clientY) }
    const over  = e => setHovering(!!e.target.closest('a, button, [data-cursor], input, textarea, select, label, .magnetic'))
    const dn    = () => setDown(true)
    const up    = () => setDown(false)
    const leave = () => { x.set(-100); y.set(-100) }

    window.addEventListener('mousemove', move,  { passive: true })
    window.addEventListener('mouseover', over,  { passive: true })
    window.addEventListener('mousedown', dn)
    window.addEventListener('mouseup',   up)
    document.addEventListener('mouseleave', leave)
    return () => {
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      window.removeEventListener('mousedown', dn)
      window.removeEventListener('mouseup',   up)
      document.removeEventListener('mouseleave', leave)
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <>
      {/* Outer ring */}
      <motion.div aria-hidden style={{ position: 'fixed', left: 0, top: 0, zIndex: 100000, pointerEvents: 'none', x: ringX, y: ringY }}>
        <div style={{ transform: 'translate(-50%,-50%)' }}>
          <motion.div
            animate={{ width: hovering ? 54 : 32, height: hovering ? 54 : 32, opacity: hovering ? 1 : 0.55, scale: down ? 0.8 : 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            style={{
              borderRadius: '50%',
              border: '1.5px solid var(--brand-orange)',
              background: hovering ? 'rgba(255,107,26,0.10)' : 'transparent',
              boxShadow: '0 0 20px rgba(255,107,26,0.35)',
            }}
          />
        </div>
      </motion.div>

      {/* Inner dot */}
      <motion.div aria-hidden style={{ position: 'fixed', left: 0, top: 0, zIndex: 100000, pointerEvents: 'none', x, y }}>
        <div style={{ transform: 'translate(-50%,-50%)' }}>
          <motion.div
            animate={{ scale: hovering ? 0 : 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--brand-amber)', boxShadow: '0 0 10px rgba(255,184,48,0.85)' }}
          />
        </div>
      </motion.div>
    </>
  )
}
