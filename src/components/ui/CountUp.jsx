/**
 * CountUp — animates a number from `from` to `to` once it scrolls into view,
 * with thousands separators, optional decimals, prefix and suffix.
 *   <CountUp to={150} suffix=" MW+" />   <CountUp to={78000} prefix="₹" />
 */
import { useEffect, useRef, useState } from 'react'

export default function CountUp({
  to, from = 0, duration = 1800,
  prefix = '', suffix = '', decimals = 0, separator = ',',
  className, style,
}) {
  const ref = useRef(null)
  const started = useRef(false)
  const [val, setVal] = useState(from)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()
          const tick = now => {
            const t = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - t, 4)
            setVal(from + (to - from) * eased)
            if (t < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      })
    }, { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [to, from, duration])

  const fmt = n => {
    const fixed = Number(n).toFixed(decimals)
    const [int, dec] = fixed.split('.')
    const withSep = int.replace(/\B(?=(\d{3})+(?!\d))/g, separator)
    return dec ? `${withSep}.${dec}` : withSep
  }

  return <span ref={ref} className={className} style={style}>{prefix}{fmt(val)}{suffix}</span>
}
