<template><div class="container" style="padding:40px 0"><RouterLink to="/my">← 마이페이지로</RouterLink><h2 style="margin:20px 0">예약 내역</h2><MyPage /></div></template>
<script setup>
import MyPage from './MyPage.vue'
import { RouterLink } from 'vue-router'
</script>
