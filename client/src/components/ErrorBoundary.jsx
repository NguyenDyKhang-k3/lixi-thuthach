import { Component } from 'react'

export class ErrorBoundary extends Component {
  state = { hasError: false, error: null }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-xl font-bold text-gray-800 mb-2">Có lỗi xảy ra</h1>
            <p className="text-gray-600 mb-6">
              Vui lòng tải lại trang hoặc thử lại sau.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-tet-red text-white font-bold rounded-lg hover:bg-red-600"
            >
              Tải lại trang
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
