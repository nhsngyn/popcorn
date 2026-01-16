// src/pages/Donut/index.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import DonutGame from "./DonutGame"; // 👈 핵심!

const Donut = () => {
  const [score, setScore] = useState(0);
  const [isClear, setIsClear] = useState(false);

  return (
    <div className="w-full h-screen bg-[#4fd1c5] overflow-hidden relative font-sans selection:bg-pink-500">
      
      {/* 1. [BACKGROUND] 레트로 다이너 벽지 */}
      <div className="absolute inset-0 z-0 flex flex-col">
        <div className="h-[60%] bg-[#ff6b6b] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" 
               style={{ backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 50px, #fff 50px, #fff 100px)" }} />
        </div>
        <div className="h-[40%] bg-white relative">
           <div className="absolute inset-0 opacity-20"
                style={{ 
                  backgroundImage: "linear-gradient(45deg, #000 25%, transparent 25%), linear-gradient(-45deg, #000 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #000 75%), linear-gradient(-45deg, transparent 75%, #000 75%)",
                  backgroundSize: "60px 60px",
                  backgroundPosition: "0 0, 0 30px, 30px -30px, -30px 0px"
                }} 
           />
        </div>
      </div>

      {/* 2. [UI] 네온 전광판 */}
      <div className="absolute top-8 left-8 z-20">
        <div className={`bg-black p-4 rounded-xl border-4 ${isClear ? 'border-yellow-400' : 'border-pink-500'} shadow-[0_0_20px_#ec4899] transition-colors`}>
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 animate-pulse" style={{ fontFamily: "Impact, sans-serif" }}>
            {isClear ? "PERFECT!" : "STACK A DONUT!"}
          </h1>
        </div>
      </div>

      {/* 3. [UI] 스코어 보드 */}
      <div className="absolute top-8 right-8 z-20">
        <div className="bg-white/90 p-4 rounded-xl shadow-xl -rotate-3 border-b-4 border-gray-300">
          <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Current Stack</p>
          <div className="text-5xl font-black text-neutral-800 text-right">
            {score} <span className="text-2xl text-gray-400">/ 5</span>
          </div>
        </div>
      </div>

      {/* 4. [GAME AREA] 테이블과 도넛 */}
      <div className="absolute inset-0 flex items-end justify-center z-10">
        <motion.div 
          initial={{ y: 500 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.2 }}
          className="relative w-[600px] h-[300px]"
        >
          {/* 식탁보 */}
          <div className="w-full h-full bg-white relative rounded-t-[50px] shadow-2xl overflow-hidden border-t-8 border-white">
             <div className="absolute inset-0 opacity-30 bg-[#ff9ff3]" 
                  style={{ 
                    backgroundImage: "linear-gradient(#fff 2px, transparent 2px), linear-gradient(90deg, #fff 2px, transparent 2px)",
                    backgroundSize: "40px 40px"
                  }} 
             />
             <div className="absolute top-10 w-full text-center pointer-events-none">
                <p className={`text-pink-400 font-bold text-xl ${score > 0 ? 'hidden' : 'animate-bounce'}`}>
                  CLICK TO DROP! 👇
                </p>
             </div>
          </div>

          {/* 게임 컴포넌트 위치 */}
          <div className="absolute bottom-[60px] w-full flex justify-center">
             <DonutGame 
               onScoreUpdate={(newScore) => setScore(newScore)} 
               onGameClear={() => setIsClear(true)}
             />
          </div>
        </motion.div>
      </div>

      {/* 나가기 버튼 */}
      <Link to="/?skipIntro=true" className="absolute bottom-8 right-8 z-50 group">
        <div className="w-16 h-16 bg-yellow-400 rounded-full border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all hover:bg-yellow-300">
           <span className="font-bold text-black text-sm">EXIT</span>
        </div>
      </Link>

    </div>
  );
};

export default Donut;