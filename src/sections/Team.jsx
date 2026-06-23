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
  { name: 'Vinay Bansal',  title: 'Director', exp: '29+ yrs', bio: 'Three decades of operations and finance leadership steering Suntrik\'s growth and execution.', accent: '#FF6B1A', photo: '/team/vinay.png',   tags: ['Operations', 'Finance', 'Strategy'] },
  { name: 'Rajat Goyal',   title: 'Director', exp: 'NISE',    bio: 'NISE-certified solar engineer leading project design, execution, and on-site quality across India.', accent: '#10B981', photo: '/team/rajat.png',   tags: ['Solar Engineering', 'Execution', 'Quality'] },
  { name: 'Sarthak Goyal', title: 'Director', exp: '8+ yrs',  bio: '8+ years in solar distribution and operations, driving supply, sourcing, and on-time delivery.', accent: '#FFB830', photo: '/team/sarthak.png', tags: ['Distribution', 'Operations', 'Supply Chain'] },
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

        {/* Member grid — fixed 3-up so 3 founders never form an awkward 2+1 */}
        <div ref={gridRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2.5rem', maxWidth: 1120, margin: '0 auto' }} className="team-grid">
          {TEAM.map((m, i) => (
            <TiltCard key={m.name} max={7} style={{ borderRadius: 16 }}>
              <motion.div
                initial={{ opacity: 0, y: 26 }} animate={gridIn ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  height: '100%', borderRadius: 16,
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                  display: 'flex', flexDirection: 'column',
                  position: 'relative', overflow: 'hidden',
                }}
              >
                {/* top accent */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${m.accent}, transparent)`, zIndex: 2 }} />

                {/* Photo banner — real headshot on top, gradient-initials fallback behind */}
                <div style={{ position: 'relative', width: '100%', aspectRatio: '1 / 1', background: `linear-gradient(140deg, ${m.accent} 0%, ${m.accent}55 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  <span style={{ position: 'absolute', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '3rem', color: '#fff', opacity: 0.92 }}>{initials(m.name)}</span>
                  <img src={m.photo} alt={m.name} loading="lazy"
                    onError={e => { e.currentTarget.style.display = 'none' }}
                    style={{ position: 'relative', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%', display: 'block' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,10,15,0.6) 0%, transparent 40%)' }} />
                </div>

                {/* Details */}
                <div style={{ padding: '1.25rem 1.4rem 1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.15rem' }}>
                    <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.15rem' }}>{m.name}</h3>
                    <span style={{ fontSize: '0.66rem', fontWeight: 700, color: m.accent, background: `${m.accent}1a`, border: `1px solid ${m.accent}40`, padding: '0.14rem 0.55rem', borderRadius: 100, whiteSpace: 'nowrap' }}>{m.exp}</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: m.accent, marginBottom: '0.7rem' }}>{m.title}</div>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '1.1rem' }}>{m.bio}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: 'auto' }}>
                    {m.tags.map(t => (
                      <span key={t} style={{ fontSize: '0.67rem', fontWeight: 600, color: 'var(--text-muted)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '0.22rem 0.6rem', borderRadius: 6 }}>{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .team-grid { grid-template-columns: 1fr !important; max-width: 400px !important; gap: 1.75rem !important; }
        }
      `}</style>
    </section>
  )
}
