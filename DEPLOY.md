# 🚀 Hướng Dẫn Deploy Lì Xì Thử Thách (FREE)

Deploy full-stack app lên **Vercel** (Frontend) + **Render** (Backend) - **100% MIỄN PHÍ**, không cần thẻ tín dụng!

---

## 📋 Tổng Quan

| Platform | Service | Free Tier | Giới hạn |
|----------|---------|-----------|----------|
| **Vercel** | Frontend (React) | ✅ Forever free | 100GB bandwidth, unlimited websites |
| **Render** | Backend (Node.js API) | ✅ Free | Spin down sau 15 phút không dùng, wake ~1 phút |

---

## 🔧 Chuẩn Bị

1. **Tài khoản GitHub** - [Đăng ký tại đây](https://github.com/join)
2. **Tài khoản Vercel** - [Đăng ký miễn phí](https://vercel.com/signup)
3. **Tài khoản Render** - [Đăng ký miễn phí](https://dashboard.render.com/register)

---

## 📤 Bước 1: Đẩy Code Lên GitHub

### 1.1 Tạo Repository Mới

1. Vào [GitHub](https://github.com) → New Repository
2. Đặt tên: `lixi-thuthach`
3. Chọn **Public**
4. **KHÔNG** tick "Add a README"
5. Click **Create repository**

### 1.2 Push Code

Mở terminal trong thư mục dự án:

```bash
cd D:\TuHoc\automation\lixi-thuthach

# Khởi tạo Git (nếu chưa có)
git init

# Thêm tất cả file
git add .

# Commit
git commit -m "Initial commit - Lì Xì Thử Thách"

# Thêm remote (thay YOUR_USERNAME bằng username GitHub của bạn)
git remote add origin https://github.com/YOUR_USERNAME/lixi-thuthach.git

# Push
git branch -M main
git push -u origin main
```

---

## 🎨 Bước 2: Deploy Frontend Lên Vercel

### 2.1 Import Project

1. Vào [vercel.com](https://vercel.com) → **Add New** → **Project**
2. Chọn **Import** từ repository `lixi-thuthach`
3. **Quan trọng**: Trong **Root Directory** → chọn `client` 
4. **Framework Preset**: Vite (auto-detect)

### 2.2 Environment Variables

**Chưa thêm gì** - để trống tạm. Sẽ thêm sau khi có URL Backend.

### 2.3 Deploy

1. Click **Deploy**
2. Chờ 2-3 phút
3. **Copy URL** của bạn (ví dụ: `https://lixi-thuthach-xxx.vercel.app`)

**Lưu URL này** - cần cho bước tiếp theo!

---

## 🖥️ Bước 3: Deploy Backend Lên Render

### 3.1 Tạo Web Service

1. Vào [dashboard.render.com](https://dashboard.render.com)
2. **New +** → **Web Service**
3. Connect repository `lixi-thuthach`
4. Cấu hình:

| Field | Value |
|-------|-------|
| **Name** | `lixi-thuthach-api` |
| **Region** | Singapore (gần VN) |
| **Root Directory** | `server` |
| **Runtime** | Node |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Instance Type** | **Free** |

### 3.2 Environment Variables

Thêm biến môi trường:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `FRONTEND_URL` | `https://YOUR-VERCEL-URL.vercel.app` *(paste URL Vercel từ bước 2)* |

### 3.3 Deploy

1. Click **Create Web Service**
2. Chờ 3-5 phút build
3. **Copy URL** của bạn (ví dụ: `https://lixi-thuthach-api.onrender.com`)

---

## 🔗 Bước 4: Kết Nối Frontend Với Backend

### 4.1 Vercel - Thêm Environment Variable

1. Vào [Vercel Dashboard](https://vercel.com/dashboard)
2. Chọn project `lixi-thuthach`
3. **Settings** → **Environment Variables**
4. Thêm:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://lixi-thuthach-api.onrender.com` *(URL Render từ bước 3)* |

5. **Redeploy** project: **Deployments** → ⋮ → **Redeploy**

---

## ✅ Kiểm Tra

1. **Frontend**: Mở URL Vercel → Trang chủ hiển thị
2. **API**: Mở `https://YOUR-RENDER-URL.onrender.com/api/health` → Phải thấy `{"status":"ok"}`
3. **Test flow**: Tạo lì xì → Copy link → Mở tab ẩn danh → Nhận lì xì

---

## 🎯 Links Của Bạn

Sau khi deploy xong, bạn sẽ có:

| Component | URL |
|-----------|-----|
| **Website** | `https://lixi-thuthach-xxx.vercel.app` |
| **API** | `https://lixi-thuthach-api.onrender.com` |
| **Health Check** | `https://lixi-thuthach-api.onrender.com/api/health` |

---

## ⚠️ Lưu Ý Render Free Tier

- **Spin down**: Sau 15 phút không có request → server tạm dừng
- **Wake up**: Request đầu tiên sau khi sleep mất **~50 giây** để khởi động
- **Data**: Không lưu trữ vĩnh viễn - khi deploy lại data mất
- **Bandwidth**: 750 giờ/tháng miễn phí

→ **Phù hợp cho demo, test, không phải production** 

---

## 🐛 Troubleshooting

### CORS Error
- Đảm bảo `FRONTEND_URL` và `VITE_API_URL` đúng
- Server đã cấu hình `cors({ origin: true })`

### Lì xì không tìm thấy
- Render có thể đang sleep - đợi 1 phút rồi thử lại
- Kiểm tra API: `curl https://YOUR-RENDER-URL/api/health`

### Build failed
- **Vercel**: Kiểm tra Root Directory = `client`
- **Render**: Kiểm tra Root Directory = `server`

---

## 📱 Custom Domain (Optional)

### Vercel
- Settings → Domains → Add `tudomain.com`

### Render
- Settings → Custom Domains → Add

---

## 🎉 Hoàn Thành!

Chúc mừng! Bạn đã deploy thành công app miễn phí. Chia sẻ link với bạn bè để test nhé! 🧧✨

---

**Tóm tắt**: GitHub → Vercel (client) → Render (server) → Kết nối URL → Done!
