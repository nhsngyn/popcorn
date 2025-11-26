// src/pages/Scratch/index.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import ScratchCanvas from "./ScratchCanvas";

// 👇 [리소스 설정] 여기에 본인 이미지 경로를 넣으세요!
// (임시로 Unsplash 이미지 사용)
const fakeWorldImg = "https://images.unsplash.com/photo-1513628253939-010e64ac66cd?q=80&w=1920&auto=format&fit=crop"; // 달 그림 (가짜)
const tunnelImg = "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1920&auto=format&fit=crop";   // 마법 통로 (진짜)
// const buttonHandImg = "../../assets/scratch/button-hand.png"; // 단추 든 손 (구멍 투명 PNG 필수!)

const Scratch = () => {
  const [isRevealed, setIsRevealed] = useState(false); // 스크래치 완료 여부
  const [isZoomed, setIsZoomed] = useState(false);     // 줌인 완료 여부
  const controls = useAnimation();

  // 페이지 진입 시 줌인 애니메이션 자동 시작
  useEffect(() => {
    const sequence = async () => {
      // 1. 1초 대기 (인트로 감상)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // 2. 줌인 시작!
      setIsZoomed(true);
      await controls.start({
        scale: 50, // 화면을 덮을 정도로 엄청 키움
        opacity: 0, // 다 커지면 사라짐
        transition: { duration: 2.5, ease: [0.645, 0.045, 0.355, 1.0] } // 큐빅 베지어 (영화 같은 가속감)
      });
    };
    sequence();
  }, [controls]);

  return (
    <div className="w-full h-screen bg-black overflow-hidden flex items-center justify-center relative select-none">
      
      {/* =========================================
          LAYER 1 (맨 뒤): 진짜 세상 (마법 통로)
      ========================================= */}
      <div className="absolute inset-0 z-0">
        <img src={tunnelImg} alt="Real Tunnel" className="w-full h-full object-cover opacity-80" />
        {/* 성공 시 메시지 */}
        {isRevealed && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-black/40"
          >
            <h1 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 drop-shadow-[0_0_30px_rgba(255,255,255,0.5)] tracking-widest">
              THE OTHER WORLD
            </h1>
            <p className="text-white mt-4 tracking-[0.5em] opacity-80">You found the way out.</p>
          </motion.div>
        )}
      </div>


      {/* =========================================
          LAYER 2 (중간): 스크래치 캔버스 (달 그림)
      ========================================= */}
      {/* 줌인이 끝나면(isZoomed=true) 나타나서 스크래치 가능해짐 */}
      <div className={`absolute inset-0 z-10 ${isZoomed ? 'pointer-events-auto' : 'pointer-events-none'}`}>
         <motion.div 
           className="w-full h-full"
           // 줌인 될 때 뒤에서 같이 커지는 느낌 연출
           initial={{ scale: 1 }}
           animate={isZoomed ? { scale: 1 } : { scale: 0.2 }} // 처음엔 작게 보임
           transition={{ duration: 2.5, ease: [0.645, 0.045, 0.355, 1.0] }}
         >
            <ScratchCanvas 
              width={window.innerWidth} 
              height={window.innerHeight} 
              coverImage={fakeWorldImg} 
              onReveal={() => setIsRevealed(true)}
            />
         </motion.div>
      </div>


      {/* =========================================
          LAYER 3 (맨 앞): 단추 든 손 (프레임)
      ========================================= */}
      {/* 줌인 애니메이션의 주인공 */}
      <motion.div 
        className="absolute z-30 pointer-events-none flex items-center justify-center"
        initial={{ scale: 1, opacity: 1 }}
        animate={controls} // 위에서 정의한 줌인 애니메이션 실행
      >
         {/* 임시: 단추 이미지가 없을 때를 위한 CSS 구멍 */}
         {/* 이미지가 준비되면 이 div를 지우고 아래 img 태그 주석을 푸세요! */}
         <div 
           className="w-[100vw] h-[100vw] rounded-full shadow-[0_0_0_9999px_black]" // 구멍 빼고 다 검은색으로 덮기
           style={{
             // 삼각형 단추 모양 구멍 (클립패스)
             clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)", 
             background: "transparent",
             border: "20px solid #4a4a4a", // 단추 테두리 느낌
           }}
         />

         {/* 👇 진짜 단추 이미지 (PNG) 사용 시 이거 쓰세요! */}
         {/* <img src={buttonHandImg} className="max-w-none w-[120vw]" alt="Hand with Button" /> */}
      </motion.div>


      {/* 나가기 버튼 */}
      <Link to="/" className="absolute bottom-8 right-8 z-50 group">
        <div className="text-white/50 font-bold border border-white/30 px-6 py-3 rounded-full transition-all group-hover:bg-white group-hover:text-black group-hover:border-transparent group-hover:scale-110 backdrop-blur-sm">
          EXIT
        </div>
      </Link>
    </div>
  );
};

export default Scratch;