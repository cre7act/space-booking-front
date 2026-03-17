<template>
  <div class="detail-page" v-if="!loading">
    
    <!-- 사진 갤러리 -->
    <div class="gallery">
      <img :src="activePhoto" class="gallery__main" />
      <div class="gallery__thumbs">
        <img
          v-for="(p, i) in detail.photos"
          :key="i"
          :src="p.imgUrl"
          :class="{ 'is-active': activePhoto === p.imgUrl }"
          @click="activePhoto = p.imgUrl"
        />
      </div>
    </div>

    <div class="container">
      <div class="detail-layout">

        <!-- 왼쪽: 공간 정보 -->
        <div class="detail-main">
          <span class="detail-cat">{{ detail.space.category }}</span>
          <h1 class="detail-title">{{ detail.space.title }}</h1>

          <div class="detail-meta">
            <span>📍 {{ detail.space.region }}</span>
            <span>⭐ {{ detail.space.rating }} ({{ detail.space.reviewCount }}개 리뷰)</span>
            <span>👥 최대 {{ detail.space.capacity }}인</span>
          </div>

          <div class="detail-desc">
            <h3>공간 소개</h3>
            <p>{{ detail.space.description }}</p>
          </div>

          <!-- 편의시설 -->
          <div class="detail-amenities">
            <h3>편의시설</h3>
            <div class="amenity-grid">
              <span v-for="a in detail.amenities" :key="a.name" class="amenity-tag">
                ✓ {{ a.name }}
              </span>
            </div>
          </div>

          <!-- 리뷰 -->
          <div class="detail-reviews">
            <h3>리뷰 ({{ detail.reviews?.length || 0 }})</h3>
            <div class="review-list">
              <div v-for="r in detail.reviews" :key="r.regDate" class="review-item">
                <div class="review-item__header">
                  <span class="review-item__name">{{ r.memberName }}</span>
                  <span class="review-item__star">{{ '⭐'.repeat(r.rating) }}</span>
                  <span class="review-item__date">{{ r.regDate }}</span>
                </div>
                <p class="review-item__content">{{ r.content }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 오른쪽: 예약 패널 -->
        <div class="booking-panel">
          <div class="booking-panel__inner">
            <p class="booking-panel__price">
              <strong>{{ formatPrice(detail.space.minPrice) }}</strong>원~/시간
            </p>

            <!-- 요금 옵션 선택 -->
            <div class="booking-panel__field">
              <label>요금 옵션</label>
              <div class="fee-options">
                <div
                  v-for="fee in detail.feeOptions"
                  :key="fee.feeOptionIndex"
                  class="fee-option"
                  :class="{ 'is-selected': selectedFee?.feeOptionIndex === fee.feeOptionIndex }"
                  @click="selectedFee = fee"
                >
                  <span>{{ fee.name }}</span>
                  <strong>{{ formatPrice(fee.price) }}원</strong>
                </div>
              </div>
            </div>

            <!-- 날짜 선택 -->
            <div class="booking-panel__field">
              <label>날짜</label>
              <input v-model="bookingDate" type="date" :min="today" />
            </div>

            <!-- 추가 옵션 텍스트 필드 3개 -->
            <div class="booking-panel__field">
              <label>추가 옵션</label>
              <div class="extra-fields">
                <input
                  v-model="extraOption1"
                  type="text"
                  class="extra-field"
                  placeholder="옵션 1을 입력하세요"
                />
                <input
                  v-model="extraOption2"
                  type="text"
                  class="extra-field"
                  placeholder="옵션 2를 입력하세요"
                />
                <input
                  v-model="extraOption3"
                  type="text"
                  class="extra-field"
                  placeholder="옵션 3을 입력하세요"
                />
              </div>
            </div>

            <!-- 인원 -->
            <div class="booking-panel__field">
              <label>인원</label>
              <div class="counter">
                <button @click="headcount = Math.max(1, headcount - 1)">−</button>
                <span>{{ headcount }}명</span>
                <button @click="headcount = Math.min(detail.space.capacity, headcount + 1)">+</button>
              </div>
            </div>

            <!-- 합계 -->
            <div class="booking-panel__total" v-if="selectedFee">
              <span>총 금액</span>
              <strong>{{ formatPrice(selectedFee.price) }}원</strong>
            </div>

            <button
              class="booking-panel__btn"
              :disabled="!selectedFee || !bookingDate"
              @click="handleBooking"
            >
              예약하기
            </button>

            <button class="booking-panel__wish" @click="toggleWish">
              {{ isWished ? '♥ 찜 취소' : '♡ 찜하기' }}
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>

  <!-- 로딩 -->
  <div v-else class="loading-wrap">
    <div class="spinner" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { spaceApi, wishlistApi } from '@/api/services'
import { useAuthStore } from '@/stores/auth'

const route     = useRoute()
const router    = useRouter()
const authStore = useAuthStore()

const loading      = ref(true)
const detail       = ref({ space:{}, photos:[], amenities:[], feeOptions:[], reviews:[] })
const activePhoto  = ref('')
const selectedFee  = ref(null)
const bookingDate  = ref('')
const headcount    = ref(1)
const isWished     = ref(false)
const today        = new Date().toISOString().split('T')[0]
const extraOption1 = ref('')
const extraOption2 = ref('')
const extraOption3 = ref('')

onMounted(async () => {
  const res = await spaceApi.getDetail(route.params.id)
  if (res.success) {
    detail.value      = res.data
    activePhoto.value = res.data.photos?.[0]?.imgUrl || ''
  }
  loading.value = false
})

async function toggleWish() {
  if (!authStore.isLoggedIn) { alert('로그인이 필요합니다.'); return }
  const kind = isWished.value ? 'del' : 'add'
  await wishlistApi.toggle({ spaceIndex: route.params.id, kind })
  isWished.value = !isWished.value
}

function handleBooking() {
  if (!authStore.isLoggedIn) { router.push('/auth/login'); return }
  router.push({
    path: '/booking/cart',
    query: {
      spaceIndex:     route.params.id,
      feeOptionIndex: selectedFee.value.feeOptionIndex,
      date:           bookingDate.value,
      headcount:      headcount.value,
    }
  })
}

function formatPrice(p) { return p ? Number(p).toLocaleString('ko-KR') : '0' }
</script>

<style scoped>
.gallery { background: #000; }
.gallery__main { width:100%; max-height:480px; object-fit:cover; margin:0 auto; display:block; }
.gallery__thumbs { display:flex; gap:var(--space-2); padding:var(--space-3) var(--space-6); overflow-x:auto; }
.gallery__thumbs img { width:80px; height:60px; object-fit:cover; border-radius:var(--radius-sm); cursor:pointer; opacity:.6; border:2px solid transparent; transition:all var(--transition-fast); }
.gallery__thumbs img.is-active { opacity:1; border-color:white; }

.detail-layout { display:grid; grid-template-columns:1fr 360px; gap:var(--space-10); padding:var(--space-10) 0 var(--space-20); }
@media(max-width:900px) { .detail-layout { grid-template-columns:1fr; } }

.detail-cat { display:inline-block; background:var(--color-primary); color:white; font-size:var(--font-size-xs); padding:2px var(--space-3); border-radius:var(--radius-full); margin-bottom:var(--space-3); }
.detail-title { font-size:var(--font-size-3xl); font-weight:var(--font-weight-bold); margin:0 0 var(--space-4); }
.detail-meta { display:flex; gap:var(--space-5); color:var(--color-text-secondary); font-size:var(--font-size-sm); margin-bottom:var(--space-8); flex-wrap:wrap; }

.detail-desc h3, .detail-amenities h3, .detail-reviews h3 { font-size:var(--font-size-xl); margin:0 0 var(--space-4); padding-top:var(--space-8); border-top:1px solid var(--color-border); }
.detail-desc p { color:var(--color-text-secondary); line-height:var(--line-height-loose); }

.amenity-grid { display:flex; flex-wrap:wrap; gap:var(--space-3); }
.amenity-tag { background:var(--color-bg-subtle); padding:var(--space-2) var(--space-4); border-radius:var(--radius-full); font-size:var(--font-size-sm); }

.review-list { display:flex; flex-direction:column; gap:var(--space-5); }
.review-item { padding:var(--space-5); background:var(--color-bg-subtle); border-radius:var(--radius-lg); }
.review-item__header { display:flex; align-items:center; gap:var(--space-3); margin-bottom:var(--space-2); }
.review-item__name { font-weight:var(--font-weight-semibold); }
.review-item__date { margin-left:auto; font-size:var(--font-size-xs); color:var(--color-text-secondary); }
.review-item__content { margin:0; color:var(--color-text-secondary); }

/* 예약 패널 */
.booking-panel { position:sticky; top:80px; }
.booking-panel__inner { background:white; border:1px solid var(--color-border); border-radius:var(--radius-xl); padding:var(--space-6); box-shadow:var(--shadow-lg); }
.booking-panel__price { font-size:var(--font-size-sm); color:var(--color-text-secondary); margin:0 0 var(--space-5); }
.booking-panel__price strong { font-size:var(--font-size-2xl); color:var(--color-primary); }

.booking-panel__field { margin-bottom:var(--space-5); }
.booking-panel__field label { display:block; font-size:var(--font-size-sm); font-weight:var(--font-weight-medium); margin-bottom:var(--space-2); }
.booking-panel__field input[type=date] { width:100%; padding:var(--space-3); border:1px solid var(--color-border); border-radius:var(--radius-md); font-family:var(--font-family); }

.fee-options { display:flex; flex-direction:column; gap:var(--space-2); }
.fee-option { display:flex; justify-content:space-between; padding:var(--space-3) var(--space-4); border:1px solid var(--color-border); border-radius:var(--radius-md); cursor:pointer; transition:all var(--transition-fast); }
.fee-option.is-selected { border-color:var(--color-primary); background:rgba(26,58,92,.05); }

.counter { display:flex; align-items:center; gap:var(--space-4); }
.counter button { width:32px; height:32px; border:1px solid var(--color-border); border-radius:50%; background:white; font-size:var(--font-size-lg); line-height:1; }
.counter span   { font-weight:var(--font-weight-semibold); min-width:40px; text-align:center; }

.booking-panel__total { display:flex; justify-content:space-between; padding:var(--space-4) 0; border-top:1px solid var(--color-border); margin-bottom:var(--space-4); }
.booking-panel__total strong { font-size:var(--font-size-xl); color:var(--color-primary); }

.booking-panel__btn { width:100%; padding:var(--space-4); background:var(--color-primary); color:white; border:none; border-radius:var(--radius-md); font-size:var(--font-size-base); font-weight:var(--font-weight-bold); margin-bottom:var(--space-3); }
.booking-panel__btn:disabled { opacity:.5; cursor:not-allowed; }
.booking-panel__wish { width:100%; padding:var(--space-3); background:white; color:var(--color-primary); border:1px solid var(--color-primary); border-radius:var(--radius-md); font-size:var(--font-size-sm); }

/* 추가 옵션 텍스트 필드 */
.extra-fields { display:flex; flex-direction:column; gap:var(--space-2); }
.extra-field {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-family: var(--font-family);
  color: var(--color-text-primary);
  background: white;
  box-sizing: border-box;
  transition: border-color var(--transition-fast);
}
.extra-field:focus {
  outline: none;
  border-color: var(--color-border-focus);
}
.extra-field::placeholder { color: var(--color-text-disabled); }

.loading-wrap { display:flex; justify-content:center; align-items:center; height:400px; }
.spinner { width:40px; height:40px; border:3px solid var(--color-border); border-top-color:var(--color-primary); border-radius:50%; animation:spin .8s linear infinite; }
@keyframes spin { to { transform:rotate(360deg) } }
</style>