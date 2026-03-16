<template>
  <div class="event-list-page">
    <div class="container">
      <div class="page-header">
        <h1>이벤트</h1>
        <p>다양한 혜택과 프로모션을 확인하세요</p>
      </div>
      <div v-if="loading" class="event-grid">
        <div v-for="n in 6" :key="n" class="skeleton skeleton--event" />
      </div>
      <div v-else class="event-grid">
        <div v-for="e in events" :key="e.eventIndex"
          class="event-card" @click="router.push(`/events/${e.eventIndex}`)">
          <div class="event-card__thumb">
            <img :src="e.imgUrl" :alt="e.title" />
          </div>
          <div class="event-card__info">
            <span class="event-card__badge">이벤트</span>
            <h3>{{ e.title }}</h3>
            <p>📅 {{ e.period }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { eventApi } from '@/api/services'

const router  = useRouter()
const events  = ref([])
const loading = ref(true)

onMounted(async () => {
  const res = await eventApi.getList()
  if (res.success) events.value = res.data.events
  loading.value = false
})
</script>

<style scoped>
.event-list-page { padding: var(--space-10) 0 var(--space-20); }
.page-header { margin-bottom: var(--space-8); }
.page-header h1 { font-size: var(--font-size-3xl); font-weight: var(--font-weight-bold); margin: 0 0 var(--space-2); }
.page-header p  { color: var(--color-text-secondary); margin: 0; }
.event-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: var(--space-6); }
.event-card { border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-md); cursor: pointer; transition: transform var(--transition-base); }
.event-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }
.event-card__thumb img { width: 100%; height: 200px; object-fit: cover; }
.event-card__info { padding: var(--space-5); }
.event-card__badge { background: var(--color-accent); color: white; font-size: var(--font-size-xs); padding: 2px var(--space-2); border-radius: var(--radius-sm); }
.event-card__info h3 { margin: var(--space-2) 0 var(--space-2); font-size: var(--font-size-lg); }
.event-card__info p  { margin: 0; font-size: var(--font-size-sm); color: var(--color-text-secondary); }
.skeleton { background: linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; border-radius: var(--radius-lg); }
.skeleton--event { height: 280px; }
@keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
</style>
