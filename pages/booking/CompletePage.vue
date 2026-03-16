<template>
  <div class="complete-page">
    <div class="container">
      <div class="complete-box">
        <div class="complete-icon">✅</div>
        <h1>예약이 완료되었습니다!</h1>
        <p>예약 확인 메일이 발송되었습니다</p>
        <div class="complete-info">
          <div class="info-row"><span>공간</span><strong>강남 프리미엄 스터디룸 A</strong></div>
          <div class="info-row"><span>날짜</span><strong>2024.02.10 14:00 ~ 17:00</strong></div>
          <div class="info-row"><span>결제금액</span><strong>45,000원</strong></div>
        </div>
        <div class="complete-btns">
          <button @click="router.push('/my/bookings')">예약 내역 보기</button>
          <button class="btn--outline" @click="router.push('/')">홈으로</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<style scoped>
.complete-page { padding: var(--space-20) 0; }
.complete-box { max-width: 480px; margin: 0 auto; text-align: center; }
.complete-icon { font-size: 64px; margin-bottom: var(--space-5); }
.complete-box h1 { font-size: var(--font-size-2xl); font-weight: var(--font-weight-bold); margin: 0 0 var(--space-2); }
.complete-box p  { color: var(--color-text-secondary); margin: 0 0 var(--space-8); }
.complete-info { text-align: left; padding: var(--space-6); background: var(--color-bg-subtle); border-radius: var(--radius-lg); margin-bottom: var(--space-8); }
.info-row { display: flex; justify-content: space-between; padding: var(--space-2) 0; border-bottom: 1px solid var(--color-border); }
.info-row:last-child { border: none; }
.info-row span { color: var(--color-text-secondary); }
.complete-btns { display: flex; gap: var(--space-4); }
.complete-btns button { flex: 1; padding: var(--space-4); background: var(--color-primary); color: white; border: none; border-radius: var(--radius-md); font-size: var(--font-size-base); font-weight: var(--font-weight-bold); cursor: pointer; }
.complete-btns .btn--outline { background: white; color: var(--color-primary); border: 1px solid var(--color-primary); }
</style>
