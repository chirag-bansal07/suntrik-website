/**
 * Savings — Solar Savings Calculator + Chart
 * Based on Suntrik brochure: 340 sunny days × 4 units/kW/day avg.
 * Interactive slider shows unit generation and minimum annual savings.
 */

import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

/* ── Data from brochure ───────────────────────────────────── */
const TABLE = [
  { kw:   5, uDay:   20, uYear:   6800, saving:    51000 },
  { kw:   6, uDay:   24, uYear:   8160, saving:    61200 },
  { kw:   8, uDay:   32, uYear:  10880, saving:    81600 },
  { kw:  10, uDay:   40, uYear:  13600, saving:   102000 },
  { kw:  12, uDay:   48, uYear:  16320, saving:   122400 },
  { kw:  15, uDay:   60, uYear:  20400, saving:   153000 },
  { kw:  20, uDay:   80, uYear:  27200, saving:   204000 },
  { kw:  40, uDay:  160, uYear:  54400, saving:   408000 },
  { kw:  50, uDay:  200, uYear:  68000, saving:   510000 },
  { kw: 100, uDay:  400, uYear: 136000, saving:  1020000 },
]

const WHY_SOLAR = [
  { icon: '💡', label: 'Cut Electricity Bills',    desc: 'Offset 80–100% of your monthly bill from day one of commissioning.' },
  { icon: '🏦', label: '4-Year Payback',           desc: 'One-time investment, full payback typically within 3–4 years in India.' },
  { icon: '♻️', label: 'Feed Excess to Grid',       desc: 'Net-metering lets you earn credits for surplus solar power fed to the DISCOM.' },
  { icon: '📜', label: 'Government Subsidies',     desc: 'PM Surya Ghar: up to ₹78,000 subsidy. PM-KUSUM: 30% central + 30% state subsidy for farmers.' },
  { icon: '🌱', label: 'Clean Energy',             desc: 'Reduce your carbon footprint. 1 kW solar saves ~1.4 tonnes of CO₂ per year.' },
  { icon: '🔒', label: '25-Year Asset',            desc: 'Tier-1 panels with 25-year linear output warranty — a bankable long-term asset.' },
]

function fmt(n) {
  if (n >= 100000) return '₹' + (n / 100000).toFixed(1).replace(/\.0$/, '') + ' Lakh'
  return '₹' + n.toLocaleString('en-IN')
}

function Bar({ saving, maxSaving, kw, active, onClick }) {
  const pct = (saving / maxSaving) * 100
  return (
    <motion.button
      onClick={onClick}
      title={`${kw} kW — ${fmt(saving)}/yr`}
      whileHover={{ scaleY: 1.04 }}
      style={{
        flex: 1, cursor: 'pointer', border: 'none', background: 'transparent', padding: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem',
        outline: 'none',
      }}
    >
      {/* Bar area — relative so label can anchor to bar top */}
      <div style={{ width: '100%', height: 240, position: 'relative' }}>
        {/* Value label — floats just above the bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: active ? 1 : 0, bottom: `calc(${pct}% + 6px)` }}
          transition={{ duration: 0.35 }}
          style={{
            position: 'absolute', left: '50%', transform: 'translateX(-50%)',
            bottom: `calc(${pct}% + 6px)`,
            fontSize: '0.62rem', fontWeight: 700,
            color: 'var(--brand-orange)',
            whiteSpace: 'nowrap',
            background: 'rgba(10,16,32,0.85)',
            border: '1px solid rgba(255,107,26,0.3)',
            borderRadius: 5, padding: '2px 6px',
            pointerEvents: 'none',
          }}
        >
          {fmt(saving)}
        </motion.div>

        {/* The bar itself — grows from bottom */}
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: `${pct}%` }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            background: active
              ? 'var(--gradient-sun)'
              : 'linear-gradient(180deg, rgba(255,107,26,0.45), rgba(255,107,26,0.15))',
            borderRadius: '4px 4px 0 0',
            boxShadow: active ? '0 0 18px rgba(255,107,26,0.4)' : 'none',
            transition: 'background 0.25s, box-shadow 0.25s',
          }}
        />
      </div>

      {/* kW label below */}
      <div style={{
        fontSize: '0.65rem', fontWeight: 600,
        color: active ? 'var(--brand-orange)' : 'var(--text-muted)',
        transition: 'color 0.2s',
      }}>
        {kw}kW
      </div>
    </motion.button>
  )
}

export default function Savings() {
  const [selected, setSelected] = useState(4)   // index into TABLE, default 10kW
  const maxSaving = TABLE[TABLE.length - 1].saving
  const row = TABLE[selected]

  const { ref: headRef, inView: headIn } = useScrollAnimation(0.08)
  const { ref: bodyRef, inView: bodyIn } = useScrollAnimation(0.05)

  return (
    <section
      id="savings"
      style={{
        position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(170deg, #070d18 0%, #0d1625 50%, #060c17 100%)',
        padding: 'clamp(2rem, 3vh, 3rem) 0',
        minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center',
      }}
    >
      {/* Background glow */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{
          position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 900, height: 500,
          background: 'radial-gradient(ellipse, rgba(255,184,48,0.08) 0%, transparent 65%)',
          filter: 'blur(80px)',
        }} />
        {/* Grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,184,48,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,184,48,0.025) 1px, transparent 1px)
          `,
          backgroundSize: '52px 52px',
        }} />
        {/* Watermark */}
        <div style={{
          position: 'absolute', bottom: '5%', right: '-2%',
          fontFamily: 'Space Grotesk, sans-serif', fontWeight: 900,
          fontSize: 'clamp(7rem, 16vw, 14rem)', lineHeight: 1,
          color: 'rgba(255,184,48,0.022)', userSelect: 'none', pointerEvents: 'none',
          letterSpacing: '-0.05em',
        }}>SAVINGS</div>
      </div>

      {/* ── Header ─────────────────────────────────────── */}
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div ref={headRef} style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <motion.span
            className="section-tag" style={{ justifyContent: 'center' }}
            initial={{ opacity: 0, y: 20 }} animate={headIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >Solar Savings</motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 28 }} animate={headIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
            style={{ fontSize: 'clamp(1.5rem, 3.2vw, 2.2rem)', marginBottom: '0.5rem' }}
          >
            How Much Can You <span className="gradient-text">Save?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }} animate={headIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ color: 'var(--text-secondary)', maxWidth: 540, margin: '0 auto', lineHeight: 1.8 }}
          >
            Based on 340 sunny days/year and 4 units per kW per day — the Indian average.
            Minimum estimated annual savings from your solar plant.
          </motion.p>
        </div>
      </div>

      {/* ── Bar Chart + Cards ──────────────────────────────── */}
      <div ref={bodyRef} style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', width: '100%', padding: '0 2rem', boxSizing: 'border-box' }}>

        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 32 }} animate={bodyIn ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1 }}
          style={{
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(255,184,48,0.12)',
            borderRadius: 14, padding: '1.25rem 2rem 1rem',
            marginBottom: '1.25rem',
          }}
        >
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem', textAlign: 'right' }}>
            Click a bar to see detailed breakdown
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end' }}>
            {TABLE.map((r, i) => (
              <Bar
                key={r.kw}
                kw={r.kw}
                saving={r.saving}
                maxSaving={maxSaving}
                active={i === selected}
                onClick={() => setSelected(i)}
              />
            ))}
          </div>
          <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '0.2rem 0 0' }} />
        </motion.div>

        {/* ── Selected row breakdown — 3 × 2 grid ─────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem',
              marginBottom: '1.5rem',
            }}
            className="savings-cards"
          >
            {[
              { label: 'Plant Size',             value: `${row.kw} kW`,                                  icon: '☀️', sub: 'Selected system capacity' },
              { label: 'Units Generated / Day',  value: `${row.uDay} units`,                              icon: '⚡', sub: 'Average daily generation' },
              { label: 'Units Generated / Year', value: `${row.uYear.toLocaleString('en-IN')} units`,     icon: '📊', sub: '340 sunny days × daily output' },
              { label: 'Min Annual Savings',     value: fmt(row.saving),                                  icon: '💰', sub: 'At ₹7.50/unit avg tariff' },
              { label: 'Min Monthly Savings',    value: fmt(Math.round(row.saving / 12)),                 icon: '🗓️', sub: 'Direct bill reduction' },
              { label: 'Payback Period',         value: '3–4 Years',                                      icon: '🏦', sub: 'Then 21+ years free energy' },
            ].map(cell => (
              <div key={cell.label} style={{
                background: 'rgba(255,184,48,0.05)',
                border: '1px solid rgba(255,184,48,0.15)',
                borderRadius: 12, padding: '1.5rem 1.75rem',
                display: 'flex', alignItems: 'center', gap: '1.25rem',
              }}>
                {/* Icon */}
                <div style={{
                  width: 60, height: 60, borderRadius: 14, flexShrink: 0,
                  background: 'rgba(255,184,48,0.1)',
                  border: '1px solid rgba(255,184,48,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '2rem', lineHeight: 1,
                }}>{cell.icon}</div>
                {/* Text */}
                <div>
                  <div style={{
                    fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800,
                    fontSize: '1.45rem', lineHeight: 1, marginBottom: '0.3rem',
                    background: 'var(--gradient-sun)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  }}>{cell.value}</div>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>{cell.label}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>{cell.sub}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── CTA ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={bodyIn ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ textAlign: 'center' }}
        >
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem', fontSize: '0.88rem' }}>
            Get a site-specific savings estimate from our engineers — completely free.
          </p>
          <Link to="/#contact" className="btn-primary">
            Get My Free Savings Report →
          </Link>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .savings-cards { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .savings-cards { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
