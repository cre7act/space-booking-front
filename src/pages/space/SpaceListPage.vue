<template>
  <div class="space-list-page">
    <div class="container">

      <!-- 페이지 헤더 -->
      <div class="page-header">
        <h1>공간 찾기</h1>
        <p>원하는 공간을 검색하고 바로 예약하세요</p>
      </div>

      <!-- 필터 -->
      <div class="filter-bar">
        <div class="filter-bar__search">
          <input
            v-model="keyword"
            type="text"
            placeholder="공간명, 지역으로 검색"
            @keyup.enter="doSearch"
          />
          <button @click="doSearch">검색</button>
        </div>
        <div class="filter-bar__cats">
          <button
            v-for="cat in categories"
            :key="cat"
            class="filter-cat"
            :class="{ 'is-active': selectedCat === cat }"
            @click="selectCat(cat)"
          >
            {{ cat }}
          </button>
        </div>
      </div>

      <!-- 결과 -->
      <div class="result-header">
        <span>총 <strong>{{ spaceCount }}</strong>개의 공간</span>
        <select v-model="sortBy" @change="fetchSpaces">
          <option value="">추천순</option>
          <option value="rating">평점순</option>
          <option value="price">가격순</option>
          <option value="review">리뷰순</option>
        </select>
      </div>

      <!-- 공간 그리드 -->
      <div v-if="loading" class="space-grid">
        <div v-for="n in 6" :key="n" class="skeleton skeleton--card" />
      </div>
      <div v-else-if="spaces.length === 0" class="empty">
        <p>검색 결과가 없습니다</p>
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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { spaceApi } from '@/api/services'
import SpaceCard from '@/components/space/SpaceCard.vue'

const router = useRouter()

const spaces     = ref([])
const spaceCount = ref(0)
const loading    = ref(true)
const keyword    = ref('')
const selectedCat= ref('전체')
const sortBy     = ref('')

const categories = ['전체','스터디룸','촬영스튜디오','연습실','공유오피스','세미나실']

async function fetchSpaces() {
  loading.value = true
  try {
    const params = {}
    if (keyword.value)    params.keyword  = keyword.value
    if (selectedCat.value !== '전체') params.category = selectedCat.value
    if (sortBy.value)     params.sortBy   = sortBy.value

    const res = await spaceApi.getList(params)
    if (res.success) {
      spaces.value     = res.data.spaceList
      spaceCount.value = res.data.spaceCount
    }
  } finally {
    loading.value = false
  }
}

function doSearch()      { fetchSpaces() }
function selectCat(cat)  { selectedCat.value = cat; fetchSpaces() }

onMounted(fetchSpaces)
</script>

<style scoped>
.space-list-page { padding: var(--space-10) 0 var(--space-20); }

.page-header { margin-bottom: var(--space-8); }
.page-header h1 { font-size: var(--font-size-3xl); font-weight: var(--font-weight-bold); margin: 0 0 var(--space-2); }
.page-header p  { color: var(--color-text-secondary); margin: 0; }

.filter-bar { background: var(--color-bg-subtle); border-radius: var(--radius-lg); padding: var(--space-5); margin-bottom: var(--space-6); }
.filter-bar__search { display: flex; gap: var(--space-3); margin-bottom: var(--space-4); }
.filter-bar__search input {
  flex: 1; padding: var(--space-3) var(--space-4);
  border: 1px solid var(--color-border); border-radius: var(--radius-md);
  font-size: var(--font-size-base); font-family: var(--font-family);
}
.filter-bar__search input:focus { outline: none; border-color: var(--color-border-focus); }
.filter-bar__search button {
  padding: var(--space-3) var(--space-6);
  background: var(--color-primary); color: white;
  border: none; border-radius: var(--radius-md);
  font-size: var(--font-size-base); font-weight: var(--font-weight-medium);
}

.filter-bar__cats { display: flex; gap: var(--space-2); flex-wrap: wrap; }
.filter-cat {
  padding: var(--space-2) var(--space-4);
  border: 1px solid var(--color-border); border-radius: var(--radius-full);
  background: white; font-size: var(--font-size-sm);
  transition: all var(--transition-fast);
}
.filter-cat.is-active, .filter-cat:hover {
  background: var(--color-primary); color: white; border-color: var(--color-primary);
}

.result-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-5); }
.result-header strong { color: var(--color-primary); }
.result-header select { padding: var(--space-2) var(--space-3); border: 1px solid var(--color-border); border-radius: var(--radius-md); font-family: var(--font-family); }

.space-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: var(--space-6); }

.empty { text-align: center; padding: var(--space-20); color: var(--color-text-secondary); }

.skeleton { background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; border-radius: var(--radius-md); }
.skeleton--card { height: 280px; }
@keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
</style>
