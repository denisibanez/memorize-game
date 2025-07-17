import React from "react";
import { FiRefreshCw, FiBarChart2, FiLogOut } from "react-icons/fi";

interface GameMenuProps {
  onNewGame: () => void;
  onShowScores: () => void;
  onLogout: () => void;
  variant?: "mobile" | "desktop";
  className?: string;
}

export default function GameMenu({
  onNewGame,
  onShowScores,
  onLogout,
  variant = "mobile",
  className = "",
}: GameMenuProps) {
  const base = "flex flex-col items-center";
  const menuClass =
    variant === "desktop"
      ? "flex gap-6 bg-[#23243a]/80 px-4 py-2 shadow border border-cyan-900 rounded-lg"
      : "flex gap-10 sm:gap-6 bg-[#23243a]/80 py-2 shadow w-full justify-center max-w-full rounded-none border-0 fixed left-0 right-0 bottom-0 z-50 h-16";
  return (
    <div className={`${menuClass} ${className}`}>
      <div className={base}>
        <button
          title="New Game"
          onClick={onNewGame}
          className="p-2 text-cyan-300 hover:text-cyan-100 transition-colors cursor-pointer"
          aria-label="New Game"
        >
          <FiRefreshCw size={20} />
        </button>
        <span className="text-xs text-cyan-200 mt-1 font-mono select-none">
          Novo Jogo
        </span>
      </div>
      <div className={base}>
        <button
          title="Score Board"
          onClick={onShowScores}
          className="p-2 text-cyan-300 hover:text-cyan-100 transition-colors cursor-pointer"
          aria-label="Score Board"
        >
          <FiBarChart2 size={20} />
        </button>
        <span className="text-xs text-cyan-200 mt-1 font-mono select-none">
          Placar
        </span>
      </div>
      <div className={base}>
        <button
          title="Logout"
          onClick={onLogout}
          className="p-2 text-cyan-300 hover:text-red-400 transition-colors cursor-pointer"
          aria-label="Logout"
        >
          <FiLogOut size={20} />
        </button>
        <span className="text-xs text-cyan-200 mt-1 font-mono select-none">
          Sair
        </span>
      </div>
    </div>
  );
}
