import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import { TARGET_GROUPS, challengesByGroup } from '../data/challenges'
import { createLixi, createLixiWithToken, getSettings, getChallenges } from '../api/lixiApi'
import { AlertModal } from '../components/Modal'

const API_URL = import.meta.env.VITE_API_URL || ''

function CreateLixi() {
  const navigate = useNavigate()
  const [adminToken, setAdminToken] = useState(() => localStorage.getItem('adminToken'))
  const [settings, setSettings] = useState(null)
  const [challenges, setChallenges] = useState(challengesByGroup)
  const [targetGroup, setTargetGroup] = useState('nam')
  const [formData, setFormData] = useState({
    senderName: '',
    receiverName: '',
    challenge: '',
    customChallenge: '',
    message: '',
    deadline: 3,
  })
  const [loading, setLoading] = useState(false)
  const [generatedLink, setGeneratedLink] = useState('')
  const [alertModal, setAlertModal] = useState({ isOpen: false, title: '', message: '', type: 'info' })

  // Chỉ admin (có token) mới được tạo. Kiểm tra mỗi lần mount và khi storage thay đổi.
  const isAdmin = !!adminToken
  const locked = !isAdmin

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    setAdminToken(token)
  }, [])

  useEffect(() => {
    const load = async () => {
      if (API_URL) {
        try {
          const [s, c] = await Promise.all([getSettings(), getChallenges()])
          setSettings(s)
          if (c) setChallenges(c)
        } catch {
          setSettings({ allowPublicCreation: false, successAmount: 200000, failAmount: 100000 })
        }
      } else {
        setSettings({ allowPublicCreation: false, successAmount: 200000, failAmount: 100000 })
      }
    }
    load()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const finalChallenge = formData.challenge === 'custom' 
        ? formData.customChallenge 
        : formData.challenge
      const data = {
        senderName: formData.senderName,
        receiverName: formData.receiverName,
        challenge: finalChallenge,
        message: formData.message,
        deadline: formData.deadline,
      }
      const result = adminToken && API_URL
        ? await createLixiWithToken(data, adminToken)
        : await createLixi(data)
      setGeneratedLink(result.link)
    } catch (error) {
      setAlertModal({
        isOpen: true,
        title: 'Lỗi',
        message: error.message || 'Có lỗi xảy ra. Vui lòng thử lại!',
        type: 'error'
      })
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const copyLink = () => {
    navigator.clipboard.writeText(generatedLink)
    setAlertModal({
      isOpen: true,
      title: 'Thành công',
      message: 'Đã copy link! Gửi cho người nhận nhé!',
      type: 'success'
    })
  }

  const currentChallenges = challenges[targetGroup] || []
  const successAmount = settings?.successAmount ?? 200000
  const failAmount = settings?.failAmount ?? 100000

  if (locked) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="card max-w-lg w-full text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-tet-red mb-4">Tạo lì xì đã tạm khóa</h2>
          <p className="text-gray-600 mb-6">
            Tính năng tạo lì xì hiện đang được quản lý. Liên hệ admin để được hỗ trợ.
          </p>
          <div className="space-y-3">
            <button onClick={() => navigate('/')} className="btn-primary w-full">Về Trang Chủ</button>
            <button onClick={() => navigate('/admin')} className="btn-secondary w-full">Đăng nhập Admin</button>
          </div>
        </div>
      </div>
    )
  }

  if (generatedLink) {
    return (
      <>
        <AlertModal
          isOpen={alertModal.isOpen}
          onClose={() => setAlertModal({ ...alertModal, isOpen: false })}
          title={alertModal.title}
          message={alertModal.message}
          type={alertModal.type}
        />
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="card max-w-2xl w-full text-center">
          <div className="text-5xl mb-4 animate-bounce">🐴</div>
          <h2 className="text-3xl font-bold text-tet-red mb-4">Lì Xì Đã Được Tạo!</h2>
          
          {/* QR Code */}
          <div className="bg-white p-6 rounded-xl mb-6 inline-block shadow-lg">
            <QRCodeSVG 
              value={generatedLink} 
              size={200}
              level="H"
              includeMargin={true}
            />
            <p className="text-xs text-gray-500 mt-2">📱 Quét mã QR để nhận lì xì</p>
          </div>

          {/* Link text */}
          <div className="bg-gray-100 rounded-lg p-4 mb-6 break-all">
            <p className="text-sm text-gray-600 mb-2">Link lì xì của bạn:</p>
            <p className="font-mono text-blue-600 text-sm">{generatedLink}</p>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <button onClick={copyLink} className="btn-primary w-full">📋 Copy Link</button>
            <button onClick={() => navigate('/')} className="btn-secondary w-full">🏠 Về Trang Chủ</button>
          </div>

          {/* Instructions */}
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <p className="text-sm text-gray-700 font-semibold mb-2">💡 Cách gửi lì xì:</p>
            <ul className="text-xs text-left text-gray-600 space-y-1">
              <li>📱 <strong>Cho mã QR</strong>: Chụp màn hình hoặc show trực tiếp</li>
              <li>🔗 <strong>Gửi link</strong>: Copy link và gửi qua Zalo/Messenger/SMS</li>
              <li>📸 Người nhận sẽ xem thử thách và upload bằng chứng!</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <AlertModal
        isOpen={alertModal.isOpen}
        onClose={() => setAlertModal({ ...alertModal, isOpen: false })}
        title={alertModal.title}
        message={alertModal.message}
        type={alertModal.type}
      />
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="card max-w-2xl w-full">
        <button onClick={() => navigate('/')} className="text-gray-600 hover:text-gray-800 mb-4">← Quay lại</button>

        <div className="flex items-center gap-3 mb-6">
          <span className="text-5xl">🐴</span>
          <div>
            <h1 className="text-3xl font-bold text-tet-red">Tạo Lì Xì Thử Thách</h1>
            <p className="text-sm text-gray-500">Năm Bính Ngọ 2026</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Tên bạn (người gửi)</label>
            <input
              type="text"
              required
              value={formData.senderName}
              onChange={(e) => setFormData({...formData, senderName: e.target.value})}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-tet-red focus:outline-none transition-colors"
              placeholder="VD: Anh Tuấn"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Tên người nhận</label>
            <input
              type="text"
              required
              value={formData.receiverName}
              onChange={(e) => setFormData({...formData, receiverName: e.target.value})}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-tet-red focus:outline-none transition-colors"
              placeholder="VD: Em Minh"
            />
          </div>

          {/* Chọn đối tượng (nhóm) */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Đối tượng nhận lì xì</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {TARGET_GROUPS.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => { setTargetGroup(g.id); setFormData({...formData, challenge: ''}) }}
                  className={`p-3 rounded-xl border-2 text-center transition-all ${
                    targetGroup === g.id
                      ? 'border-tet-red bg-red-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-2xl block mb-1">{g.emoji}</span>
                  <span className="text-sm font-medium">{g.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Chọn thử thách theo nhóm */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Chọn thử thách</label>
            <select
              required
              value={formData.challenge}
              onChange={(e) => setFormData({...formData, challenge: e.target.value})}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-tet-red focus:outline-none"
            >
              <option value="">-- Chọn thử thách --</option>
              {currentChallenges.map((c) => (
                <option key={c.id} value={c.text}>
                  {c.emoji} {c.text}
                </option>
              ))}
              <option value="custom">✏️ Tự viết thử thách</option>
            </select>
          </div>

          {formData.challenge === 'custom' && (
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Viết thử thách của bạn</label>
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

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Lời chúc Tết</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-tet-red focus:outline-none"
              rows="3"
              placeholder="VD: Chúc em năm mới vui vẻ, học giỏi, phát tài phát lộc!"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Thời hạn hoàn thành</label>
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

          <div className="bg-gradient-to-r from-green-50 to-yellow-50 rounded-lg p-4">
            <h3 className="font-bold text-gray-800 mb-2">💰 Số tiền lì xì:</h3>
            <div className="flex justify-around text-center">
              <div>
                <p className="text-green-600 font-bold text-2xl">{successAmount.toLocaleString('vi-VN')}đ</p>
                <p className="text-sm text-gray-600">Thành công</p>
              </div>
              <div className="border-l-2 border-gray-300"></div>
              <div>
                <p className="text-orange-600 font-bold text-2xl">{failAmount.toLocaleString('vi-VN')}đ</p>
                <p className="text-sm text-gray-600">Thất bại</p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full text-xl py-4 disabled:opacity-50"
          >
            {loading ? 'Đang tạo...' : '🎁 Tạo Lì Xì'}
          </button>
        </form>
      </div>
    </div>
    </>
  )
}

export default CreateLixi
