/**
 * SavingsCalculator — a personalized, slider-driven solar estimator.
 *
 * The visitor drags their monthly bill, roof area, and sector; everything on
 * the right (recommended system size, subsidy by scheme, payback, 25-year
 * savings, CO₂ offset) tweens live. Math is grounded in the Suntrik brochure:
 * 340 sunny days/yr × 4 units/kW/day, ₹7.5/unit average tariff.
 */
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import RevealText from '../components/ui/RevealText'

/* ── Model constants ─────────────────────────────────────── */
const TARIFF        = 7.5    // ₹ per unit
const UNITS_KW_DAY  = 4      // avg generation
const SUNNY_DAYS    = 340
const SQFT_PER_KW   = 90
const UNITS_KW_YEAR = UNITS_KW_DAY * SUNNY_DAYS   // 1360

const SECTORS = {
  Residential:  { costPerKw: 60000, scheme: 'PM Surya Ghar', color: '#FF6B1A', note: 'Up to ₹78,000 central subsidy' },
  Agricultural: { costPerKw: 55000, scheme: 'PM-KUSUM',      color: '#10B981', note: 'Up to 90% subsidy for farmers' },
  Commercial:   { costPerKw: 50000, scheme: 'Net-Metering',  color: '#3B82F6', note: '40% accelerated depreciation benefit' },
}

/* ── Helpers ─────────────────────────────────────────────── */
function fmtINR(n) {
  n = Math.max(0, Math.round(n))
  if (n >= 1e7) return '₹' + (n / 1e7).toFixed(2).replace(/\.?0+$/, '') + ' Cr'
  if (n >= 1e5) return '₹' + (n / 1e5).toFixed(2).replace(/\.?0+$/, '') + ' L'
  return '₹' + n.toLocaleString('en-IN')
}

function suryaGharSubsidy(kw) {
  if (kw <= 1) return kw * 30000
  if (kw <= 2) return 30000 + (kw - 1) * 30000
  if (kw <  3) return 60000 + (kw - 2) * 18000
  return 78000
}

function compute(bill, roof, sectorKey) {
  const sector  = SECTORS[sectorKey]
  const billKw  = (bill / TARIFF) / 30 / UNITS_KW_DAY
  const roofKw  = roof / SQFT_PER_KW
  const rawKw   = Math.min(billKw, roofKw)
  const kw      = Math.max(1, Math.round(rawKw * 2) / 2)   // round to 0.5
  const limited = roofKw < billKw ? 'roof' : 'bill'

  const genYear   = kw * UNITS_KW_YEAR
  const annual    = genYear * TARIFF
  const gross     = kw * sector.costPerKw
  const subsidy   = sectorKey === 'Agricultural' ? gross * 0.9
                  : sectorKey === 'Residential'  ? suryaGharSubsidy(kw)
                  : 0
  const net       = Math.max(0, gross - subsidy)
  const payback   = annual > 0 ? net / annual : 0
  const save25    = annual * 25 * 0.92 - net
  const co2       = kw * 1.4

  return { kw, limited, genYear, annual, monthly: annual / 12, gross, subsidy, net, payback, save25, co2, sector }
}

/* ── Tweened number ──────────────────────────────────────── */
function useTween(value, duration = 650) {
  const [display, setDisplay] = useState(value)
  const fromRef = useRef(value)
  const rafRef  = useRef()
  useEffect(() => {
    const from = fromRef.current
    const start = performance.now()
    cancelAnimationFrame(rafRef.current)
    const tick = now => {
      const t = Math.min((now - start) / duration, 1)
      const e = 1 - Math.pow(1 - t, 3)
      setDisplay(from + (value - from) * e)
      if (t < 1) rafRef.current = requestAnimationFrame(tick)
      else fromRef.current = value
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [value, duration])
  return display
}

function Money({ value }) { return <>{fmtINR(useTween(value))}</> }
function Plain({ value, decimals = 0, suffix = '' }) {
  const v = useTween(value)
  return <>{v.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}</>
}

/* ── Slider ──────────────────────────────────────────────── */
function Slider({ label, value, min, max, step, onChange, display }) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div style={{ marginBottom: '1.6rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.6rem' }}>
        <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{label}</label>
        <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '1.05rem' }} className="gradient-text">{display}</span>
      </div>
      <input
        type="range" className="calc-range"
        min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{ background: `linear-gradient(90deg, #FF6B1A ${pct}%, rgba(255,255,255,0.10) ${pct}%)` }}
      />
    </div>
  )
}

export default function SavingsCalculator() {
  const [bill, setBill]     = useState(5000)
  const [roof, setRoof]     = useState(700)
  const [sector, setSector] = useState('Residential')
  const r = compute(bill, roof, sector)

  const { ref: headRef, inView: headIn } = useScrollAnimation(0.1)
  const { ref: bodyRef, inView: bodyIn } = useScrollAnimation(0.05)

  const youPayPct   = r.gross > 0 ? (r.net / r.gross) * 100 : 0
  const paybackPct  = Math.min(r.payback / 10, 1) * 100
  const paybackR    = 52
  const paybackCirc = 2 * Math.PI * paybackR

  return (
    <section
      id="savings"
      style={{
        position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(170deg, #070d18 0%, #0d1625 50%, #060c17 100%)',
        padding: 'clamp(3rem, 6vh, 5rem) 0',
        minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center',
      }}
    >
      {/* Drifting glow + grid */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{
          position: 'absolute', top: '38%', left: '50%', transform: 'translate(-50%,-50%)',
          width: 1000, height: 560,
          background: 'radial-gradient(ellipse, rgba(255,184,48,0.09) 0%, transparent 65%)',
          filter: 'blur(80px)', animation: 'calcDrift 16s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,184,48,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,184,48,0.022) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
        }} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div ref={headRef} style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <motion.span className="section-tag" style={{ justifyContent: 'center' }}
            initial={{ opacity: 0, y: 18 }} animate={headIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
            Solar Savings Calculator
          </motion.span>
          <RevealText as="h2" text="See what solar saves you" gradient
            style={{ fontSize: 'clamp(1.6rem, 3.4vw, 2.4rem)', marginBottom: '0.6rem', display: 'inline-block' }} />
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={headIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
            style={{ color: 'var(--text-secondary)', maxWidth: 560, margin: '0 auto', lineHeight: 1.8 }}>
            Drag the sliders to match your home, farm, or business. Subsidy, payback, and 25-year savings update instantly.
          </motion.p>
        </div>

        {/* Calculator body */}
        <motion.div
          ref={bodyRef}
          initial={{ opacity: 0, y: 32 }} animate={bodyIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}
          style={{ display: 'grid', gridTemplateColumns: '0.95fr 1.15fr', gap: '1.5rem', alignItems: 'stretch' }}
          className="calc-grid"
        >
          {/* ── Controls ── */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,184,48,0.14)', borderRadius: 18, padding: '1.9rem' }}>
            {/* Sector toggle */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.75rem' }}>
              {Object.keys(SECTORS).map(s => {
                const on = s === sector
                return (
                  <button key={s} onClick={() => setSector(s)} style={{
                    flex: 1, padding: '0.6rem 0.5rem', borderRadius: 10, cursor: 'pointer',
                    fontFamily: 'inherit', fontSize: '0.78rem', fontWeight: 700,
                    border: `1px solid ${on ? SECTORS[s].color : 'rgba(255,255,255,0.1)'}`,
                    background: on ? `${SECTORS[s].color}22` : 'transparent',
                    color: on ? SECTORS[s].color : 'var(--text-secondary)',
                    transition: 'all 0.2s',
                  }}>{s}</button>
                )
              })}
            </div>

            <Slider label="Average monthly electricity bill" value={bill} min={1000} max={100000} step={500}
              onChange={setBill} display={fmtINR(bill)} />
            <Slider label="Available roof / land area" value={roof} min={100} max={6000} step={50}
              onChange={setRoof} display={`${roof.toLocaleString('en-IN')} sq ft`} />

            {/* Scheme pill */}
            <div style={{
              marginTop: '0.5rem', padding: '0.85rem 1rem', borderRadius: 12,
              background: `${r.sector.color}14`, border: `1px solid ${r.sector.color}33`,
              display: 'flex', alignItems: 'center', gap: '0.75rem',
            }}>
              <span style={{ fontSize: '1.3rem' }}>{sector === 'Agricultural' ? '🌾' : sector === 'Commercial' ? '🏢' : '🏠'}</span>
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: r.sector.color }}>Applicable scheme: {r.sector.scheme}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{r.sector.note}</div>
              </div>
            </div>

            <div style={{ marginTop: '1rem', fontSize: '0.68rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              {r.limited === 'roof'
                ? '⚠ System size is limited by your available area — more space could capture your full bill.'
                : '✓ Your area comfortably fits a system sized to your bill.'}
            </div>
          </div>

          {/* ── Results ── */}
          <div style={{ background: 'rgba(255,184,48,0.05)', border: '1px solid rgba(255,184,48,0.16)', borderRadius: 18, padding: '1.9rem', display: 'flex', flexDirection: 'column' }}>
            {/* Top row: system + payback gauge */}
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 160 }}>
                <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Recommended System</div>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 900, fontSize: 'clamp(2.6rem, 6vw, 3.6rem)', lineHeight: 1 }} className="gradient-text">
                  <Plain value={r.kw} decimals={1} /> <span style={{ fontSize: '1.4rem' }}>kWp</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>
                  ≈ <Plain value={r.genYear} /> units generated / year
                </div>
              </div>

              {/* Payback gauge */}
              <div style={{ position: 'relative', width: 128, height: 128, flexShrink: 0 }}>
                <svg width="128" height="128" viewBox="0 0 128 128">
                  <defs>
                    <linearGradient id="pbg" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FF6B1A" /><stop offset="100%" stopColor="#FFB830" />
                    </linearGradient>
                  </defs>
                  <circle cx="64" cy="64" r={paybackR} fill="none" stroke="rgba(255,184,48,0.12)" strokeWidth="8" />
                  <motion.circle
                    cx="64" cy="64" r={paybackR} fill="none" stroke="url(#pbg)" strokeWidth="8" strokeLinecap="round"
                    strokeDasharray={paybackCirc}
                    animate={{ strokeDashoffset: paybackCirc * (1 - paybackPct / 100) }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
                  />
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 900, fontSize: '1.5rem', lineHeight: 1 }}>
                    <Plain value={r.payback} decimals={1} />
                  </div>
                  <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>yr payback</div>
                </div>
              </div>
            </div>

            {/* Cost split bar */}
            <div style={{ marginBottom: '1.4rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                <span>System cost: <strong style={{ color: 'var(--text-primary)' }}><Money value={r.gross} /></strong></span>
                <span>You pay: <strong style={{ color: 'var(--brand-orange)' }}><Money value={r.net} /></strong></span>
              </div>
              <div style={{ height: 12, borderRadius: 6, overflow: 'hidden', display: 'flex', background: 'rgba(255,255,255,0.06)' }}>
                <motion.div animate={{ width: `${100 - youPayPct}%` }} transition={{ duration: 0.5 }}
                  style={{ background: 'linear-gradient(90deg,#10B981,#34D399)', height: '100%' }} title="Subsidy" />
                <motion.div animate={{ width: `${youPayPct}%` }} transition={{ duration: 0.5 }}
                  style={{ background: 'var(--gradient-sun)', height: '100%' }} title="You pay" />
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.45rem', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><i style={{ width: 8, height: 8, borderRadius: 2, background: '#10B981', display: 'inline-block' }} />Subsidy <strong style={{ color: '#10B981' }}><Money value={r.subsidy} /></strong></span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><i style={{ width: 8, height: 8, borderRadius: 2, background: 'var(--brand-orange)', display: 'inline-block' }} />Your investment</span>
              </div>
            </div>

            {/* Metric tiles */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginTop: 'auto' }}>
              {[
                { l: 'Monthly savings', node: <Money value={r.monthly} /> },
                { l: 'Annual savings',  node: <Money value={r.annual} /> },
                { l: '25-yr net savings', node: <Money value={r.save25} />, hot: true },
              ].map(m => (
                <div key={m.l} style={{
                  padding: '0.9rem 1rem', borderRadius: 12,
                  background: m.hot ? 'rgba(255,107,26,0.1)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${m.hot ? 'rgba(255,107,26,0.28)' : 'rgba(255,255,255,0.07)'}`,
                }}>
                  <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '1.15rem', color: m.hot ? 'var(--brand-orange)' : 'var(--text-primary)', lineHeight: 1.1 }}>{m.node}</div>
                  <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)', marginTop: 3 }}>{m.l}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '1rem', fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🌱 Offsets ≈ <strong style={{ color: '#10B981' }}><Plain value={r.co2} decimals={1} suffix=" t" /></strong> CO₂ every year — like planting <Plain value={r.co2 * 45} /> trees.
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 18 }} animate={bodyIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.35 }}
          style={{ textAlign: 'center', marginTop: '1.75rem' }}
        >
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.85rem' }}>
            These are indicative figures. Get an exact, site-surveyed quote from our engineers — free.
          </p>
          <a href="#contact" className="btn-primary">Get My Exact Quote →</a>
        </motion.div>
      </div>

      <style>{`
        @keyframes calcDrift {
          0%,100% { transform: translate(-50%,-50%) scale(1);    opacity: 0.9; }
          50%     { transform: translate(-46%,-54%) scale(1.08); opacity: 1; }
        }
        @media (max-width: 880px) {
          .calc-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
