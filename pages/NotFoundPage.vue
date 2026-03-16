<template>
  <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:60vh;text-align:center;padding:40px">
    <div style="font-size:80px;margin-bottom:20px">🔍</div>
    <h1 style="font-size:48px;font-weight:bold;color:#1A3A5C;margin:0 0 10px">404</h1>
    <p style="color:#64748b;margin-bottom:30px">페이지를 찾을 수 없습니다</p>
    <RouterLink to="/" style="padding:12px 32px;background:#1A3A5C;color:white;border-radius:8px;font-weight:bold">홈으로 돌아가기</RouterLink>
  </div>
</template>
<script setup>import { RouterLink } from 'vue-router'</script>
