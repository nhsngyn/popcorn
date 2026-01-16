import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ScratchCanvas from "./ScratchCanvas";

// 에셋 경로
import candyBgImg from "../../assets/scratch/candy.png"; // 폴백용
import candyBgVideo from "../../assets/scratch/candy.mp4"; // 비디오
import handStoneImg from "../../assets/scratch/handstone.png";
import moonImg from "../../assets/scratch/moon.png";
import tunnelImg from "../../assets/scratch/tunnel.png";

const Scratch = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [canScratch, setCanScratch] = useState(false);
  const [showGlitch, setShowGlitch] = useState(false);
  const [useVideo, setUseVideo] = useState(true); // 비디오 사용 여부
  const [videoLoaded, setVideoLoaded] = useState(false); // 비디오 로드 완료
  const videoRef = useRef(null);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // 모바일 감지 (768px 이하는 이미지 사용)
    const isMobile = window.innerWidth < 768;
    setUseVideo(!isMobile);

    // 3초 뒤 줌인 시작 (1초 → 3초로 변경, 강아지 더 오래 보기)
    const zoomTimer = setTimeout(() => {
      setIsZoomed(true);
    }, 3000);

    // 5.5초 뒤 스크래치 활성화 (3.5초 → 5.5초, 줌인 시간 증가에 맞춤)
    const scratchTimer = setTimeout(() => {
      setCanScratch(true);
    }, 5500);

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(zoomTimer);
      clearTimeout(scratchTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 비디오 자동 재생
  useEffect(() => {
    if (videoRef.current && useVideo) {
      videoRef.current.play().catch(err => {
        console.log("Video autoplay failed:", err);
        setUseVideo(false); // 자동재생 실패 시 이미지로 폴백
      });
    }
  }, [useVideo]);

  // 드러났을 때 글리치 효과
  useEffect(() => {
    if (isRevealed) {
      setShowGlitch(true);
      const glitchInterval = setInterval(() => {
        setShowGlitch(prev => !prev);
      }, 150);
      
      setTimeout(() => {
        clearInterval(glitchInterval);
        setShowGlitch(false);
      }, 1500);
      
      return () => clearInterval(glitchInterval);
    }
  }, [isRevealed]);

  return (
    <div className="w-full h-screen bg-black overflow-hidden flex items-center justify-center relative select-none">
      
      {/* 비네팅 효과 (가장자리 어둡게) - 더 강하게 */}
      <div className="absolute inset-0 z-50 pointer-events-none" 
           style={{ background: "radial-gradient(circle at center, transparent 20%, rgba(0,0,0,0.7) 60%, black 100%)" }} />
      
      {/* 노이즈 오버레이 (필름 그레인 효과) */}
      <div 
        className="absolute inset-0 z-[49] pointer-events-none opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          animation: 'grain 8s steps(10) infinite'
        }}
      />

{/* =================================================================
          LAYER 0: 진짜 세상 (터널)
      ================================================================= */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}   
        animate={{ opacity: 1 }}   
        transition={{ duration: 0.5, delay: 2.5 }} 
      >
        <motion.img 
          src={tunnelImg} 
          alt="Real Tunnel" 
          className="w-full h-full object-cover"
          style={{ 
            filter: isRevealed ? 'brightness(0.6) contrast(1.2) saturate(0.8)' : 'brightness(0.8)'
          }}
          animate={isRevealed ? {
            scale: [1, 1.05, 1],
          } : {}}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        
        {/* 개선된 성공 연출 - 미니멀하고 불안한 느낌 */}
        <AnimatePresence>
          {isRevealed && (
            <>
              {/* 어두운 오버레이 */}
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 z-40"
              />

              {/* 글리치 효과 */}
              {showGlitch && (
                <motion.div
                  className="absolute inset-0 z-[45] pointer-events-none"
                  style={{
                    background: `linear-gradient(${Math.random() * 360}deg, 
                      rgba(255,0,0,0.1), 
                      rgba(0,255,0,0.1), 
                      rgba(0,0,255,0.1))`,
                    mixBlendMode: 'screen'
                  }}
                  animate={{
                    x: [0, -5, 5, -3, 3, 0],
                    opacity: [0.3, 0.7, 0.3]
                  }}
                  transition={{ duration: 0.1 }}
                />
              )}

              {/* 중앙 텍스트 - 세련되고 불안한 느낌 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex flex-col items-center justify-center z-50 text-center"
              >
                {/* 메인 텍스트 */}
                <motion.div
                  className="relative"
                  animate={showGlitch ? {
                    x: [0, -2, 2, -1, 1, 0],
                    filter: ['blur(0px)', 'blur(2px)', 'blur(0px)']
                  } : {}}
                >
                  <h1 
                    className="text-7xl md:text-8xl font-light tracking-[0.3em] text-white/90 mb-6"
                    style={{ 
                      fontFamily: "'Helvetica Neue', 'Arial', sans-serif",
                      textShadow: '0 0 40px rgba(255,255,255,0.3), 0 0 80px rgba(100,100,255,0.2)',
                      letterSpacing: '0.3em'
                    }}
                  >
                    BEYOND
                  </h1>
                  
                  {/* 서브 텍스트 */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    transition={{ delay: 1.5, duration: 2 }}
                    className="text-sm tracking-[0.8em] text-white/50 uppercase"
                    style={{ fontFamily: 'monospace' }}
                  >
                    the door
                  </motion.p>
                </motion.div>

                {/* 장식 라인 */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 1.5, ease: "easeInOut" }}
                  className="w-32 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent mt-8"
                />
              </motion.div>

              {/* 주변 파티클 효과 (먼지/별) */}
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white/60 rounded-full z-[42]"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 0.8, 0],
                    scale: [0, 1, 0],
                    y: [0, -30],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    delay: Math.random() * 2,
                    repeat: Infinity,
                    repeatDelay: Math.random() * 3
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>

      {/* =================================================================
          LAYER 1: 초기 배경 (사탕 테이블) - 비디오 또는 이미지
      ================================================================= */}
      <motion.div 
        className="absolute inset-0 z-10"
        animate={{ opacity: isZoomed ? 0 : 1, scale: isZoomed ? 1.5 : 1 }}
        transition={{ duration: 2.0, ease: "easeInOut" }}
      >
        {useVideo ? (
          <>
            {/* 비디오 배경 */}
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              loop
              muted
              playsInline
              preload="auto"
              onLoadedData={() => setVideoLoaded(true)}
              onError={() => setUseVideo(false)} // 에러 시 이미지로 폴백
              style={{ 
                opacity: videoLoaded ? 1 : 0,
                transition: 'opacity 0.5s ease-in-out'
              }}
            >
              <source src={candyBgVideo} type="video/mp4" />
            </video>
            
            {/* 비디오 로딩 중 플레이스홀더 */}
            {!videoLoaded && (
              <img 
                src={candyBgImg} 
                alt="Candy Background" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
          </>
        ) : (
          /* 이미지 폴백 (모바일 또는 비디오 실패 시) */
          <img 
            src={candyBgImg} 
            alt="Candy Background" 
            className="w-full h-full object-cover" 
          />
        )}
        
        {/* 워터마크 가리기 - 우측 상단 어둡게 */}
        <div 
          className="absolute top-0 right-0 w-1/3 h-1/4 pointer-events-none z-10"
          style={{
            background: 'radial-gradient(circle at top right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 40%, transparent 70%)'
          }}
        />
      </motion.div>

      {/* =================================================================
          LAYER 2: 가짜 세상 (달 캔버스)
      ================================================================= */}
      <motion.div 
        className={`absolute inset-0 z-20 ${canScratch ? 'pointer-events-auto' : 'pointer-events-none'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isZoomed ? 1 : 0 }} 
        transition={{ duration: 1.0, delay: 1.5 }} // 손이 자리를 잡을 때쯤 나타남
      >
         {/* 스크래치 가능 상태일 때만 캔버스 활성화 */}
         <ScratchCanvas 
            width={windowSize.width} 
            height={windowSize.height} 
            coverImage={moonImg} 
            onReveal={() => setIsRevealed(true)}
            isActive={canScratch}
         />
         
         {/* 스크래치 가능 힌트 (처음 활성화될 때만 표시) */}
         {canScratch && !isRevealed && (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: [0, 0.6, 0] }}
             transition={{ duration: 2, delay: 0.5 }}
             className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white/40 text-sm tracking-[0.3em] pointer-events-none"
             style={{ fontFamily: 'monospace' }}
           >
             SCRATCH TO REVEAL
           </motion.div>
         )}
      </motion.div>

      {/* =================================================================
          LAYER 3: [손 프레임] - 사라지지 않고 프레임으로 남음!
      ================================================================= */}
      <motion.div 
        className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none overflow-hidden"
        
        // 1. 초기 위치: 오른쪽 아래, 약간 기울어짐 (자연스럽게)
        initial={{ x: "30%", y: "10%", scale: 0.8, rotate: 15 }}

        // 2. 줌인 후: 중앙 정렬, 적당한 확대, 회전 0 (정자세)
        animate={isZoomed ? { 
          x: 400, 
          y: 0, 
          scale: 7.5,
          rotate: 0 
        } : { 
          x: "30%", y: "40%", scale: 0.7, rotate: 5 
        }}

        transition={{ 
          duration: 2.5, 
          // 👇 [핵심] 베지어 곡선: 천천히 출발 -> 빠르게 이동 -> 부드럽게 감속 (S자 곡선)
          ease: [0.7, 0, 0.3, 1]
        }}
      >
         <img 
           src={handStoneImg} 
           alt="Hand Frame" 
           className="w-[60vw] h-auto object-contain drop-shadow-2xl will-change-transform" 
         />
      </motion.div>

      {/* 나가기 버튼 - 더 세련되게 */}
      <Link to="/?skipIntro=true" className="absolute bottom-8 right-8 z-[60] group">
        <motion.div 
          className="relative overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="text-white/50 border border-white/20 px-6 py-3 backdrop-blur-md bg-black/20 hover:bg-white/10 hover:border-white/40 hover:text-white/80 transition-all duration-300 tracking-[0.3em] text-xs font-light">
            EXIT
          </div>
          {/* 호버 시 빛나는 효과 */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.6 }}
          />
        </motion.div>
      </Link>

    </div>
  );
};

export default Scratch;