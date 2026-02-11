# ⚡ Quick Start Guide

Hướng dẫn nhanh để chạy **Lì Xì Thử Thách** trong 5 phút!

## 🎯 Mục tiêu

Chạy được app trên máy local và test các tính năng cơ bản.

## 📋 Điều kiện

- ✅ Đã cài Node.js (v16+)
- ✅ Đã cài npm hoặc yarn
- ✅ Terminal/Command Prompt

## 🚀 3 Bước Đơn Giản

### Bước 1: Cài đặt (2 phút)

**Windows:**
```bash
# Double-click file
install.bat
```

**Mac/Linux:**
```bash
npm run install-all
```

### Bước 2: Chạy (1 phút)

**Windows:**
```bash
# Double-click file
start.bat
```

**Mac/Linux:**
```bash
npm run dev
```

### Bước 3: Mở trình duyệt

Truy cập: **http://localhost:3000**

## 🎮 Test Features

### Test 1: Tạo Lì Xì

1. Click "Tạo Lì Xì Thử Thách"
2. Điền:
   - Tên bạn: `Anh Tuấn`
   - Người nhận: `Em Minh`
   - Chọn thử thách: `📸 Chụp ảnh với 5 người...`
   - Lời chúc: `Chúc em năm mới vui vẻ!`
3. Click "Tạo Lì Xì"
4. Copy link

### Test 2: Nhận Lì Xì

1. Paste link vào tab mới
2. Click vào bao lì xì để mở
3. Xem thông tin thử thách
4. Click "Bắt Đầu Thử Thách"

### Test 3: Upload Bằng Chứng

1. Chọn "Ảnh"
2. Upload một ảnh bất kỳ
3. Viết mô tả (optional)
4. Click "Gửi Bằng Chứng"
5. Copy link review

### Test 4: Review & Approve

1. Paste link review vào tab mới
2. Xem bằng chứng
3. Click "Thành Công" (200K)
4. Xem kết quả

## ✅ Checklist Thành Công

- [ ] App chạy được trên localhost:3000
- [ ] Có thể tạo lì xì
- [ ] Có thể mở link lì xì
- [ ] Có thể upload ảnh
- [ ] Có thể review và duyệt
- [ ] Animation hoạt động mượt

## ❓ Gặp Vấn Đề?

### Port đã được sử dụng

```bash
# Kill process trên port 3000
npx kill-port 3000

# Hoặc đổi port trong client/vite.config.js
```

### Module not found

```bash
cd client
npm install
cd ../server
npm install
```

### Lỗi khác

1. Check console.log trong browser (F12)
2. Check terminal output
3. Restart server
4. Xem [SETUP.md](./SETUP.md) để biết thêm chi tiết

## 🎓 Học Thêm

Sau khi chạy được:

1. Đọc [README.md](./README.md) để hiểu về project
2. Xem [SETUP.md](./SETUP.md) cho hướng dẫn chi tiết
3. Đọc [CONTRIBUTING.md](./CONTRIBUTING.md) nếu muốn đóng góp
4. Check [TODO.md](./TODO.md) để biết roadmap

## 🎉 Xong!

Bây giờ bạn đã sẵn sàng để:
- Customize challenges
- Thêm tính năng mới
- Deploy lên production
- Share với bạn bè!

**Happy Coding! 🧧✨**

---

⏱️ **Tổng thời gian: 3-5 phút**

Nếu mất nhiều hơn 10 phút, có thể có vấn đề. Hãy check lại!
