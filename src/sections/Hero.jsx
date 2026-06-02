import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── Timing constants ────────────────────────────────────────────────────────
const SCRUB_END_TIME   = 8        // video seconds covered by the scrub phase
const TEXT_TRIGGER_AT  = 0.88     // progress (0-1) when text starts animating in
const SCROLL_DISTANCE  = '250%'   // extra scroll distance while section is pinned
// ─────────────────────────────────────────────────────────────────────────────

export default function Hero() {
  const wrapperRef  = useRef(null)   // outer section (the pin target)
  const videoRef    = useRef(null)
  const overlayRef  = useRef(null)   // darkening overlay
  const textRef     = useRef(null)   // text block, starts off-screen right
  const tagRef      = useRef(null)
  const h1Ref       = useRef(null)
  const subRef      = useRef(null)
  const btnsRef     = useRef(null)
  const statsRef    = useRef(null)
  const textShown   = useRef(false)

  useEffect(() => {
    const video   = videoRef.current
    const wrapper = wrapperRef.current
    if (!video || !wrapper) return

    // ── Prep video (don't autoplay, muted for policy) ──────────────────────
    video.pause()
    video.currentTime = 0

    // ── Initial state: text off-screen to the right ─────────────────────────
    gsap.set([tagRef.current, h1Ref.current, subRef.current, btnsRef.current, statsRef.current], {
      x: 140, opacity: 0,
    })
    gsap.set(overlayRef.current, { opacity: 0.15 })

    // ── ScrollTrigger: pin the section while scrubbing 0→8 s ───────────────
    const st = ScrollTrigger.create({
      trigger:  wrapper,
      start:    'top top',
      end:      `+=${SCROLL_DISTANCE}`,
      pin:      true,
      pinSpacing: true,
      anticipatePin: 1,

      onUpdate(self) {
        // ── 1. Scrub video ───────────────────────────────────────────────────
        const targetTime = Math.min(self.progress * SCRUB_END_TIME, SCRUB_END_TIME)
        // Only seek if delta > 0.05 s to avoid hammering the decoder
        if (Math.abs(video.currentTime - targetTime) > 0.05) {
          video.currentTime = targetTime
        }

        // ── 2. Darken overlay as video plays ─────────────────────────────────
        gsap.set(overlayRef.current, {
          opacity: 0.15 + self.progress * 0.45,
        })

        // ── 3. Text slides in from right at TEXT_TRIGGER_AT progress ─────────
        if (self.progress >= TEXT_TRIGGER_AT && !textShown.current) {
          textShown.current = true

          // Staggered reveal: tag → h1 → sub → buttons → stats
          const targets = [
            tagRef.current,
            h1Ref.current,
            subRef.current,
            btnsRef.current,
            statsRef.current,
          ]
          gsap.to(targets, {
            x: 0, opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.12,
          })
        }

        // ── 4. If user scrolls back before text, reset it ─────────────────────
        if (self.progress < TEXT_TRIGGER_AT - 0.05 && textShown.current) {
          textShown.current = false
          gsap.to([tagRef.current, h1Ref.current, subRef.current, btnsRef.current, statsRef.current], {
            x: 140, opacity: 0, duration: 0.35, ease: 'power2.in',
          })
        }
      },

      // ── Pin releases → video plays normally in the background ───────────────
      onLeave() {
        video.currentTime = SCRUB_END_TIME
        video.play().catch(() => {}) // start autoplay from 8 s
      },

      onLeaveBack() {
        video.pause()
        video.currentTime = 0
        textShown.current = false
        gsap.set([tagRef.current, h1Ref.current, subRef.current, btnsRef.current, statsRef.current], {
          x: 140, opacity: 0,
        })
      },
    })

    return () => st.kill()
  }, [])

  return (
    <section
      id="hero"
      ref={wrapperRef}
      style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', background: '#060A0F' }}
    >
      {/* ── Video ──────────────────────────────────────────────────────────── */}
      <video
        ref={videoRef}
        src="/hero-reel.mp4"
        muted
        playsInline
        preload="auto"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      />

      {/* ── Gradient overlay ───────────────────────────────────────────────── */}
      <div
        ref={overlayRef}
        style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(120deg, rgba(6,10,15,0.85) 0%, rgba(6,10,15,0.3) 60%, rgba(6,10,15,0.5) 100%)',
        }}
      />

      {/* ── Scroll hint (visible before text appears) ─────────────────────── */}
      <div style={{
        position: 'absolute', bottom: '2.5rem', left: '50%',
        transform: 'translateX(-50%)', zIndex: 3,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
        pointerEvents: 'none',
      }}>
        <span style={{
          fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.45)',
        }}>Scroll</span>
        <div style={{
          width: '1px', height: '44px',
          background: 'linear-gradient(to bottom, rgba(255,107,26,0.8), transparent)',
          animation: 'scrollPulse 1.8s ease-in-out infinite',
        }} />
      </div>

      {/* ── Text block ─────────────────────────────────────────────────────── */}
      {/*    starts translateX(140px) opacity 0, animated in by GSAP          */}
      <div
        ref={textRef}
        style={{
          position: 'absolute', inset: 0, zIndex: 2,
          display: 'flex', alignItems: 'center',
          padding: '0 2rem',
        }}
      >
        <div style={{ maxWidth: 1320, margin: '0 auto', width: '100%' }}>
          <div style={{ maxWidth: 680 }}>

            {/* Section tag */}
            <div ref={tagRef} className="section-tag" style={{ marginBottom: '1.25rem' }}>
              Solar EPC Company · North India
            </div>

            {/* Headline */}
            <h1
              ref={h1Ref}
              style={{
                fontSize: 'clamp(2.8rem, 6.5vw, 5.2rem)',
                lineHeight: 1.05, marginBottom: '1.5rem',
                color: '#fff',
                textShadow: '0 2px 40px rgba(0,0,0,0.5)',
              }}
            >
              Engineering a&nbsp;<br />
              <span className="gradient-text">Cleaner Tomorrow</span>
            </h1>

            {/* Sub */}
            <p
              ref={subRef}
              style={{
                fontSize: 'clamp(1rem, 1.8vw, 1.18rem)',
                color: 'rgba(240,244,255,0.82)',
                lineHeight: 1.8, maxWidth: 540,
                marginBottom: '2.25rem',
                textShadow: '0 1px 12px rgba(0,0,0,0.4)',
              }}
            >
              Suntrik delivers end-to-end solar EPC services — from site survey and engineering design to procurement, installation, and long-term O&amp;M — across North India.
            </p>

            {/* Buttons */}
            <div ref={btnsRef} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
              <a href="#services" className="btn-primary">Our Services</a>
              <a href="#contact"  className="btn-outline" style={{ borderColor: 'rgba(255,255,255,0.35)', color: '#fff' }}>
                Get Free Assessment
              </a>
            </div>

            {/* Stats strip */}
            <div
              ref={statsRef}
              style={{
                display: 'flex', gap: '2.5rem', flexWrap: 'wrap',
                paddingTop: '1.75rem',
                borderTop: '1px solid rgba(255,255,255,0.12)',
              }}
            >
              {[
                { value: '8+',   label: 'Years of Experience'   },
                { value: '500+', label: 'Projects Completed'     },
                { value: '10MW+',label: 'Capacity Installed'     },
                { value: '24/7', label: 'O&M Support'            },
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
                    fontSize: '0.72rem', color: 'rgba(255,255,255,0.55)',
                    textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 4,
                  }}>{s.label}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* ── Keyframes ──────────────────────────────────────────────────────── */}
      <style>{`
        @keyframes scrollPulse {
          0%,100% { opacity: 0.5; transform: scaleY(1);   }
          50%      { opacity: 1;   transform: scaleY(1.15); }
        }
      `}</style>
    </section>
  )
}
