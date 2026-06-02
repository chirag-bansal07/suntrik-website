import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const projects = [
  {
    id: 1, title: 'Industrial Rooftop EPC',
    location: 'Faridabad, Haryana', capacity: '180 kWp',
    type: 'Industrial', year: '2024',
    desc: 'Turnkey rooftop installation on a steel fabrication plant — including net-metering approval, structure engineering, and 5-year AMC.',
    img: null,
  },
  {
    id: 2, title: 'Commercial C&I Rooftop',
    location: 'Gurugram, Haryana', capacity: '300 kWp',
    type: 'Commercial', year: '2024',
    desc: 'Grid-tied system for a logistics warehouse with bifacial modules and real-time monitoring, reducing grid dependency by 74%.',
    img: null,
  },
  {
    id: 3, title: 'PM-KUSUM Agricultural Solar',
    location: 'Rohtak, Haryana', capacity: '50 kWp',
    type: 'Agricultural', year: '2023',
    desc: 'Ground-mount installation under PM-KUSUM scheme for a farmer group — fully subsidised design, procurement, and installation.',
    img: null,
  },
  {
    id: 4, title: 'Residential Rooftop Cluster',
    location: 'Panipat, Haryana', capacity: '10–25 kWp',
    type: 'Residential', year: '2024',
    desc: 'Batch installation of 22 rooftop systems for a gated community under PM Surya Ghar Muft Bijli Yojana — subsidy handled end-to-end.',
    img: null,
  },
]

const typeColors = { Industrial: '#8B5CF6', Commercial: '#3B82F6', Agricultural: '#10B981', Residential: '#FF6B1A' }

export default function Projects() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] })
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '-8%'])
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%',  '8%'])

  const { ref, inView } = useScrollAnimation(0.08)

  return (
    <section id="projects" ref={containerRef} style={{ background: 'var(--bg-elevated)', padding: '7rem 0', overflow: 'hidden' }}>
      <div className="container">
        {/* Header */}
        <div ref={ref} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <motion.span className="section-tag"
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
              Our Projects
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.1 }}
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Proven Across <span className="gradient-text">North India</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
            style={{ color: 'var(--text-secondary)', maxWidth: 340, lineHeight: 1.75 }}
          >
            From single rooftops to cluster deployments and agricultural solar schemes — a sample of what we've delivered.
          </motion.p>
        </div>

        {/* Staggered parallax grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="projects-grid">
          <motion.div style={{ y: y1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {projects.filter((_, i) => i % 2 === 0).map((p, i) => (
              <ProjectCard key={p.id} project={p} delay={i * 0.15} inView={inView} />
            ))}
          </motion.div>
          <motion.div style={{ y: y2, display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '2.5rem' }}>
            {projects.filter((_, i) => i % 2 !== 0).map((p, i) => (
              <ProjectCard key={p.id} project={p} delay={i * 0.15 + 0.1} inView={inView} />
            ))}
          </motion.div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <a href="#contact" className="btn-outline">Discuss Your Project</a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .projects-grid { grid-template-columns: 1fr !important; }
          .projects-grid > div:last-child { margin-top: 0 !important; }
        }
      `}</style>
    </section>
  )
}

function ProjectCard({ project: p, delay, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      style={{
        borderRadius: 12, overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.07)',
        background: 'rgba(255,255,255,0.03)',
        transition: 'border-color 0.25s', cursor: 'pointer',
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,107,26,0.25)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
    >
      {/* Image area */}
      <div style={{
        aspectRatio: '16/10',
        background: 'linear-gradient(135deg, var(--bg-surface), var(--bg-deep))',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative',
      }}>
        {p.img
          ? <img src={p.img} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🏭</div>
              <p style={{ fontSize: '0.7rem' }}>Project photo</p>
            </div>
        }
        <span style={{
          position: 'absolute', top: 12, left: 12,
          background: typeColors[p.type] || 'var(--brand-orange)',
          color: '#fff', fontSize: '0.7rem', fontWeight: 700,
          padding: '0.2rem 0.75rem', borderRadius: 100,
        }}>{p.type}</span>
        <span style={{
          position: 'absolute', top: 12, right: 12,
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
          color: 'var(--brand-amber)', fontSize: '0.75rem', fontWeight: 700,
          padding: '0.2rem 0.75rem', borderRadius: 100,
          border: '1px solid rgba(255,184,48,0.3)',
        }}>{p.capacity}</span>
      </div>

      {/* Info */}
      <div style={{ padding: '1.25rem' }}>
        <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem' }}>{p.title}</h3>
        <p style={{ fontSize: '0.78rem', color: 'var(--brand-orange)', fontWeight: 600, marginBottom: '0.65rem' }}>
          📍 {p.location} · {p.year}
        </p>
        <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{p.desc}</p>
      </div>
    </motion.div>
  )
}
