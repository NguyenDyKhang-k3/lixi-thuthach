#!/usr/bin/env node
/**
 * Script kiểm tra happy path - chạy trước khi deploy
 * Cách chạy: node scripts/test-happy-path.js
 */

const fs = require('fs')
const path = require('path')

let passed = 0
let failed = 0

function ok(msg) {
  console.log('  ✅', msg)
  passed++
}

function fail(msg) {
  console.log('  ❌', msg)
  failed++
}

console.log('\n🧪 Kiểm tra happy path - Lì Xì Thử Thách\n')

// 1. Kiểm tra file cấu trúc
const requiredFiles = [
  'client/index.html',
  'client/src/main.jsx',
  'client/src/App.jsx',
  'client/src/pages/Home.jsx',
  'client/src/pages/CreateLixi.jsx',
  'client/src/pages/Admin.jsx',
  'client/src/api/lixiApi.js',
  'client/vercel.json',
  'server/server.js',
]
console.log('1. Kiểm tra cấu trúc file...')
const rootDir = path.resolve(__dirname, '..')
requiredFiles.forEach(file => {
  const fullPath = path.join(rootDir, file)
  if (fs.existsSync(fullPath)) ok(file)
  else fail(`Thiếu: ${file}`)
})

// 2. Kiểm tra challenges data
console.log('\n2. Kiểm tra dữ liệu thử thách...')
try {
  const challengesPath = path.join(__dirname, '../client/src/data/challenges.js')
  const content = fs.readFileSync(challengesPath, 'utf8')
  if (content.includes('tre_em') && content.includes('nam') && content.includes('nu') && content.includes('nguoi_lon')) {
    ok('Có 4 nhóm: tre_em, nam, nu, nguoi_lon')
  } else fail('Thiếu nhóm đối tượng')
  if (content.includes('challengesByGroup')) ok('Có challengesByGroup')
  if (content.includes('TARGET_GROUPS')) ok('Có TARGET_GROUPS')
} catch (e) {
  fail('Không đọc được challenges.js: ' + e.message)
}

// 3. Kiểm tra vercel.json rewrite
console.log('\n3. Kiểm tra Vercel routing...')
try {
  const vercelPath = path.join(__dirname, '../client/vercel.json')
  const vercel = JSON.parse(fs.readFileSync(vercelPath, 'utf8'))
  if (vercel.rewrites && vercel.rewrites.some(r => r.destination === '/index.html')) {
    ok('SPA rewrite đến index.html')
  } else fail('Thiếu rewrite cho SPA')
} catch (e) {
  fail('vercel.json lỗi: ' + e.message)
}

// 4. Kiểm tra server API
console.log('\n4. Kiểm tra Server API...')
try {
  const serverPath = path.join(__dirname, '../server/server.js')
  const serverContent = fs.readFileSync(serverPath, 'utf8')
  if (serverContent.includes('/api/health')) ok('Có endpoint /api/health')
  if (serverContent.includes('/api/lixi/create')) ok('Có endpoint /api/lixi/create')
  if (serverContent.includes('ADMIN_PASSWORD')) ok('Có bảo vệ admin')
} catch (e) {
  fail('Không đọc được server: ' + e.message)
}

// Kết quả
console.log('\n' + '─'.repeat(40))
console.log(`Kết quả: ${passed} passed, ${failed} failed`)
if (failed > 0) {
  console.log('\n⚠️ Có lỗi - kiểm tra lại trước khi deploy')
  process.exit(1)
}
console.log('\n✨ Tất cả kiểm tra đều pass!\n')
process.exit(0)
