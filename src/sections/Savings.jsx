/**
 * Savings — Solar Savings Calculator + Chart
 * Based on Suntrik brochure: 340 sunny days × 4 units/kW/day avg.
 * Interactive slider shows unit generation and minimum annual savings.
 */

import { useState, useRef } from 'react'
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
  { icon: '🏦', label: '4-Year Payback',           desc: 'One-time investment, full payback typically within 3–4 years in North India.' },
  { icon: '♻️', label: 'Feed Excess to Grid',       desc: 'Net-metering lets you earn credits for surplus solar power fed to the DISCOM.' },
  { icon: '📜', label: 'Government Subsidies',     desc: 'PM Surya Ghar: up to ₹78,000 subsidy. PM-KUSUM: up to 90% subsidy for farmers.' },
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
      <div style={{
        fontSize: '0.6rem', fontWeight: 700, color: active ? 'var(--brand-orange)' : 'transparent',
        transition: 'color 0.2s',
      }}>
        {fmt(saving)}
      </div>
      <div style={{ width: '100%', height: 180, display: 'flex', alignItems: 'flex-end' }}>
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: `${pct}%` }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: '100%',
            background: active
              ? 'var(--gradient-sun)'
              : 'linear-gradient(180deg, rgba(255,107,26,0.45), rgba(255,107,26,0.15))',
            borderRadius: '4px 4px 0 0',
            boxShadow: active ? '0 0 18px rgba(255,107,26,0.4)' : 'none',
            transition: 'background 0.25s, box-shadow 0.25s',
          }}
        />
      </div>
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
        padding: '9rem 0',
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

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Header ─────────────────────────────────────── */}
        <div ref={headRef} style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.span
            className="section-tag" style={{ justifyContent: 'center' }}
            initial={{ opacity: 0, y: 20 }} animate={headIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >Solar Savings</motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 28 }} animate={headIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '0.75rem' }}
          >
            How Much Can You <span className="gradient-text">Save?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }} animate={headIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ color: 'var(--text-secondary)', maxWidth: 540, margin: '0 auto', lineHeight: 1.8 }}
          >
            Based on 340 sunny days/year and 4 units per kW per day — the North India average.
            Minimum estimated annual savings from your solar plant.
          </motion.p>
        </div>

        <div ref={bodyRef}>

          {/* ── Bar Chart ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }} animate={bodyIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
            style={{
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(255,184,48,0.12)',
              borderRadius: 18, padding: '2rem 2rem 1.5rem',
              marginBottom: '2.5rem',
            }}
          >
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem', textAlign: 'right' }}>
              Click a bar to see detailed breakdown
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end' }}>
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
            {/* X-axis line */}
            <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '0.2rem 0 0' }} />
          </motion.div>

          {/* ── Selected row breakdown ─────────────────────── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                marginBottom: '3.5rem',
              }}
            >
              {[
                { label: 'Plant Size',             value: `${row.kw} kW`,           icon: '☀️' },
                { label: 'Units Generated / Day',  value: `${row.uDay} units`,       icon: '⚡' },
                { label: 'Units Generated / Year', value: `${row.uYear.toLocaleString('en-IN')} units`, icon: '📊' },
                { label: 'Min Annual Savings',     value: fmt(row.saving),           icon: '💰' },
                { label: 'Min Monthly Savings',    value: fmt(Math.round(row.saving / 12)), icon: '🗓️' },
                { label: 'Payback Period',         value: '3–4 Years',               icon: '🏦' },
              ].map(cell => (
                <div key={cell.label} style={{
                  background: 'rgba(255,184,48,0.05)',
                  border: '1px solid rgba(255,184,48,0.12)',
                  borderRadius: 12, padding: '1.4rem 1.6rem',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>{cell.icon}</div>
                  <div style={{
                    fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800,
                    fontSize: '1.35rem', lineHeight: 1, marginBottom: '0.35rem',
                    background: 'var(--gradient-sun)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  }}>{cell.value}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{cell.label}</div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* ── Full table ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }} animate={bodyIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.25 }}
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,107,26,0.1)',
              borderRadius: 16, overflow: 'hidden',
              marginBottom: '4rem',
            }}
          >
            <div style={{
              padding: '1rem 1.5rem',
              background: 'rgba(255,107,26,0.06)',
              borderBottom: '1px solid rgba(255,107,26,0.1)',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr 1fr',
              gap: '1rem',
            }}>
              {['Plant Size (kW)', 'Units / Day', 'Units / Year', 'Min Savings / Year'].map(h => (
                <div key={h} style={{
                  fontSize: '0.72rem', fontWeight: 700, color: 'var(--brand-orange)',
                  textTransform: 'uppercase', letterSpacing: '0.06em',
                }}>{h}</div>
              ))}
            </div>

            {TABLE.map((r, i) => (
              <motion.div
                key={r.kw}
                onClick={() => setSelected(i)}
                whileHover={{ background: 'rgba(255,107,26,0.06)' }}
                style={{
                  padding: '0.9rem 1.5rem',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr 1fr',
                  gap: '1rem',
                  borderBottom: i < TABLE.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                  background: i === selected ? 'rgba(255,107,26,0.08)' : 'transparent',
                  cursor: 'pointer',
                  transition: 'background 0.18s',
                  borderLeft: i === selected ? '3px solid var(--brand-orange)' : '3px solid transparent',
                }}
              >
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '0.95rem', color: i === selected ? 'var(--brand-orange)' : 'var(--text-primary)' }}>
                  {r.kw} kW
                </div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>{r.uDay} units</div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>{r.uYear.toLocaleString('en-IN')} units</div>
                <div style={{
                  fontSize: '0.95rem', fontWeight: 700,
                  background: 'var(--gradient-sun)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>{fmt(r.saving)}</div>
              </motion.div>
            ))}

            <div style={{
              padding: '0.85rem 1.5rem',
              background: 'rgba(255,255,255,0.025)',
              fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.6,
              borderTop: '1px solid rgba(255,255,255,0.05)',
            }}>
              * Based on 340 sunny days/year and average 4 units per kW installed per day.
              Savings calculated at ₹7.5/unit average electricity tariff.
              Actual savings may be higher depending on your DISCOM slab and usage pattern.
            </div>
          </motion.div>

          {/* ── Why Go Solar grid ──────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }} animate={bodyIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.38 }}
          >
            <h3 style={{
              fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800,
              fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)', textAlign: 'center',
              marginBottom: '2.5rem',
            }}>
              Why Go Solar <span className="gradient-text">Now?</span>
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '1.2rem',
              marginBottom: '3rem',
            }}>
              {WHY_SOLAR.map((w, i) => (
                <motion.div
                  key={w.label}
                  initial={{ opacity: 0, y: 24 }}
                  animate={bodyIn ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.38 + i * 0.07, duration: 0.5 }}
                  whileHover={{ y: -4 }}
                  style={{
                    padding: '1.5rem',
                    background: 'rgba(255,255,255,0.025)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 12,
                    transition: 'border-color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,107,26,0.25)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
                >
                  <div style={{ fontSize: '1.6rem', marginBottom: '0.7rem' }}>{w.icon}</div>
                  <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.45rem' }}>
                    {w.label}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.72 }}>
                    {w.desc}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                Get a site-specific savings estimate from our engineers — completely free.
              </p>
              <a href="#contact" className="btn-primary">
                Get My Free Savings Report →
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          #savings table, #savings .bar-chart { overflow-x: auto; }
        }
      `}</style>
    </section>
  )
}
