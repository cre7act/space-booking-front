import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// ── 페이지 컴포넌트 (IA Depth3 기준)
const routes = [

  // ─ 공개 페이지
  {
    path: '/',
    component: () => import('@/components/layout/DefaultLayout.vue'),
    children: [
      { path: '',          name: 'Home',        component: () => import('@/pages/HomePage.vue') },
      { path: 'spaces',    name: 'SpaceList',   component: () => import('@/pages/space/SpaceListPage.vue') },
      { path: 'spaces/:id',name: 'SpaceDetail', component: () => import('@/pages/space/SpaceDetailPage.vue') },
      { path: 'search',    name: 'Search',      component: () => import('@/pages/SearchPage.vue') },
      { path: 'events',    name: 'EventList',   component: () => import('@/pages/EventListPage.vue') },
      { path: 'events/:id',name: 'EventDetail', component: () => import('@/pages/EventDetailPage.vue') },
    ]
  },

  // ─ 인증 페이지 (헤더/푸터 없음)
  {
    path: '/auth',
    component: () => import('@/components/layout/AuthLayout.vue'),
    children: [
      { path: 'login',  name: 'Login',    component: () => import('@/pages/auth/LoginPage.vue') },
      { path: 'join',   name: 'Join',     component: () => import('@/pages/auth/JoinPage.vue') },
    ]
  },

  // ─ 로그인 필요 페이지
  {
    path: '/my',
    component: () => import('@/components/layout/DefaultLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '',           name: 'MyPage',        component: () => import('@/pages/mypage/MyPage.vue') },
      { path: 'bookings',   name: 'BookingList',   component: () => import('@/pages/mypage/BookingListPage.vue') },
      { path: 'bookings/:id',name:'BookingDetail', component: () => import('@/pages/mypage/BookingDetailPage.vue') },
      { path: 'payments',   name: 'PaymentList',   component: () => import('@/pages/mypage/PaymentListPage.vue') },
      { path: 'payments/:id',name:'PaymentDetail', component: () => import('@/pages/mypage/PaymentDetailPage.vue') },
      { path: 'wishlist',   name: 'Wishlist',      component: () => import('@/pages/mypage/WishlistPage.vue') },
      { path: 'reviews',    name: 'ReviewList',    component: () => import('@/pages/mypage/ReviewListPage.vue') },
      { path: 'profile',    name: 'Profile',       component: () => import('@/pages/mypage/ProfilePage.vue') },
    ]
  },

  // ─ 예약/결제 플로우
  {
    path: '/booking',
    component: () => import('@/components/layout/DefaultLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: 'cart',      name: 'Cart',      component: () => import('@/pages/booking/CartPage.vue') },
      { path: 'checkout',  name: 'Checkout',  component: () => import('@/pages/booking/CheckoutPage.vue') },
      { path: 'complete',  name: 'Complete',  component: () => import('@/pages/booking/CompletePage.vue') },
    ]
  },

  // ─ 404
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/pages/NotFoundPage.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 })
})

// ── 라우터 가드: 인증 필요 페이지 접근 시 로그인 페이지로
router.beforeEach((to) => {
  if (to.meta.requiresAuth) {
    const authStore = useAuthStore()
    if (!authStore.isLoggedIn) {
      return { name: 'Login', query: { redirect: to.fullPath } }
    }
  }
})

export default router
