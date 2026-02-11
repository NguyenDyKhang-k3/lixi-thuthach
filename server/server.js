import express from 'express'
import cors from 'cors'
import { v4 as uuidv4 } from 'uuid'
import Storage from './storage.js'

const app = express()
const PORT = process.env.PORT || 5000
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin2026'

// Middleware
app.use(cors({ origin: true }))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

// Default challenges
const defaultChallenges = {
  nam: [
    { id: 'n1', emoji: '🤪', text: 'Quay video làm 5 biểu cảm khuôn mặt khó đỡ nhất', difficulty: 'easy', targetGroup: 'nam' },
    { id: 'n2', emoji: '🕺', text: 'Nhảy 1 điệu nhảy Tết siêu lầy và quay lại', difficulty: 'easy', targetGroup: 'nam' },
    { id: 'n3', emoji: '🎭', text: 'Diễn lại cảnh phim hài Tết yêu thích', difficulty: 'medium', targetGroup: 'nam' },
    { id: 'n4', emoji: '🎤', text: 'Hát karaoke bài Tết với giọng điệu hài hước', difficulty: 'easy', targetGroup: 'nam' },
    { id: 'n5', emoji: '🤹', text: 'Làm 1 trò ảo thuật (dù thất bại cũng được)', difficulty: 'medium', targetGroup: 'nam' },
    { id: 'n6', emoji: '📸', text: 'Chụp 10 bức ảnh tạo dáng "bá đạo" với đồ trang trí Tết', difficulty: 'easy', targetGroup: 'nam' },
    { id: 'n7', emoji: '🎬', text: 'Làm video prank vô hại cho người thân', difficulty: 'medium', targetGroup: 'nam' },
    { id: 'n8', emoji: '🏃', text: 'Cosplay thành con ngựa và chạy quanh nhà 3 vòng', difficulty: 'hard', targetGroup: 'nam' },
    { id: 'n9', emoji: '🎯', text: 'Thử ăn 5 loại bánh Tết trong 2 phút', difficulty: 'medium', targetGroup: 'nam' },
    { id: 'n10', emoji: '😂', text: 'Kể 5 câu chuyện cười về Tết cho cả nhà', difficulty: 'easy', targetGroup: 'nam' },
    { id: 'n11', emoji: '🎨', text: 'Vẽ chân dung gia đình bằng tay trái (hoặc tay phải nếu thuận tay trái)', difficulty: 'medium', targetGroup: 'nam' },
    { id: 'n12', emoji: '🎪', text: 'Làm màn biểu diễn xiếc đơn giản (tung hứng, giữ thăng bằng...)', difficulty: 'hard', targetGroup: 'nam' },
  ],
  nu: [
    { id: 'nu1', emoji: '💃', text: 'Nhảy 1 điệu nhảy trending với trang phục Tết', difficulty: 'easy', targetGroup: 'nu' },
    { id: 'nu2', emoji: '🎭', text: 'Diễn lại scene drama Tết của mẹ/bà', difficulty: 'easy', targetGroup: 'nu' },
    { id: 'nu3', emoji: '🎤', text: 'Hát 1 bài hát với giọng ca hài hước nhất', difficulty: 'easy', targetGroup: 'nu' },
    { id: 'nu4', emoji: '📸', text: 'Chụp bộ ảnh "sống ảo thảm họa" với đồ Tết', difficulty: 'easy', targetGroup: 'nu' },
    { id: 'nu5', emoji: '🤪', text: 'Làm video những tình huống "dở khóc dở cười" ngày Tết', difficulty: 'medium', targetGroup: 'nu' },
    { id: 'nu6', emoji: '👗', text: 'Thử 5 bộ trang phục khác nhau và làm video runway show', difficulty: 'medium', targetGroup: 'nu' },
    { id: 'nu7', emoji: '🍰', text: 'Thử làm bánh/món ăn theo hướng dẫn online (fail cũng được)', difficulty: 'medium', targetGroup: 'nu' },
    { id: 'nu8', emoji: '💄', text: 'Trang điểm theo phong cách "độc lạ" và chụp ảnh', difficulty: 'medium', targetGroup: 'nu' },
    { id: 'nu9', emoji: '🎬', text: 'Quay video "1 ngày làm YouTuber" về Tết', difficulty: 'hard', targetGroup: 'nu' },
    { id: 'nu10', emoji: '🎨', text: 'Vẽ tranh bằng... chân và ghi lại quá trình', difficulty: 'hard', targetGroup: 'nu' },
    { id: 'nu11', emoji: '🎪', text: 'Làm video challenge ăn cay/chua/đắng/ngọt', difficulty: 'medium', targetGroup: 'nu' },
    { id: 'nu12', emoji: '😹', text: 'Bắt chúước giọng nói của 5 người trong gia đình', difficulty: 'easy', targetGroup: 'nu' },
  ],
}

// Storage - Load from files or use defaults
let lixisDatabase = Storage.loadLixis()
let settings = Storage.loadSettings()
let challengesDatabase = Storage.loadChallenges() || defaultChallenges

console.log(`📂 Loaded ${Object.keys(lixisDatabase).length} lixis from storage`)
console.log(`⚙️ Settings:`, settings)

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

// Tạo lì xì mới - CHỈ admin (có token) HOẶC khi allowPublicCreation bật
app.post('/api/lixi/create', (req, res) => {
  try {
    const isAdmin = req.headers.authorization === `Bearer ${ADMIN_PASSWORD}`
    if (!isAdmin && !settings.allowPublicCreation) {
      return res.status(403).json({ error: 'Chỉ admin mới có quyền tạo lì xì. Vui lòng đăng nhập Admin.' })
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
    Storage.autoSaveLixis(lixisDatabase)

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
    Storage.autoSaveLixis(lixisDatabase)
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
    Storage.autoSaveLixis(lixisDatabase)
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
  Storage.autoSaveSettings(settings)
  res.json({ success: true, settings })
})

app.get('/api/admin/challenges', verifyAdmin, (req, res) => {
  res.json({ success: true, challenges: challengesDatabase })
})

app.put('/api/admin/challenges', verifyAdmin, (req, res) => {
  const { challenges } = req.body
  if (challenges && typeof challenges === 'object') {
    challengesDatabase = challenges
    Storage.autoSaveChallenges(challengesDatabase)
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
  Storage.autoSaveChallenges(challengesDatabase)
  res.json({ success: true, challenge })
})

app.delete('/api/admin/challenges/:group/:id', verifyAdmin, (req, res) => {
  const { group, id } = req.params
  if (challengesDatabase[group]) {
    challengesDatabase[group] = challengesDatabase[group].filter(c => c.id !== id)
    Storage.autoSaveChallenges(challengesDatabase)
  }
  res.json({ success: true })
})

// Start server
app.listen(PORT, () => {
  console.log(`✨ Lì Xì Thử Thách Server running on port ${PORT}`)
  console.log(`📍 API: http://localhost:${PORT}/api/health`)
  console.log(`🌐 FRONTEND_URL: ${FRONTEND_URL}`)
  console.log(`🔐 ADMIN_PASSWORD: ${ADMIN_PASSWORD ? '***' : 'NOT SET'}`)
})