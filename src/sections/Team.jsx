/**
 * Team — "Founders / Our Leadership", mirroring suntrik.com.
 *
 * To use real headshots: drop the images in public/team/ and set each member's
 * `photo` to e.g. '/team/vinay-bansal.jpg'. With no photo, a gradient-initials
 * avatar is shown.
 */
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import TiltCard from '../components/ui/TiltCard'

const TEAM = [
  { name: 'Vinay Bansal',  title: 'Director', bio: '29+ years of ops & finance leadership.',           accent: '#FF6B1A', photo: '' },
  { name: 'Kapil Vidhani', title: 'Director', bio: '8+ years in solar distribution & operations.',      accent: '#FFB830', photo: '' },
  { name: 'Rajat Goyal',   title: 'Director', bio: 'NISE-certified solar engineer & operations lead.',  accent: '#10B981', photo: '' },
]

const initials = name => name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('')

export default function Team() {
  const { ref: headRef, inView: headIn } = useScrollAnimation(0.1)
  const { ref: gridRef, inView: gridIn } = useScrollAnimation(0.05)

  return (
    <section
      id="team"
      style={{
        position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(175deg, #060A0F 0%, #0A1020 50%, #060A0F 100%)',
        padding: 'clamp(3rem, 6vh, 5rem) 0',
        minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center',
      }}
    >
      {/* Background glow */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{
          position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)',
          width: 900, height: 480,
          background: 'radial-gradient(ellipse, rgba(255,107,26,0.07) 0%, transparent 65%)',
          filter: 'blur(70px)',
        }} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div ref={headRef} style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <motion.span className="section-tag" style={{ justifyContent: 'center' }}
            initial={{ opacity: 0, y: 18 }} animate={headIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
            Founders
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 26 }} animate={headIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontSize: 'clamp(1.6rem, 3.4vw, 2.4rem)' }}>
            Our <span className="gradient-text">Leadership</span>
          </motion.h2>
        </div>

        {/* Member grid */}
        <div ref={gridRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', maxWidth: 1080, margin: '0 auto' }} className="team-grid">
          {TEAM.map((m, i) => (
            <TiltCard key={m.name} max={7} style={{ borderRadius: 16 }}>
              <motion.div
                initial={{ opacity: 0, y: 26 }} animate={gridIn ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  height: '100%', borderRadius: 16, padding: '1.9rem 1.5rem',
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
                  position: 'relative', overflow: 'hidden',
                }}
              >
                {/* top accent */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${m.accent}, transparent)` }} />

                {/* Avatar — photo if provided, else gradient initials */}
                {m.photo ? (
                  <img src={m.photo} alt={m.name} style={{
                    width: 110, height: 110, borderRadius: '50%', objectFit: 'cover', marginBottom: '1.1rem',
                    border: `2px solid ${m.accent}55`, boxShadow: `0 0 26px ${m.accent}40`,
                  }} />
                ) : (
                  <div style={{
                    width: 110, height: 110, borderRadius: '50%', marginBottom: '1.1rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '2rem', color: '#fff',
                    background: `linear-gradient(140deg, ${m.accent} 0%, ${m.accent}66 100%)`,
                    border: `2px solid ${m.accent}55`,
                    boxShadow: `0 0 26px ${m.accent}40`,
                  }}>
                    {initials(m.name)}
                  </div>
                )}

                <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.15rem', marginBottom: '0.25rem' }}>{m.name}</h3>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: m.accent, marginBottom: '0.7rem' }}>{m.title}</div>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>{m.bio}</p>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
