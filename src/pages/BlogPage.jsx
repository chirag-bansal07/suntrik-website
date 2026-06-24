import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { POSTS, CATEGORIES, CATEGORY_COLOR } from '../data/blog'

const fmtDate = d => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
const readTime = post => Math.max(2, Math.round(post.body.reduce((n, b) => n + (b.text || (b.items || []).join(' ') || '').split(/\s+/).length, 0) / 200))

function Badge({ category }) {
  const c = CATEGORY_COLOR[category] || '#FF6B1A'
  return (
    <span style={{ fontSize: '0.66rem', fontWeight: 700, color: c, background: `${c}1a`, border: `1px solid ${c}40`, padding: '0.2rem 0.65rem', borderRadius: 100, whiteSpace: 'nowrap' }}>
      {category}
    </span>
  )
}

// Renders one body block inside the article / modal
function Block({ block }) {
  switch (block.type) {
    case 'h2':
      return <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: 'clamp(1.2rem, 2.4vw, 1.5rem)', margin: '1.75rem 0 0.75rem' }}>{block.text}</h2>
    case 'ul':
      return (
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', margin: '0.4rem 0 1.2rem' }}>
          {block.items.map(it => (
            <li key={it} style={{ display: 'flex', gap: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.97rem', lineHeight: 1.7 }}>
              <span style={{ color: 'var(--brand-orange)', flexShrink: 0 }}>✓</span>{it}
            </li>
          ))}
        </ul>
      )
    case 'quote':
      return (
        <blockquote style={{ margin: '1.5rem 0', padding: '0.9rem 1.4rem', borderLeft: '3px solid var(--brand-orange)', background: 'rgba(255,107,26,0.06)', borderRadius: '0 10px 10px 0', fontStyle: 'italic', fontSize: '1rem', lineHeight: 1.7 }}>
          {block.text}
        </blockquote>
      )
    default:
      return <p style={{ color: 'var(--text-secondary)', fontSize: '0.97rem', lineHeight: 1.85, marginBottom: '1rem' }}>{block.text}</p>
  }
}

export default function BlogPage() {
  const [active, setActive] = useState('All')
  const [query, setQuery] = useState('')
  const [openPost, setOpenPost] = useState(null)

  useEffect(() => { window.scrollTo(0, 0); document.title = 'Blog | Suntrik Green Energy — Solar Policy & Updates' }, [])

  // Lock background scroll + close on Escape while the modal is open
  useEffect(() => {
    if (openPost) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    const onKey = e => { if (e.key === 'Escape') setOpenPost(null) }
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) }
  }, [openPost])

  const sorted = [...POSTS].sort((a, b) => new Date(b.date) - new Date(a.date))
  const filtered = sorted.filter(p =>
    (active === 'All' || p.category === active) &&
    (query.trim() === '' || (p.title + ' ' + p.excerpt).toLowerCase().includes(query.toLowerCase()))
  )
  const featured = active === 'All' && query.trim() === '' ? filtered[0] : null
  const rest = featured ? filtered.slice(1) : filtered
  const accent = openPost ? (CATEGORY_COLOR[openPost.category] || '#FF6B1A') : '#FF6B1A'

  return (
    <div style={{ background: '#060A0F', minHeight: '100vh', color: 'var(--text-primary)' }}>
      <Navbar page />

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #060A0F 0%, #0d1a2e 50%, #060A0F 100%)', padding: '8rem 0 3rem', position: 'relative', overflow: 'hidden', borderBottom: '1px solid rgba(255,107,26,0.12)' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 860, height: 420, background: 'radial-gradient(ellipse, rgba(255,107,26,0.09) 0%, transparent 65%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <span style={{ background: 'rgba(255,107,26,0.15)', color: 'var(--brand-orange)', fontSize: '0.72rem', fontWeight: 700, padding: '0.3rem 0.9rem', borderRadius: 100, border: '1px solid rgba(255,107,26,0.3)' }}>📰 Insights & Updates</span>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.4rem)', fontWeight: 900, margin: '1.1rem 0 1rem', lineHeight: 1.1 }}>
            Solar Policy & <span className="gradient-text">Company News</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 580, margin: '0 auto', lineHeight: 1.8 }}>
            Plain-English breakdowns of the latest government solar schemes — PM Surya Ghar, PM-KUSUM and more — plus the latest from the Suntrik team.
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="container" style={{ padding: '2.5rem 0 1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setActive(c)} style={{
                padding: '0.5rem 1.1rem', borderRadius: 100, border: '1px solid',
                borderColor: active === c ? 'transparent' : 'rgba(255,255,255,0.12)',
                background: active === c ? 'var(--gradient-sun)' : 'transparent',
                color: active === c ? '#fff' : 'var(--text-secondary)',
                fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer', fontFamily: 'inherit',
              }}>{c}</button>
            ))}
          </div>
          <input
            value={query} onChange={e => setQuery(e.target.value)} placeholder="Search articles…"
            style={{ padding: '0.55rem 1rem', borderRadius: 8, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', color: 'var(--text-primary)', fontSize: '0.85rem', outline: 'none', fontFamily: 'inherit', minWidth: 220 }}
          />
        </div>
      </div>

      {/* Featured */}
      {featured && (
        <div className="container" style={{ paddingBottom: '2rem' }}>
          <motion.div whileHover={{ y: -4 }} onClick={() => setOpenPost(featured)} className="blog-featured"
            style={{ cursor: 'pointer', display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 0, borderRadius: 18, overflow: 'hidden', border: '1px solid rgba(255,107,26,0.18)', background: 'rgba(255,255,255,0.03)' }}>
            <div style={{ position: 'relative', minHeight: 280, aspectRatio: '16/10' }}>
              <img src={featured.cover} alt={featured.title} loading="eager" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', marginBottom: '0.9rem', flexWrap: 'wrap' }}>
                <Badge category={featured.category} />
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Featured · {fmtDate(featured.date)}</span>
              </div>
              <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: 'clamp(1.3rem, 2.4vw, 1.9rem)', lineHeight: 1.2, marginBottom: '0.75rem' }}>{featured.title}</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, fontSize: '0.92rem', marginBottom: '1.25rem' }}>{featured.excerpt}</p>
              <span className="btn-primary" style={{ alignSelf: 'flex-start' }}>Read Article →</span>
            </div>
          </motion.div>
        </div>
      )}

      {/* Grid */}
      <div className="container" style={{ paddingBottom: '5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }} className="blog-grid">
          <AnimatePresence mode="popLayout">
            {rest.map((p, i) => (
              <motion.article key={p.slug} layout onClick={() => setOpenPost(p)}
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, delay: i * 0.05 }} whileHover={{ y: -6 }}
                style={{ cursor: 'pointer', height: '100%', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', display: 'flex', flexDirection: 'column', transition: 'border-color 0.25s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = `${CATEGORY_COLOR[p.category]}66`}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}>
                <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
                  <img src={p.cover} alt={p.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  <div style={{ position: 'absolute', top: '0.85rem', left: '0.85rem' }}><Badge category={p.category} /></div>
                </div>
                <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.05rem', lineHeight: 1.3, marginBottom: '0.5rem' }}>{p.title}</h3>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>{p.excerpt}</p>
                  <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    <span>{fmtDate(p.date)}</span>
                    <span>{readTime(p)} min read</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>No articles found. Try a different category or search.</div>
        )}
      </div>

      {/* ── Article modal (blurred backdrop, same page) ── */}
      <AnimatePresence>
        {openPost && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpenPost(null)}
            style={{ position: 'fixed', inset: 0, zIndex: 1300, background: 'rgba(6,10,15,0.72)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '5vh 1rem', overflowY: 'auto' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              onClick={e => e.stopPropagation()}
              style={{ position: 'relative', width: '100%', maxWidth: 780, background: '#0a1020', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 18, overflow: 'hidden', boxShadow: '0 40px 110px rgba(0,0,0,0.65)' }}
            >
              <div style={{ height: 4, background: `linear-gradient(90deg, ${accent}, transparent)` }} />
              <button onClick={() => setOpenPost(null)} aria-label="Close article"
                style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 3, width: 38, height: 38, borderRadius: '50%', background: 'rgba(6,10,15,0.6)', border: '1px solid rgba(255,255,255,0.22)', color: '#fff', fontSize: '1.25rem', cursor: 'pointer', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}>×</button>

              <div style={{ aspectRatio: '16/8', overflow: 'hidden' }}>
                <img src={openPost.cover} alt={openPost.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>

              <div style={{ padding: 'clamp(1.4rem, 4vw, 2.25rem)' }}>
                <div style={{ display: 'flex', gap: '0.7rem', alignItems: 'center', marginBottom: '0.9rem', flexWrap: 'wrap' }}>
                  <Badge category={openPost.category} />
                  <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>{fmtDate(openPost.date)} · {readTime(openPost)} min read · {openPost.author}</span>
                </div>
                <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 900, fontSize: 'clamp(1.4rem, 3.2vw, 2rem)', lineHeight: 1.2, marginBottom: '1.25rem' }}>{openPost.title}</h2>
                {openPost.body.map((b, i) => <Block key={i} block={b} />)}

                <div style={{ marginTop: '1.75rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  <Link to="/#contact" onClick={() => setOpenPost(null)} className="btn-primary" style={{ textDecoration: 'none' }}>Get Free Assessment →</Link>
                  <Link to={`/blog/${openPost.slug}`} className="btn-outline" style={{ textDecoration: 'none' }}>Open full page ↗</Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      <style>{`
        @media (max-width: 760px) {
          .blog-featured { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
