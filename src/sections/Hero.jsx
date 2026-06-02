/**
 * Hero — Scroll-driven video scrub
 *
 * Method (from "How to play a video on scroll frame by frame – React + GSAP"):
 *   1. A GSAP timeline tweens `video.currentTime` directly from 0 → 8 s
 *      using ease:'none' so every scroll pixel maps linearly to a frame.
 *   2. ScrollTrigger drives the timeline with `scrub: 1` — a 1-second
 *      soft-follow that smooths out fast scroll movements.
 *   3. The video element gets will-change + translateZ(0) so the GPU handles
 *      the decode/composite, eliminating CPU-side jank.
 *   4. Text elements share the same timeline: they slide in from the right
 *      during the last ~18% of the scrub range (from the 8-second mark on).
 *   5. `onLeave` transitions from scrub → free play so the video continues
 *      after the pin releases.
 */

import { useEffect, useRef } from 'react'
import { gsap }              from 'gsap'
import { ScrollTrigger }     from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ── Tuning constants ─────────────────────────────────────────────────────────
const VIDEO_SCRUB_END   = 8      // video seconds driven by scroll
const SCROLL_DISTANCE   = '280%' // how much extra space the pin consumes
const SCRUB_LAG         = 1      // seconds — GSAP soft-follow smoothness
// ─────────────────────────────────────────────────────────────────────────────

export default function Hero() {
  const wrapperRef = useRef(null)
  const videoRef   = useRef(null)
  const tagRef     = useRef(null)
  const h1Ref      = useRef(null)
  const subRef     = useRef(null)
  const btnsRef    = useRef(null)
  const statsRef   = useRef(null)

  useEffect(() => {
    const video   = videoRef.current
    const wrapper = wrapperRef.current
    if (!video || !wrapper) return

    /* ── 0. Prep video ─────────────────────────────────────────────────── */
    video.pause()
    video.currentTime = 0

    /* ── 1. GPU-acceleration CSS on the video element ─────────────────── */
    gsap.set(video, {
      willChange:        'transform',
      force3D:           true,
      backfaceVisibility:'hidden',
    })

    /* ── 2. Collect text refs & set initial off-screen state ───────────── */
    const textEls = [
      tagRef.current,
      h1Ref.current,
      subRef.current,
      btnsRef.current,
      statsRef.current,
    ].filter(Boolean)

    gsap.set(textEls, { x: 110, autoAlpha: 0 })

    /* ── 3. Master timeline ─────────────────────────────────────────────── */
    /*
     *  Timeline layout (normalised, total ≈ 1.15 s):
     *
     *  0.00 ──── VIDEO SCRUB (ease:none) ────── 0.88
     *                                  0.82 ── TEXT STAGGER ── 1.15
     *
     *  The text starts appearing slightly before the video scrub ends
     *  so that by the time the pin releases, text is fully on-screen.
     */
    const tl = gsap.timeline()

    // Video scrub — GSAP tweens currentTime directly (no manual onUpdate needed)
    tl.fromTo(
      video,
      { currentTime: 0 },
      { currentTime: VIDEO_SCRUB_END, ease: 'none', duration: 0.88 },
      0,
    )

    // Text: each element slides in from the right with a stagger
    textEls.forEach((el, i) => {
      tl.fromTo(
        el,
        { x: 110, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, ease: 'power3.out', duration: 0.15 },
        /* start time */ 0.82 + i * 0.065,
      )
    })

    /* ── 4. ScrollTrigger ── drives the timeline ────────────────────────── */
    const st = ScrollTrigger.create({
      trigger:          wrapper,
      start:            'top top',
      end:              `+=${SCROLL_DISTANCE}`,
      pin:              true,
      pinSpacing:       true,
      anticipatePin:    1,
      scrub:            SCRUB_LAG,   // ← key: smooth 1-second lag
      animation:        tl,          // ← timeline is scroll-driven
      invalidateOnRefresh: true,

      // ── Released forward: let video play freely from the scrub endpoint ──
      onLeave() {
        // currentTime is already at VIDEO_SCRUB_END thanks to the tween
        video.play().catch(() => {})
      },

      // ── Scrolled back into hero: pause and let scrub take control again ──
      onEnterBack() {
        video.pause()
      },
    })

    return () => {
      st.kill()
      tl.kill()
    }
  }, [])

  /* ── JSX ──────────────────────────────────────────────────────────────── */
  return (
    <section
      id="hero"
      ref={wrapperRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        background: '#060A0F',
      }}
    >
      {/* ── Video ── GPU-accelerated via CSS props below ─────────────────── */}
      <video
        ref={videoRef}
        src="/hero-reel.mp4"
        muted
        playsInline
        preload="auto"
        style={{
          position:         'absolute',
          inset:            0,
          width:            '100%',
          height:           '100%',
          objectFit:        'cover',
          zIndex:           0,
          // GPU hints — keep the decoded texture on the compositor thread
          willChange:       'transform',
          transform:        'translateZ(0)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
      />

      {/* ── Dark gradient overlay ─────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background:
            'linear-gradient(118deg, rgba(6,10,15,0.82) 0%, rgba(6,10,15,0.28) 55%, rgba(6,10,15,0.55) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Scroll hint (fades away naturally as overlay darkens) ─────────── */}
      <div
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.4rem',
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            fontSize: '0.62rem',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.4)',
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: '1px',
            height: '48px',
            background:
              'linear-gradient(to bottom, rgba(255,107,26,0.9), transparent)',
            animation: 'scrollPulse 1.9s ease-in-out infinite',
          }}
        />
      </div>

      {/* ── Text block — starts at x:110, autoAlpha:0; GSAP reveals on scroll */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          padding: '0 2rem',
        }}
      >
        <div style={{ maxWidth: 1320, margin: '0 auto', width: '100%' }}>
          <div style={{ maxWidth: 700 }}>

            {/* Tag */}
            <div ref={tagRef} className="section-tag" style={{ marginBottom: '1.1rem' }}>
              Solar EPC Company · North India
            </div>

            {/* Headline */}
            <h1
              ref={h1Ref}
              style={{
                fontSize: 'clamp(2.8rem, 6.5vw, 5.2rem)',
                lineHeight: 1.06,
                marginBottom: '1.4rem',
                color: '#fff',
                textShadow: '0 2px 40px rgba(0,0,0,0.45)',
              }}
            >
              Engineering a&nbsp;
              <br />
              <span className="gradient-text">Cleaner Tomorrow</span>
            </h1>

            {/* Sub */}
            <p
              ref={subRef}
              style={{
                fontSize: 'clamp(1rem, 1.75vw, 1.15rem)',
                color: 'rgba(240,244,255,0.8)',
                lineHeight: 1.8,
                maxWidth: 540,
                marginBottom: '2.2rem',
                textShadow: '0 1px 12px rgba(0,0,0,0.4)',
              }}
            >
              Suntrik delivers end-to-end solar EPC — site survey, engineering
              design, turnkey installation, and lifetime O&amp;M — across
              Haryana and North India.
            </p>

            {/* Buttons */}
            <div
              ref={btnsRef}
              style={{
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
                marginBottom: '3.25rem',
              }}
            >
              <a href="#services" className="btn-primary">
                Our Services
              </a>
              <a
                href="#contact"
                className="btn-outline"
                style={{
                  borderColor: 'rgba(255,255,255,0.3)',
                  color: '#fff',
                }}
              >
                Get Free Assessment
              </a>
            </div>

            {/* Stats strip */}
            <div
              ref={statsRef}
              style={{
                display: 'flex',
                gap: '2.5rem',
                flexWrap: 'wrap',
                paddingTop: '1.75rem',
                borderTop: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              {[
                { value: '8+',    label: 'Years of Experience' },
                { value: '500+',  label: 'Projects Completed'  },
                { value: '10MW+', label: 'Capacity Installed'  },
                { value: '24/7',  label: 'O&M Support'         },
              ].map(s => (
                <div key={s.label}>
                  <div
                    style={{
                      fontSize: '1.85rem',
                      fontWeight: 900,
                      fontFamily: 'Space Grotesk, sans-serif',
                      background: 'var(--gradient-sun)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      lineHeight: 1,
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{
                      fontSize: '0.7rem',
                      color: 'rgba(255,255,255,0.5)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      marginTop: 4,
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Keyframes ─────────────────────────────────────────────────────── */}
      <style>{`
        @keyframes scrollPulse {
          0%,100% { opacity: 0.4; transform: scaleY(1);    }
          50%      { opacity: 1;   transform: scaleY(1.18); }
        }
      `}</style>
    </section>
  )
}
