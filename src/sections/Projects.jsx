/**
 * Projects — PM-KUSUM featured showcase + project grid
 * Filter tabs by project type
 */

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const PROJECTS = [
  {
    id: 1,
    title: 'PM-KUSUM Ground-Mount Solar',
    location: 'Rohtak, Haryana',
    capacity: '50 kWp',
    type: 'PM-KUSUM',
    year: '2023',
    featured: true,
    schemeSubsidy: '90%',
    desc: 'Turnkey ground-mount installation for a farmer collective under PM-KUSUM Component B. Suntrik managed the complete DPR preparation, HAREDA empanelment, DISCOM grid interconnection, and subsidy disbursement — freeing the farmers from all bureaucratic burden.',
    highlights: [
      'HAREDA sanction obtained in 3 weeks',
      'Complete MNRE Tier-1 component supply',
      'Power purchase agreement with DHBVN',
      'System live within 45 days of sanction',
    ],
    img: null,
    typeColor: '#10B981',
  },
  {
    id: 2,
    title: 'Industrial Rooftop EPC',
    location: 'Faridabad, Haryana',
    capacity: '180 kWp',
    type: 'Industrial',
    year: '2024',
    featured: false,
    desc: 'Turnkey rooftop installation on a steel fabrication plant — including shadow analysis, net-metering approval, structural engineering, and a 5-year AMC. Grid dependency reduced by 68% in month one.',
    highlights: ['DHBVN net-metering in 18 days', 'PVsyst-verified yield', '5-year AMC signed'],
    img: null,
    typeColor: '#8B5CF6',
  },
  {
    id: 3,
    title: 'Commercial Logistics Hub',
    location: 'Gurugram, Haryana',
    capacity: '300 kWp',
    type: 'Commercial',
    year: '2024',
    featured: false,
    desc: 'Grid-tied system for a logistics warehouse with bifacial modules and real-time monitoring dashboard. Grid dependency reduced by 74%. Plant is performing above the guaranteed yield.',
    highlights: ['Bifacial module configuration', '24/7 monitoring portal', '74% grid dependency reduction'],
    img: null,
    typeColor: '#3B82F6',
  },
  {
    id: 4,
    title: 'Residential Colony Cluster',
    location: 'Panipat, Haryana',
    capacity: '10–25 kWp',
    type: 'Residential',
    year: '2024',
    featured: false,
    desc: '22 rooftop systems installed for a gated community under PM Surya Ghar Muft Bijli Yojana — subsidy handled end-to-end, from national portal registration to disbursement.',
    highlights: ['PM Surya Ghar subsidy', '22 homes in 60 days', 'Subsidy disbursement handled'],
    img: null,
    typeColor: '#FF6B1A',
  },
  {
    id: 5,
    title: 'PM-KUSUM Solar Pump Cluster',
    location: 'Hisar, Haryana',
    capacity: '35 kWp',
    type: 'PM-KUSUM',
    year: '2023',
    featured: false,
    desc: 'Component B installation replacing diesel irrigation pumps for 8 farmer families. 100% elimination of irrigation electricity cost. HAREDA and state subsidy of 90% availed.',
    highlights: ['8 solar pump installations', '90% subsidy availed', 'Zero irrigation cost achieved'],
    img: null,
    typeColor: '#10B981',
  },
  {
    id: 6,
    title: 'C&I Rooftop + Net Metering',
    location: 'Sonipat, Haryana',
    capacity: '120 kWp',
    type: 'Commercial',
    year: '2024',
    featured: false,
    desc: 'Grid-tied commercial rooftop on a textile manufacturing unit. DHEVCL net-metering approved. System generating net credits of ₹1.8 lakh per month for the client.',
    highlights: ['Net-metering credit ₹1.8L/mo', 'Textile plant rooftop', 'DHEVCL approved'],
    img: null,
    typeColor: '#3B82F6',
  },
]

const FILTERS = ['All', 'PM-KUSUM', 'Industrial', 'Commercial', 'Residential']
const TYPE_BG  = { 'PM-KUSUM': '#10B981', Industrial: '#8B5CF6', Commercial: '#3B82F6', Residential: '#FF6B1A' }

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  const { ref: headRef, inView: headIn } = useScrollAnimation(0.08)
  const { ref: gridRef, inView: gridIn  } = useScrollAnimation(0.05)

  const filteredProjects = PROJECTS.filter(p =>
    activeFilter === 'All' || p.type === activeFilter
  )
  const featured  = PROJECTS.find(p => p.featured)
  const showFeatured = activeFilter === 'All' || activeFilter === 'PM-KUSUM'

  return (
    <section id="projects" ref={containerRef} style={{
      position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(175deg, #060A0F 0%, #0A1020 50%, #060A0F 100%)',
      padding: '9rem 0',
    }}>
      {/* Background glow */}
      <motion.div style={{ y: bgY, position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: '20%', right: '10%',
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,107,26,0.06) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }} />
      </motion.div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Header ── */}
        <div ref={headRef} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <motion.span className="section-tag"
              initial={{ opacity: 0, y: 20 }} animate={headIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
              Our Projects
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 28 }} animate={headIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.1 }}
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Proven Across <span className="gradient-text">North India</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 18 }} animate={headIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
            style={{ color: 'var(--text-secondary)', maxWidth: 360, lineHeight: 1.75, textAlign: 'right' }}
            className="proj-subhead"
          >
            From single rooftops to farmer cluster deployments and PM-KUSUM agricultural solar schemes.
          </motion.p>
        </div>

        {/* ── Filter tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={headIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.25 }}
          style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '3rem' }}
        >
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                padding: '0.5rem 1.25rem', borderRadius: 100,
                border: '1px solid',
                borderColor: activeFilter === f ? 'transparent' : 'rgba(255,255,255,0.12)',
                background: activeFilter === f ? 'var(--gradient-sun)' : 'transparent',
                color: activeFilter === f ? '#fff' : 'var(--text-secondary)',
                fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer',
                transition: 'all 0.25s ease',
                fontFamily: 'inherit',
              }}
            >{f}</button>
          ))}
        </motion.div>

        {/* ══════════════════════════════════════════════════════════ */}
        {/* Featured PM-KUSUM card */}
        {/* ══════════════════════════════════════════════════════════ */}
        <AnimatePresence mode="wait">
          {showFeatured && featured && (
            <motion.div
              key="featured"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              style={{
                borderRadius: 20, overflow: 'hidden',
                border: '1px solid rgba(16,185,129,0.22)',
                background: 'rgba(16,185,129,0.03)',
                marginBottom: '2rem',
              }}
            >
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr',
                minHeight: 340,
              }} className="featured-proj-cols">
                {/* Image side */}
                <div style={{
                  background: 'linear-gradient(135deg, #071a12 0%, #0d2b1c 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative', minHeight: 300,
                }}>
                  {/* Placeholder — swap with <img src="/projects/kusum-rohtak.jpg" ... /> */}
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '0.75rem' }}>🌾</div>
                    <div style={{ color: '#10B981', fontSize: '0.8rem', fontWeight: 600 }}>Project photo coming soon</div>
                  </div>
                  {/* Badges */}
                  <span style={{
                    position: 'absolute', top: 16, left: 16,
                    background: '#10B981', color: '#fff', fontSize: '0.7rem', fontWeight: 800,
                    padding: '0.28rem 0.9rem', borderRadius: 100, letterSpacing: '0.08em',
                  }}>{featured.type}</span>
                  <span style={{
                    position: 'absolute', top: 16, right: 16,
                    background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)',
                    color: '#FFB830', fontSize: '0.78rem', fontWeight: 800,
                    padding: '0.28rem 0.9rem', borderRadius: 100,
                    border: '1px solid rgba(255,184,48,0.3)',
                  }}>{featured.capacity}</span>
                  <span style={{
                    position: 'absolute', bottom: 16, left: 16,
                    background: 'rgba(16,185,129,0.15)', backdropFilter: 'blur(6px)',
                    color: '#10B981', fontSize: '0.7rem', fontWeight: 700,
                    padding: '0.28rem 0.9rem', borderRadius: 100,
                    border: '1px solid rgba(16,185,129,0.3)',
                  }}>Subsidy availed: {featured.schemeSubsidy}</span>
                </div>

                {/* Info side */}
                <div style={{ padding: '2.25rem 2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <span style={{
                    fontSize: '0.64rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em',
                    color: '#10B981', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)',
                    padding: '0.2rem 0.65rem', borderRadius: 100,
                    display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                    width: 'fit-content', marginBottom: '1rem',
                  }}>
                    ★ Featured Project
                  </span>
                  <h3 style={{
                    fontFamily: 'Space Grotesk, sans-serif', fontWeight: 900,
                    fontSize: 'clamp(1.3rem, 2.5vw, 1.75rem)', marginBottom: '0.5rem',
                  }}>{featured.title}</h3>
                  <p style={{ fontSize: '0.82rem', color: '#10B981', fontWeight: 600, marginBottom: '1rem', display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                    <span>📍 {featured.location}</span>
                    <span>· {featured.year}</span>
                  </p>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.78, marginBottom: '1.4rem' }}>
                    {featured.desc}
                  </p>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                    {featured.highlights.map(h => (
                      <li key={h} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
                          <circle cx="7.5" cy="7.5" r="6.5" stroke="#10B981" strokeWidth="1.1"/>
                          <path d="M4.5 7.5l2 2 4-4" stroke="#10B981" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Project grid ── */}
        <div ref={gridRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.4rem' }}>
          <AnimatePresence>
            {filteredProjects
              .filter(p => !p.featured || activeFilter !== 'All')
              .map((p, i) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.55, delay: gridIn ? i * 0.07 : 0, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -5 }}
                  style={{
                    borderRadius: 12, overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.07)',
                    background: 'rgba(255,255,255,0.03)',
                    cursor: 'pointer',
                    transition: 'border-color 0.25s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = `${TYPE_BG[p.type] ?? 'rgba(255,107,26,0.3)'}44`}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
                >
                  {/* Image area */}
                  <div style={{
                    aspectRatio: '16/10', position: 'relative',
                    background: `linear-gradient(135deg, ${TYPE_BG[p.type]}18 0%, #060A0F 100%)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {p.img
                      ? <img src={p.img} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
                      : <div style={{ fontSize: '2.5rem', opacity: 0.4 }}>
                          {p.type === 'PM-KUSUM' ? '🌾' : p.type === 'Industrial' ? '🏭' : p.type === 'Commercial' ? '🏢' : '🏠'}
                        </div>
                    }
                    <span style={{
                      position: 'absolute', top: 10, left: 10,
                      background: TYPE_BG[p.type] || 'var(--brand-orange)',
                      color: '#fff', fontSize: '0.68rem', fontWeight: 800,
                      padding: '0.22rem 0.7rem', borderRadius: 100,
                    }}>{p.type}</span>
                    <span style={{
                      position: 'absolute', top: 10, right: 10,
                      background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
                      color: 'var(--brand-amber)', fontSize: '0.73rem', fontWeight: 800,
                      padding: '0.22rem 0.7rem', borderRadius: 100,
                      border: '1px solid rgba(255,184,48,0.3)',
                    }}>{p.capacity}</span>
                  </div>

                  {/* Info */}
                  <div style={{ padding: '1.2rem 1.35rem' }}>
                    <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.99rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                      {p.title}
                    </h3>
                    <p style={{ fontSize: '0.76rem', color: TYPE_BG[p.type] || 'var(--brand-orange)', fontWeight: 600, marginBottom: '0.6rem' }}>
                      📍 {p.location} · {p.year}
                    </p>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
                      {p.desc}
                    </p>
                    {/* Highlights */}
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.32rem' }}>
                      {p.highlights.map(h => (
                        <li key={h} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem', fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                          <span style={{ color: TYPE_BG[p.type] || 'var(--brand-orange)', flexShrink: 0 }}>▸</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom accent */}
                  <div style={{ height: 2, background: `linear-gradient(90deg, ${TYPE_BG[p.type] ?? '#FF6B1A'}, transparent)` }} />
                </motion.div>
              ))}
          </AnimatePresence>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={gridIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.4 }}
          style={{ textAlign: 'center', marginTop: '3.5rem' }}
        >
          <a href="#contact" className="btn-outline">Discuss Your Project →</a>
        </motion.div>
      </div>

      <style>{`
        @media(max-width:768px){
          .featured-proj-cols { grid-template-columns:1fr !important; }
          .proj-subhead { text-align:left !important; }
        }
      `}</style>
    </section>
  )
}
