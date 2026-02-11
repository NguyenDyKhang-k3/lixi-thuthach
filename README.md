# 🧧 Lì Xì Thử Thách

> Ứng dụng web gửi lì xì kèm thử thách vui nhộn trong dịp Tết Nguyên Đán!

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)

## ✨ Giới thiệu

**Lì Xì Thử Thách** là một ứng dụng web độc đáo kết hợp văn hóa lì xì truyền thống của người Việt với game vui nhộn. Người gửi tạo thử thách, người nhận hoàn thành và upload bằng chứng để nhận lì xì!

### 💡 Điểm đặc biệt

- ✅ **Thành công**: Nhận 200,000đ
- 💪 **Thất bại**: Vẫn nhận 100,000đ (an ủi)
- 🎯 Dù sao cũng vui và được nhận lì xì!

## 🎬 Demo

```
1. Tạo lì xì → Chọn thử thách → Gửi link
2. Người nhận → Xem thử thách → Upload bằng chứng
3. Người gửi → Xem & duyệt → Chuyển tiền
```

## 🎯 Tính năng

### ✅ Đã hoàn thành

- [x] Tạo lì xì với thử thách tùy chỉnh
- [x] 10+ mẫu thử thách có sẵn
- [x] Upload ảnh/video bằng chứng
- [x] Review và duyệt bằng chứng
- [x] UI đẹp mắt với theme Tết
- [x] Animation pháo hoa, bao lì xì
- [x] Responsive mobile-first design
- [x] LocalStorage để lưu trữ tạm

### 🔜 Sắp ra mắt

- [ ] Tích hợp thanh toán Momo/VNPay
- [ ] Database MongoDB
- [ ] User authentication
- [ ] Lịch sử lì xì
- [ ] Thông báo real-time
- [ ] QR Code generator
- [ ] Share social media
- [ ] Multi-language support

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express
- **Storage**: In-memory / LocalStorage (upgradable to MongoDB)
- **UUID**: uuid v9

## 🚀 Bắt đầu nhanh

### Yêu cầu hệ thống

- Node.js >= 16.0.0
- npm >= 7.0.0

### Cài đặt

**Windows:**
```bash
# Double click file install.bat
# Hoặc chạy trong terminal:
install.bat
```

**Mac/Linux:**
```bash
npm run install-all
```

### Chạy ứng dụng

**Windows:**
```bash
# Double click file start.bat
# Hoặc:
start.bat
```

**Mac/Linux:**
```bash
npm run dev
```

Ứng dụng sẽ mở tại:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 📖 Hướng dẫn sử dụng

### Cho người gửi lì xì:

1. Click "Tạo Lì Xì Thử Thách"
2. Nhập tên bạn và người nhận
3. Chọn thử thách (hoặc tự viết)
4. Viết lời chúc Tết
5. Copy link và gửi cho người nhận
6. Chờ họ upload bằng chứng
7. Review và quyết định: 200K hoặc 100K
8. Chuyển tiền qua Momo/Banking

### Cho người nhận lì xì:

1. Mở link nhận được
2. Xem thử thách
3. Hoàn thành thử thách
4. Chụp ảnh/quay video bằng chứng
5. Upload lên hệ thống
6. Chờ xác nhận
7. Nhận lì xì! 🎉

## 📁 Cấu trúc dự án

```
lixi-thuthach/
├── client/                     # Frontend React
│   ├── src/
│   │   ├── pages/             # Các trang
│   │   │   ├── Home.jsx       # Trang chủ
│   │   │   ├── CreateLixi.jsx # Tạo lì xì
│   │   │   ├── ReceiveLixi.jsx# Nhận lì xì
│   │   │   ├── UploadProof.jsx# Upload bằng chứng
│   │   │   ├── ReviewProof.jsx# Review
│   │   │   └── Success.jsx    # Thành công
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
├── server/                     # Backend Express
│   ├── server.js              # API server
│   ├── .env.example
│   └── package.json
├── README.md
├── SETUP.md                    # Hướng dẫn chi tiết
├── install.bat                 # Script cài đặt (Windows)
├── start.bat                   # Script chạy (Windows)
└── package.json
```

## 🎨 Screenshots

### Trang chủ
- Animation pháo hoa
- Button tạo/nhận lì xì
- Hướng dẫn cách chơi

### Tạo lì xì
- Form nhập thông tin
- 10+ mẫu thử thách
- Tùy chỉnh thử thách

### Nhận lì xì
- Animation bao lì xì
- Hiển thị thử thách
- Thông tin phần thưởng

### Upload bằng chứng
- Upload ảnh/video
- Preview trước khi gửi
- Mô tả bằng chứng

### Review
- Xem bằng chứng
- Approve/Reject
- Hiển thị số tiền

## 🔧 API Endpoints

```
GET    /api/health              # Health check
POST   /api/lixi/create         # Tạo lì xì mới
GET    /api/lixi/:id            # Lấy thông tin lì xì
POST   /api/lixi/:id/proof      # Upload bằng chứng
POST   /api/lixi/:id/review     # Review bằng chứng
GET    /api/lixi                # List all (debug)
```

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Hãy:

1. Fork project
2. Tạo branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📝 License

Dự án này được phân phối dưới giấy phép MIT. Xem file `LICENSE` để biết thêm chi tiết.

## 👨‍💻 Tác giả

Được tạo với ❤️ cho cộng đồng người Việt

## 🎊 Lời kết

Chúc các bạn năm mới vui vẻ, an khang thịnh vượng! Hãy sử dụng app này để tạo niềm vui cho người thân trong dịp Tết nhé!

**Chúc Mừng Năm Mới 2026! 🧧✨**

---

⭐ Nếu thấy project hay, hãy cho một star nhé!
