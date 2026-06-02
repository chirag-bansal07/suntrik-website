import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'About',    href: '#about'    },
  { label: 'Services', href: '#services' },
  { label: 'Why Us',   href: '#why-us'   },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact'  },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open,     setOpen]     = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          padding: '0 2rem',
          background: scrolled ? 'rgba(6,10,15,0.93)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,107,26,0.1)' : 'none',
          transition: 'all 0.35s ease',
        }}
      >
        <div style={{
          maxWidth: 1320, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: 70,
        }}>
          {/* Logo */}
          <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'var(--gradient-sun)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1rem', fontWeight: 900, color: '#fff',
              boxShadow: '0 0 18px rgba(255,107,26,0.45)',
              flexShrink: 0,
            }}>S</div>
            <div>
              <div style={{
                fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700,
                fontSize: '1.2rem', lineHeight: 1.1, letterSpacing: '-0.02em',
              }}>
                Sun<span style={{ color: 'var(--brand-orange)' }}>trik</span>
              </div>
              <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Green Energy
              </div>
            </div>
          </a>

          {/* Desktop nav */}
          <ul style={{ display: 'flex', gap: '2.2rem', listStyle: 'none', alignItems: 'center' }} className="desktop-nav">
            {links.map(l => (
              <li key={l.label}>
                <a
                  href={l.href}
                  style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
                  onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#contact" className="btn-primary" style={{ padding: '0.55rem 1.35rem', fontSize: '0.8rem' }}>
                Free Assessment
              </a>
            </li>
          </ul>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(o => !o)}
            className="hamburger"
            style={{ display: 'none', flexDirection: 'column', gap: 5, padding: 8, background: 'none', border: 'none', cursor: 'pointer' }}
            aria-label="Open menu"
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block', width: 24, height: 2,
                background: 'var(--text-primary)', borderRadius: 1,
                transition: 'all 0.3s ease',
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

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22 }}
            style={{
              position: 'fixed', top: 70, left: 0, right: 0, zIndex: 999,
              background: 'rgba(6,10,15,0.98)', backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(255,107,26,0.12)',
              padding: '1.25rem 2rem 1.75rem',
            }}
          >
            {links.map(l => (
              <a key={l.label} href={l.href} onClick={() => setOpen(false)} style={{
                display: 'block', padding: '0.85rem 0',
                fontSize: '1.05rem', fontWeight: 600,
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                color: 'var(--text-primary)',
              }}>
                {l.label}
              </a>
            ))}
            <a href="#contact" className="btn-primary" onClick={() => setOpen(false)}
              style={{ marginTop: '1.25rem', width: '100%', justifyContent: 'center' }}>
              Free Assessment
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger   { display: flex !important; }
        }
      `}</style>
    </>
  )
}
