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
