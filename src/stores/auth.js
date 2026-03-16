import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authApi } from '@/api/services'

export const useAuthStore = defineStore('auth', () => {

  // ── state
  const user         = ref(JSON.parse(localStorage.getItem('user') || 'null'))
  const accessToken  = ref(localStorage.getItem('accessToken')  || null)
  const refreshToken = ref(localStorage.getItem('refreshToken') || null)

  // ── getters
  const isLoggedIn = computed(() => !!accessToken.value && !!user.value)
  const userName   = computed(() => user.value?.name || '')
  const memberId   = computed(() => user.value?.memberIndex || '')

  // ── actions

  async function login(id, password) {
    const res = await authApi.login(id, password)

    if (!res.success) throw new Error(res.message)

    // 토큰 + 유저 정보 저장
    accessToken.value  = res.data.accessToken
    refreshToken.value = res.data.refreshToken
    user.value         = res.data.user

    localStorage.setItem('accessToken',  res.data.accessToken)
    localStorage.setItem('refreshToken', res.data.refreshToken)
    localStorage.setItem('user',         JSON.stringify(res.data.user))

    return res.data.user
  }

  function logout() {
    accessToken.value  = null
    refreshToken.value = null
    user.value         = null

    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
  }

  return { user, accessToken, isLoggedIn, userName, memberId, login, logout }
})
