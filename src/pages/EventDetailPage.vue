<template>
  <div class="event-detail-page">
    <div class="container" v-if="event">
      <div class="event-detail">
        <img :src="event.imgUrl" :alt="event.title" class="event-detail__img" />
        <div class="event-detail__body">
          <span class="event-detail__badge">이벤트</span>
          <h1>{{ event.title }}</h1>
          <p class="event-detail__period">📅 {{ event.period }}</p>
          <div class="event-detail__content">
            <p>이벤트 내용이 여기에 표시됩니다.</p>
          </div>
          <button class="event-detail__btn" @click="router.push('/spaces')">
            참여 공간 보러가기 →
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { eventApi } from '@/api/services'

const route  = useRoute()
const router = useRouter()
const event  = ref(null)

onMounted(async () => {
  const res = await eventApi.getDetail(route.params.id)
  if (res.success) event.value = res.data
})
</script>

<style scoped>
.event-detail-page { padding: var(--space-10) 0 var(--space-20); }
.event-detail__img { width: 100%; max-height: 400px; object-fit: cover; border-radius: var(--radius-xl); margin-bottom: var(--space-8); }
.event-detail__badge { background: var(--color-accent); color: white; font-size: var(--font-size-xs); padding: 2px var(--space-3); border-radius: var(--radius-sm); }
.event-detail h1 { font-size: var(--font-size-3xl); font-weight: var(--font-weight-bold); margin: var(--space-4) 0 var(--space-3); }
.event-detail__period { color: var(--color-text-secondary); margin-bottom: var(--space-6); }
.event-detail__content { padding: var(--space-6); background: var(--color-bg-subtle); border-radius: var(--radius-lg); margin-bottom: var(--space-8); }
.event-detail__btn { padding: var(--space-4) var(--space-8); background: var(--color-primary); color: white; border: none; border-radius: var(--radius-md); font-size: var(--font-size-base); font-weight: var(--font-weight-bold); cursor: pointer; }
</style>
