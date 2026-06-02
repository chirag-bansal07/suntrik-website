import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Products', href: '#products' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          padding: '0 2rem',
          background: scrolled ? 'rgba(6,10,15,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,107,26,0.1)' : 'none',
          transition: 'all 0.4s ease',
        }}
      >
        <div style={{ maxWidth: 1320, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
          {/* Logo */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: 38, height: 38, borderRadius: '50%',
              background: 'var(--gradient-sun)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.1rem', fontWeight: 900, color: '#fff',
              boxShadow: '0 0 20px rgba(255,107,26,0.4)',
            }}>S</div>
            <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.25rem', letterSpacing: '-0.02em' }}>
              Sun<span style={{ color: 'var(--brand-orange)' }}>trik</span>
            </span>
          </a>

          {/* Desktop links */}
          <ul style={{ display: 'flex', gap: '2.5rem', listStyle: 'none', alignItems: 'center' }}
            className="nav-links">
            {links.map(l => (
              <li key={l.label}>
                <a href={l.href} style={{
                  fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)',
                  transition: 'color 0.2s',
                }}
                  onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
                  onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#contact" className="btn-primary" style={{ padding: '0.6rem 1.4rem', fontSize: '0.8rem' }}>
                Get a Quote
              </a>
            </li>
          </ul>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="hamburger"
            style={{ display: 'none', flexDirection: 'column', gap: 5, padding: 8 }}
            aria-label="Menu"
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed', top: 72, left: 0, right: 0, zIndex: 99,
              background: 'rgba(6,10,15,0.98)', backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(255,107,26,0.15)',
              padding: '1.5rem 2rem 2rem',
            }}
          >
            {links.map(l => (
              <a key={l.label} href={l.href}
                onClick={() => setOpen(false)}
                style={{
                  display: 'block', padding: '0.9rem 0',
                  fontSize: '1.1rem', fontWeight: 600,
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  color: 'var(--text-primary)',
                }}>
                {l.label}
              </a>
            ))}
            <a href="#contact" className="btn-primary" onClick={() => setOpen(false)}
              style={{ marginTop: '1.5rem', width: '100%', justifyContent: 'center' }}>
              Get a Quote
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  )
}
