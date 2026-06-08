/**
 * SuntrikLogo — inline SVG recreation of the Suntrik logo.
 * No external file dependency. Drop in any dark or light background.
 */

export default function SuntrikLogo({ width = 120, className = '' }) {
  return (
    <svg
      viewBox="0 0 280 195"
      width={width}
      height="auto"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Suntrik Green Energy"
      style={{ display: 'block', flexShrink: 0 }}
    >
      <defs>
        <linearGradient id="sLogo" x1="0" y1="0" x2="280" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#E85040" />
          <stop offset="50%"  stopColor="#F07830" />
          <stop offset="100%" stopColor="#F5A520" />
        </linearGradient>
      </defs>

      {/* Left C-arc: center (92,82), path-radius 44, strokeWidth 18, gap ±30° at 3-o'clock */}
      <path
        d="M 130,60 A 44,44 0 1,0 130,104"
        stroke="url(#sLogo)"
        strokeWidth="18"
        strokeLinecap="butt"
      />

      {/* Lightning bolt: 6-point polygon aligned to stroke-cap edges of the gap */}
      <polygon
        points="138,56 122,65 112,82 122,100 138,109 158,82"
        fill="url(#sLogo)"
      />

      {/* Right ring: center (197,82), path-radius 44, complete circle, strokeWidth 18 */}
      <circle
        cx="197" cy="82" r="44"
        stroke="url(#sLogo)"
        strokeWidth="18"
        fill="none"
      />

      {/* SUNTRIK wordmark */}
      <text
        x="144" y="178"
        fontFamily="'Space Grotesk','Segoe UI',Arial,sans-serif"
        fontWeight="700"
        fontSize="28"
        letterSpacing="7"
        fill="url(#sLogo)"
        textAnchor="middle"
      >
        SUNTRIK
      </text>
    </svg>
  )
}
