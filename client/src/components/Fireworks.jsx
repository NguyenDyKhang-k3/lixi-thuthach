import { useEffect, useState } from 'react'

const COLORS = ['#FFD60A', '#E63946', '#FF6B6B', '#4ECDC4', '#FFE66D', '#FF9500', '#FFA500', '#FF1493', '#00CED1']

export default function Fireworks({ duration = 4000, intensity = 1 }) {
  const [bursts, setBursts] = useState([])

  useEffect(() => {
    const spawnBurst = () => {
      const id = Date.now() + Math.random()
      const x = 5 + Math.random() * 90
      const y = 5 + Math.random() * 70
      const color = COLORS[Math.floor(Math.random() * COLORS.length)]
      const size = 1 + Math.random() * 1.5
      const count = Math.floor(24 * intensity * size) + Math.floor(Math.random() * 16)
      const particles = Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2 + Math.random() * 0.3
        const dist = (80 + Math.random() * 140) * size
        return {
          tx: Math.cos(angle) * dist,
          ty: Math.sin(angle) * dist,
          size: 6 + Math.random() * 8,
        }
      })
      setBursts(prev => [...prev, { id, x, y, color, particles }])
      setTimeout(() => {
        setBursts(prev => prev.filter(b => b.id !== id))
      }, 2200)
    }

    spawnBurst()
    const interval = setInterval(spawnBurst, 280)
    const stop = setTimeout(() => clearInterval(interval), duration)
    return () => {
      clearInterval(interval)
      clearTimeout(stop)
    }
  }, [duration, intensity])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {bursts.map((b) => (
        <div key={b.id} className="absolute" style={{ left: `${b.x}%`, top: `${b.y}%` }}>
          {b.particles.map((p, i) => (
            <div
              key={i}
              className="absolute rounded-full origin-center"
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                background: b.color,
                boxShadow: `0 0 ${p.size * 2}px ${b.color}, 0 0 ${p.size * 4}px ${b.color}`,
                animation: 'firework 2.2s ease-out forwards',
                '--tx': `${p.tx}px`,
                '--ty': `${p.ty}px`,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
