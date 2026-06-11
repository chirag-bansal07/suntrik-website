/**
 * ScrollProgress — a thin solar-gradient bar pinned to the very top that
 * fills as the page scrolls. Sits above the navbar.
 */
import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })

  return (
    <motion.div
      aria-hidden
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: 3,
        transformOrigin: '0%', scaleX, zIndex: 1001,
        background: 'linear-gradient(90deg, #FF6B1A, #FFB830)',
        boxShadow: '0 0 12px rgba(255,107,26,0.7)',
      }}
    />
  )
}
