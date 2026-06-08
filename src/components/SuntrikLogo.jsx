/**
 * SuntrikLogo — inline SVG built from the Suntrik logo shared in conversation.
 * No external files accessed. Red → orange gradient, infinity+bolt symbol, SUNTRIK text.
 */

export default function SuntrikLogo({ width = 120, className = '' }) {
  return (
    <svg
      viewBox="0 0 260 160"
      width={width}
      height="auto"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Suntrik"
      style={{ display: 'block', flexShrink: 0 }}
    >
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="260" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#E85040" />
          <stop offset="48%"  stopColor="#F07030" />
          <stop offset="100%" stopColor="#F5A830" />
        </linearGradient>
      </defs>

      {/*
        ── LEFT C-RING ──────────────────────────────────────────────
        Center (82, 72).  Path radius 40.  Stroke width 16.
        Gap at the 3-o'clock position ±38° → endpoints at:
          upper: (82 + 40·cos38°, 72 − 40·sin38°) ≈ (113.5, 47.4)
          lower: (82 + 40·cos38°, 72 + 40·sin38°) ≈ (113.5, 96.6)
        Large-arc (1), counter-clockwise (0) to go the "long way" round.
      */}
      <path
        d="M 114,47 A 40,40 0 1,0 114,97"
        stroke="url(#lg)"
        strokeWidth="16"
        strokeLinecap="butt"
      />

      {/*
        ── LIGHTNING BOLT ──────────────────────────────────────────
        Fills the C-ring gap.  6 points aligned to the stroke-cap edges:
          outer-top    (114+16·sin38°/2 ≈ 119, 47−16·cos38°/2 ≈ 41)
          inner-top    (114−16·sin38°/2 ≈ 109, 47+16·cos38°/2 ≈ 53)
          notch-left   back of bolt at horizontal centre
          inner-bottom (109, 91)
          outer-bottom (119, 103)
          right-tip    points toward right ring's left stroke edge
      */}
      <polygon
        points="120,41 106,53 96,72 106,91 120,103 144,72"
        fill="url(#lg)"
      />

      {/*
        ── RIGHT RING ──────────────────────────────────────────────
        Complete circle.  Center (184, 72).  Path radius 40.  Stroke 16.
        Bolt tip at (144,72) lands inside the ring stroke (144–160) ✓
      */}
      <circle
        cx="184" cy="72" r="40"
        stroke="url(#lg)"
        strokeWidth="16"
        fill="none"
      />

      {/*
        ── SUNTRIK WORDMARK ────────────────────────────────────────
        Bold, wide-spaced, orange. Positioned centred below the symbol.
      */}
      <text
        x="133" y="152"
        fontFamily="'Space Grotesk','Segoe UI',Arial,sans-serif"
        fontWeight="800"
        fontSize="26"
        letterSpacing="6"
        fill="url(#lg)"
        textAnchor="middle"
      >
        SUNTRIK
      </text>
    </svg>
  )
}
