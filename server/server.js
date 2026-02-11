import express from 'express'
import cors from 'cors'
import { v4 as uuidv4 } from 'uuid'

const app = express()
const PORT = process.env.PORT || 5000
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin2026'

// Middleware
app.use(cors({ origin: true }))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

// Storage
let lixisDatabase = {}
let settings = {
  allowPublicCreation: true,
  successAmount: 200000,
  failAmount: 100000,
}
let challengesDatabase = {
  tre_em: [
    { id: 'te1', emoji: '🎨', text: 'Vẽ tranh con ngựa hoặc chủ đề Tết', difficulty: 'easy', targetGroup: 'tre_em' },
    { id: 'te2', emoji: '🎤', text: 'Hát 1 bài hát về Tết và quay lại', difficulty: 'easy', targetGroup: 'tre_em' },
    { id: 'te3', emoji: '📸', text: 'Chụp ảnh với 3 người chúc "Chúc mừng năm mới"', difficulty: 'easy', targetGroup: 'tre_em' },
    { id: 'te4', emoji: '🧹', text: 'Dọn dẹp góc học tập của mình', difficulty: 'easy', targetGroup: 'tre_em' },
    { id: 'te5', emoji: '📖', text: 'Học thuộc 1 bài thơ về Tết (4 câu)', difficulty: 'medium', targetGroup: 'tre_em' },
    { id: 'te6', emoji: '✂️', text: 'Gấp origami con ngựa hoặc hoa mai', difficulty: 'medium', targetGroup: 'tre_em' },
    { id: 'te7', emoji: '🎁', text: 'Tặng quà cho ông bà và chụp ảnh', difficulty: 'easy', targetGroup: 'tre_em' },
  ],
  nam: [
    { id: 'n1', emoji: '🏃', text: 'Chạy bộ 5km', difficulty: 'medium', targetGroup: 'nam' },
    { id: 'n2', emoji: '💪', text: 'Tập 100 cái squat', difficulty: 'medium', targetGroup: 'nam' },
    { id: 'n3', emoji: '📸', text: 'Chụp ảnh với 5 người chúc Tết', difficulty: 'easy', targetGroup: 'nam' },
    { id: 'n4', emoji: '🍜', text: 'Nấu 1 món ăn Tết và chụp ảnh', difficulty: 'medium', targetGroup: 'nam' },
    { id: 'n5', emoji: '📞', text: 'Gọi điện cho 3 người thân chúc Tết', difficulty: 'easy', targetGroup: 'nam' },
    { id: 'n6', emoji: '🎬', text: 'Làm video TikTok/Reels về Tết', difficulty: 'medium', targetGroup: 'nam' },
    { id: 'n7', emoji: '🌏', text: 'Làm video chúc Tết bằng 3 thứ tiếng', difficulty: 'hard', targetGroup: 'nam' },
  ],
  nu: [
    { id: 'nu1', emoji: '🍜', text: 'Nấu 3 món ăn Tết truyền thống', difficulty: 'medium', targetGroup: 'nu' },
    { id: 'nu2', emoji: '🎨', text: 'Vẽ tranh hoặc trang trí nhà cửa Tết', difficulty: 'medium', targetGroup: 'nu' },
    { id: 'nu3', emoji: '💝', text: 'Làm 1 việc tốt và ghi lại bằng ảnh/video', difficulty: 'easy', targetGroup: 'nu' },
    { id: 'nu4', emoji: '✂️', text: 'Làm đồ handmade trang trí Tết', difficulty: 'medium', targetGroup: 'nu' },
    { id: 'nu5', emoji: '📸', text: 'Chụp ảnh với 5 người chúc Tết', difficulty: 'easy', targetGroup: 'nu' },
    { id: 'nu6', emoji: '🧹', text: 'Dọn dẹp nhà cửa và chụp ảnh trước/sau', difficulty: 'medium', targetGroup: 'nu' },
    { id: 'nu7', emoji: '📖', text: 'Học và giải thích ý nghĩa 3 phong tục Tết', difficulty: 'medium', targetGroup: 'nu' },
  ],
  nguoi_lon: [
    { id: 'nl1', emoji: '📞', text: 'Gọi điện cho 5 người thân chúc Tết', difficulty: 'easy', targetGroup: 'nguoi_lon' },
    { id: 'nl2', emoji: '💝', text: 'Tặng quà/lì xì cho người khó khăn', difficulty: 'medium', targetGroup: 'nguoi_lon' },
    { id: 'nl3', emoji: '📖', text: 'Học và giải thích ý nghĩa con ngựa trong văn hóa', difficulty: 'medium', targetGroup: 'nguoi_lon' },
    { id: 'nl4', emoji: '🍜', text: 'Nấu mâm cơm Tết đầy đủ', difficulty: 'hard', targetGroup: 'nguoi_lon' },
    { id: 'nl5', emoji: '🧹', text: 'Dọn dẹp và trang trí toàn bộ nhà cửa', difficulty: 'medium', targetGroup: 'nguoi_lon' },
    { id: 'nl6', emoji: '🎁', text: 'Tổ chức quây quần gia đình và chụp ảnh', difficulty: 'easy', targetGroup: 'nguoi_lon' },
  ],
}

// Helper - verify admin
const verifyAdmin = (req, res, next) => {
  const auth = req.headers.authorization
  if (!auth || auth !== `Bearer ${ADMIN_PASSWORD}`) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  next()
}

// ============ PUBLIC ROUTES ============

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Lì Xì Thử Thách API is running!' })
})

// Lấy settings (public - để check allowCreation)
app.get('/api/settings', (req, res) => {
  res.json({
    success: true,
    allowPublicCreation: settings.allowPublicCreation,
    successAmount: settings.successAmount,
    failAmount: settings.failAmount,
  })
})

// Lấy danh sách challenges (public)
app.get('/api/challenges', (req, res) => {
  res.json({ success: true, challenges: challengesDatabase })
})

// Tạo lì xì mới
app.post('/api/lixi/create', (req, res) => {
  try {
    if (!settings.allowPublicCreation) {
      return res.status(403).json({ error: 'Tạo lì xì đã bị tạm khóa. Liên hệ admin.' })
    }

    const { senderName, receiverName, challenge, message, deadline } = req.body
    
    if (!senderName || !receiverName || !challenge) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const lixiId = uuidv4()
    const lixi = {
      id: lixiId,
      senderName,
      receiverName,
      challenge,
      message,
      deadline: deadline || 3,
      successAmount: settings.successAmount,
      failAmount: settings.failAmount,
      createdAt: new Date().toISOString(),
      proof: null,
      status: 'pending'
    }

    lixisDatabase[lixiId] = lixi

    res.json({
      success: true,
      lixiId,
      link: `${FRONTEND_URL.replace(/\/$/, '')}/receive/${lixiId}`
    })
  } catch (error) {
    console.error('Error creating lixi:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.get('/api/lixi/:id', (req, res) => {
  try {
    const { id } = req.params
    const lixi = lixisDatabase[id]
    if (!lixi) return res.status(404).json({ error: 'Lixi not found' })
    res.json({ success: true, lixi })
  } catch (error) {
    console.error('Error getting lixi:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.post('/api/lixi/:id/proof', (req, res) => {
  try {
    const { id } = req.params
    const { type, url, description } = req.body
    const lixi = lixisDatabase[id]
    if (!lixi) return res.status(404).json({ error: 'Lixi not found' })
    lixi.proof = { type, url, description, uploadedAt: new Date().toISOString(), status: 'pending' }
    res.json({ success: true, message: 'Proof uploaded successfully' })
  } catch (error) {
    console.error('Error uploading proof:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.post('/api/lixi/:id/review', (req, res) => {
  try {
    const { id } = req.params
    const { approved } = req.body
    const lixi = lixisDatabase[id]
    if (!lixi) return res.status(404).json({ error: 'Lixi not found' })
    if (!lixi.proof) return res.status(400).json({ error: 'No proof to review' })
    lixi.proof.status = approved ? 'approved' : 'rejected'
    lixi.proof.reviewedAt = new Date().toISOString()
    lixi.finalAmount = approved ? lixi.successAmount : lixi.failAmount
    lixi.status = 'completed'
    res.json({ success: true, approved, amount: lixi.finalAmount })
  } catch (error) {
    console.error('Error reviewing proof:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// ============ ADMIN ROUTES ============

app.post('/api/admin/login', (req, res) => {
  const { password } = req.body
  if (password === ADMIN_PASSWORD) {
    res.json({ success: true, token: ADMIN_PASSWORD })
  } else {
    res.status(401).json({ error: 'Sai mật khẩu' })
  }
})

app.get('/api/admin/stats', verifyAdmin, (req, res) => {
  const lixis = Object.values(lixisDatabase)
  const completed = lixis.filter(l => l.status === 'completed')
  const successCount = completed.filter(l => l.proof?.status === 'approved').length
  const failCount = completed.filter(l => l.proof?.status === 'rejected').length
  const totalSuccessAmount = completed.filter(l => l.proof?.status === 'approved').reduce((s, l) => s + (l.finalAmount || 0), 0)
  const totalFailAmount = completed.filter(l => l.proof?.status === 'rejected').reduce((s, l) => s + (l.finalAmount || 0), 0)
  const senders = [...new Set(lixis.map(l => l.senderName))]
  const receivers = [...new Set(lixis.map(l => l.receiverName))]

  res.json({
    success: true,
    stats: {
      totalLixis: lixis.length,
      pending: lixis.filter(l => l.status === 'pending').length,
      completed: completed.length,
      successCount,
      failCount,
      totalSuccessAmount,
      totalFailAmount,
      senders: senders.length,
      receivers: receivers.length,
    },
    uniqueSenders: senders,
    uniqueReceivers: receivers,
  })
})

app.get('/api/admin/lixis', verifyAdmin, (req, res) => {
  res.json({
    success: true,
    lixis: Object.values(lixisDatabase).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
  })
})

app.get('/api/admin/settings', verifyAdmin, (req, res) => {
  res.json({ success: true, settings })
})

app.put('/api/admin/settings', verifyAdmin, (req, res) => {
  const { allowPublicCreation, successAmount, failAmount } = req.body
  if (typeof allowPublicCreation === 'boolean') settings.allowPublicCreation = allowPublicCreation
  if (typeof successAmount === 'number' && successAmount >= 0) settings.successAmount = successAmount
  if (typeof failAmount === 'number' && failAmount >= 0) settings.failAmount = failAmount
  res.json({ success: true, settings })
})

app.get('/api/admin/challenges', verifyAdmin, (req, res) => {
  res.json({ success: true, challenges: challengesDatabase })
})

app.put('/api/admin/challenges', verifyAdmin, (req, res) => {
  const { challenges } = req.body
  if (challenges && typeof challenges === 'object') {
    challengesDatabase = challenges
    res.json({ success: true, challenges: challengesDatabase })
  } else {
    res.status(400).json({ error: 'Invalid challenges format' })
  }
})

app.post('/api/admin/challenges/:group', verifyAdmin, (req, res) => {
  const { group } = req.params
  const challenge = req.body
  if (!challengesDatabase[group]) challengesDatabase[group] = []
  challenge.id = uuidv4().slice(0, 8)
  challenge.targetGroup = group
  challengesDatabase[group].push(challenge)
  res.json({ success: true, challenge })
})

app.delete('/api/admin/challenges/:group/:id', verifyAdmin, (req, res) => {
  const { group, id } = req.params
  if (challengesDatabase[group]) {
    challengesDatabase[group] = challengesDatabase[group].filter(c => c.id !== id)
  }
  res.json({ success: true })
})

</think>
Đang sửa route create để hỗ trợ admin bypass:
<｜tool▁calls▁begin｜><｜tool▁call▁begin｜>
StrReplace