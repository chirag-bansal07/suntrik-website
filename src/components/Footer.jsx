import SuntrikLogo from './SuntrikLogo'

const cols = {
  'Company':  ['About Us', 'Leadership Team', 'Careers', 'Blog'],
  'Services': ['Site Survey & Design', 'EPC Installation', 'Operations & Maintenance', 'Solar Advisory / DPR'],
  'Schemes':  ['PM Surya Ghar', 'PM-KUSUM', 'HAREDA Programmes', 'Net-Metering Assistance'],
  'Support':  ['Contact Us', 'Get a Quote', 'FAQs', 'Warranty & AMC'],
}

const CERTS = ['NISE Certified', 'ISO Certified', 'MNRE Empanelled', 'PM-KUSUM', 'PM Surya Ghar', 'DHBVN', 'RRECL']

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-deep)', borderTop: '1px solid rgba(255,107,26,0.08)', padding: '4.5rem 0 2rem' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr 1fr 1fr 1fr', gap: '3rem', marginBottom: '3rem' }} className="footer-grid">

          {/* ── Brand column ──────────────────────────────── */}
          <div>
            <div style={{ marginBottom: '1.25rem' }}>
              <a href="#hero" style={{ display: 'inline-block' }}>
                <SuntrikLogo width={80} />
              </a>
            </div>

            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.85, maxWidth: 270, marginBottom: '1.5rem' }}>
              India's trusted Solar EPC partner — delivering advisory, engineering, turnkey
              installation, and lifetime O&amp;M for homes, businesses, and farms since 2018.
              Part of the Suntrik Group alongside its distribution arm
              and <em>SunMount</em> (mounting structures).
            </p>

            {/* Certification badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
              {CERTS.map(b => (
                <span key={b} style={{
                  fontSize: '0.62rem', fontWeight: 600, padding: '0.18rem 0.6rem',
                  background: 'rgba(255,107,26,0.08)', color: 'var(--brand-orange)',
                  border: '1px solid rgba(255,107,26,0.18)', borderRadius: 100,
                }}>{b}</span>
              ))}
            </div>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {[
                ['in', 'LinkedIn',  'https://linkedin.com'],
                ['fb', 'Facebook',  'https://facebook.com'],
                ['ig', 'Instagram', 'https://instagram.com'],
                ['yt', 'YouTube',   'https://youtube.com'],
              ].map(([s, label, href]) => (
                <a key={s} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  style={{
                    width: 36, height: 36, borderRadius: 8,
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.04)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 700,
                    transition: 'all 0.2s', textDecoration: 'none',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--brand-orange)'; e.currentTarget.style.borderColor = 'rgba(255,107,26,0.4)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)';   e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
                >{s.toUpperCase()}</a>
              ))}
            </div>
          </div>

          {/* ── Link columns ──────────────────────────────── */}
          {Object.entries(cols).map(([col, items]) => (
            <div key={col}>
              <h4 style={{
                fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.78rem', fontWeight: 700,
                color: 'var(--text-primary)', marginBottom: '1.2rem',
                letterSpacing: '0.07em', textTransform: 'uppercase',
              }}>{col}</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.68rem' }}>
                {items.map(item => (
                  <li key={item}>
                    <a href="#" style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', transition: 'color 0.2s', lineHeight: 1.4, textDecoration: 'none' }}
                      onMouseEnter={e => e.target.style.color = 'var(--brand-orange)'}
                      onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
                    >{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Office addresses ────────────────────────────── */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem',
          padding: '2rem', borderRadius: 12,
          background: 'rgba(255,107,26,0.04)',
          border: '1px solid rgba(255,107,26,0.1)',
          marginBottom: '2rem',
        }} className="address-grid">
          {[
            { city: 'Head Office — Sirsa', line1: 'Rania Bazar, Sirsa', line2: 'Haryana 125055' },
            { city: 'Jaipur Office',       line1: '#601 Elemental Mall, DCM', line2: 'Ajmer Road, Jaipur 302201' },
          ].map(a => (
            <div key={a.city}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-orange)', marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                📍 {a.city}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>{a.line1}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{a.line2}</div>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ─────────────────────────────────── */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.5rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '1rem',
        }}>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} Suntrik Green Energy Pvt. Ltd. All rights reserved. · CIN: [on file] · ISO 9001 Certified
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Privacy Policy', 'Terms of Use', 'Sitemap'].map(l => (
              <a key={l} href="#" style={{ fontSize: '0.78rem', color: 'var(--text-muted)', transition: 'color 0.2s', textDecoration: 'none' }}
                onMouseEnter={e => e.target.style.color = 'var(--text-secondary)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
              >{l}</a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1060px) {
          .footer-grid    { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .footer-grid    { grid-template-columns: 1fr !important; }
          .address-grid   { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
