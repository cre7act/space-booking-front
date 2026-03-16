<template>
  <div class="login-page">
    <div class="login-box">

      <h1 class="login-box__title">로그인</h1>
      <p  class="login-box__sub">공간 예약 서비스에 오신 것을 환영합니다</p>

      <form class="login-form" @submit.prevent="handleLogin">
        <div class="form-field">
          <label>아이디</label>
          <input
            v-model="form.id"
            type="text"
            placeholder="아이디를 입력하세요"
            autocomplete="username"
            :class="{ 'is-error': errors.id }"
          />
          <span v-if="errors.id" class="form-field__error">{{ errors.id }}</span>
        </div>

        <div class="form-field">
          <label>비밀번호</label>
          <input
            v-model="form.password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            autocomplete="current-password"
            :class="{ 'is-error': errors.password }"
          />
          <span v-if="errors.password" class="form-field__error">{{ errors.password }}</span>
        </div>

        <p v-if="errorMsg" class="login-form__error">{{ errorMsg }}</p>

        <button type="submit" class="btn-submit" :disabled="loading">
          <span v-if="loading">로그인 중...</span>
          <span v-else>로그인</span>
        </button>
      </form>

      <div class="login-box__footer">
        <RouterLink to="/auth/join">회원가입</RouterLink>
        <span>·</span>
        <a href="#">아이디/비밀번호 찾기</a>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter, useRoute, RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router    = useRouter()
const route     = useRoute()
const authStore = useAuthStore()

const loading  = ref(false)
const errorMsg = ref('')
const form     = reactive({ id: '', password: '' })
const errors   = reactive({ id: '', password: '' })

function validate() {
  errors.id       = form.id       ? '' : '아이디를 입력해주세요.'
  errors.password = form.password ? '' : '비밀번호를 입력해주세요.'
  return !errors.id && !errors.password
}

async function handleLogin() {
  if (!validate()) return

  loading.value  = true
  errorMsg.value = ''

  try {
    await authStore.login(form.id, form.password)

    // 로그인 전 접근하려던 페이지로 이동
    const redirect = route.query.redirect || '/'
    router.push(redirect)

  } catch (err) {
    errorMsg.value = err.message || '로그인에 실패했습니다.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-subtle);
  padding: var(--space-6);
}
.login-box {
  width: 100%;
  max-width: 400px;
  background: var(--color-bg);
  border-radius: var(--radius-xl);
  padding: var(--space-12) var(--space-10);
  box-shadow: var(--shadow-lg);
}
.login-box__title { font-size: var(--font-size-2xl); font-weight: var(--font-weight-bold); margin: 0 0 var(--space-2); }
.login-box__sub   { color: var(--color-text-secondary); margin: 0 0 var(--space-8); }

.login-form { display: flex; flex-direction: column; gap: var(--space-5); }
.form-field { display: flex; flex-direction: column; gap: var(--space-2); }
.form-field label { font-size: var(--font-size-sm); font-weight: var(--font-weight-medium); }
.form-field input {
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  font-family: var(--font-family);
  transition: border-color var(--transition-fast);
}
.form-field input:focus {
  outline: none;
  border-color: var(--color-border-focus);
}
.form-field input.is-error { border-color: var(--color-error); }
.form-field__error { font-size: var(--font-size-xs); color: var(--color-error); }

.login-form__error {
  color: var(--color-error);
  font-size: var(--font-size-sm);
  text-align: center;
  margin: 0;
}
.btn-submit {
  margin-top: var(--space-2);
  padding: var(--space-4);
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  transition: background var(--transition-fast);
}
.btn-submit:hover:not(:disabled) { background: var(--color-primary-light); }
.btn-submit:disabled { opacity: .6; cursor: not-allowed; }

.login-box__footer {
  margin-top: var(--space-6);
  text-align: center;
  display: flex;
  justify-content: center;
  gap: var(--space-3);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}
.login-box__footer a { color: var(--color-primary); }
</style>
