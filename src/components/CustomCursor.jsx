/**
 * CustomCursor — a glowing solar cursor that replaces the native pointer.
 * Inner amber dot tracks 1:1; outer orange ring lags with a spring and expands
 * on interactive elements. A canvas draws an electric, flickering trail that
 * follows the pointer and recedes when it stops. Desktop / fine-pointer only.
 */
import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [enabled, setEnabled]   = useState(false)
  const [hovering, setHovering] = useState(false)
  const [down, setDown]         = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 350, damping: 30, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 350, damping: 30, mass: 0.5 })

  const canvasRef = useRef(null)
  const pointsRef = useRef([])
  const lastMoveRef = useRef(0)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    setEnabled(true)
    document.body.classList.add('custom-cursor-active')

    const move  = e => {
      x.set(e.clientX); y.set(e.clientY)
      pointsRef.current.push({ x: e.clientX, y: e.clientY })
      if (pointsRef.current.length > 22) pointsRef.current.shift()
      lastMoveRef.current = performance.now()
    }
    const over  = e => setHovering(!!e.target.closest('a, button, [data-cursor], input, textarea, select, label, .magnetic'))
    const dn    = () => setDown(true)
    const up    = () => setDown(false)
    const leave = () => { x.set(-100); y.set(-100); pointsRef.current = [] }

    window.addEventListener('mousemove', move,  { passive: true })
    window.addEventListener('mouseover', over,  { passive: true })
    window.addEventListener('mousedown', dn)
    window.addEventListener('mouseup',   up)
    document.addEventListener('mouseleave', leave)

    // ── Electric trail (canvas) ──────────────────────────────────────
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    let raf
    const resize = () => { if (canvas) { canvas.width = window.innerWidth; canvas.height = window.innerHeight } }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    const draw = () => {
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        const pts = pointsRef.current
        // When the pointer is idle, let the trail recede from the tail.
        if (performance.now() - lastMoveRef.current > 35 && pts.length) pts.shift()

        if (pts.length > 1) {
          ctx.lineCap = 'round'
          ctx.lineJoin = 'round'
          for (let i = 1; i < pts.length; i++) {
            const t  = i / (pts.length - 1)            // 0 = oldest, 1 = newest
            const p0 = pts[i - 1]
            const p1 = pts[i]
            // jagged midpoint so each segment crackles like an arc
            const amp = 7 * (1 - t) + 2
            const mx = (p0.x + p1.x) / 2 + (Math.random() - 0.5) * amp
            const my = (p0.y + p1.y) / 2 + (Math.random() - 0.5) * amp
            const flicker = 0.75 + Math.random() * 0.25

            ctx.beginPath()
            ctx.moveTo(p0.x, p0.y)
            ctx.quadraticCurveTo(mx, my, p1.x, p1.y)
            ctx.lineWidth   = (0.6 + t * 2.6) * flicker
            ctx.strokeStyle = `rgba(255, ${Math.round(110 + 130 * t)}, 45, ${(0.12 + t * 0.6) * flicker})`
            ctx.shadowColor = 'rgba(255, 140, 40, 0.9)'
            ctx.shadowBlur  = 6 + t * 8
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      window.removeEventListener('mousedown', dn)
      window.removeEventListener('mouseup',   up)
      window.removeEventListener('resize', resize)
      document.removeEventListener('mouseleave', leave)
      cancelAnimationFrame(raf)
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <>
      {/* Electric trail */}
      <canvas
        ref={canvasRef}
        aria-hidden
        style={{ position: 'fixed', inset: 0, zIndex: 99999, pointerEvents: 'none' }}
      />

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
