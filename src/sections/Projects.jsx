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
  return (
    <section id="projects" ref={containerRef} style={{
      position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(175deg, #060A0F 0%, #0A1020 50%, #060A0F 100%)',
      padding: 'clamp(2rem, 3vh, 3rem) 0',
      minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center',
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
        <div ref={headRef} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <motion.span className="section-tag"
              initial={{ opacity: 0, y: 20 }} animate={headIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
              Our Projects
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 28 }} animate={headIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.1 }}
              style={{ fontSize: 'clamp(1.5rem, 3.2vw, 2.2rem)' }}
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
          style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}
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

        {/* ── Project grid ── */}
        <div ref={gridRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }} className="proj-grid">
          <AnimatePresence>
            {filteredProjects
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
                  {/* Landscape: image left, info right */}
                  <div style={{ display: 'flex', height: '100%' }}>
                    {/* Image column */}
                    <div style={{
                      width: 110, flexShrink: 0, position: 'relative',
                      background: `linear-gradient(145deg, ${TYPE_BG[p.type]}22 0%, #060A0F 100%)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      borderRight: `1px solid ${TYPE_BG[p.type]}22`,
                    }}>
                      {p.img
                        ? <img src={p.img} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
                        : <div style={{ fontSize: '2rem', opacity: 0.5 }}>
                            {p.type === 'PM-KUSUM' ? '🌾' : p.type === 'Industrial' ? '🏭' : p.type === 'Commercial' ? '🏢' : '🏠'}
                          </div>
                      }
                      {/* Left accent bar */}
                      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: TYPE_BG[p.type] || 'var(--brand-orange)', borderRadius: '3px 0 0 3px' }} />
                    </div>

                    {/* Info column */}
                    <div style={{ flex: 1, padding: '0.85rem 1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 0 }}>
                      {/* Type + capacity row */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
                        <span style={{
                          background: TYPE_BG[p.type] || 'var(--brand-orange)',
                          color: '#fff', fontSize: '0.58rem', fontWeight: 800,
                          padding: '0.15rem 0.55rem', borderRadius: 100,
                        }}>{p.type}</span>
                        <span style={{
                          background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)',
                          color: 'var(--brand-amber)', fontSize: '0.62rem', fontWeight: 700,
                          padding: '0.15rem 0.55rem', borderRadius: 100,
                          border: '1px solid rgba(255,184,48,0.25)',
                        }}>{p.capacity}</span>
                      </div>
                      <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.18rem', lineHeight: 1.25, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {p.title}
                      </h3>
                      <p style={{ fontSize: '0.68rem', color: TYPE_BG[p.type] || 'var(--brand-orange)', fontWeight: 600, marginBottom: '0.45rem' }}>
                        📍 {p.location} · {p.year}
                      </p>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                        {p.highlights.map(h => (
                          <li key={h} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.35rem', fontSize: '0.68rem', color: 'var(--text-muted)', lineHeight: 1.35 }}>
                            <span style={{ color: TYPE_BG[p.type] || 'var(--brand-orange)', flexShrink: 0 }}>▸</span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={gridIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.4 }}
          style={{ textAlign: 'center', marginTop: '1.5rem' }}
        >
          <a href="#contact" className="btn-outline">Discuss Your Project →</a>
        </motion.div>
      </div>

      <style>{`
        @media(max-width:900px){
          .proj-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media(max-width:560px){
          .proj-grid { grid-template-columns: 1fr !important; }
          .proj-subhead { text-align:left !important; }
        }
      `}</style>
    </section>
  )
}
