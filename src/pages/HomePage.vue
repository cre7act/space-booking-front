<template>
  <div class="home">

    <!-- 배너 -->
    <section class="home__banner">
      <div class="container">
        <div v-if="loading" class="skeleton skeleton--banner" />
        <div v-else class="banner-list">
          <div
            v-for="banner in homeData.banners"
            :key="banner.bannerIndex"
            class="banner-item"
            :style="{ backgroundImage: `url(${banner.imgUrl})` }"
          >
            <div class="banner-item__text">
              <h2>{{ banner.title }}</h2>
              <p>{{ banner.subTitle }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 추천 공간 -->
    <section class="home__section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">추천 공간</h2>
          <RouterLink to="/spaces" class="section-more">전체보기 →</RouterLink>
        </div>
        <div v-if="loading" class="space-grid">
          <div v-for="n in 4" :key="n" class="skeleton skeleton--card" />
        </div>
        <div v-else class="space-grid">
          <SpaceCard
            v-for="space in homeData.spaces"
            :key="space.spaceIndex"
            :space="space"
            @click="goToDetail(space.spaceIndex)"
          />
        </div>
      </div>
    </section>

    <!-- 이벤트 -->
    <section class="home__section home__section--gray">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">이벤트</h2>
          <RouterLink to="/events" class="section-more">전체보기 →</RouterLink>
        </div>
        <div class="event-list">
          <div
            v-for="event in homeData.events"
            :key="event.eventIndex"
            class="event-item"
            @click="router.push(`/events/${event.eventIndex}`)"
          >
            <img :src="event.imgUrl" :alt="event.title" />
            <div class="event-item__info">
              <span class="event-item__label">이벤트</span>
              <h3>{{ event.title }}</h3>
              <p>{{ event.period }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { homeApi } from '@/api/services'
import SpaceCard from '@/components/space/SpaceCard.vue'

const router   = useRouter()
const loading  = ref(true)
const homeData = ref({ banners: [], spaces: [], events: [] })

onMounted(async () => {
  try {
    const res = await homeApi.getHome()
    if (res.success) homeData.value = res.data
  } finally {
    loading.value = false
  }
})

function goToDetail(spaceIndex) {
  router.push(`/spaces/${spaceIndex}`)
}
</script>

<style scoped>
.home__banner { padding: var(--space-6) 0; }

.banner-list { display: flex; gap: var(--space-4); overflow-x: auto; }
.banner-item {
  flex-shrink: 0;
  width: 100%;
  min-height: 320px;
  border-radius: var(--radius-lg);
  background-size: cover;
  background-position: center;
  display: flex; align-items: flex-end;
  padding: var(--space-8);
  color: white;
}
.banner-item__text h2 { font-size: var(--font-size-2xl); margin: 0 0 var(--space-2); }
.banner-item__text p  { margin: 0; opacity: .85; }

.home__section { padding: var(--space-16) 0; }
.home__section--gray { background: var(--color-bg-subtle); }

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-8);
}
.section-title { font-size: var(--font-size-2xl); font-weight: var(--font-weight-bold); margin: 0; }
.section-more  { font-size: var(--font-size-sm); color: var(--color-primary); }

.space-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: var(--space-6);
}

.event-list { display: flex; gap: var(--space-6); flex-wrap: wrap; }
.event-item {
  flex: 1; min-width: 240px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  cursor: pointer;
  transition: transform var(--transition-base);
}
.event-item:hover { transform: translateY(-4px); }
.event-item img   { width: 100%; height: 180px; object-fit: cover; }
.event-item__info { padding: var(--space-4); }
.event-item__label {
  font-size: var(--font-size-xs);
  background: var(--color-accent);
  color: white;
  padding: 2px 8px;
  border-radius: var(--radius-full);
}
.event-item__info h3 { margin: var(--space-2) 0 var(--space-1); font-size: var(--font-size-base); }
.event-item__info p  { margin: 0; font-size: var(--font-size-sm); color: var(--color-text-secondary); }

/* 스켈레톤 */
.skeleton { background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; border-radius: var(--radius-md); }
.skeleton--banner { height: 320px; }
.skeleton--card   { height: 280px; }
@keyframes shimmer { 0% { background-position: -200% 0 } 100% { background-position: 200% 0 } }
</style>
