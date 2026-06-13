/**
 * Team — Leadership of the Suntrik group.
 *
 * NOTE: suntrik.com blocks automated fetching (HTTP 403), so the names/titles
 * below were assembled from Suntrik's public About page summary plus the
 * company registry and public LinkedIn profiles. Confirm/replace as needed —
 * the data lives in the TEAM array and is trivial to edit.
 */
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import TiltCard from '../components/ui/TiltCard'

const TEAM = [
  {
    name: 'Om Prakash Bansal', title: 'Founder & Director',
    bio: 'Anchors the Suntrik group with decades of operations and finance leadership.',
    accent: '#FF6B1A', linkedin: '',
  },
  {
    name: 'Vinay Bansal', title: 'Director — Distribution',
    bio: 'Leads Solar One Energy, the group’s solar distribution arm.',
    accent: '#FFB830', linkedin: 'https://www.linkedin.com/in/vinay-bansal-37513818/',
  },
  {
    name: 'Rajat Goyal', title: 'Director — EPC & Operations',
    bio: 'Spearheads Suntrik’s EPC and Sunmount structure manufacturing — business development, execution, procurement and design.',
    accent: '#10B981', linkedin: 'https://www.linkedin.com/in/rajat-goyal-579bab80/',
  },
  {
    name: 'Kapil Vidhani', title: 'Director — Distribution',
    bio: 'Drives distribution and growth across the Suntrik group.',
    accent: '#3B82F6', linkedin: 'https://www.linkedin.com/in/kapil-vidhani-74480724/',
  },
  {
    name: 'Vikas Bansal', title: 'Director',
    bio: 'Director, Suntrik Green Energy Pvt. Ltd.',
    accent: '#8B5CF6', linkedin: '',
  },
]

const initials = name => name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('')

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21H9z" />
    </svg>
  )
}

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
        <div ref={headRef} style={{ textAlign: 'center', marginBottom: '2.25rem' }}>
          <motion.span className="section-tag" style={{ justifyContent: 'center' }}
            initial={{ opacity: 0, y: 18 }} animate={headIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
            Leadership
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 26 }} animate={headIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontSize: 'clamp(1.5rem, 3.2vw, 2.2rem)', marginBottom: '0.6rem' }}>
            The People Behind <span className="gradient-text">Suntrik</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={headIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
            style={{ color: 'var(--text-secondary)', maxWidth: 600, margin: '0 auto', lineHeight: 1.8 }}>
            Built on Suntrik Solutions (2018) and incorporated as Suntrik Green Energy (2024), the group pairs decades of operations &amp; finance leadership with deep solar distribution and EPC expertise.
          </motion.p>
        </div>

        {/* Member grid */}
        <div ref={gridRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.1rem' }} className="team-grid">
          {TEAM.map((m, i) => (
            <TiltCard key={m.name} max={7} style={{ borderRadius: 16 }}>
              <motion.div
                initial={{ opacity: 0, y: 26 }} animate={gridIn ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  height: '100%', borderRadius: 16, padding: '1.6rem 1.4rem',
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
                  position: 'relative', overflow: 'hidden',
                }}
              >
                {/* top accent */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${m.accent}, transparent)` }} />

                {/* Avatar */}
                <div style={{
                  width: 86, height: 86, borderRadius: '50%', marginBottom: '1rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '1.6rem', color: '#fff',
                  background: `linear-gradient(140deg, ${m.accent} 0%, ${m.accent}66 100%)`,
                  border: `2px solid ${m.accent}55`,
                  boxShadow: `0 0 26px ${m.accent}40`,
                }}>
                  {initials(m.name)}
                </div>

                <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.2rem' }}>{m.name}</h3>
                <div style={{ fontSize: '0.78rem', fontWeight: 600, color: m.accent, marginBottom: '0.7rem' }}>{m.title}</div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.65, flex: 1 }}>{m.bio}</p>

                {m.linkedin && (
                  <a href={m.linkedin} target="_blank" rel="noopener noreferrer"
                    style={{
                      marginTop: '1rem', width: 34, height: 34, borderRadius: 8,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--text-muted)', border: '1px solid rgba(255,255,255,0.1)',
                      transition: 'color 0.2s, border-color 0.2s, background 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = m.accent; e.currentTarget.style.borderColor = `${m.accent}66`; e.currentTarget.style.background = `${m.accent}14` }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'transparent' }}
                  >
                    <LinkedInIcon />
                  </a>
                )}
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
