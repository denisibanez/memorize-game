import React from "react";
import { FaTrophy } from "react-icons/fa";
import { FiRefreshCw, FiBarChart2 } from "react-icons/fi";

export interface VictoryOverlayProps {
  open: boolean;
  time?: number | null;
  onRestart: () => void;
  onShowScores: () => void;
  formatTime: (seconds: number) => string;
}

export default function VictoryOverlay({
  open,
  time,
  onRestart,
  onShowScores,
  formatTime,
}: VictoryOverlayProps) {
  if (!open) return null;
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="bg-black/80 px-8 py-8 flex flex-col items-center w-full h-full md:w-[86%] md:h-[75%] md:mt-8 justify-center">
        <FaTrophy size={48} className="text-purple-400 mb-2 drop-shadow-lg" />
        <div className="text-2xl font-bold text-white mb-2 flex flex-col items-center">
          <span className="text-purple-300">
            You won
            {time !== null ? (
              <span className="text-cyan-300"> in {formatTime(time!)}</span>
            ) : (
              ""
            )}
            !
          </span>
        </div>
        <div className="mt-2 flex gap-6 justify-center">
          <button
            onClick={onRestart}
            className="flex items-center gap-1 text-cyan-300 hover:text-cyan-100 text-base font-medium cursor-pointer bg-transparent border-none p-0 m-0 shadow-none transition-colors"
            style={{ outline: "none" }}
          >
            <FiRefreshCw size={18} /> Play again
          </button>
          <button
            onClick={onShowScores}
            className="flex items-center gap-1 text-cyan-300 hover:text-cyan-100 text-base font-medium cursor-pointer bg-transparent border-none p-0 m-0 shadow-none transition-colors"
            style={{ outline: "none" }}
          >
            <FiBarChart2 size={18} /> Score board
          </button>
        </div>
      </div>
    </div>
  );
}
