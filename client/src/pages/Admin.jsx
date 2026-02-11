import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  adminLogin,
  adminGetStats,
  adminGetLixis,
  adminGetSettings,
  adminUpdateSettings,
  adminGetChallenges,
  adminUpdateChallenges,
} from '../api/lixiApi'
import { TARGET_GROUPS } from '../data/challenges'

const API_URL = import.meta.env.VITE_API_URL || ''

function Admin() {
  const navigate = useNavigate()
  const [token, setToken] = useState(localStorage.getItem('adminToken'))
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [activeTab, setActiveTab] = useState('stats')
  const [stats, setStats] = useState(null)
  const [lixis, setLixis] = useState([])
  const [settings, setSettings] = useState(null)
  const [challenges, setChallenges] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!API_URL) {
      setLoginError('Chưa cấu hình API. Chỉ hoạt động khi deploy.')
      return
    }
    if (token) {
      localStorage.setItem('adminToken', token)
      loadData()
    }
  }, [token])

  const loadData = async () => {
    if (!token) return
    setLoading(true)
    try {
      const [statsData, lixisData, settingsData, challengesData] = await Promise.all([
        adminGetStats(token),
        adminGetLixis(token),
        adminGetSettings(token),
        adminGetChallenges(token),
      ])
      setStats(statsData)
      setLixis(lixisData)
      setSettings(settingsData)
      setChallenges(challengesData)
    } catch (e) {
      setToken(null)
      localStorage.removeItem('adminToken')
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoginError('')
    try {
      const t = await adminLogin(password)
      setToken(t)
    } catch (e) {
      setLoginError(e.message || 'Đăng nhập thất bại')
    }
  }

  const handleLogout = () => {
    setToken(null)
    localStorage.removeItem('adminToken')
    navigate('/')
  }

  const handleSaveSettings = async () => {
    try {
      await adminUpdateSettings(token, settings)
      alert('Đã lưu cài đặt!')
    } catch (e) {
      alert('Lỗi: ' + e.message)
    }
  }

  const handleSaveChallenges = async () => {
    try {
      await adminUpdateChallenges(token, challenges)
      alert('Đã lưu thử thách!')
    } catch (e) {
      alert('Lỗi: ' + e.message)
    }
  }

  const addChallenge = (group) => {
    const text = prompt('Nhập nội dung thử thách:')
    if (!text) return
    const newCh = { id: Date.now().toString().slice(-6), emoji: '🎯', text, difficulty: 'medium', targetGroup: group }
    setChallenges(prev => ({
      ...prev,
      [group]: [...(prev[group] || []), newCh],
    }))
  }

  const removeChallenge = (group, id) => {
    if (!confirm('Xóa thử thách này?')) return
    setChallenges(prev => ({
      ...prev,
      [group]: (prev[group] || []).filter(c => c.id !== id),
    }))
  }

  if (!API_URL) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">⚠️ Admin không khả dụng</h1>
          <p className="mb-4">Trang admin chỉ hoạt động khi đã deploy và cấu hình VITE_API_URL.</p>
          <button onClick={() => navigate('/')} className="btn-primary">Về Trang Chủ</button>
        </div>
      </div>
    )
  }

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="card max-w-md w-full bg-slate-800/50 border border-slate-600">
          <div className="text-center mb-6">
            <h1 className="text-4xl mb-2">🐴</h1>
            <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
            <p className="text-slate-400">Lì Xì Thử Thách 2026</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mật khẩu admin"
              className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-500"
              required
            />
            {loginError && <p className="text-red-400 text-sm">{loginError}</p>}
            <button type="submit" className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-lg">
              Đăng Nhập
            </button>
          </form>
          <button onClick={() => navigate('/')} className="w-full mt-4 py-2 text-slate-400 hover:text-white">
            ← Quay lại
          </button>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-amber-400 text-xl">Đang tải...</div>
      </div>
    )
  }

  const tabs = [
    { id: 'stats', label: '📊 Thống Kê', icon: '📊' },
    { id: 'lixis', label: '🧧 Lì Xì', icon: '🧧' },
    { id: 'challenges', label: '🎯 Thử Thách', icon: '🎯' },
    { id: 'settings', label: '⚙️ Cài Đặt', icon: '⚙️' },
  ]

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <header className="bg-slate-800 border-b border-slate-700 px-4 py-3 flex justify-between items-center flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🐴</span>
          <h1 className="text-xl font-bold">Admin - Lì Xì Thử Thách</h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => navigate('/create')} className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-lg text-sm">
            🎁 Tạo Lì Xì
          </button>
          <button onClick={handleLogout} className="px-4 py-2 bg-red-600/50 hover:bg-red-600 rounded-lg text-sm">
            Đăng xuất
          </button>
        </div>
      </header>

      <div className="flex border-b border-slate-700 overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-6 py-4 font-medium whitespace-nowrap ${
              activeTab === t.id ? 'bg-amber-500/20 text-amber-400 border-b-2 border-amber-500' : 'text-slate-400 hover:text-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="p-6 max-w-6xl mx-auto">
        {/* Stats */}
        {activeTab === 'stats' && stats && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                <p className="text-slate-400 text-sm">Tổng lì xì</p>
                <p className="text-2xl font-bold text-amber-400">{stats.stats.totalLixis}</p>
              </div>
              <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                <p className="text-slate-400 text-sm">Đang chờ</p>
                <p className="text-2xl font-bold">{stats.stats.pending}</p>
              </div>
              <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                <p className="text-slate-400 text-sm">Thành công</p>
                <p className="text-2xl font-bold text-green-400">{stats.stats.successCount}</p>
              </div>
              <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                <p className="text-slate-400 text-sm">Thất bại</p>
                <p className="text-2xl font-bold text-orange-400">{stats.stats.failCount}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                <p className="text-slate-400 text-sm">Tổng tiền thành công</p>
                <p className="text-2xl font-bold text-green-400">{stats.stats.totalSuccessAmount?.toLocaleString('vi-VN')}đ</p>
              </div>
              <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                <p className="text-slate-400 text-sm">Tổng tiền thất bại</p>
                <p className="text-2xl font-bold text-orange-400">{stats.stats.totalFailAmount?.toLocaleString('vi-VN')}đ</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                <p className="text-slate-400 text-sm mb-2">Người gửi</p>
                <ul className="text-sm space-y-1 max-h-32 overflow-y-auto">
                  {stats.uniqueSenders?.map((s, i) => <li key={i}>• {s}</li>)}
                  {(!stats.uniqueSenders || stats.uniqueSenders.length === 0) && <li className="text-slate-500">Chưa có</li>}
                </ul>
              </div>
              <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                <p className="text-slate-400 text-sm mb-2">Người nhận</p>
                <ul className="text-sm space-y-1 max-h-32 overflow-y-auto">
                  {stats.uniqueReceivers?.map((r, i) => <li key={i}>• {r}</li>)}
                  {(!stats.uniqueReceivers || stats.uniqueReceivers.length === 0) && <li className="text-slate-500">Chưa có</li>}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Lixis list */}
        {activeTab === 'lixis' && (
          <div className="space-y-2 max-h-[70vh] overflow-y-auto">
            {lixis.length === 0 ? (
              <p className="text-slate-500">Chưa có lì xì nào</p>
            ) : (
              lixis.map((l) => (
                <div key={l.id} className="bg-slate-800 rounded-lg p-4 border border-slate-700 flex flex-wrap gap-2 items-center justify-between">
                  <div>
                    <p><span className="text-amber-400">{l.senderName}</span> → <span className="text-green-400">{l.receiverName}</span></p>
                    <p className="text-sm text-slate-400">{l.challenge?.slice(0, 50)}...</p>
                    <p className="text-xs text-slate-500">{new Date(l.createdAt).toLocaleString('vi-VN')}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${l.status === 'completed' ? 'bg-green-500/20' : 'bg-amber-500/20'}`}>
                    {l.status}
                  </span>
                  <a href={`/review/${l.id}`} target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline text-sm">
                    Xem
                  </a>
                </div>
              ))
            )}
          </div>
        )}

        {/* Challenges */}
        {activeTab === 'challenges' && challenges && (
          <div className="space-y-6">
            {TARGET_GROUPS.map((g) => (
              <div key={g.id} className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold">{g.emoji} {g.name}</h3>
                  <button onClick={() => addChallenge(g.id)} className="px-3 py-1 bg-amber-500/30 hover:bg-amber-500/50 rounded text-sm">
                    + Thêm
                  </button>
                </div>
                <ul className="space-y-2">
                  {(challenges[g.id] || []).map((c) => (
                    <li key={c.id} className="flex justify-between items-center bg-slate-700/50 rounded-lg px-3 py-2">
                      <span>{c.emoji} {c.text}</span>
                      <button onClick={() => removeChallenge(g.id, c.id)} className="text-red-400 hover:text-red-300 text-sm">
                        Xóa
                      </button>
                    </li>
                  ))}
                  {(challenges[g.id] || []).length === 0 && <li className="text-slate-500 text-sm">Chưa có thử thách</li>}
                </ul>
              </div>
            ))}
            <button onClick={handleSaveChallenges} className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-lg">
              Lưu Thử Thách
            </button>
          </div>
        )}

        {/* Settings */}
        {activeTab === 'settings' && settings && (
          <div className="space-y-6 max-w-md">
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.allowPublicCreation}
                  onChange={(e) => setSettings({ ...settings, allowPublicCreation: e.target.checked })}
                  className="w-4 h-4 rounded"
                />
                <span>Cho phép mọi người tạo lì xì</span>
              </label>
              <p className="text-slate-500 text-sm mt-1">Tắt = chỉ admin mới tạo được</p>
            </div>
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
              <label className="block text-slate-400 text-sm mb-1">Tiền thành công (đ)</label>
              <input
                type="number"
                value={settings.successAmount}
                onChange={(e) => setSettings({ ...settings, successAmount: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white"
              />
            </div>
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
              <label className="block text-slate-400 text-sm mb-1">Tiền thất bại (đ)</label>
              <input
                type="number"
                value={settings.failAmount}
                onChange={(e) => setSettings({ ...settings, failAmount: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white"
              />
            </div>
            <button onClick={handleSaveSettings} className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-lg">
              Lưu Cài Đặt
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Admin
