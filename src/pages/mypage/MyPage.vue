<template>
  <div class="mypage">
    <div class="container">

      <!-- 프로필 헤더 -->
      <div class="mypage__profile">
        <div class="mypage__avatar">{{ userName.charAt(0) }}</div>
        <div>
          <h2>{{ userName }}님</h2>
          <p>{{ authStore.user?.id }}</p>
        </div>
      </div>

      <!-- 탭 -->
      <div class="mypage__tabs">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          class="mypage__tab"
          :class="{ 'is-active': activeTab === tab.key }"
          @click="activeTab = tab.key"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- 예약 내역 -->
      <div v-if="activeTab === 'booking'">
        <div v-if="loadingBooking" class="loading-list">
          <div v-for="n in 3" :key="n" class="skeleton skeleton--row" />
        </div>
        <div v-else-if="bookings.length === 0" class="empty">예약 내역이 없습니다</div>
        <div v-else class="booking-list">
          <div v-for="b in bookings" :key="b.rezIndex" class="booking-item">
            <img :src="b.thumbUrl" :alt="b.spaceTitle" />
            <div class="booking-item__info">
              <span :class="['booking-item__status', `status--${b.statusCode}`]">{{ b.status }}</span>
              <h4>{{ b.spaceTitle }}</h4>
              <p>{{ b.bookingDate }} {{ b.startTime }} ~ {{ b.endTime }}</p>
              <strong>{{ formatPrice(b.totalPrice) }}원</strong>
            </div>
            <RouterLink :to="`/my/bookings/${b.rezIndex}`" class="booking-item__link">상세보기 →</RouterLink>
          </div>
        </div>
      </div>

      <!-- 결제 내역 -->
      <div v-if="activeTab === 'payment'">
        <div v-if="loadingPayment" class="loading-list">
          <div v-for="n in 3" :key="n" class="skeleton skeleton--row" />
        </div>
        <div v-else-if="payments.length === 0" class="empty">결제 내역이 없습니다</div>
        <div v-else class="payment-list">
          <div v-for="p in payments" :key="p.payIndex" class="payment-item">
            <div class="payment-item__info">
              <h4>{{ p.spaceTitle }}</h4>
              <p>{{ p.payDate }} · {{ p.payMethod }}</p>
            </div>
            <div class="payment-item__right">
              <strong>{{ formatPrice(p.totalPrice) }}원</strong>
              <span class="payment-item__status">{{ p.status }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 위시리스트 -->
      <div v-if="activeTab === 'wish'">
        <div v-if="loadingWish" class="space-grid">
          <div v-for="n in 4" :key="n" class="skeleton skeleton--card" />
        </div>
        <div v-else-if="wishlist.length === 0" class="empty">찜한 공간이 없습니다</div>
        <div v-else class="space-grid">
          <SpaceCard
            v-for="s in wishlist"
            :key="s.spaceIndex"
            :space="s"
            @click="router.push(`/spaces/${s.spaceIndex}`)"
          />
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { bookingApi, paymentApi, wishlistApi } from '@/api/services'
import SpaceCard from '@/components/space/SpaceCard.vue'

const router    = useRouter()
const authStore = useAuthStore()
const userName  = computed(() => authStore.userName)

const activeTab     = ref('booking')
const tabs = [
  { key:'booking', label:'예약 내역' },
  { key:'payment', label:'결제 내역' },
  { key:'wish',    label:'찜한 공간' },
]

const bookings       = ref([]);  const loadingBooking = ref(false)
const payments       = ref([]);  const loadingPayment = ref(false)
const wishlist       = ref([]);  const loadingWish    = ref(false)

async function fetchBookings() {
  loadingBooking.value = true
  const res = await bookingApi.getList()
  if (res.success) bookings.value = res.data.bookingList
  loadingBooking.value = false
}
async function fetchPayments() {
  loadingPayment.value = true
  const res = await paymentApi.getList()
  if (res.success) payments.value = res.data.paymentList
  loadingPayment.value = false
}
async function fetchWishlist() {
  loadingWish.value = true
  const res = await wishlistApi.getList()
  if (res.success) wishlist.value = res.data.wishlist
  loadingWish.value = false
}

watch(activeTab, (tab) => {
  if (tab === 'booking' && !bookings.value.length)  fetchBookings()
  if (tab === 'payment' && !payments.value.length)  fetchPayments()
  if (tab === 'wish'    && !wishlist.value.length)   fetchWishlist()
})

onMounted(fetchBookings)

function formatPrice(p) { return p ? Number(p).toLocaleString('ko-KR') : '0' }
</script>

<style scoped>
.mypage { padding: var(--space-10) 0 var(--space-20); }

.mypage__profile { display:flex; align-items:center; gap:var(--space-5); margin-bottom:var(--space-8); padding-bottom:var(--space-8); border-bottom:1px solid var(--color-border); }
.mypage__avatar { width:64px; height:64px; background:var(--color-primary); color:white; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:var(--font-size-2xl); font-weight:bold; }
.mypage__profile h2 { margin:0 0 var(--space-1); font-size:var(--font-size-xl); }
.mypage__profile p  { margin:0; color:var(--color-text-secondary); font-size:var(--font-size-sm); }

.mypage__tabs { display:flex; gap:0; border-bottom:2px solid var(--color-border); margin-bottom:var(--space-8); }
.mypage__tab { padding:var(--space-4) var(--space-6); background:none; border:none; font-size:var(--font-size-base); color:var(--color-text-secondary); border-bottom:2px solid transparent; margin-bottom:-2px; transition:all var(--transition-fast); }
.mypage__tab.is-active { color:var(--color-primary); border-bottom-color:var(--color-primary); font-weight:var(--font-weight-semibold); }

.booking-list { display:flex; flex-direction:column; gap:var(--space-4); }
.booking-item { display:flex; align-items:center; gap:var(--space-5); padding:var(--space-5); border:1px solid var(--color-border); border-radius:var(--radius-lg); }
.booking-item img { width:80px; height:60px; border-radius:var(--radius-md); object-fit:cover; flex-shrink:0; }
.booking-item__info { flex:1; }
.booking-item__info h4 { margin:var(--space-1) 0; }
.booking-item__info p  { margin:0 0 var(--space-1); font-size:var(--font-size-sm); color:var(--color-text-secondary); }
.booking-item__status { font-size:var(--font-size-xs); padding:2px var(--space-2); border-radius:var(--radius-sm); }
.status--done      { background:#E8F5E9; color:#27AE60; }
.status--confirmed { background:#E3F2FD; color:#2196F3; }
.status--pending   { background:#FFF8E1; color:#F39C12; }
.booking-item__link { font-size:var(--font-size-sm); color:var(--color-primary); flex-shrink:0; }

.payment-list { display:flex; flex-direction:column; gap:var(--space-3); }
.payment-item { display:flex; justify-content:space-between; align-items:center; padding:var(--space-5); border:1px solid var(--color-border); border-radius:var(--radius-lg); }
.payment-item__info h4 { margin:0 0 var(--space-1); }
.payment-item__info p  { margin:0; font-size:var(--font-size-sm); color:var(--color-text-secondary); }
.payment-item__right { text-align:right; }
.payment-item__right strong { display:block; font-size:var(--font-size-lg); color:var(--color-primary); }
.payment-item__status { font-size:var(--font-size-xs); color:var(--color-text-secondary); }

.space-grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(240px, 1fr)); gap:var(--space-5); }
.empty { text-align:center; padding:var(--space-20); color:var(--color-text-secondary); }

.skeleton { background:linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%); background-size:200% 100%; animation:shimmer 1.5s infinite; border-radius:var(--radius-md); }
.skeleton--row  { height:80px; }
.skeleton--card { height:260px; }
@keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
</style>
