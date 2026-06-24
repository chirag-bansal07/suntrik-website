import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { getPost, POSTS, CATEGORY_COLOR } from '../data/blog'

const fmtDate = d => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
const readTime = post => Math.max(2, Math.round(post.body.reduce((n, b) => n + (b.text || (b.items || []).join(' ') || '').split(/\s+/).length, 0) / 200))

function Block({ block }) {
  switch (block.type) {
    case 'h2':
      return <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: 'clamp(1.25rem, 2.4vw, 1.6rem)', margin: '2rem 0 0.85rem' }}>{block.text}</h2>
    case 'ul':
      return (
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem', margin: '0.5rem 0 1.25rem' }}>
          {block.items.map(it => (
            <li key={it} style={{ display: 'flex', gap: '0.6rem', color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7 }}>
              <span style={{ color: 'var(--brand-orange)', flexShrink: 0 }}>✓</span>{it}
            </li>
          ))}
        </ul>
      )
    case 'quote':
      return (
        <blockquote style={{ margin: '1.75rem 0', padding: '1rem 1.5rem', borderLeft: '3px solid var(--brand-orange)', background: 'rgba(255,107,26,0.06)', borderRadius: '0 10px 10px 0', fontStyle: 'italic', color: 'var(--text-primary)', fontSize: '1.05rem', lineHeight: 1.7 }}>
          {block.text}
        </blockquote>
      )
    default:
      return <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.85, marginBottom: '1.1rem' }}>{block.text}</p>
  }
}

export default function BlogPostPage() {
  const { slug } = useParams()
  const post = getPost(slug)

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = post ? `${post.title} | Suntrik Blog` : 'Article not found | Suntrik'
  }, [post])

  if (!post) {
    return (
      <div style={{ background: '#060A0F', minHeight: '100vh', color: 'var(--text-primary)' }}>
        <Navbar page />
        <div className="container" style={{ padding: '10rem 0 6rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Article not found</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>The article you're looking for doesn't exist or has moved.</p>
          <Link to="/blog" className="btn-primary" style={{ textDecoration: 'none' }}>← Back to Blog</Link>
        </div>
        <Footer />
      </div>
    )
  }

  const related = POSTS.filter(p => p.slug !== post.slug && p.category === post.category).slice(0, 2)
  const accent = CATEGORY_COLOR[post.category] || '#FF6B1A'

  return (
    <div style={{ background: '#060A0F', minHeight: '100vh', color: 'var(--text-primary)' }}>
      <Navbar page />

      {/* Hero */}
      <div style={{ position: 'relative', padding: '7.5rem 0 2.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          <img src={post.cover} alt="" aria-hidden style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.18 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(6,10,15,0.82), rgba(6,10,15,0.96))' }} />
        </div>
        <div className="container" style={{ position: 'relative', maxWidth: 820 }}>
          <Link to="/blog" style={{ color: 'var(--text-muted)', fontSize: '0.82rem', textDecoration: 'none' }}>← All articles</Link>
          <div style={{ display: 'flex', gap: '0.7rem', alignItems: 'center', margin: '1rem 0', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.68rem', fontWeight: 700, color: accent, background: `${accent}1a`, border: `1px solid ${accent}40`, padding: '0.22rem 0.7rem', borderRadius: 100 }}>{post.category}</span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{fmtDate(post.date)} · {readTime(post)} min read</span>
          </div>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 900, fontSize: 'clamp(1.7rem, 4vw, 2.8rem)', lineHeight: 1.15, marginBottom: '1rem' }}>{post.title}</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '1rem' }}>{post.excerpt}</p>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>By {post.author}</div>
        </div>
      </div>

      {/* Cover image */}
      <div className="container" style={{ maxWidth: 820, marginTop: '-0.5rem' }}>
        <img src={post.cover} alt={post.title} style={{ width: '100%', borderRadius: 16, margin: '2rem 0', border: '1px solid rgba(255,255,255,0.08)' }} />
      </div>

      {/* Body */}
      <article className="container" style={{ maxWidth: 760, paddingBottom: '3rem' }}>
        {post.body.map((b, i) => <Block key={i} block={b} />)}
      </article>

      {/* CTA */}
      <div className="container" style={{ maxWidth: 760, paddingBottom: '3.5rem' }}>
        <div style={{ padding: '2rem', borderRadius: 16, background: 'rgba(255,107,26,0.05)', border: '1px solid rgba(255,107,26,0.15)', textAlign: 'center' }}>
          <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.25rem', marginBottom: '0.6rem' }}>Want help navigating this scheme?</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>Suntrik handles registration, installation, and subsidy — end to end. Get a free assessment.</p>
          <Link to="/#contact" className="btn-primary" style={{ textDecoration: 'none' }}>Get Free Assessment →</Link>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="container" style={{ maxWidth: 980, paddingBottom: '5rem' }}>
          <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.1rem', marginBottom: '1.25rem' }}>Related articles</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {related.map(p => (
              <Link key={p.slug} to={`/blog/${p.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}>
                  <div style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
                    <img src={p.cover} alt={p.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '1rem 1.1rem' }}>
                    <h4 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.3 }}>{p.title}</h4>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
