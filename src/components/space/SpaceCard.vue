<template>
  <div class="space-card" @click="$emit('click')">

    <!-- 썸네일 -->
    <div class="space-card__thumb">
      <img
        :src="space.thumbUrl || '/img/placeholder.jpg'"
        :alt="space.title"
        loading="lazy"
      />
      <!-- 위시리스트 버튼 -->
      <button
        class="space-card__wish"
        :class="{ 'is-active': isWished }"
        @click.stop="toggleWish"
      >
        ♥
      </button>
      <!-- 카테고리 태그 -->
      <span v-if="space.category" class="space-card__tag">{{ space.category }}</span>
    </div>

    <!-- 정보 -->
    <div class="space-card__info">
      <p class="space-card__location">📍 {{ space.region }}</p>
      <h3 class="space-card__title">{{ space.title }}</h3>
      <div class="space-card__meta">
        <span class="space-card__rating">⭐ {{ space.rating || '0.0' }}</span>
        <span class="space-card__review">({{ space.reviewCount || 0 }})</span>
      </div>
      <div class="space-card__price">
        <strong>{{ formatPrice(space.minPrice) }}</strong>
        <span>원~/시간</span>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { wishlistApi } from '@/api/services'

const props = defineProps({
  space: { type: Object, required: true }
})
defineEmits(['click'])

const authStore = useAuthStore()
const isWished  = ref(props.space.wishYN === 'Y')

async function toggleWish() {
  if (!authStore.isLoggedIn) {
    // 로그인 필요 알림 (추후 모달로 교체)
    alert('로그인이 필요합니다.')
    return
  }
  const kind = isWished.value ? 'del' : 'add'
  await wishlistApi.toggle({ spaceIndex: props.space.spaceIndex, kind })
  isWished.value = !isWished.value
}

function formatPrice(price) {
  if (!price) return '0'
  return Number(price).toLocaleString('ko-KR')
}
</script>

<style scoped>
.space-card {
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--color-bg);
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: all var(--transition-base);
}
.space-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.space-card__thumb {
  position: relative;
  aspect-ratio: 4/3;
  overflow: hidden;
}
.space-card__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}
.space-card:hover .space-card__thumb img {
  transform: scale(1.05);
}

.space-card__wish {
  position: absolute;
  top: var(--space-3);
  right: var(--space-3);
  background: rgba(255,255,255,.85);
  border: none;
  border-radius: 50%;
  width: 32px; height: 32px;
  font-size: 14px;
  color: var(--color-text-disabled);
  transition: all var(--transition-fast);
}
.space-card__wish.is-active { color: #e05c5c; }

.space-card__tag {
  position: absolute;
  bottom: var(--space-3);
  left: var(--space-3);
  background: var(--color-primary);
  color: white;
  font-size: var(--font-size-xs);
  padding: 2px var(--space-2);
  border-radius: var(--radius-sm);
}

.space-card__info { padding: var(--space-4); }
.space-card__location {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  margin: 0 0 var(--space-1);
}
.space-card__title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  margin: 0 0 var(--space-2);
  line-height: var(--line-height-tight);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.space-card__meta {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  margin-bottom: var(--space-2);
}
.space-card__rating { font-size: var(--font-size-sm); font-weight: var(--font-weight-medium); }
.space-card__review { font-size: var(--font-size-xs); color: var(--color-text-secondary); }
.space-card__price strong { font-size: var(--font-size-lg); color: var(--color-primary); }
.space-card__price span   { font-size: var(--font-size-xs); color: var(--color-text-secondary); margin-left: 2px; }
</style>
