// Nhóm đối tượng - Năm Bính Ngọ 2026 (Con Ngựa)
export const TARGET_GROUPS = [
  { id: 'nam', name: 'Nam', emoji: '👨', color: 'from-blue-400 to-cyan-500' },
  { id: 'nu', name: 'Nữ', emoji: '👩', color: 'from-pink-500 to-rose-500' },
]

// Challenges theo nhóm - có thể bổ sung qua Admin
export const challengesByGroup = {
  nam: [
    { id: 'n1', emoji: '🏃', text: 'Chạy bộ 5km', difficulty: 'medium' },
    { id: 'n2', emoji: '💪', text: 'Tập 100 cái squat', difficulty: 'medium' },
    { id: 'n3', emoji: '📸', text: 'Chụp ảnh với 5 người chúc Tết', difficulty: 'easy' },
    { id: 'n4', emoji: '🍜', text: 'Nấu 1 món ăn Tết và chụp ảnh', difficulty: 'medium' },
    { id: 'n5', emoji: '📞', text: 'Gọi điện cho 3 người thân chúc Tết', difficulty: 'easy' },
    { id: 'n6', emoji: '🎬', text: 'Làm video TikTok/Reels về Tết', difficulty: 'medium' },
    { id: 'n7', emoji: '🌏', text: 'Làm video chúc Tết bằng 3 thứ tiếng', difficulty: 'hard' },
    { id: 'n8', emoji: '🎨', text: 'Vẽ tranh con ngựa hoặc chủ đề Tết', difficulty: 'easy' },
    { id: 'n9', emoji: '🎁', text: 'Tặng quà cho ông bà và chụp ảnh', difficulty: 'easy' },
  ],
  nu: [
    { id: 'nu1', emoji: '🍜', text: 'Nấu 3 món ăn Tết truyền thống', difficulty: 'medium' },
    { id: 'nu2', emoji: '🎨', text: 'Vẽ tranh hoặc trang trí nhà cửa Tết', difficulty: 'medium' },
    { id: 'nu3', emoji: '💝', text: 'Làm 1 việc tốt và ghi lại bằng ảnh/video', difficulty: 'easy' },
    { id: 'nu4', emoji: '✂️', text: 'Làm đồ handmade trang trí Tết', difficulty: 'medium' },
    { id: 'nu5', emoji: '📸', text: 'Chụp ảnh với 5 người chúc Tết', difficulty: 'easy' },
    { id: 'nu6', emoji: '🧹', text: 'Dọn dẹp nhà cửa và chụp ảnh trước/sau', difficulty: 'medium' },
    { id: 'nu7', emoji: '📖', text: 'Học và giải thích ý nghĩa 3 phong tục Tết', difficulty: 'medium' },
    { id: 'nu8', emoji: '🎤', text: 'Hát 1 bài hát về Tết và quay lại', difficulty: 'easy' },
    { id: 'nu9', emoji: '🎁', text: 'Tổ chức quây quần gia đình và chụp ảnh', difficulty: 'easy' },
  ],
}

// Legacy - flatten cho tương thích
export const challengeTemplates = Object.entries(challengesByGroup).flatMap(([group, challenges]) =>
  challenges.map(c => ({ ...c, targetGroup: group }))
)

export const getChallengesByGroup = (group) => challengesByGroup[group] || []
