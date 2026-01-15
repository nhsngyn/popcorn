// src/pages/Lobby/IntroOverlay.jsx
import { motion } from "framer-motion";
import { useState } from "react";

const IntroOverlay = ({ onComplete }) => {
  const [stage, setStage] = useState("approach"); // 순서: approach -> flash -> cleanup

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden pointer-events-none"
      animate={stage === "cleanup" ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.8 }}
      onAnimationComplete={() => {
        if (stage === "cleanup") onComplete(); // 다 끝나면 부모에게 알림
      }}
      style={{ willChange: "opacity" }}
    >
      {/* 1. 다가오는 빛 (개선된 버전) */}
      {stage === "approach" && (
        <motion.div
          className="absolute rounded-full bg-white"
          style={{
            boxShadow: "0 0 100px 50px rgba(255,255,255,0.8)",
            willChange: "transform, opacity"
          }}
          initial={{ 
            width: "4px", 
            height: "4px", 
            opacity: 0 
          }}
          animate={{ 
            width: "300vw",  // 화면보다 충분히 크게
            height: "300vh",
            opacity: 1,
            transition: { 
              duration: 2.2, 
              ease: [0.65, 0, 0.35, 1] // 부드러운 가속
            }
          }}
          onAnimationComplete={() => setStage("flash")}
        />
      )}

      {/* 2. 화이트아웃 (개선된 버전) */}
      {stage === "flash" && (
        <motion.div
          className="absolute inset-0 bg-white flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ 
            opacity: 0, 
            transition: { duration: 1.2, ease: "easeOut" } 
          }}
          onAnimationComplete={() => setStage("cleanup")}
          style={{ willChange: "opacity" }}
        >
          {/* 텍스트 연출 */}
          <motion.h1 
            className="text-9xl font-black text-black tracking-widest select-none"
            initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
            animate={{ 
              opacity: [0, 0.3, 0],
              scale: [0.9, 1.1, 1.3],
              filter: ["blur(4px)", "blur(2px)", "blur(20px)"],
              transition: { duration: 1.2, ease: "easeOut" }
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