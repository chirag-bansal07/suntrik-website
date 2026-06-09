import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import SuntrikLogo from './SuntrikLogo'

const HOME_LINKS = [
  { label: 'About',    href: '#about'    },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Savings',  href: '#savings'  },
  { label: 'Contact',  href: '#contact'  },
]

const SCHEME_LINKS = [
  { label: '🌾 PM-KUSUM',      shortLabel: 'PM-KUSUM',    to: '/schemes/kusum',      desc: '90% subsidy for farmers' },
  { label: '🏠 PM Surya Ghar', shortLabel: 'Surya Ghar',  to: '/schemes/surya-ghar', desc: '₹78,000 subsidy for homes' },
]

export default function Navbar({ page = false }) {
  const [scrolled,    setScrolled]    = useState(false)
  const [open,        setOpen]        = useState(false)
  const [hovered,     setHovered]     = useState(null)
  const [activeLink,  setActiveLink]  = useState(null)
  const hoverBgRef = useRef(null)

  /* ── scroll state ─────────────────────────────────────── */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  /* ── active section tracker (homepage only) ───────────── */
  useEffect(() => {
    if (page) return
    const sections = HOME_LINKS.map(l => document.querySelector(l.href))
    const io = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) setActiveLink('#' + e.target.id) }) },
      { threshold: 0.25, rootMargin: '-60px 0px -60px 0px' },
    )
    sections.forEach(s => s && io.observe(s))
    return () => io.disconnect()
  }, [page])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          background:    scrolled ? 'rgba(5,9,14,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(22px) saturate(160%)' : 'none',
          borderBottom:   scrolled ? '1px solid rgba(255,107,26,0.09)' : 'none',
          transition: 'background 0.35s ease, border 0.35s ease, backdrop-filter 0.35s ease',
        }}
      >
        <div style={{
          maxWidth: 1360, margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '200px 1fr 200px',
          alignItems: 'center',
          height: 72,
          padding: '0 2rem',
        }}>

          {/* ── Logo (left) ──────────────────────────────── */}
          <a href="#hero" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', textDecoration: 'none', height: '100%' }}>
            <SuntrikLogo width={115} className="nav-logo" />
          </a>

          {/* ── Centered nav links ───────────────────────── */}
          <ul
            className="desktop-nav"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: '0.25rem', listStyle: 'none', margin: 0, padding: 0,
              position: 'relative',
            }}
          >
            {/* Hover pill background */}
            <motion.span
              ref={hoverBgRef}
              aria-hidden
              style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                zIndex: 0,
              }}
            />

            {/* Home anchor links */}
            {HOME_LINKS.map(l => {
              const isActive  = activeLink === l.href
              const isHovered = hovered   === l.href
              return (
                <li key={l.label} style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <a
                    href={page ? '/' + l.href : l.href}
                    onMouseEnter={() => setHovered(l.href)}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                      display: 'block', padding: '0.45rem 1rem',
                      fontSize: '0.875rem', fontWeight: 500,
                      color: isActive ? 'var(--brand-orange)' : isHovered ? '#fff' : 'rgba(255,255,255,0.65)',
                      textDecoration: 'none', borderRadius: 8,
                      background: isHovered ? 'rgba(255,107,26,0.1)' : 'transparent',
                      transition: 'color 0.18s, background 0.18s',
                    }}
                  >
                    {l.label}
                  </a>
                  {isActive && (
                    <motion.span layoutId="activeUnderline"
                      style={{ position: 'absolute', bottom: -2, left: '20%', right: '20%', height: 2, borderRadius: 1, background: 'var(--gradient-sun)', display: 'block' }}
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                </li>
              )
            })}

            {/* Scheme direct tabs */}
            {SCHEME_LINKS.map(s => {
              const isHov = hovered === s.to
              return (
                <li key={s.to} style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Link
                    to={s.to}
                    onMouseEnter={() => setHovered(s.to)}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                      display: 'block', padding: '0.45rem 1rem',
                      fontSize: '0.875rem', fontWeight: 500,
                      color: isHov ? '#fff' : 'rgba(255,255,255,0.65)',
                      textDecoration: 'none', borderRadius: 8,
                      background: isHov ? 'rgba(255,107,26,0.1)' : 'transparent',
                      transition: 'color 0.18s, background 0.18s',
                    }}
                  >
                    {s.shortLabel}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* ── CTA button (right) ───────────────────────── */}
          <div className="desktop-nav" style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <motion.a
              href="#contact"
              className="btn-primary"
              style={{ padding: '0.5rem 1.25rem', fontSize: '0.8rem', fontWeight: 600, whiteSpace: 'nowrap' }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Free Assessment
            </motion.a>
          </div>

          {/* ── Hamburger (mobile) ───────────────────────── */}
          <button
            onClick={() => setOpen(o => !o)}
            className="hamburger"
            style={{
              display: 'none', flexDirection: 'column', gap: 5,
              padding: 8, background: 'none', border: 'none', cursor: 'pointer',
              gridColumn: 3, justifySelf: 'end',
            }}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block', width: 24, height: 2,
                background: '#fff', borderRadius: 1,
                transition: 'all 0.28s ease',
                transform: open
                  ? i === 0 ? 'translateY(7px) rotate(45deg)'
                  : i === 2 ? 'translateY(-7px) rotate(-45deg)'
                  : 'scaleX(0)'
                  : 'none',
                opacity: open && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>

        </div>
      </motion.nav>

      {/* ── Mobile drawer ────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1,  y: 0   }}
            exit={{    opacity: 0,  y: -14 }}
            transition={{ duration: 0.22 }}
            style={{
              position: 'fixed', top: 72, left: 0, right: 0, zIndex: 999,
              background: 'rgba(5,9,14,0.98)', backdropFilter: 'blur(24px)',
              borderBottom: '1px solid rgba(255,107,26,0.12)',
              padding: '1rem 1.75rem 1.75rem',
            }}
          >
            {HOME_LINKS.map((l, i) => (
              <motion.a
                key={l.label}
                href={page ? '/' + l.href : l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.055 }}
                style={{
                  display: 'block', padding: '0.9rem 0',
                  fontSize: '1.05rem', fontWeight: 600,
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  color: activeLink === l.href ? 'var(--brand-orange)' : 'var(--text-primary)',
                  textDecoration: 'none',
                }}
              >
                {l.label}
              </motion.a>
            ))}
            {/* Schemes links in mobile drawer */}
            {SCHEME_LINKS.map((s, i) => (
              <Link key={s.to} to={s.to}
                onClick={() => setOpen(false)}
                style={{
                  display: 'block', padding: '0.9rem 0',
                  fontSize: '1.05rem', fontWeight: 600,
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  color: 'var(--text-primary)', textDecoration: 'none',
                }}
              >
                {s.label}
              </Link>
            ))}
            <motion.a
              href="#contact"
              className="btn-primary"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.38 }}
              style={{ marginTop: '1.25rem', display: 'block', textAlign: 'center' }}
            >
              Free Assessment →
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .nav-logo {
          height: 64px;
          width: auto !important;
          max-width: 150px;
          object-fit: contain;
        }
        @media (max-width: 820px) {
          .desktop-nav { display: none !important; }
          .hamburger   { display: flex !important; }
        }
        @media (max-width: 820px) {
          nav > div { grid-template-columns: 1fr auto !important; }
        }
      `}</style>
    </>
  )
}
