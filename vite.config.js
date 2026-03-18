import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },

  css: {
    preprocessorOptions: {
      scss: {
        // loadPaths: SCSS 가 'variables', 'mixins' 를 경로 없이 찾을 수 있게 설정
        loadPaths: [resolve(__dirname, 'src/assets/styles')],
        // additionalData: Vue 컴포넌트 <style lang="scss"> 에 자동 주입
        // → main.scss 는 직접 @use 하므로 여기선 컴포넌트 전용
        additionalData: `@use 'variables' as *;\n@use 'mixins' as *;\n`
      }
    }
  },

  server: {
    port: 5173,

    // 개발 중 CORS 없이 Spring Boot API 호출
    // Vue: axios.get('/api/spaces') → 실제로는 http://localhost:8080/api/spaces 로 전달
    proxy: {
      '/api': {
        target:      'http://localhost:8080',
        changeOrigin: true
      },
      '/files': {
        target:      'http://localhost:8080',
        changeOrigin: true
      }
    }
  },

  build: {
    outDir: '../backend/src/main/resources/static',  // 빌드 결과를 Spring Boot static으로 출력
    emptyOutDir: true
  }
})
