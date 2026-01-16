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
      textColor: "text-red-400",
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
      
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
        style={{ backgroundImage: `url(${lobbyBg})` }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90 pointer-events-none" />

      <div className="relative w-full h-full flex flex-col items-center justify-center z-10">
        
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
                <AnimatePresence>
                  {hoveredCard === index && (
                    <motion.div
                      className="absolute pointer-events-none z-0"
                      style={{
                        top: "-160px",
                        left: "50%",
                        width: "280px",
                        height: "500px",
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

                <div 
                  className={`
                    relative w-56 h-80 bg-[#121212]
                    border-[3px] rounded-lg
                    ${hoveredCard === index 
                      ? 'border-white/80 shadow-[0_0_30px_rgba(255,255,255,0.2)]'
                      : 'border-neutral-800 shadow-xl shadow-black/80'
                    }
                    overflow-hidden transition-all duration-300 ease-out
                  `}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.07' style='mix-blend-mode: overlay;'/%3E%3C/svg%3E")`,
                  }}
                >
                  
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

                    <h4 className={`text-lg font-bold ${show.textColor} text-center leading-tight mb-2 tracking-wide drop-shadow-sm`}>
                      {show.title.toUpperCase()}
                    </h4>
                    
                    <p className={`text-[10px] font-mono tracking-[0.2em] text-center uppercase transition-colors duration-300 ${hoveredCard === index ? 'text-white' : 'text-neutral-600'}`}>
                      {show.subtitle}
                    </p>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-black/40 border-t border-dashed border-neutral-800 flex items-center justify-center">
                    <div className="h-4 w-2/3 flex justify-between items-end opacity-40">
                      {[...Array(12)].map((_, i) => (
                        <div key={i} className={`w-[2px] transition-colors duration-300 ${hoveredCard === index ? 'bg-neutral-500' : 'bg-neutral-800'}`} style={{ height: `${Math.random() * 100}%` }} />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-2/3 h-4 bg-black/90 blur-xl rounded-full" />
              </motion.div>
            </Link>
          ))}
        </div>

        <motion.p
          className="absolute bottom-12 text-neutral-400 text-xs tracking-[0.3em] uppercase font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Select your movie
        </motion.p>
      </div>
      
       <div className="absolute inset-0 pointer-events-none opacity-[0.04] z-50 mix-blend-screen"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }} />
    </div>
  );
};

export default Lobby;