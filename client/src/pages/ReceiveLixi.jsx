import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getLixi } from '../api/lixiApi'

function ReceiveLixi() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [lixiData, setLixiData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showEnvelope, setShowEnvelope] = useState(true)

  useEffect(() => {
    const fetchLixi = async () => {
      const lixi = await getLixi(id)
      if (lixi) setLixiData(lixi)
      setLoading(false)
    }
    fetchLixi()
  }, [id])

  const openEnvelope = () => {
    setShowEnvelope(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-2xl">Đang tải...</div>
      </div>
    )
  }

  if (!lixiData) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="card max-w-md text-center">
          <h1 className="text-6xl mb-4">😢</h1>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Không tìm thấy lì xì
          </h2>
          <p className="text-gray-600 mb-6">
            Link này có thể không hợp lệ hoặc đã hết hạn.
          </p>
          <button onClick={() => navigate('/')} className="btn-primary">
            Về Trang Chủ
          </button>
        </div>
      </div>
    )
  }

  if (showEnvelope) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          {/* Bao lì xì */}
          <div className="lixi-envelope animate-float cursor-pointer" onClick={openEnvelope}>
            {/* Pattern trang trí - Năm Ngựa 2026 */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="text-6xl">🐴🐴🐴</div>
            </div>
            
            <div className="relative z-10 text-center text-white">
              <h1 className="text-4xl font-bold mb-4">🧧</h1>
              <h2 className="text-3xl font-bold mb-2">LÌ XÌ TẾT</h2>
              <p className="text-xl mb-6">từ {lixiData.senderName}</p>
              
              <div className="bg-white/20 rounded-lg p-4 mb-6">
                <p className="text-lg">gửi đến</p>
                <p className="text-2xl font-bold">{lixiData.receiverName}</p>
              </div>

              <div className="animate-bounce">
                <p className="text-lg">👆 Chạm để mở</p>
              </div>
            </div>

            {/* Decoration */}
            <div className="absolute bottom-4 left-0 right-0 text-center text-yellow-300 text-2xl">
              ✨ ✨ ✨
            </div>
          </div>

          <p className="text-center text-white mt-6 text-lg">
            Chúc Mừng Năm Mới 2026! 🎊
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card max-w-2xl w-full">
        <div className="text-center mb-6">
          <h1 className="text-5xl mb-4 animate-bounce">🐴</h1>
          <h2 className="text-3xl font-bold text-tet-red mb-2">
            Bạn Nhận Được Lì Xì!
          </h2>
          <p className="text-xl text-gray-600">
            từ <span className="font-bold text-tet-red">{lixiData.senderName}</span>
          </p>
        </div>

        {/* Lời chúc */}
        {lixiData.message && (
          <div className="bg-gradient-to-r from-red-50 to-yellow-50 rounded-xl p-6 mb-6">
            <h3 className="font-bold text-gray-800 mb-2">💌 Lời chúc:</h3>
            <p className="text-gray-700 italic">"{lixiData.message}"</p>
          </div>
        )}

        {/* Thử thách */}
        <div className="bg-tet-gold/20 border-2 border-tet-gold rounded-xl p-6 mb-6">
          <h3 className="font-bold text-gray-800 mb-3 text-xl">🎯 Thử thách của bạn:</h3>
          <p className="text-lg text-gray-800 font-semibold">
            {lixiData.challenge}
          </p>
          <div className="mt-4 text-sm text-gray-600">
            ⏰ Thời hạn: {lixiData.deadline} ngày
          </div>
        </div>

        {/* Tiền thưởng */}
        <div className="bg-gradient-to-r from-green-50 to-yellow-50 rounded-xl p-6 mb-6">
          <h3 className="font-bold text-gray-800 mb-4 text-center">💰 Phần thưởng:</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 text-center shadow">
              <div className="text-4xl mb-2">✅</div>
              <p className="text-sm text-gray-600 mb-1">Thành công</p>
              <p className="text-2xl font-bold text-green-600">200,000đ</p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center shadow">
              <div className="text-4xl mb-2">💪</div>
              <p className="text-sm text-gray-600 mb-1">Thất bại</p>
              <p className="text-2xl font-bold text-orange-600">100,000đ</p>
            </div>
          </div>
          <p className="text-center text-sm text-gray-600 mt-4">
            ⭐ Dù sao bạn cũng được nhận lì xì!
          </p>
        </div>

        {/* Hướng dẫn */}
        <div className="bg-blue-50 rounded-xl p-6 mb-6">
          <h3 className="font-bold text-gray-800 mb-3">📋 Hướng dẫn:</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Hoàn thành thử thách</li>
            <li>Chụp ảnh hoặc quay video bằng chứng</li>
            <li>Upload lên hệ thống</li>
            <li>Chờ {lixiData.senderName} xác nhận</li>
            <li>Nhận lì xì! 🎉</li>
          </ol>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => navigate(`/upload/${id}`)}
            className="btn-primary w-full text-xl py-4"
          >
            🚀 Bắt Đầu Thử Thách!
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="btn-secondary w-full"
          >
            🏠 Về Trang Chủ
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReceiveLixi
