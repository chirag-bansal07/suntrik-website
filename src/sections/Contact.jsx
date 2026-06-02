import { useState } from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const contactInfo = [
  { icon: '📍', label: 'Address', value: 'Suntrik Energy Pvt. Ltd., [City], [State], India' },
  { icon: '📞', label: 'Phone', value: '+91 XXXXX XXXXX' },
  { icon: '✉️', label: 'Email', value: 'info@suntrik.com' },
  { icon: '🕐', label: 'Working Hours', value: 'Mon – Sat: 9:00 AM – 6:00 PM' },
]

export default function Contact() {
  const { ref, inView } = useScrollAnimation(0.08)
  const [form, setForm] = useState({ name: '', email: '', phone: '', type: 'Residential', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const handleSubmit = e => {
    e.preventDefault()
    // TODO: wire up form submission (Formspree, EmailJS, etc.)
    setSent(true)
  }

  return (
    <section id="contact" style={{ background: 'var(--bg-base)', padding: '7rem 0' }}>
      <div className="container">
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
            style={{ color: 'var(--text-secondary)', maxWidth: 500, margin: '0 auto' }}
          >
            Get a free site assessment and customized solar proposal. Our experts will contact you within 24 hours.
          </motion.p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '4rem', alignItems: 'start' }}>
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.65, delay: 0.3 }}
          >
            <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.25rem', fontWeight: 700, marginBottom: '2rem' }}>Contact Information</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
              {contactInfo.map(c => (
                <div key={c.label} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                    background: 'rgba(255,107,26,0.12)', border: '1px solid rgba(255,107,26,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem',
                  }}>
                    {c.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 2 }}>{c.label}</div>
                    <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{c.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Follow Us</p>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {['LinkedIn', 'Facebook', 'Instagram', 'YouTube'].map(s => (
                  <a key={s} href="#" style={{
                    width: 40, height: 40, borderRadius: 8,
                    border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 600,
                    transition: 'all 0.2s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--brand-orange)'; e.currentTarget.style.color = 'var(--brand-orange)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
                  >
                    {s[0]}
                  </a>
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
                textAlign: 'center', padding: '3rem', borderRadius: 12,
                background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)',
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.5rem', color: '#10B981', marginBottom: '0.75rem' }}>Message Sent!</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Our team will get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <FormField label="Full Name" name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />
                  <FormField label="Email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" required />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <FormField label="Phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" />
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: 500 }}>Project Type</label>
                    <select name="type" value={form.type} onChange={handleChange} style={{
                      width: '100%', padding: '0.8rem 1rem', borderRadius: 6,
                      background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)',
                      color: 'var(--text-primary)', fontSize: '0.875rem', outline: 'none',
                      cursor: 'pointer',
                    }}>
                      {['Residential', 'Commercial', 'Industrial', 'Utility-Scale', 'Other'].map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: 500 }}>Message</label>
                  <textarea
                    name="message" value={form.message} onChange={handleChange}
                    placeholder="Tell us about your project — location, roof size, current energy consumption..."
                    rows={4} required
                    style={{
                      width: '100%', padding: '0.8rem 1rem', borderRadius: 6,
                      background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)',
                      color: 'var(--text-primary)', fontSize: '0.875rem', outline: 'none',
                      resize: 'vertical', fontFamily: 'Inter, sans-serif', lineHeight: 1.6,
                    }}
                    onFocus={e => e.target.style.borderColor = 'rgba(255,107,26,0.5)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
                  />
                </div>
                <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }}>
                  Send Message →
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #contact .container > div:last-child { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
      `}</style>
    </section>
  )
}

function FormField({ label, name, type = 'text', value, onChange, placeholder, required }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: 500 }}>{label}</label>
      <input
        type={type} name={name} value={value} onChange={onChange}
        placeholder={placeholder} required={required}
        style={{
          width: '100%', padding: '0.8rem 1rem', borderRadius: 6,
          background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)',
          color: 'var(--text-primary)', fontSize: '0.875rem', outline: 'none',
          fontFamily: 'Inter, sans-serif', transition: 'border-color 0.2s',
        }}
        onFocus={e => e.target.style.borderColor = 'rgba(255,107,26,0.5)'}
        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
      />
    </div>
  )
}
