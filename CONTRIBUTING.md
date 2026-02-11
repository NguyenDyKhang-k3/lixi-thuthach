# 🤝 Đóng Góp Cho Dự Án

Cảm ơn bạn đã quan tâm đến dự án **Lì Xì Thử Thách**! Chúng tôi rất hoan nghênh mọi đóng góp từ cộng đồng.

## 📋 Quy Tắc Đóng Góp

### 1. Báo Lỗi (Bug Report)

Nếu bạn phát hiện lỗi, hãy tạo Issue với thông tin:

- **Mô tả lỗi**: Giải thích rõ ràng vấn đề
- **Các bước tái hiện**: Liệt kê từng bước để tái hiện lỗi
- **Kết quả mong đợi**: Điều bạn mong đợi xảy ra
- **Kết quả thực tế**: Điều đã xảy ra
- **Screenshots**: Nếu có
- **Môi trường**: OS, Browser, Node version...

### 2. Đề Xuất Tính Năng (Feature Request)

Có ý tưởng hay? Hãy tạo Issue với:

- **Mô tả tính năng**: Tính năng là gì?
- **Lý do**: Tại sao cần tính năng này?
- **Cách hoạt động**: Tính năng sẽ hoạt động như thế nào?
- **Mockup/Wireframe**: Nếu có

### 3. Pull Request

#### Quy trình:

1. **Fork repository**
   ```bash
   # Click Fork trên GitHub
   ```

2. **Clone về máy**
   ```bash
   git clone https://github.com/your-username/lixi-thuthach.git
   cd lixi-thuthach
   ```

3. **Tạo branch mới**
   ```bash
   git checkout -b feature/your-feature-name
   # hoặc
   git checkout -b fix/your-bug-fix
   ```

4. **Cài đặt dependencies**
   ```bash
   npm run install-all
   ```

5. **Làm thay đổi**
   - Viết code
   - Test kỹ
   - Commit thường xuyên

6. **Commit message chuẩn**
   ```bash
   git commit -m "feat: add new challenge template"
   git commit -m "fix: resolve upload issue"
   git commit -m "docs: update README"
   ```

   **Prefix:**
   - `feat`: Tính năng mới
   - `fix`: Sửa lỗi
   - `docs`: Cập nhật tài liệu
   - `style`: Format code, không thay đổi logic
   - `refactor`: Refactor code
   - `test`: Thêm/sửa test
   - `chore`: Cập nhật build, dependencies...

7. **Push lên GitHub**
   ```bash
   git push origin feature/your-feature-name
   ```

8. **Tạo Pull Request**
   - Vào GitHub repository
   - Click "New Pull Request"
   - Điền mô tả chi tiết
   - Gắn label phù hợp
   - Request review

#### Checklist trước khi PR:

- [ ] Code chạy được trên local
- [ ] Không có lỗi console
- [ ] Code tuân theo style guide
- [ ] Đã test trên nhiều trình duyệt (nếu frontend)
- [ ] Cập nhật docs nếu cần
- [ ] Commit message rõ ràng

## 💻 Style Guide

### JavaScript/React

- Sử dụng ES6+ syntax
- Functional components (không dùng class)
- Hooks cho state management
- Arrow functions
- Destructuring khi có thể
- DRY (Don't Repeat Yourself)

**Ví dụ:**
```javascript
// Good ✅
const MyComponent = ({ name, age }) => {
  const [count, setCount] = useState(0)
  
  return (
    <div>{name} - {age}</div>
  )
}

// Bad ❌
class MyComponent extends React.Component {
  // ...
}
```

### CSS/Tailwind

- Sử dụng Tailwind classes
- Tuân theo mobile-first
- Tránh inline styles
- Dùng custom classes trong index.css nếu cần

### Naming Convention

- **Components**: PascalCase (`MyComponent.jsx`)
- **Functions**: camelCase (`handleClick`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_COUNT`)
- **Files**: kebab-case cho utils, PascalCase cho components

## 🧪 Testing

Trước khi submit PR, hãy test:

1. **Chức năng chính:**
   - Tạo lì xì
   - Nhận lì xì
   - Upload bằng chứng
   - Review

2. **Edge cases:**
   - Link không hợp lệ
   - Upload file lớn
   - Kết nối chậm

3. **Responsive:**
   - Mobile
   - Tablet
   - Desktop

4. **Browsers:**
   - Chrome
   - Firefox
   - Safari
   - Edge

## 📦 Thêm Dependencies

Nếu cần thêm package mới:

1. Giải thích lý do trong PR
2. Chọn package phổ biến, được maintain tốt
3. Check license compatibility
4. Cập nhật package.json

```bash
# Client
cd client
npm install package-name

# Server
cd server
npm install package-name
```

## 🎨 UI/UX Guidelines

- **Màu sắc**: Giữ theme đỏ-vàng Tết
- **Animation**: Mượt mà, không quá nhiều
- **Accessibility**: Support screen readers
- **Loading states**: Hiển thị khi đang load
- **Error handling**: Thông báo lỗi rõ ràng

## 📝 Documentation

Khi thêm tính năng mới:

- Cập nhật README.md
- Thêm comments cho code phức tạp
- Viết JSDoc nếu cần
- Cập nhật SETUP.md nếu cần

## ❓ Câu Hỏi

Có thắc mắc? Hãy:

1. Check README.md và SETUP.md
2. Tìm trong Issues
3. Tạo Issue mới với label "question"

## 🎉 Cảm Ơn!

Mỗi đóng góp đều có giá trị, dù là:
- Báo lỗi
- Đề xuất tính năng
- Sửa typo
- Cải thiện docs
- Viết code

Cảm ơn bạn đã giúp dự án tốt hơn! 🧧✨

---

**Chúc Mừng Năm Mới! Happy Coding!** 🚀
