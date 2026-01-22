# POPCORN: Web Interaction Cinema

![Status](https://img.shields.io/badge/Status-Completed-success)
![Platform](https://img.shields.io/badge/Platform-Desktop_Optimized-blueviolet)
![Tech](https://img.shields.io/badge/No_WebGL-Canvas_API_Only-orange)

> **"웹에서 경험하는 영화적 미장센"**
> 무거운 3D 라이브러리 없이, 오직 2D 기술(Canvas & React)로 구현한 데스크톱 최적화 인터랙티브 전시

---

## 📽️ 프로젝트 소개

**POPCORN**은 영화 속 상징적인 미장센(Mise-en-scène)을 웹 기술로 재해석한 인터랙티브 웹 사이트입니다.

일반적으로 화려한 시각 효과를 위해 Three.js를 사용하지만, 이 프로젝트는 "브라우저 네이티브 기술의 깊이 있는 활용"을 목표로 삼았습니다. 마우스 커서의 움직임에 반응하는 섬세한 물리 효과와 픽셀 조작을 통해, **데스크톱 환경에서 몰입감 높은 시네마틱 경험**을 제공하는 데 집중했습니다.

### 🔗 배포 주소 (Live Demo)
[https://popcornlab.vercel.app/](https://popcornlab.vercel.app/)
*(Desktop Chrome/Whale 환경에 최적화되어 있습니다)*

---

## 🛠️ 기술 스택 (Tech Stack)

| 분류 | 기술 | 활용 목적 |
|:---:|:---|:---|
| **Core** | React 19, Vite | 최신 React 기능 활용 및 빠른 빌드 환경 구축 |
| **Animation** | GSAP 3, Framer Motion | 복잡한 시퀀스 제어 및 선언적 UI 애니메이션 |
| **Graphic** | **Canvas API** | 픽셀 단위 조작(Pixel Manipulation) 및 물리 효과 구현 |
| **Styling** | Tailwind CSS | 반응형 레이아웃 및 빠른 스타일링 |
| **Deploy** | Vercel | CI/CD 및 정적 호스팅 |

---

## ⚡️ 핵심 기술적 도전 (Technical Challenges)

### 1. Canvas Pixel Manipulation 최적화
* **Challenge**: 스크래치 효과 구현 시, 긁어낸 면적(%)을 계산하기 위해 `getImageData`로 약 200만 개의 픽셀(FHD 기준)을 매 프레임 순회하여 심각한 성능 저하 발생.
* **Solution**:
    * **Stride Sampling 알고리즘**: 전체 픽셀을 검사하는 대신 `stride += 64` (16픽셀 간격) 로직을 적용. 샘플링 대상을 **전체의 1/16로 축소하여 연산 비용을 약 94% 절감**하면서도 오차 범위 내의 정확도 확보.
    * **Logic Separation**: 시각적 드로잉(Render)은 `mousemove`에서, 고비용 계산(Calculate)은 `mouseup` 시점에만 수행하도록 스레드 점유 분리.

### 2. Video & DOM Seamless Transition
* **Challenge**: 인트로 비디오 종료 후 인터랙티브 DOM으로 전환되는 순간, 미세한 로딩 텀과 깜빡임(Flicker)으로 인해 몰입감이 깨지는 문제.
* **Solution**:
    * **Frame Synchronization**: 비디오의 마지막 프레임과 완벽히 동일한 고해상도 이미지를 DOM 레이어 최상단에 미리 로드.
    * **GSAP Timeline**: 영상 종료(`onEnded`) 트리거와 동시에 DOM 레이어의 `opacity`와 `scale`을 정교하게 교차(Cross-fade)시켜, 사용자가 전환 시점을 인지할 수 없는 **Seamless Transition** 달성.

### 3. Desktop-First Interaction Design
* **Strategy**: 작은 모바일 화면보다는 넓은 데스크톱 화면에서의 몰입감을 우선순위로 두는 **'선택과 집중'** 전략 채택.
* **Implementation**: 마우스 좌표(`clientX/Y`)를 기반으로 실시간 반응하는 커스텀 커서와 호버 인터랙션을 구현하여, 단순 웹사이트가 아닌 **'PC 게임' 같은 조작감**을 부여.

---

## 📂 폴더 구조 (Directory Structure)

```bash
src/
├── pages/
│   ├── Lobby/          # 메인 게이트 (3D 카드형 메뉴)
│   ├── Mahjong/        # 마작 인터랙션 (Video + GSAP)
│   ├── Scratch/        # 스크래치 인터랙션 (Canvas API + Optimization)
│   └── Donut/          # 도넛 게임 (Physics Logic)
├── components/         # 재사용 가능한 UI 컴포넌트
├── assets/             # 최적화된 이미지 및 비디오 리소스
└── styles/             # Tailwind 설정 및 글로벌 스타일

---

##  실행 방법 (Getting Started)

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

##  License

This project is licensed under the [MIT](https://www.google.com/search?q=LICENSE) License.

---

<p align="center">
Made with 🍿 by <b>Noh Sung Yeon</b>
</p>
