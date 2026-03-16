<template>
  <div class="search-page">
    <div class="container">
      <div class="search-header">
        <h1>검색</h1>
        <div class="search-bar">
          <input v-model="keyword" type="text" placeholder="공간명, 지역, 카테고리 검색"
            @keyup.enter="doSearch" autofocus />
          <button @click="doSearch">검색</button>
        </div>
      </div>

      <div v-if="searched">
        <p class="search-result-text">
          <strong>"{{ lastKeyword }}"</strong> 검색 결과
          <span>{{ spaces.length }}개</span>
        </p>
        <div v-if="spaces.length === 0" class="empty">검색 결과가 없습니다</div>
        <div v-else class="space-grid">
          <SpaceCard
            v-for="s in spaces" :key="s.spaceIndex" :space="s"
            @click="router.push(`/spaces/${s.spaceIndex}`)"
          />
        </div>
      </div>

      <div v-else class="search-guide">
        <p>🔍 검색어를 입력하세요</p>
        <div class="search-tags">
          <span v-for="tag in suggestTags" :key="tag"
            class="search-tag" @click="keyword = tag; doSearch()">{{ tag }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { spaceApi } from '@/api/services'
import SpaceCard from '@/components/space/SpaceCard.vue'

const router      = useRouter()
const keyword     = ref('')
const lastKeyword = ref('')
const spaces      = ref([])
const searched    = ref(false)
const suggestTags = ['스터디룸', '촬영스튜디오', '강남', '홍대', '연습실', '공유오피스']

async function doSearch() {
  if (!keyword.value.trim()) return
  lastKeyword.value = keyword.value
  const res = await spaceApi.search({ keyword: keyword.value })
  if (res.success) spaces.value = res.data.spaces
  searched.value = true
}
</script>

<style scoped>
.search-page { padding: var(--space-10) 0 var(--space-20); }
.search-header { margin-bottom: var(--space-8); }
.search-header h1 { font-size: var(--font-size-3xl); font-weight: var(--font-weight-bold); margin: 0 0 var(--space-5); }
.search-bar { display: flex; gap: var(--space-3); }
.search-bar input { flex: 1; padding: var(--space-4); border: 2px solid var(--color-primary); border-radius: var(--radius-lg); font-size: var(--font-size-lg); font-family: var(--font-family); }
.search-bar input:focus { outline: none; }
.search-bar button { padding: var(--space-4) var(--space-8); background: var(--color-primary); color: white; border: none; border-radius: var(--radius-lg); font-size: var(--font-size-base); font-weight: var(--font-weight-bold); }
.search-result-text { margin-bottom: var(--space-6); color: var(--color-text-secondary); }
.search-result-text strong { color: var(--color-dark); }
.search-result-text span { margin-left: var(--space-2); color: var(--color-primary); font-weight: bold; }
.space-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: var(--space-6); }
.search-guide { text-align: center; padding: var(--space-16) 0; color: var(--color-text-secondary); }
.search-guide p { font-size: var(--font-size-xl); margin-bottom: var(--space-6); }
.search-tags { display: flex; gap: var(--space-3); justify-content: center; flex-wrap: wrap; }
.search-tag { padding: var(--space-2) var(--space-5); border: 1px solid var(--color-border); border-radius: var(--radius-full); cursor: pointer; transition: all var(--transition-fast); }
.search-tag:hover { background: var(--color-primary); color: white; border-color: var(--color-primary); }
.empty { text-align: center; padding: var(--space-16); color: var(--color-text-secondary); }
</style>
