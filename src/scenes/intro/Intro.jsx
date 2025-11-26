import { Link } from "react-router-dom";

export default function Intro() {
  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center">
      <div className="flex gap-12">

        {/* Roulette */}
        <Link
          to="/roulette"
          className="w-64 h-80 bg-gray-800 rounded-xl flex items-center justify-center text-white hover:bg-gray-700 transition"
        >
          Roulette
        </Link>

        {/* Scratch */}
        <Link
          to="/scratch"
          className="w-64 h-80 bg-gray-800 rounded-xl flex items-center justify-center text-white hover:bg-gray-700 transition"
        >
          Scratch
        </Link>

        {/* Donut */}
        <Link
          to="/donut"
          className="w-64 h-80 bg-gray-800 rounded-xl flex items-center justify-center text-white hover:bg-gray-700 transition"
        >
          Donut
        </Link>

      </div>
    </div>
  );
}
