import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import SuntrikLogo from './SuntrikLogo'

const HOME_LINKS = [
  { label: 'About',    href: '#about'  },
  { label: 'Projects', to: '/projects' },
  { label: 'Blog',     to: '/blog'     },
  { label: 'Careers',  to: '/careers'  },
]

// Rendered last in the nav, after the scheme tabs
const CONTACT_LINK = { label: 'Contact', href: '#contact' }

const SCHEME_LINKS = [
  { label: '🌾 PM-KUSUM',      shortLabel: 'PM-KUSUM',    to: '/schemes/kusum',      desc: '60% subsidy for farmers' },
  { label: '🏠 PM Surya Ghar', shortLabel: 'PM Surya Ghar',  to: '/schemes/surya-ghar', desc: '₹78,000 subsidy for homes' },
  { label: '🏗️ C&I Solar',     shortLabel: 'C&I',         to: '/schemes/ci',         desc: '2-year AMC for commercial' },
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
    const sections = [...HOME_LINKS, CONTACT_LINK].filter(l => l.href).map(l => document.querySelector(l.href))
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
          gridTemplateColumns: 'auto 1fr auto',
          alignItems: 'center',
          height: 90,
          padding: '0 2rem',
        }}>

          {/* ── Logo (left) ──────────────────────────────── */}
          {page ? (
            <Link to="/" aria-label="Suntrik — home" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', textDecoration: 'none', height: '100%' }}>
              <SuntrikLogo width={90} className="nav-logo" />
            </Link>
          ) : (
            <a href="#hero" aria-label="Suntrik — home"
              onClick={e => { e.preventDefault(); window.__lenis ? window.__lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', textDecoration: 'none', height: '100%' }}>
              <SuntrikLogo width={90} className="nav-logo" />
            </a>
          )}

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

            {/* Home links (anchors) + route links (e.g. Projects) */}
            {HOME_LINKS.map(l => {
              const target    = l.href || l.to
              const isActive  = !!l.href && activeLink === l.href
              const isHovered = hovered === target
              const linkStyle = {
                display: 'block', padding: '0.45rem 1rem',
                fontSize: '1rem', fontWeight: 500,
                color: isActive ? 'var(--brand-orange)' : isHovered ? '#fff' : 'rgba(255,255,255,0.65)',
                textDecoration: 'none', borderRadius: 8,
                background: isHovered ? 'rgba(255,107,26,0.1)' : 'transparent',
                transition: 'color 0.18s, background 0.18s',
              }
              return (
                <li key={l.label} style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {l.to ? (
                    <Link to={l.to} onMouseEnter={() => setHovered(target)} onMouseLeave={() => setHovered(null)} style={linkStyle}>
                      {l.label}
                    </Link>
                  ) : (
                    <a href={page ? '/' + l.href : l.href} onMouseEnter={() => setHovered(target)} onMouseLeave={() => setHovered(null)} style={linkStyle}>
                      {l.label}
                    </a>
                  )}
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
                      fontSize: '1rem', fontWeight: 500,
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

            {/* Contact — pinned last */}
            <li style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <a
                href={page ? '/#contact' : '#contact'}
                onMouseEnter={() => setHovered('#contact')}
                onMouseLeave={() => setHovered(null)}
                style={{
                  display: 'block', padding: '0.45rem 1rem',
                  fontSize: '1rem', fontWeight: 500,
                  color: activeLink === '#contact' ? 'var(--brand-orange)' : hovered === '#contact' ? '#fff' : 'rgba(255,255,255,0.65)',
                  textDecoration: 'none', borderRadius: 8,
                  background: hovered === '#contact' ? 'rgba(255,107,26,0.1)' : 'transparent',
                  transition: 'color 0.18s, background 0.18s',
                }}
              >
                {CONTACT_LINK.label}
              </a>
              {activeLink === '#contact' && (
                <motion.span layoutId="activeUnderline"
                  style={{ position: 'absolute', bottom: -2, left: '20%', right: '20%', height: 2, borderRadius: 1, background: 'var(--gradient-sun)', display: 'block' }}
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
            </li>
          </ul>

          {/* ── CTA button (right) ───────────────────────── */}
          <div className="desktop-nav" style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Link
              to="/#contact"
              className="btn-primary"
              style={{ padding: '0.5rem 1.25rem', fontSize: '0.8rem', fontWeight: 600, whiteSpace: 'nowrap' }}
            >
              Free Assessment
            </Link>
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
              position: 'fixed', top: 90, left: 0, right: 0, zIndex: 999,
              background: 'rgba(5,9,14,0.98)', backdropFilter: 'blur(24px)',
              borderBottom: '1px solid rgba(255,107,26,0.12)',
              padding: '1rem 1.75rem 1.75rem',
            }}
          >
            {HOME_LINKS.map((l, i) => {
              const mobileStyle = {
                display: 'block', padding: '0.9rem 0',
                fontSize: '1.05rem', fontWeight: 600,
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                color: (!!l.href && activeLink === l.href) ? 'var(--brand-orange)' : 'var(--text-primary)',
                textDecoration: 'none',
              }
              return (
                <motion.div
                  key={l.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.055 }}
                >
                  {l.to ? (
                    <Link to={l.to} onClick={() => setOpen(false)} style={mobileStyle}>{l.label}</Link>
                  ) : (
                    <a href={page ? '/' + l.href : l.href} onClick={() => setOpen(false)} style={mobileStyle}>{l.label}</a>
                  )}
                </motion.div>
              )
            })}
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
            {/* Contact — pinned last */}
            <a
              href={page ? '/#contact' : '#contact'}
              onClick={() => setOpen(false)}
              style={{
                display: 'block', padding: '0.9rem 0',
                fontSize: '1.05rem', fontWeight: 600,
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                color: activeLink === '#contact' ? 'var(--brand-orange)' : 'var(--text-primary)', textDecoration: 'none',
              }}
            >
              {CONTACT_LINK.label}
            </a>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.38 }}
              style={{ marginTop: '1.25rem' }}
            >
              <Link
                to="/#contact"
                className="btn-primary"
                onClick={() => setOpen(false)}
                style={{ display: 'block', textAlign: 'center' }}
              >
                Free Assessment →
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .nav-logo {
          width: 90px !important;
          height: auto;
          max-width: none;
          object-fit: contain;
        }
        @media (max-width: 1120px) {
          .desktop-nav { display: none !important; }
          .hamburger   { display: flex !important; }
        }
        @media (max-width: 1120px) {
          nav > div { grid-template-columns: 1fr auto !important; }
        }
      `}</style>
    </>
  )
}
