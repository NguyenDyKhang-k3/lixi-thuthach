import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CreateLixi from './pages/CreateLixi'
import ReceiveLixi from './pages/ReceiveLixi'
import UploadProof from './pages/UploadProof'
import ReviewProof from './pages/ReviewProof'
import Success from './pages/Success'
import Admin from './pages/Admin'

function NotFound() {
  const navigate = useLocation()
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-500 to-amber-500 p-4">
      <div className="card max-w-md text-center">
        <h1 className="text-6xl mb-4">🐴</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Không tìm thấy trang</h2>
        <p className="text-gray-600 mb-6">URL này không tồn tại. Vui lòng kiểm tra lại.</p>
        <button onClick={() => window.location.href = '/'} className="btn-primary w-full">Về Trang Chủ</button>
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateLixi />} />
        <Route path="/receive/:id" element={<ReceiveLixi />} />
        <Route path="/upload/:id" element={<UploadProof />} />
        <Route path="/review/:id" element={<ReviewProof />} />
        <Route path="/success" element={<Success />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
