# 📚 Web Interaction Cinema – 문서 인덱스

## 🎯 문서 가이드

프로젝트의 모든 문서를 한눈에 볼 수 있는 인덱스입니다.  
**목적에 맞는 문서를 선택**하여 읽어주세요.

---

## 📖 문서 목록

### 1. [README.md](./README.md) 
**"프로젝트가 뭔가요?"**

- 프로젝트 개요 및 목적
- 3개 인터랙션 소개
- 기술 스택 및 목표
- 설치 및 실행 방법

**읽어야 할 사람**: 
- ✅ 처음 프로젝트를 접하는 사람
- ✅ 프로젝트 소개가 필요한 사람
- ✅ GitHub에서 프로젝트를 발견한 사람

**예상 읽기 시간**: 3분

---

### 2. [PROJECT_GUIDE.md](./PROJECT_GUIDE.md)
**"어떻게 개발하나요?"**

- 현재 진행 상황 (완료/진행 중)
- 각 인터랙션 구현 가이드
- 기술적 포인트 및 예제 코드
- 문제 해결 방법

**읽어야 할 사람**:
- ✅ 실제로 코드를 작성하는 개발자
- ✅ 구현 디테일이 궁금한 사람
- ✅ 기술적 의사결정 배경이 궁금한 사람

**예상 읽기 시간**: 15분

---

### 3. [ASSET_GUIDE.md](./ASSET_GUIDE.md)
**"이미지는 어떻게 만드나요?"**

- 필요한 에셋 목록 (룰렛, 도넛)
- 각 에셋의 사양 (크기, 포맷, 컬러)
- 제작 도구 및 무료 사이트
- 최적화 방법 (WebP 변환, 압축)

**읽어야 할 사람**:
- ✅ 디자이너 또는 에셋 제작자
- ✅ AI 이미지 생성을 활용하는 사람
- ✅ 이미지 최적화가 필요한 사람

**예상 읽기 시간**: 10분

---

### 4. [ROADMAP.md](./ROADMAP.md)
**"언제까지 뭘 해야 하나요?"**

- 4주 개발 일정
- 주차별 마일스톤
- 진행률 트래킹
- 배포 계획

**읽어야 할 사람**:
- ✅ 프로젝트 매니저
- ✅ 전체 일정이 궁금한 사람
- ✅ 다음 할 일을 확인하고 싶은 사람

**예상 읽기 시간**: 8분

---

### 5. [CHEATSHEET.md](./CHEATSHEET.md)
**"빠르게 참고할 게 뭐가 있나요?"**

- 주요 명령어 (dev, build, deploy)
- 파일 위치 및 구조
- 핵심 코드 스니펫
- 자주 발생하는 이슈 해결법

**읽어야 할 사람**:
- ✅ 빠른 참조가 필요한 개발자
- ✅ 특정 코드 예제를 찾는 사람
- ✅ 에러를 해결하고 싶은 사람

**예상 읽기 시간**: 5분

---

## 🗺️ 문서 읽기 순서 (추천)

### 시나리오 1: "프로젝트를 처음 접했어요"
```
1. README.md (프로젝트 이해)
   ↓
2. ROADMAP.md (전체 그림 파악)
   ↓
3. CHEATSHEET.md (빠른 시작)
```

---

### 시나리오 2: "개발을 시작하려고 해요"
```
1. PROJECT_GUIDE.md (구현 가이드)
   ↓
2. CHEATSHEET.md (코드 참조)
   ↓
3. 코딩 시작! 🚀
```

---

### 시나리오 3: "에셋을 만들어야 해요"
```
1. ASSET_GUIDE.md (에셋 사양 확인)
   ↓
2. AI 도구 또는 디자인 툴 사용
   ↓
3. 최적화 (WebP 변환, 압축)
```

---

### 시나리오 4: "문제가 생겼어요"
```
1. CHEATSHEET.md (자주 발생하는 이슈)
   ↓
2. PROJECT_GUIDE.md (문제 해결 섹션)
   ↓
3. GitHub Issues 검색
```

---

## 📂 프로젝트 파일 구조 (요약)

```
popcorn/
├── 📄 문서 (이 폴더)
│   ├── README.md           ← 프로젝트 개요
│   ├── PROJECT_GUIDE.md    ← 개발 가이드
│   ├── ASSET_GUIDE.md      ← 에셋 제작
│   ├── ROADMAP.md          ← 개발 일정
│   ├── CHEATSHEET.md       ← 빠른 참조
│   └── DOCS_INDEX.md       ← 이 파일
│
├── 🎨 소스 코드
│   └── src/
│       ├── pages/          ← 4개 페이지
│       ├── components/     ← 공통 컴포넌트
│       ├── assets/         ← 이미지 에셋
│       └── styles/         ← 글로벌 스타일
│
└── ⚙️ 설정 파일
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── eslint.config.js
```

---

## 🎯 현재 상태 (한눈에 보기)

### ✅ 완료된 것
- React + Vite + GSAP 환경 구축
- 4개 페이지 라우팅 완료
- Scratch 인터랙션 95% 완성
- 모든 문서 작성 완료

### 🚧 진행 중
- 룰렛 에셋 제작 (0%)
- 도넛 에셋 제작 (0%)

### ⏳ 다음 할 일
1. **에셋 제작** (최우선!)
2. 에셋 통합
3. 로직 개선
4. 테스트 및 배포

---

## 🔗 빠른 링크

### 외부 리소스
- [GSAP 공식 문서](https://gsap.com/docs/v3/)
- [Framer Motion 공식 문서](https://www.framer.com/motion/)
- [Tailwind CSS 공식 문서](https://tailwindcss.com/)
- [React Router 공식 문서](https://reactrouter.com/)

### 에셋 사이트
- [Unsplash](https://unsplash.com/) - 무료 고품질 사진
- [Freepik](https://www.freepik.com/) - 무료 일러스트/벡터
- [TinyPNG](https://tinypng.com/) - 이미지 압축

### AI 이미지 생성
- [Midjourney](https://www.midjourney.com/)
- [DALL-E 3](https://openai.com/dall-e-3)
- [Stable Diffusion](https://stability.ai/)

---

## 💡 팁: 문서 검색하기

### 키워드로 찾기

| 찾고 싶은 내용 | 문서 | 섹션 |
|--------------|------|------|
| 프로젝트 목적 | README.md | 프로젝트 목적 |
| 기술 스택 | README.md | 사용 기술 스택 |
| 룰렛 구현 방법 | PROJECT_GUIDE.md | 룰렛 인터랙션 |
| 도넛 에셋 사양 | ASSET_GUIDE.md | 도넛 쌓기 에셋 |
| 개발 일정 | ROADMAP.md | 전체 일정 |
| GSAP 코드 예제 | CHEATSHEET.md | 핵심 코드 |
| 에러 해결 | CHEATSHEET.md | 자주 발생하는 이슈 |
| 배포 방법 | ROADMAP.md | Week 4: 배포 |

---

## 📞 도움이 필요하신가요?

### 문서를 읽어도 모르겠어요
1. CHEATSHEET.md의 "자주 발생하는 이슈" 확인
2. PROJECT_GUIDE.md의 "문제 해결" 섹션 확인
3. GitHub Issues 검색

### 에셋 제작이 막막해요
1. ASSET_GUIDE.md의 "빠른 에셋 생성 도구" 확인
2. AI 이미지 생성 도구 활용 (Midjourney, DALL-E)
3. 무료 에셋 사이트에서 다운로드 후 수정

### 코드가 작동하지 않아요
1. `npm install` 재실행
2. `npm run dev` 재시작
3. 브라우저 캐시 삭제 (Cmd+Shift+R)
4. CHEATSHEET.md의 "자주 발생하는 이슈" 확인

---

## 🎬 프로젝트 비전 (다시 한번!)

**"2D만으로 영화적 몰입감을 주는 웹 인터랙션"**

- 🎡 룰렛: 홍콩 누아르의 시각적 긴장감
- 🧵 스크래치: 다크 판타지의 촉각적 몰입
- 🍩 도넛: 레트로 팝아트의 리듬감

**→ 사용자가 "짧은 영화관 3편"을 본 것 같은 경험 제공**

---

## ✨ 시작하기

```bash
# 1. 개발 서버 실행
npm run dev

# 2. 브라우저에서 확인
# http://localhost:5173

# 3. 문서 읽기
# 목적에 맞는 문서를 선택하세요!
```

---

**마지막 업데이트**: 2025.12.29  
**프로젝트 진행률**: 40%  
**다음 마일스톤**: 에셋 제작 완료

