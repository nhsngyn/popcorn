// src/pages/Roulette/index.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import RouletteMachine from "./RouletteMachine";

const Roulette = () => {
  return (
    <div className="w-full h-screen bg-black overflow-hidden flex relative font-sans">
      
      {/* 1. 왼쪽: 룰렛 기계 영역 (화면의 60%) - 어둡고 무거운 느낌 */}
      <div className="w-[60%] h-full bg-[#120808] relative flex items-center justify-end overflow-hidden border-r-4 border-neutral-900 z-10 shadow-[20px_0_50px_rgba(0,0,0,0.8)]">
        
        {/* 기계 장식 텍스트 */}
        <div className="absolute top-10 left-10 text-[#5c3a3a] font-mono text-xs tracking-widest opacity-50">
          <p>MACHINE_ID: HK-88</p>
          <p>STATUS: STANDBY</p>
          <p className="mt-2">CAUTION: HIGH VOLTAGE</p>
        </div>

        {/* 룰렛 위치 잡기 (나중에 실제 룰렛이 들어갈 자리) */}
       <div className="relative mr-[-120px]"> 
           <RouletteMachine /> 
        </div>
      </div>

      {/* 2. 오른쪽: 블러 처리된 홍콩 네온 사인 배경 (화면의 40%) - 몽환적임 */}
      <div className="w-[40%] h-full relative overflow-hidden bg-black">
        
        {/* 네온 사인 이미지 효과 (배경 레이어) */}
        <div className="absolute inset-0 bg-black/40 z-10" /> 
        
        {/* 춤추는 네온 불빛들 (Framer Motion) */}
        <motion.div 
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }} 
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] right-[10%] w-80 h-80 bg-red-600 rounded-full blur-[120px] opacity-40" 
        />
        <motion.div 
          animate={{ opacity: [0.2, 0.5, 0.2], scale: [1.1, 1, 1.1] }} 
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[20%] left-[0%] w-96 h-96 bg-emerald-600 rounded-full blur-[120px] opacity-30" 
        />

        {/* 배경 한자 텍스트 (블러 처리되어 분위기만 냄) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-0 select-none pointer-events-none">
           <h1 className="text-9xl font-black text-red-600/20 rotate-90 tracking-widest blur-[4px]">
             重慶
           </h1>
           <h1 className="text-9xl font-black text-emerald-600/10 -rotate-90 tracking-widest blur-[6px] absolute scale-150">
             森林
           </h1>
        </div>

        {/* 나가기 버튼 (우측 하단) */}
        <Link to="/" className="absolute bottom-10 right-10 z-50 group">
          <div className="w-14 h-14 border border-neutral-700 rounded-full flex items-center justify-center text-neutral-500 transition-all duration-300 group-hover:border-white group-hover:scale-110 group-hover:bg-white group-hover:text-black">
            <span className="text-xl">✕</span>
          </div>
          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            LOBBY
          </span>
        </Link>
      </div>

    </div>
  );
};

export default Roulette;