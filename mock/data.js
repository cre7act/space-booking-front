// ── Mock 데이터 (백엔드 연결 전 화면 확인용)
// 백엔드 연결 시 이 파일 전체 삭제

export const mockBanners = [
  {
    bannerIndex: "1",
    title: "원하는 공간을 자유롭게",
    subTitle: "스터디룸·촬영스튜디오·연습실·공유오피스 간편 예약",
    imgUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
  },
  {
    bannerIndex: "2",
    title: "신규 오픈 공간 특가",
    subTitle: "이번 주 오픈한 프리미엄 스튜디오 20% 할인",
    imgUrl: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80",
  },
]

export const mockSpaces = [
  {
    spaceIndex: "1",
    title: "강남 프리미엄 스터디룸 A",
    category: "스터디룸",
    region: "서울 강남구",
    thumbUrl: "https://images.unsplash.com/photo-1497366754035-f200968a7eda?w=600&q=80",
    minPrice: 15000,
    rating: "4.8",
    reviewCount: 124,
    wishYN: "N",
  },
  {
    spaceIndex: "2",
    title: "홍대 감성 촬영 스튜디오",
    category: "촬영스튜디오",
    region: "서울 마포구",
    thumbUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80",
    minPrice: 30000,
    rating: "4.9",
    reviewCount: 89,
    wishYN: "Y",
  },
  {
    spaceIndex: "3",
    title: "신촌 밴드 합주 연습실",
    category: "연습실",
    region: "서울 서대문구",
    thumbUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&q=80",
    minPrice: 20000,
    rating: "4.6",
    reviewCount: 56,
    wishYN: "N",
  },
  {
    spaceIndex: "4",
    title: "역삼 공유오피스 미팅룸",
    category: "공유오피스",
    region: "서울 강남구",
    thumbUrl: "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=600&q=80",
    minPrice: 25000,
    rating: "4.7",
    reviewCount: 203,
    wishYN: "N",
  },
  {
    spaceIndex: "5",
    title: "성수 인더스트리얼 스튜디오",
    category: "촬영스튜디오",
    region: "서울 성동구",
    thumbUrl: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&q=80",
    minPrice: 40000,
    rating: "5.0",
    reviewCount: 37,
    wishYN: "N",
  },
  {
    spaceIndex: "6",
    title: "건대 소규모 세미나실",
    category: "세미나실",
    region: "서울 광진구",
    thumbUrl: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=600&q=80",
    minPrice: 18000,
    rating: "4.5",
    reviewCount: 91,
    wishYN: "N",
  },
]

export const mockEvents = [
  {
    eventIndex: "1",
    title: "신규 가입 첫 예약 30% 할인",
    period: "2024.01.01 ~ 2024.03.31",
    imgUrl: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80",
  },
  {
    eventIndex: "2",
    title: "주말 스터디룸 2시간+1시간 무료",
    period: "2024.02.01 ~ 2024.02.29",
    imgUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80",
  },
  {
    eventIndex: "3",
    title: "촬영 스튜디오 평일 특가",
    period: "2024.01.15 ~ 2024.02.15",
    imgUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&q=80",
  },
]

export const mockSpaceDetail = {
  space: {
    spaceIndex: "1",
    title: "강남 프리미엄 스터디룸 A",
    category: "스터디룸",
    region: "서울 강남구 테헤란로 123",
    description: "조용하고 쾌적한 환경에서 집중력 있는 스터디를 즐겨보세요. 최대 6인까지 이용 가능하며 화이트보드, 프로젝터, 고속 Wi-Fi가 제공됩니다.",
    capacity: 6,
    minPrice: 15000,
    rating: "4.8",
    reviewCount: 124,
    thumbUrl: "https://images.unsplash.com/photo-1497366754035-f200968a7eda?w=800&q=80",
  },
  photos: [
    { imgUrl: "https://images.unsplash.com/photo-1497366754035-f200968a7eda?w=800&q=80" },
    { imgUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80" },
    { imgUrl: "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=800&q=80" },
  ],
  amenities: [
    { name: "고속 Wi-Fi" }, { name: "화이트보드" }, { name: "프로젝터" },
    { name: "냉난방" },     { name: "개인 사물함" }, { name: "주차 가능" },
  ],
  feeOptions: [
    { feeOptionIndex: "1", name: "기본 (1시간)", price: 15000 },
    { feeOptionIndex: "2", name: "반일 (4시간)", price: 50000 },
    { feeOptionIndex: "3", name: "종일 (8시간)", price: 90000 },
  ],
  reviews: [
    { memberName: "김**", rating: 5, content: "정말 깔끔하고 조용해요. 다음에도 이용할 예정입니다.", regDate: "2024.01.15" },
    { memberName: "이**", rating: 5, content: "위치도 좋고 시설이 깔끔해서 만족스러웠어요.", regDate: "2024.01.10" },
    { memberName: "박**", rating: 4, content: "전반적으로 좋았는데 주차 공간이 조금 부족했어요.", regDate: "2024.01.05" },
  ],
}

export const mockBookings = [
  {
    rezIndex: "1",
    spaceTitle: "강남 프리미엄 스터디룸 A",
    thumbUrl: "https://images.unsplash.com/photo-1497366754035-f200968a7eda?w=200&q=80",
    bookingDate: "2024.01.20",
    startTime: "14:00",
    endTime: "17:00",
    totalPrice: 45000,
    status: "이용완료",
    statusCode: "done",
  },
  {
    rezIndex: "2",
    spaceTitle: "홍대 감성 촬영 스튜디오",
    thumbUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=200&q=80",
    bookingDate: "2024.02.05",
    startTime: "10:00",
    endTime: "14:00",
    totalPrice: 120000,
    status: "예약확정",
    statusCode: "confirmed",
  },
]

export const mockPayments = [
  {
    payIndex: "1",
    spaceTitle: "강남 프리미엄 스터디룸 A",
    payDate: "2024.01.18",
    totalPrice: 45000,
    payMethod: "신용카드",
    status: "결제완료",
  },
  {
    payIndex: "2",
    spaceTitle: "홍대 감성 촬영 스튜디오",
    payDate: "2024.02.01",
    totalPrice: 120000,
    payMethod: "카카오페이",
    status: "결제완료",
  },
]

export const mockUser = {
  memberIndex: "1",
  id: "demo@space.com",
  name: "홍길동",
  agreeYN: "Y",
}
