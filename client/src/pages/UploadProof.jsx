import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getLixi, uploadProof } from '../api/lixiApi'

function UploadProof() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [lixiData, setLixiData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [proofType, setProofType] = useState('image') // image or video
  const [proofUrl, setProofUrl] = useState('')
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState('')

  useEffect(() => {
    const fetchLixi = async () => {
      const lixi = await getLixi(id)
      if (lixi) setLixiData(lixi)
      setLoading(false)
    }
    fetchLixi()
  }, [id])

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Tạo preview URL
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      
      // Trong thực tế, sẽ upload lên server/cloud
      // Ở đây chỉ demo với base64
      const reader = new FileReader()
      reader.onloadend = () => {
        setProofUrl(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUploading(true)

    try {
      await uploadProof(id, { type: proofType, url: proofUrl, description })

      const reviewLink = `${window.location.origin}/review/${id}`
      alert(`✅ Đã gửi bằng chứng thành công!\n\nGửi link này cho ${lixiData.senderName} để xác nhận:\n${reviewLink}`)
      
      navigate('/success')

    } catch (error) {
      alert('Có lỗi xảy ra. Vui lòng thử lại!')
      console.error(error)
    } finally {
      setUploading(false)
    }
  }

  if (loading || !lixiData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-2xl">
          {loading ? 'Đang tải...' : (
            <div className="text-center">
              <p className="mb-4">Không tìm thấy lì xì</p>
              <button onClick={() => navigate('/')} className="btn-primary">Về Trang Chủ</button>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card max-w-2xl w-full">
        <button
          onClick={() => navigate(`/receive/${id}`)}
          className="text-gray-600 hover:text-gray-800 mb-4"
        >
          ← Quay lại
        </button>

        <h1 className="text-3xl font-bold text-tet-red mb-6 text-center">
          📸 Upload Bằng Chứng
        </h1>

        {/* Hiển thị thử thách */}
        <div className="bg-tet-gold/20 border-2 border-tet-gold rounded-xl p-6 mb-6">
          <h3 className="font-bold text-gray-800 mb-2">🎯 Thử thách:</h3>
          <p className="text-lg text-gray-800">
            {lixiData.challenge}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Chọn loại bằng chứng */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Loại bằng chứng
            </label>
            <div className="flex gap-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  value="image"
                  checked={proofType === 'image'}
                  onChange={(e) => setProofType(e.target.value)}
                  className="mr-2"
                />
                <span>📸 Ảnh</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  value="video"
                  checked={proofType === 'video'}
                  onChange={(e) => setProofType(e.target.value)}
                  className="mr-2"
                />
                <span>🎥 Video</span>
              </label>
            </div>
          </div>

          {/* Upload file */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Upload {proofType === 'image' ? 'ảnh' : 'video'}
            </label>
            <input
              type="file"
              accept={proofType === 'image' ? 'image/*' : 'video/*'}
              onChange={handleFileChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-tet-red focus:outline-none"
            />
            
            {/* Preview */}
            {previewUrl && (
              <div className="mt-4">
                {proofType === 'image' ? (
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="w-full rounded-lg shadow-lg max-h-96 object-cover"
                  />
                ) : (
                  <video 
                    src={previewUrl} 
                    controls 
                    className="w-full rounded-lg shadow-lg max-h-96"
                  />
                )}
              </div>
            )}
          </div>

          {/* Mô tả */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Mô tả (optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-tet-red focus:outline-none"
              rows="4"
              placeholder="Mô tả ngắn về bằng chứng của bạn..."
            />
          </div>

          {/* Info box */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-bold text-gray-800 mb-2">💡 Lưu ý:</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Đảm bảo ảnh/video rõ ràng, không mờ</li>
              <li>• Thể hiện đầy đủ nội dung thử thách</li>
              <li>• Có thể thêm mô tả để giải thích rõ hơn</li>
            </ul>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={uploading || !proofUrl}
            className="btn-primary w-full text-xl py-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? 'Đang gửi...' : '🚀 Gửi Bằng Chứng'}
          </button>
        </form>

        {/* Reward reminder */}
        <div className="mt-6 bg-gradient-to-r from-green-50 to-yellow-50 rounded-lg p-4">
          <p className="text-center text-gray-700">
            💰 Sau khi {lixiData.senderName} xác nhận, bạn sẽ nhận được lì xì!
          </p>
        </div>
      </div>
    </div>
  )
}

export default UploadProof
