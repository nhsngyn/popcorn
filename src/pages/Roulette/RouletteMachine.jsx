// src/pages/Roulette/RouletteMachine.jsx
import { motion, useAnimation } from "framer-motion";
import { useState } from "react";

const RouletteMachine = () => {
  const controls = useAnimation();
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState(null);

  // 룰렛 데이터 (8조각)
  const items = ["JACKPOT", "LOSE", "x2", "LOSE", "BONUS", "LOSE", "x5", "LOSE"];
  const segmentAngle = 360 / items.length; // 한 조각당 45도

  const handleSpin = async () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setResult(null);

    // 1. 랜덤 회전수 계산 (기본 5바퀴 + 랜덤 각도)
    const randomOffset = Math.random() * 360;
    const totalRotation = 360 * 5 + randomOffset;

    // 2. 애니메이션 실행 (Framer Motion)
    await controls.start({
      rotate: totalRotation,
      transition: { duration: 4, ease: [0.2, 0, 0, 1] }, // power4.out (처음엔 빠르고 나중에 천천히)
    });

    // 3. 결과 계산 (현재 각도를 360으로 나눈 나머지)
    // 룰렛이 시계방향(+)으로 돌면, 12시 방향 기준(0도)에서 멈춘 각도를 역산해야 함
    const finalAngle = totalRotation % 360;
    // (보정 로직: 뷰포트가 12시가 아니라 '뚫린 구멍' 기준이라 약간의 오차가 있을 수 있음. 시각적 재미 위주로 구현)
    
    setIsSpinning(false);
    setResult("RESULT OPEN"); // 실제 당첨 로직은 나중에 정교하게 다듬기 가능
  };

  return (
    <div className="relative w-[500px] h-[500px] flex items-center justify-center">
      
      {/* 1. [LAYER: BOTTOM] 실제 돌아가는 룰렛 판 */}
      <motion.div
        className="absolute w-full h-full rounded-full border-4 border-[#5c3a3a]"
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
            className="absolute top-0 left-1/2 -translate-x-1/2 h-[50%] origin-bottom flex justify-center pt-4"
            style={{ transform: `translateX(-50%) rotate(${i * 45 + 22.5}deg)` }}
          >
            <span className="text-white font-bold text-lg drop-shadow-md rotate-180 writing-mode-vertical">
              {item}
            </span>
          </div>
        ))}
      </motion.div>

      {/* 2. [LAYER: MIDDLE] 커버 (피자 조각 뚫기 마법) */}
      <div 
        className="absolute w-[110%] h-[110%] rounded-full pointer-events-none z-10 shadow-[inset_0_0_50px_rgba(0,0,0,0.9)]"
        style={{
          // 투명(transparent)에서 시작해서 60도까지만 보여주고, 나머지는 다 가림(#120808)
          background: "conic-gradient(transparent 330deg 30deg, #120808 30deg 330deg)"
          // 설명: 12시 방향(0도)을 기준으로 -30도 ~ +30도 (총 60도) 부채꼴만 뚫어버림
        }}
      >
        {/* 커버 위에 디테일 장식 (나사못 등) */}
        <div className="absolute top-4 left-1/2 w-4 h-4 bg-[#3a2222] rounded-full shadow-inner" />
        <div className="absolute bottom-4 left-1/2 w-4 h-4 bg-[#3a2222] rounded-full shadow-inner" />
        <div className="absolute left-4 top-1/2 w-4 h-4 bg-[#3a2222] rounded-full shadow-inner" />
      </div>

      {/* 3. [LAYER: TOP] 화살표 (포인터) */}
      <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 z-20">
         <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[30px] border-t-red-600 drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]" />
      </div>

      {/* 4. [CONTROL] 스핀 버튼 (중앙) */}
      <button
        onClick={handleSpin}
        disabled={isSpinning}
        className="absolute z-30 w-24 h-24 bg-gradient-to-br from-red-900 to-black rounded-full border-4 border-[#5c3a3a] shadow-[0_0_20px_rgba(255,0,0,0.3)] flex items-center justify-center active:scale-95 transition-transform hover:shadow-[0_0_30px_rgba(255,0,0,0.6)]"
      >
        <span className={`text-white font-bold text-xl ${isSpinning ? 'opacity-50' : 'animate-pulse'}`}>
          {isSpinning ? "..." : "SPIN"}
        </span>
      </button>

    </div>
  );
};

export default RouletteMachine;