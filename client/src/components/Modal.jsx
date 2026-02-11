import { useEffect, useState } from 'react'

export function AlertModal({ isOpen, onClose, title, message, type = 'info' }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️',
  }

  const colors = {
    success: 'from-green-500 to-green-600',
    error: 'from-red-500 to-red-600',
    warning: 'from-yellow-500 to-orange-600',
    info: 'from-blue-500 to-blue-600',
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform animate-slideIn">
        <div className={`bg-gradient-to-r ${colors[type]} p-6 rounded-t-2xl text-center`}>
          <div className="text-6xl mb-2">{icons[type]}</div>
          <h3 className="text-2xl font-bold text-white">{title}</h3>
        </div>
        <div className="p-6">
          <p className="text-gray-700 text-center mb-6 text-lg">{message}</p>
          <button
            onClick={onClose}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  )
}

export function ConfirmModal({ isOpen, onClose, onConfirm, title, message, confirmText = 'Xác nhận', cancelText = 'Hủy' }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform animate-slideIn">
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-6 rounded-t-2xl text-center">
          <div className="text-6xl mb-2">🤔</div>
          <h3 className="text-2xl font-bold text-white">{title}</h3>
        </div>
        <div className="p-6">
          <p className="text-gray-700 text-center mb-6 text-lg">{message}</p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              {cancelText}
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function PromptModal({ isOpen, onClose, onSubmit, title, message, placeholder = '', defaultValue = '' }) {
  const [value, setValue] = useState(defaultValue)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setValue(defaultValue)
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, defaultValue])

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (value.trim()) {
      onSubmit(value.trim())
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform animate-slideIn">
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-6 rounded-t-2xl text-center">
          <div className="text-6xl mb-2">✍️</div>
          <h3 className="text-2xl font-bold text-white">{title}</h3>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <p className="text-gray-700 text-center mb-4">{message}</p>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none mb-6"
            autoFocus
          />
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              OK
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
