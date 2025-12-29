// src/pages/Donut/DonutGame.jsx
import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import gsap from "gsap";

// 도넛 이미지들 (에셋 준비 후 import)
// import donut1 from "../../assets/donut/donut-1.png";
// import donut2 from "../../assets/donut/donut-2.png";
// import donut3 from "../../assets/donut/donut-3.png";
// import donut4 from "../../assets/donut/donut-4.png";
// import donut5 from "../../assets/donut/donut-5.png";

const DonutGame = ({ onScoreUpdate, onGameClear }) => {
  const [currentDonut, setCurrentDonut] = useState(0);
  const [nextDonut, setNextDonut] = useState(1);
  const [stackedDonuts, setStackedDonuts] = useState([]);
  const [isDropping, setIsDropping] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [particles, setParticles] = useState([]); // 파티클 효과
  const [showConfetti, setShowConfetti] = useState(false); // 성공 시 confetti
  
  const donutRef = useRef(null);
  const tableRef = useRef(null);
  const shadowRef = useRef(null);
  const controls = useAnimation();

  // 도넛 종류 (임시 이모지, 실제로는 이미지로 교체)
  const donutTypes = ["🍩", "🍪", "🧁", "🎂", "🍰"];
  
  // 도넛 색상 매핑 (실제 이미지 사용 시 제거 가능)
  const donutColors = [
    "bg-pink-400",
    "bg-amber-600", 
    "bg-purple-400",
    "bg-red-400",
    "bg-yellow-400"
  ];

  // 좌우 이동 애니메이션 (회전 추가)
  useEffect(() => {
    if (!isDropping && !gameOver) {
      controls.start({
        x: [0, 200, 0, -200, 0],
        rotate: [0, 180, 360, 540, 720], // 좌우 이동하며 회전
        transition: {
          duration: 4,
          repeat: Infinity,
          ease: "linear"
        }
      });
    }
  }, [isDropping, gameOver, controls]);

  // 파티클 생성 함수
  const createParticles = (x, y) => {
    const newParticles = [];
    for (let i = 0; i < 8; i++) {
      newParticles.push({
        id: Date.now() + i,
        x: x,
        y: y,
        angle: (Math.PI * 2 * i) / 8,
        speed: 50 + Math.random() * 50,
        color: ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3'][Math.floor(Math.random() * 4)]
      });
    }
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 1000);
  };

  // 도넛 떨어뜨리기 (개선된 버전)
  const handleDrop = () => {
    if (isDropping || gameOver) return;
    
    setIsDropping(true);
    controls.stop();

    // 현재 X 위치 가져오기
    const currentX = donutRef.current?.offsetLeft || 0;
    const targetY = 300 - (stackedDonuts.length * 60);
    
    // 그림자 애니메이션 (도넛이 떨어지는 동안)
    if (shadowRef.current) {
      gsap.to(shadowRef.current, {
        scale: [0.5, 1.5],
        opacity: [0.3, 0.8],
        duration: 0.8,
        ease: "power2.in"
      });
    }
    
    // 낙하 애니메이션 (GSAP) - 회전 추가
    gsap.to(donutRef.current, {
      y: targetY,
      rotation: "+=720", // 떨어지면서 2바퀴 회전
      duration: 0.8,
      ease: "power2.in",
      onUpdate: function() {
        // 떨어지는 속도에 따라 블러 효과
        const progress = this.progress();
        if (donutRef.current) {
          donutRef.current.style.filter = `blur(${progress * 3}px)`;
        }
      },
      onComplete: () => {
        // 블러 제거
        if (donutRef.current) {
          donutRef.current.style.filter = 'blur(0px)';
        }

        // 충돌 감지
        const isStacked = checkCollision(currentX);
        
        if (isStacked) {
          // 착지 성공! 파티클 효과
          createParticles(currentX, targetY);
          
          // 테이블 흔들림 효과
          if (tableRef.current) {
            gsap.timeline()
              .to(tableRef.current, {
                y: 5,
                duration: 0.05,
                ease: "power2.out"
              })
              .to(tableRef.current, {
                y: 0,
                duration: 0.3,
                ease: "elastic.out(1, 0.5)"
              });
          }

          // Squash & Stretch 효과 (더 과장되게)
          const tl = gsap.timeline();
          tl.to(donutRef.current, {
            scaleY: 0.6,
            scaleX: 1.4,
            duration: 0.08
          })
          .to(donutRef.current, {
            scaleY: 1.1,
            scaleX: 0.9,
            duration: 0.15,
            ease: "power2.out"
          })
          .to(donutRef.current, {
            scaleY: 1,
            scaleX: 1,
            duration: 0.25,
            ease: "elastic.out(1, 0.3)"
          });

          // 성공: 스택에 추가
          const newStack = [...stackedDonuts, {
            type: currentDonut,
            x: currentX
          }];
          setStackedDonuts(newStack);
          onScoreUpdate(newStack.length);

          // 5개 성공 시 클리어 + Confetti
          if (newStack.length >= 5) {
            setShowConfetti(true);
            setTimeout(() => {
              onGameClear();
              setGameOver(true);
            }, 500);
          } else {
            // 다음 도넛 준비
            setTimeout(() => resetDonut(), 400);
          }
        } else {
          // 실패: 도넛이 옆으로 떨어짐
          gsap.to(donutRef.current, {
            x: currentX > 0 ? 200 : -200,
            y: 400,
            rotation: "+=360",
            opacity: 0,
            duration: 0.6,
            ease: "power2.in",
            onComplete: () => {
              setGameOver(true);
            }
          });
        }
      }
    });
  };

  // 충돌 감지 (간단한 버전)
  const checkCollision = (x) => {
    if (stackedDonuts.length === 0) return true; // 첫 도넛은 무조건 성공
    
    const lastDonut = stackedDonuts[stackedDonuts.length - 1];
    const tolerance = 50; // 허용 오차 (픽셀)
    
    return Math.abs(x - lastDonut.x) < tolerance;
  };

  // 도넛 리셋
  const resetDonut = () => {
    gsap.set(donutRef.current, { 
      y: 0, 
      scaleX: 1, 
      scaleY: 1, 
      rotation: 0,
      opacity: 1,
      filter: 'blur(0px)'
    });
    setCurrentDonut(nextDonut);
    setNextDonut((nextDonut + 1) % donutTypes.length);
    setIsDropping(false);
  };

  // 게임 재시작
  const handleRestart = () => {
    setStackedDonuts([]);
    setCurrentDonut(0);
    setNextDonut(1);
    setGameOver(false);
    setIsDropping(false);
    onScoreUpdate(0);
    gsap.set(donutRef.current, { y: 0, scaleX: 1, scaleY: 1 });
  };

  return (
    <div ref={tableRef} className="relative w-full h-[400px]">
      
      {/* 파티클 효과 */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-3 h-3 rounded-full pointer-events-none"
          style={{
            backgroundColor: particle.color,
            left: particle.x,
            top: particle.y,
          }}
          initial={{ scale: 1, opacity: 1 }}
          animate={{
            x: Math.cos(particle.angle) * particle.speed,
            y: Math.sin(particle.angle) * particle.speed,
            scale: 0,
            opacity: 0,
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      ))}

      {/* Confetti (5개 성공 시) */}
      {showConfetti && (
        <>
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={`confetti-${i}`}
              className="absolute w-2 h-4 pointer-events-none"
              style={{
                backgroundColor: ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#1dd1a1'][i % 5],
                left: '50%',
                top: '20%',
                rotate: Math.random() * 360,
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{
                x: (Math.random() - 0.5) * 400,
                y: Math.random() * 300 + 100,
                rotate: Math.random() * 720,
                scale: 1,
                opacity: 0,
              }}
              transition={{ 
                duration: 1.5 + Math.random() * 0.5, 
                ease: "easeOut",
                delay: Math.random() * 0.3
              }}
            />
          ))}
        </>
      )}
      
      {/* 쌓인 도넛들 (원근감 추가) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col-reverse items-center">
        {stackedDonuts.map((donut, index) => {
          const scale = 1 + (index * 0.05); // 위로 갈수록 살짝 크게 (원근감)
          return (
            <motion.div
              key={index}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 15,
                delay: 0.1 
              }}
              className={`w-24 h-16 ${donutColors[donut.type]} rounded-full flex items-center justify-center text-4xl shadow-lg relative`}
              style={{ 
                transform: `scale(${scale})`,
                filter: `drop-shadow(0 ${4 + index * 2}px ${8 + index * 2}px rgba(0,0,0,0.3))`
              }}
            >
              {donutTypes[donut.type]}
              {/* 하이라이트 효과 */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent rounded-full pointer-events-none" />
            </motion.div>
          );
        })}
      </div>

      {/* 그림자 (동적) */}
      {!gameOver && (
        <div
          ref={shadowRef}
          className="absolute left-1/2 -translate-x-1/2 w-20 h-8 bg-black/30 rounded-full blur-md pointer-events-none"
          style={{ 
            bottom: `${stackedDonuts.length * 60}px`,
            willChange: "transform, opacity"
          }}
        />
      )}

      {/* 현재 떨어뜨릴 도넛 (개선된 버전) */}
      {!gameOver && (
        <motion.div
          ref={donutRef}
          animate={controls}
          onClick={handleDrop}
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-24 h-16 ${donutColors[currentDonut]} rounded-full flex items-center justify-center text-4xl cursor-pointer shadow-2xl relative overflow-hidden`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          style={{ willChange: "transform" }}
        >
          {donutTypes[currentDonut]}
          {/* 하이라이트 */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent rounded-full pointer-events-none" />
          {/* 클릭 힌트 */}
          {!isDropping && (
            <motion.div
              className="absolute inset-0 border-4 border-white/50 rounded-full"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </motion.div>
      )}

      {/* 다음 도넛 미리보기 (개선) */}
      {!gameOver && (
        <motion.div 
          className="absolute top-4 right-4 bg-white/90 p-3 rounded-xl shadow-lg backdrop-blur-sm"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-xs text-gray-500 font-bold mb-1 tracking-wider">NEXT</p>
          <div className={`w-12 h-8 ${donutColors[nextDonut]} rounded-full flex items-center justify-center text-2xl relative overflow-hidden`}>
            {donutTypes[nextDonut]}
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-full" />
          </div>
        </motion.div>
      )}

      {/* 게임 오버 (개선) */}
      {gameOver && stackedDonuts.length < 5 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 rounded-xl backdrop-blur-sm"
        >
          <motion.h2 
            className="text-5xl font-black text-white mb-4"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
          >
            GAME OVER
          </motion.h2>
          <motion.p 
            className="text-white text-xl mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Score: <span className="font-black text-pink-400">{stackedDonuts.length}</span> / 5
          </motion.p>
          <motion.button
            onClick={handleRestart}
            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-black rounded-full hover:from-pink-600 hover:to-purple-600 transition shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            RETRY
          </motion.button>
        </motion.div>
      )}

    </div>
  );
};

export default DonutGame;

