# 공간 예약 — Vue 프론트엔드

## 지금 바로 화면 보는 방법

### 방법 1. 로컬 실행 (Node.js 필요)

```bash
# Node.js 설치 확인 — 없으면 https://nodejs.org 에서 LTS 설치
node -v

# 의존성 설치 + 실행
npm install
npm run dev

# → 브라우저에서 http://localhost:5173 열기
```

**테스트 계정**
- ID: `demo@space.com`
- PW: `1234`

---

### 방법 2. Vercel 배포 (무료, URL 공유 가능)

**방법 2-1. Vercel CLI**
```bash
npm install -g vercel
npm run build
vercel --prod
# → https://xxx.vercel.app 링크 자동 생성
```

**방법 2-2. GitHub 연동 (추천)**
1. GitHub에 이 폴더 push
2. https://vercel.com 접속 → GitHub 로그인
3. "New Project" → 저장소 선택
4. Framework: **Vite** 자동 감지
5. Deploy 클릭
6. → `https://프로젝트명.vercel.app` 완성

---

### 방법 3. GitHub Pages

```bash
npm install --save-dev gh-pages

# package.json scripts에 추가:
# "deploy": "vite build && gh-pages -d dist"

npm run deploy
# → https://계정명.github.io/저장소명
```

---

## 현재 상태

| 화면 | 상태 |
|---|---|
| 홈 (배너 + 추천 공간 + 이벤트) | ✅ Mock 완료 |
| 공간 목록 + 필터 + 검색 | ✅ Mock 완료 |
| 공간 상세 + 예약 패널 | ✅ Mock 완료 |
| 로그인 | ✅ Mock 완료 |
| 마이페이지 (예약/결제/찜) | ✅ Mock 완료 |

## 백엔드 연결 시

`src/api/services.js` 한 줄만 교체:

```js
// 현재 (Mock)
export * from '@/mock/services.js'

// 백엔드 연결 후
export * from './real-services.js'
```

## 디자인 커스텀

`src/assets/styles/main.css` 상단 CSS 변수만 교체:

```css
:root {
  --color-primary: #1A3A5C;   ← 메인 색상
  --color-accent:  #F0A500;   ← 포인트 색상
  --font-family:   'Pretendard'; ← 폰트
  ...
}
```

피그마 시안 → Claude → CSS 변수 자동 추출 가능
