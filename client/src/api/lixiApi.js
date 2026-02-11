/**
 * API Service cho Lì Xì Thử Thách
 * Sử dụng backend khi VITE_API_URL được cấu hình
 * Fallback localStorage khi chạy local không có backend
 */

const API_URL = import.meta.env.VITE_API_URL || ''

export const useApi = () => !!API_URL

// Lưu vào localStorage (fallback khi không có API)
const saveToLocal = (lixiId, data) => {
  const existing = JSON.parse(localStorage.getItem('lixis') || '{}')
  existing[lixiId] = data
  localStorage.setItem('lixis', JSON.stringify(existing))
}

// Lấy từ localStorage
const getFromLocal = (lixiId) => {
  const existing = JSON.parse(localStorage.getItem('lixis') || '{}')
  return existing[lixiId] || null
}

export const createLixi = async (data) => {
  if (API_URL) {
    const res = await fetch(`${API_URL}/api/lixi/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    const json = await res.json()
    if (!json.success) throw new Error(json.error || 'Failed')
    return { lixiId: json.lixiId, link: json.link }
  }

  // LocalStorage fallback
  const lixiId = Date.now().toString()
  const lixiData = {
    ...data,
    challenge: data.challenge,
    successAmount: 200000,
    failAmount: 100000,
    createdAt: new Date().toISOString(),
    proof: null,
  }
  saveToLocal(lixiId, lixiData)
  return {
    lixiId,
    link: `${window.location.origin}/receive/${lixiId}`,
  }
}

export const getLixi = async (lixiId) => {
  if (API_URL) {
    const res = await fetch(`${API_URL}/api/lixi/${lixiId}`)
    const json = await res.json()
    if (!json.success) return null
    return json.lixi
  }
  return getFromLocal(lixiId)
}

export const uploadProof = async (lixiId, proof) => {
  if (API_URL) {
    const res = await fetch(`${API_URL}/api/lixi/${lixiId}/proof`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(proof),
    })
    const json = await res.json()
    if (!json.success) throw new Error(json.error || 'Failed')
    return { success: true }
  }

  const lixi = getFromLocal(lixiId)
  if (!lixi) throw new Error('Lì xì không tồn tại')
  lixi.proof = {
    ...proof,
    uploadedAt: new Date().toISOString(),
    status: 'pending',
  }
  saveToLocal(lixiId, lixi)
  return { success: true }
}

export const reviewProof = async (lixiId, approved) => {
  if (API_URL) {
    const res = await fetch(`${API_URL}/api/lixi/${lixiId}/review`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ approved }),
    })
    const json = await res.json()
    if (!json.success) throw new Error(json.error || 'Failed')
    return { approved, amount: json.amount }
  }

  const lixi = getFromLocal(lixiId)
  if (!lixi?.proof) throw new Error('Chưa có bằng chứng')
  lixi.proof.status = approved ? 'approved' : 'rejected'
  lixi.proof.reviewedAt = new Date().toISOString()
  lixi.finalAmount = approved ? 200000 : 100000
  saveToLocal(lixiId, lixi)
  return { approved, amount: lixi.finalAmount }
}
