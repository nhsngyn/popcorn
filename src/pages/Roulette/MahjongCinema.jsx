// src/pages/Roulette/MahjongCinema.jsx
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Assets
import casinoVideo from "../../assets/roulette/Casino.mp4";
import tableImg from "../../assets/roulette/table.png";
import front1Img from "../../assets/roulette/front1.png";
import front2Img from "../../assets/roulette/front2.png";
import front3Img from "../../assets/roulette/front3.png";
import front4Img from "../../assets/roulette/front4.png";
import backImg from "../../assets/roulette/back.png";

// ============================================
// 상수 정의 (Magic Numbers 제거)
// ============================================
const CONFIG = {
  // 카드 설정
  CARD_COUNT: 5,
  CARD_FLIP_DURATION: 600, // ms
  CARD_FLIP_BUFFER: 200, // ms (애니메이션 완료 여유 시간)
  
  // 비디오 속도 설정
  VIDEO_SPEED: {
    INTRO: 1.5,    // 초반 30%
    MIDDLE: 1.2,   // 중간 30-70%
    OUTRO: 1.5,    // 마무리 70-100%
  },
  VIDEO_SPEED_BREAKPOINTS: {
    INTRO_END: 0.3,
    MIDDLE_END: 0.7,
  },
  
  // GSAP 애니메이션 설정
  ANIMATION: {
    TABLE_SCALE_INITIAL: 1.3,
    TABLE_SCALE_FINAL: 1.0,
    TABLE_TRANSITION_DURATION: 2, // seconds
    CARD_CONTAINER_TRANSITION_DURATION: 1, // seconds
    CARD_APPEAR_DURATION: 0.4, // seconds
    CARD_APPEAR_OVERLAP: 0.3, // seconds
  },
};

const MahjongCinema = () => {
  // Refs
  const videoRef = useRef(null);
  const tableBgRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const cardRefs = useRef([]);

  // State
  const [flippedCards, setFlippedCards] = useState(Array(CONFIG.CARD_COUNT).fill(false));
  const [cardFrontImages, setCardFrontImages] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const [canInteract, setCanInteract] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  // 앞면 이미지 배열
  const frontImages = useRef([front1Img, front2Img, front3Img, front4Img]).current;

  // 카드 섞기 함수 (명확한 3단계 순서)
  const shuffleCards = () => {
    if (isShuffling) return;
    
    setIsShuffling(true);
    console.log("🔄 SHUFFLE 시작");
    
    const hasFlippedCards = flippedCards.some(card => card === true);
    console.log("1단계: 뒷면 확인 -", hasFlippedCards ? "앞면 있음" : "모두 뒷면");
    
    if (hasFlippedCards) {
      console.log("2단계: 모든 카드를 뒷면으로 뒤집는 중...");
      setFlippedCards(Array(CONFIG.CARD_COUNT).fill(false));
      
      const flipWaitTime = CONFIG.CARD_FLIP_DURATION + CONFIG.CARD_FLIP_BUFFER;
      setTimeout(() => {
        console.log("2단계 완료: 모든 카드가 뒷면이 됨");
        console.log("3단계: 패의 앞면 랜덤 재설정 중...");
        
        const randomFronts = Array(CONFIG.CARD_COUNT)
          .fill(null)
          .map(() => frontImages[Math.floor(Math.random() * frontImages.length)]);
        setCardFrontImages(randomFronts);
        console.log("3단계 완료: 새로운 패 할당됨");
        console.log("✅ SHUFFLE 완료");
        
        setIsShuffling(false);
      }, flipWaitTime);
    } else {
      console.log("2단계 스킵: 이미 모두 뒷면");
      console.log("3단계: 패의 앞면 랜덤 재설정 중...");
      
      const randomFronts = Array(CONFIG.CARD_COUNT)
        .fill(null)
        .map(() => frontImages[Math.floor(Math.random() * frontImages.length)]);
      setCardFrontImages(randomFronts);
      console.log("3단계 완료: 새로운 패 할당됨");
      console.log("✅ SHUFFLE 완료");
      
      setIsShuffling(false);
    }
  };

  useEffect(() => {
    // 각 카드에 랜덤 앞면 이미지 할당
    shuffleCards();

    // 비디오 재생 속도 동적 변화
    const video = videoRef.current;
    
    // 영상 재생 시간에 따라 속도 조절
    const handleTimeUpdate = () => {
      if (video) {
        const currentTime = video.currentTime;
        const duration = video.duration;

        if (duration) {
          const progress = currentTime / duration;
          const { INTRO_END, MIDDLE_END } = CONFIG.VIDEO_SPEED_BREAKPOINTS;
          const { INTRO, MIDDLE, OUTRO } = CONFIG.VIDEO_SPEED;

          if (progress < INTRO_END) {
            video.playbackRate = INTRO;
          } else if (progress >= INTRO_END && progress < MIDDLE_END) {
            video.playbackRate = MIDDLE;
          } else {
            video.playbackRate = OUTRO;
          }
        }
      }
    };

    if (video) {
      video.playbackRate = CONFIG.VIDEO_SPEED.INTRO;
      video.addEventListener("timeupdate", handleTimeUpdate);
    }

    // GSAP Context 생성
    const ctx = gsap.context(() => {
      // === 초기 상태 설정 ===
      gsap.set(tableBgRef.current, {
        scale: CONFIG.ANIMATION.TABLE_SCALE_INITIAL,
        opacity: 0,
      });

      gsap.set(cardsContainerRef.current, {
        opacity: 0,
        y: 50,
      });

      // 각 카드 초기 상태
      cardRefs.current.forEach((card, i) => {
        if (card) {
          gsap.set(card, {
            opacity: 0,
            y: 30,
            rotateY: 0,
          });
        }
      });
    });

    // === 비디오 종료 이벤트 핸들러 ===
    const handleVideoEnd = () => {
      console.log("Video ended - transitioning to table");
      setVideoEnded(true);

      // 비디오 최적화: 완전히 정지 및 언로드
      if (video) {
        video.pause();
        video.src = ""; // 메모리 해제
        video.load();
      }

      // GSAP 타임라인 생성
      const tl = gsap.timeline();

      // 1. 테이블 이미지 등장 (줌인하며 페이드인)
      tl.to(tableBgRef.current, {
        scale: CONFIG.ANIMATION.TABLE_SCALE_FINAL,
        opacity: 1,
        duration: CONFIG.ANIMATION.TABLE_TRANSITION_DURATION,
        ease: "power2.out",
      });

      // 2. 카드 컨테이너 등장
      tl.to(
        cardsContainerRef.current,
        {
          opacity: 1,
          y: 0,
          duration: CONFIG.ANIMATION.CARD_CONTAINER_TRANSITION_DURATION,
          ease: "power2.out",
        },
        "-=0.5"
      );

      // 3. 카드들이 순차적으로 등장 (왼쪽부터 오른쪽으로)
      cardRefs.current.forEach((card, i) => {
        if (card) {
          tl.to(
            card,
            {
              opacity: 1,
              y: 0,
              duration: CONFIG.ANIMATION.CARD_APPEAR_DURATION,
              ease: "back.out(1.5)",
            },
            `-=${i === 0 ? 0 : CONFIG.ANIMATION.CARD_APPEAR_OVERLAP}`
          );
        }
      });

      // 4. 인터랙션 활성화
      tl.call(() => {
        setCanInteract(true);
      });
    };

    if (video) {
      video.addEventListener("ended", handleVideoEnd);
      
      // 비디오 로드 확인
      video.addEventListener("loadeddata", () => {
        console.log("Video loaded successfully");
      });

      video.addEventListener("error", (e) => {
        console.error("Video error:", e);
      });
    }

    // Cleanup
    return () => {
      ctx.revert();
      if (video) {
        video.removeEventListener("ended", handleVideoEnd);
        video.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, []);

  // === 카드 뒤집기 핸들러 (토글 방식) ===
  const handleFlipCard = (index) => {
    if (!canInteract || isShuffling) return; // 섞는 중에는 클릭 불가

    console.log(`Toggling card ${index}`);

    // 상태 토글 (뒤집기/되돌리기)
    const newFlippedCards = [...flippedCards];
    newFlippedCards[index] = !newFlippedCards[index];
    setFlippedCards(newFlippedCards);
  };

  // === 비디오 스킵 핸들러 ===
  const handleSkipVideo = () => {
    const video = videoRef.current;
    if (video && !videoEnded) {
      video.pause();
      video.currentTime = video.duration; // 영상 끝으로 이동
      // ended 이벤트가 자동으로 발생함
    }
  };

  return (
    <div className="w-full h-screen bg-black overflow-hidden relative font-sans">
      {/* === LAYER 1: Intro Video (z-0) === */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000 ${
          videoEnded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <source src={casinoVideo} type="video/mp4" />
      </video>

      {/* === LAYER 2: Table Background Image (z-10) === */}
      <div
        ref={tableBgRef}
        className="absolute inset-0 w-full h-full z-10"
        style={{
          backgroundImage: `url(${tableImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* === LAYER 3: 왕가위 스타일 오버레이 (z-20) === */}
      {videoEnded && (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40 z-20 pointer-events-none" />
          
          {/* 네온 글로우 효과 */}
          <motion.div 
            animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.05, 1] }} 
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[15%] right-[20%] w-[500px] h-[500px] bg-red-600 rounded-full blur-[180px] opacity-20 z-20 pointer-events-none" 
          />
          <motion.div 
            animate={{ opacity: [0.08, 0.18, 0.08], scale: [1.05, 1, 1.05] }} 
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-[20%] left-[15%] w-[600px] h-[600px] bg-emerald-500 rounded-full blur-[180px] opacity-15 z-20 pointer-events-none" 
          />
        </>
      )}

      {/* === LAYER 4: 5개의 마작패 (가로 배치) (z-30) === */}
      <div
        ref={cardsContainerRef}
        className="absolute inset-0 flex items-center justify-center z-30 px-8"
      >
        <div className="flex gap-6 justify-center">
          {Array(CONFIG.CARD_COUNT)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                onClick={() => handleFlipCard(index)}
                className={`relative w-[160px] h-[224px] ${
                  canInteract ? "cursor-pointer" : "cursor-default"
                } transition-all duration-200`}
                style={{
                  perspective: "1200px",
                }}
              >
                {/* 카드 3D 컨테이너 */}
                <div
                  ref={(el) => (cardRefs.current[index] = el)}
                  className="relative w-full h-full hover:scale-105 z-10"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: flippedCards[index] ? "rotateY(180deg)" : "rotateY(0deg)",
                    transition: `transform ${CONFIG.CARD_FLIP_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`,
                  }}
                >
                  {/* 뒷면 (초기 상태) */}
                  <img
                    src={backImg}
                    alt={`Mahjong Back ${index + 1}`}
                    className="absolute inset-0 w-full h-full object-cover rounded-lg"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.6), 0 0 20px rgba(16,185,129,0.2)",
                    }}
                  />

                  {/* 앞면 (뒤집힌 상태 - 랜덤 이미지) */}
                  {cardFrontImages[index] && (
                    <img
                      src={cardFrontImages[index]}
                      alt={`Mahjong Front ${index + 1}`}
                      className="absolute inset-0 w-full h-full object-cover rounded-lg"
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        boxShadow: "0 10px 40px rgba(0,0,0,0.8), 0 0 30px rgba(220,38,38,0.4)",
                      }}
                    />
                  )}
                </div>

                {/* 클릭 가능 표시 (글로우) - 뒷면일 때 */}
                {canInteract && !flippedCards[index] && (
                  <div className="absolute inset-0 rounded-lg animate-pulse pointer-events-none">
                    <div className="absolute inset-0 rounded-lg border-2 border-emerald-500/30 blur-sm" />
                  </div>
                )}
                
                {/* 클릭 가능 표시 (글로우) - 앞면일 때 */}
                {canInteract && flippedCards[index] && (
                  <div className="absolute inset-0 rounded-lg animate-pulse pointer-events-none">
                    <div className="absolute inset-0 rounded-lg border-2 border-red-500/30 blur-sm" />
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>

      {/* === LAYER 5: 좌측 하단 - SKIP 버튼 (인트로 중) === */}
      {!videoEnded && (
        <div className="absolute bottom-12 left-12 z-50">
          <motion.button
            onClick={handleSkipVideo}
            className="group relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-600 to-yellow-900 rounded-lg border-2 border-yellow-400 shadow-[0_0_20px_rgba(234,179,8,0.5)] group-hover:shadow-[0_0_30px_rgba(234,179,8,0.8)] flex items-center justify-center transition-all duration-300">
              <span className="text-white text-2xl font-bold">⏭</span>
            </div>
            <span className="absolute -right-2 top-1/2 -translate-y-1/2 translate-x-full text-[10px] text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap tracking-wider pl-2">
              SKIP INTRO
            </span>
          </motion.button>
        </div>
      )}

      {/* === LAYER 6: 우측 하단 - SHUFFLE & EXIT 버튼들 === */}
      <div className="absolute bottom-12 right-12 z-50 flex flex-col gap-4">
        
        {/* SHUFFLE 버튼 (카드 인터랙션 활성화 후) */}
        {canInteract && (
          <motion.button
            onClick={shuffleCards}
            disabled={isShuffling}
            className="group relative"
            whileHover={{ scale: isShuffling ? 1 : 1.05 }}
            whileTap={{ scale: isShuffling ? 1 : 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
          >
            <div className={`w-16 h-16 bg-gradient-to-br from-emerald-600 to-emerald-900 rounded-lg border-2 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.5)] group-hover:shadow-[0_0_30px_rgba(16,185,129,0.8)] flex items-center justify-center transition-all duration-300 ${isShuffling ? 'opacity-50 cursor-not-allowed' : ''}`}>
              {isShuffling ? (
                <span className="text-white text-2xl animate-spin">🔄</span>
              ) : (
                <img 
                  src={backImg} 
                  alt="Shuffle" 
                  className="w-10 h-10 object-contain"
                />
              )}
            </div>
            <span className="absolute -left-2 top-1/2 -translate-y-1/2 -translate-x-full text-[10px] text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap tracking-wider pr-2">
              {isShuffling ? 'SHUFFLING...' : 'SHUFFLE'}
            </span>
          </motion.button>
        )}

        {/* EXIT 버튼 (항상 표시) */}
        <Link to="/" className="group relative">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: videoEnded ? 1.5 : 0.5 }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-900 rounded-lg border-2 border-red-400 shadow-[0_0_20px_rgba(239,68,68,0.5)] group-hover:shadow-[0_0_30px_rgba(239,68,68,0.8)] flex items-center justify-center transition-all duration-300">
              <img 
                src={front1Img} 
                alt="Exit" 
                className="w-10 h-10 object-contain"
              />
            </div>
            <span className="absolute -left-2 top-1/2 -translate-y-1/2 -translate-x-full text-[10px] text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap tracking-wider pr-2">
              EXIT
            </span>
          </motion.div>
        </Link>

      </div>

    </div>
  );
};

export default MahjongCinema;


