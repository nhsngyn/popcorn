// src/pages/Mahjong/MahjongCinema.jsx
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Assets (WebP 변환했어도 파일명이 .png라면 그대로 유지)
import casinoVideo from "../../assets/roulette/Casino.mp4";
import tableImg from "../../assets/roulette/table.png";
import front1Img from "../../assets/roulette/front1.png";
import front2Img from "../../assets/roulette/front2.png";
import front3Img from "../../assets/roulette/front3.png";
import front4Img from "../../assets/roulette/front4.png";
import backImg from "../../assets/roulette/back.png";

const CONFIG = {
  CARD_COUNT: 5,
  CARD_FLIP_DURATION: 600,
  CARD_FLIP_BUFFER: 200,
  VIDEO_SPEED: { INTRO: 1.5, MIDDLE: 1.2, OUTRO: 1.5 },
  VIDEO_SPEED_BREAKPOINTS: { INTRO_END: 0.3, MIDDLE_END: 0.7 },
  ANIMATION: {
    TABLE_SCALE_INITIAL: 1.3,
    TABLE_SCALE_FINAL: 1.0,
    TABLE_TRANSITION_DURATION: 2,
    CARD_CONTAINER_TRANSITION_DURATION: 1,
    CARD_APPEAR_DURATION: 0.4,
    CARD_APPEAR_OVERLAP: 0.3,
  },
};

const MahjongCinema = () => {
  const videoRef = useRef(null);
  const tableBgRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const cardRefs = useRef([]);

  const [flippedCards, setFlippedCards] = useState(Array(CONFIG.CARD_COUNT).fill(false));
  const [cardFrontImages, setCardFrontImages] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const [canInteract, setCanInteract] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  const frontImages = useRef([front1Img, front2Img, front3Img, front4Img]).current;

  // 카드 섞기 함수 (오류 수정됨)
  const shuffleCards = () => {
    if (isShuffling) return;
    setIsShuffling(true);
    
    const flipWaitTime = CONFIG.CARD_FLIP_DURATION + CONFIG.CARD_FLIP_BUFFER;
    const hasFlippedCards = flippedCards.some(card => card === true);
    
    const generateNewFronts = () => Array(CONFIG.CARD_COUNT)
      .fill(null)
      .map(() => frontImages[Math.floor(Math.random() * frontImages.length)]);

    if (hasFlippedCards) {
      setFlippedCards(Array(CONFIG.CARD_COUNT).fill(false));
      setTimeout(() => {
        setCardFrontImages(generateNewFronts());
        setIsShuffling(false);
      }, flipWaitTime);
    } else {
      setCardFrontImages(generateNewFronts());
      setIsShuffling(false);
    }
  };

  useEffect(() => {
    setCardFrontImages(Array(CONFIG.CARD_COUNT).fill(null).map(() => frontImages[Math.floor(Math.random() * frontImages.length)]));

    const video = videoRef.current;
    const handleTimeUpdate = () => {
      if (!video) return;
      const progress = video.currentTime / video.duration;
      const { INTRO_END, MIDDLE_END } = CONFIG.VIDEO_SPEED_BREAKPOINTS;
      video.playbackRate = progress < INTRO_END ? CONFIG.VIDEO_SPEED.INTRO : 
                           progress < MIDDLE_END ? CONFIG.VIDEO_SPEED.MIDDLE : CONFIG.VIDEO_SPEED.OUTRO;
    };

    if (video) {
      video.playbackRate = CONFIG.VIDEO_SPEED.INTRO;
      video.addEventListener("timeupdate", handleTimeUpdate);
    }

    const ctx = gsap.context(() => {
      gsap.set(tableBgRef.current, { scale: CONFIG.ANIMATION.TABLE_SCALE_INITIAL, opacity: 0 });
      gsap.set(cardsContainerRef.current, { opacity: 0, y: 50 });
      cardRefs.current.forEach((card) => {
        if (card) gsap.set(card, { opacity: 0, y: 30 });
      });
    });

    const handleVideoEnd = () => {
      setVideoEnded(true);
      if (video) {
        video.pause();
        video.src = "";
        video.load();
      }

      const tl = gsap.timeline();
      tl.to(tableBgRef.current, {
        scale: CONFIG.ANIMATION.TABLE_SCALE_FINAL,
        opacity: 1,
        duration: CONFIG.ANIMATION.TABLE_TRANSITION_DURATION,
        ease: "power2.out",
      })
      .to(cardsContainerRef.current, {
        opacity: 1, y: 0,
        duration: CONFIG.ANIMATION.CARD_CONTAINER_TRANSITION_DURATION,
        ease: "power2.out",
      }, "-=0.5")
      .to(cardRefs.current, {
        opacity: 1, y: 0,
        duration: CONFIG.ANIMATION.CARD_APPEAR_DURATION,
        stagger: CONFIG.ANIMATION.CARD_APPEAR_OVERLAP,
        ease: "back.out(1.5)",
      })
      .call(() => setCanInteract(true));
    };

    if (video) video.addEventListener("ended", handleVideoEnd);

    return () => {
      ctx.revert();
      if (video) {
        video.removeEventListener("ended", handleVideoEnd);
        video.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, [frontImages]);

  const handleFlipCard = (index) => {
    if (!canInteract || isShuffling) return;
    const newFlippedCards = [...flippedCards];
    newFlippedCards[index] = !newFlippedCards[index];
    setFlippedCards(newFlippedCards);
  };

  const handleSkipVideo = () => {
    if (videoRef.current && !videoEnded) {
      videoRef.current.currentTime = videoRef.current.duration;
    }
  };

  return (
    <div className="w-full h-screen bg-black overflow-hidden relative font-sans">
      <video
        ref={videoRef}
        autoPlay muted playsInline
        preload="auto"
        className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000 ${
          videoEnded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <source src={casinoVideo} type="video/mp4" />
      </video>

      <div
        ref={tableBgRef}
        className="absolute inset-0 w-full h-full z-10"
        style={{ backgroundImage: `url(${tableImg})`, backgroundSize: "cover", backgroundPosition: "center" }}
      />

      {videoEnded && (
        <div className="pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40 z-20" />
          <motion.div 
            animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.05, 1] }} 
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[15%] right-[20%] w-[500px] h-[500px] bg-red-600 rounded-full blur-[180px] z-20" 
          />
          <motion.div 
            animate={{ opacity: [0.08, 0.18, 0.08], scale: [1.05, 1, 1.05] }} 
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-[20%] left-[15%] w-[600px] h-[600px] bg-emerald-500 rounded-full blur-[180px] z-20" 
          />
        </div>
      )}

      {/* === 카드 영역 === */}
      <div ref={cardsContainerRef} className="absolute inset-0 flex items-center justify-center z-30 px-8">
        <div className="flex gap-6 justify-center">
          {flippedCards.map((isFlipped, index) => (
            <div
              key={index}
              onClick={() => handleFlipCard(index)}
              className={`relative w-[160px] h-[224px] ${canInteract ? "cursor-pointer" : "cursor-default"} transition-all duration-200`}
              style={{ perspective: "1200px" }}
            >
              <div
                ref={(el) => (cardRefs.current[index] = el)}
                className="relative w-full h-full hover:scale-105 z-10"
                style={{
                  transformStyle: "preserve-3d",
                  transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  transition: `transform ${CONFIG.CARD_FLIP_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`,
                }}
              >
                {/* 뒷면: 인라인 스타일로 깊은 그림자(입체감)와 backfaceVisibility 적용 */}
                <img
                  src={backImg}
                  alt={`Back ${index}`}
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.6), 0 0 20px rgba(16,185,129,0.2)",
                  }}
                />

                {/* 앞면: 뒤집힌 상태 */}
                {cardFrontImages[index] && (
                  <img
                    src={cardFrontImages[index]}
                    alt={`Front ${index}`}
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

              {/* 글로우 효과 (선택된 카드 강조) */}
              {canInteract && (
                <div className="absolute inset-0 rounded-lg animate-pulse pointer-events-none">
                  <div className={`absolute inset-0 rounded-lg border-2 blur-sm ${isFlipped ? 'border-red-500/30' : 'border-emerald-500/30'}`} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* === SKIP 버튼 (원래 디자인 복구) === */}
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

      {/* === 우측 하단 컨트롤 (셔플 & 나가기 - 원래 디자인 복구) === */}
      <div className="absolute bottom-12 right-12 z-50 flex flex-col gap-4">
        
        {/* SHUFFLE 버튼 */}
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
                <img src={backImg} alt="Shuffle" className="w-10 h-10 object-contain"/>
              )}
            </div>
            <span className="absolute -left-2 top-1/2 -translate-y-1/2 -translate-x-full text-[10px] text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap tracking-wider pr-2">
              {isShuffling ? 'SHUFFLING...' : 'SHUFFLE'}
            </span>
          </motion.button>
        )}

        {/* EXIT 버튼 */}
        <Link to="/?skipIntro=true" className="group relative">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: videoEnded ? 1.5 : 0.5 }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-900 rounded-lg border-2 border-red-400 shadow-[0_0_20px_rgba(239,68,68,0.5)] group-hover:shadow-[0_0_30px_rgba(239,68,68,0.8)] flex items-center justify-center transition-all duration-300">
              <img src={front1Img} alt="Exit" className="w-10 h-10 object-contain"/>
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