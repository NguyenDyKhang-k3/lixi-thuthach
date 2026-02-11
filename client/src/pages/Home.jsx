import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Home() {
  const navigate = useNavigate()
  const [fireworks, setFireworks] = useState([])

  useEffect(() => {
    // Tạo pháo hoa tự động
    const interval = setInterval(() => {
      const newFirework = {
        id: Date.now(),
        left: Math.random() * 100,
        top: Math.random() * 100,
      }
      setFireworks(prev => [...prev, newFirework])
      
      // Xóa sau 1s
      setTimeout(() => {
        setFireworks(prev => prev.filter(f => f.id !== newFirework.id))
      }, 1000)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Pháo hoa decorative */}
      {fireworks.map(fw => (
        <div
          key={fw.id}
          className="absolute w-2 h-2 rounded-full bg-tet-gold firework"
          style={{ left: `${fw.left}%`, top: `${fw.top}%` }}
        />
      ))}

      <div className="card max-w-2xl w-full text-center relative z-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-6xl mb-4 animate-bounce-slow">🧧</h1>
          <h1 className="text-4xl md:text-5xl font-bold text-tet-red mb-4">
            Lì Xì Thử Thách
          </h1>
          <p className="text-xl text-gray-600">
            Gửi lì xì kèm thử thách vui nhộn!
          </p>
        </div>

        {/* Description */}
        <div className="bg-gradient-to-r from-red-50 to-yellow-50 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-tet-red mb-4">
            Cách chơi
          </h2>
          <div className="text-left space-y-3 text-gray-700">
            <div className="flex items-start">
              <span className="text-2xl mr-3">✨</span>
              <p>
                <strong>Bước 1:</strong> Tạo lì xì với thử thách của bạn
              </p>
            </div>
            <div className="flex items-start">
              <span className="text-2xl mr-3">🎯</span>
              <p>
                <strong>Bước 2:</strong> Gửi link cho người nhận
              </p>
            </div>
            <div className="flex items-start">
              <span className="text-2xl mr-3">📸</span>
              <p>
                <strong>Bước 3:</strong> Người nhận hoàn thành và upload bằng chứng
              </p>
            </div>
            <div className="flex items-start">
              <span className="text-2xl mr-3">💰</span>
              <p>
                <strong>Bước 4:</strong> Nhận lì xì: <span className="text-green-600 font-bold">200K</span> (thành công) 
                hoặc <span className="text-orange-600 font-bold">100K</span> (thất bại)
              </p>
            </div>
          </div>
        </div>

        {/* Highlight Box */}
        <div className="bg-tet-gold/20 border-2 border-tet-gold rounded-lg p-4 mb-8">
          <p className="text-lg font-semibold text-tet-dark">
            🎉 Dù thành công hay thất bại, bạn vẫn luôn được nhận lì xì! 🎉
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-4">
          <button
            onClick={() => navigate('/create')}
            className="btn-primary w-full text-xl py-4"
          >
            🎁 Tạo Lì Xì Thử Thách
          </button>
          
          <button
            onClick={() => {
              const code = prompt('Nhập mã lì xì của bạn:')
              if (code) navigate(`/receive/${code}`)
            }}
            className="btn-secondary w-full text-xl py-4"
          >
            📬 Nhận Lì Xì
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 text-sm text-gray-500">
          <p>✨ Chúc Mừng Năm Mới 2026 ✨</p>
          <p>Vạn Sự Như Ý - Phát Tài Phát Lộc</p>
        </div>
      </div>
    </div>
  )
}

export default Home
