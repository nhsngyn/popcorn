# 🎨 Web Interaction Cinema – 에셋 제작 가이드

## 📋 목차
1. [룰렛 인터랙션 에셋](#1-룰렛-인터랙션-에셋)
2. [도넛 쌓기 인터랙션 에셋](#2-도넛-쌓기-인터랙션-에셋)
3. [에셋 최적화 가이드](#3-에셋-최적화-가이드)
4. [폴더 구조](#4-폴더-구조)
5. [빠른 에셋 생성 도구](#5-빠른-에셋-생성-도구)

---

## 1. 룰렛 인터랙션 에셋

### 📂 필요한 파일
```
src/assets/roulette/
├── roulette-wheel.png      # 룰렛 판 (필수)
├── roulette-cover.png       # 피자 조각 커버 (선택)
├── roulette-pointer.png     # 포인터/바늘 (선택)
├── neon-bg-1.png           # 네온 배경 1
├── neon-bg-2.png           # 네온 배경 2
└── table-texture.png       # 테이블 텍스처 (선택)
```

### 🎨 룰렛 판 (roulette-wheel.png)

**사양:**
- 크기: `1000x1000px`
- 포맷: PNG (투명 배경)
- 섹터: 12개 (각 30도)
- 컬러: 붉은색(#8B0000) / 검은색(#1a1a1a) 교차

**디자인 요구사항:**
- 홍콩 누아르 느낌의 빈티지 카지노 스타일
- 각 섹터에 텍스트 공간 확보 (중앙에서 70% 지점)
- 테두리: 골드 또는 다크 레드 (#5c3a3a)
- 중앙 원형 구멍 (지름 150px, 버튼 공간)

**제안 텍스트:**
```
JACKPOT, LOSE, x2, LOSE, BONUS, LOSE, x5, LOSE, 
RETRY, LOSE, x3, LOSE
```

**Figma/Photoshop 팁:**
1. 1000x1000 캔버스 생성
2. 중앙 원형 가이드 (반지름 450px)
3. 12개 섹터를 30도씩 회전하며 배치
4. 각 섹터에 그라데이션 적용 (중앙→외곽 어둡게)
5. 텍스트는 Radial 배치 (Arc Tool 활용)

---

### 🌃 네온 배경 (neon-bg-1.png, neon-bg-2.png)

**사양:**
- 크기: `1920x1080px` (Full HD)
- 포맷: PNG 또는 WebP
- 컬러: 붉은색/에메랄드 그린 네온

**디자인 요구사항:**
- 흐릿한 홍콩 간판 느낌 (한자 텍스트 포함)
- 블러 효과 적용 (Gaussian Blur 50-100px)
- 빛 번짐 효과 (Glow)
- 어두운 배경 위에 네온 불빛

**추천 한자 텍스트:**
```
重慶 (충칭)
森林 (삼림)
夜市 (야시장)
酒吧 (술집)
```

**무료 에셋 사이트:**
- Unsplash: "hong kong neon"
- Pexels: "neon signs night"
- Pixabay: "cyberpunk neon"

---

## 2. 도넛 쌓기 인터랙션 에셋

### 📂 필요한 파일
```
src/assets/donut/
├── donut-1.png             # 핑크 프로스팅 도넛
├── donut-2.png             # 초코 프로스팅 도넛
├── donut-3.png             # 민트 프로스팅 도넛
├── donut-4.png             # 스트로베리 도넛
├── donut-5.png             # 레인보우 도넛
├── donut-shadow.png        # 도넛 그림자
└── diner-bg.png            # 다이너 배경 (선택)
```

### 🍩 도넛 이미지 (donut-1~5.png)

**사양:**
- 크기: `300x300px`
- 포맷: PNG (투명 배경)
- 비율: 정원형 도넛 (중앙 구멍 포함)
- 스타일: 팝아트, 과장된 색감

**각 도넛 컬러 가이드:**

| 파일명 | 프로스팅 색상 | 스프링클 | Hex 코드 |
|--------|--------------|---------|----------|
| donut-1.png | 핫핑크 | 화이트/레드 | #FF69B4 |
| donut-2.png | 초콜릿 | 화이트/브라운 | #8B4513 |
| donut-3.png | 민트그린 | 화이트/핑크 | #98FF98 |
| donut-4.png | 스트로베리 | 화이트/레드 | #FF6B9D |
| donut-5.png | 레인보우 | 멀티컬러 | 그라데이션 |

**디자인 요구사항:**
- 도넛 베이스: 황금빛 도우 (#F4A460)
- 프로스팅: 두툼하고 윤기나는 질감
- 스프링클: 작고 알록달록한 장식
- 그림자: 도넛 하단에 자연스러운 그림자
- 하이라이트: 프로스팅 상단에 빛 반사

**Figma/Illustrator 팁:**
1. 원형 도넛 베이스 그리기 (Donut Shape)
2. 프로스팅 레이어 (상단 70% 커버)
3. Gradient Overlay (윤기 효과)
4. 스프링클 Scatter Brush 활용
5. Drop Shadow (Soft, 20px blur)

---

### 🌑 도넛 그림자 (donut-shadow.png)

**사양:**
- 크기: `400x100px`
- 포맷: PNG (투명 배경)
- 스타일: 타원형 그림자, 중앙이 진하고 외곽은 흐림

**디자인 요구사항:**
- 검은색 (#000000) 타원
- Gaussian Blur 30px
- 투명도: 중앙 60%, 외곽 0%
- 도넛 착지 시 GSAP로 확대/축소 애니메이션

---

## 3. 에셋 최적화 가이드

### 📦 PNG 최적화

**TinyPNG (웹 기반)**
```
https://tinypng.com/
→ 드래그 앤 드롭으로 70% 압축
```

**ImageOptim (Mac 전용)**
```bash
brew install imageoptim
imageoptim src/assets/**/*.png
```

**pngquant (CLI)**
```bash
# 설치
brew install pngquant

# 최적화
pngquant --quality=65-80 --ext .png --force src/assets/donut/*.png
```

---

### 🌐 WebP 변환 (권장)

**Sharp (Node.js)**
```bash
npm install sharp-cli -g

# PNG → WebP 변환
sharp input.png -o output.webp --webp-quality 80
```

**일괄 변환 스크립트**
```bash
# convert-to-webp.sh
for file in src/assets/**/*.png; do
  sharp "$file" -o "${file%.png}.webp" --webp-quality 80
done
```

**React에서 WebP 사용**
```jsx
import donut1 from "../../assets/donut/donut-1.webp";

<img src={donut1} alt="Donut" />
```

---

### 📊 최적화 목표

| 에셋 타입 | 원본 크기 | 최적화 후 | 포맷 |
|----------|----------|----------|------|
| 룰렛 판 | ~500KB | <150KB | WebP |
| 도넛 이미지 | ~200KB | <50KB | WebP |
| 네온 배경 | ~1MB | <300KB | WebP |
| 그림자 | ~100KB | <30KB | PNG |

---

## 4. 폴더 구조

```
src/assets/
├── donut/
│   ├── donut-1.png (또는 .webp)
│   ├── donut-2.png
│   ├── donut-3.png
│   ├── donut-4.png
│   ├── donut-5.png
│   ├── donut-shadow.png
│   └── diner-bg.png (선택)
│
├── roulette/
│   ├── roulette-wheel.png
│   ├── roulette-cover.png (선택)
│   ├── roulette-pointer.png (선택)
│   ├── neon-bg-1.png
│   ├── neon-bg-2.png
│   └── table-texture.png (선택)
│
├── scratch/ (이미 완료)
│   ├── candy.png
│   ├── handstone.png
│   ├── moon.png
│   ├── tunnel.png
│   ├── brushtexture.png
│   └── needle.png
│
└── lobby/
    └── (선택사항)
```

---

## 5. 빠른 에셋 생성 도구

### 🤖 AI 이미지 생성 (추천)

**Midjourney**
```
Prompt 예시:
"retro 80s donut with pink frosting and sprinkles, 
pop art style, high contrast, isolated on transparent background, 
top view, studio lighting --v 6 --ar 1:1"
```

**DALL-E 3**
```
Prompt 예시:
"A vintage casino roulette wheel, 
hong kong noir style, red and black sectors, 
golden edges, top view, PNG transparent background"
```

**Stable Diffusion**
```
Prompt 예시:
"neon signs in hong kong street at night, 
blurred bokeh effect, cinematic lighting, 
red and green neon glow, moody atmosphere"
```

---

### 🎨 무료 디자인 도구

**Figma (웹 기반)**
- 무료 플랜으로 충분
- 벡터 기반 도넛 제작 가능
- Export PNG with Transparent Background

**Canva (웹 기반)**
- 템플릿 활용 가능
- "Donut Illustration" 검색
- Pro 플랜 14일 무료 체험

**Photopea (웹 기반 Photoshop)**
- https://www.photopea.com/
- PSD 파일 편집 가능
- 무료, 설치 불필요

---

### 📚 무료 에셋 사이트

**일러스트/PNG**
- Freepik: https://www.freepik.com/
- Vecteezy: https://www.vecteezy.com/
- Flaticon: https://www.flaticon.com/

**사진/텍스처**
- Unsplash: https://unsplash.com/
- Pexels: https://www.pexels.com/
- Pixabay: https://pixabay.com/

**네온 사인 특화**
- Unsplash 검색어: "hong kong neon signs"
- Pexels 검색어: "cyberpunk neon lights"

---

## ✅ 체크리스트

### 룰렛 에셋
- [ ] roulette-wheel.png (1000x1000px, 투명 배경)
- [ ] neon-bg-1.png (1920x1080px)
- [ ] neon-bg-2.png (1920x1080px)
- [ ] 모든 이미지 WebP 변환 완료
- [ ] 파일 크기 확인 (각 150KB 이하)

### 도넛 에셋
- [ ] donut-1.png (핑크, 300x300px)
- [ ] donut-2.png (초코, 300x300px)
- [ ] donut-3.png (민트, 300x300px)
- [ ] donut-4.png (스트로베리, 300x300px)
- [ ] donut-5.png (레인보우, 300x300px)
- [ ] donut-shadow.png (400x100px)
- [ ] 모든 이미지 WebP 변환 완료
- [ ] 파일 크기 확인 (각 50KB 이하)

---

## 🚀 다음 단계

에셋 준비가 완료되면:

1. **import 문 추가**
```jsx
// src/pages/Donut/DonutGame.jsx
import donut1 from "../../assets/donut/donut-1.webp";
import donut2 from "../../assets/donut/donut-2.webp";
// ...
```

2. **이미지 배열 생성**
```jsx
const donutImages = [donut1, donut2, donut3, donut4, donut5];
```

3. **컴포넌트에서 사용**
```jsx
<img src={donutImages[currentDonut]} alt="Donut" />
```

---

**마지막 업데이트**: 2025.12.29  
**다음 마일스톤**: 에셋 제작 → import → 테스트

