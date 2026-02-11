import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CreateLixi from './pages/CreateLixi'
import ReceiveLixi from './pages/ReceiveLixi'
import UploadProof from './pages/UploadProof'
import ReviewProof from './pages/ReviewProof'
import Success from './pages/Success'

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
      </Routes>
    </div>
  )
}

export default App
