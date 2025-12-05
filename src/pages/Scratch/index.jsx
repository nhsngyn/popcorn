import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ScratchCanvas from "./ScratchCanvas";

// 이미지 경로 확인
import candyBgImg from "../../assets/scratch/candy.png";
import handStoneImg from "../../assets/scratch/handstone.png";
import moonImg from "../../assets/scratch/moon.png";
import tunnelImg from "../../assets/scratch/tunnel.png";

const Scratch = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // 1초 뒤 줌인 시작
    const timer = setTimeout(() => {
      setIsZoomed(true);
    }, 1000);

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full h-screen bg-black overflow-hidden flex items-center justify-center relative select-none">
      
      {/* 비네팅 효과 (가장자리 어둡게) */}
      <div className="absolute inset-0 z-50 pointer-events-none" 
           style={{ background: "radial-gradient(circle, transparent 30%, black 100%)" }} />

{/* =================================================================
          LAYER 0: 진짜 세상 (터널)
      ================================================================= */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}   
        animate={{ opacity: 1 }}   
        transition={{ duration: 0.5, delay: 2.5 }} 
      >
        <img src={tunnelImg} alt="Real Tunnel" className="w-full h-full object-cover opacity-80" />
        
        {/* 성공 메시지 (문구 변경됨!) */}
        {isRevealed && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 1.3, delay: 0.2 }} // 천천히 웅장하게 뜨도록 변경
            className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 z-50 text-center p-4"
          >
<h1 
  style={{ fontFamily: "'Spooky', serif" }} 
  className="text-6xl font-black text-white z-50"
>
  WHAT YOU<br/>WISH FOR
</h1>
            
          </motion.div>
        )}
      </motion.div>

      {/* =================================================================
          LAYER 1: 초기 배경 (사탕 테이블) - 줌인 시 부드럽게 사라짐
      ================================================================= */}
      <motion.div 
        className="absolute inset-0 z-10"
        animate={{ opacity: isZoomed ? 0 : 1, scale: isZoomed ? 1.5 : 1 }} // 배경도 살짝 커지면서 사라지면 더 입체적임
        transition={{ duration: 2.0, ease: "easeInOut" }}
      >
        <img src={candyBgImg} alt="Candy Background" className="w-full h-full object-cover" />
      </motion.div>

      {/* =================================================================
          LAYER 2: 가짜 세상 (달 캔버스)
      ================================================================= */}
      <motion.div 
        className={`absolute inset-0 z-20 ${isZoomed ? 'pointer-events-auto' : 'pointer-events-none'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isZoomed ? 1 : 0 }} 
        transition={{ duration: 1.0, delay: 1.5 }} // 손이 자리를 잡을 때쯤 나타남
      >
         <ScratchCanvas 
            width={windowSize.width} 
            height={windowSize.height} 
            coverImage={moonImg} 
            onReveal={() => setIsRevealed(true)}
         />
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

      {/* 나가기 버튼 */}
      <Link to="/" className="absolute bottom-8 right-8 z-50">
        <div className="text-white/70 border border-white/30 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white hover:text-black transition">
          EXIT
        </div>
      </Link>

    </div>
  );
};

export default Scratch;