/**
 * RevealText — word-by-word mask reveal. Each word sits in an overflow-hidden
 * slot and slides up into place, staggered, when the heading scrolls into view.
 * Pass plain string `text`; render element via `as` (e.g. "h2").
 */
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

const GRADIENT = {
  background: 'var(--gradient-sun)',
  WebkitBackgroundClip: 'text', backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}

export default function RevealText({
  text, as: Tag = 'span', className, style, gradient = false,
  delay = 0, stagger = 0.045, threshold = 0.2,
}) {
  const { ref, inView } = useScrollAnimation(threshold)
  const words = String(text).split(' ')

  return (
    <Tag ref={ref} className={className} style={style}>
      {words.map((w, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}>
          <motion.span
            style={{ display: 'inline-block', willChange: 'transform', ...(gradient ? GRADIENT : null) }}
            initial={{ y: '115%' }}
            animate={inView ? { y: '0%' } : { y: '115%' }}
            transition={{ duration: 0.65, delay: delay + i * stagger, ease: [0.16, 1, 0.3, 1] }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </Tag>
  )
}
