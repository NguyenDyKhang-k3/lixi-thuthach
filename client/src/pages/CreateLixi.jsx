import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { challengeTemplates } from '../data/challenges'
import { createLixi } from '../api/lixiApi'

function CreateLixi() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    senderName: '',
    receiverName: '',
    challenge: '',
    customChallenge: '',
    message: '',
    deadline: 3, // số ngày
  })
  const [loading, setLoading] = useState(false)
  const [generatedLink, setGeneratedLink] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const finalChallenge = formData.challenge === 'custom' 
        ? formData.customChallenge 
        : formData.challenge

      const { link } = await createLixi({
        senderName: formData.senderName,
        receiverName: formData.receiverName,
        challenge: finalChallenge,
        message: formData.message,
        deadline: formData.deadline,
      })

      setGeneratedLink(link)

    } catch (error) {
      alert('Có lỗi xảy ra. Vui lòng thử lại!')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const copyLink = () => {
    navigator.clipboard.writeText(generatedLink)
    alert('Đã copy link! Gửi cho người nhận nhé!')
  }

  if (generatedLink) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="card max-w-2xl w-full text-center">
          <h1 className="text-5xl mb-4">🎉</h1>
          <h2 className="text-3xl font-bold text-tet-red mb-4">
            Lì Xì Đã Được Tạo!
          </h2>
          
          <div className="bg-gray-100 rounded-lg p-4 mb-6 break-all">
            <p className="text-sm text-gray-600 mb-2">Link lì xì của bạn:</p>
            <p className="font-mono text-blue-600">{generatedLink}</p>
          </div>

          <div className="space-y-3">
            <button onClick={copyLink} className="btn-primary w-full">
              📋 Copy Link
            </button>
            
            <button 
              onClick={() => navigate('/')} 
              className="btn-secondary w-full"
            >
              🏠 Về Trang Chủ
            </button>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <p className="text-sm text-gray-700">
              💡 Gửi link này cho người nhận. Họ sẽ xem thử thách và upload bằng chứng!
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card max-w-2xl w-full">
        <button
          onClick={() => navigate('/')}
          className="text-gray-600 hover:text-gray-800 mb-4"
        >
          ← Quay lại
        </button>

        <h1 className="text-3xl font-bold text-tet-red mb-6 text-center">
          🧧 Tạo Lì Xì Thử Thách
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tên người gửi */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Tên bạn (người gửi)
            </label>
            <input
              type="text"
              required
              value={formData.senderName}
              onChange={(e) => setFormData({...formData, senderName: e.target.value})}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-tet-red focus:outline-none"
              placeholder="VD: Anh Tuấn"
            />
          </div>

          {/* Tên người nhận */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Tên người nhận
            </label>
            <input
              type="text"
              required
              value={formData.receiverName}
              onChange={(e) => setFormData({...formData, receiverName: e.target.value})}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-tet-red focus:outline-none"
              placeholder="VD: Em Minh"
            />
          </div>

          {/* Chọn thử thách */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Chọn thử thách
            </label>
            <select
              required
              value={formData.challenge}
              onChange={(e) => setFormData({...formData, challenge: e.target.value})}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-tet-red focus:outline-none"
            >
              <option value="">-- Chọn thử thách --</option>
              {challengeTemplates.map(template => (
                <option key={template.id} value={template.text}>
                  {template.emoji} {template.text}
                </option>
              ))}
              <option value="custom">✏️ Tự viết thử thách</option>
            </select>
          </div>

          {/* Tự viết thử thách */}
          {formData.challenge === 'custom' && (
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Viết thử thách của bạn
              </label>
              <textarea
                required
                value={formData.customChallenge}
                onChange={(e) => setFormData({...formData, customChallenge: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-tet-red focus:outline-none"
                rows="3"
                placeholder="VD: Hát 1 bài hát về Tết và quay lại"
              />
            </div>
          )}

          {/* Lời chúc */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Lời chúc Tết
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-tet-red focus:outline-none"
              rows="3"
              placeholder="VD: Chúc em năm mới vui vẻ, học giỏi, phát tài phát lộc!"
            />
          </div>

          {/* Thời hạn */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Thời hạn hoàn thành
            </label>
            <select
              value={formData.deadline}
              onChange={(e) => setFormData({...formData, deadline: parseInt(e.target.value)})}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-tet-red focus:outline-none"
            >
              <option value="1">1 ngày</option>
              <option value="3">3 ngày</option>
              <option value="7">7 ngày</option>
              <option value="15">15 ngày</option>
            </select>
          </div>

          {/* Thông tin tiền */}
          <div className="bg-gradient-to-r from-green-50 to-yellow-50 rounded-lg p-4">
            <h3 className="font-bold text-gray-800 mb-2">💰 Số tiền lì xì:</h3>
            <div className="flex justify-around text-center">
              <div>
                <p className="text-green-600 font-bold text-2xl">200,000đ</p>
                <p className="text-sm text-gray-600">Thành công</p>
              </div>
              <div className="border-l-2 border-gray-300"></div>
              <div>
                <p className="text-orange-600 font-bold text-2xl">100,000đ</p>
                <p className="text-sm text-gray-600">Thất bại</p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full text-xl py-4"
          >
            {loading ? 'Đang tạo...' : '🎁 Tạo Lì Xì'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateLixi
