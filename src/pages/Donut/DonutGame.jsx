import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import brownDonut from "../../assets/donut/brown.png";
import mintDonut from "../../assets/donut/mint.png";
import pinkDonut from "../../assets/donut/pink.png";
import redDonut from "../../assets/donut/red.png";
import yellowDonut from "../../assets/donut/yellow.png";

const DONUT_IMAGES = [brownDonut, mintDonut, pinkDonut, redDonut, yellowDonut];

const CONFIG = {
  GAME: {
    TARGET_STACK: 10,
    INITIAL_SPEED: 4,
    SPEED_INCREMENT: 1.0,      
    BOUNDARY_X: 350, 
    TOLERANCE: 140, 
  },
  ANIMATION: {
    DONUT_DROP_Y: -600,
    DONUT_STACK_GAP: 50,
    SPRING_STIFFNESS: 400,
    SPRING_DAMPING: 20,
  },
  UI: {
    DONUT_WIDTH: 280,
    CONTAINER_HEIGHT: 750,
  },
};

const DonutGame = ({ onScoreUpdate, onGameClear }) => {
  const [stack, setStack] = useState([{ x: 0, img: DONUT_IMAGES[0] }]); 
  const [renderX, setRenderX] = useState(0); 
  const [gameStatus, setGameStatus] = useState("playing"); 
  const [currentDonutImg, setCurrentDonutImg] = useState(DONUT_IMAGES[1]); 

  const xRef = useRef(0);
  const directionRef = useRef(1);
  const speedRef = useRef(CONFIG.GAME.INITIAL_SPEED);
  const animationRef = useRef();
  const isPlayingRef = useRef(true);

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

  const handleDrop = () => {
    if (gameStatus !== "playing") return;

    const currentDropX = xRef.current;
    const previousDonut = stack[stack.length - 1]; 
    const diff = Math.abs(currentDropX - previousDonut.x);

    // [실패 조건]
    if (diff > CONFIG.GAME.TOLERANCE) {
        isPlayingRef.current = false;
        setGameStatus("fail");
        cancelAnimationFrame(animationRef.current);
        return;
    }

    // [성공]
    const newDonut = { x: currentDropX, img: currentDonutImg };
    const newStack = [...stack, newDonut];
    setStack(newStack);
    onScoreUpdate(newStack.length);

    setCurrentDonutImg(DONUT_IMAGES[Math.floor(Math.random() * DONUT_IMAGES.length)]);

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
      <div className="relative w-full h-full flex flex-col-reverse items-center mb-4">
        <AnimatePresence>
          {stack.map((donut, index) => (
            <motion.div
              key={index}
              // ✅ [수정] style transform 대신 animate 속성에 x: "-50%" 직접 지정
              initial={index === 0 
                ? { y: 0, opacity: 1, x: "-50%" } 
                : { y: CONFIG.ANIMATION.DONUT_DROP_Y, opacity: 0, rotate: -30, x: "-50%" }
              } 
              animate={{ y: 0, opacity: 1, rotate: 0, x: "-50%" }}
              transition={{ type: "spring", stiffness: CONFIG.ANIMATION.SPRING_STIFFNESS, damping: CONFIG.ANIMATION.SPRING_DAMPING }}
              className="absolute drop-shadow-2xl"
              style={{
                bottom: index * CONFIG.ANIMATION.DONUT_STACK_GAP, 
                left: `calc(50% + ${donut.x}px)`, 
                zIndex: index,
                // transform: "translateX(-50%)"  <-- 이거 제거됨 (충돌 원인)
              }}
            >
              <img src={donut.img} alt="donut" className="select-none pointer-events-none max-w-none" style={{ width: `${CONFIG.UI.DONUT_WIDTH}px` }} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 2. 현재 움직이는 도넛 */}
      {gameStatus === "playing" && (
        <motion.div 
          // ✅ [수정] 여기도 x: "-50%" 추가하여 중앙 정렬 고정
          initial={{ scale: 0, opacity: 0, x: "-50%" }}
          animate={{ scale: 1, opacity: 1, x: "-50%" }}
          transition={{ delay: 1.5, type: "spring" }}
          className="absolute top-0 will-change-transform z-50"
          style={{ 
            left: `calc(50% + ${renderX}px)`,
          }}
        >
           <img src={currentDonutImg} alt="current donut" className="drop-shadow-xl max-w-none" style={{ width: `${CONFIG.UI.DONUT_WIDTH}px` }} />
           <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-4xl animate-bounce filter drop-shadow-md">👇</div>
        </motion.div>
      )}

      {/* 3. 성공 메시지 */}
      {gameStatus === "success" && (
        <motion.div 
          // ✅ [수정] 성공 메시지도 확실하게 x: "-50%"
          initial={{ scale: 0, rotate: -180, x: "-50%", y: "-50%" }} 
          animate={{ scale: 1, rotate: -12, x: "-50%", y: "-50%" }}
          className="absolute top-1/2 left-1/2 z-[100] pointer-events-none"
        >
          <h2 className="text-8xl font-black text-yellow-300 whitespace-nowrap" style={{ textShadow: "6px 6px 0px #000, -3px -3px 0 #ec4899", fontFamily: "Impact, sans-serif" }}>
            DELICIOUS!
          </h2>
        </motion.div>
      )}

      {/* 4. 실패 메시지 */}
      {gameStatus === "fail" && (
        <motion.div 
          // ✅ [수정] 실패 메시지도 x: "-50%" (이전엔 translate-x-1/2 클래스 사용했으나 Motion 충돌 방지 위해 속성으로 변경)
          initial={{ scale: 0, y: -50, x: "-50%" }} 
          animate={{ scale: 1, y: 0, x: "-50%" }}
          className="absolute top-1/3 left-1/2 z-[100] pointer-events-none text-center"
        >
          <h2 className="text-6xl font-black text-red-500 whitespace-nowrap mb-2" style={{ textShadow: "4px 4px 0px #000", fontFamily: "Impact, sans-serif" }}>
            OOPS!
          </h2>
          <p className="text-lg font-bold text-white bg-black px-4 py-2 rounded-full inline-block animate-bounce shadow-lg">
             Try Again
          </p>
        </motion.div>
      )}

    </div>
  );
};

export default DonutGame;