# 🎬 비디오 최적화 가이드

## 📹 현재 상태

**파일 위치**: `src/assets/scratch/candy.mp4`

---

## ⚡ 최적화 필수!

현재 비디오가 너무 크면 로딩 시간이 길어집니다.  
**목표 파일 크기: 1.5MB 이하**

---

## 🛠️ 최적화 방법

### 1️⃣ FFmpeg 설치

#### Mac
```bash
brew install ffmpeg
```

#### Windows
```bash
# Chocolatey 사용
choco install ffmpeg

# 또는 https://ffmpeg.org/download.html 에서 다운로드
```

---

### 2️⃣ 비디오 최적화 (MP4)

```bash
cd src/assets/scratch

# 기본 최적화 (720p, CRF 28)
ffmpeg -i candy.mp4 \
  -vf "scale=1280:720" \
  -c:v libx264 \
  -crf 28 \
  -preset slow \
  -movflags +faststart \
  -an \
  candy_optimized.mp4

# 더 작게 (540p, CRF 30)
ffmpeg -i candy.mp4 \
  -vf "scale=960:540" \
  -c:v libx264 \
  -crf 30 \
  -preset slow \
  -movflags +faststart \
  -an \
  candy_small.mp4
```

**옵션 설명:**
- `-vf "scale=1280:720"`: 720p 해상도 (Full HD보다 작음)
- `-crf 28`: 화질 (18=최고, 28=좋음, 35=보통)
- `-preset slow`: 압축 품질 (느리지만 파일 작음)
- `-movflags +faststart`: 웹 스트리밍 최적화
- `-an`: 오디오 제거 (배경 비디오는 소리 불필요)

---

### 3️⃣ WebM 변환 (더 작은 파일!)

```bash
# WebM 변환 (MP4보다 30% 작음)
ffmpeg -i candy.mp4 \
  -c:v libvpx-vp9 \
  -crf 35 \
  -b:v 0 \
  -vf "scale=1280:720" \
  -an \
  candy.webm

# 더 작게
ffmpeg -i candy.mp4 \
  -c:v libvpx-vp9 \
  -crf 40 \
  -b:v 0 \
  -vf "scale=960:540" \
  -an \
  candy_small.webm
```

---

### 4️⃣ 파일 크기 확인

```bash
# Mac/Linux
ls -lh candy*.mp4 candy*.webm

# Windows
dir candy*.mp4 candy*.webm
```

**목표:**
- ✅ 1.5MB 이하: 완벽!
- ⚠️ 1.5-3MB: 괜찮음 (약간 느림)
- ❌ 3MB 이상: 더 최적화 필요

---

## 📊 최적화 예시

| 설정 | 해상도 | CRF | 예상 크기 (5초) | 품질 |
|------|--------|-----|----------------|------|
| 원본 | 1920x1080 | - | 5-10MB | 최고 |
| 최적화 1 | 1280x720 | 28 | 1-2MB | 좋음 ✅ |
| 최적화 2 | 960x540 | 30 | 500KB-1MB | 보통 ✅ |
| WebM 1 | 1280x720 | 35 | 800KB-1.5MB | 좋음 ✅ |
| WebM 2 | 960x540 | 40 | 400-800KB | 보통 ✅ |

---

## 🎯 추천 설정

### 데스크탑 (1920x1080 이상)
```bash
ffmpeg -i candy.mp4 \
  -vf "scale=1280:720" \
  -c:v libx264 \
  -crf 28 \
  -preset slow \
  -movflags +faststart \
  -an \
  candy.mp4
```

### 모바일 대응
- 768px 이하는 자동으로 이미지(PNG) 사용
- 비디오 로드 실패 시 자동 폴백

---

## 🔧 적용 방법

### 1. 최적화된 비디오로 교체

```bash
# 원본 백업
mv candy.mp4 candy_original.mp4

# 최적화된 파일을 candy.mp4로 이름 변경
mv candy_optimized.mp4 candy.mp4
```

### 2. WebM 추가 (선택사항)

WebM을 추가하면 브라우저가 자동으로 더 작은 파일 선택:

```javascript
<video>
  <source src={candyBgVideo} type="video/webm" />
  <source src={candyBgVideoMp4} type="video/mp4" />
</video>
```

---

## 📈 성능 비교

### Before (최적화 전)
```
파일 크기: 5MB
로딩 시간 (4G): 5초
로딩 시간 (WiFi): 1초
```

### After (최적화 후)
```
파일 크기: 1.2MB
로딩 시간 (4G): 1.2초 ✅
로딩 시간 (WiFi): 0.3초 ✅
```

---

## 🎨 화질 vs 파일 크기

### CRF 값 가이드

| CRF | 화질 | 파일 크기 | 추천 |
|-----|------|----------|------|
| 18 | 최고 | 매우 큼 | ❌ |
| 23 | 우수 | 큼 | ⚠️ |
| 28 | 좋음 | 보통 | ✅ |
| 30 | 괜찮음 | 작음 | ✅ |
| 35 | 보통 | 매우 작음 | ⚠️ |

**추천: CRF 28-30** (화질과 크기의 균형)

---

## 🚀 빠른 최적화 (한 줄 명령어)

```bash
# 이것만 실행하세요!
ffmpeg -i candy.mp4 -vf "scale=1280:720" -c:v libx264 -crf 28 -preset slow -movflags +faststart -an candy_opt.mp4 && mv candy.mp4 candy_backup.mp4 && mv candy_opt.mp4 candy.mp4
```

---

## ✅ 체크리스트

최적화 후 확인:

- [ ] 파일 크기 1.5MB 이하
- [ ] 브라우저에서 재생 확인
- [ ] 모바일에서 자동으로 이미지 사용 확인
- [ ] 자동 재생 동작 확인
- [ ] 루프 재생 확인

---

## 🐛 문제 해결

### 비디오가 재생되지 않아요
```javascript
// 브라우저 콘솔 확인
// "Video autoplay failed" 메시지가 보이면
// → 자동으로 이미지로 폴백됨 (정상)
```

### 파일이 너무 커요
```bash
# CRF 값을 높이세요 (30 → 32)
ffmpeg -i candy.mp4 -crf 32 -vf "scale=960:540" candy_smaller.mp4
```

### 화질이 너무 안 좋아요
```bash
# CRF 값을 낮추세요 (30 → 26)
ffmpeg -i candy.mp4 -crf 26 -vf "scale=1280:720" candy_better.mp4
```

---

## 📱 모바일 최적화

현재 구현:
- ✅ 768px 이하는 자동으로 PNG 사용
- ✅ 비디오 로드 실패 시 PNG 폴백
- ✅ `playsInline` 속성으로 iOS 대응
- ✅ `muted` 속성으로 자동재생 허용

---

## 🎬 최종 권장 사항

1. **FFmpeg로 최적화** (CRF 28, 720p)
2. **파일 크기 1.5MB 이하 확인**
3. **브라우저 테스트**
4. **모바일 테스트** (자동으로 이미지 사용되는지)

---

**마지막 업데이트**: 2025.12.29  
**현재 상태**: 비디오 구현 완료, 최적화 필요

