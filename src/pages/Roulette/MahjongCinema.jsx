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

const MahjongCinema = () => {
  // Refs
  const videoRef = useRef(null);
  const tableBgRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const cardRefs = useRef([]);

  // State
  const [flippedCards, setFlippedCards] = useState(Array(5).fill(false));
  const [cardFrontImages, setCardFrontImages] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const [canInteract, setCanInteract] = useState(false);

  // 앞면 이미지 배열
  const frontImages = useRef([front1Img, front2Img, front3Img, front4Img]).current;

  useEffect(() => {
    // 각 카드에 랜덤 앞면 이미지 할당
    const randomFronts = Array(5)
      .fill(null)
      .map(() => frontImages[Math.floor(Math.random() * frontImages.length)]);
    setCardFrontImages(randomFronts);

    // 비디오 재생 속도 동적 변화
    const video = videoRef.current;
    
    // 영상 재생 시간에 따라 속도 조절
    const handleTimeUpdate = () => {
      if (video) {
        const currentTime = video.currentTime;
        const duration = video.duration;

        if (duration) {
          const progress = currentTime / duration;

          // 초반 (0~30%): 1.5배속
          if (progress < 0.3) {
            video.playbackRate = 1.5;
          }
          // 중간 (30~70%): 1.2배속
          else if (progress >= 0.3 && progress < 0.7) {
            video.playbackRate = 1.2;
          }
          // 마무리 (70~100%): 1.5배속
          else {
            video.playbackRate = 1.5;
          }
        }
      }
    };

    if (video) {
      // 초기 속도 1.5배
      video.playbackRate = 1.5;
      video.addEventListener("timeupdate", handleTimeUpdate);
    }

    // GSAP Context 생성
    const ctx = gsap.context(() => {
      // === 초기 상태 설정 ===
      gsap.set(tableBgRef.current, {
        scale: 1.3,
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
        scale: 1.0,
        opacity: 1,
        duration: 2,
        ease: "power2.out",
      });

      // 2. 카드 컨테이너 등장
      tl.to(
        cardsContainerRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1,
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
              duration: 0.4,
              ease: "back.out(1.5)",
            },
            `-=${i === 0 ? 0 : 0.3}` // 0.3초씩 겹치며 등장
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
    if (!canInteract) return;

    console.log(`Toggling card ${index}`);

    // 상태 토글 (뒤집기/되돌리기)
    const newFlippedCards = [...flippedCards];
    newFlippedCards[index] = !newFlippedCards[index];
    setFlippedCards(newFlippedCards);
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
          {Array(5)
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
                    transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
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

      {/* === LAYER 5: 피들스틱 레버 (Exit Button) === */}
      <Link to="/" className="absolute bottom-12 right-12 z-50 group">
        <div className="relative flex flex-col items-center">
          {/* 레버 손잡이 */}
          <motion.div 
            className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-900 rounded-full border-2 border-red-400 shadow-[0_0_20px_rgba(239,68,68,0.5)] flex items-center justify-center mb-1 cursor-pointer"
            whileHover={{ scale: 1.15, boxShadow: "0 0 30px rgba(239,68,68,0.8)" }}
            whileTap={{ scale: 0.95, y: 8 }}
          >
            <span className="text-white text-xl font-bold">✕</span>
          </motion.div>
          
          {/* 레버 막대 */}
          <motion.div 
            className="w-2 h-20 bg-gradient-to-b from-neutral-600 to-neutral-800 rounded-full shadow-lg relative"
            whileHover={{ scaleY: 1.05 }}
          >
            <div className="absolute inset-y-0 left-0 w-[1px] bg-white/30" />
          </motion.div>
          
          {/* 레버 받침대 */}
          <div className="w-8 h-4 bg-gradient-to-b from-neutral-700 to-neutral-900 rounded-t-sm shadow-xl border-t border-neutral-600" />
          
          {/* 텍스트 레이블 */}
          <span className="mt-2 text-[10px] text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap tracking-wider">
            EXIT
          </span>
        </div>
      </Link>

    </div>
  );
};

export default MahjongCinema;


