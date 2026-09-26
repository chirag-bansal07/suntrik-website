export default function SuntrikLogo({ width = 120, className = '' }) {
  return (
    <img
      src="/Suntrik-logo.webp"
      alt="Suntrik"
      width={width}
      height={Math.round(width * 263 / 359)}
      className={className}
      style={{ display: 'block', flexShrink: 0, objectFit: 'contain', height: 'auto' }}
      draggable={false}
    />
  )
}
