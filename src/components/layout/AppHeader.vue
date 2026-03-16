<template>
  <header class="header">
    <div class="container header__inner">

      <!-- 로고 -->
      <RouterLink to="/" class="header__logo">
        공간 예약
      </RouterLink>

      <!-- 네비게이션 -->
      <nav class="header__nav">
        <RouterLink to="/spaces">공간 찾기</RouterLink>
        <RouterLink to="/events">이벤트</RouterLink>
      </nav>

      <!-- 우측 액션 -->
      <div class="header__actions">
        <template v-if="isLoggedIn">
          <RouterLink to="/my" class="header__user">
            {{ userName }}님
          </RouterLink>
          <RouterLink to="/booking/cart" class="header__cart">
            장바구니
            <span v-if="cartCount > 0" class="header__badge">{{ cartCount }}</span>
          </RouterLink>
          <button class="header__logout" @click="handleLogout">로그아웃</button>
        </template>
        <template v-else>
          <RouterLink to="/auth/login" class="btn btn--outline">로그인</RouterLink>
          <RouterLink to="/auth/join"  class="btn btn--primary">회원가입</RouterLink>
        </template>
      </div>

    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'

const router    = useRouter()
const authStore = useAuthStore()
const cartStore = useCartStore()

const isLoggedIn = computed(() => authStore.isLoggedIn)
const userName   = computed(() => authStore.userName)
const cartCount  = computed(() => cartStore.count)

function handleLogout() {
  authStore.logout()
  router.push('/')
}
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
}
.header__inner {
  display: flex;
  align-items: center;
  height: 64px;
  gap: var(--space-8);
}
.header__logo {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  flex-shrink: 0;
}
.header__nav {
  display: flex;
  gap: var(--space-6);
  flex: 1;
}
.header__nav a {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  transition: color var(--transition-fast);
}
.header__nav a:hover,
.header__nav a.router-link-active {
  color: var(--color-primary);
}
.header__actions {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}
.header__cart {
  position: relative;
  font-size: var(--font-size-sm);
}
.header__badge {
  position: absolute;
  top: -6px; right: -8px;
  background: var(--color-accent);
  color: white;
  font-size: 10px;
  font-weight: bold;
  width: 16px; height: 16px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
}

/* 버튼 — 디자인 시안 받으면 이 부분만 교체 */
.btn {
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  transition: all var(--transition-fast);
  border: none;
}
.btn--primary {
  background: var(--color-primary);
  color: white;
}
.btn--primary:hover {
  background: var(--color-primary-light);
}
.btn--outline {
  background: transparent;
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
}
.btn--outline:hover {
  background: var(--color-primary);
  color: white;
}
</style>
