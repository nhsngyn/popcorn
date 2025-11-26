// src/pages/Donut/DonutGame.jsx
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DONUT_COLORS = ["#ff9ff3", "#feca57", "#ff6b6b", "#48dbfb", "#1dd1a1"];

const DonutGame = ({ onScoreUpdate, onGameClear }) => {
  const [stack, setStack] = useState([]); 
  // 화면 렌더링용 state
  const [renderX, setRenderX] = useState(0); 
  const [gameStatus, setGameStatus] = useState("playing"); 

  // ★ 핵심: 애니메이션 연산용 Ref (리렌더링 없이 즉시 값 변경)
  // State 대신 이걸 써야 애니메이션이 끊기지 않습니다.
  const xRef = useRef(0);
  const directionRef = useRef(1); // 1: 오른쪽, -1: 왼쪽
  const speedRef = useRef(3);
  const animationRef = useRef();
  const isPlayingRef = useRef(true); // 게임 진행 여부도 Ref로 관리

  // 1. 게임 루프 (물리 엔진)
  const gameLoop = () => {
    if (!isPlayingRef.current) return;

    // A. 위치 이동
    xRef.current += speedRef.current * directionRef.current;

    // B. 벽 충돌 감지 (좌우 150px)
    if (xRef.current > 150) {
      xRef.current = 150;
      directionRef.current = -1; // 방향 전환
    } else if (xRef.current < -150) {
      xRef.current = -150;
      directionRef.current = 1;
    }

    // C. 화면 업데이트 (React에게 그리기 요청)
    setRenderX(xRef.current);

    // D. 다음 프레임 예약
    animationRef.current = requestAnimationFrame(gameLoop);
  };

  useEffect(() => {
    // 게임 시작 시 루프 실행
    if (gameStatus === "playing") {
      isPlayingRef.current = true;
      animationRef.current = requestAnimationFrame(gameLoop);
    }
    // 청소 (컴포넌트 사라질 때)
    return () => cancelAnimationFrame(animationRef.current);
  }, [gameStatus]);

  // 2. 도넛 떨어뜨리기 (클릭 핸들러)
  const handleDrop = () => {
    if (gameStatus !== "playing") return;

    // 현재 위치 확정
    const currentDropX = xRef.current;
    
    // A. 스택 추가
    const newDonut = { 
      x: currentDropX, 
      color: DONUT_COLORS[stack.length % DONUT_COLORS.length] 
    };
    const newStack = [...stack, newDonut];
    setStack(newStack);
    onScoreUpdate(newStack.length);

    // B. 성공 체크 (5개 쌓으면 끝)
    if (newStack.length >= 5) {
      isPlayingRef.current = false; // 루프 정지
      setGameStatus("success");
      onGameClear();
      cancelAnimationFrame(animationRef.current);
    } else {
      // 난이도 상승: 속도 빨라짐
      speedRef.current += 1.0; 
      // 위치 초기화 없이 계속 진행 (연속성)
    }
  };

  return (
    <div 
      className="relative w-full h-[400px] flex flex-col justify-end items-center cursor-pointer touch-none" 
      onPointerDown={handleDrop} // 모바일 터치 대응을 위해 onPointerDown 사용
    >
      
      {/* 1. 쌓인 도넛들 */}
      <div className="relative w-full h-full flex flex-col-reverse items-center mb-10">
        <AnimatePresence>
          {stack.map((donut, index) => (
            <motion.div
              key={index}
              initial={{ y: -300, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="absolute"
              style={{
                bottom: index * 35, 
                left: `calc(50% + ${donut.x}px)`, 
                zIndex: index,
              }}
            >
              <div 
                className="w-32 h-12 rounded-[50%] border-4 border-black shadow-[0_5px_0_rgba(0,0,0,0.2)]"
                style={{ backgroundColor: donut.color, transform: "translateX(-50%)" }}
              >
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-12 h-6 bg-black/10 rounded-[50%]" />
                <div className="absolute top-0 right-4 w-2 h-2 bg-white rounded-full opacity-50" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 2. 현재 움직이는 도넛 (성공하면 사라짐) */}
      {gameStatus === "playing" && (
        <div 
          className="absolute top-10 will-change-transform" // 성능 최적화 힌트
          style={{ 
            left: `calc(50% + ${renderX}px)`, // Ref 대신 State 사용 (화면 갱신용)
            transform: "translateX(-50%)"
          }}
        >
           <div 
              className="w-32 h-12 rounded-[50%] border-4 border-black shadow-xl"
              style={{ backgroundColor: DONUT_COLORS[stack.length % DONUT_COLORS.length] }}
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