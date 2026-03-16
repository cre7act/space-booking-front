<template>
  <div class="cart-page">
    <div class="container">
      <h1 class="page-title">장바구니</h1>
      <div v-if="cartItems.length === 0" class="empty">
        <p>장바구니가 비어있어요</p>
        <button @click="router.push('/spaces')">공간 찾기</button>
      </div>
      <div v-else class="cart-layout">
        <div class="cart-items">
          <div v-for="item in cartItems" :key="item.cartIndex" class="cart-item">
            <img :src="item.thumbUrl || 'https://images.unsplash.com/photo-1497366754035-f200968a7eda?w=200&q=80'" />
            <div class="cart-item__info">
              <h4>{{ item.spaceTitle }}</h4>
              <p>{{ item.bookingDate }} {{ item.startTime }} ~ {{ item.endTime }}</p>
              <p>{{ item.headcount }}명</p>
            </div>
            <div class="cart-item__price">
              <strong>{{ formatPrice(item.price) }}원</strong>
            </div>
          </div>
        </div>
        <div class="cart-summary">
          <h3>결제 금액</h3>
          <div class="cart-summary__row">
            <span>공간 이용료</span>
            <span>{{ formatPrice(totalPrice) }}원</span>
          </div>
          <div class="cart-summary__total">
            <span>총 결제금액</span>
            <strong>{{ formatPrice(totalPrice) }}원</strong>
          </div>
          <button class="cart-summary__btn" @click="router.push('/booking/checkout')">예약하기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { cartApi } from '@/api/services'

const router    = useRouter()
const cartItems = ref([])

onMounted(async () => {
  const res = await cartApi.get()
  if (res.success) cartItems.value = res.data.cartItems || []
})

const totalPrice = computed(() => cartItems.value.reduce((sum, i) => sum + (i.price || 0), 0))
const formatPrice = p => p ? Number(p).toLocaleString('ko-KR') : '0'
</script>

<style scoped>
.cart-page { padding: var(--space-10) 0 var(--space-20); }
.page-title { font-size: var(--font-size-3xl); font-weight: var(--font-weight-bold); margin-bottom: var(--space-8); }
.cart-layout { display: grid; grid-template-columns: 1fr 320px; gap: var(--space-8); }
@media(max-width:768px) { .cart-layout { grid-template-columns: 1fr; } }
.cart-items { display: flex; flex-direction: column; gap: var(--space-4); }
.cart-item { display: flex; gap: var(--space-4); padding: var(--space-5); border: 1px solid var(--color-border); border-radius: var(--radius-lg); align-items: center; }
.cart-item img { width: 80px; height: 60px; object-fit: cover; border-radius: var(--radius-md); flex-shrink: 0; }
.cart-item__info { flex: 1; }
.cart-item__info h4 { margin: 0 0 var(--space-1); }
.cart-item__info p  { margin: 0; font-size: var(--font-size-sm); color: var(--color-text-secondary); }
.cart-item__price strong { font-size: var(--font-size-lg); color: var(--color-primary); }
.cart-summary { background: var(--color-bg-subtle); border-radius: var(--radius-xl); padding: var(--space-6); height: fit-content; position: sticky; top: 80px; }
.cart-summary h3 { margin: 0 0 var(--space-5); font-size: var(--font-size-lg); }
.cart-summary__row { display: flex; justify-content: space-between; margin-bottom: var(--space-3); font-size: var(--font-size-sm); }
.cart-summary__total { display: flex; justify-content: space-between; padding-top: var(--space-4); border-top: 1px solid var(--color-border); margin-top: var(--space-3); }
.cart-summary__total strong { font-size: var(--font-size-xl); color: var(--color-primary); }
.cart-summary__btn { width: 100%; margin-top: var(--space-5); padding: var(--space-4); background: var(--color-primary); color: white; border: none; border-radius: var(--radius-md); font-size: var(--font-size-base); font-weight: var(--font-weight-bold); cursor: pointer; }
.empty { text-align: center; padding: var(--space-20); }
.empty p { font-size: var(--font-size-xl); color: var(--color-text-secondary); margin-bottom: var(--space-6); }
.empty button { padding: var(--space-4) var(--space-8); background: var(--color-primary); color: white; border: none; border-radius: var(--radius-md); font-size: var(--font-size-base); cursor: pointer; }
</style>
