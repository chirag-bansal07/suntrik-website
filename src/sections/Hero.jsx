/**
 * Hero — Pre-extracted frame playback
 *
 * Frames live in public/hero-frames/ (generated once via `npm run extract-frames`).
 * On page load we fetch manifest.json to know the count, then preload all
 * JPEG images in parallel.  During scroll, ctx.drawImage(frames[idx]) is
 * called — a synchronous GPU blit, zero seek latency, 1 unique frame per tick.
 *
 * No in-browser extraction, no "Preparing experience" on every reload.
 */

import { useEffect, useRef } from 'react'
import { gsap }          from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ── Constants ──────────────────────────────────────────────────────────────
const FRAMES_PATH = '/hero-frames'

// ── Helpers ────────────────────────────────────────────────────────────────
function drawCover(ctx, img, cw, ch) {
  const iw = img.naturalWidth  || 1280
  const ih = img.naturalHeight || 720
  const ir = iw / ih
  const cr = cw / ch
  let sx = 0, sy = 0, sw = iw, sh = ih
  if (ir > cr) { sw = ih * cr;  sx = (iw - sw) / 2 }
  else          { sh = iw / cr; sy = (ih - sh) / 2 }
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch)
}

// ──────────────────────────────────────────────────────────────────────────

export default function Hero() {
  const wrapperRef = useRef(null)
  const canvasRef  = useRef(null)
  const framesRef  = useRef([])   // sparse array — slots fill as images decode
  const curIdxRef  = useRef(0)

  const tagRef   = useRef(null)
  const h1Ref    = useRef(null)
  const subRef   = useRef(null)
  const btnsRef  = useRef(null)
  const statsRef = useRef(null)

  // ════════════════════════════════════════════════════════════════════
  // Single effect — canvas + ScrollTrigger mount immediately,
  // frames stream in the background; no loading state, no overlay.
  // ════════════════════════════════════════════════════════════════════
  useEffect(() => {
    const canvas  = canvasRef.current
    const ctx     = canvas?.getContext('2d')
    const wrapper = wrapperRef.current
    if (!canvas || !ctx || !wrapper) return

    let cancelled = false

    // ── 1. Size canvas to viewport ──────────────────────────────────
    const syncSize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      const f = framesRef.current[curIdxRef.current]
      if (f?.complete) drawCover(ctx, f, canvas.width, canvas.height)
    }
    syncSize()
    window.addEventListener('resize', syncSize, { passive: true })

    // ── 2. Stream frames from disk — draw each one as it arrives ────
    fetch(`${FRAMES_PATH}/manifest.json`)
      .then(r => r.ok ? r.json() : Promise.reject('Run: npm run extract-frames'))
      .then(({ count }) => {
        if (cancelled) return
        const imgs = new Array(count)
        framesRef.current = imgs

        for (let i = 0; i < count; i++) {
          const img = new Image()
          img.onload = () => {
            if (cancelled) return
            imgs[i] = img
            // Draw frame 0 as soon as it lands — instant first-paint
            if (i === 0) drawCover(ctx, img, canvas.width, canvas.height)
          }
          img.src = `${FRAMES_PATH}/frame-${String(i + 1).padStart(4, '0')}.jpg`
          imgs[i] = img   // store immediately so index is always defined
        }
      })
      .catch(err => console.error('[Hero frames]', err))

    // ── 3. GSAP context — ScrollTrigger + staggered text ───────────
    const gc = gsap.context(() => {
      const textEls = [tagRef, h1Ref, subRef, btnsRef, statsRef]
        .map(r => r.current).filter(Boolean)

      // Each element's scroll window: [enter, exit]
      // Spread evenly across the full pin range so each line appears
      // one-by-one as the user scrolls through the video.
      const WINDOWS = [
        { enter: 0.06, exit: 0.20 },   // section tag
        { enter: 0.22, exit: 0.40 },   // h1 headline
        { enter: 0.42, exit: 0.58 },   // paragraph
        { enter: 0.60, exit: 0.74 },   // buttons
        { enter: 0.76, exit: 0.90 },   // stats strip
      ]

      // Initial state — everything off-screen to the right
      textEls.forEach(el => gsap.set(el, { x: 115, autoAlpha: 0 }))

      // quickSetter: the GSAP-recommended way to set a property on every
      // RAF tick without the overhead of creating a new tween each time.
      const setX     = textEls.map(el => gsap.quickSetter(el, 'x', 'px'))
      const setAlpha = textEls.map(el => gsap.quickSetter(el, 'autoAlpha'))

      // Ease-out cubic — applied manually so we can drive it from scroll
      const easeOut3 = t => t === 0 ? 0 : t >= 1 ? 1 : 1 - Math.pow(1 - t, 3)

      ScrollTrigger.create({
        trigger:         wrapper,
        start:           'top top',
        end:             '+=280%',
        pin:             true,
        pinSpacing:      true,
        anticipatePin:   1,
        scrub:           true,
        invalidateOnRefresh: true,

        onUpdate(self) {
          // ── Frame ──────────────────────────────────────────────────
          const frames = framesRef.current
          if (frames.length) {
            const p   = self.progress
            const idx = Math.min(Math.floor(p * frames.length), frames.length - 1)
            if (idx !== curIdxRef.current) {
              curIdxRef.current = idx
              const frame = frames[idx]
              if (frame?.complete) drawCover(ctx, frame, canvas.width, canvas.height)
            }
          }

          // ── Text — each line animates in within its own scroll window ─
          const p = self.progress
          textEls.forEach((_, i) => {
            const { enter, exit } = WINDOWS[i] ?? {}
            if (!enter && enter !== 0) return

            // localP: 0 before window, 0→1 within window, 1 after
            const localP =
              p < enter ? 0
              : p > exit ? 1
              : (p - enter) / (exit - enter)

            const eased = easeOut3(localP)
            setX[i](115 * (1 - eased))
            setAlpha[i](eased)
          })
        },

        // Guarantee everything is fully on-screen once pin releases
        onLeave() {
          textEls.forEach((_, i) => { setX[i](0); setAlpha[i](1) })
        },
      })
    }, wrapper)

    return () => {
      cancelled = true
      gc.revert()
      window.removeEventListener('resize', syncSize)
    }
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
      {/* ── Canvas — each scroll tick draws one pre-extracted frame ──── */}
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }}
      />

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
                { value: '8+',    label: 'Years of Experience' },
                { value: '500+',  label: 'Projects Completed'  },
                { value: '10MW+', label: 'Capacity Installed'  },
                { value: '24/7',  label: 'O&M Support'         },
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
