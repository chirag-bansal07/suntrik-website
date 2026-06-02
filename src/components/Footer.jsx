const footerLinks = {
  Company: ['About Us', 'Our Team', 'Careers', 'News & Updates'],
  Products: ['Solar Panels', 'Mounting Systems', 'Inverters', 'Accessories'],
  Services: ['Rooftop Solar', 'Ground Mount', 'Solar AMC', 'Energy Audit'],
  Support: ['Documentation', 'Warranty', 'FAQs', 'Contact Us'],
}

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-deep)', borderTop: '1px solid rgba(255,107,26,0.1)', padding: '4rem 0 2rem' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: '3rem', marginBottom: '3rem' }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: 38, height: 38, borderRadius: '50%',
                background: 'var(--gradient-sun)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.1rem', fontWeight: 900, color: '#fff',
              }}>S</div>
              <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.25rem' }}>
                Sun<span style={{ color: 'var(--brand-orange)' }}>trik</span>
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: 280, marginBottom: '1.5rem' }}>
              Empowering India's clean energy transition with world-class solar products and end-to-end installation services.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {['in', 'fb', 'ig', 'yt'].map(s => (
                <a key={s} href="#" style={{
                  width: 36, height: 36, borderRadius: 8,
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.04)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700,
                  transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--brand-orange)'; e.currentTarget.style.borderColor = 'rgba(255,107,26,0.4)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
                >{s.toUpperCase()}</a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([col, links]) => (
            <div key={col}>
              <h4 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.25rem', letterSpacing: '0.05em' }}>
                {col}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {links.map(l => (
                  <li key={l}>
                    <a href="#" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.target.style.color = 'var(--brand-orange)'}
                      onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
                    >{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.5rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem',
        }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} Suntrik Energy Pvt. Ltd. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Privacy Policy', 'Terms of Use', 'Sitemap'].map(l => (
              <a key={l} href="#" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = 'var(--text-secondary)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
              >{l}</a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          footer .container > div:first-child { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          footer .container > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
