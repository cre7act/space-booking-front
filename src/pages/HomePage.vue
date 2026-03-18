<template>
  <div class="home">

    <!-- ── 롤링 배너 -->
    <section class="banner">
      <div class="banner__track" :style="trackStyle">
        <div
          v-for="(banner, i) in banners"
          :key="i"
          class="banner__slide"
          :style="{ backgroundImage: `url(${banner.imgUrl})`, backgroundColor: banner.bgColor }"
        >
          <!-- 텍스트형 배너 -->
          <div class="banner__slide-inner">
            <p class="banner__label">{{ banner.label }}</p>
            <h2 class="banner__title" v-html="banner.title" />
            <a class="banner__link" @click.prevent="router.push(banner.href || '/spaces')">
              {{ banner.linkText || '자세히 보기' }} →
            </a>
          </div>
          <!-- 우측 이미지 -->
          <img v-if="banner.sideImg" :src="banner.sideImg" class="banner__side-img" />
        </div>
      </div>

      <!-- 인디케이터 -->
      <div class="banner__dots">
        <button
          v-for="(_, i) in banners"
          :key="i"
          class="banner__dot"
          :class="{ 'is-active': currentSlide === i }"
          @click="goTo(i)"
        />
      </div>

      <!-- 좌우 화살표 -->
      <button class="banner__arrow banner__arrow--prev" @click="prev">‹</button>
      <button class="banner__arrow banner__arrow--next" @click="next">›</button>

      <!-- 슬라이드 카운터 -->
      <div class="banner__counter">{{ currentSlide + 1 }} / {{ banners.length }}</div>
    </section>

    <!-- ── 카테고리 퀵 메뉴 (라우드 하단 아이콘 메뉴) -->
    <section class="quick-menu">
      <div class="container">
        <div class="quick-menu__grid">
          <RouterLink
            v-for="cat in quickCategories"
            :key="cat.name"
            :to="`/spaces?category=${cat.name}`"
            class="quick-item"
          >
            <div class="quick-item__icon" :style="{ background: cat.color }">
              {{ cat.emoji }}
            </div>
            <span>{{ cat.name }}</span>
            <span v-if="cat.badge" class="quick-item__badge" :class="`badge--${cat.badgeType}`">
              {{ cat.badge }}
            </span>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- ── 추천 공간 -->
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
            v-for="space in spaces"
            :key="space.spaceIndex"
            :space="space"
            @click="router.push(`/spaces/${space.spaceIndex}`)"
          />
        </div>
      </div>
    </section>

    <!-- ── 이벤트 -->
    <section class="home__section home__section--gray">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">진행 중인 이벤트</h2>
          <RouterLink to="/events" class="section-more">전체보기 →</RouterLink>
        </div>
        <div class="event-list">
          <div
            v-for="event in events"
            :key="event.eventIndex"
            class="event-item"
            @click="router.push(`/events/${event.eventIndex}`)"
          >
            <img :src="event.imgUrl" :alt="event.title" />
            <div class="event-item__info">
              <span class="event-item__badge">이벤트</span>
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
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { homeApi } from '@/api/services'
import SpaceCard from '@/components/space/SpaceCard.vue'

const router = useRouter()

// ── 배너 데이터 (Mock — API 연결 후 교체)
const banners = ref([
  {
    label:    "신규 오픈 공간",
    title:    "원하는 공간을<br>자유롭게 예약하세요",
    linkText: "공간 찾기",
    href:     "/spaces",
    bgColor:  "#1A3A5C",
    imgUrl:   "",
    sideImg:  "https://images.unsplash.com/photo-1497366754035-f200968a7eda?w=500&q=80",
    textColor:"#FFFFFF",
  },
  {
    label:    "이번 주 특가",
    title:    "촬영 스튜디오<br>평일 20% 할인",
    linkText: "할인 공간 보기",
    href:     "/spaces?category=촬영스튜디오",
    bgColor:  "#E8F4FD",
    imgUrl:   "",
    sideImg:  "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=500&q=80",
    textColor:"#1A3A5C",
  },
  {
    label:    "멤버십 혜택",
    title:    "가입하면<br>첫 예약 30% 할인!",
    linkText: "지금 가입하기",
    href:     "/auth/join",
    bgColor:  "#FFF8E1",
    imgUrl:   "",
    sideImg:  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&q=80",
    textColor:"#1A1A2E",
  },
])

// ── 퀵 카테고리
const quickCategories = [
  { name:"스터디룸",    emoji:"📚", color:"#EBF5FB", badge:"BEST", badgeType:"blue" },
  { name:"촬영스튜디오", emoji:"📸", color:"#FDF2F8", badge:"NEW",  badgeType:"pink" },
  { name:"연습실",      emoji:"🎸", color:"#F0FFF4", badge:"",     badgeType:"" },
  { name:"공유오피스",   emoji:"💼", color:"#FFFBEB", badge:"",     badgeType:"" },
  { name:"세미나실",    emoji:"🎤", color:"#F5F3FF", badge:"BEST", badgeType:"blue" },
  { name:"파티룸",      emoji:"🎉", color:"#FFF5F5", badge:"NEW",  badgeType:"pink" },
]

// ── 롤링 배너 로직
const currentSlide = ref(0)
const transitioning = ref(true)
let autoTimer = null

// peek 캐러셀: 슬라이드 너비 64vw, 좌우 18vw 씩 이전/다음 슬라이드 노출
const SLIDE_W  = 64   // vw
const SLIDE_GAP = 24  // px
const PEEK     = (100 - SLIDE_W) / 2  // 18vw

const trackStyle = computed(() => ({
  transform:  `translateX(calc(${PEEK}vw - ${currentSlide.value} * (${SLIDE_W}vw + ${SLIDE_GAP}px)))`,
  transition: transitioning.value ? 'transform 0.5s ease' : 'none',
}))

function goTo(i) {
  currentSlide.value = i
  resetTimer()
}
function next() {
  currentSlide.value = (currentSlide.value + 1) % banners.value.length
  resetTimer()
}
function prev() {
  currentSlide.value = (currentSlide.value - 1 + banners.value.length) % banners.value.length
  resetTimer()
}
function startTimer() {
  autoTimer = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % banners.value.length
  }, 4000)
}
function resetTimer() {
  clearInterval(autoTimer)
  startTimer()
}

// ── 홈 데이터
const loading = ref(true)
const spaces  = ref([])
const events  = ref([])

onMounted(async () => {
  startTimer()
  const res = await homeApi.getHome()
  if (res.success) {
    spaces.value = res.data.spaces || []
    events.value = res.data.events || []
    if (res.data.banners?.length) banners.value = res.data.banners
  }
  loading.value = false
})

onUnmounted(() => clearInterval(autoTimer))
</script>

<style lang="scss" scoped>
/* ── 롤링 배너 */
.banner {
  position:   relative;
  overflow:   hidden;
  height:     280px;         /* 높이 축소 360 → 280 */
  background: #f4f5f7;       /* 슬라이드 사이 틈 배경 */
  padding:    16px 0;        /* 상하 여백으로 배너가 살짝 떠 보이는 효과 */
}
.banner__track {
  display:      flex;
  gap:          24px;        /* 갭 16 → 24 */
  height:       100%;
  will-change:  transform;
}
.banner__slide {
  flex-shrink:         0;
  width:               64vw;  /* peek 캐러셀: 좌우 18vw 노출 */
  height:              100%;
  display:             flex;
  align-items:         center;
  justify-content:     space-between;
  padding:             0 5% 0 7%;
  position:            relative;
  background-size:     cover;
  background-position: center;
  border-radius:       16px;  /* 모서리 더 둥글게 */
  overflow:            hidden;
  box-shadow:          0 4px 20px rgba(0,0,0,.15);
}
.banner__slide-inner { flex: 1; z-index: 1; }
.banner__label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  opacity: .7;
  margin: 0 0 var(--space-3);
  color: inherit;
}
.banner__title {
  font-size: clamp(24px, 3.5vw, 40px);
  font-weight: var(--font-weight-bold);
  line-height: 1.3;
  margin: 0 0 var(--space-6);
  color: inherit;
}
.banner__link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: inherit;
  cursor: pointer;
  border-bottom: 1px solid currentColor;
  padding-bottom: 2px;
  opacity: .9;
  transition: opacity var(--transition-fast);
}
.banner__link:hover { opacity: 1; }
.banner__side-img {
  width: 42%;
  max-width: 380px;
  height: 280px;
  object-fit: cover;
  border-radius: var(--radius-xl);
  flex-shrink: 0;
  box-shadow: var(--shadow-xl);
}

/* 인디케이터 */
.banner__dots {
  position: absolute;
  bottom: var(--space-5);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: var(--space-2);
}
.banner__dot {
  width: 8px; height: 8px;
  background: rgba(255,255,255,.5);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all var(--transition-fast);
  padding: 0;
}
.banner__dot.is-active {
  width: 24px;
  border-radius: 4px;
  background: white;
}

/* 화살표 */
.banner__arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px; height: 40px;
  background: rgba(255,255,255,.85);
  border: none;
  border-radius: 50%;
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  box-shadow: var(--shadow-md);
  transition: all var(--transition-fast);
  color: var(--color-text-primary);
}
.banner__arrow:hover { background: white; box-shadow: var(--shadow-lg); }
.banner__arrow--prev { left: var(--space-5); }
.banner__arrow--next { right: var(--space-5); }

/* 카운터 */
.banner__counter {
  position: absolute;
  bottom: var(--space-5);
  right: var(--space-6);
  font-size: var(--font-size-xs);
  color: rgba(255,255,255,.8);
  background: rgba(0,0,0,.25);
  padding: 2px var(--space-3);
  border-radius: var(--radius-full);
}

/* ── 퀵 메뉴 */
.quick-menu {
  padding:       var(--space-8) 0;
  border-bottom: 1px solid var(--color-border);
}
.quick-menu__grid {
  display:         flex;
  gap:             var(--space-4);
  justify-content: center;   /* ← 센터 정렬 */
  flex-wrap:       wrap;
}
.quick-item {
  display:        flex;
  flex-direction: column;
  align-items:    center;
  gap:            var(--space-3);
  min-width:      110px;
  padding:        var(--space-4) var(--space-3);
  border-radius:  var(--radius-lg);
  transition:     background var(--transition-fast);
  position:       relative;
  cursor:         pointer;
  text-decoration: none;
}
.quick-item:hover { background: var(--color-bg-subtle); }
.quick-item__icon {
  width:         80px;
  height:        80px;
  border-radius: var(--radius-xl);
  display:       flex;
  align-items:   center;
  justify-content: center;
  font-size:     36px;   /* 아이콘(이모지) 크기 업 */
}
.quick-item span:not(.quick-item__badge) {
  font-size:   var(--font-size-sm);   /* xs → sm */
  font-weight: var(--font-weight-semibold);
  color:       var(--color-text-primary);
  white-space: nowrap;
}
.quick-item__badge {
  position:     absolute;
  top:          var(--space-2);
  right:        var(--space-2);
  font-size:    10px;
  font-weight:  bold;
  padding:      2px 6px;
  border-radius: var(--radius-sm);
  line-height:  1.4;
}
.badge--blue { background: var(--color-primary); color: white; }
.badge--pink { background: #E91E63;              color: white; }

/* ── 섹션 */
.home__section { padding: var(--space-12) 0; }
.home__section--gray { background: var(--color-bg-subtle); }
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-6);
}
.section-title { font-size: var(--font-size-2xl); font-weight: var(--font-weight-bold); margin: 0; }
.section-more  { font-size: var(--font-size-sm); color: var(--color-primary); }
.space-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: var(--space-5); }

/* 이벤트 */
.event-list { display: flex; gap: var(--space-5); flex-wrap: wrap; }
.event-item {
  flex: 1; min-width: 220px; max-width: 320px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  cursor: pointer;
  transition: transform var(--transition-base);
}
.event-item:hover { transform: translateY(-4px); }
.event-item img   { width: 100%; height: 160px; object-fit: cover; }
.event-item__info { padding: var(--space-4); }
.event-item__badge {
  font-size: var(--font-size-xs);
  background: var(--color-accent);
  color: white;
  padding: 2px var(--space-2);
  border-radius: var(--radius-sm);
}
.event-item__info h3 { margin: var(--space-2) 0 var(--space-1); font-size: var(--font-size-base); }
.event-item__info p  { margin: 0; font-size: var(--font-size-xs); color: var(--color-text-secondary); }

/* 스켈레톤 */
.skeleton { background: linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; border-radius: var(--radius-md); }
.skeleton--card { height: 280px; }
@keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
</style>
