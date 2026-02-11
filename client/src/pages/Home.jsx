import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Home() {
  const navigate = useNavigate()
  const [isAdmin, setIsAdmin] = useState(() => !!localStorage.getItem('adminToken'))
  const [stars, setStars] = useState([])
  const [showInput, setShowInput] = useState(false)
  const [lixiCode, setLixiCode] = useState('')

  useEffect(() => {
    setIsAdmin(!!localStorage.getItem('adminToken'))
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setStars(prev => [...prev.slice(-15), {
        id: Date.now() + Math.random(),
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 2 + Math.random() * 4,
        delay: Math.random() * 500,
      }])
    }, 800)
    return () => clearInterval(interval)
  }, [])

  const handleReceiveLixi = (e) => {
    e?.preventDefault()
    if (lixiCode.trim()) {
      const match = lixiCode.match(/([a-f0-9-]+)$/i)
      navigate(`/receive/${match ? match[1] : lixiCode}`)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative stars */}
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-tet-gold animate-shimmer"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}ms`,
            opacity: 0.8,
          }}
        />
      ))}

      <div className="card max-w-2xl w-full text-center relative z-10 animate-float">
        {/* Header - Năm Ngựa 2026 */}
        <div className="mb-8">
          <div className="text-7xl mb-4 animate-bounce">🐴</div>
          <h1 className="text-4xl md:text-5xl font-bold text-tet-red mb-2">
            Lì Xì Thử Thách
          </h1>
          <p className="text-lg text-amber-600 font-semibold mb-4">
            Năm Bính Ngọ 2026
          </p>
          <p className="text-xl text-gray-600">
            Gửi lì xì kèm thử thách vui nhộn!
          </p>
        </div>

        {/* Description */}
        <div className="bg-gradient-to-r from-red-50 to-yellow-50 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-tet-red mb-4">Cách chơi</h2>
          <div className="text-left space-y-3 text-gray-700">
            <div className="flex items-start gap-3">
              <span className="text-2xl">✨</span>
              <p><strong>Bước 1:</strong> Tạo lì xì với thử thách (chọn theo Trẻ em / Nam / Nữ / Người lớn)</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🎯</span>
              <p><strong>Bước 2:</strong> Gửi link cho người nhận</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">📸</span>
              <p><strong>Bước 3:</strong> Người nhận hoàn thành và upload bằng chứng</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">💰</span>
              <p>
                <strong>Bước 4:</strong> Nhận lì xì: <span className="text-green-600 font-bold">Thành công</span> 
                hoặc <span className="text-orange-600 font-bold">Thất bại</span> - cả hai đều có tiền!
              </p>
            </div>
          </div>
        </div>

        <div className="bg-tet-gold/20 border-2 border-tet-gold rounded-lg p-4 mb-8">
          <p className="text-lg font-semibold text-tet-dark">
            🎉 Dù thành công hay thất bại, bạn vẫn luôn được nhận lì xì! 🎉
          </p>
        </div>

        <div className="space-y-4">
          {isAdmin ? (
            <button
              onClick={() => navigate('/create')}
              className="btn-primary w-full text-xl py-4 hover:scale-105 transition-transform"
            >
              🎁 Tạo Lì Xì Thử Thách
            </button>
          ) : (
            <button
              onClick={() => navigate('/admin')}
              className="btn-secondary w-full text-xl py-4 hover:scale-105 transition-transform border-2 border-amber-500"
            >
              🔐 Đăng nhập Admin để tạo lì xì
            </button>
          )}
          
          {/* Form nhập link lì xì */}
          {showInput ? (
            <form onSubmit={handleReceiveLixi} className="space-y-3">
              <input
                type="text"
                value={lixiCode}
                onChange={(e) => setLixiCode(e.target.value)}
                placeholder="Dán link hoặc nhập mã lì xì..."
                className="w-full px-4 py-3 border-2 border-amber-400 rounded-lg focus:border-tet-red focus:outline-none text-center"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="btn-primary flex-1 py-3"
                  disabled={!lixiCode.trim()}
                >
                  ✅ Mở Lì Xì
                </button>
                <button
                  type="button"
                  onClick={() => { setShowInput(false); setLixiCode('') }}
                  className="btn-secondary px-6 py-3"
                >
                  ✖️
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setShowInput(true)}
              className="btn-secondary w-full text-xl py-4 hover:scale-105 transition-transform"
            >
              📬 Nhận Lì Xì
            </button>
          )}
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>✨ Chúc Mừng Năm Mới 2026 - Năm Con Ngựa ✨</p>
          <p>Vạn Sự Như Ý - Phát Tài Phát Lộc</p>
        </div>

        <a href="/admin" className="absolute top-4 right-4 text-xs text-gray-400 hover:text-gray-600">
          Admin
        </a>
      </div>
    </div>
  )
}

export default Home
