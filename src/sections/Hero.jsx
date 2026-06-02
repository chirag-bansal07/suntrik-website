import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'

const words = ['Power', 'Innovation', 'Future', 'Energy']

export default function Hero() {
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const wordRef = useRef(null)
  const wordIndex = useRef(0)

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08])

  // Cycling word animation
  useEffect(() => {
    const el = wordRef.current
    if (!el) return

    const cycle = () => {
      gsap.to(el, { y: -20, opacity: 0, duration: 0.35, ease: 'power2.in', onComplete: () => {
        wordIndex.current = (wordIndex.current + 1) % words.length
        el.textContent = words[wordIndex.current]
        gsap.fromTo(el, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out' })
      }})
    }

    const timer = setInterval(cycle, 2400)
    return () => clearInterval(timer)
  }, [])

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative', height: '100vh', minHeight: 700,
        display: 'flex', alignItems: 'center', overflow: 'hidden',
        background: 'var(--bg-deep)',
      }}
    >
      {/* Video / parallax background */}
      <motion.div style={{ y, scale, position: 'absolute', inset: 0, zIndex: 0 }}>
        {/* Placeholder gradient — swap for <video> when you have footage */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 80% 60% at 60% 40%, rgba(255,107,26,0.18) 0%, rgba(255,184,48,0.08) 40%, transparent 70%), var(--gradient-hero)',
        }} />

        {/* VIDEO placeholder — uncomment and set src when ready */}
        {/*
        <video ref={videoRef} src="/hero-video.mp4" autoPlay muted loop playsInline
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.45 }} />
        */}

        {/* Animated grid overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,107,26,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,107,26,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }} />

        {/* Glow orbs */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: '20%', right: '15%',
            width: 500, height: 500, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,107,26,0.2) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          style={{
            position: 'absolute', bottom: '10%', left: '5%',
            width: 400, height: 400, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,184,48,0.15) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div style={{ opacity }} className="container" style2={{ position: 'relative', zIndex: 2 }}>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 760 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="section-tag">Solar Energy Solutions</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', marginBottom: '1rem', lineHeight: 1.05 }}
          >
            Harnessing the<br />
            Sun's{' '}
            <span
              ref={wordRef}
              className="gradient-text"
              style={{ display: 'inline-block' }}
            >
              Power
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: 'var(--text-secondary)', maxWidth: 560,
              lineHeight: 1.75, marginBottom: '2.5rem',
            }}
          >
            Suntrik delivers cutting-edge solar energy systems, mounting solutions, and electrical infrastructure — engineered for reliability, built for the future.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
          >
            <a href="#products" className="btn-primary">Explore Products</a>
            <a href="#contact" className="btn-outline">Get a Free Quote</a>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            style={{
              display: 'flex', gap: '2.5rem', marginTop: '4rem',
              paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.08)',
              flexWrap: 'wrap',
            }}
          >
            {[
              { value: '500+', label: 'Projects Completed' },
              { value: '15+', label: 'Years Experience' },
              { value: '50MW+', label: 'Capacity Installed' },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'Space Grotesk, sans-serif', background: 'var(--gradient-sun)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{s.value}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{
          position: 'absolute', bottom: '2rem', left: '50%',
          transform: 'translateX(-50%)', zIndex: 2,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
        }}
      >
        <span style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, var(--brand-orange), transparent)' }}
        />
      </motion.div>
    </section>
  )
}
