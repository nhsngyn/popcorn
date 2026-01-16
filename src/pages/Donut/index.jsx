import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; 
import DonutGame from "./DonutGame";
import bgImage from "../../assets/donut/Donut.png"; 

const Donut = () => {
  const [score, setScore] = useState(1);
  const [isClear, setIsClear] = useState(false);
  const [gameKey, setGameKey] = useState(0); 

  const handleReset = () => {
    setGameKey(prev => prev + 1);
    setScore(1);
    setIsClear(false);
  };

  return (
    <div className="w-full h-screen overflow-hidden relative font-sans selection:bg-pink-500 flex flex-col justify-end items-center bg-black">
      
      {/* 1. [BACKGROUND] */}
      <motion.div 
        initial={{ scale: 1, filter: "blur(0px)" }}
        animate={{ scale: 1.05, filter: "blur(4px)" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img 
          src={bgImage} 
          alt="Donut Shop Background" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-black/10" />
      </motion.div>

      {/* 2. [UI] 상단 정보창 */}
      <motion.div 
        initial={{ y: -200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.8 }}
        className="absolute top-16 left-16 z-20 origin-top-left scale-[3.5]" 
      >
        <div className={`bg-black p-4 rounded-xl border-4 ${isClear ? 'border-yellow-400' : 'border-pink-500'} shadow-[0_0_20px_#ec4899] transition-colors`}>
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 animate-pulse" style={{ fontFamily: "Impact, sans-serif" }}>
            {isClear ? "PERFECT!" : "STACK DONUT!"}
          </h1>
        </div>
      </motion.div>

      <motion.div 
        initial={{ y: -200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, delay: 1.0 }}
        className="absolute top-16 right-16 z-20 origin-top-right scale-[3.5]" 
      >
        <div className="bg-white/90 p-4 rounded-xl shadow-xl -rotate-3 border-b-4 border-gray-300">
          <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Current Stack</p>
          <div className="text-5xl font-black text-neutral-800 text-right">
            {score} <span className="text-2xl text-gray-400">/ 10</span>
          </div>
        </div>
      </motion.div>

      {/* 3. [MAIN CONTAINER] */}
      <motion.div 
        initial={{ y: "100%" }} 
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.5 }}
        className="relative w-full max-w-[1000px] h-[800px] mx-auto z-10"
      >
          {/* [TABLE BACKGROUND] */}
          <div className="absolute bottom-0 left-0 w-full h-[350px] bg-[#fff9c4] rounded-t-[60px] shadow-2xl border-t-[16px] border-[#ff6b6b] flex justify-center overflow-hidden">
             <div className="w-full h-full opacity-30" 
                  style={{ 
                    backgroundImage: "linear-gradient(90deg, #ff6b6b 2px, transparent 2px), linear-gradient(#ff6b6b 2px, transparent 2px)",
                    backgroundSize: "60px 60px",
                    backgroundPosition: "center top"
                  }} />
             <div className="absolute top-0 left-20 w-40 h-full bg-white opacity-20 skew-x-12 blur-xl" />
          </div>

          {/* [GAME AREA] */}
          <div className="absolute bottom-[40px] left-0 w-full flex justify-center">
            <DonutGame 
              key={gameKey} 
              onScoreUpdate={(newScore) => setScore(newScore)} 
              onGameClear={() => setIsClear(true)}
            />
          </div>
      </motion.div>

      {/* 4. [BUTTONS] */}
      <div className="absolute bottom-8 right-8 z-50 flex flex-col gap-6 items-center">
        <button 
          onClick={handleReset}
          className="w-20 h-20 bg-green-400 rounded-full border-[6px] border-black flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all hover:bg-green-300 group"
        >
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" className="w-10 h-10 text-black group-hover:rotate-180 transition-transform duration-500">
             <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
           </svg>
        </button>

        <Link to="/?skipIntro=true" className="group">
          <div className="w-16 h-16 bg-yellow-400 rounded-full border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all hover:bg-yellow-300">
             <span className="font-bold text-black text-sm">EXIT</span>
          </div>
        </Link>
      </div>

    </div>
  );
};

export default Donut;