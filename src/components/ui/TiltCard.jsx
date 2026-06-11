/**
 * TiltCard — gives any block a 3D tilt that tracks the cursor, plus an optional
 * moving glare highlight. The outer wrapper owns the perspective; the inner
 * motion layer rotates so the depth reads correctly.
 */
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function TiltCard({ children, max = 9, glare = true, className, style }) {
  const ref = useRef(null)
  const [t, setT] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, active: false })

  const onMove = e => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    setT({ rx: (0.5 - py) * max * 2, ry: (px - 0.5) * max * 2, gx: px * 100, gy: py * 100, active: true })
  }
  const onLeave = () => setT(s => ({ ...s, rx: 0, ry: 0, active: false }))

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ perspective: 1000, ...style }}
    >
      <motion.div
        animate={{ rotateX: t.rx, rotateY: t.ry }}
        transition={{ type: 'spring', stiffness: 220, damping: 18, mass: 0.5 }}
        style={{ position: 'relative', height: '100%', transformStyle: 'preserve-3d', borderRadius: 'inherit' }}
      >
        {children}
        {glare && (
          <div
            style={{
              position: 'absolute', inset: 0, borderRadius: 'inherit', pointerEvents: 'none',
              background: `radial-gradient(circle at ${t.gx}% ${t.gy}%, rgba(255,255,255,0.16), transparent 45%)`,
              opacity: t.active ? 1 : 0, transition: 'opacity 0.3s ease', zIndex: 5,
            }}
          />
        )}
      </motion.div>
    </div>
  )
}
