/**
 * Atmosphere — a fixed, non-interactive overlay that adds filmic depth to the
 * whole page: a faint film-grain texture and a field of slowly drifting solar
 * "embers". Kept very low-opacity so it reads as mood, never noise over text.
 */
import { useMemo } from 'react'

const PARTICLE_COUNT = 16

export default function Atmosphere() {
  const particles = useMemo(
    () => Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 1.5 + Math.random() * 3,
      delay: Math.random() * 16,
      dur: 16 + Math.random() * 18,
      drift: (Math.random() * 60 - 30).toFixed(0),
      amber: Math.random() > 0.5,
    })),
    [],
  )

  return (
    <div aria-hidden style={{ position: 'fixed', inset: 0, zIndex: 900, pointerEvents: 'none', overflow: 'hidden' }}>
      {/* Film grain */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.05, mixBlendMode: 'overlay',
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: '220px 220px',
      }} />

      {/* Drifting embers */}
      {particles.map(p => (
        <span
          key={p.id}
          style={{
            position: 'absolute', bottom: '-20px', left: `${p.left}%`,
            width: p.size, height: p.size, borderRadius: '50%',
            background: p.amber ? 'rgba(255,184,48,0.7)' : 'rgba(255,107,26,0.6)',
            boxShadow: `0 0 ${p.size * 3}px ${p.amber ? 'rgba(255,184,48,0.5)' : 'rgba(255,107,26,0.45)'}`,
            animation: `emberRise ${p.dur}s linear ${p.delay}s infinite`,
            ['--drift']: `${p.drift}px`,
          }}
        />
      ))}

      <style>{`
        @keyframes emberRise {
          0%   { transform: translateY(0) translateX(0);            opacity: 0; }
          10%  { opacity: 0.8; }
          90%  { opacity: 0.5; }
          100% { transform: translateY(-104vh) translateX(var(--drift)); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          span[style*="emberRise"] { animation: none !important; display: none; }
        }
      `}</style>
    </div>
  )
}
