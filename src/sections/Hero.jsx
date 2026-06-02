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

import { useEffect, useRef, useState } from 'react'
import { gsap }          from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ── Constants ──────────────────────────────────────────────────────────────
const FRAMES_PATH    = '/hero-frames'
const TEXT_START_PCT = 0.82   // scroll progress where text begins sliding in

// ── Helpers ────────────────────────────────────────────────────────────────

/** Draw an image onto canvas with CSS object-fit:cover behaviour */
function drawCover(ctx, img, cw, ch) {
  const iw = img.naturalWidth  || img.width  || 1280
  const ih = img.naturalHeight || img.height || 720
  const ir = iw / ih
  const cr = cw / ch
  let sx = 0, sy = 0, sw = iw, sh = ih
  if (ir > cr) { sw = ih * cr;  sx = (iw - sw) / 2 }
  else          { sh = iw / cr; sy = (ih - sh) / 2 }
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch)
}

// ──────────────────────────────────────────────────────────────────────────

export default function Hero() {
  // ── Refs ──────────────────────────────────────────────────────────────
  const wrapperRef = useRef(null)
  const canvasRef  = useRef(null)
  const framesRef  = useRef([])     // array of loaded HTMLImageElements
  const curIdxRef  = useRef(0)      // last drawn frame index

  const tagRef   = useRef(null)
  const h1Ref    = useRef(null)
  const subRef   = useRef(null)
  const btnsRef  = useRef(null)
  const statsRef = useRef(null)

  // ── State ─────────────────────────────────────────────────────────────
  const [loadPct, setLoadPct] = useState(0)
  const [ready,   setReady  ] = useState(false)

  // ════════════════════════════════════════════════════════════════════
  // PHASE 1 — Load pre-extracted frames from public/hero-frames/
  // ════════════════════════════════════════════════════════════════════
  useEffect(() => {
    let cancelled = false

    fetch(`${FRAMES_PATH}/manifest.json`)
      .then(r => {
        if (!r.ok) throw new Error('manifest.json not found — run: npm run extract-frames')
        return r.json()
      })
      .then(({ count }) => {
        if (cancelled) return

        const imgs   = new Array(count)
        let   loaded = 0

        const onLoad = () => {
          if (cancelled) return
          loaded++
          setLoadPct(Math.round((loaded / count) * 100))
          if (loaded === count) {
            framesRef.current = imgs
            setReady(true)
          }
        }

        for (let i = 0; i < count; i++) {
          const img = new Image()
          img.onload  = onLoad
          img.onerror = onLoad   // count errors so we still reach 100%
          img.src = `${FRAMES_PATH}/frame-${String(i + 1).padStart(4, '0')}.jpg`
          imgs[i] = img
        }
      })
      .catch(err => {
        console.error('[Hero]', err.message)
        // Graceful fallback: skip canvas, page still renders
        if (!cancelled) setReady(true)
      })

    return () => { cancelled = true }
  }, [])

  // ════════════════════════════════════════════════════════════════════
  // PHASE 2 — Wire ScrollTrigger + canvas once all frames are ready
  //
  // Uses gsap.context() so that .revert() unwinds ScrollTrigger's
  // pin-spacer DOM mutations BEFORE React runs its own removeChild —
  // preventing the "not a child of this node" error on HMR / unmount.
  // ════════════════════════════════════════════════════════════════════
  useEffect(() => {
    if (!ready) return

    const canvas  = canvasRef.current
    const ctx     = canvas?.getContext('2d')
    const wrapper = wrapperRef.current
    const frames  = framesRef.current
    if (!canvas || !ctx || !wrapper || !frames.length) return

    // ── Canvas sizing (managed outside GSAP context) ────────────────
    const syncSize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      const f = frames[curIdxRef.current]
      if (f?.complete) drawCover(ctx, f, canvas.width, canvas.height)
    }
    syncSize()
    window.addEventListener('resize', syncSize, { passive: true })

    // Draw frame 0 immediately
    const f0 = frames[0]
    if (f0?.complete) drawCover(ctx, f0, canvas.width, canvas.height)
    else if (f0) f0.onload = () => drawCover(ctx, f0, canvas.width, canvas.height)

    // ── All GSAP work inside a context ──────────────────────────────
    // gsap.context().revert() reverts pin-spacers + inline styles in
    // the right order, before React's virtual DOM cleanup fires.
    const gc = gsap.context(() => {
      const textEls = [tagRef, h1Ref, subRef, btnsRef, statsRef]
        .map(r => r.current).filter(Boolean)

      gsap.set(textEls, { x: 115, autoAlpha: 0 })

      const textTl = gsap.timeline({ paused: true })
      textEls.forEach((el, i) => {
        textTl.fromTo(
          el,
          { x: 115, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, ease: 'power3.out', duration: 0.5 },
          i * 0.13,
        )
      })

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
          const p   = self.progress
          const len = frames.length
          const idx = Math.min(Math.floor(p * len), len - 1)

          if (idx !== curIdxRef.current) {
            curIdxRef.current = idx
            const frame = frames[idx]
            if (frame?.complete) drawCover(ctx, frame, canvas.width, canvas.height)
          }

          if (p >= TEXT_START_PCT) {
            textTl.progress(Math.min((p - TEXT_START_PCT) / (1 - TEXT_START_PCT), 1))
          } else if (p < TEXT_START_PCT - 0.02) {
            textTl.progress(0)
          }
        },

        onLeave() { textTl.progress(1) },
      })
    }, wrapper)  // scoped to wrapper element

    return () => {
      gc.revert()   // ← unwinds pin-spacer BEFORE React's removeChild
      window.removeEventListener('resize', syncSize)
    }
  }, [ready])

  // ════════════════════════════════════════════════════════════════════
  // JSX
  // ════════════════════════════════════════════════════════════════════
  return (
    <section
      id="hero"
      ref={wrapperRef}
      style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', background: '#060A0F' }}
    >
      {/* ── Loading overlay (only shown while frames are downloading) ── */}
      {!ready && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 20,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          background: '#060A0F', gap: '1.75rem',
        }}>
          <div style={{
            width: 60, height: 60, borderRadius: '50%',
            background: 'var(--gradient-sun)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.5rem', fontWeight: 900, color: '#fff',
            animation: 'logoPulse 1.6s ease-in-out infinite',
            boxShadow: '0 0 40px rgba(255,107,26,0.4)',
          }}>S</div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.7rem' }}>
            <div style={{ width: 220, height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 2, overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: 2,
                background: 'var(--gradient-sun)',
                width: `${loadPct}%`, transition: 'width 0.2s ease',
              }} />
            </div>
            <span style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Loading · {loadPct}%
            </span>
          </div>
        </div>
      )}

      {/* ── Canvas — each scroll tick draws one pre-extracted frame ──── */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          zIndex: 0, opacity: ready ? 1 : 0, transition: 'opacity 0.6s ease',
        }}
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
        opacity: ready ? 1 : 0, transition: 'opacity 0.5s ease 0.3s',
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
