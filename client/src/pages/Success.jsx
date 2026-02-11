import { useNavigate } from 'react-router-dom'
import Fireworks from '../components/Fireworks'

function Success() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <Fireworks duration={5000} intensity={1.5} />

      <div className="card max-w-2xl w-full text-center relative z-10">
        <div className="text-8xl mb-6 animate-bounce">🐴</div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-tet-red mb-4">
          Thành Công!
        </h1>
        
        <p className="text-xl text-gray-700 mb-8">
          Bằng chứng của bạn đã được gửi!
        </p>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            📋 Các bước tiếp theo:
          </h2>
          <div className="text-left space-y-3 text-gray-700">
            <div className="flex items-start">
              <span className="text-2xl mr-3">1️⃣</span>
              <p>Gửi link xác nhận cho người gửi lì xì</p>
            </div>
            <div className="flex items-start">
              <span className="text-2xl mr-3">2️⃣</span>
              <p>Chờ họ xem và đánh giá bằng chứng</p>
            </div>
            <div className="flex items-start">
              <span className="text-2xl mr-3">3️⃣</span>
              <p>Nhận lì xì: 200K (thành công) hoặc 100K (thất bại)</p>
            </div>
          </div>
        </div>

        <div className="bg-tet-gold/20 border-2 border-tet-gold rounded-lg p-4 mb-8">
          <p className="text-lg font-semibold text-tet-dark">
            💫 Bạn đã rất cố gắng! Chúc bạn may mắn! 💫
          </p>
        </div>

        <div className="text-4xl mb-6 space-x-2">
          <span className="inline-block animate-bounce" style={{animationDelay: '0s'}}>🎊</span>
          <span className="inline-block animate-bounce" style={{animationDelay: '0.1s'}}>✨</span>
          <span className="inline-block animate-bounce" style={{animationDelay: '0.2s'}}>🐴</span>
          <span className="inline-block animate-bounce" style={{animationDelay: '0.3s'}}>💰</span>
          <span className="inline-block animate-bounce" style={{animationDelay: '0.4s'}}>🧧</span>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => navigate('/')}
            className="btn-primary w-full text-xl py-4"
          >
            🏠 Về Trang Chủ
          </button>
          
          <button
            onClick={() => navigate('/create')}
            className="btn-secondary w-full"
          >
            🎁 Tạo Lì Xì Mới
          </button>
        </div>

        {/* Footer message */}
        <div className="mt-8 text-gray-500">
          <p className="text-lg">🎊 Chúc Mừng Năm Mới 2026 🎊</p>
          <p>Vạn Sự Như Ý - An Khang Thịnh Vượng</p>
        </div>
      </div>
    </div>
  )
}

export default Success
