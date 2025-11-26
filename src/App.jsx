import { Routes, Route } from 'react-router-dom';
// 페이지들 불러오기
import Lobby from './pages/Lobby';
import Roulette from './pages/Roulette';
import Scratch from './pages/Scratch';
import Donut from './pages/Donut';

function App() {
  return (
    <Routes>
      {/* 메인 로비 (주소: /) */}
      <Route path="/" element={<Lobby />} />
      
      {/* 룰렛 페이지 (주소: /roulette) */}
      <Route path="/roulette" element={<Roulette />} />
      
      {/* 스크래치 페이지 (주소: /scratch) */}
      <Route path="/scratch" element={<Scratch />} />
      
      {/* 도넛 페이지 (주소: /donut) */}
      <Route path="/donut" element={<Donut />} />
    </Routes>
  );
}

export default App;