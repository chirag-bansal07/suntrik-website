import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { SIRSA_FAQS as FAQS } from '../data/faqs'

const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=Suntrik+Solutions+Rania+Bazar+Sirsa+Haryana'

const SERVICES = [
  { icon: '🏠', title: 'Home Rooftop Solar (PM Surya Ghar)', desc: 'Grid-tied rooftop systems for Sirsa homes with up to ₹78,000 central subsidy. We handle the national portal, DHBVN net metering and the subsidy claim.', to: '/schemes/surya-ghar', cta: 'PM Surya Ghar details' },
  { icon: '🌾', title: 'Solar for Farmers (PM-KUSUM)', desc: 'Component A ground-mount plants on farmland and Component C solarisation of grid-connected pumps, with HAREDA coordination from application to commissioning.', to: '/schemes/kusum', cta: 'PM-KUSUM details' },
  { icon: '🏭', title: 'Shops, Schools & Industry (C&I)', desc: 'Rooftop and ground-mount solar for shops, cold stores, schools, hospitals and factories — PVsyst-modelled yield, net metering and a 2-year AMC.', to: '/schemes/ci', cta: 'Commercial solar details' },
  { icon: '🔧', title: 'Service & Maintenance', desc: 'Cleaning schedules, inverter health checks and fault repair for solar plants in and around Sirsa.', to: '/#contact', cta: 'Book a service visit' },
]

const STEPS = [
  { n: '01', t: 'Free site survey', d: 'An engineer visits your home, farm or premises in Sirsa and checks the roof or land and your DHBVN bill.' },
  { n: '02', t: 'Design & quote', d: 'You get a system design and a written quote showing the cost after subsidy.' },
  { n: '03', t: 'Approvals', d: 'We file the scheme application and the DHBVN net-metering request and follow up until approved.' },
  { n: '04', t: 'Installation', d: 'Our in-house crew installs modules, inverter, structure and cabling — no sub-contractors.' },
  { n: '05', t: 'Net meter & subsidy', d: 'We coordinate the DHBVN inspection and net meter, then submit the subsidy claim.' },
]

const card = { padding: '1.4rem', background: 'rgba(255,107,26,0.04)', border: '1px solid rgba(255,107,26,0.14)', borderRadius: 14 }
const h2Style = { fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800 }

export default function SirsaPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div style={{ background: '#060A0F', minHeight: '100vh', color: 'var(--text-primary)' }}>
      <Navbar page />

      {/* ── Hero ── */}
      <div style={{ background: 'linear-gradient(135deg, #060A0F 0%, #1a0f06 50%, #060A0F 100%)', padding: '7.5rem 0 3.5rem', borderBottom: '1px solid rgba(255,107,26,0.15)' }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <span style={{ background: 'rgba(255,107,26,0.15)', color: 'var(--brand-orange)', fontSize: '0.72rem', fontWeight: 700, padding: '0.3rem 0.9rem', borderRadius: 100, border: '1px solid rgba(255,107,26,0.3)' }}>📍 Head office: Rania Bazar, Sirsa</span>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 900, margin: '1.1rem 0 1rem', lineHeight: 1.1 }}>
            Solar Company in <span className="gradient-text">Sirsa, Haryana</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.02rem', maxWidth: 680 }}>
            Suntrik started in Sirsa in 2018 as Suntrik Solutions and is now Suntrik Green Energy Pvt. Ltd. From our office in Rania Bazar we design and install rooftop solar for homes,
            PM-KUSUM solar for farmers and commercial solar for businesses across Sirsa district — and handle the subsidy and DHBVN net-metering paperwork for you.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.75rem' }}>
            <a href="tel:+917503739000" className="btn-primary" style={{ textDecoration: 'none' }}>Call +91 75037 39000</a>
            <Link to="/#contact" className="btn-outline" style={{ textDecoration: 'none' }}>Get a Free Site Survey</Link>
          </div>
        </div>
      </div>

      {/* ── Services ── */}
      <div style={{ padding: '4rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container">
          <h2 style={{ ...h2Style, marginBottom: '0.6rem' }}>Solar Services in Sirsa</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 620, marginBottom: '2rem' }}>One team for survey, design, installation, approvals and after-sales service.</p>
          <div className="sirsa-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.1rem' }}>
            {SERVICES.map(s => (
              <div key={s.title} style={card}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.6rem' }} aria-hidden="true">{s.icon}</div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem' }}>{s.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '0.9rem' }}>{s.desc}</p>
                <Link to={s.to} style={{ color: 'var(--brand-orange)', fontSize: '0.85rem', fontWeight: 600 }}>{s.cta} →</Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Process ── */}
      <div style={{ padding: '4rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container">
          <h2 style={{ ...h2Style, marginBottom: '2rem' }}>How Solar Installation Works in Sirsa</h2>
          <ol className="sirsa-steps" style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem', padding: 0 }}>
            {STEPS.map(s => (
              <li key={s.n} style={{ ...card, padding: '1.1rem' }}>
                <div style={{ color: 'var(--brand-orange)', fontWeight: 800, fontFamily: 'Space Grotesk, sans-serif', marginBottom: '0.4rem' }}>{s.n}</div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.35rem' }}>{s.t}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', lineHeight: 1.65 }}>{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* ── Office + review ── */}
      <div style={{ padding: '4rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container sirsa-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.1rem' }}>
          <div style={card}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1rem' }}>Visit Our Sirsa Office</h2>
            <address style={{ fontStyle: 'normal', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              <strong style={{ color: 'var(--text-primary)' }}>Suntrik Green Energy Pvt. Ltd.</strong><br />
              Rania Bazar, near Red Cross Office<br />
              Sirsa, Haryana 125055<br />
              Phone / WhatsApp: <a href="tel:+917503739000" style={{ color: 'var(--brand-orange)', textDecoration: 'underline' }}>+91 75037 39000</a><br />
              Email: <a href="mailto:info@suntrik.com" style={{ color: 'var(--brand-orange)', textDecoration: 'underline' }}>info@suntrik.com</a>
            </address>
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ display: 'inline-block', marginTop: '1.2rem', textDecoration: 'none' }}>Open in Google Maps</a>
          </div>
          <figure style={{ ...card, margin: 0 }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1rem' }}>What Sirsa Customers Say</h2>
            <blockquote style={{ color: 'var(--text-primary)', fontStyle: 'italic', lineHeight: 1.8, margin: 0 }}>
              “Best vendor in Sirsa for solar installation and other services. Smooth and hassle free process. Best quality products used.”
            </blockquote>
            <figcaption style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.8rem' }}>— Abhishek Sharma, Sirsa (Google review)</figcaption>
          </figure>
        </div>
      </div>

      {/* ── FAQs ── */}
      <div style={{ padding: '4rem 0' }}>
        <div className="container" style={{ maxWidth: 860 }}>
          <h2 style={{ ...h2Style, marginBottom: '1.5rem' }}>Solar in Sirsa — Frequently Asked Questions</h2>
          {FAQS.map(f => (
            <details key={f.q} style={{ ...card, marginBottom: '0.75rem', padding: '1rem 1.2rem' }}>
              <summary style={{ fontWeight: 700, cursor: 'pointer' }}>{f.q}</summary>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, marginTop: '0.7rem', fontSize: '0.92rem' }}>{f.a}</p>
            </details>
          ))}
          <p style={{ color: 'var(--text-secondary)', marginTop: '2rem' }}>
            Also read: <Link to="/blog/pm-surya-ghar-subsidy-guide" style={{ color: 'var(--brand-orange)' }}>PM Surya Ghar subsidy guide</Link> · <Link to="/projects" style={{ color: 'var(--brand-orange)' }}>Our projects</Link>
          </p>
        </div>
      </div>

      <Footer />
      <style>{`
        @media(max-width:960px){ .sirsa-steps { grid-template-columns: 1fr 1fr !important; } }
        @media(max-width:700px){ .sirsa-grid, .sirsa-steps { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  )
}
