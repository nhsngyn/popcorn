// src/pages/Lobby/IntroOverlay.jsx
import { motion } from "framer-motion";
import { useState } from "react";

// 빛이 다가오는 애니메이션
const lightVariants = {
  initial: { scale: 0, opacity: 0, backgroundColor: "#fff" },
  approach: { 
    scale: 100, // 화면을 덮을 정도로 커짐
    opacity: 1, 
    transition: { duration: 2.5, ease: [0.7, 0, 0.84, 0] } // 가속도 (기차가 급격히 다가오는 느낌)
  },
};

// 기차 잔상 / 텍스트 애니메이션
const trainVariants = {
  initial: { opacity: 0, scale: 0.8 },
  flash: { 
    opacity: 1, 
    scale: 1.2, 
    filter: "blur(2px)",
    transition: { duration: 0.1 } // 번쩍!
  },
  fade: { 
    opacity: 0, 
    scale: 1.5, 
    filter: "blur(20px)", // 연기처럼 사라짐
    transition: { duration: 1.0 } 
  },
};

const IntroOverlay = ({ onComplete }) => {
  const [stage, setStage] = useState("approach"); // 순서: approach -> flash -> cleanup

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
      animate={stage === "cleanup" ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 1 }}
      onAnimationComplete={() => {
        if (stage === "cleanup") onComplete(); // 다 끝나면 부모에게 알림
      }}
    >
      {/* 1. 다가오는 빛 */}
      {stage === "approach" && (
        <motion.div
          className="w-4 h-4 rounded-full shadow-[0_0_50px_20px_rgba(255,255,255,0.8)]"
          variants={lightVariants}
          initial="initial"
          animate="approach"
          onAnimationComplete={() => setStage("flash")}
        />
      )}

      {/* 2. 기차 잔상 (화이트아웃) */}
      {stage === "flash" && (
        <motion.div
          className="absolute inset-0 bg-white flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0, transition: { duration: 1.5 } }} // 서서히 투명해짐
          onAnimationComplete={() => setStage("cleanup")}
        >
          {/* 기차 이미지 대신 텍스트 연출 */}
          <motion.div variants={trainVariants} initial="initial" animate={["flash", "fade"]}>
             <h1 className="text-9xl font-black text-black opacity-20 tracking-widest blur-sm select-none">
              ARRIVAL
            </h1>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default IntroOverlay;