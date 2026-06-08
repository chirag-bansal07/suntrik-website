/**
 * About — Vision, milestones, foundation pillars
 * Animated solar-orbit background (CSS, no canvas)
 */

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'


const MILESTONES = [
  { year: '2018', event: 'Founded as Suntrik Solutions — Solar EPC for residential & commercial segments' },
  { year: '2019', event: 'Expanded into Industrial Solar EPC; large factory & warehouse rooftops' },
  { year: '2021', event: 'First MW commissioned; launched SunMount — in-house mounting structure manufacturing' },
  { year: '2023', event: 'Launched Solar One Energy (distribution arm); PM-KUSUM & HAREDA empanelment' },
  { year: '2024', event: 'Incorporated as Suntrik Green Energy Pvt. Ltd.; Bajekan manufacturing plant operational' },
  { year: '2025', event: '80 MWp PM-KUSUM orders under execution across Rajasthan & Haryana — active order book ₹150 Cr+' },
]

const ORBIT_RINGS = [
  { size: 460, dur: 22, dir:  1, dotSz: 10, color: '#FF6B1A', dotPos: 'top',    opacity: 0.18 },
  { size: 300, dur: 14, dir: -1, dotSz:  7, color: '#FFB830', dotPos: 'bottom', opacity: 0.14 },
  { size: 620, dur: 38, dir:  1, dotSz:  5, color: '#FF6B1A', dotPos: 'top',    opacity: 0.06 },
]

export default function About() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const orbY  = useTransform(scrollYProgress, [0, 1], ['-8%',  '8%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['3%', '-3%'])

  const { ref: headRef, inView: headIn } = useScrollAnimation(0.1)
  const { ref: midRef,  inView: midIn  } = useScrollAnimation(0.1)

  const yearsSince = new Date().getFullYear() - 2018

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(160deg, #060A0F 0%, #0B1525 55%, #060A0F 100%)',
        padding: 'clamp(2rem, 3vh, 3rem) 0',
        minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center',
      }}
    >
      {/* ── Animated sun + orbit rings ── */}
      <motion.div
        style={{ y: orbY, position: 'absolute', top: '-12%', right: '-7%', zIndex: 0, pointerEvents: 'none' }}
        aria-hidden
      >
        {/* Core glow */}
        <div style={{
          width: 720, height: 720, borderRadius: '50%',
          background: 'radial-gradient(circle at 42% 40%, rgba(255,184,48,0.16) 0%, rgba(255,107,26,0.08) 40%, transparent 70%)',
          filter: 'blur(55px)',
          animation: 'aSunPulse 5s ease-in-out infinite',
        }} />
        {/* Orbit rings */}
        {ORBIT_RINGS.map((r, i) => (
          <div key={i} style={{
            position: 'absolute', top: '50%', left: '50%',
            width: r.size, height: r.size,
            marginTop: -r.size / 2, marginLeft: -r.size / 2,
            borderRadius: '50%',
            border: `1px solid rgba(255,107,26,${r.opacity})`,
            animation: `${r.dir === 1 ? 'aOrbitCW' : 'aOrbitCCW'} ${r.dur}s linear infinite`,
          }}>
            <div style={{
              position: 'absolute',
              [r.dotPos]: -(r.dotSz / 2 + 1), left: '50%', transform: 'translateX(-50%)',
              width: r.dotSz, height: r.dotSz, borderRadius: '50%',
              background: r.color,
              boxShadow: `0 0 ${r.dotSz * 1.4}px ${r.dotSz * 0.7}px ${r.color}99`,
            }} />
          </div>
        ))}
      </motion.div>

      {/* Dot grid (masked to left side) */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(rgba(255,107,26,0.07) 1px, transparent 1px)',
        backgroundSize: '36px 36px',
        maskImage: 'radial-gradient(ellipse 60% 80% at 15% 50%, black 30%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse 60% 80% at 15% 50%, black 30%, transparent 80%)',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Section header ── */}
        <motion.div
          ref={headRef}
          style={{ y: textY, maxWidth: 820, marginBottom: '1.5rem' }}
          initial={{ opacity: 0, y: 40 }}
          animate={headIn ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-tag" style={{ marginBottom: '1.5rem' }}>About Suntrik</span>

          <h2 style={{
            fontSize: 'clamp(1.7rem, 3.5vw, 2.8rem)',
            lineHeight: 1.09, fontWeight: 900, marginBottom: '0.75rem',
          }}>
            North India's Trusted<br />
            <span className="gradient-text">Solar EPC Partner</span>
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="about-txt-cols">
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, fontSize: '0.875rem' }}>
              Founded in <strong style={{ color: 'var(--text-primary)' }}>2018</strong> as Suntrik Solutions and
              incorporated in <strong style={{ color: 'var(--text-primary)' }}>2024</strong> as{' '}
              <strong style={{ color: 'var(--text-primary)' }}>Suntrik Green Energy Pvt. Ltd.</strong>, we have
              built {yearsSince}+ years of solar EPC expertise across Haryana and North India.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, fontSize: '0.875rem' }}>
              We serve residential homeowners, commercial establishments, industrial plants and farming
              communities — delivering full-cycle EPC with NISE-certified professionals, managing
              every government scheme, DISCOM approval, and net-metering connection on your behalf.
            </p>
          </div>
        </motion.div>

        {/* ── Stats + Milestones ── */}
        <div
          ref={midRef}
          style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem',
            marginBottom: '0', paddingBottom: '0',
          }}
          className="about-mid-cols"
        >
          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={midIn ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h3 style={{
              fontSize: '0.66rem', color: 'var(--text-muted)', fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.75rem',
            }}>Our Numbers</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
              {[
                { v: '10+',    l: 'Years Experience',   s: 'Solar EPC since 2018' },
                { v: '1,000+', l: 'Happy Clients',      s: 'Homes, farms & industries' },
                { v: '150MW+', l: 'Capacity Installed', s: 'Cumulative across North India' },
                { v: '100%',   l: 'DISCOM Approvals',   s: 'Zero net-metering rejections' },
              ].map(s => (
                <div key={s.l} style={{
                  padding: '0.75rem 0.9rem', borderRadius: 10,
                  background: 'rgba(255,107,26,0.05)',
                  border: '1px solid rgba(255,107,26,0.12)',
                }}>
                  <div style={{
                    fontSize: '1.5rem', fontWeight: 900, fontFamily: 'Space Grotesk, sans-serif',
                    background: 'var(--gradient-sun)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    lineHeight: 1, marginBottom: '0.3rem',
                  }}>{s.v}</div>
                  <div style={{ fontWeight: 700, fontSize: '0.81rem', marginBottom: 2 }}>{s.l}</div>
                  <div style={{ fontSize: '0.69rem', color: 'var(--text-muted)' }}>{s.s}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Milestones */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={midIn ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3 style={{
              fontSize: '0.66rem', color: 'var(--text-muted)', fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.75rem',
            }}>Our Journey</h3>
            <div style={{ position: 'relative', paddingLeft: '2rem' }}>
              {/* Line */}
              <div style={{
                position: 'absolute', left: 0, top: 8, bottom: 8, width: 2,
                background: 'linear-gradient(to bottom, #FF6B1A, #FFB830, rgba(255,184,48,0.1))',
                borderRadius: 1,
              }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {MILESTONES.map((m, i) => (
                  <motion.div
                    key={m.year}
                    initial={{ opacity: 0, x: 16 }}
                    animate={midIn ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    style={{ position: 'relative' }}
                  >
                    {/* Dot */}
                    <div style={{
                      position: 'absolute', left: '-2.45rem', top: 5,
                      width: 10, height: 10, borderRadius: '50%',
                      background: 'var(--gradient-sun)',
                      border: '2px solid #060A0F',
                      boxShadow: '0 0 10px rgba(255,107,26,0.6)',
                    }} />
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
                      <span style={{
                        fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800,
                        fontSize: '1rem', color: 'var(--brand-orange)', flexShrink: 0,
                      }}>{m.year}</span>
                      <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                        {m.event}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

      </div>

      <style>{`
        @keyframes aSunPulse { 0%,100%{opacity:0.7;transform:scale(1)}    50%{opacity:1;transform:scale(1.05)} }
        @keyframes aOrbitCW  { from{transform:rotate(0deg)}                to{transform:rotate(360deg)}  }
        @keyframes aOrbitCCW { from{transform:rotate(0deg)}                to{transform:rotate(-360deg)} }
        @media(max-width:860px){
          .about-txt-cols { grid-template-columns:1fr !important; }
          .about-mid-cols { grid-template-columns:1fr !important; }
        }
      `}</style>
    </section>
  )
}
