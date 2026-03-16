// Mock 모드 ON — 백엔드 연결 시 이 파일을 services.js로 교체
import {
  mockBanners, mockSpaces, mockEvents,
  mockSpaceDetail, mockBookings, mockPayments, mockUser
} from '@/mock/data'

const delay = (ms = 300) => new Promise(r => setTimeout(r, ms))

const ok  = (data)    => ({ success: true,  data })
const fail = (msg)    => ({ success: false, message: msg })

// ── 인증
export const authApi = {
  login: async (id, password) => {
    await delay()
    // demo@space.com / 1234 로 로그인 가능
    if (id === 'demo@space.com' && password === '1234') {
      return ok({
        accessToken:  'mock-access-token',
        refreshToken: 'mock-refresh-token',
        user: mockUser,
      })
    }
    throw new Error('아이디 또는 비밀번호가 올바르지 않습니다.')
  },
  logout: async () => { await delay(100); return ok('로그아웃') },
  me:     async () => { await delay(100); return ok(mockUser) },
}

// ── 홈
export const homeApi = {
  getHome: async () => {
    await delay()
    return ok({ banners: mockBanners, spaces: mockSpaces.slice(0,4), events: mockEvents })
  },
}

// ── 공간
export const spaceApi = {
  getList: async (params = {}) => {
    await delay()
    let list = [...mockSpaces]
    if (params.category) list = list.filter(s => s.category === params.category)
    if (params.keyword)  list = list.filter(s => s.title.includes(params.keyword))
    return ok({ spaceList: list, spaceCount: list.length })
  },
  getDetail: async (spaceIndex) => {
    await delay()
    return ok(mockSpaceDetail)
  },
  search: async (params = {}) => {
    await delay()
    const keyword = params.keyword || ''
    const list = mockSpaces.filter(s =>
      s.title.includes(keyword) || s.region.includes(keyword) || s.category.includes(keyword)
    )
    return ok({ spaces: list, total: list.length })
  },
  getAvailability: async () => {
    await delay()
    const slots = ['09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00']
    return ok({ slots: slots.map(t => ({ time: t, available: Math.random() > 0.3 })) })
  },
  getReviews: async () => {
    await delay()
    return ok({ reviews: mockSpaceDetail.reviews, reviewCount: mockSpaceDetail.reviews.length })
  },
  getFees: async () => {
    await delay()
    return ok({ feeOptions: mockSpaceDetail.feeOptions })
  },
}

// ── 장바구니
export const cartApi = {
  get:   async () => { await delay(); return ok({ cartItems: [], cartCount: 0 }) },
  add:   async () => { await delay(); return ok({ code: 1 }) },
  clear: async () => { await delay(); return ok({ code: 1 }) },
}

// ── 예약
export const bookingApi = {
  create:    async () => { await delay(); return ok({ code: 1, rezIndex: '99' }) },
  getList:   async () => { await delay(); return ok({ bookingList: mockBookings, bookingCount: mockBookings.length }) },
  getDetail: async (rezIndex) => {
    await delay()
    return ok(mockBookings.find(b => b.rezIndex === rezIndex) || mockBookings[0])
  },
}

// ── 결제
export const paymentApi = {
  getList:   async () => { await delay(); return ok({ paymentList: mockPayments }) },
  getDetail: async () => { await delay(); return ok(mockPayments[0]) },
  cancel:    async () => { await delay(); return ok({ code: 1 }) },
}

// ── 위시리스트
export const wishlistApi = {
  getList: async () => {
    await delay()
    return ok({ wishlist: mockSpaces.filter(s => s.wishYN === 'Y'), wishlistCount: 1 })
  },
  toggle: async () => { await delay(); return ok({ code: 1 }) },
}

// ── 리뷰
export const reviewApi = {
  write: async () => { await delay(); return ok({ code: 1 }) },
}

// ── 이벤트
export const eventApi = {
  getList:   async () => { await delay(); return ok({ events: mockEvents, eventCount: mockEvents.length }) },
  getDetail: async (id) => {
    await delay()
    return ok(mockEvents.find(e => e.eventIndex === id) || mockEvents[0])
  },
}

// ── 파일
export const fileApi = {
  uploadPhoto: async () => { await delay(); return ok({ fileUrl: 'mock/photo.webp', fileOrg: 'photo.jpg' }) },
  uploadFile:  async () => { await delay(); return ok({ fileUrl: 'mock/file.pdf',  fileOrg: 'file.pdf' }) },
}
