<template>
  <div class="join-page">
    <div class="join-box">
      <h1>회원가입</h1>
      <p>공간 예약 서비스에 오신 것을 환영합니다</p>
      <form @submit.prevent="handleJoin">
        <div class="form-field">
          <label>이름</label>
          <input v-model="form.name" type="text" placeholder="이름을 입력하세요" />
        </div>
        <div class="form-field">
          <label>이메일 (아이디)</label>
          <input v-model="form.id" type="email" placeholder="이메일을 입력하세요" />
        </div>
        <div class="form-field">
          <label>비밀번호</label>
          <input v-model="form.password" type="password" placeholder="비밀번호를 입력하세요" />
        </div>
        <div class="form-field">
          <label>비밀번호 확인</label>
          <input v-model="form.passwordConfirm" type="password" placeholder="비밀번호를 다시 입력하세요" />
        </div>
        <p v-if="errorMsg" class="form-error">{{ errorMsg }}</p>
        <button type="submit" class="btn-submit">가입하기</button>
      </form>
      <div class="join-box__footer">
        이미 계정이 있으신가요?
        <RouterLink to="/auth/login">로그인</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const router   = useRouter()
const errorMsg = ref('')
const form     = reactive({ name: '', id: '', password: '', passwordConfirm: '' })

function handleJoin() {
  if (!form.name || !form.id || !form.password) { errorMsg.value = '모든 항목을 입력해주세요.'; return }
  if (form.password !== form.passwordConfirm)   { errorMsg.value = '비밀번호가 일치하지 않습니다.'; return }
  // 백엔드 연결 후 실제 가입 처리
  alert('회원가입 기능은 백엔드 연결 후 활성화됩니다.')
}
</script>

<style scoped>
.join-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--color-bg-subtle); padding: var(--space-6); }
.join-box { width: 100%; max-width: 400px; background: white; border-radius: var(--radius-xl); padding: var(--space-10); box-shadow: var(--shadow-lg); }
.join-box h1 { font-size: var(--font-size-2xl); font-weight: var(--font-weight-bold); margin: 0 0 var(--space-2); }
.join-box p  { color: var(--color-text-secondary); margin: 0 0 var(--space-8); }
form { display: flex; flex-direction: column; gap: var(--space-4); }
.form-field { display: flex; flex-direction: column; gap: var(--space-2); }
.form-field label { font-size: var(--font-size-sm); font-weight: var(--font-weight-medium); }
.form-field input { padding: var(--space-3) var(--space-4); border: 1px solid var(--color-border); border-radius: var(--radius-md); font-size: var(--font-size-base); font-family: var(--font-family); }
.form-field input:focus { outline: none; border-color: var(--color-border-focus); }
.form-error { color: var(--color-error); font-size: var(--font-size-sm); margin: 0; }
.btn-submit { padding: var(--space-4); background: var(--color-primary); color: white; border: none; border-radius: var(--radius-md); font-size: var(--font-size-base); font-weight: var(--font-weight-bold); margin-top: var(--space-2); cursor: pointer; }
.join-box__footer { margin-top: var(--space-6); text-align: center; font-size: var(--font-size-sm); color: var(--color-text-secondary); }
.join-box__footer a { color: var(--color-primary); margin-left: var(--space-2); }
</style>
