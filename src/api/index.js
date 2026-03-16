import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'

// axios 인스턴스 생성
const api = axios.create({
  baseURL: '/api',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' }
})

// ── 요청 인터셉터: 모든 요청에 JWT 자동 첨부
api.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// ── 응답 인터셉터: 401 시 토큰 갱신 후 재시도
api.interceptors.response.use(
  response => response.data,  // { success, data, message } 바로 반환

  async error => {
    const original = error.config

    // 401 + 재시도 아직 안 한 경우
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true

      try {
        const refreshToken = localStorage.getItem('refreshToken')
        const res = await axios.post('/api/auth/refresh', { refreshToken })

        const newToken = res.data.data.accessToken
        localStorage.setItem('accessToken', newToken)
        original.headers.Authorization = `Bearer ${newToken}`

        return api(original)  // 원래 요청 재시도

      } catch {
        // 갱신 실패 → 로그아웃
        const authStore = useAuthStore()
        authStore.logout()
        router.push('/login')
      }
    }

    return Promise.reject(error)
  }
)

export default api
