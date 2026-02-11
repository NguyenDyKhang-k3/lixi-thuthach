# 🚀 Hướng Dẫn Cài Đặt & Chạy

## 📋 Yêu cầu

- Node.js (v16 trở lên)
- npm hoặc yarn

## 🛠️ Cài đặt

### Cách 1: Cài đặt tất cả (Khuyến nghị)

```bash
# Từ thư mục gốc
npm run install-all
```

### Cách 2: Cài đặt từng phần

```bash
# Cài đặt Client
cd client
npm install

# Cài đặt Server
cd ../server
npm install
```

## ▶️ Chạy ứng dụng

### Chạy cả Frontend & Backend cùng lúc (Khuyến nghị)

```bash
# Từ thư mục gốc
npm run dev
```

### Chạy riêng lẻ

**Frontend (Client):**
```bash
cd client
npm run dev
```
→ Mở trình duyệt: http://localhost:3000

**Backend (Server):**
```bash
cd server
npm run dev
```
→ API chạy tại: http://localhost:5000

## 🎯 Sử dụng

1. **Tạo Lì Xì:**
   - Truy cập trang chủ
   - Click "Tạo Lì Xì Thử Thách"
   - Điền thông tin và chọn thử thách
   - Copy link gửi cho người nhận

2. **Nhận Lì Xì:**
   - Mở link nhận được
   - Xem thử thách
   - Upload bằng chứng (ảnh/video)

3. **Xác Nhận:**
   - Người gửi mở link review
   - Xem bằng chứng
   - Chọn "Thành công" (200K) hoặc "Cố gắng hơn" (100K)
   - Chuyển tiền cho người nhận

## 📁 Cấu trúc dự án

```
lixi-thuthach/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── pages/         # Các trang
│   │   ├── App.jsx        # App chính
│   │   ├── main.jsx       # Entry point
│   │   └── index.css      # Styles
│   ├── index.html
│   └── package.json
├── server/                 # Backend Express
│   ├── server.js          # Server chính
│   └── package.json
├── README.md
├── SETUP.md
└── package.json
```

## 🎨 Tính năng

✅ Tạo lì xì với thử thách tùy chỉnh
✅ 10+ mẫu thử thách có sẵn
✅ Upload ảnh/video bằng chứng
✅ Review và duyệt bằng chứng
✅ UI đẹp với hiệu ứng Tết
✅ Animation pháo hoa
✅ Responsive mobile-first

## 🔜 Tính năng tương lai

- [ ] Tích hợp Momo/VNPay thực
- [ ] MongoDB thay localStorage
- [ ] Authentication (đăng nhập)
- [ ] Lịch sử lì xì đã gửi/nhận
- [ ] Thông báo real-time (Socket.io)
- [ ] Share lên mạng xã hội
- [ ] QR Code tự động
- [ ] Multiple languages

## 🐛 Troubleshooting

**Lỗi: Port 3000 đã được sử dụng**
```bash
# Đổi port trong client/vite.config.js
server: { port: 3001 }
```

**Lỗi: Port 5000 đã được sử dụng**
```bash
# Đổi port trong server/server.js hoặc tạo file .env
PORT=5001
```

**Lỗi: Module not found**
```bash
# Xóa node_modules và cài lại
rm -rf node_modules
npm install
```

## 💡 Tips

- Dùng Chrome DevTools để debug
- Check Console nếu có lỗi
- localStorage được dùng để lưu data tạm
- Clear localStorage nếu muốn reset: `localStorage.clear()`

## 📞 Hỗ trợ

Nếu gặp vấn đề, hãy:
1. Check console log
2. Đảm bảo đã cài đủ dependencies
3. Restart server nếu cần

## 🎊 Chúc mừng năm mới!

Enjoy coding! 🧧✨
