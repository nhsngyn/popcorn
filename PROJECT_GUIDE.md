# 📋 Web Interaction Cinema – 프로젝트 진행 가이드

## 📊 현재 진행 상황 (2025.12.29)

### ✅ 완료된 작업

#### 1. 개발 환경 구축
- [x] React 19 + Vite 환경 설정
- [x] GSAP 3.13 설치
- [x] Framer Motion 설치
- [x] React Router 설정
- [x] Tailwind CSS 설정
- [x] 커스텀 폰트 (Coraline.ttf) 추가

#### 2. 페이지 구조
- [x] 4개 페이지 라우팅 완료 (`/`, `/roulette`, `/scratch`, `/donut`)
- [x] Lobby 페이지 - 인트로 애니메이션 + 3개 카드 선택 UI
- [x] 각 페이지 기본 레이아웃 및 분위기 구현

#### 3. Scratch 인터랙션 (가장 완성도 높음)
- [x] 6개 이미지 에셋 완비
  - `candy.png` - 초기 배경
  - `handstone.png` - 손 프레임
  - `moon.png` - 스크래치 커버
  - `tunnel.png` - 최종 드러나는 세계
  - `brushtexture.png`, `needle.png` - 보조 에셋
- [x] Canvas API 기반 스크래치 로직 구현
- [x] 패럴랙스 효과 (손 프레임 줌인 애니메이션)
- [x] 70% 달성 시 완전 오픈 로직
- [x] Exit 버튼

---

## 🚧 진행 중 / 필요한 작업

### 1. 🎡 Roulette 인터랙션 (우선순위: 높음)

#### 필요한 에셋
```
src/assets/roulette/
├── roulette-wheel.png      # 룰렛 판 (12개 섹터, 투명 배경)
├── roulette-cover.png       # 피자 조각 모양 커버
├── roulette-pointer.png     # 포인터/바늘
├── neon-bg-1.png           # 네온 사인 배경 1
├── neon-bg-2.png           # 네온 사인 배경 2
└── table-texture.png       # 술집 테이블 텍스처
```

#### 구현해야 할 기능
- [ ] `RouletteMachine.jsx` 핵심 로직
  - [ ] 룰렛 회전 애니메이션 (GSAP `power4.out` easing)
  - [ ] 속도 감속 효과 + blur 효과
  - [ ] 랜덤 결과 선택 로직
  - [ ] 결과 확정 후 "Exit" 버튼 표시
- [ ] SVG Mask 또는 CSS clip-path로 커버 구현
- [ ] 네온 배경 레이어 블러 처리

#### 기술적 포인트
```javascript
// GSAP 회전 예시
gsap.to(rouletteRef.current, {
  rotation: 360 * 5 + finalAngle, // 5바퀴 + 최종 각도
  duration: 5,
  ease: "power4.out",
  onUpdate: () => {
    // 속도에 따라 blur 적용
  }
});
```

---

### 2. 🍩 Donut 쌓기 인터랙션 (우선순위: 높음)

#### 필요한 에셋
```
src/assets/donut/
├── donut-1.png             # 도넛 종류 1 (핑크 프로스팅)
├── donut-2.png             # 도넛 종류 2 (초코 프로스팅)
├── donut-3.png             # 도넛 종류 3 (민트 프로스팅)
├── donut-4.png             # 도넛 종류 4 (스트로베리)
├── donut-5.png             # 도넛 종류 5 (레인보우)
├── donut-shadow.png        # 도넛 그림자
└── diner-bg.png            # 다이너 배경 (선택사항)
```

#### 구현해야 할 기능
- [ ] `DonutGame.jsx` 핵심 로직
  - [ ] 도넛 좌우 이동 애니메이션
  - [ ] 클릭 시 낙하 애니메이션
  - [ ] 착지 시 squash/stretch 효과 (GSAP)
  - [ ] 그림자 확대 효과
  - [ ] 쌓인 도넛 위치 계산 (충돌 감지)
  - [ ] 5개 성공 시 "PERFECT!" 메시지
- [ ] 다음 도넛 미리보기 UI
- [ ] 실패 시 게임 오버 로직

#### 기술적 포인트
```javascript
// Squash/Stretch 예시
gsap.timeline()
  .to(donutRef.current, {
    scaleY: 0.7,
    scaleX: 1.3,
    duration: 0.1
  })
  .to(donutRef.current, {
    scaleY: 1,
    scaleX: 1,
    duration: 0.2,
    ease: "elastic.out(1, 0.3)"
  });
```

---

## 🎨 에셋 제작 가이드

### 룰렛 에셋 요구사항
- **룰렛 판**: 1000x1000px, PNG, 투명 배경
- **컬러**: 붉은색/푸른색 네온 느낌
- **섹터**: 12개 (30도씩)
- **스타일**: 홍콩 누아르, 빈티지 카지노

### 도넛 에셋 요구사항
- **크기**: 각 300x300px, PNG, 투명 배경
- **스타일**: 팝아트, 과장된 색감
- **컬러**: 핫핑크, 민트그린, 초코, 스트로베리, 레인보우
- **디테일**: 프로스팅 텍스처, 스프링클 장식

### 에셋 최적화
```bash
# WebP 변환 (권장)
npm install -g sharp-cli
sharp input.png -o output.webp

# 또는 이미지 압축
npm install -g imagemin-cli
imagemin input.png --plugin=pngquant > output.png
```

---

## 📅 Week 1 체크리스트 (Asset First 전략)

### Day 1-2: 에셋 확보
- [ ] 룰렛 판 + 커버 이미지 제작/수급
- [ ] 도넛 5종 + 그림자 PNG 제작
- [ ] 네온 사인 배경 이미지 수급
- [ ] 모든 에셋을 적절한 폴더에 배치

### Day 3-4: 룰렛 구현
- [ ] `RouletteMachine.jsx` 회전 로직
- [ ] 커버 마스크 효과
- [ ] 결과 표시 UI

### Day 5-6: 도넛 구현
- [ ] `DonutGame.jsx` 이동/낙하 로직
- [ ] 충돌 감지 및 쌓기
- [ ] Squash/Stretch 애니메이션

### Day 7: 최적화 & 테스트
- [ ] 모바일 반응형 테스트
- [ ] 성능 최적화 (60fps 유지)
- [ ] 크로스 브라우저 테스트

---

## 🔧 개발 팁

### GSAP 성능 최적화
```javascript
// will-change 속성 활용
gsap.set(element, { willChange: "transform" });

// 애니메이션 후 정리
gsap.to(element, {
  x: 100,
  onComplete: () => {
    gsap.set(element, { clearProps: "willChange" });
  }
});
```

### Canvas 최적화
```javascript
// 고해상도 디스플레이 대응
const dpr = window.devicePixelRatio || 1;
canvas.width = width * dpr;
canvas.height = height * dpr;
ctx.scale(dpr, dpr);
```

### 이미지 Lazy Loading
```javascript
// React에서 동적 import
const DonutImage = lazy(() => import('./DonutImage'));
```

---

## 📚 참고 자료

### GSAP 공식 문서
- [GSAP Easing Visualizer](https://gsap.com/docs/v3/Eases)
- [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger)

### Canvas API
- [MDN Canvas Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)
- [Compositing Operations](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation)

### 영감 참고
- 홍콩 누아르: 왕가위 감독 영화 (중경삼림, 화양연화)
- 다크 판타지: 코렐라인 (2009)
- 레트로 팝아트: 80's 다이너 광고, 앤디 워홀

---

## 🎯 최종 목표

**"사용자가 3개의 짧은 영화관을 체험한 것 같은 느낌"**

각 인터랙션은 독립적인 하나의 '씬'으로,  
영화적 연출과 웹 기술의 조화를 통해  
**2D만으로도 깊은 몰입감**을 선사하는 것이 목표입니다.

---

## 📞 문제 해결

### 자주 발생하는 이슈

#### 1. GSAP 애니메이션이 끊김
```javascript
// 해결: force3D 활용
gsap.to(element, {
  x: 100,
  force3D: true // GPU 가속
});
```

#### 2. Canvas 스크래치가 느림
```javascript
// 해결: requestAnimationFrame 활용
let isDrawing = false;
const draw = () => {
  if (isDrawing) {
    // 실제 그리기 로직
    requestAnimationFrame(draw);
  }
};
```

#### 3. 이미지 로딩이 느림
```javascript
// 해결: 이미지 프리로드
const preloadImages = (urls) => {
  return Promise.all(
    urls.map(url => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = resolve;
        img.src = url;
      });
    })
  );
};
```

---

**마지막 업데이트**: 2025.12.29  
**다음 마일스톤**: 룰렛 & 도넛 에셋 확보 → 핵심 로직 구현

