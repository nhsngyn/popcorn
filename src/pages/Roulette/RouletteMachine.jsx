// src/pages/Roulette/RouletteMachine.jsx
import { motion, useAnimation } from "framer-motion";
import { useState } from "react";

// ============================================
// 상수 정의 (Magic Numbers 제거)
// ============================================
const CONFIG = {
  // 룰렛 크기
  SIZE: {
    WIDTH: 700,
    HEIGHT: 700,
  },
  
  // 룰렛 회전 설정
  SPIN: {
    BASE_ROTATIONS: 5,        // 기본 회전 수
    DURATION: 4,              // 애니메이션 지속 시간 (초)
    EASING: [0.2, 0, 0, 1],  // power4.out
  },
  
  // 룰렛 조각 설정
  SEGMENT_COUNT: 8,
  SEGMENT_ANGLE: 45,           // 360 / 8
  SEGMENT_OFFSET: 22.5,        // 45 / 2
  
  // 뷰포트 (보이는 구간)
  VIEWPORT: {
    START_ANGLE: 330,
    END_ANGLE: 30,
  },
  
  // UI 크기
  UI: {
    BUTTON_SIZE: 128,          // 32 * 4 (w-32 = 128px)
    ARROW_TOP_OFFSET: -30,
    ARROW_WIDTH: 20,
    ARROW_HEIGHT: 45,
  },
};

const RouletteMachine = () => {
  const controls = useAnimation();
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState(null);

  // 룰렛 데이터
  const items = ["JACKPOT", "LOSE", "x2", "LOSE", "BONUS", "LOSE", "x5", "LOSE"];

  const handleSpin = async () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setResult(null);

    // 랜덤 회전수 계산
    const randomOffset = Math.random() * 360;
    const totalRotation = 360 * CONFIG.SPIN.BASE_ROTATIONS + randomOffset;

    // 애니메이션 실행
    await controls.start({
      rotate: totalRotation,
      transition: { 
        duration: CONFIG.SPIN.DURATION, 
        ease: CONFIG.SPIN.EASING,
      },
    });

    const finalAngle = totalRotation % 360;
    
    setIsSpinning(false);
    setResult("RESULT OPEN");
  };

  return (
    <div 
      className="relative flex items-center justify-center"
      style={{ 
        width: `${CONFIG.SIZE.WIDTH}px`, 
        height: `${CONFIG.SIZE.HEIGHT}px` 
      }}
    >
      
      {/* 1. [LAYER: BOTTOM] 실제 돌아가는 룰렛 판 */}
      <motion.div
        className="absolute w-full h-full rounded-full border-8 border-[#5c3a3a] shadow-[0_0_80px_rgba(139,0,0,0.6)]"
        animate={controls}
        initial={{ rotate: 0 }}
        style={{
          // CSS로 룰렛 패턴 만들기 (이미지 없이 구현!)
          background: `conic-gradient(
            #8B0000 0deg 45deg, 
            #1a1a1a 45deg 90deg, 
            #8B0000 90deg 135deg, 
            #1a1a1a 135deg 180deg, 
            #8B0000 180deg 225deg, 
            #1a1a1a 225deg 270deg, 
            #8B0000 270deg 315deg, 
            #1a1a1a 315deg 360deg
          )`
        }}
      >
        {/* 룰렛 글자 (각도에 맞춰 배치) */}
        {items.map((item, i) => (
          <div
            key={i}
            className="absolute top-0 left-1/2 -translate-x-1/2 h-[50%] origin-bottom flex justify-center pt-8"
            style={{ 
              transform: `translateX(-50%) rotate(${i * CONFIG.SEGMENT_ANGLE + CONFIG.SEGMENT_OFFSET}deg)` 
            }}
          >
            <span className="text-white font-bold text-2xl drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] rotate-180 writing-mode-vertical">
              {item}
            </span>
          </div>
        ))}
      </motion.div>

      {/* 2. [LAYER: MIDDLE] 커버 (피자 조각 뚫기 마법) */}
      <div 
        className="absolute w-[110%] h-[110%] rounded-full pointer-events-none z-10 shadow-[inset_0_0_80px_rgba(0,0,0,0.9)]"
        style={{
          background: `conic-gradient(transparent ${CONFIG.VIEWPORT.START_ANGLE}deg ${CONFIG.VIEWPORT.END_ANGLE}deg, rgba(18,8,8,0.95) ${CONFIG.VIEWPORT.END_ANGLE}deg ${CONFIG.VIEWPORT.START_ANGLE}deg)`
        }}
      >
        {/* 커버 위에 디테일 장식 (나사못 등) */}
        <div className="absolute top-6 left-1/2 w-6 h-6 bg-[#3a2222] rounded-full shadow-inner border border-neutral-800" />
        <div className="absolute bottom-6 left-1/2 w-6 h-6 bg-[#3a2222] rounded-full shadow-inner border border-neutral-800" />
        <div className="absolute left-6 top-1/2 w-6 h-6 bg-[#3a2222] rounded-full shadow-inner border border-neutral-800" />
      </div>

      {/* 3. [LAYER: TOP] 화살표 (포인터) */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 z-20"
        style={{ top: `${CONFIG.UI.ARROW_TOP_OFFSET}px` }}
      >
        <div 
          className="w-0 h-0 border-l-transparent border-r-transparent border-t-red-600 drop-shadow-[0_0_20px_rgba(255,0,0,1)]"
          style={{
            borderLeftWidth: `${CONFIG.UI.ARROW_WIDTH}px`,
            borderRightWidth: `${CONFIG.UI.ARROW_WIDTH}px`,
            borderTopWidth: `${CONFIG.UI.ARROW_HEIGHT}px`,
          }}
        />
      </div>

      {/* 4. [CONTROL] 스핀 버튼 (중앙) */}
      <button
        onClick={handleSpin}
        disabled={isSpinning}
        className="absolute z-30 bg-gradient-to-br from-red-900 to-black rounded-full border-6 border-[#5c3a3a] shadow-[0_0_40px_rgba(255,0,0,0.5)] flex items-center justify-center active:scale-95 transition-transform hover:shadow-[0_0_60px_rgba(255,0,0,0.8)]"
        style={{
          width: `${CONFIG.UI.BUTTON_SIZE}px`,
          height: `${CONFIG.UI.BUTTON_SIZE}px`,
        }}
      >
        <span className={`text-white font-bold text-2xl ${isSpinning ? 'opacity-50' : 'animate-pulse'}`}>
          {isSpinning ? "..." : "SPIN"}
        </span>
      </button>

    </div>
  );
};

export default RouletteMachine;