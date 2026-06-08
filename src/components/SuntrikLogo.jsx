/**
 * SuntrikLogo — uses the official Suntrik logo PNG (transparent background).
 * File: public/logo-transparent.png  (998×250 px, alpha channel)
 */

export default function SuntrikLogo({ width = 110, className = '' }) {
  return (
    <img
      src="/logo-transparent.png"
      alt="Suntrik Green Energy"
      className={className}
      style={{
        width,
        height: 'auto',
        display: 'block',
        objectFit: 'contain',
      }}
      draggable={false}
    />
  )
}
