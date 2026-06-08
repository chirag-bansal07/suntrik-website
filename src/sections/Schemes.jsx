/**
 * Schemes — Government solar schemes spotlight
 * PM-KUSUM (featured large) + PM Surya Ghar + HAREDA
 */

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

// ── PM-KUSUM detail ───────────────────────────────────────────────────────
const KUSUM_STATS = [
  { val: '34,800 MW', label: 'Total Target Capacity' },
  { val: '₹34,422 Cr', label: 'Central Financial Support' },
  { val: '14 Lakh', label: 'Solar Pumps (Component B)' },
  { val: '35 Lakh', label: 'Pump Solarisations (Component C)' },
]

const KUSUM_SUNTRIK_ROLE = [
  'DPR preparation & HAREDA / RRECL / JDVVNL application',
  'Land suitability assessment & layout design',
  'MNRE Tier-1 component procurement',
  'Complete turnkey EPC installation',
  'DISCOM grid connectivity & power purchase agreement',
  'Central + State subsidy disbursement coordination',
  '25-year O&M, remote monitoring & performance reporting',
]

const KUSUM_COMPONENTS = [
  {
    id: 'A',
    label: 'Component A',
    title: 'Decentralised Ground-Mounted Solar Plants',
    target: '10,000 MW',
    desc: 'Solar power plants of 500 kW–2 MW set up by farmers, FPOs, cooperatives or panchayats on barren/fallow land within 5 km of a substation. Power is sold to DISCOMs at a discovered tariff. Landowners earn lease rent + solar revenue.',
    subsidy: 'Revenue Model',
    detail: 'DISCOM incentive: 40p/kWh or ₹6.60 lakh/MW/yr (5 yrs). No upfront subsidy — farmer earns from land lease + power sale.',
    who: 'Farmers, FPOs, Panchayats, Cooperatives, WUAs',
    color: '#8B5CF6',
    progress: '650 MW installed',
  },
  {
    id: 'B',
    label: 'Component B',
    title: 'Standalone Solar Agriculture Pumps',
    target: '14 Lakh Pumps',
    desc: 'Replace diesel/grid pumps with standalone solar pumps (up to 15 HP) in off-grid or low-grid areas. No electricity bill ever — directly powered by the sun for irrigation.',
    subsidy: 'Only 10% Farmer Share',
    detail: '30% Central subsidy + 30% State subsidy + 30% bank loan = farmer pays only 10% out of pocket. Special states (NE, J&K, HP, Uttarakhand): 50% Central + 30% State.',
    who: 'Individual farmers without reliable grid access',
    color: '#10B981',
    progress: '9+ Lakh pumps installed',
  },
  {
    id: 'C',
    label: 'Component C',
    title: 'Solarisation of Grid-Connected Pumps',
    target: '35 Lakh Pumps',
    desc: 'Add solar panels to existing grid-connected pumps. The system generates 2× the pump\'s energy need — surplus power is sold back to the DISCOM, turning your pump into an income source.',
    subsidy: '60% Direct Subsidy',
    detail: '30% Central + 30% State subsidy. Farmer pays 40% (30% bank loan + 10% own). Feeder-level solarisation also available at ₹1.05 Cr/MW under CAPEX or RESCO mode.',
    who: 'Farmers with existing grid-connected pumps',
    color: '#3B82F6',
    progress: '9+ Lakh pumps solarised',
  },
]

// ── PM Surya Ghar ─────────────────────────────────────────────────────────
const SURYA_GHAR_SLABS = [
  { range: 'Up to 2 kW', central: '₹30,000/kW', state: '+30%', max: '₹60,000' },
  { range: '2–3 kW',     central: '₹18,000/kW', state: '+30%', max: '₹78,000' },
  { range: '3–10 kW',    central: '40% subsidy', state: 'varies', max: '40%' },
]

// ── Other schemes ─────────────────────────────────────────────────────────
const OTHER_SCHEMES = [
  {
    title: 'HAREDA Empanelment',
    badge: 'State Approved',
    badgeColor: '#3B82F6',
    desc: 'Suntrik is empanelled with the Haryana Renewable Energy Development Agency — the state nodal agency for all solar approvals, net-metering, and scheme implementation in Haryana.',
    points: ['Net-metering applications', 'HAREDA project sanctions', 'State subsidy disbursement', 'DISCOM grid-interconnection'],
  },
  {
    title: 'MNRE Empanelled Installer',
    badge: 'Central Approved',
    badgeColor: '#FF6B1A',
    desc: 'Recognised by the Ministry of New and Renewable Energy — a requirement for accessing central government subsidies, MNRE-tied financing, and Tier-1 component procurement.',
    points: ['PM-KUSUM central subsidy', 'PM Surya Ghar central subsidy', 'MNRE Tier-1 module procurement', 'NISE-certified engineering team'],
  },
]

export default function Schemes() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  const { ref: headRef,  inView: headIn  } = useScrollAnimation(0.08)
  const { ref: kusumRef, inView: kusumIn } = useScrollAnimation(0.06)
  const { ref: sghRef,   inView: sghIn   } = useScrollAnimation(0.08)
  const { ref: otherRef, inView: otherIn } = useScrollAnimation(0.1)

  return (
    <section
      id="schemes"
      ref={sectionRef}
      style={{
        position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(175deg, #060A0F 0%, #071510 60%, #060A0F 100%)',
        padding: '9rem 0',
      }}
    >
      {/* ── Parallax green glow (agriculture / nature) ── */}
      <motion.div style={{ y: bgY, position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: '10%', left: '-5%',
          width: 700, height: 700, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '5%', right: '5%',
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,107,26,0.07) 0%, transparent 65%)',
          filter: 'blur(50px)',
        }} />
      </motion.div>

      {/* Subtle grid */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(rgba(16,185,129,0.06) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Header ── */}
        <div ref={headRef} style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
          <motion.span
            className="section-tag" style={{ justifyContent: 'center', color: '#10B981' }}
            initial={{ opacity: 0, y: 20 }} animate={headIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
          >Government Schemes</motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 28 }} animate={headIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.1 }}
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem' }}
          >
            Maximise Your <span className="gradient-text">Solar Subsidy</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }} animate={headIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
            style={{ color: 'var(--text-secondary)', maxWidth: 580, margin: '0 auto', lineHeight: 1.8 }}
          >
            India's government offers substantial subsidies for solar adoption. Suntrik handles every
            portal, approval, and inspection so you receive your full entitlement — without the paperwork burden.
          </motion.p>
        </div>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* ── PM-KUSUM — FEATURED LARGE CARD ── */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <motion.div
          ref={kusumRef}
          initial={{ opacity: 0, y: 50 }}
          animate={kusumIn ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          style={{
            borderRadius: 20, overflow: 'hidden',
            border: '1px solid rgba(16,185,129,0.2)',
            background: 'rgba(16,185,129,0.03)',
            marginBottom: '3rem',
          }}
        >
          {/* Header band */}
          <div style={{
            background: 'linear-gradient(90deg, rgba(16,185,129,0.15) 0%, rgba(16,185,129,0.05) 100%)',
            borderBottom: '1px solid rgba(16,185,129,0.15)',
            padding: '2rem 2.5rem',
          }}>
            {/* Top row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem', flexWrap: 'wrap' }}>
                  <span style={{
                    fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.16em',
                    textTransform: 'uppercase', color: '#10B981',
                    background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)',
                    padding: '0.25rem 0.75rem', borderRadius: 100,
                  }}>Government of India · MNRE</span>
                  <span style={{
                    fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.12em',
                    textTransform: 'uppercase', color: '#FFB830',
                    background: 'rgba(255,184,48,0.1)', border: '1px solid rgba(255,184,48,0.2)',
                    padding: '0.25rem 0.75rem', borderRadius: 100,
                  }}>Suntrik Executing 85 MWp+</span>
                  <span style={{
                    fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.12em',
                    textTransform: 'uppercase', color: '#94A3B8',
                    background: 'rgba(148,163,184,0.08)', border: '1px solid rgba(148,163,184,0.18)',
                    padding: '0.25rem 0.75rem', borderRadius: 100,
                  }}>Extended to March 2026</span>
                </div>
                <h3 style={{
                  fontFamily: 'Space Grotesk, sans-serif', fontWeight: 900,
                  fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: '#fff', marginBottom: '0.3rem',
                }}>PM-KUSUM</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                  Pradhan Mantri Kisan Urja Suraksha evam Utthaan Mahabhiyan
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 900,
                  fontFamily: 'Space Grotesk, sans-serif',
                  background: 'linear-gradient(135deg, #10B981, #34D399)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1,
                }}>Only 10%</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', marginTop: 4 }}>farmer out-of-pocket cost</div>
              </div>
            </div>
            {/* Scheme stats strip */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem' }} className="kusum-stats">
              {KUSUM_STATS.map(s => (
                <div key={s.label} style={{
                  background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.15)',
                  borderRadius: 10, padding: '0.85rem 1rem', textAlign: 'center',
                }}>
                  <div style={{
                    fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '1.1rem',
                    color: '#34D399', lineHeight: 1, marginBottom: '0.25rem',
                  }}>{s.val}</div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', lineHeight: 1.3 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ padding: '2.5rem', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem', alignItems: 'start' }} className="kusum-inner">
            {/* Left: 3 components */}
            <div>
              <h4 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1rem', marginBottom: '1.5rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Scheme Components
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {KUSUM_COMPONENTS.map((c, i) => (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={kusumIn ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
                    style={{
                      padding: '1.25rem 1.4rem', borderRadius: 12,
                      background: 'rgba(255,255,255,0.03)',
                      border: `1px solid ${c.color}28`,
                      position: 'relative', overflow: 'hidden',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <div>
                        <span style={{ fontSize: '0.64rem', fontWeight: 700, color: c.color, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                          {c.label} · Target: {c.target}
                        </span>
                        <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '0.94rem', marginTop: 2 }}>
                          {c.title}
                        </div>
                      </div>
                      <div style={{
                        fontSize: '0.88rem', fontWeight: 900, fontFamily: 'Space Grotesk, sans-serif',
                        color: c.color, flexShrink: 0, marginLeft: '1rem', textAlign: 'right',
                      }}>{c.subsidy}</div>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '0.5rem' }}>
                      {c.desc}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '0.55rem', fontStyle: 'italic' }}>
                      {c.detail}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.4rem' }}>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <span style={{ color: c.color }}>●</span> {c.who}
                      </span>
                      <span style={{
                        fontSize: '0.65rem', fontWeight: 700, color: c.color,
                        background: `${c.color}15`, border: `1px solid ${c.color}30`,
                        padding: '0.15rem 0.55rem', borderRadius: 100,
                      }}>✓ {c.progress}</span>
                    </div>
                    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: c.color, borderRadius: '3px 0 0 3px' }} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: Suntrik's role */}
            <div>
              <h4 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1rem', marginBottom: '1.5rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                What Suntrik Handles
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.8, marginBottom: '1.4rem' }}>
                We are an <strong style={{ color: '#10B981' }}>HAREDA-empanelled PM-KUSUM installer</strong>.
                Our team manages every step — from the initial DPR to final power purchase agreement
                — so farmers receive the full benefit without navigating bureaucracy alone.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {KUSUM_SUNTRIK_ROLE.map((r, i) => (
                  <motion.li
                    key={r}
                    initial={{ opacity: 0, x: 16 }}
                    animate={kusumIn ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.45, delay: 0.4 + i * 0.07 }}
                    style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.855rem', color: 'var(--text-secondary)' }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
                      <circle cx="8" cy="8" r="7" stroke="#10B981" strokeWidth="1.2"/>
                      <path d="M5 8l2 2 4-4" stroke="#10B981" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {r}
                  </motion.li>
                ))}
              </ul>
              <div style={{ marginTop: '2rem' }}>
                <a href="#contact" className="btn-primary" style={{
                  background: 'linear-gradient(135deg, #10B981, #059669)',
                  boxShadow: '0 8px 32px rgba(16,185,129,0.3)',
                }}>
                  Get PM-KUSUM Advisory →
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── PM Surya Ghar ── */}
        <div ref={sghRef} style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '1.75rem', marginBottom: '1.75rem', alignItems: 'start' }} className="sgh-grid">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={sghIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              borderRadius: 16, overflow: 'hidden',
              border: '1px solid rgba(255,107,26,0.18)',
              background: 'rgba(255,107,26,0.03)',
            }}
          >
            {/* Header */}
            <div style={{
              background: 'linear-gradient(90deg, rgba(255,107,26,0.12) 0%, transparent 100%)',
              borderBottom: '1px solid rgba(255,107,26,0.12)',
              padding: '1.75rem 2rem',
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem',
            }}>
              <div>
                <span style={{
                  fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: 'var(--brand-orange)', background: 'rgba(255,107,26,0.1)',
                  border: '1px solid rgba(255,107,26,0.2)', padding: '0.2rem 0.65rem', borderRadius: 100,
                  display: 'inline-block', marginBottom: '0.6rem',
                }}>For Homeowners</span>
                <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 900, fontSize: '1.5rem' }}>
                  PM Surya Ghar<br />
                  <span className="gradient-text">Muft Bijli Yojana</span>
                </h3>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  fontSize: '2.2rem', fontWeight: 900, fontFamily: 'Space Grotesk, sans-serif',
                  background: 'var(--gradient-sun)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1,
                }}>₹78,000</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: 3 }}>max central subsidy</div>
              </div>
            </div>

            <div style={{ padding: '1.75rem 2rem' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.8, marginBottom: '1.4rem' }}>
                Central government rooftop solar subsidy for residential households. Suntrik handles
                the national portal registration, DISCOM approval, and subsidy disbursement — end-to-end.
              </p>
              {/* Subsidy slabs table */}
              <div style={{ border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, overflow: 'hidden', marginBottom: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', background: 'rgba(255,107,26,0.08)', padding: '0.6rem 1rem' }}>
                  {['System Size','Central Subsidy','State Top-up','Max Benefit'].map(h => (
                    <span key={h} style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--brand-orange)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</span>
                  ))}
                </div>
                {SURYA_GHAR_SLABS.map((s, i) => (
                  <div key={i} style={{
                    display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr',
                    padding: '0.7rem 1rem',
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                    background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)',
                  }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 600 }}>{s.range}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{s.central}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{s.state}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--brand-amber)', fontWeight: 700 }}>{s.max}</span>
                  </div>
                ))}
              </div>
              <a href="#contact" className="btn-outline" style={{ fontSize: '0.82rem', padding: '0.7rem 1.5rem' }}>
                Check My Eligibility →
              </a>
            </div>
          </motion.div>

          {/* Right: side cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {OTHER_SCHEMES.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, x: 30 }}
                animate={sghIn ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.65, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  borderRadius: 14, overflow: 'hidden',
                  border: `1px solid ${s.badgeColor}22`,
                  background: 'rgba(255,255,255,0.025)',
                  padding: '1.5rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <h4 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1rem' }}>{s.title}</h4>
                  <span style={{
                    fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
                    color: s.badgeColor, background: `${s.badgeColor}18`, border: `1px solid ${s.badgeColor}35`,
                    padding: '0.2rem 0.6rem', borderRadius: 100, flexShrink: 0, marginLeft: '0.75rem',
                  }}>{s.badge}</span>
                </div>
                <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.72, marginBottom: '1rem' }}>{s.desc}</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.38rem' }}>
                  {s.points.map(pt => (
                    <li key={pt} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.77rem', color: 'var(--text-muted)' }}>
                      <span style={{ color: s.badgeColor, fontSize: '0.6rem' }}>●</span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Bottom CTA bar ── */}
        <motion.div
          ref={otherRef}
          initial={{ opacity: 0, y: 24 }}
          animate={otherIn ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          style={{
            borderRadius: 14, padding: '2rem 2.5rem',
            background: 'linear-gradient(90deg, rgba(255,107,26,0.08) 0%, rgba(255,184,48,0.05) 100%)',
            border: '1px solid rgba(255,107,26,0.18)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '1.15rem', marginBottom: '0.35rem' }}>
              Not sure which scheme applies to you?
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Our team will assess your eligibility for every applicable central and state programme — for free.
            </p>
          </div>
          <a href="#contact" className="btn-primary" style={{ flexShrink: 0 }}>
            Get Free Scheme Advisory →
          </a>
        </motion.div>
      </div>

      <style>{`
        @media(max-width:900px){
          .kusum-inner  { grid-template-columns:1fr !important; }
          .sgh-grid     { grid-template-columns:1fr !important; }
          .kusum-stats  { grid-template-columns:1fr 1fr !important; }
        }
        @media(max-width:480px){
          .kusum-stats  { grid-template-columns:1fr !important; }
        }
      `}</style>
    </section>
  )
}
