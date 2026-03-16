<template>
  <header class="header">
    <div class="container header__inner">

      <!-- 로고 -->
      <RouterLink to="/" class="header__logo">
        <span class="header__logo-icon">◈</span>
        공간 예약
      </RouterLink>

      <!-- 가운데 검색창 -->
      <div class="header__search">
        <input
          v-model="searchKeyword"
          type="text"
          placeholder="어떤 공간이 필요하세요?"
          @keyup.enter="doSearch"
        />
        <button class="header__search-btn" @click="doSearch">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
        </button>
      </div>

      <!-- 우측 액션 -->
      <div class="header__actions">
        <template v-if="isLoggedIn">
          <RouterLink to="/booking/cart" class="header__cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            <span v-if="cartCount > 0" class="header__badge">{{ cartCount }}</span>
          </RouterLink>
          <RouterLink to="/my" class="header__user-btn">
            <div class="header__avatar">{{ userName.charAt(0) }}</div>
            <span>{{ userName }}님</span>
          </RouterLink>
        </template>
        <template v-else>
          <RouterLink to="/auth/login" class="btn btn--ghost">로그인</RouterLink>
          <RouterLink to="/auth/join"  class="btn btn--primary">회원가입</RouterLink>
        </template>
      </div>

    </div>

    <!-- 하단 카테고리 네비 -->
    <div class="header__nav-bar">
      <div class="container header__nav-inner">
        <RouterLink to="/spaces"                          class="nav-item">전체</RouterLink>
        <RouterLink to="/spaces?category=스터디룸"         class="nav-item">스터디룸</RouterLink>
        <RouterLink to="/spaces?category=촬영스튜디오"     class="nav-item">촬영스튜디오</RouterLink>
        <RouterLink to="/spaces?category=연습실"           class="nav-item">연습실</RouterLink>
        <RouterLink to="/spaces?category=공유오피스"       class="nav-item">공유오피스</RouterLink>
        <RouterLink to="/spaces?category=세미나실"         class="nav-item">세미나실</RouterLink>
        <RouterLink to="/events"                          class="nav-item">이벤트</RouterLink>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'

const router        = useRouter()
const authStore     = useAuthStore()
const cartStore     = useCartStore()
const searchKeyword = ref('')

const isLoggedIn = computed(() => authStore.isLoggedIn)
const userName   = computed(() => authStore.userName)
const cartCount  = computed(() => cartStore.count)

function doSearch() {
  if (!searchKeyword.value.trim()) return
  router.push({ path: '/search', query: { keyword: searchKeyword.value } })
  searchKeyword.value = ''
}
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  background: var(--color-bg);
  box-shadow: 0 1px 0 var(--color-border);
}
.header__inner {
  display: flex;
  align-items: center;
  height: 64px;
  gap: var(--space-5);
}

/* 로고 */
.header__logo {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  flex-shrink: 0;
  white-space: nowrap;
}
.header__logo-icon { color: var(--color-accent); font-size: 20px; }

/* 검색창 */
.header__search {
  flex: 1;
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  background: var(--color-bg-subtle);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-full);
  padding: 0 var(--space-2) 0 var(--space-5);
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}
.header__search:focus-within {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(26,58,92,.08);
  background: white;
}
.header__search input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: var(--font-size-sm);
  font-family: var(--font-family);
  color: var(--color-text-primary);
  padding: var(--space-3) 0;
  outline: none;
}
.header__search input::placeholder { color: var(--color-text-disabled); }
.header__search-btn {
  width: 36px; height: 36px;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  cursor: pointer;
  transition: background var(--transition-fast);
}
.header__search-btn:hover { background: var(--color-primary-light); }

/* 우측 액션 */
.header__actions {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  flex-shrink: 0;
}
.header__cart {
  position: relative;
  width: 36px; height: 36px;
  display: flex; align-items: center; justify-content: center;
  color: var(--color-text-secondary);
  border-radius: 50%;
  transition: background var(--transition-fast);
}
.header__cart:hover { background: var(--color-bg-subtle); color: var(--color-primary); }
.header__badge {
  position: absolute;
  top: 2px; right: 2px;
  background: var(--color-accent);
  color: white;
  font-size: 9px;
  font-weight: bold;
  width: 14px; height: 14px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
}
.header__user-btn {
  display: flex; align-items: center; gap: var(--space-2);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  transition: background var(--transition-fast);
}
.header__user-btn:hover { background: var(--color-bg-subtle); }
.header__avatar {
  width: 28px; height: 28px;
  background: var(--color-primary);
  color: white;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: var(--font-size-xs);
  font-weight: bold;
}
.header__user-btn span { font-size: var(--font-size-sm); white-space: nowrap; }

.btn {
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  border: none;
  white-space: nowrap;
  cursor: pointer;
  transition: all var(--transition-fast);
}
.btn--primary { background: var(--color-primary); color: white; }
.btn--primary:hover { background: var(--color-primary-light); }
.btn--ghost { background: transparent; color: var(--color-text-secondary); }
.btn--ghost:hover { background: var(--color-bg-subtle); color: var(--color-primary); }

/* 하단 네비 바 */
.header__nav-bar {
  border-top: 1px solid var(--color-border);
}
.header__nav-inner {
  display: flex;
  height: 44px;
  overflow-x: auto;
  scrollbar-width: none;
}
.header__nav-inner::-webkit-scrollbar { display: none; }
.nav-item {
  padding: 0 var(--space-4);
  height: 44px;
  display: flex; align-items: center;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  white-space: nowrap;
  border-bottom: 2px solid transparent;
  transition: all var(--transition-fast);
}
.nav-item:hover, .nav-item.router-link-active {
  color: var(--color-primary);
  border-bottom-color: var(--color-primary);
}
</style>
