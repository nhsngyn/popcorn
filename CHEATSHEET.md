# ⚡ Web Interaction Cinema – 빠른 참조 치트시트

## 🚀 빠른 시작

```bash
# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프리뷰
npm run preview
```

**로컬 주소**: http://localhost:5173

---

## 📂 주요 파일 위치

```
popcorn/
├── src/
│   ├── pages/
│   │   ├── Lobby/index.jsx           # 메인 로비
│   │   ├── Roulette/
│   │   │   ├── index.jsx             # 룰렛 페이지
│   │   │   └── RouletteMachine.jsx   # 룰렛 로직 ⚠️
│   │   ├── Scratch/
│   │   │   ├── index.jsx             # 스크래치 페이지
│   │   │   └── ScratchCanvas.jsx     # 스크래치 로직 ✅
│   │   └── Donut/
│   │       ├── index.jsx             # 도넛 페이지
│   │       └── DonutGame.jsx         # 도넛 로직 ⚠️
│   └── assets/
│       ├── roulette/  ← 에셋 필요 ❌
│       ├── donut/     ← 에셋 필요 ❌
│       └── scratch/   ← 에셋 완비 ✅
└── 문서/
    ├── README.md           # 프로젝트 개요
    ├── PROJECT_GUIDE.md    # 상세 가이드
    ├── ASSET_GUIDE.md      # 에셋 제작 가이드
    ├── ROADMAP.md          # 개발 로드맵
    └── CHEATSHEET.md       # 이 파일
```

**범례**:
- ✅ 완성
- ⚠️ 에셋 필요 (로직은 준비됨)
- ❌ 에셋 없음

---

## 🎨 필요한 에셋 (우선순위 순)

### 1. 룰렛 (3개)
```
src/assets/roulette/
├── roulette-wheel.png   (1000x1000px, 투명 배경)
├── neon-bg-1.png        (1920x1080px, 붉은 네온)
└── neon-bg-2.png        (1920x1080px, 초록 네온)
```

### 2. 도넛 (6개)
```
src/assets/donut/
├── donut-1.png          (300x300px, 핑크)
├── donut-2.png          (300x300px, 초코)
├── donut-3.png          (300x300px, 민트)
├── donut-4.png          (300x300px, 스트로베리)
├── donut-5.png          (300x300px, 레인보우)
└── donut-shadow.png     (400x100px, 타원 그림자)
```

**→  자세한 사양은 [ASSET_GUIDE.md](./ASSET_GUIDE.md) 참고**

---

## 🛠️ 주요 기술 스택

| 기술 | 용도 | 버전 |
|------|------|------|
| React | UI 프레임워크 | 19.2.0 |
| GSAP | 애니메이션 | 3.13.0 |
| Framer Motion | 선언적 애니메이션 | 12.23.24 |
| React Router | 라우팅 | 7.9.6 |
| Tailwind CSS | 스타일링 | 3.4.18 |
| Vite | 빌드 툴 | 7.2.5 |

---

## 🎯 각 인터랙션 핵심 코드

### 1. 룰렛 (GSAP 회전)

```javascript
import gsap from "gsap";

const handleSpin = () => {
  const totalRotation = 360 * 5 + Math.random() * 360;
  
  gsap.to(rouletteRef.current, {
    rotation: totalRotation,
    duration: 5,
    ease: "power4.out", // 천천히 감속
    onUpdate: () => {
      // 속도에 따라 blur 적용
      const velocity = Math.abs(gsap.getProperty(rouletteRef.current, "rotation") - prevRotation);
      prevRotation = gsap.getProperty(rouletteRef.current, "rotation");
      // blur 로직
    }
  });
};
```

---

### 2. 스크래치 (Canvas destination-out)

```javascript
const ctx = canvas.getContext("2d");

// 스크래치 모드
ctx.globalCompositeOperation = "destination-out";

// 그리기
ctx.beginPath();
ctx.arc(x, y, 50, 0, Math.PI * 2);
ctx.fill();

// 진행률 체크
const imageData = ctx.getImageData(0, 0, width, height);
const pixels = imageData.data;
let transparentPixels = 0;
for (let i = 3; i < pixels.length; i += 64) {
  if (pixels[i] === 0) transparentPixels++;
}
const percent = (transparentPixels / (pixels.length / 64)) * 100;
```

---

### 3. 도넛 (Squash & Stretch)

```javascript
import gsap from "gsap";

// 착지 시 애니메이션
gsap.timeline()
  .to(donutRef.current, {
    scaleY: 0.7,  // 눌림
    scaleX: 1.3,  // 퍼짐
    duration: 0.1
  })
  .to(donutRef.current, {
    scaleY: 1,
    scaleX: 1,
    duration: 0.3,
    ease: "elastic.out(1, 0.3)" // 통통 튀는 느낌
  });
```

---

## 🎨 주요 컬러 팔레트

### 룰렛 (홍콩 누아르)
```css
--roulette-red: #8B0000;      /* 다크 레드 */
--roulette-black: #1a1a1a;    /* 검은색 */
--neon-red: #ff0000;          /* 네온 레드 */
--neon-green: #00ff88;        /* 네온 그린 */
--bg-dark: #120808;           /* 배경 어두운 빨강 */
```

### 스크래치 (다크 판타지)
```css
--scratch-purple: #6b46c1;    /* 보라 */
--scratch-blue: #2563eb;      /* 파랑 */
--scratch-dark: #222;         /* 어두운 배경 */
```

### 도넛 (레트로 팝아트)
```css
--donut-pink: #ff6b6b;        /* 핫핑크 */
--donut-mint: #4fd1c5;        /* 민트 */
--donut-yellow: #fbbf24;      /* 옐로우 */
--donut-white: #ffffff;       /* 화이트 */
```

---

## 📐 주요 사이즈 가이드

### 룰렛
- 룰렛 판: `500x500px` (화면 표시)
- 원본 이미지: `1000x1000px`
- 섹터 개수: 12개 (30도씩)
- 커버 구멍: 60도 (±30도)

### 스크래치
- 캔버스: 전체 화면 (`100vw x 100vh`)
- 손 프레임: 초기 `scale(0.7)` → 최종 `scale(7.5)`
- 브러시 크기: `80px`
- 완료 기준: `30%` 투명

### 도넛
- 도넛 크기: `96px x 64px` (화면 표시)
- 원본 이미지: `300x300px`
- 이동 범위: `-200px ~ +200px`
- 쌓기 간격: `60px`
- 충돌 허용 오차: `50px`

---

## ⚡ 성능 최적화 팁

### 1. GSAP 최적화
```javascript
// GPU 가속 활성화
gsap.set(element, { 
  force3D: true,
  willChange: "transform" 
});

// 애니메이션 후 정리
gsap.to(element, {
  x: 100,
  onComplete: () => {
    gsap.set(element, { clearProps: "willChange" });
  }
});
```

### 2. Canvas 최적화
```javascript
// 고해상도 디스플레이 대응
const dpr = window.devicePixelRatio || 1;
canvas.width = width * dpr;
canvas.height = height * dpr;
ctx.scale(dpr, dpr);

// requestAnimationFrame 활용
let rafId;
const draw = () => {
  // 그리기 로직
  rafId = requestAnimationFrame(draw);
};
// 정리
cancelAnimationFrame(rafId);
```

### 3. 이미지 최적화
```bash
# WebP 변환
sharp input.png -o output.webp --webp-quality 80

# PNG 압축
pngquant --quality=65-80 input.png
```

---

## 🐛 자주 발생하는 이슈

### 1. GSAP 애니메이션이 끊김
**원인**: GPU 가속 미사용  
**해결**:
```javascript
gsap.to(element, { 
  x: 100, 
  force3D: true 
});
```

### 2. Canvas 스크래치가 느림
**원인**: 매 프레임마다 getImageData 호출  
**해결**:
```javascript
// 마우스 업 시에만 체크
const stopDrawing = () => {
  isDrawing.current = false;
  checkRevealPercentage(); // 여기서만 호출
};
```

### 3. 이미지가 로드되지 않음
**원인**: import 경로 오류  
**해결**:
```javascript
// ❌ 잘못된 경로
import donut from "../assets/donut.png";

// ✅ 올바른 경로
import donut from "../../assets/donut/donut-1.png";
```

### 4. 모바일에서 터치가 안됨
**원인**: touch-action CSS 누락  
**해결**:
```css
.canvas {
  touch-action: none; /* 또는 Tailwind: touch-none */
}
```

---

## 📱 반응형 브레이크포인트

```javascript
// Tailwind 기준
sm: 640px   // 스마트폰 가로
md: 768px   // 태블릿
lg: 1024px  // 노트북
xl: 1280px  // 데스크탑
2xl: 1536px // 대형 모니터

// 사용 예시
<div className="w-full md:w-1/2 lg:w-1/3">
```

---

## 🔗 유용한 링크

### 공식 문서
- [GSAP Docs](https://gsap.com/docs/v3/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)

### 에셋 사이트
- [Unsplash](https://unsplash.com/) - 무료 사진
- [Freepik](https://www.freepik.com/) - 무료 일러스트
- [TinyPNG](https://tinypng.com/) - 이미지 압축

### 배포
- [Vercel](https://vercel.com/) - 추천
- [Netlify](https://www.netlify.com/)
- [GitHub Pages](https://pages.github.com/)

---

## ✅ 현재 할 일 (우선순위)

1. **에셋 제작** (가장 중요!)
   - [ ] 룰렛 판 이미지
   - [ ] 네온 배경 2장
   - [ ] 도넛 5종 + 그림자

2. **에셋 통합**
   - [ ] `RouletteMachine.jsx`에 이미지 import
   - [ ] `DonutGame.jsx`에 이미지 import

3. **로직 개선**
   - [ ] 룰렛 결과 계산 정교화
   - [ ] 도넛 충돌 감지 개선

4. **테스트**
   - [ ] 모바일 터치 테스트
   - [ ] 성능 측정 (60fps)

---

## 🎬 프로젝트 목표 (다시 한번!)

**"2D만으로 영화적 몰입감을 주는 웹 인터랙션"**

- 🎡 **룰렛**: 홍콩 누아르의 긴장감
- 🧵 **스크래치**: 다크 판타지의 촉각적 몰입
- 🍩 **도넛**: 레트로 팝아트의 리듬감

**→ 사용자가 "짧은 영화관 3편"을 본 것 같은 경험**

---

**마지막 업데이트**: 2025.12.29  
**다음 작업**: 에셋 제작 → [ASSET_GUIDE.md](./ASSET_GUIDE.md) 참고

