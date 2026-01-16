// src/pages/Lobby/index.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import lobbyBg from "../../assets/lobby/Lobby.png";

const Lobby = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const shows = [
    {
      id: 1,
      path: "/mahjong",
      title: "Night in HK",
      subtitle: "Interactive Tiles",
      icon: "🀄",
      // 테두리/그림자 색상 제거 -> 로직에서 화이트로 통일
      textColor: "text-red-400", // 타이틀 포인트 컬러만 유지
    },
    {
      id: 2,
      path: "/scratch",
      title: "Secret Door",
      subtitle: "Scratch",
      icon: "🧵",
      textColor: "text-blue-400",
    },
    {
      id: 3,
      path: "/donut",
      title: "Pop Diner",
      subtitle: "Stacking",
      icon: "🍩",
      textColor: "text-amber-300",
    },
  ];

  return (
    <div className="relative w-full h-screen overflow-hidden font-sans bg-neutral-900">
      
      {/* 배경 이미지 (밝기 유지) */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
        style={{ backgroundImage: `url(${lobbyBg})` }}
      />
      
      {/* 오버레이 (하단 위주로 어둡게) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90 pointer-events-none" />

      {/* 메인 컨텐츠 */}
      <div className="relative w-full h-full flex flex-col items-center justify-center z-10">
        
        {/* 메인 타이틀 */}
        <motion.div
          className="text-center mb-28"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-7xl md:text-8xl font-black text-white tracking-[0.2em] mb-4 drop-shadow-xl"
            style={{ fontFamily: "serif" }}
            animate={{ 
              textShadow: [
                "0 0 15px rgba(255,255,255,0.3)",
                "0 0 30px rgba(255,255,255,0.5)",
                "0 0 15px rgba(255,255,255,0.3)"
              ]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            POPCORN
          </motion.h1>
          <p className="text-neutral-300 tracking-[0.8em] text-sm uppercase font-light drop-shadow-md">
            Cinema Experience
          </p>
        </motion.div>

        {/* 상영작 카드들 */}
        <div className="flex gap-12 items-end justify-center perspective-1000">
          {shows.map((show, index) => (
            <Link
              key={show.id}
              to={show.path}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <motion.div
                className="relative group cursor-pointer"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.2 }}
                whileHover={{ y: -30, scale: 1.05, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              >
                {/* 화이트 스포트라이트 */}
                <AnimatePresence>
                  {hoveredCard === index && (
                    <motion.div
                      className="absolute pointer-events-none z-0"
                      style={{
                        top: "-160px",
                        left: "50%",
                        width: "280px",
                        height: "500px",
                        // 순수한 핀 조명 느낌
                        background: `radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.2) 0%, transparent 70%)`,
                        filter: "blur(30px)",
                        transform: "translateX(-50%)",
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </AnimatePresence>

                {/* 블랙 티켓 + 화이트 하이라이트 */}
                <div 
                  className={`
                    relative w-56 h-80 bg-[#121212]
                    border-[3px] rounded-lg
                    ${hoveredCard === index 
                      ? 'border-white/80 shadow-[0_0_30px_rgba(255,255,255,0.2)]' // Hover: 화이트 보더 + 은은한 화이트 글로우
                      : 'border-neutral-800 shadow-xl shadow-black/80' // Default: 어두운 보더
                    }
                    overflow-hidden transition-all duration-300 ease-out
                  `}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.07' style='mix-blend-mode: overlay;'/%3E%3C/svg%3E")`,
                  }}
                >
                  
                  {/* 상단 정보 */}
                  <div className="absolute top-4 left-0 right-0 flex justify-between px-5">
                    <span className="text-[9px] font-mono text-neutral-600 tracking-widest">
                      GATE 0{show.id}
                    </span>
                    <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-[6px] ${hoveredCard === index ? 'text-white' : 'text-neutral-800'}`}>★</span>
                        ))}
                    </div>
                  </div>

                  {/* 메인 콘텐츠 */}
                  <div className="relative w-full h-full flex flex-col items-center pt-12 px-4 z-10">
                    <h3 className="text-xl font-black text-white tracking-tighter border-b border-neutral-800 pb-2 mb-6 w-2/3 text-center" style={{ fontFamily: 'Arial Black, sans-serif' }}>
                      ADMIT ONE
                    </h3>
                    
                    <motion.div 
                      className="text-6xl mb-6 filter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                      animate={hoveredCard === index ? { scale: 1.15, rotate: [0, -3, 3, 0] } : { scale: 1, rotate: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      {show.icon}
                    </motion.div>

                    {/* 제목 (포인트 컬러는 유지하되 더 밝게) */}
                    <h4 className={`text-lg font-bold ${show.textColor} text-center leading-tight mb-2 tracking-wide drop-shadow-sm`}>
                      {show.title.toUpperCase()}
                    </h4>
                    
                    {/* 부제목: 호버시 화이트로 변환되어 가독성 확보 */}
                    <p className={`text-[10px] font-mono tracking-[0.2em] text-center uppercase transition-colors duration-300 ${hoveredCard === index ? 'text-white' : 'text-neutral-600'}`}>
                      {show.subtitle}
                    </p>
                  </div>

                  {/* 하단 바코드 데코레이션 */}
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-black/40 border-t border-dashed border-neutral-800 flex items-center justify-center">
                    <div className="h-4 w-2/3 flex justify-between items-end opacity-40">
                      {[...Array(12)].map((_, i) => (
                        <div key={i} className={`w-[2px] transition-colors duration-300 ${hoveredCard === index ? 'bg-neutral-500' : 'bg-neutral-800'}`} style={{ height: `${Math.random() * 100}%` }} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* 바닥 반사/그림자 */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-2/3 h-4 bg-black/90 blur-xl rounded-full" />
              </motion.div>
            </Link>
          ))}
        </div>

        {/* 하단 안내 문구 */}
        <motion.p
          className="absolute bottom-12 text-neutral-400 text-xs tracking-[0.3em] uppercase font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Select your movie
        </motion.p>
      </div>
      
       {/* 전체 그레인 필터 */}
       <div className="absolute inset-0 pointer-events-none opacity-[0.04] z-50 mix-blend-screen"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }} />
    </div>
  );
};

export default Lobby;