<template>
  <div class="checkout-page">
    <div class="container">
      <h1 class="page-title">예약 확인</h1>
      <div class="checkout-box">
        <div class="checkout-section">
          <h3>예약 정보</h3>
          <div class="info-row"><span>공간</span><strong>강남 프리미엄 스터디룸 A</strong></div>
          <div class="info-row"><span>날짜</span><strong>2024.02.10</strong></div>
          <div class="info-row"><span>시간</span><strong>14:00 ~ 17:00</strong></div>
          <div class="info-row"><span>인원</span><strong>2명</strong></div>
        </div>
        <div class="checkout-section">
          <h3>결제 수단</h3>
          <div class="pay-methods">
            <label v-for="m in methods" :key="m.key" class="pay-method" :class="{ 'is-selected': payMethod === m.key }">
              <input type="radio" v-model="payMethod" :value="m.key" hidden />
              {{ m.label }}
            </label>
          </div>
        </div>
        <div class="checkout-total">
          <span>총 결제금액</span>
          <strong>45,000원</strong>
        </div>
        <button class="checkout-btn" @click="router.push('/booking/complete')">결제하기</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router    = useRouter()
const payMethod = ref('card')
const methods   = [{ key:'card', label:'💳 신용카드' }, { key:'kakao', label:'🟡 카카오페이' }, { key:'naver', label:'🟢 네이버페이' }]
</script>

<style scoped>
.checkout-page { padding: var(--space-10) 0 var(--space-20); }
.page-title { font-size: var(--font-size-3xl); font-weight: var(--font-weight-bold); margin-bottom: var(--space-8); }
.checkout-box { max-width: 560px; }
.checkout-section { padding: var(--space-6); border: 1px solid var(--color-border); border-radius: var(--radius-lg); margin-bottom: var(--space-5); }
.checkout-section h3 { margin: 0 0 var(--space-4); font-size: var(--font-size-lg); }
.info-row { display: flex; justify-content: space-between; padding: var(--space-2) 0; border-bottom: 1px solid var(--color-border); }
.info-row:last-child { border: none; }
.info-row span { color: var(--color-text-secondary); }
.pay-methods { display: flex; gap: var(--space-3); }
.pay-method { flex: 1; padding: var(--space-3); border: 1px solid var(--color-border); border-radius: var(--radius-md); text-align: center; cursor: pointer; transition: all var(--transition-fast); }
.pay-method.is-selected { border-color: var(--color-primary); background: rgba(26,58,92,.05); font-weight: bold; }
.checkout-total { display: flex; justify-content: space-between; padding: var(--space-5); background: var(--color-bg-subtle); border-radius: var(--radius-lg); margin-bottom: var(--space-5); }
.checkout-total strong { font-size: var(--font-size-xl); color: var(--color-primary); }
.checkout-btn { width: 100%; padding: var(--space-5); background: var(--color-primary); color: white; border: none; border-radius: var(--radius-lg); font-size: var(--font-size-lg); font-weight: var(--font-weight-bold); cursor: pointer; }
</style>
