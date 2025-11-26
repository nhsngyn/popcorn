import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Roulette() {
  const container = useRef(null);

  useEffect(() => {
    gsap.from(container.current, { opacity: 0, duration: 1 });
  }, []);

  return (
    <div
      ref={container}
      className="w-screen h-screen bg-black text-white flex items-center justify-center"
    >
      <h1>Roulette Scene</h1>
    </div>
  );
}
