# 🎬 POPCORN: Web Interaction Cinema

![Project Status](https://img.shields.io/badge/Status-Completed-success) ![Version](https://img.shields.io/badge/Version-1.0.0-blue) ![License](https://img.shields.io/badge/License-MIT-green)

> **"웹에서 경험하는 영화적 미장센"** > 3D 라이브러리 없이, 오직 2D 인터랙션 기술만으로 구현한 시네마틱 웹 전시 프로젝트

---

## 📖 프로젝트 소개

**POPCORN**은 영화 속 상징적인 미장센(Mise-en-scène)을 웹 기술로 재해석한 실험적인 인터랙티브 웹 사이트입니다.

홍콩 누아르의 **시각적 긴장감**, 다크 판타지의 **기묘한 공포**, 레트로 팝아트의 **경쾌한 리듬감**을 각각 다른 기술적 접근 방식으로 구현했습니다. Three.js 같은 무거운 3D 라이브러리에 의존하지 않고, **React 19와 GSAP, Canvas API**를 극한으로 활용하여 가볍지만 깊이 있는 공간감을 만들어내는 데 집중했습니다.

### 🔗 배포 주소
https://popcornlab.vercel.app/

---

## 🛠 기술 스택 (Tech Stack)

| 분류 | 기술 | 활용 목적 |
|:---:|:---|:---|
| **Core** | ![React](https://img.shields.io/badge/React_19-20232A?style=flat&logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white) | 최신 React 기능 활용 및 빠른 빌드 환경 구축 |
| **Animation** | ![GSAP](https://img.shields.io/badge/GSAP_3-88CE02?style=flat&logo=greensock&logoColor=white) ![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat&logo=framer&logoColor=white) | 복잡한 시퀀스 제어(GSAP) 및 선언적 UI 애니메이션(Framer) |
| **Graphic** | ![Canvas API](https://img.shields.io/badge/Canvas_API-E34F26?style=flat&logo=html5&logoColor=white) | 픽셀 단위 조작 및 스크래치 효과 구현 |
| **Styling** | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white) | 반응형 레이아웃 및 빠른 스타일링 |
| **Deploy** | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white) | CI/CD 및 호스팅 (예정) |

---

## 🎭 주요 기능 및 인터랙션 (Features)

### 1. Night in HK (홍콩 누아르)
> *"흔들리는 네온사인, 테이블 위 마작패의 긴장감"*

* **Concept**: 왕가위 감독 영화 특유의 스텝 프린팅 기법과 몽환적인 색감 재현
* **Tech Highlights**:
    * `<video>` 태그의 `playbackRate`를 동적으로 조절하여 시간의 왜곡 표현
    * **GSAP Context**를 활용한 마작패 셔플 및 3D Flip 애니메이션
    * 상태 관리를 통한 인터랙션 단계 제어 (Intro → Shuffle → Interaction)

### 2. Secret Door (다크 판타지)
> *"문 너머의 진실을 긁어내라, Beware the witch's lies"*

* **Concept**: 영화 '코렐라인'의 기괴하고 신비로운 '단추 구멍' 너머의 세계
* **Tech Highlights**:
    * **HTML5 Canvas API**의 `globalCompositeOperation = 'destination-out'`을 활용한 리얼타임 스크래치 구현
    * 픽셀 데이터(`getImageData`) 샘플링 최적화로 긁어낸 면적(%) 실시간 계산
    * 마우스/터치 좌표 보정을 통한 **커스텀 커서(바늘)** 트래킹 및 베지어 곡선 드로잉
    * Framer Motion을 활용한 핸드 헬드(Hand-held) 느낌의 패럴랙스 줌인 연출

### 3. Pop Diner (레트로 팝아트)
> *"80년대 다이너의 경쾌한 리듬, 쌓아올리는 달콤함"*

* **Concept**: 앤디 워홀 스타일의 팝아트 컬러와 미국 레트로 다이너 감성
* **Tech Highlights**:
    * **GSAP Physics** 느낌의 `squash & stretch` (찌그러짐) 애니메이션으로 타격감 구현
    * 화면 크기에 반응하는 좌표 계산 로직으로 정확한 충돌 판정 및 쌓기(Stacking) 구현
    * 오차 범위 허용(Tolerance) 알고리즘을 통한 게임 난이도 밸런싱

---

## ⚡️ 기술적 도전과 해결 (Troubleshooting)

### 1. Canvas 성능 최적화 (Scratch)
* **문제**: `mousemove` 이벤트마다 전체 픽셀을 검사(`getImageData`)하여 진행률을 체크하니 프레임 드랍 발생.
* **해결**: 드로잉 중에는 캔버스에 그리기만 수행하고, **`mouseup` (드래그 종료) 시점에만 픽셀 연산을 수행**하도록 로직 분리. 픽셀 검사 시에도 전체가 아닌 `stride` 기법(64픽셀 건너뛰기)을 적용하여 연산량을 획기적으로 감소시킴.

### 2. 동영상과 DOM의 이질감 제거 (Mahjong)
* **문제**: 인트로 영상이 끝나고 인터랙티브 DOM 요소로 전환될 때 깜빡임이나 이질감 발생.
* **해결**: 영상 종료(`onEnded`) 시점에 맞춰 **GSAP Timeline**을 실행, 배경 이미지를 영상의 마지막 프레임과 정확히 일치시키고 `opacity`와 `scale`을 미세하게 교차(Cross-fade)시켜 끊김 없는 사용자 경험 제공.

### 3. 모바일 터치 대응 (Common)
* **문제**: 모바일 환경에서 스크래치나 드래그 시 브라우저 스크롤이 같이 발생하거나 터치 딜레이 발생.
* **해결**: CSS `touch-action: none` 적용 및 React의 `PointerEvent`를 활용하여 마우스와 터치 이벤트를 통합 처리.

---

## 📂 폴더 구조 (Directory Structure)

```bash
src/
├── pages/
│   ├── Lobby/          # 메인 게이트 (3D 카드형 메뉴)
│   ├── Mahjong/        # 마작 인터랙션 (Video + GSAP)
│   ├── Scratch/        # 스크래치 인터랙션 (Canvas API)
│   └── Donut/          # 도넛 게임 (Physics Logic)
├── components/         # 재사용 가능한 UI 컴포넌트
├── assets/             # 최적화된 이미지 및 비디오 리소스
└── styles/             # Tailwind 설정 및 글로벌 스타일

```

---

## 🚀 실행 방법 (Getting Started)

```bash
# 1. 저장소 클론
git clone [https://github.com/your-username/popcorn.git](https://github.com/your-username/popcorn.git)

# 2. 의존성 설치
npm install

# 3. 개발 서버 실행
npm run dev

# 4. 빌드 및 프리뷰
npm run build
npm run preview

```

---

## 📝 License

This project is licensed under the [MIT](https://www.google.com/search?q=LICENSE) License.

---

<p align="center">
Made with 🍿 by <b>Noh Sung Yeon</b>
</p>
