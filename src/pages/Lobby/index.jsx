// src/pages/Lobby/index.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import IntroOverlay from "./IntroOverlay";

const Lobby = () => {
  const [showIntro, setShowIntro] = useState(true); // 처음엔 인트로 보여주기

  return (
    <div className="relative w-full h-screen bg-neutral-900 text-white overflow-hidden font-sans">
      
      {/* 1. 인트로 (끝나면 사라짐) */}
      {showIntro && (
        <IntroOverlay onComplete={() => setShowIntro(false)} />
      )}

      {/* 2. 메인 로비 UI (인트로 끝나면 서서히 등장) */}
      {!showIntro && (
        <motion.div 
          className="w-full h-full flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }} // 천천히 밝아짐
        >
          {/* 타이틀 영역 */}
          <div className="text-center mb-16 z-10">
            <h1 className="text-6xl font-black text-white tracking-widest mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
              CINEMA
            </h1>
            <p className="text-neutral-500 tracking-[0.6em] text-sm uppercase">Interaction Archive</p>
          </div>

          {/* 상영작 선택 카드 (추후 3D로 교체 가능) */}
          <div className="flex gap-10 items-center justify-center perspective-1000">
            
            {/* 1. 룰렛 (홍콩) */}
            <Link to="/roulette">
              <motion.div 
                whileHover={{ y: -20, scale: 1.05 }}
                className="group relative w-60 h-80 bg-black rounded-xl border border-neutral-800 cursor-pointer overflow-hidden shadow-2xl"
              >
                {/* 배경 그라데이션 */}
                <div className="absolute inset-0 bg-gradient-to-t from-red-900/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500"/>
                
                {/* 아이콘/콘텐츠 */}
                <div className="w-full h-full flex flex-col items-center justify-center relative z-10">
                  <span className="text-6xl mb-4 group-hover:blur-[2px] transition-all duration-300">🎡</span>
                  <h3 className="text-2xl font-bold text-neutral-300 group-hover:text-red-500 transition-colors">Night in HK</h3>
                  <p className="text-xs text-neutral-500 mt-2 uppercase tracking-wider">Roulette</p>
                </div>
              </motion.div>
            </Link>

            {/* 2. 스크래치 (코렐라인) */}
            <Link to="/scratch">
              <motion.div 
                whileHover={{ y: -20, scale: 1.05 }}
                className="group relative w-60 h-80 bg-black rounded-xl border border-neutral-800 cursor-pointer overflow-hidden shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500"/>
                <div className="w-full h-full flex flex-col items-center justify-center relative z-10">
                  <span className="text-6xl mb-4 group-hover:blur-[2px] transition-all duration-300">🧵</span>
                  <h3 className="text-2xl font-bold text-neutral-300 group-hover:text-blue-500 transition-colors">Secret Door</h3>
                  <p className="text-xs text-neutral-500 mt-2 uppercase tracking-wider">Scratch</p>
                </div>
              </motion.div>
            </Link>

            {/* 3. 도넛 (팝아트) */}
            <Link to="/donut">
              <motion.div 
                whileHover={{ y: -20, scale: 1.05 }}
                className="group relative w-60 h-80 bg-black rounded-xl border border-neutral-800 cursor-pointer overflow-hidden shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500"/>
                <div className="w-full h-full flex flex-col items-center justify-center relative z-10">
                  <span className="text-6xl mb-4 group-hover:blur-[2px] transition-all duration-300">🍩</span>
                  <h3 className="text-2xl font-bold text-neutral-300 group-hover:text-yellow-500 transition-colors">Pop Diner</h3>
                  <p className="text-xs text-neutral-500 mt-2 uppercase tracking-wider">Stacking</p>
                </div>
              </motion.div>
            </Link>

          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Lobby;