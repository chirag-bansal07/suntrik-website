import { useState, useEffect, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const HR_EMAIL = 'hr.suntrik@gmail.com'
const HR_PHONE = '8708605564'

const JOBS = [
  {
    id: 'solar-design-engineer',
    title: 'Solar Design Engineer',
    dept: 'Engineering',
    location: 'Jaipur, Rajasthan',
    exp: '2+ yrs',
    summary: 'Design, test, and improve solar structure components for ground-mounted projects — meeting functional and quality standards.',
    skills: ['AutoCAD', 'SolidWorks', 'STAAD Pro', 'PVsyst', 'SketchUp', 'MS Office'],
    points: [
      'Strong CAD skills + STAAD Pro for solar structure design',
      '2+ years in solar ground-mounted projects',
      "Bachelor's in Mechanical / Electrical Engineering",
      'Strong problem-solving & attention to detail',
    ],
  },
  {
    id: 'project-manager',
    title: 'Project Manager',
    dept: 'Projects',
    location: 'Jalore, Rajasthan',
    exp: 'Experienced',
    summary: 'Drive execution of solar ground-mounted projects on schedule and budget — construction, commissioning, QA, and stakeholder management.',
    skills: ['Project Management', 'Commissioning', 'Budgeting', 'QA', 'Vendor Mgmt'],
    points: [
      "Bachelor's in Engineering / Business",
      'Proven experience managing solar ground-mounted projects',
      'Manage multiple projects simultaneously',
      'Knowledge of regulations & safety standards',
    ],
  },
  {
    id: 'apm-site-engineer',
    title: 'APM / Sr. Site Engineer',
    dept: 'Projects',
    location: 'Jalore, Rajasthan',
    exp: '3+ yrs',
    summary: 'Oversee construction and commissioning of solar power projects — safety, quality control, progress tracking, and site coordination.',
    skills: ['Site Execution', 'Commissioning', 'Safety', 'Reporting'],
    points: [
      "Bachelor's in Engineering / Business",
      'Proven experience on solar ground-mounted projects',
      'Coordinate installers & manage project risks',
      'In-depth knowledge of solar systems',
    ],
  },
  {
    id: 'bdm-bde',
    title: 'Business Development Manager / Executive',
    dept: 'Sales',
    location: 'Jaipur, Rajasthan',
    exp: '2+ yrs',
    summary: 'Identify and grow new business in the solar sector — managing relationships with customers, dealers, EPC companies, and channel partners.',
    skills: ['B2B Sales', 'CRM', 'Negotiation', 'Market Research'],
    points: [
      "Bachelor's (B.Tech) / MBA preferred",
      '2+ years BD / Sales in the solar industry',
      'Strong communication & negotiation skills',
      'Customer-centric and target-driven',
    ],
  },
  {
    id: 'marketing-manager',
    title: 'Marketing Manager',
    dept: 'Marketing',
    location: 'Jaipur (Office-based)',
    exp: '2+ yrs',
    summary: 'Plan and execute marketing — fairs, events, digital campaigns, and brand consistency across channels. Male & female candidates welcome.',
    skills: ['Digital Marketing', 'Events', 'Branding', 'Social Media'],
    points: [
      'MBA (Marketing preferred)',
      '2+ years experience (solar industry a plus)',
      'Plan exhibitions, events & promotions',
      'Manage social, email & content',
    ],
  },
]

const labelStyle = { display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.45rem', fontWeight: 500 }
const inputStyle = {
  width: '100%', padding: '0.8rem 1rem', borderRadius: 6,
  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)',
  color: 'var(--text-primary)', fontSize: '0.875rem', outline: 'none',
  fontFamily: 'Inter, sans-serif', transition: 'border-color 0.2s', boxSizing: 'border-box',
}

export default function CareersPage() {
  const [params] = useSearchParams()
  const sent = params.get('sent') === '1'
  const [role, setRole] = useState('')
  const formRef = useRef(null)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  const applyTo = title => {
    setRole(title)
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const nextUrl = typeof window !== 'undefined' ? `${window.location.origin}/careers?sent=1` : ''

  return (
    <div style={{ background: '#060A0F', minHeight: '100vh', color: 'var(--text-primary)' }}>
      <Navbar page />

      {/* ── Hero ── */}
      <div style={{ background: 'linear-gradient(135deg, #060A0F 0%, #1a0f06 50%, #060A0F 100%)', padding: '8rem 0 3.5rem', position: 'relative', overflow: 'hidden', borderBottom: '1px solid rgba(255,107,26,0.15)' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 900, height: 460, background: 'radial-gradient(ellipse, rgba(255,107,26,0.1) 0%, transparent 65%)', filter: 'blur(60px)' }} />
        </div>
        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <span style={{ background: 'rgba(255,107,26,0.15)', color: 'var(--brand-orange)', fontSize: '0.72rem', fontWeight: 700, padding: '0.3rem 0.9rem', borderRadius: 100, border: '1px solid rgba(255,107,26,0.3)' }}>💼 We're Hiring</span>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.4rem)', fontWeight: 900, margin: '1.1rem 0 1rem', lineHeight: 1.1 }}>
            Build India's <span className="gradient-text">Solar Future</span> With Us
          </h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 580, margin: '0 auto', lineHeight: 1.8 }}>
            Join Suntrik Green Energy — a fast-growing solar EPC delivering ground-mount, rooftop, and PM-KUSUM projects across Rajasthan, Haryana, and beyond. Explore our open roles below and apply in minutes.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1.75rem' }}>
            <a href="#openings" className="btn-primary" style={{ textDecoration: 'none' }}>View {JOBS.length} Open Roles ↓</a>
            <a href="#apply" className="btn-outline">Apply Now</a>
          </div>
        </div>
      </div>

      {/* ── Openings ── */}
      <div id="openings" style={{ padding: '4rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--brand-orange)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', display: 'block', marginBottom: '0.6rem' }}>Current Openings</span>
            <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800 }}>Open Positions</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.25rem' }} className="careers-grid">
            {JOBS.map(j => (
              <div key={j.id} style={{ display: 'flex', flexDirection: 'column', borderRadius: 16, border: '1px solid rgba(255,107,26,0.15)', background: 'rgba(255,255,255,0.025)', overflow: 'hidden' }}>
                <div style={{ height: 3, background: 'var(--gradient-sun)' }} />
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.62rem', fontWeight: 700, color: 'var(--brand-orange)', background: 'rgba(255,107,26,0.1)', border: '1px solid rgba(255,107,26,0.25)', padding: '0.18rem 0.6rem', borderRadius: 100 }}>{j.dept}</span>
                    <span style={{ fontSize: '0.62rem', fontWeight: 600, color: 'var(--text-muted)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '0.18rem 0.6rem', borderRadius: 100 }}>📍 {j.location}</span>
                    <span style={{ fontSize: '0.62rem', fontWeight: 600, color: 'var(--text-muted)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '0.18rem 0.6rem', borderRadius: 100 }}>🧭 {j.exp}</span>
                  </div>
                  <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.15rem', marginBottom: '0.5rem', lineHeight: 1.25 }}>{j.title}</h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '0.9rem' }}>{j.summary}</p>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '1rem' }}>
                    {j.points.map(p => (
                      <li key={p} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.76rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                        <span style={{ color: 'var(--brand-orange)', flexShrink: 0 }}>✓</span>{p}
                      </li>
                    ))}
                  </ul>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.25rem' }}>
                    {j.skills.map(s => (
                      <span key={s} style={{ fontSize: '0.66rem', fontWeight: 600, color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '0.2rem 0.55rem', borderRadius: 6 }}>{s}</span>
                    ))}
                  </div>
                  <button onClick={() => applyTo(j.title)} className="btn-primary" style={{ marginTop: 'auto', alignSelf: 'flex-start', cursor: 'pointer', border: 'none', fontFamily: 'inherit' }}>
                    Apply for this role →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Application form ── */}
      <div id="apply" ref={formRef} style={{ padding: '4rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--brand-orange)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', display: 'block', marginBottom: '0.6rem' }}>Apply Now</span>
            <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, marginBottom: '0.5rem' }}>Submit Your Application</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Fill the form and attach your resume — our HR team will get back to shortlisted candidates.</p>
          </div>

          {sent ? (
            <div style={{ textAlign: 'center', padding: '3.5rem 2rem', borderRadius: 14, background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.2)' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>✅</div>
              <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.5rem', color: '#10B981', marginBottom: '0.75rem' }}>Application Received!</h3>
              <p style={{ color: 'var(--text-secondary)', maxWidth: 460, margin: '0 auto 1.5rem' }}>
                Thank you for applying to Suntrik. Our HR team will review your application and reach out to shortlisted candidates. For any queries, write to <a href={`mailto:${HR_EMAIL}`} style={{ color: 'var(--brand-orange)' }}>{HR_EMAIL}</a>.
              </p>
              <Link to="/careers" className="btn-outline" style={{ textDecoration: 'none' }}>View More Roles</Link>
            </div>
          ) : (
            <form
              action="https://formsubmit.co/info@suntrik.com"
              method="POST"
              encType="multipart/form-data"
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              {/* FormSubmit config — delivers to info@suntrik.com, CC hr.suntrik@gmail.com */}
              <input type="hidden" name="_subject" value="New Career Application — Suntrik Website" />
              <input type="hidden" name="_cc" value={HR_EMAIL} />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value={nextUrl} />
              {/* honeypot */}
              <input type="text" name="_honey" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="careers-form-row">
                <div>
                  <label style={labelStyle}>Full Name *</label>
                  <input name="name" required placeholder="Your name" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Email *</label>
                  <input name="email" type="email" required placeholder="you@example.com" style={inputStyle} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="careers-form-row">
                <div>
                  <label style={labelStyle}>Phone *</label>
                  <input name="phone" type="tel" required placeholder="+91 XXXXX XXXXX" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Current City</label>
                  <input name="city" placeholder="e.g. Jaipur" style={inputStyle} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="careers-form-row">
                <div>
                  <label style={labelStyle}>Position Applying For *</label>
                  <select name="position" required value={role} onChange={e => setRole(e.target.value)} style={{ ...inputStyle, colorScheme: 'dark', cursor: 'pointer' }}>
                    <option value="" disabled style={{ background: '#0d1320', color: '#fff' }}>Select a role…</option>
                    {JOBS.map(j => <option key={j.id} value={j.title} style={{ background: '#0d1320', color: '#fff' }}>{j.title}</option>)}
                    <option value="Other / General Application" style={{ background: '#0d1320', color: '#fff' }}>Other / General Application</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Total Experience</label>
                  <input name="experience" placeholder="e.g. 3 years" style={inputStyle} />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Resume / CV * <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(PDF or DOC, max 5 MB)</span></label>
                <input name="resume" type="file" accept=".pdf,.doc,.docx" required style={{ ...inputStyle, padding: '0.6rem 1rem', cursor: 'pointer' }} />
              </div>

              <div>
                <label style={labelStyle}>Cover Note</label>
                <textarea name="message" rows={4} placeholder="Tell us briefly why you'd be a great fit — relevant projects, notice period, current/expected CTC, etc."
                  style={{ ...inputStyle, resize: 'vertical', fontFamily: 'Inter, sans-serif', lineHeight: 1.6 }} />
              </div>

              <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start', marginTop: '0.25rem' }}>
                Submit Application →
              </button>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                By submitting, your details and resume are sent to Suntrik HR (info@suntrik.com &amp; {HR_EMAIL}).
              </p>
            </form>
          )}
        </div>
      </div>

      {/* ── Queries ── */}
      <div style={{ padding: '3.5rem 0', textAlign: 'center', background: 'linear-gradient(135deg, #060A0F 0%, #1a0f06 50%, #060A0F 100%)' }}>
        <div className="container" style={{ maxWidth: 560 }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📩</div>
          <h2 style={{ fontSize: 'clamp(1.3rem, 3vw, 1.9rem)', fontWeight: 800, marginBottom: '0.6rem' }}>Questions About a Role?</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
            For any queries regarding openings or your application, reach out to our HR team directly.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={`mailto:${HR_EMAIL}`} className="btn-primary" style={{ textDecoration: 'none' }}>✉️ {HR_EMAIL}</a>
            <a href={`tel:+91${HR_PHONE}`} className="btn-outline">📞 {HR_PHONE}</a>
          </div>
        </div>
      </div>

      <Footer />
      <style>{`
        @media (max-width: 560px) {
          .careers-grid { grid-template-columns: 1fr !important; }
          .careers-form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
