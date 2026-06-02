import { useState } from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const contactInfo = [
  { icon: '📍', label: 'Address', value: 'Suntrik Green Energy Pvt. Ltd., Haryana, India' },
  { icon: '📞', label: 'Phone',   value: '+91 XXXXX XXXXX' },
  { icon: '✉️', label: 'Email',   value: 'info@suntrik.com' },
  { icon: '🌐', label: 'Website', value: 'www.suntrik.com' },
  { icon: '🕐', label: 'Hours',   value: 'Mon – Sat: 9:00 AM – 6:00 PM' },
]

const serviceTypes = [
  'Residential Rooftop (PM Surya Ghar)',
  'Commercial / Industrial Rooftop',
  'Ground-Mount / Utility',
  'Agricultural Solar (PM-KUSUM)',
  'O&M / AMC for Existing Plant',
  'DPR / Advisory / Consultancy',
]

export default function Contact() {
  const { ref, inView } = useScrollAnimation(0.08)
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: serviceTypes[0], capacity: '', message: '' })
  const [sent, setSent] = useState(false)

  const change = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const submit = e => {
    e.preventDefault()
    // TODO: wire to Formspree / EmailJS / backend API
    setSent(true)
  }

  return (
    <section id="contact" style={{ background: 'var(--bg-base)', padding: '7rem 0' }}>
      <div className="container">
        {/* Header */}
        <div ref={ref} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <motion.span className="section-tag" style={{ justifyContent: 'center' }}
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
            Get In Touch
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.1 }}
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem' }}
          >
            Start Your <span className="gradient-text">Solar Journey</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
            style={{ color: 'var(--text-secondary)', maxWidth: 520, margin: '0 auto' }}
          >
            Fill in the form and our team will reach out within 24 hours with a free feasibility assessment and a no-obligation quote.
          </motion.p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '4rem', alignItems: 'start' }} className="contact-grid">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.65, delay: 0.3 }}
          >
            <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.75rem' }}>
              Contact Suntrik
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem', marginBottom: '2.5rem' }}>
              {contactInfo.map(c => (
                <div key={c.label} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: 10, flexShrink: 0,
                    background: 'rgba(255,107,26,0.1)', border: '1px solid rgba(255,107,26,0.18)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem',
                  }}>{c.icon}</div>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 2 }}>{c.label}</div>
                    <div style={{ fontWeight: 500, color: 'var(--text-primary)', fontSize: '0.9rem' }}>{c.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Scheme badges */}
            <div style={{ marginBottom: '2rem' }}>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>
                Scheme-Ready Installer
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['PM Surya Ghar', 'PM-KUSUM', 'HAREDA Approved', 'MNRE Empanelled'].map(badge => (
                  <span key={badge} style={{
                    fontSize: '0.7rem', fontWeight: 600, padding: '0.3rem 0.8rem',
                    background: 'rgba(255,107,26,0.1)', color: 'var(--brand-orange)',
                    border: '1px solid rgba(255,107,26,0.2)', borderRadius: 100,
                  }}>{badge}</span>
                ))}
              </div>
            </div>

            {/* Social */}
            <div>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>Follow Us</p>
              <div style={{ display: 'flex', gap: '0.6rem' }}>
                {[['in', 'LinkedIn'], ['fb', 'Facebook'], ['ig', 'Instagram'], ['yt', 'YouTube']].map(([s, label]) => (
                  <a key={s} href="#" aria-label={label} style={{
                    width: 38, height: 38, borderRadius: 8,
                    border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.68rem', color: 'var(--text-secondary)', fontWeight: 700,
                    transition: 'all 0.2s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--brand-orange)'; e.currentTarget.style.color = 'var(--brand-orange)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
                  >{s.toUpperCase()}</a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.65, delay: 0.4 }}
          >
            {sent ? (
              <div style={{
                textAlign: 'center', padding: '3.5rem 2rem', borderRadius: 12,
                background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.2)',
              }}>
                <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>✅</div>
                <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.5rem', color: '#10B981', marginBottom: '0.75rem' }}>Enquiry Sent!</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Our team will contact you within 24 hours with a free feasibility assessment.</p>
              </div>
            ) : (
              <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <Field label="Full Name"   name="name"  value={form.name}  onChange={change} placeholder="Your name"         required />
                  <Field label="Email"       name="email" type="email" value={form.email} onChange={change} placeholder="you@example.com" required />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <Field label="Phone" name="phone" type="tel" value={form.phone} onChange={change} placeholder="+91 XXXXX XXXXX" />
                  <Field label="Approx. Capacity" name="capacity" value={form.capacity} onChange={change} placeholder="e.g. 10 kWp, 100 kWp…" />
                </div>

                {/* Service type */}
                <div>
                  <label style={labelStyle}>Service Required</label>
                  <select name="service" value={form.service} onChange={change} style={inputStyle}>
                    {serviceTypes.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label style={labelStyle}>Project Details</label>
                  <textarea
                    name="message" value={form.message} onChange={change} rows={4} required
                    placeholder="Location, roof type (RCC / metal sheet), current monthly electricity bill, any specific requirements…"
                    style={{ ...inputStyle, resize: 'vertical', fontFamily: 'Inter, sans-serif', lineHeight: 1.6 }}
                    onFocus={e => e.target.style.borderColor = 'rgba(255,107,26,0.5)'}
                    onBlur={e  => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start', marginTop: '0.25rem' }}>
                  Request Free Assessment →
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
      `}</style>
    </section>
  )
}

const labelStyle = { display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.45rem', fontWeight: 500 }
const inputStyle  = {
  width: '100%', padding: '0.8rem 1rem', borderRadius: 6,
  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)',
  color: 'var(--text-primary)', fontSize: '0.875rem', outline: 'none',
  fontFamily: 'Inter, sans-serif', transition: 'border-color 0.2s',
}

function Field({ label, name, type = 'text', value, onChange, placeholder, required }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input
        type={type} name={name} value={value} onChange={onChange}
        placeholder={placeholder} required={required}
        style={inputStyle}
        onFocus={e => e.target.style.borderColor = 'rgba(255,107,26,0.5)'}
        onBlur={e  => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
      />
    </div>
  )
}
