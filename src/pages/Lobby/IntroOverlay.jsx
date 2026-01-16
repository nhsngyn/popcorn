// src/pages/Lobby/IntroOverlay.jsx
import { motion } from "framer-motion";
import { useState } from "react";

// ============================================
// 상수 정의 (Magic Numbers 제거)
// ============================================
const CONFIG = {
  // 애니메이션 단계별 설정
  ANIMATION: {
    // 1단계: 빛 다가오기
    APPROACH: {
      INITIAL_SIZE: 4,           // px
      FINAL_SIZE_VW: 300,        // vw
      FINAL_SIZE_VH: 300,        // vh
      DURATION: 2.2,             // seconds
      EASING: [0.65, 0, 0.35, 1],
    },
    
    // 2단계: 화이트아웃
    FLASH: {
      DURATION: 1.2,             // seconds
      TEXT_OPACITY_KEYFRAMES: [0, 0.3, 0],
      TEXT_SCALE_KEYFRAMES: [0.9, 1.1, 1.3],
      TEXT_BLUR_KEYFRAMES: ["blur(4px)", "blur(2px)", "blur(20px)"],
    },
    
    // 3단계: 정리
    CLEANUP: {
      DURATION: 0.8,             // seconds
    },
  },
};

const IntroOverlay = ({ onComplete }) => {
  const [stage, setStage] = useState("approach");

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden pointer-events-none"
      animate={stage === "cleanup" ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: CONFIG.ANIMATION.CLEANUP.DURATION }}
      onAnimationComplete={() => {
        if (stage === "cleanup") onComplete();
      }}
      style={{ willChange: "opacity" }}
    >
      {/* 1. 다가오는 빛 */}
      {stage === "approach" && (
        <motion.div
          className="absolute rounded-full bg-white"
          style={{
            boxShadow: "0 0 100px 50px rgba(255,255,255,0.8)",
            willChange: "transform, opacity"
          }}
          initial={{ 
            width: `${CONFIG.ANIMATION.APPROACH.INITIAL_SIZE}px`, 
            height: `${CONFIG.ANIMATION.APPROACH.INITIAL_SIZE}px`, 
            opacity: 0 
          }}
          animate={{ 
            width: `${CONFIG.ANIMATION.APPROACH.FINAL_SIZE_VW}vw`,
            height: `${CONFIG.ANIMATION.APPROACH.FINAL_SIZE_VH}vh`,
            opacity: 1,
            transition: { 
              duration: CONFIG.ANIMATION.APPROACH.DURATION, 
              ease: CONFIG.ANIMATION.APPROACH.EASING,
            }
          }}
          onAnimationComplete={() => setStage("flash")}
        />
      )}

      {/* 2. 화이트아웃 */}
      {stage === "flash" && (
        <motion.div
          className="absolute inset-0 bg-white flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ 
            opacity: 0, 
            transition: { 
              duration: CONFIG.ANIMATION.FLASH.DURATION, 
              ease: "easeOut" 
            } 
          }}
          onAnimationComplete={() => setStage("cleanup")}
          style={{ willChange: "opacity" }}
        >
          <motion.h1 
            className="text-9xl font-black text-black tracking-widest select-none"
            initial={{ 
              opacity: 0, 
              scale: CONFIG.ANIMATION.FLASH.TEXT_SCALE_KEYFRAMES[0], 
              filter: CONFIG.ANIMATION.FLASH.TEXT_BLUR_KEYFRAMES[0] 
            }}
            animate={{ 
              opacity: CONFIG.ANIMATION.FLASH.TEXT_OPACITY_KEYFRAMES,
              scale: CONFIG.ANIMATION.FLASH.TEXT_SCALE_KEYFRAMES,
              filter: CONFIG.ANIMATION.FLASH.TEXT_BLUR_KEYFRAMES,
              transition: { 
                duration: CONFIG.ANIMATION.FLASH.DURATION, 
                ease: "easeOut" 
              }
            }}
            style={{ willChange: "transform, opacity, filter" }}
          >
            ARRIVAL
          </motion.h1>
        </motion.div>
      )}
    </motion.div>
  );
};

export default IntroOverlay;
