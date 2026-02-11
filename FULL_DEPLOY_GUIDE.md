# 🚀 Hướng Dẫn Deploy Đầy Đủ

## 📦 Kiến Trúc Ứng Dụng

```
Frontend (Client)  →  Vercel     →  https://lixi-thuthach-five.vercel.app
Backend (Server)   →  Render     →  https://lixi-thuthach.onrender.com
```

---

## 🎨 PHẦN 1: Deploy Frontend lên Vercel

### ✅ Bước 1: Kết nối GitHub với Vercel (Chỉ làm 1 lần)

1. **Vào Vercel Dashboard:**
   - https://vercel.com/

2. **Import Project:**
   - Click **"Add New..."** → **"Project"**
   - Chọn **"Import Git Repository"**
   - Authorize Vercel truy cập GitHub (nếu chưa)
   - Chọn repo: `NguyenDyKhang-k3/lixi-thuthach`

3. **Cấu hình Project:**
   ```
   Project Name: lixi-thuthach
   Framework Preset: Vite
   Root Directory: client
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Environment Variables (QUAN TRỌNG):**
   ```
   VITE_API_URL = https://lixi-thuthach.onrender.com
   ```
   
   ⚠️ **LƯU Ý:** URL backend phải KHÔNG có dấu `/` ở cuối!

5. **Click "Deploy"**
   - Vercel sẽ build và deploy
   - URL cố định: `https://lixi-thuthach-five.vercel.app`
   - Hoặc custom domain nếu bạn có

### 🔄 Deploy Frontend lần sau (Tự động)

```bash
# Chỉ cần push code
git add client/
git commit -m "Update frontend"
git push origin main

# → Vercel TỰ ĐỘNG deploy
# → URL GIỮ NGUYÊN
```

### 🔧 Cập nhật Environment Variables

**Nếu backend URL thay đổi:**

1. Vào Vercel Dashboard
2. Project → Settings → Environment Variables
3. Edit `VITE_API_URL`
4. **Deployments** → **Redeploy** project mới nhất
   - Chọn commit mới nhất
   - Click "⋯" → "Redeploy"

---

## ⚙️ PHẦN 2: Deploy Backend lên Render

### ✅ Bước 1: Kết nối GitHub với Render (Chỉ làm 1 lần)

1. **Vào Render Dashboard:**
   - https://dashboard.render.com/

2. **Tạo Web Service:**
   - Click **"New +"** → **"Web Service"**
   - Connect repository: `NguyenDyKhang-k3/lixi-thuthach`

3. **Cấu hình Service:**
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

4. **Environment Variables:**
   ```
   NODE_ENV = production
   FRONTEND_URL = https://lixi-thuthach-five.vercel.app
   ADMIN_PASSWORD = Khang2026
   PORT = 10000
   ```
   
   ⚠️ **LƯU Ý:** `FRONTEND_URL` phải KHÔNG có dấu `/` ở cuối!

5. **Bật Auto-Deploy:**
   - Settings → Build & Deploy
   - Auto-Deploy: **Yes**

6. **Click "Create Web Service"**
   - URL cố định: `https://lixi-thuthach.onrender.com`

### 🔄 Deploy Backend lần sau (Tự động)

```bash
# Chỉ cần push code
git add server/
git commit -m "Update backend"
git push origin main

# → Render TỰ ĐỘNG deploy
# → URL GIỮ NGUYÊN
```

---

## 🔗 PHẦN 3: Liên Kết Frontend & Backend

### ✅ Đảm bảo 2 bên "nói chuyện" được với nhau

**1. Backend biết Frontend:**
```
Render Environment Variable:
FRONTEND_URL = https://lixi-thuthach-five.vercel.app
```

**2. Frontend biết Backend:**
```
Vercel Environment Variable:
VITE_API_URL = https://lixi-thuthach.onrender.com
```

**3. CORS đã được cấu hình trong `server.js`:**
```javascript
app.use(cors({ origin: true }))
```

### 🧪 Test kết nối:

```bash
# Test backend
curl https://lixi-thuthach.onrender.com/api/health

# Response:
{
  "status": "ok",
  "message": "Lì Xì Thử Thách API is running!"
}
```

```bash
# Test frontend
curl https://lixi-thuthach-five.vercel.app

# Response: HTML page
```

---

## 📋 Workflow Deploy Hoàn Chỉnh

### 🎯 Deploy cả Frontend + Backend cùng lúc:

```bash
# 1. Commit tất cả thay đổi
git add .
git commit -m "feat: Add new features"
git push origin main

# 2. Vercel tự động deploy frontend
# 3. Render tự động deploy backend
# 4. Đợi 2-3 phút để cả 2 deploy xong
# 5. Test: https://lixi-thuthach-five.vercel.app
```

### 🔍 Kiểm tra Deploy Status:

**Vercel:**
- Dashboard → Project → Deployments
- Xem status: Building / Ready / Error

**Render:**
- Dashboard → Service → Logs
- Xem status: Building / Live / Failed

---

## ⚠️ LƯU Ý QUAN TRỌNG

### 1. **ĐỪNG tạo service/project mới mỗi lần!**

❌ **SAI:**
- Tạo project Vercel mới → URL mới
- Tạo service Render mới → URL mới
- Phải cập nhật env vars → Mất công!

✅ **ĐÚNG:**
- Dùng 1 project Vercel cố định
- Dùng 1 service Render cố định
- Auto-deploy khi push code

### 2. **Free Tier Limitations:**

**Vercel Free:**
- ✅ Unlimited deployments
- ✅ Automatic HTTPS
- ⚠️ 100GB bandwidth/month

**Render Free:**
- ✅ 750 hours/month
- ⚠️ Sleep sau 15 phút không dùng
- ⚠️ Request đầu mất 30-60s để "wake up"

### 3. **Environment Variables:**

**Khi nào cần update:**
- ✅ Đổi backend URL → Update `VITE_API_URL` trên Vercel
- ✅ Đổi frontend URL → Update `FRONTEND_URL` trên Render
- ✅ Đổi admin password → Update `ADMIN_PASSWORD` trên Render

**Sau khi update env vars:**
- Vercel: Phải **Redeploy**
- Render: Tự động restart

---

## 🆘 Troubleshooting

### ❌ Lỗi: "Failed to fetch" trên Frontend

**Nguyên nhân:**
- Backend đang sleep (Render Free)
- CORS chưa đúng
- `VITE_API_URL` sai

**Giải pháp:**
1. Đợi 30-60s (backend wake up)
2. Check `VITE_API_URL` không có `/` cuối
3. Test backend: `curl https://lixi-thuthach.onrender.com/api/health`

### ❌ Lỗi: Build failed trên Vercel

**Nguyên nhân:**
- Code lỗi syntax
- Dependencies thiếu
- Root Directory sai

**Giải pháp:**
1. Check Vercel Logs
2. Test build local: `cd client && npm run build`
3. Fix lỗi → Push lại

### ❌ Lỗi: Build failed trên Render

**Nguyên nhân:**
- `package.json` thiếu dependencies
- Node version không match
- Root Directory sai

**Giải pháp:**
1. Check Render Logs
2. Test build local: `cd server && npm install && npm start`
3. Fix lỗi → Push lại

### ❌ Lỗi: CORS

**Triệu chứng:**
```
Access to fetch at 'https://lixi-thuthach.onrender.com/api/...'
from origin 'https://lixi-thuthach-five.vercel.app' has been blocked by CORS
```

**Giải pháp:**
1. Đảm bảo `FRONTEND_URL` trên Render đúng
2. Check `server.js` có: `app.use(cors({ origin: true }))`
3. Redeploy backend

---

## 📊 Checklist Deploy Lần Đầu

### Frontend (Vercel):
- [ ] Đã kết nối GitHub
- [ ] Root Directory: `client`
- [ ] Framework: Vite
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`
- [ ] Env var `VITE_API_URL` đã set
- [ ] Auto-deploy đã bật
- [ ] URL cố định: `https://lixi-thuthach-five.vercel.app`

### Backend (Render):
- [ ] Đã kết nối GitHub
- [ ] Root Directory: `server`
- [ ] Build Command: `npm install`
- [ ] Start Command: `npm start`
- [ ] Env vars đã set (`NODE_ENV`, `FRONTEND_URL`, `ADMIN_PASSWORD`, `PORT`)
- [ ] Auto-deploy đã bật
- [ ] URL cố định: `https://lixi-thuthach.onrender.com`

### Liên kết:
- [ ] Backend biết Frontend URL
- [ ] Frontend biết Backend URL
- [ ] Test API: `/api/health` → OK
- [ ] Test CORS: Frontend call API → OK
- [ ] Admin login hoạt động

---

## 🎉 Kết Quả

✅ **Frontend:** `https://lixi-thuthach-five.vercel.app`
✅ **Backend:** `https://lixi-thuthach.onrender.com`
✅ **Auto-deploy** khi push code
✅ **URL cố định**, không đổi
✅ **CORS hoạt động** giữa 2 domain

---

## 🚀 Next Steps

Sau khi deploy xong:

1. **Test tất cả tính năng:**
   - Tạo lì xì
   - Upload bằng chứng
   - Admin login
   - Review proof

2. **Xóa các deployment cũ:**
   - Vercel: Xóa các deployment test
   - Render: Xóa các service trùng lặp

3. **Monitor:**
   - Vercel Analytics
   - Render Logs
   - Theo dõi lỗi

4. **Optimize:**
   - Render: Upgrade lên paid nếu cần (no sleep)
   - Vercel: Add custom domain
   - Database: Thêm MongoDB/PostgreSQL

---

## 📚 Tài Liệu Tham Khảo

- [Vercel Docs](https://vercel.com/docs)
- [Render Docs](https://render.com/docs)
- [Vite Env Variables](https://vitejs.dev/guide/env-and-mode.html)
- Project README: `README.md`
- Setup Guide: `SETUP.md`
