import { useEffect, useState } from 'react'

const COLORS = ['#FFD60A', '#E63946', '#FF6B6B', '#4ECDC4', '#FFE66D', '#FF9500']

export default function Fireworks({ duration = 4000, intensity = 1 }) {
  const [bursts, setBursts] = useState([])

  useEffect(() => {
    const spawnBurst = () => {
      const id = Date.now() + Math.random()
      const x = 10 + Math.random() * 80
      const y = 10 + Math.random() * 80
      const color = COLORS[Math.floor(Math.random() * COLORS.length)]
      const count = Math.floor(8 * intensity) + Math.floor(Math.random() * 8)
      const particles = Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2 + Math.random()
        const dist = 30 + Math.random() * 50
        return {
          tx: Math.cos(angle) * dist,
          ty: Math.sin(angle) * dist,
        }
      })
      setBursts(prev => [...prev, { id, x, y, color, particles }])
      setTimeout(() => {
        setBursts(prev => prev.filter(b => b.id !== id))
      }, 1200)
    }

    spawnBurst()
    const interval = setInterval(spawnBurst, 400)
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
              className="absolute w-2 h-2 rounded-full origin-center animate-firework"
              style={{
                background: b.color,
                boxShadow: `0 0 6px ${b.color}`,
                animation: 'firework 1.2s ease-out forwards',
                ['--tx']: `${p.tx}px`,
                ['--ty']: `${p.ty}px`,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
