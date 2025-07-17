import React from "react";
import MemorizerTitle from "@/components/Common/MemorizerTitle/MemorizerTitle";
import UserAvatar from "@/components/Common/UserAvatar/UserAvatar";
import GameMenu from "@/components/Common/GameMenu/GameMenu";

interface HeaderProps {
  user: { image?: string; name?: string };
  onNewGame: () => void;
  onShowScores: () => void;
  onLogout: () => void;
}

export default function Header({
  user,
  onNewGame,
  onShowScores,
  onLogout,
}: HeaderProps) {
  return (
    <header className="w-full flex flex-col items-center gap-2 pt-8 pb-4">
      {/* Up to lg: title and avatar centered together */}
      <div className="w-full flex flex-row items-center justify-center gap-2 lg:hidden">
        <MemorizerTitle />
        <span className="bg-black/40 px-4 py-1 rounded text-cyan-100 font-mono text-sm flex items-center gap-2">
          <UserAvatar image={user.image} name={user.name} />
        </span>
      </div>
      {/* lg+: centered title, avatar and buttons below justify-between */}
      <div className="w-full hidden lg:block">
        <div className="flex flex-col items-center">
          <MemorizerTitle className="mb-2 text-center" />
        </div>
        <div className="flex flex-row items-center justify-between max-w-3xl mx-auto mt-2">
          <span className="bg-black/40 px-4 py-1 rounded text-cyan-100 font-mono text-sm flex items-center gap-2">
            <UserAvatar image={user.image} name={user.name} />
            <span className="hidden lg:inline">{user.name}</span>
          </span>
          {/* Menu in header only on lg+ */}
          <div className="hidden lg:flex">
            <GameMenu
              onNewGame={onNewGame}
              onShowScores={onShowScores}
              onLogout={onLogout}
              variant="desktop"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
