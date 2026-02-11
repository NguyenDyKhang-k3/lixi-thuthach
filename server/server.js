import express from 'express'
import cors from 'cors'
import { v4 as uuidv4 } from 'uuid'

const app = express()
const PORT = process.env.PORT || 5000
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000'

// Middleware - CORS cho phép mọi origin (deploy free tier)
app.use(cors({ origin: true }))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

// In-memory storage (có thể thay bằng MongoDB sau)
let lixisDatabase = {}

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Lì Xì Thử Thách API is running!' })
})

// Tạo lì xì mới
app.post('/api/lixi/create', (req, res) => {
  try {
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
      successAmount: 200000,
      failAmount: 100000,
      createdAt: new Date().toISOString(),
      proof: null,
      status: 'pending' // pending, completed
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

// Lấy thông tin lì xì
app.get('/api/lixi/:id', (req, res) => {
  try {
    const { id } = req.params
    const lixi = lixisDatabase[id]

    if (!lixi) {
      return res.status(404).json({ error: 'Lixi not found' })
    }

    res.json({ success: true, lixi })
  } catch (error) {
    console.error('Error getting lixi:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Upload bằng chứng
app.post('/api/lixi/:id/proof', (req, res) => {
  try {
    const { id } = req.params
    const { type, url, description } = req.body

    const lixi = lixisDatabase[id]
    if (!lixi) {
      return res.status(404).json({ error: 'Lixi not found' })
    }

    lixi.proof = {
      type,
      url,
      description,
      uploadedAt: new Date().toISOString(),
      status: 'pending' // pending, approved, rejected
    }

    res.json({ success: true, message: 'Proof uploaded successfully' })
  } catch (error) {
    console.error('Error uploading proof:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Review bằng chứng
app.post('/api/lixi/:id/review', (req, res) => {
  try {
    const { id } = req.params
    const { approved } = req.body

    const lixi = lixisDatabase[id]
    if (!lixi) {
      return res.status(404).json({ error: 'Lixi not found' })
    }

    if (!lixi.proof) {
      return res.status(400).json({ error: 'No proof to review' })
    }

    lixi.proof.status = approved ? 'approved' : 'rejected'
    lixi.proof.reviewedAt = new Date().toISOString()
    lixi.finalAmount = approved ? lixi.successAmount : lixi.failAmount
    lixi.status = 'completed'

    res.json({
      success: true,
      approved,
      amount: lixi.finalAmount
    })
  } catch (error) {
    console.error('Error reviewing proof:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Lấy tất cả lì xì (for admin/debug)
app.get('/api/lixi', (req, res) => {
  res.json({
    success: true,
    total: Object.keys(lixisDatabase).length,
    lixis: Object.values(lixisDatabase)
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`🧧 Lì Xì Thử Thách Server running on port ${PORT}`)
  console.log(`📍 API: http://localhost:${PORT}/api`)
})

export default app
