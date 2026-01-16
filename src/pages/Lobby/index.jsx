// src/pages/Lobby/index.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
      color: "red",
      spotlightColor: "rgba(220, 38, 38, 0.6)", // red-600
    },
    {
      id: 2,
      path: "/scratch",
      title: "Secret Door",
      subtitle: "Scratch",
      icon: "🧵",
      color: "blue",
      spotlightColor: "rgba(37, 99, 235, 0.6)", // blue-600
    },
    {
      id: 3,
      path: "/donut",
      title: "Pop Diner",
      subtitle: "Stacking",
      icon: "🍩",
      color: "yellow",
      spotlightColor: "rgba(234, 179, 8, 0.6)", // yellow-600
    },
  ];

  return (
    <div className="relative w-full h-screen overflow-hidden font-sans">
      
      {/* 배경 이미지 */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${lobbyBg})` }}
      >
        {/* 어두운 오버레이 (카드가 더 잘 보이도록) */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* 스포트라이트 효과 (호버 시) */}
      {hoveredCard !== null && (
        <motion.div
          className="absolute pointer-events-none z-10"
          style={{
            top: "20%",
            left: `${30 + hoveredCard * 20}%`,
            width: "400px",
            height: "400px",
            background: `radial-gradient(circle, ${shows[hoveredCard].spotlightColor} 0%, transparent 70%)`,
            filter: "blur(40px)",
            transform: "translateX(-50%)",
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        />
      )}

      {/* 메인 컨텐츠 */}
      <div className="relative w-full h-full flex flex-col items-center justify-center z-10">
        
        {/* 극장 타이틀 */}
        <motion.div
          className="text-center mb-20"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h1 className="text-7xl font-black text-amber-100 tracking-[0.3em] mb-2 drop-shadow-[0_0_30px_rgba(251,191,36,0.5)]"
              style={{ 
                textShadow: "0 0 20px rgba(251,191,36,0.8), 0 0 40px rgba(251,191,36,0.4)",
                fontFamily: "serif"
              }}>
            POPCORN
          </h1>
          <p className="text-amber-200/60 tracking-[0.8em] text-sm uppercase">Cinema</p>
        </motion.div>

        {/* 상영작 카드들 */}
        <div className="flex gap-16 items-end justify-center">
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
                transition={{ duration: 0.8, delay: 0.8 + index * 0.2 }}
                whileHover={{ y: -30, scale: 1.05 }}
              >
                {/* 카드 본체 */}
                <div className={`
                  relative w-56 h-80 bg-gradient-to-b from-neutral-800 to-neutral-900
                  border-2 ${
                    hoveredCard === index 
                      ? `border-${show.color}-500 shadow-[0_0_40px_rgba(${show.color === 'red' ? '220,38,38' : show.color === 'blue' ? '37,99,235' : '234,179,8'},0.6)]`
                      : 'border-neutral-700'
                  }
                  rounded-lg overflow-hidden
                  transition-all duration-500
                `}>
                  
                  {/* 스포트라이트 받는 효과 */}
                  <div className={`
                    absolute inset-0 
                    ${hoveredCard === index ? 'opacity-100' : 'opacity-0'}
                    bg-gradient-to-b from-white/10 to-transparent
                    transition-opacity duration-500
                  `} />

                  {/* 콘텐츠 */}
                  <div className="relative w-full h-full flex flex-col items-center justify-center p-6 z-10">
                    <motion.span 
                      className="text-7xl mb-6"
                      animate={hoveredCard === index ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 0.6, repeat: Infinity }}
                    >
                      {show.icon}
                    </motion.span>
                    <h3 className={`
                      text-2xl font-bold text-center mb-2
                      ${hoveredCard === index ? `text-${show.color}-400` : 'text-neutral-300'}
                      transition-colors duration-300
                    `}>
                      {show.title}
                    </h3>
                    <p className="text-xs text-neutral-500 uppercase tracking-widest">
                      {show.subtitle}
                    </p>

                    {/* 티켓 스타일 장식 */}
                    <div className="absolute top-4 right-4 w-8 h-8 border-2 border-neutral-600 rounded-full opacity-30" />
                    <div className="absolute bottom-4 left-4 w-8 h-8 border-2 border-neutral-600 rounded-full opacity-30" />
                  </div>

                  {/* 하단 그림자 */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
                </div>

                {/* 카드 아래 그림자 */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4/5 h-4 bg-black/40 blur-xl rounded-full" />
              </motion.div>
            </Link>
          ))}
        </div>

        {/* 하단 안내 문구 */}
        <motion.p
          className="absolute bottom-12 text-neutral-600 text-sm tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          Select your experience
        </motion.p>
      </div>

      {/* 빈티지 필름 그레인 효과 */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-30"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
           }} />
    </div>
  );
};

export default Lobby;
