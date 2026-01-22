import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// 페이지들 불러오기
import Lobby from './pages/Lobby';
import MahjongCinema from './pages/Mahjong/MahjongCinema';
import Scratch from './pages/Scratch';
import Donut from './pages/Donut';

const MobileWarning = () => (
  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white p-6 text-center">
    <h2 className="text-2xl font-bold mb-4">🖥️ PC 접속 권장</h2>
    <p className="text-gray-300 font-suit leading-relaxed">
      이 프로젝트는 데스크톱 환경에 최적화된<br/>
      인터랙티브 전시입니다.<br/>
      <span className="text-sm text-gray-500 mt-2 block">
        더 나은 경험을 위해 PC로 접속해 주세요.
      </span>
    </p>
  </div>
);

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      // 768px 이하는 모바일/태블릿으로 간주
      setIsMobile(window.innerWidth <= 768);
    };
    
    // 초기 체크
    checkMobile();
    
    // 리사이즈 이벤트 감지
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 모바일이면 경고창 렌더링하고 라우터는 실행하지 않음
  if (isMobile) return <MobileWarning />;

  return (
    <Routes>
      {/* 메인 로비 (주소: /) */}
      <Route path="/" element={<Lobby />} />
      
      {/* 마작 페이지 (주소: /mahjong) */}
      <Route path="/mahjong" element={<MahjongCinema />} />
      
      {/* 레거시 경로 호환성 유지 (혹시 예전 링크로 들어오는 경우 대비) */}
      <Route path="/roulette" element={<MahjongCinema />} />
      
      {/* 스크래치 페이지 (주소: /scratch) */}
      <Route path="/scratch" element={<Scratch />} />
      
      {/* 도넛 페이지 (주소: /donut) */}
      <Route path="/donut" element={<Donut />} />
    </Routes>
  );
}

export default App;