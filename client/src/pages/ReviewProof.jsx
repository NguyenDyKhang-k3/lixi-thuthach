import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getLixi, reviewProof } from '../api/lixiApi'

function ReviewProof() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [lixiData, setLixiData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [decision, setDecision] = useState(null) // 'approved' or 'rejected'
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    const fetchLixi = async () => {
      const lixi = await getLixi(id)
      if (lixi) setLixiData(lixi)
      setLoading(false)
    }
    fetchLixi()
  }, [id])

  const handleDecision = async (approved) => {
    setProcessing(true)
    setDecision(approved ? 'approved' : 'rejected')

    try {
      await reviewProof(id, approved)
    } catch (error) {
      console.error(error)
    } finally {
      setProcessing(false)
    }
  }

  if (loading || !lixiData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-2xl">
          {loading ? 'Đang tải...' : (
            <div className="card max-w-md text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Không tìm thấy lì xì</h2>
              <button onClick={() => navigate('/')} className="btn-primary">Về Trang Chủ</button>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (!lixiData.proof) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="card max-w-md text-center">
          <h1 className="text-6xl mb-4">⏳</h1>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Chưa có bằng chứng
          </h2>
          <p className="text-gray-600 mb-6">
            {lixiData.receiverName} chưa upload bằng chứng.
          </p>
          <button onClick={() => navigate('/')} className="btn-primary">
            Về Trang Chủ
          </button>
        </div>
      </div>
    )
  }

  if (decision) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="card max-w-2xl w-full text-center">
          <h1 className="text-6xl mb-4">
            {decision === 'approved' ? '🎉' : '💪'}
          </h1>
          <h2 className="text-3xl font-bold text-tet-red mb-4">
            {decision === 'approved' ? 'Đã Duyệt!' : 'Đã Đánh Giá'}
          </h2>
          
          <div className="bg-gradient-to-r from-green-50 to-yellow-50 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              💰 Số tiền lì xì:
            </h3>
            <p className={`text-5xl font-bold mb-2 ${
              decision === 'approved' ? 'text-green-600' : 'text-orange-600'
            }`}>
              {decision === 'approved' ? '200,000đ' : '100,000đ'}
            </p>
            <p className="text-gray-600">
              {decision === 'approved' 
                ? '✅ Thử thách hoàn thành xuất sắc!' 
                : '💪 Cố gắng lần sau nhé!'}
            </p>
          </div>

          {/* Payment Info */}
          <div className="bg-blue-50 rounded-xl p-6 mb-6">
            <h3 className="font-bold text-gray-800 mb-3">📱 Hướng dẫn chuyển tiền:</h3>
            <div className="text-left space-y-2 text-gray-700">
              <p>1. Mở app Momo/Banking</p>
              <p>2. Chuyển khoản {decision === 'approved' ? '200,000đ' : '100,000đ'} cho {lixiData.receiverName}</p>
              <p>3. Nội dung: "Lì xì Tết 2026"</p>
            </div>
          </div>

          {/* QR Code Placeholder */}
          <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-8 mb-6">
            <div className="text-gray-400 text-center">
              <div className="text-6xl mb-2">📱</div>
              <p>QR Code Momo/VNPay</p>
              <p className="text-sm">(Tích hợp trong phiên bản thực tế)</p>
            </div>
          </div>

          <button onClick={() => navigate('/')} className="btn-primary w-full">
            🏠 Về Trang Chủ
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-tet-red mb-6 text-center">
          👀 Xem Bằng Chứng
        </h1>

        {/* Info */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">Người nhận:</p>
            <p className="font-bold text-gray-800">{lixiData.receiverName}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">Upload lúc:</p>
            <p className="font-bold text-gray-800">
              {new Date(lixiData.proof.uploadedAt).toLocaleString('vi-VN')}
            </p>
          </div>
        </div>

        {/* Thử thách */}
        <div className="bg-tet-gold/20 border-2 border-tet-gold rounded-xl p-6 mb-6">
          <h3 className="font-bold text-gray-800 mb-2">🎯 Thử thách:</h3>
          <p className="text-lg text-gray-800">
            {lixiData.challenge}
          </p>
        </div>

        {/* Bằng chứng */}
        <div className="mb-6">
          <h3 className="font-bold text-gray-800 mb-3">📸 Bằng chứng:</h3>
          {lixiData.proof.type === 'image' ? (
            <img 
              src={lixiData.proof.url} 
              alt="Proof" 
              className="w-full rounded-lg shadow-lg"
            />
          ) : (
            <video 
              src={lixiData.proof.url} 
              controls 
              className="w-full rounded-lg shadow-lg"
            />
          )}
        </div>

        {/* Mô tả */}
        {lixiData.proof.description && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-bold text-gray-800 mb-2">📝 Mô tả:</h3>
            <p className="text-gray-700">{lixiData.proof.description}</p>
          </div>
        )}

        {/* Decision Buttons */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
          <h3 className="font-bold text-gray-800 mb-4 text-center text-xl">
            💭 Đánh giá của bạn?
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleDecision(true)}
              disabled={processing}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50"
            >
              <div className="text-3xl mb-2">✅</div>
              <div>Thành Công</div>
              <div className="text-2xl font-bold mt-1">200,000đ</div>
            </button>
            <button
              onClick={() => handleDecision(false)}
              disabled={processing}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50"
            >
              <div className="text-3xl mb-2">💪</div>
              <div>Cố Gắng Hơn</div>
              <div className="text-2xl font-bold mt-1">100,000đ</div>
            </button>
          </div>
          <p className="text-center text-sm text-gray-600 mt-4">
            ⭐ Nhớ rằng: Dù sao {lixiData.receiverName} cũng được nhận lì xì nhé!
          </p>
        </div>

        {processing && (
          <div className="text-center text-gray-600">
            <div className="animate-spin text-4xl mb-2">🔄</div>
            <p>Đang xử lý...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ReviewProof
