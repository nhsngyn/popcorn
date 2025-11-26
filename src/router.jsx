import { BrowserRouter, Routes, Route } from "react-router-dom";
import Intro from "./scenes/intro/Intro";
import Roulette from "./scenes/roulette/Roulette";
import Scratch from "./scenes/scratch/Scratch";
import Donut from "./scenes/donut/Donut";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/intro" element={<Intro/>} />
        <Route path="/roulette" element={<Roulette />} />
        <Route path="/scratch" element={<Scratch />} />
        <Route path="/donut" element={<Donut />} />
      </Routes>
    </BrowserRouter>
  );
}
