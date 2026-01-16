// src/pages/Donut/DonutGame.jsx
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ============================================
// 상수 정의 (Magic Numbers 제거)
// ============================================
const CONFIG = {
  // 도넛 색상
  COLORS: ["#ff9ff3", "#feca57", "#ff6b6b", "#48dbfb", "#1dd1a1"],
  
  // 게임 설정
  GAME: {
    TARGET_STACK: 5,           // 목표 도넛 개수
    INITIAL_SPEED: 3,          // 초기 속도
    SPEED_INCREMENT: 1.0,      // 레벨업 시 속도 증가량
    BOUNDARY_X: 150,           // 좌우 이동 범위 (px)
  },
  
  // 애니메이션 설정
  ANIMATION: {
    DONUT_DROP_Y: -300,        // 도넛 떨어지는 초기 위치
    DONUT_STACK_GAP: 35,       // 쌓인 도넛 간격 (px)
    SPRING_STIFFNESS: 400,
    SPRING_DAMPING: 20,
  },
  
  // UI 크기
  UI: {
    DONUT_WIDTH: 128,          // w-32 = 128px
    DONUT_HEIGHT: 48,          // h-12 = 48px
    CONTAINER_HEIGHT: 400,     // 게임 영역 높이
  },
};

const DonutGame = ({ onScoreUpdate, onGameClear }) => {
  const [stack, setStack] = useState([]); 
  const [renderX, setRenderX] = useState(0); 
  const [gameStatus, setGameStatus] = useState("playing"); 

  const xRef = useRef(0);
  const directionRef = useRef(1);
  const speedRef = useRef(CONFIG.GAME.INITIAL_SPEED);
  const animationRef = useRef();
  const isPlayingRef = useRef(true);

  // 게임 루프
  const gameLoop = () => {
    if (!isPlayingRef.current) return;

    xRef.current += speedRef.current * directionRef.current;

    if (xRef.current > CONFIG.GAME.BOUNDARY_X) {
      xRef.current = CONFIG.GAME.BOUNDARY_X;
      directionRef.current = -1;
    } else if (xRef.current < -CONFIG.GAME.BOUNDARY_X) {
      xRef.current = -CONFIG.GAME.BOUNDARY_X;
      directionRef.current = 1;
    }

    setRenderX(xRef.current);
    animationRef.current = requestAnimationFrame(gameLoop);
  };

  useEffect(() => {
    if (gameStatus === "playing") {
      isPlayingRef.current = true;
      animationRef.current = requestAnimationFrame(gameLoop);
    }
    return () => cancelAnimationFrame(animationRef.current);
  }, [gameStatus]);

  // 도넛 떨어뜨리기
  const handleDrop = () => {
    if (gameStatus !== "playing") return;

    const currentDropX = xRef.current;
    
    const newDonut = { 
      x: currentDropX, 
      color: CONFIG.COLORS[stack.length % CONFIG.COLORS.length] 
    };
    const newStack = [...stack, newDonut];
    setStack(newStack);
    onScoreUpdate(newStack.length);

    if (newStack.length >= CONFIG.GAME.TARGET_STACK) {
      isPlayingRef.current = false;
      setGameStatus("success");
      onGameClear();
      cancelAnimationFrame(animationRef.current);
    } else {
      speedRef.current += CONFIG.GAME.SPEED_INCREMENT;
    }
  };

  return (
    <div 
      className="relative w-full flex flex-col justify-end items-center cursor-pointer touch-none" 
      style={{ height: `${CONFIG.UI.CONTAINER_HEIGHT}px` }}
      onPointerDown={handleDrop}
    >
      
      {/* 1. 쌓인 도넛들 */}
      <div className="relative w-full h-full flex flex-col-reverse items-center mb-10">
        <AnimatePresence>
          {stack.map((donut, index) => (
            <motion.div
              key={index}
              initial={{ y: CONFIG.ANIMATION.DONUT_DROP_Y, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: CONFIG.ANIMATION.SPRING_STIFFNESS, 
                damping: CONFIG.ANIMATION.SPRING_DAMPING 
              }}
              className="absolute"
              style={{
                bottom: index * CONFIG.ANIMATION.DONUT_STACK_GAP, 
                left: `calc(50% + ${donut.x}px)`, 
                zIndex: index,
              }}
            >
              <div 
                className="rounded-[50%] border-4 border-black shadow-[0_5px_0_rgba(0,0,0,0.2)]"
                style={{ 
                  backgroundColor: donut.color, 
                  transform: "translateX(-50%)",
                  width: `${CONFIG.UI.DONUT_WIDTH}px`,
                  height: `${CONFIG.UI.DONUT_HEIGHT}px`,
                }}
              >
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-12 h-6 bg-black/10 rounded-[50%]" />
                <div className="absolute top-0 right-4 w-2 h-2 bg-white rounded-full opacity-50" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 2. 현재 움직이는 도넛 */}
      {gameStatus === "playing" && (
        <div 
          className="absolute top-10 will-change-transform"
          style={{ 
            left: `calc(50% + ${renderX}px)`,
            transform: "translateX(-50%)"
          }}
        >
           <div 
              className="rounded-[50%] border-4 border-black shadow-xl"
              style={{ 
                backgroundColor: CONFIG.COLORS[stack.length % CONFIG.COLORS.length],
                width: `${CONFIG.UI.DONUT_WIDTH}px`,
                height: `${CONFIG.UI.DONUT_HEIGHT}px`,
              }}
            >
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-12 h-6 bg-black/10 rounded-[50%]" />
           </div>
           <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-2xl animate-bounce">👇</div>
        </div>
      )}

      {/* 3. 성공 메시지 */}
      {gameStatus === "success" && (
        <motion.div 
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
        >
          <h2 className="text-6xl font-black text-yellow-300 drop-shadow-[4px_4px_0_#000] -rotate-12 whitespace-nowrap">
            DELICIOUS!
          </h2>
        </motion.div>
      )}

    </div>
  );
};

export default DonutGame;