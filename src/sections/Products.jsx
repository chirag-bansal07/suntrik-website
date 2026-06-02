import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const categories = ['All', 'Solar Panels', 'Mounting Systems', 'Inverters', 'Accessories']

const products = [
  {
    id: 1, cat: 'Solar Panels',
    name: 'Mono PERC Solar Panel',
    spec: '400W – 550W',
    desc: 'High-efficiency monocrystalline PERC cells delivering superior performance even in low-light conditions.',
    tags: ['High Efficiency', 'All Weather', 'Tier-1'],
    img: null, // Replace with product image path
  },
  {
    id: 2, cat: 'Solar Panels',
    name: 'Bifacial Solar Panel',
    spec: '450W – 600W',
    desc: 'Dual-sided glass panels that capture reflected sunlight for up to 30% higher energy yield.',
    tags: ['Bifacial', 'Glass-Glass', 'High Yield'],
    img: null,
  },
  {
    id: 3, cat: 'Mounting Systems',
    name: 'Rooftop Fixed Mount',
    spec: 'Aluminum Alloy',
    desc: 'Lightweight, corrosion-resistant rooftop mounting systems designed for RCC, metal sheet, and tile roofs.',
    tags: ['Wind Rated', 'Galvanised', 'Easy Install'],
    img: null,
  },
  {
    id: 4, cat: 'Mounting Systems',
    name: 'Ground Mount Structure',
    spec: 'GI / Aluminum',
    desc: 'Heavy-duty ground-mount structures engineered for large utility-scale solar farms.',
    tags: ['Utility Scale', 'Adjustable Tilt', 'Pile/Ballast'],
    img: null,
  },
  {
    id: 5, cat: 'Inverters',
    name: 'String Inverter',
    spec: '3kW – 110kW',
    desc: 'High-efficiency string inverters with intelligent MPPT tracking and built-in monitoring.',
    tags: ['MPPT', 'WiFi Monitor', 'IP65'],
    img: null,
  },
  {
    id: 6, cat: 'Accessories',
    name: 'Solar DC Cable & Connectors',
    spec: 'MC4 / H1Z2Z2-K',
    desc: 'UV-resistant, double-insulated solar cables and weatherproof MC4 connectors for outdoor installations.',
    tags: ['UV Resistant', 'TÜV Certified', 'IP68'],
    img: null,
  },
]

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('All')
  const { ref, inView } = useScrollAnimation(0.05)

  const filtered = activeCategory === 'All' ? products : products.filter(p => p.cat === activeCategory)

  return (
    <section id="products" style={{ background: 'var(--bg-elevated)', padding: '7rem 0' }}>
      <div className="container">
        <div ref={ref} style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <motion.span
            className="section-tag"
            style={{ justifyContent: 'center' }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Our Products
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem' }}
          >
            Complete Solar <span className="gradient-text">Product Range</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ color: 'var(--text-secondary)', maxWidth: 560, margin: '0 auto' }}
          >
            From panels to mounting hardware — everything you need for a complete solar installation, manufactured to international standards.
          </motion.p>
        </div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '0.55rem 1.25rem', borderRadius: 100,
                fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.04em',
                cursor: 'pointer', transition: 'all 0.2s ease',
                background: activeCategory === cat ? 'var(--gradient-sun)' : 'rgba(255,255,255,0.06)',
                color: activeCategory === cat ? '#fff' : 'var(--text-secondary)',
                border: activeCategory === cat ? 'none' : '1px solid rgba(255,255,255,0.1)',
                boxShadow: activeCategory === cat ? 'var(--shadow-btn)' : 'none',
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Products grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="glass-card"
                style={{ padding: 0, overflow: 'hidden', cursor: 'pointer', transition: 'border-color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,107,26,0.3)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
              >
                {/* Product image area */}
                <div style={{
                  aspectRatio: '16/9', background: 'linear-gradient(135deg, var(--bg-surface), var(--bg-deep))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative', overflow: 'hidden',
                }}>
                  {product.img
                    ? <img src={product.img} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : (
                      <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🔆</div>
                        <p style={{ fontSize: '0.75rem' }}>Product image</p>
                      </div>
                    )
                  }
                  <div style={{
                    position: 'absolute', top: 12, left: 12,
                    background: 'rgba(255,107,26,0.9)', color: '#fff',
                    fontSize: '0.7rem', fontWeight: 700, padding: '0.25rem 0.75rem',
                    borderRadius: 100, letterSpacing: '0.05em',
                  }}>
                    {product.cat}
                  </div>
                </div>

                {/* Product info */}
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.1rem', fontWeight: 700 }}>{product.name}</h3>
                    <span style={{ fontSize: '0.78rem', color: 'var(--brand-orange)', fontWeight: 600, whiteSpace: 'nowrap', marginLeft: '0.5rem' }}>{product.spec}</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>{product.desc}</p>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {product.tags.map(tag => (
                      <span key={tag} style={{
                        fontSize: '0.7rem', padding: '0.2rem 0.65rem',
                        background: 'rgba(255,107,26,0.1)', color: 'var(--brand-orange)',
                        borderRadius: 4, fontWeight: 600, letterSpacing: '0.03em',
                        border: '1px solid rgba(255,107,26,0.2)',
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <a href="#contact" className="btn-primary">Request Full Catalogue</a>
        </div>
      </div>
    </section>
  )
}
