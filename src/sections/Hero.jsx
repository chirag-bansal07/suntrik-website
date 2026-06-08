/**
 * Hero — Video background with scroll-driven text reveal
 *
 * Uses hero-reel.mp4 directly (autoplay loop) as the background.
 * Text elements animate in via GSAP ScrollTrigger scrub as before.
 */

import { useEffect, useRef } from 'react'
import { gsap }          from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const wrapperRef = useRef(null)

  const tagRef   = useRef(null)
  const h1Ref    = useRef(null)
  const subRef   = useRef(null)
  const btnsRef  = useRef(null)
  const statsRef = useRef(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const gc = gsap.context(() => {
      const textEls = [tagRef, h1Ref, subRef, btnsRef, statsRef]
        .map(r => r.current).filter(Boolean)

      const WINDOWS = [
        { enter: 0.06, exit: 0.20 },
        { enter: 0.22, exit: 0.40 },
        { enter: 0.42, exit: 0.58 },
        { enter: 0.60, exit: 0.74 },
        { enter: 0.76, exit: 0.90 },
      ]

      textEls.forEach(el => {
        gsap.set(el, { x: 115, opacity: 0, visibility: 'visible' })
      })

      const setX  = textEls.map(el => gsap.quickSetter(el, 'x',       'px'))
      const setOp = textEls.map(el => gsap.quickSetter(el, 'opacity'))
      const easeOut3 = t => t <= 0 ? 0 : t >= 1 ? 1 : 1 - Math.pow(1 - t, 3)

      const updateText = (p) => {
        WINDOWS.forEach(({ enter, exit }, i) => {
          if (!setX[i]) return
          const localP = p <= enter ? 0 : p >= exit ? 1 : (p - enter) / (exit - enter)
          const eased  = easeOut3(localP)
          setX[i] (115 * (1 - eased))
          setOp[i](eased)
        })
      }

      ScrollTrigger.create({
        trigger:  wrapper,
        start:    'top top',
        end:      '+=280%',
        pin:      true,
        pinSpacing:      true,
        anticipatePin:   1,
        scrub:           true,
        invalidateOnRefresh: true,
        onUpdate(self) { updateText(self.progress) },
        onLeave()      { updateText(1) },
        onLeaveBack()  { updateText(0) },
      })
    }, wrapper)

    return () => gc.revert()
  }, [])

  // ════════════════════════════════════════════════════════════════════
  // JSX
  // ════════════════════════════════════════════════════════════════════
  return (
    <section
      id="hero"
      ref={wrapperRef}
      style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', background: '#060A0F' }}
    >
      {/* ── Video background ─────────────────────────────────────────── */}
      <video
        autoPlay muted loop playsInline
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', zIndex: 0,
        }}
      >
        <source src="/hero-reel.mp4" type="video/mp4" />
      </video>

      {/* ── Gradient overlay ─────────────────────────────────────────── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'linear-gradient(118deg, rgba(6,10,15,0.80) 0%, rgba(6,10,15,0.25) 55%, rgba(6,10,15,0.55) 100%)',
      }} />

      {/* ── Scroll hint ──────────────────────────────────────────────── */}
      <div style={{
        position: 'absolute', bottom: '2.5rem', left: '50%',
        transform: 'translateX(-50%)', zIndex: 3,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
        pointerEvents: 'none',
      }}>
        <span style={{ fontSize: '0.62rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
          Scroll
        </span>
        <div style={{
          width: '1px', height: '48px',
          background: 'linear-gradient(to bottom, rgba(255,107,26,0.9), transparent)',
          animation: 'scrollPulse 1.9s ease-in-out infinite',
        }} />
      </div>

      {/* ── Text block ───────────────────────────────────────────────── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        display: 'flex', alignItems: 'center', padding: '0 2rem',
      }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', width: '100%' }}>
          <div style={{ maxWidth: 700 }}>

            <div ref={tagRef} className="section-tag" style={{ marginBottom: '1.1rem' }}>
              Solar EPC Company · North India
            </div>

            <h1 ref={h1Ref} style={{
              fontSize: 'clamp(2.8rem, 6.5vw, 5.2rem)',
              lineHeight: 1.06, marginBottom: '1.4rem',
              color: '#fff', textShadow: '0 2px 40px rgba(0,0,0,0.45)',
            }}>
              Engineering a&nbsp;<br />
              <span className="gradient-text">Cleaner Tomorrow</span>
            </h1>

            <p ref={subRef} style={{
              fontSize: 'clamp(1rem, 1.75vw, 1.15rem)',
              color: 'rgba(240,244,255,0.8)', lineHeight: 1.8,
              maxWidth: 540, marginBottom: '2.2rem',
              textShadow: '0 1px 12px rgba(0,0,0,0.4)',
            }}>
              Suntrik delivers end-to-end solar EPC — site survey, engineering
              design, turnkey installation, and lifetime O&amp;M — across
              Haryana and North India.
            </p>

            <div ref={btnsRef} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3.25rem' }}>
              <a href="#services" className="btn-primary">Our Services</a>
              <a href="#contact"  className="btn-outline"
                style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }}>
                Get Free Assessment
              </a>
            </div>

            <div ref={statsRef} style={{
              display: 'flex', gap: '2.5rem', flexWrap: 'wrap',
              paddingTop: '1.75rem', borderTop: '1px solid rgba(255,255,255,0.1)',
            }}>
              {[
                { value: '10+',    label: 'Years of Experience' },
                { value: '1,000+', label: 'Happy Clients'       },
                { value: '150MW+', label: 'Capacity Installed'  },
                { value: '24/7',   label: 'O&M Support'         },
              ].map(s => (
                <div key={s.label}>
                  <div style={{
                    fontSize: '1.85rem', fontWeight: 900,
                    fontFamily: 'Space Grotesk, sans-serif',
                    background: 'var(--gradient-sun)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text', lineHeight: 1,
                  }}>{s.value}</div>
                  <div style={{
                    fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)',
                    textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 4,
                  }}>{s.label}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
