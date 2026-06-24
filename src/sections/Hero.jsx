/**
 * Hero — Pre-extracted frame playback (desktop) / static poster (mobile).
 *
 * On desktop we fetch manifest.json, preload the JPEG frames and scrub them on a
 * pinned canvas during scroll. On phones that approach decodes ~190 full-res
 * JPEGs into memory at once and crashes mobile Safari, so small screens get a
 * single static poster image with the text overlaid — no canvas, no pin, no
 * frame loading.
 */

import { useEffect, useRef, useState } from 'react'
import { gsap }          from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import Magnetic from '../components/ui/Magnetic'
import CountUp  from '../components/ui/CountUp'

gsap.registerPlugin(ScrollTrigger)

// ── Constants ──────────────────────────────────────────────────────────────
const FRAMES_PATH = '/hero-frames'
const POSTER = `${FRAMES_PATH}/frame-0001.jpg`

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

export default function Hero() {
  // Decide once, synchronously, so phones never mount the canvas / load frames.
  const [isMobile] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches)

  const wrapperRef = useRef(null)
  const canvasRef  = useRef(null)
  const framesRef  = useRef([])
  const curIdxRef  = useRef(0)

  const tagRef   = useRef(null)
  const h1Ref    = useRef(null)
  const subRef   = useRef(null)
  const btnsRef  = useRef(null)
  const statsRef = useRef(null)

  useEffect(() => {
    if (isMobile) return  // mobile uses the static poster — no canvas/frames/pin

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

    // First-load smoothness: ScrollTrigger can mis-measure the pinned hero
    // before the preloader hides / fonts / layout settle — which made the first
    // scroll-through janky (it self-corrected only after a full pass). Refresh
    // after window load and a couple of beats so it's smooth from the start.
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    const rt1 = setTimeout(refresh, 400)
    const rt2 = setTimeout(refresh, 1400)

    // ── 2. Stream frames from disk — draw each one as it arrives ────
    fetch(`${FRAMES_PATH}/manifest.json`)
      .then(r => r.ok ? r.json() : Promise.reject('Run: npm run extract-frames'))
      .then(({ count }) => {
        if (cancelled) return
        const imgs = new Array(count)
        framesRef.current = imgs
        let loaded = 0

        for (let i = 0; i < count; i++) {
          const img = new Image()
          img.decoding = 'async'
          img.onload = () => {
            if (cancelled) return
            imgs[i] = img
            // Force the JPEG to decode now (off the scroll path) so the first
            // scroll-through is a pure GPU blit instead of a synchronous decode.
            const ready = img.decode ? img.decode().catch(() => {}) : Promise.resolve()
            ready.then(() => {
              if (cancelled) return
              if (i === 0) drawCover(ctx, img, canvas.width, canvas.height)
              if (++loaded === count) ScrollTrigger.refresh()  // all frames decoded → final recalc
            })
          }
          img.src = `${FRAMES_PATH}/frame-${String(i + 1).padStart(4, '0')}.jpg`
          imgs[i] = img
        }
      })
      .catch(err => console.error('[Hero frames]', err))

    // ── 3. GSAP context — ScrollTrigger + staggered text ───────────
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
          const localP =
            p <= enter ? 0
            : p >= exit ? 1
            : (p - enter) / (exit - enter)
          const eased = easeOut3(localP)
          setX[i] (115 * (1 - eased))
          setOp[i](eased)
        })
      }

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
          const p = self.progress
          const frames = framesRef.current
          if (frames.length) {
            const idx = Math.min(Math.floor(p * frames.length), frames.length - 1)
            if (idx !== curIdxRef.current) {
              curIdxRef.current = idx
              const frame = frames[idx]
              if (frame?.complete) drawCover(ctx, frame, canvas.width, canvas.height)
            }
          }
          updateText(p)
        },

        onLeave()     { updateText(1) },
        onLeaveBack() { updateText(0) },
      })
    }, wrapper)

    return () => {
      cancelled = true
      gc.revert()
      window.removeEventListener('resize', syncSize)
      window.removeEventListener('load', refresh)
      clearTimeout(rt1); clearTimeout(rt2)
    }
  }, [isMobile])

  // ════════════════════════════════════════════════════════════════════
  // JSX
  // ════════════════════════════════════════════════════════════════════
  const textWrapperStyle = isMobile
    ? { position: 'relative', zIndex: 2, width: '100%', padding: '7rem 1.5rem 4rem' }
    : { position: 'absolute', inset: 0, zIndex: 2, display: 'flex', alignItems: 'center', padding: '0 2rem' }

  return (
    <section
      id="hero"
      ref={wrapperRef}
      style={{
        position: 'relative', width: '100%',
        minHeight: '100vh', height: isMobile ? 'auto' : '100vh',
        overflow: 'hidden', background: '#060A0F',
        display: isMobile ? 'flex' : 'block', alignItems: 'center',
      }}
    >
      {/* ── Background: poster paints instantly (no blank flash); on desktop the
            canvas scrubs frames on top once they've loaded ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `url(${POSTER})`, backgroundSize: 'cover', backgroundPosition: 'center',
      }} />
      {!isMobile && (
        <canvas
          ref={canvasRef}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }}
        />
      )}

      {/* ── Gradient overlay ─────────────────────────────────────────── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: isMobile
          ? 'linear-gradient(160deg, rgba(6,10,15,0.88) 0%, rgba(6,10,15,0.6) 55%, rgba(6,10,15,0.82) 100%)'
          : 'linear-gradient(118deg, rgba(6,10,15,0.80) 0%, rgba(6,10,15,0.25) 55%, rgba(6,10,15,0.55) 100%)',
      }} />

      {/* ── Scroll hint (desktop only) ───────────────────────────────── */}
      {!isMobile && (
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
      )}

      {/* ── Text block ───────────────────────────────────────────────── */}
      <div style={textWrapperStyle}>
        <div style={{ maxWidth: 1320, margin: '0 auto', width: '100%' }}>
          <div style={{ maxWidth: 700 }}>

            <div ref={tagRef} className="section-tag" style={{ marginBottom: '1.1rem' }}>
              Solar EPC Company · India
            </div>

            <h1 ref={h1Ref} style={{
              fontSize: 'clamp(2.3rem, 6.5vw, 5.2rem)',
              lineHeight: 1.06, marginBottom: '1.4rem',
              color: '#fff', textShadow: '0 2px 40px rgba(0,0,0,0.45)',
            }}>
              Engineering a&nbsp;<br />
              <span className="gradient-text">Cleaner Tomorrow</span>
            </h1>

            <p ref={subRef} style={{
              fontSize: 'clamp(0.95rem, 1.75vw, 1.15rem)',
              color: 'rgba(240,244,255,0.8)', lineHeight: 1.8,
              maxWidth: 540, marginBottom: isMobile ? '1.75rem' : '2.2rem',
              textShadow: '0 1px 12px rgba(0,0,0,0.4)',
            }}>
              Suntrik delivers end-to-end solar EPC — site survey, engineering
              design, turnkey installation, and lifetime O&amp;M — across
              India.
            </p>

            <div ref={btnsRef} style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', marginBottom: isMobile ? '2.25rem' : '3.25rem' }}>
              <Magnetic><a href="#services" className="btn-primary">Our Services</a></Magnetic>
              <Magnetic>
                <Link to="/#contact" className="btn-outline"
                  style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }}>
                  Get Free Assessment
                </Link>
              </Magnetic>
            </div>

            <div ref={statsRef} style={{
              display: 'flex', gap: isMobile ? '1.1rem 1.75rem' : '2.5rem', flexWrap: 'wrap',
              paddingTop: '1.75rem', borderTop: '1px solid rgba(255,255,255,0.1)',
            }}>
              {[
                { to: 8,    suffix: '+',   label: 'Years of Experience' },
                { to: 1000, suffix: '+',   label: 'Happy Clients'       },
                { to: 150,  suffix: 'MW+', label: 'Capacity Installed'  },
                { value: '24/7',           label: 'O&M Support'         },
              ].map(s => (
                <div key={s.label}>
                  <div style={{
                    fontSize: '1.85rem', fontWeight: 900,
                    fontFamily: 'Space Grotesk, sans-serif',
                    background: 'var(--gradient-sun)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text', lineHeight: 1,
                  }}>{s.to != null ? <CountUp to={s.to} suffix={s.suffix} /> : s.value}</div>
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
