/**
 * Hero — Frame-extracted canvas playback
 *
 * Why this is smooth:
 *   1. On mount, we seek a hidden <video> to every 1/24-th of a second,
 *      draw it to an offscreen canvas, and store the JPEG as an HTMLImageElement.
 *      This happens once — during loading.
 *   2. During scroll, we do:
 *         frame = frames[ Math.floor(progress * totalFrames) ]
 *         ctx.drawImage(frame, ...)
 *      drawImage is synchronous and runs on the GPU compositor thread.
 *      There is ZERO async seek latency — each scroll tick shows a new frame.
 *   3. scrub: true  → ScrollTrigger fires onUpdate every RAF, not every DOM event.
 *      Combined with instant canvas draws = perfectly smooth 1:1 scroll-to-frame.
 */

import { useEffect, useRef, useState } from 'react'
import { gsap }          from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ── Constants ──────────────────────────────────────────────────────────────
const SCRUB_SECONDS   = 8       // how many video seconds are scroll-driven
const EXTRACT_FPS     = 24      // frames per second to extract  →  8×24 = 192 frames
const EXTRACT_W       = 1280    // extraction width (height derived from video AR)
const JPEG_QUALITY    = 0.80    // 0-1, higher = sharper frames, more memory
const TEXT_START_PCT  = 0.82    // scroll progress where text begins sliding in
// ──────────────────────────────────────────────────────────────────────────

/** Draw an image onto a canvas with CSS object-fit:cover behaviour */
function drawCover(ctx, img, cw, ch) {
  const iw = img.naturalWidth  || EXTRACT_W
  const ih = img.naturalHeight || Math.round(EXTRACT_W * 9 / 16)
  const ir = iw / ih
  const cr = cw / ch
  let sx = 0, sy = 0, sw = iw, sh = ih
  if (ir > cr) { sw = ih * cr;  sx = (iw - sw) / 2 }
  else          { sh = iw / cr; sy = (ih - sh) / 2 }
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch)
}

export default function Hero() {
  // ── Refs ────────────────────────────────────────────────────────────────
  const wrapperRef  = useRef(null)
  const canvasRef   = useRef(null)
  const framesRef   = useRef([])      // stores every extracted HTMLImageElement
  const curIdxRef   = useRef(0)       // current frame index (for resize redraws)
  const textTlRef   = useRef(null)

  const tagRef   = useRef(null)
  const h1Ref    = useRef(null)
  const subRef   = useRef(null)
  const btnsRef  = useRef(null)
  const statsRef = useRef(null)

  // ── State ───────────────────────────────────────────────────────────────
  const [loadPct, setLoadPct] = useState(0)
  const [ready,   setReady  ] = useState(false)

  // ════════════════════════════════════════════════════════════════════════
  // PHASE 1 — Frame extraction
  //   Runs once on mount. Seeks the video frame by frame, encodes each to
  //   JPEG via an offscreen canvas, and stores it as an Image element.
  // ════════════════════════════════════════════════════════════════════════
  useEffect(() => {
    // Guard: if frames were already extracted (e.g. HMR re-mount), skip
    if (framesRef.current.length > 0) { setReady(true); return }

    const offscreen = document.createElement('canvas')
    const octx      = offscreen.getContext('2d', { willReadFrequently: true })
    const video     = document.createElement('video')
    const extracted = []
    let   fi        = 0   // current frame index during extraction
    let   total     = 0   // total frames to extract (set once metadata loads)

    video.src        = '/hero-reel.mp4'
    video.muted      = true
    video.playsInline = true
    video.preload    = 'auto'

    const captureNext = () => {
      if (fi >= total) {
        framesRef.current = extracted
        setReady(true)
        return
      }

      // Register one-time seeked listener, then seek to target time
      video.addEventListener('seeked', function onSeeked() {
        // Draw video frame to offscreen canvas
        octx.drawImage(video, 0, 0, offscreen.width, offscreen.height)

        // Encode as JPEG data URL → create Image element
        const img = new Image()
        img.src   = offscreen.toDataURL('image/jpeg', JPEG_QUALITY)
        extracted.push(img)

        setLoadPct(Math.round(((fi + 1) / total) * 100))
        fi++
        captureNext()   // ← recurse for next frame
      }, { once: true })

      video.currentTime = fi / EXTRACT_FPS
    }

    video.addEventListener('loadedmetadata', () => {
      const extractH   = Math.round(EXTRACT_W * video.videoHeight / video.videoWidth)
      offscreen.width  = EXTRACT_W
      offscreen.height = extractH

      total = Math.round(Math.min(video.duration, SCRUB_SECONDS) * EXTRACT_FPS)
      captureNext()
    }, { once: true })

    video.load()
    // No cleanup needed — data URLs are GC'd when extracted array is replaced
  }, [])

  // ════════════════════════════════════════════════════════════════════════
  // PHASE 2 — ScrollTrigger + canvas render
  //   Runs once `ready` flips to true (all frames in memory).
  //   Each scroll tick maps progress → frame index → ctx.drawImage()
  // ════════════════════════════════════════════════════════════════════════
  useEffect(() => {
    if (!ready) return

    const canvas  = canvasRef.current
    const ctx     = canvas.getContext('2d')
    const wrapper = wrapperRef.current
    const frames  = framesRef.current

    // ── Size canvas to the viewport & redraw on resize ──────────────────
    const syncSize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      const f = frames[curIdxRef.current]
      if (f?.complete) drawCover(ctx, f, canvas.width, canvas.height)
    }
    syncSize()
    window.addEventListener('resize', syncSize, { passive: true })

    // Draw frame 0 immediately (before any scroll)
    const drawFrame = (img) => {
      if (img?.complete) drawCover(ctx, img, canvas.width, canvas.height)
      else if (img)      img.onload = () => drawCover(ctx, img, canvas.width, canvas.height)
    }
    drawFrame(frames[0])

    // ── Text initial state (off-screen right) ───────────────────────────
    const textEls = [tagRef, h1Ref, subRef, btnsRef, statsRef]
      .map(r => r.current).filter(Boolean)
    gsap.set(textEls, { x: 115, autoAlpha: 0 })

    // ── Text reveal timeline (paused — we scrub its progress manually) ──
    const textTl = gsap.timeline({ paused: true })
    textEls.forEach((el, i) => {
      textTl.fromTo(
        el,
        { x: 115, autoAlpha: 0 },
        { x: 0,   autoAlpha: 1, ease: 'power3.out', duration: 0.5 },
        i * 0.13,  // stagger start time within the paused timeline
      )
    })
    textTlRef.current = textTl

    // ── ScrollTrigger ────────────────────────────────────────────────────
    const st = ScrollTrigger.create({
      trigger:         wrapper,
      start:           'top top',
      end:             '+=280%',
      pin:             true,
      pinSpacing:      true,
      anticipatePin:   1,
      scrub:           true,   // ← immediate (no lag), fires on every RAF tick
      invalidateOnRefresh: true,

      onUpdate(self) {
        const p      = self.progress            // 0 → 1
        const total  = frames.length

        // ── 1. Frame ─────────────────────────────────────────────────────
        const idx = Math.min(Math.floor(p * total), total - 1)
        if (idx !== curIdxRef.current) {
          curIdxRef.current = idx
          const frame = frames[idx]
          if (frame?.complete) drawCover(ctx, frame, canvas.width, canvas.height)
        }

        // ── 2. Text ───────────────────────────────────────────────────────
        // Map scroll progress [TEXT_START_PCT → 1.0] to textTl [0 → 1]
        if (p >= TEXT_START_PCT) {
          textTl.progress(
            Math.min((p - TEXT_START_PCT) / (1 - TEXT_START_PCT), 1),
          )
        } else if (p < TEXT_START_PCT - 0.02) {
          textTl.progress(0)
        }
      },

      // Ensure text is fully visible once pin releases (safety net)
      onLeave() { textTl.progress(1) },
    })

    return () => {
      st.kill()
      textTl.kill()
      window.removeEventListener('resize', syncSize)
    }
  }, [ready])

  // ════════════════════════════════════════════════════════════════════════
  // JSX
  // ════════════════════════════════════════════════════════════════════════
  return (
    <section
      id="hero"
      ref={wrapperRef}
      style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', background: '#060A0F' }}
    >
      {/* ── Loading overlay ─────────────────────────────────────────────── */}
      {!ready && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 20,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          background: '#060A0F', gap: '1.75rem',
        }}>
          {/* Logo pulse */}
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: 'var(--gradient-sun)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.6rem', fontWeight: 900, color: '#fff',
            animation: 'logoPulse 1.6s ease-in-out infinite',
            boxShadow: '0 0 40px rgba(255,107,26,0.4)',
          }}>S</div>

          {/* Progress bar */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: 220, height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 2, overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: 2,
                background: 'var(--gradient-sun)',
                width: `${loadPct}%`,
                transition: 'width 0.25s ease',
              }} />
            </div>
            <div style={{
              fontSize: '0.72rem', letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'var(--text-muted)',
            }}>
              Preparing experience · {loadPct}%
            </div>
          </div>
        </div>
      )}

      {/* ── Canvas — every scroll tick draws a new frame here ───────────── */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          zIndex: 0,
          opacity:    ready ? 1 : 0,
          transition: 'opacity 0.7s ease',
        }}
      />

      {/* ── Gradient overlay ─────────────────────────────────────────────── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'linear-gradient(118deg, rgba(6,10,15,0.80) 0%, rgba(6,10,15,0.25) 55%, rgba(6,10,15,0.55) 100%)',
      }} />

      {/* ── Scroll hint ──────────────────────────────────────────────────── */}
      <div style={{
        position: 'absolute', bottom: '2.5rem', left: '50%',
        transform: 'translateX(-50%)', zIndex: 3,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
        pointerEvents: 'none',
        opacity: ready ? 1 : 0, transition: 'opacity 0.5s ease 0.5s',
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

      {/* ── Text block — revealed by textTl during the last 18% of scroll ── */}
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
              <a href="#contact"  className="btn-outline" style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }}>
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
