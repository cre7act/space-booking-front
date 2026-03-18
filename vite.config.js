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
        // 절대 경로로 주입 → @/ 별칭 없이 어디서든 변수/믹스인 사용 가능
        additionalData: (content, filename) => {
          const scssDir = resolve(__dirname, 'src/assets/styles').replace(/\\/g, '/')
          // _variables, _mixins 자기 자신에겐 주입 생략 (순환 방지)
          if (filename.includes('_variables') || filename.includes('_mixins')) {
            return content
          }
          return `@import "${scssDir}/variables";\n@import "${scssDir}/mixins";\n${content}`
        }
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
