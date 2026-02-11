# 🚀 Hướng Dẫn Deploy - Giữ URL Cố Định

## ❌ SAI LẦM THƯỜNG GẶP

**ĐỪNG tạo service mới mỗi lần!** Điều này sẽ tạo URL mới:
- ❌ `lixi-thuthach-abc123.onrender.com`
- ❌ `lixi-thuthach-xyz789.onrender.com`
- ❌ URL thay đổi mỗi lần = phải cập nhật lại VITE_API_URL trên Vercel

## ✅ CÁCH ĐÚNG: Deploy với URL cố định

### 🔗 Bước 1: Kết nối GitHub với Render (Chỉ làm 1 lần)

1. **Vào Render Dashboard:**
   - https://dashboard.render.com/

2. **Tạo Web Service:**
   - Click **"New +"** → **"Web Service"**
   - Chọn **"Connect GitHub"** (nếu chưa kết nối)
   - Authorize Render truy cập GitHub

3. **Chọn Repository:**
   - Tìm và chọn: `NguyenDyKhang-k3/lixi-thuthach`

4. **Cấu hình Service:**
   ```
   Name: lixi-thuthach
   Region: Singapore (hoặc gần nhất)
   Branch: main
   Root Directory: server
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   Instance Type: Free
   ```

5. **Environment Variables:**
   ```
   NODE_ENV = production
   FRONTEND_URL = https://lixi-thuthach-five.vercel.app
   ADMIN_PASSWORD = Khang2026
   PORT = 10000
   ```

6. **Click "Create Web Service"**
   - Render sẽ build và deploy
   - URL cố định: `https://lixi-thuthach.onrender.com`

### 🔄 Bước 2: Deploy lần sau (Tự động)

**Mỗi khi có thay đổi:**

```bash
# 1. Commit và push code
git add .
git commit -m "Update: your changes"
git push origin main

# 2. Render TỰ ĐỘNG phát hiện và deploy
# 3. URL GIỮ NGUYÊN: https://lixi-thuthach.onrender.com
```

**KHÔNG CẦN làm gì thêm!** Render sẽ:
- ✅ Tự động pull code mới
- ✅ Tự động build
- ✅ Tự động deploy
- ✅ URL không đổi

### 📱 Bước 3: Cập nhật FRONTEND_URL (Nếu cần)

**Trên Vercel (Frontend):**

1. Vào project `lixi-thuthach` trên Vercel
2. Settings → Environment Variables
3. Cập nhật:
   ```
   VITE_API_URL = https://lixi-thuthach.onrender.com
   ```
4. Redeploy frontend

## 🔧 Deploy Thủ Công (Nếu không tự động)

**Nếu cần deploy thủ công:**

1. Vào Render Dashboard
2. Click vào service **"lixi-thuthach"** (service cũ)
3. Click **"Manual Deploy"** → **"Deploy latest commit"**
4. Đợi deploy xong
5. URL vẫn giữ nguyên!

## 🎯 Kiểm Tra Service Đang Chạy

**Check service hiện tại:**

```bash
# Test API
curl https://lixi-thuthach.onrender.com/api/health

# Response:
{
  "status": "ok",
  "message": "Lì Xì Thử Thách API is running!"
}
```

## 📋 Checklist Deploy

- [ ] Đã kết nối GitHub với Render
- [ ] Service name: `lixi-thuthach` (không thay đổi)
- [ ] Auto-Deploy bật (Settings → Build & Deploy → Auto-Deploy: Yes)
- [ ] Branch: `main`
- [ ] Root Directory: `server`
- [ ] Environment Variables đã set đúng
- [ ] URL cố định: `https://lixi-thuthach.onrender.com`
- [ ] Frontend đã cập nhật `VITE_API_URL`

## ⚠️ Lưu Ý

1. **Xóa các service cũ không dùng:**
   - Vào Dashboard → Xóa các service trùng lặp
   - Chỉ giữ 1 service `lixi-thuthach`

2. **Free tier của Render:**
   - Service sẽ sleep sau 15 phút không dùng
   - Request đầu tiên sẽ mất 30-60s để "đánh thức"
   - Các request sau sẽ nhanh

3. **Logs:**
   - Xem logs: Dashboard → Service → Logs
   - Theo dõi lỗi và debug

## 🆘 Troubleshooting

**Vấn đề: URL vẫn thay đổi**
- Bạn đang tạo service mới thay vì dùng service cũ
- Giải pháp: Xóa service mới, dùng lại service `lixi-thuthach` đã tạo

**Vấn đề: Auto-deploy không hoạt động**
- Check: Settings → Build & Deploy → Auto-Deploy = Yes
- Check: Branch đúng là `main`
- Thử Manual Deploy 1 lần

**Vấn đề: Build failed**
- Xem Logs để biết lỗi
- Check file `package.json` trong folder `server/`
- Đảm bảo `npm install` chạy được local

## 🎉 Kết Quả

✅ **URL cố định:** `https://lixi-thuthach.onrender.com`
✅ **Tự động deploy** khi push code
✅ **Không cần cập nhật** VITE_API_URL nữa
✅ **Dễ quản lý** và maintain
