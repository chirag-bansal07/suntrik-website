const cols = {
  'Company': ['About Us', 'Our Team', 'Careers', 'Blog'],
  'Services': ['Site Survey & Design', 'EPC Installation', 'Operations & Maintenance', 'Solar Advisory / DPR'],
  'Schemes': ['PM Surya Ghar', 'PM-KUSUM', 'HAREDA Programmes', 'Net-Metering Assistance'],
  'Support':  ['Contact Us', 'Get a Quote', 'FAQs', 'Warranty & AMC'],
}

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-deep)', borderTop: '1px solid rgba(255,107,26,0.08)', padding: '4.5rem 0 2rem' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr 1fr 1fr 1fr', gap: '3rem', marginBottom: '3rem' }} className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'var(--gradient-sun)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1rem', fontWeight: 900, color: '#fff',
                boxShadow: '0 0 16px rgba(255,107,26,0.4)',
                flexShrink: 0,
              }}>S</div>
              <div>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.15rem' }}>
                  Sun<span style={{ color: 'var(--brand-orange)' }}>trik</span>
                </div>
                <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Green Energy Pvt. Ltd.
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: 270, marginBottom: '1.5rem' }}>
              North India's trusted Solar EPC partner — delivering advisory, engineering, turnkey installation, and lifetime O&amp;M for homes, businesses, and farms since 2018.
            </p>

            {/* Scheme badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '1.5rem' }}>
              {['NISE Certified', 'MNRE Empanelled', 'PM Surya Ghar'].map(b => (
                <span key={b} style={{
                  fontSize: '0.65rem', fontWeight: 600, padding: '0.2rem 0.65rem',
                  background: 'rgba(255,107,26,0.1)', color: 'var(--brand-orange)',
                  border: '1px solid rgba(255,107,26,0.2)', borderRadius: 100,
                }}>{b}</span>
              ))}
            </div>

            {/* Socials */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {[['in','LinkedIn'],['fb','Facebook'],['ig','Instagram'],['yt','YouTube']].map(([s, l]) => (
                <a key={s} href="#" aria-label={l} style={{
                  width: 36, height: 36, borderRadius: 8,
                  border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 700,
                  transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--brand-orange)'; e.currentTarget.style.borderColor = 'rgba(255,107,26,0.35)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)';   e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
                >{s.toUpperCase()}</a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(cols).map(([col, items]) => (
            <div key={col}>
              <h4 style={{
                fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.82rem', fontWeight: 700,
                color: 'var(--text-primary)', marginBottom: '1.25rem', letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}>{col}</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                {items.map(item => (
                  <li key={item}>
                    <a href="#" style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', transition: 'color 0.2s', lineHeight: 1.4 }}
                      onMouseEnter={e => e.target.style.color = 'var(--brand-orange)'}
                      onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
                    >{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.5rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '1rem',
        }}>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} Suntrik Green Energy Pvt. Ltd. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Privacy Policy', 'Terms of Use', 'Sitemap'].map(l => (
              <a key={l} href="#" style={{ fontSize: '0.78rem', color: 'var(--text-muted)', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = 'var(--text-secondary)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
              >{l}</a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
