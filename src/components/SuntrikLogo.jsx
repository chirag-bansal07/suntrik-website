export default function SuntrikLogo({ width = 120, className = '' }) {
  return (
    <img
      src="/Suntrik-logo.png"
      alt="Suntrik"
      width={width}
      height="auto"
      className={className}
      style={{ display: 'block', flexShrink: 0, objectFit: 'contain' }}
      draggable={false}
    />
  )
}
