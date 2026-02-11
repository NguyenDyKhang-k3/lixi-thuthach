// Danh sách các thử thách mẫu
export const challengeTemplates = [
  {
    id: 1,
    category: 'social',
    emoji: '📸',
    text: 'Chụp ảnh với 5 người chúc "Chúc mừng năm mới"',
    difficulty: 'easy',
    estimatedTime: '30 phút',
  },
  {
    id: 2,
    category: 'kindness',
    emoji: '💝',
    text: 'Làm 1 việc tốt và ghi lại bằng ảnh/video',
    difficulty: 'easy',
    estimatedTime: '1 giờ',
  },
  {
    id: 3,
    category: 'cooking',
    emoji: '🍜',
    text: 'Nấu 1 món ăn Tết và chụp ảnh',
    difficulty: 'medium',
    estimatedTime: '2 giờ',
  },
  {
    id: 4,
    category: 'culture',
    emoji: '📖',
    text: 'Học thuộc 1 bài thơ về Tết và đọc',
    difficulty: 'medium',
    estimatedTime: '1 giờ',
  },
  {
    id: 5,
    category: 'creative',
    emoji: '🎬',
    text: 'Làm video TikTok/Reels về Tết',
    difficulty: 'medium',
    estimatedTime: '1 giờ',
  },
  {
    id: 6,
    category: 'creative',
    emoji: '🎨',
    text: 'Vẽ tranh chủ đề Tết',
    difficulty: 'medium',
    estimatedTime: '2 giờ',
  },
  {
    id: 7,
    category: 'fitness',
    emoji: '🏃',
    text: 'Chạy bộ 5km',
    difficulty: 'hard',
    estimatedTime: '45 phút',
  },
  {
    id: 8,
    category: 'social',
    emoji: '📞',
    text: 'Gọi điện cho 3 người thân chúc Tết',
    difficulty: 'easy',
    estimatedTime: '30 phút',
  },
  {
    id: 9,
    category: 'home',
    emoji: '🧹',
    text: 'Dọn dẹp nhà cửa và chụp ảnh trước/sau',
    difficulty: 'medium',
    estimatedTime: '2 giờ',
  },
  {
    id: 10,
    category: 'language',
    emoji: '🌏',
    text: 'Làm video chúc Tết bằng 3 thứ tiếng',
    difficulty: 'hard',
    estimatedTime: '1 giờ',
  },
  {
    id: 11,
    category: 'fitness',
    emoji: '💪',
    text: 'Tập 100 cái squat',
    difficulty: 'medium',
    estimatedTime: '20 phút',
  },
  {
    id: 12,
    category: 'creative',
    emoji: '✂️',
    text: 'Gấp origami hoặc làm đồ handmade về Tết',
    difficulty: 'medium',
    estimatedTime: '1 giờ',
  },
  {
    id: 13,
    category: 'social',
    emoji: '🎤',
    text: 'Hát 1 bài hát về Tết và quay lại',
    difficulty: 'easy',
    estimatedTime: '15 phút',
  },
  {
    id: 14,
    category: 'kindness',
    emoji: '🎁',
    text: 'Tặng quà cho 1 người lạ và ghi lại',
    difficulty: 'medium',
    estimatedTime: '1 giờ',
  },
  {
    id: 15,
    category: 'culture',
    emoji: '🧧',
    text: 'Học và giải thích ý nghĩa 3 phong tục Tết',
    difficulty: 'medium',
    estimatedTime: '1 giờ',
  },
]

// Lọc challenges theo category
export const getChallengesByCategory = (category) => {
  return challengeTemplates.filter(c => c.category === category)
}

// Lọc challenges theo độ khó
export const getChallengesByDifficulty = (difficulty) => {
  return challengeTemplates.filter(c => c.difficulty === difficulty)
}

// Random challenge
export const getRandomChallenge = () => {
  return challengeTemplates[Math.floor(Math.random() * challengeTemplates.length)]
}

// Categories
export const categories = [
  { id: 'social', name: 'Xã Hội', emoji: '👥' },
  { id: 'kindness', name: 'Từ Thiện', emoji: '💝' },
  { id: 'cooking', name: 'Nấu Ăn', emoji: '🍳' },
  { id: 'culture', name: 'Văn Hóa', emoji: '🏮' },
  { id: 'creative', name: 'Sáng Tạo', emoji: '🎨' },
  { id: 'fitness', name: 'Thể Thao', emoji: '💪' },
  { id: 'language', name: 'Ngôn Ngữ', emoji: '🌏' },
  { id: 'home', name: 'Nhà Cửa', emoji: '🏠' },
]

// Difficulties
export const difficulties = [
  { id: 'easy', name: 'Dễ', color: 'green' },
  { id: 'medium', name: 'Trung Bình', color: 'yellow' },
  { id: 'hard', name: 'Khó', color: 'red' },
]
