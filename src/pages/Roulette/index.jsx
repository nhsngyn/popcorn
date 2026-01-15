// src/pages/Roulette/index.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import RouletteMachine from "./RouletteMachine";
import casinoVideo from "../../assets/roulette/Casino.mp4";

const Roulette = () => {
  return (
    <div className="w-full h-screen bg-black overflow-hidden relative font-sans">
      
      {/* 1. 전체 화면 홍콩 비디오 배경 */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={casinoVideo} type="video/mp4" />
      </video>

      {/* 2. 어두운 오버레이 (영화 같은 분위기) */}
      <div className="absolute inset-0 bg-black/70 z-10" /> 
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/20 to-black/50 z-10" />
      
      {/* 3. 네온 글로우 효과 강화 */}
      <motion.div 
        animate={{ opacity: [0.15, 0.3, 0.15], scale: [1, 1.1, 1] }} 
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] right-[15%] w-[600px] h-[600px] bg-red-600 rounded-full blur-[200px] opacity-25 z-20" 
      />
      <motion.div 
        animate={{ opacity: [0.1, 0.25, 0.1], scale: [1.1, 1, 1.1] }} 
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[10%] left-[10%] w-[700px] h-[700px] bg-emerald-500 rounded-full blur-[200px] opacity-20 z-20" 
      />

      {/* 4. 미묘한 한자 텍스트 레이어 */}
      <div className="absolute inset-0 flex items-center justify-center z-25 select-none pointer-events-none overflow-hidden">
         <h1 className="text-[200px] font-black text-red-500/5 tracking-widest blur-[2px] absolute -rotate-12">
           重慶森林
         </h1>
      </div>

      {/* 5. 중앙에 큰 룰렛 (위에 떠있는 느낌) */}
      <div className="absolute inset-0 flex items-center justify-center z-30">
        <RouletteMachine /> 
      </div>

      {/* 6. 피들스틱 레버 스타일 나가기 버튼 (우측 하단) */}
      <Link to="/" className="absolute bottom-12 right-12 z-50 group">
        <div className="relative flex flex-col items-center">
          {/* 레버 손잡이 (둥근 구) */}
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
            {/* 금속 반사 효과 */}
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

export default Roulette;