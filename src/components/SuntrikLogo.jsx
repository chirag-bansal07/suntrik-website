/**
 * SuntrikLogo — official Suntrik logo PNG (600×600, transparent background).
 * Works on any dark or light surface with no blending tricks needed.
 */

export default function SuntrikLogo({ width = 120, className = '' }) {
  return (
    <img
      src="/suntrik-logo.png"
      alt="Suntrik Green Energy"
      className={className}
      style={{
        width,
        height: 'auto',
        display: 'block',
        flexShrink: 0,
        objectFit: 'contain',
      }}
      draggable={false}
    />
  )
}
