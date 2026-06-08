/**
 * Schemes — Government solar schemes spotlight
 * Tab-based layout: PM-KUSUM | PM Surya Ghar | Accreditations
 * Each tab fits in one 100vh screen
 */

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

// ── PM-KUSUM detail ───────────────────────────────────────────────────────
const KUSUM_STATS = [
  { val: '34,800 MW', label: 'Total Target Capacity' },
  { val: '₹34,422 Cr', label: 'Central Financial Support' },
  { val: '14 Lakh', label: 'Solar Pumps (Comp. B)' },
  { val: '35 Lakh', label: 'Pump Solarisations (Comp. C)' },
]

const KUSUM_SUNTRIK_ROLE = [
  'DPR preparation & HAREDA / RRECL / JDVVNL application',
  'Land assessment, layout design & MNRE Tier-1 procurement',
  'Complete turnkey EPC installation by certified teams',
  'DISCOM grid connectivity & power purchase agreement',
  'Central + State subsidy disbursement coordination',
  '25-year O&M, remote monitoring & performance reporting',
]

const KUSUM_COMPONENTS = [
  {
    id: 'A', label: 'Component A', title: 'Decentralised Ground-Mounted Solar',
    target: '10,000 MW', subsidy: 'Revenue Model',
    detail: 'DISCOM incentive: 40p/kWh or ₹6.60 lakh/MW/yr (5 yrs). Farmers earn from land lease + power sale.',
    who: 'Farmers, FPOs, Panchayats, Cooperatives', color: '#8B5CF6', progress: '650 MW installed',
  },
  {
    id: 'B', label: 'Component B', title: 'Standalone Solar Agriculture Pumps',
    target: '14 Lakh Pumps', subsidy: 'Only 10% Farmer Share',
    detail: '30% Central + 30% State + 30% bank loan. Special states (NE, J&K, HP, UK): 50% Central + 30% State.',
    who: 'Farmers without reliable grid access', color: '#10B981', progress: '9+ Lakh pumps installed',
  },
  {
    id: 'C', label: 'Component C', title: 'Solarisation of Grid-Connected Pumps',
    target: '35 Lakh Pumps', subsidy: '60% Direct Subsidy',
    detail: '30% Central + 30% State subsidy. Surplus power sold back — turns your pump into an income source.',
    who: 'Farmers with existing grid-connected pumps', color: '#3B82F6', progress: '9+ Lakh pumps solarised',
  },
]

// ── PM Surya Ghar ─────────────────────────────────────────────────────────
const SURYA_GHAR_SLABS = [
  { range: 'Up to 2 kW', central: '₹30,000/kW', max: '₹60,000' },
  { range: '2–3 kW',     central: '₹18,000/kW', max: '₹78,000' },
  { range: '3–10 kW',    central: '40% subsidy', max: '40%' },
]

// ── Accreditations ────────────────────────────────────────────────────────
const ACCRED = [
  {
    title: 'HAREDA Empanelment',
    badge: 'State Approved', badgeColor: '#3B82F6',
    desc: 'Suntrik is empanelled with the Haryana Renewable Energy Development Agency — the state nodal agency for all solar approvals, net-metering, and scheme implementation in Haryana.',
    points: ['Net-metering applications', 'HAREDA project sanctions', 'State subsidy disbursement', 'DISCOM grid-interconnection'],
  },
  {
    title: 'MNRE Empanelled Installer',
    badge: 'Central Approved', badgeColor: '#FF6B1A',
    desc: 'Recognised by the Ministry of New and Renewable Energy — required for accessing central government subsidies, MNRE-tied financing, and Tier-1 component procurement.',
    points: ['PM-KUSUM central subsidy', 'PM Surya Ghar central subsidy', 'MNRE Tier-1 module procurement', 'NISE-certified engineering team'],
  },
]

const TABS = [
  { id: 'kusum',  label: 'PM-KUSUM',        icon: '🌾', color: '#10B981' },
  { id: 'surya',  label: 'PM Surya Ghar',   icon: '🏠', color: '#FF6B1A' },
  { id: 'accred', label: 'Accreditations',  icon: '✓',  color: '#3B82F6' },
]

// ─── Sub-panels ─────────────────────────────────────────────────────────────

function KusumPanel({ inView }) {
  return (
    <motion.div
      key="kusum"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35 }}
    >
      <div style={{
        borderRadius: 18, overflow: 'hidden',
        border: '1px solid rgba(16,185,129,0.2)',
        background: 'rgba(16,185,129,0.03)',
      }}>
        {/* Header band */}
        <div style={{
          background: 'linear-gradient(90deg, rgba(16,185,129,0.15) 0%, rgba(16,185,129,0.05) 100%)',
          borderBottom: '1px solid rgba(16,185,129,0.15)',
          padding: '1.1rem 1.75rem',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.9rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
                {[
                  { txt: 'MNRE · Govt of India', c: '#10B981', bg: 'rgba(16,185,129,0.12)', b: 'rgba(16,185,129,0.25)' },
                  { txt: 'Suntrik 85 MWp+ Executing', c: '#FFB830', bg: 'rgba(255,184,48,0.1)', b: 'rgba(255,184,48,0.2)' },
                  { txt: 'Extended to March 2026', c: '#94A3B8', bg: 'rgba(148,163,184,0.08)', b: 'rgba(148,163,184,0.18)' },
                ].map(b => (
                  <span key={b.txt} style={{
                    fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: b.c, background: b.bg, border: `1px solid ${b.b}`,
                    padding: '0.18rem 0.6rem', borderRadius: 100,
                  }}>{b.txt}</span>
                ))}
              </div>
              <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 900, fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', color: '#fff', lineHeight: 1.1 }}>
                PM-KUSUM
                <span style={{ display: 'block', fontSize: '0.72rem', fontWeight: 400, color: 'var(--text-secondary)', marginTop: 2 }}>
                  Pradhan Mantri Kisan Urja Suraksha evam Utthaan Mahabhiyan
                </span>
              </h3>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{
                fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)', fontWeight: 900, fontFamily: 'Space Grotesk, sans-serif',
                background: 'linear-gradient(135deg, #10B981, #34D399)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1,
              }}>Only 10%</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.72rem', marginTop: 2 }}>farmer out-of-pocket</div>
            </div>
          </div>
          {/* Stats strip */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '0.6rem' }} className="kusum-stats">
            {KUSUM_STATS.map(s => (
              <div key={s.label} style={{
                background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.15)',
                borderRadius: 8, padding: '0.55rem 0.75rem', textAlign: 'center',
              }}>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '0.95rem', color: '#34D399', lineHeight: 1, marginBottom: 2 }}>{s.val}</div>
                <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', lineHeight: 1.25 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '1.25rem 1.75rem', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem', alignItems: 'start' }} className="kusum-inner">
          {/* Left: 3 components */}
          <div>
            <div style={{ fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>Scheme Components</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {KUSUM_COMPONENTS.map(c => (
                <div key={c.id} style={{
                  padding: '0.8rem 1rem', borderRadius: 10,
                  background: 'rgba(255,255,255,0.03)', border: `1px solid ${c.color}28`,
                  position: 'relative', overflow: 'hidden',
                }}>
                  <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: c.color, borderRadius: '3px 0 0 3px' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.3rem' }}>
                    <div>
                      <span style={{ fontSize: '0.58rem', fontWeight: 700, color: c.color, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        {c.label} · {c.target}
                      </span>
                      <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '0.84rem', marginTop: 1 }}>{c.title}</div>
                    </div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 900, color: c.color, flexShrink: 0, marginLeft: '0.75rem' }}>{c.subsidy}</div>
                  </div>
                  <p style={{ fontSize: '0.73rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '0.35rem', fontStyle: 'italic' }}>{c.detail}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.3rem' }}>
                    <span style={{ fontSize: '0.64rem', color: 'var(--text-muted)' }}>
                      <span style={{ color: c.color }}>● </span>{c.who}
                    </span>
                    <span style={{ fontSize: '0.6rem', fontWeight: 700, color: c.color, background: `${c.color}15`, border: `1px solid ${c.color}30`, padding: '0.12rem 0.45rem', borderRadius: 100 }}>✓ {c.progress}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Suntrik role */}
          <div>
            <div style={{ fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>What Suntrik Handles</div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: 1.7, marginBottom: '0.9rem' }}>
              As an <strong style={{ color: '#10B981' }}>HAREDA-empanelled PM-KUSUM installer</strong>, we manage every step — from DPR to power purchase agreement.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.48rem' }}>
              {KUSUM_SUNTRIK_ROLE.map(r => (
                <li key={r} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
                    <circle cx="8" cy="8" r="7" stroke="#10B981" strokeWidth="1.2"/>
                    <path d="M5 8l2 2 4-4" stroke="#10B981" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {r}
                </li>
              ))}
            </ul>
            <div style={{ marginTop: '1.1rem' }}>
              <a href="#contact" className="btn-primary" style={{ background: 'linear-gradient(135deg, #10B981, #059669)', boxShadow: '0 8px 32px rgba(16,185,129,0.3)', fontSize: '0.82rem', padding: '0.65rem 1.4rem' }}>
                Get PM-KUSUM Advisory →
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function SuryaPanel() {
  return (
    <motion.div
      key="surya"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35 }}
      style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '1.5rem', alignItems: 'start' }}
      className="sgh-grid"
    >
      {/* PM Surya Ghar card */}
      <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,107,26,0.18)', background: 'rgba(255,107,26,0.03)' }}>
        <div style={{
          background: 'linear-gradient(90deg, rgba(255,107,26,0.12) 0%, transparent 100%)',
          borderBottom: '1px solid rgba(255,107,26,0.12)', padding: '1.25rem 1.75rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem',
        }}>
          <div>
            <span style={{
              fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'var(--brand-orange)', background: 'rgba(255,107,26,0.1)',
              border: '1px solid rgba(255,107,26,0.2)', padding: '0.18rem 0.6rem', borderRadius: 100,
              display: 'inline-block', marginBottom: '0.4rem',
            }}>For Homeowners</span>
            <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 900, fontSize: '1.3rem', lineHeight: 1.15 }}>
              PM Surya Ghar<br /><span className="gradient-text">Muft Bijli Yojana</span>
            </h3>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{
              fontSize: '2rem', fontWeight: 900, fontFamily: 'Space Grotesk, sans-serif',
              background: 'var(--gradient-sun)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1,
            }}>₹78,000</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', marginTop: 2 }}>max central subsidy</div>
          </div>
        </div>
        <div style={{ padding: '1.25rem 1.75rem' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', lineHeight: 1.75, marginBottom: '1.1rem' }}>
            Central government rooftop solar subsidy for residential households. Suntrik handles the national portal registration, DISCOM approval, and subsidy disbursement — end-to-end.
          </p>
          <div style={{ border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, overflow: 'hidden', marginBottom: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', background: 'rgba(255,107,26,0.08)', padding: '0.5rem 0.9rem' }}>
              {['System Size', 'Central Subsidy', 'Max Benefit'].map(h => (
                <span key={h} style={{ fontSize: '0.6rem', fontWeight: 700, color: 'var(--brand-orange)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{h}</span>
              ))}
            </div>
            {SURYA_GHAR_SLABS.map((s, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
                padding: '0.6rem 0.9rem', borderTop: '1px solid rgba(255,255,255,0.06)',
                background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)',
              }}>
                <span style={{ fontSize: '0.77rem', color: 'var(--text-primary)', fontWeight: 600 }}>{s.range}</span>
                <span style={{ fontSize: '0.77rem', color: 'var(--text-secondary)' }}>{s.central}</span>
                <span style={{ fontSize: '0.77rem', color: 'var(--brand-amber)', fontWeight: 700 }}>{s.max}</span>
              </div>
            ))}
          </div>
          <a href="#contact" className="btn-outline" style={{ fontSize: '0.8rem', padding: '0.6rem 1.35rem' }}>
            Check My Eligibility →
          </a>
        </div>
      </div>

      {/* Right: key benefits */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {[
          { icon: '🏡', title: 'Residential Focus', desc: 'For individual homeowners with a grid-connected electricity connection. 1 kW to 10 kW systems eligible.' },
          { icon: '💰', title: 'Up to ₹78,000 Subsidy', desc: 'Central subsidy credited directly by DISCOM after inspection. No need to chase government offices.' },
          { icon: '📋', title: 'Suntrik Handles It All', desc: 'Portal registration, DISCOM tech inspection, subsidy disbursement — we manage every step end-to-end.' },
          { icon: '⚡', title: '300 Units Free / Month', desc: 'Additional benefit for eligible households — 300 units of free electricity per month under the scheme.' },
        ].map((b) => (
          <div key={b.title} style={{
            padding: '0.9rem 1.1rem', borderRadius: 12,
            background: 'rgba(255,107,26,0.04)', border: '1px solid rgba(255,107,26,0.12)',
            display: 'flex', gap: '0.9rem', alignItems: 'flex-start',
          }}>
            <div style={{ fontSize: '1.3rem', flexShrink: 0 }}>{b.icon}</div>
            <div>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.2rem' }}>{b.title}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{b.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function AccredPanel() {
  return (
    <motion.div
      key="accred"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35 }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }} className="accred-grid">
        {ACCRED.map((s) => (
          <div key={s.title} style={{
            borderRadius: 14, overflow: 'hidden',
            border: `1px solid ${s.badgeColor}22`, background: 'rgba(255,255,255,0.025)',
            padding: '1.5rem',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.6rem' }}>
              <h4 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1rem' }}>{s.title}</h4>
              <span style={{
                fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
                color: s.badgeColor, background: `${s.badgeColor}18`, border: `1px solid ${s.badgeColor}35`,
                padding: '0.18rem 0.55rem', borderRadius: 100, flexShrink: 0, marginLeft: '0.75rem',
              }}>{s.badge}</span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '0.9rem' }}>{s.desc}</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {s.points.map(pt => (
                <li key={pt} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                  <span style={{ color: s.badgeColor, fontSize: '0.58rem' }}>●</span>
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* CTA bar */}
      <div style={{
        borderRadius: 14, padding: '1.5rem 2rem',
        background: 'linear-gradient(90deg, rgba(255,107,26,0.08) 0%, rgba(255,184,48,0.05) 100%)',
        border: '1px solid rgba(255,107,26,0.18)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap',
      }}>
        <div>
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '1.05rem', marginBottom: '0.25rem' }}>
            Not sure which scheme applies to you?
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            Our team will assess your eligibility for every applicable central and state programme — for free.
          </p>
        </div>
        <a href="#contact" className="btn-primary" style={{ flexShrink: 0, fontSize: '0.85rem' }}>
          Get Free Scheme Advisory →
        </a>
      </div>
    </motion.div>
  )
}

export default function Schemes() {
  const [activeTab, setActiveTab] = useState('kusum')
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  const { ref: headRef, inView: headIn } = useScrollAnimation(0.08)

  return (
    <section
      id="schemes"
      ref={sectionRef}
      style={{
        position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(175deg, #060A0F 0%, #071510 60%, #060A0F 100%)',
        padding: 'clamp(2rem, 3vh, 3rem) 0',
        minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center',
      }}
    >
      {/* Parallax green glow */}
      <motion.div style={{ y: bgY, position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: '10%', left: '-5%',
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '5%', right: '5%',
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,107,26,0.06) 0%, transparent 65%)',
          filter: 'blur(50px)',
        }} />
      </motion.div>

      {/* Dot grid */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(rgba(16,185,129,0.05) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Header ── */}
        <div ref={headRef} style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <motion.span
            className="section-tag" style={{ justifyContent: 'center', color: '#10B981' }}
            initial={{ opacity: 0, y: 20 }} animate={headIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
          >Government Schemes</motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 28 }} animate={headIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.1 }}
            style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', marginBottom: '0.5rem' }}
          >
            Maximise Your <span className="gradient-text">Solar Subsidy</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }} animate={headIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
            style={{ color: 'var(--text-secondary)', maxWidth: 520, margin: '0 auto', fontSize: '0.88rem', lineHeight: 1.7 }}
          >
            India's government offers substantial subsidies for solar adoption. Suntrik handles every portal, approval, and inspection — without the paperwork burden.
          </motion.p>
        </div>

        {/* ── Tab bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={headIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.25 }}
          style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '1.5rem', flexWrap: 'wrap' }}
        >
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '0.5rem 1.4rem', borderRadius: 100,
                border: `1px solid ${activeTab === tab.id ? tab.color : 'rgba(255,255,255,0.1)'}`,
                background: activeTab === tab.id ? `${tab.color}18` : 'transparent',
                color: activeTab === tab.id ? tab.color : 'var(--text-secondary)',
                fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer',
                fontFamily: 'inherit', transition: 'all 0.2s',
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </motion.div>

        {/* ── Tab content ── */}
        <AnimatePresence mode="wait">
          {activeTab === 'kusum'  && <KusumPanel  key="kusum"  inView={headIn} />}
          {activeTab === 'surya'  && <SuryaPanel  key="surya"  />}
          {activeTab === 'accred' && <AccredPanel key="accred" />}
        </AnimatePresence>

      </div>

      <style>{`
        @media(max-width:900px){
          .kusum-inner  { grid-template-columns:1fr !important; }
          .sgh-grid     { grid-template-columns:1fr !important; }
          .accred-grid  { grid-template-columns:1fr !important; }
          .kusum-stats  { grid-template-columns:1fr 1fr !important; }
        }
        @media(max-width:480px){
          .kusum-stats  { grid-template-columns:1fr !important; }
        }
      `}</style>
    </section>
  )
}
