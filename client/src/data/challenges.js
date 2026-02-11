// Nhóm đối tượng - Năm Bính Ngọ 2026 (Con Ngựa)
export const TARGET_GROUPS = [
  { id: 'nam', name: 'Nam', emoji: '👨', color: 'from-blue-400 to-cyan-500' },
  { id: 'nu', name: 'Nữ', emoji: '👩', color: 'from-pink-500 to-rose-500' },
]

// Challenges theo nhóm - có thể bổ sung qua Admin
export const challengesByGroup = {
  nam: [
    { id: 'n1', emoji: '🤪', text: 'Quay video làm 5 biểu cảm khuôn mặt khó đỡ nhất', difficulty: 'easy' },
    { id: 'n2', emoji: '🕺', text: 'Nhảy 1 điệu nhảy Tết siêu lầy và quay lại', difficulty: 'easy' },
    { id: 'n3', emoji: '🎭', text: 'Diễn lại cảnh phim hài Tết yêu thích', difficulty: 'medium' },
    { id: 'n4', emoji: '🎤', text: 'Hát karaoke bài Tết với giọng điệu hài hước', difficulty: 'easy' },
    { id: 'n5', emoji: '🤹', text: 'Làm 1 trò ảo thuật (dù thất bại cũng được)', difficulty: 'medium' },
    { id: 'n6', emoji: '📸', text: 'Chụp 10 bức ảnh tạo dáng "bá đạo" với đồ trang trí Tết', difficulty: 'easy' },
    { id: 'n7', emoji: '🎬', text: 'Làm video prank vô hại cho người thân', difficulty: 'medium' },
    { id: 'n8', emoji: '🏃', text: 'Cosplay thành con ngựa và chạy quanh nhà 3 vòng', difficulty: 'hard' },
    { id: 'n9', emoji: '🎯', text: 'Thử ăn 5 loại bánh Tết trong 2 phút', difficulty: 'medium' },
    { id: 'n10', emoji: '😂', text: 'Kể 5 câu chuyện cười về Tết cho cả nhà', difficulty: 'easy' },
    { id: 'n11', emoji: '🎨', text: 'Vẽ chân dung gia đình bằng tay trái (hoặc tay phải nếu thuận tay trái)', difficulty: 'medium' },
    { id: 'n12', emoji: '🎪', text: 'Làm màn biểu diễn xiếc đơn giản (tung hứng, giữ thăng bằng...)', difficulty: 'hard' },
  ],
  nu: [
    { id: 'nu1', emoji: '💃', text: 'Nhảy 1 điệu nhảy trending với trang phục Tết', difficulty: 'easy' },
    { id: 'nu2', emoji: '🎭', text: 'Diễn lại scene drama Tết của mẹ/bà', difficulty: 'easy' },
    { id: 'nu3', emoji: '🎤', text: 'Hát 1 bài hát với giọng ca hài hước nhất', difficulty: 'easy' },
    { id: 'nu4', emoji: '📸', text: 'Chụp bộ ảnh "sống ảo thảm họa" với đồ Tết', difficulty: 'easy' },
    { id: 'nu5', emoji: '🤪', text: 'Làm video những tình huống "dở khóc dở cười" ngày Tết', difficulty: 'medium' },
    { id: 'nu6', emoji: '👗', text: 'Thử 5 bộ trang phục khác nhau và làm video runway show', difficulty: 'medium' },
    { id: 'nu7', emoji: '🍰', text: 'Thử làm bánh/món ăn theo hướng dẫn online (fail cũng được)', difficulty: 'medium' },
    { id: 'nu8', emoji: '💄', text: 'Trang điểm theo phong cách "độc lạ" và chụp ảnh', difficulty: 'medium' },
    { id: 'nu9', emoji: '🎬', text: 'Quay video "1 ngày làm YouTuber" về Tết', difficulty: 'hard' },
    { id: 'nu10', emoji: '🎨', text: 'Vẽ tranh bằng... chân và ghi lại quá trình', difficulty: 'hard' },
    { id: 'nu11', emoji: '🎪', text: 'Làm video challenge ăn cay/chua/đắng/ngọt', difficulty: 'medium' },
    { id: 'nu12', emoji: '😹', text: 'Bắt chúước giọng nói của 5 người trong gia đình', difficulty: 'easy' },
  ],
}

// Legacy - flatten cho tương thích
export const challengeTemplates = Object.entries(challengesByGroup).flatMap(([group, challenges]) =>
  challenges.map(c => ({ ...c, targetGroup: group }))
)

export const getChallengesByGroup = (group) => challengesByGroup[group] || []
