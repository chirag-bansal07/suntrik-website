/**
 * ProjectReels — cinematic aerial drone reels of our PM-KUSUM ground-mount sites.
 * Three vertical (9:16) clips, the centre one raised. Each plays muted/looped
 * only while in view (paused otherwise) to keep things light.
 */
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const REELS = [
  { name: 'Girghichiya', cap: '3.98 MWp', src: '/reels/girghichiya.mp4', poster: '/reels/girghichiya.jpg' },
  { name: 'Bhojasar',    cap: '8.48 MWp', src: '/reels/bhojasar.mp4',    poster: '/reels/bhojasar.jpg',  featured: true },
  { name: 'Rampura',     cap: '6.56 MWp', src: '/reels/rampura.mp4',     poster: '/reels/rampura.jpg' },
]

function Reel({ r, inView, delay }) {
  const vidRef = useRef(null)

  useEffect(() => {
    const v = vidRef.current
    if (!v) return
    v.muted = true
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {})
        else v.pause()
      },
      { threshold: 0.35 },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: r.featured ? -26 : 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.03 }}
      className="reel-card"
      style={{
        position: 'relative', width: r.featured ? 326 : 296, aspectRatio: '9 / 16',
        borderRadius: 26, overflow: 'hidden', flexShrink: 0,
        border: r.featured ? '1px solid rgba(255,107,26,0.5)' : '1px solid rgba(255,255,255,0.1)',
        boxShadow: r.featured
          ? '0 30px 70px rgba(0,0,0,0.55), 0 0 50px rgba(255,107,26,0.22)'
          : '0 22px 55px rgba(0,0,0,0.5)',
        background: '#06090e',
      }}
    >
      <video
        ref={vidRef}
        src={r.src}
        poster={r.poster}
        muted loop playsInline preload="metadata"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />

      {/* scrim */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(to top, rgba(6,9,14,0.92) 0%, rgba(6,9,14,0.15) 40%, transparent 62%)' }} />

      {/* live tag */}
      <div style={{ position: 'absolute', top: '0.85rem', left: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(6,9,14,0.55)', backdropFilter: 'blur(6px)', borderRadius: 100, padding: '0.25rem 0.7rem', border: '1px solid rgba(255,255,255,0.16)' }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#FF6B1A', boxShadow: '0 0 8px #FF6B1A', animation: 'reelPulse 1.6s ease-in-out infinite' }} />
        <span style={{ fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.14em', color: '#fff' }}>AERIAL REEL</span>
      </div>

      {/* label */}
      <div style={{ position: 'absolute', left: '1.1rem', right: '1.1rem', bottom: '1.1rem' }}>
        <div style={{ display: 'inline-block', background: '#10B981', color: '#fff', fontSize: '0.58rem', fontWeight: 800, padding: '0.2rem 0.6rem', borderRadius: 100, marginBottom: '0.55rem', letterSpacing: '0.04em' }}>🌾 PM-KUSUM</div>
        <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 900, fontSize: '1.7rem', lineHeight: 1, color: '#fff', textShadow: '0 2px 16px rgba(0,0,0,0.6)' }}>{r.cap}</div>
        <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.9)', fontWeight: 600, marginTop: '0.35rem' }}>📍 {r.name}, Rajasthan</div>
      </div>
    </motion.div>
  )
}

export default function ProjectReels() {
  const { ref: headRef, inView: headIn } = useScrollAnimation(0.1)
  const { ref: rowRef,  inView: rowIn  } = useScrollAnimation(0.15)

  return (
    <section
      id="reels"
      style={{
        position: 'relative', overflow: 'hidden',
        background: 'radial-gradient(ellipse 80% 60% at 50% 30%, #0e1626 0%, #070b12 55%, #05080d 100%)',
        padding: 'clamp(3.5rem, 7vh, 6rem) 0',
        minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center',
      }}
    >
      {/* glows + grid */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '20%', left: '22%', width: 520, height: 520, background: 'radial-gradient(circle, rgba(255,107,26,0.12) 0%, transparent 65%)', filter: 'blur(70px)' }} />
        <div style={{ position: 'absolute', bottom: '8%', right: '20%', width: 520, height: 520, background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 65%)', filter: 'blur(70px)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)', backgroundSize: '54px 54px', maskImage: 'radial-gradient(ellipse 70% 60% at 50% 45%, black 30%, transparent 80%)', WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 45%, black 30%, transparent 80%)' }} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* header */}
        <div ref={headRef} style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <motion.span className="section-tag" style={{ justifyContent: 'center' }}
            initial={{ opacity: 0, y: 18 }} animate={headIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
            Aerial Reels
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 26 }} animate={headIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontSize: 'clamp(1.7rem, 3.6vw, 2.6rem)', marginBottom: '0.6rem' }}>
            Our Projects, <span className="gradient-text">From Above</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={headIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
            style={{ color: 'var(--text-secondary)', maxWidth: 560, margin: '0 auto', lineHeight: 1.8 }}>
            Drone footage from our PM-KUSUM ground-mount plants across Rajasthan — megawatts of clean power, built and commissioned by Suntrik.
          </motion.p>
        </div>

        {/* reels */}
        <div ref={rowRef} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 'clamp(1rem, 2.5vw, 2.25rem)', flexWrap: 'wrap' }}>
          {REELS.map((r, i) => (
            <Reel key={r.name} r={r} inView={rowIn} delay={0.1 + i * 0.12} />
          ))}
        </div>

        {/* cta */}
        <motion.div
          initial={{ opacity: 0, y: 18 }} animate={rowIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.5 }}
          style={{ textAlign: 'center', marginTop: '2.75rem' }}>
          <Link to="/projects" className="btn-primary" style={{ textDecoration: 'none' }}>View All Projects →</Link>
        </motion.div>
      </div>

      <style>{`
        @keyframes reelPulse { 0%,100% { opacity: 1; } 50% { opacity: 0.35; } }
        @media (max-width: 760px) {
          .reel-card { width: 78vw !important; max-width: 320px; }
        }
      `}</style>
    </section>
  )
}
