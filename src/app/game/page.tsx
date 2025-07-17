'use client';
import React, { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import GameBoard from '../../components/Game/GameBoard';
import HighScoresModal from '../../components/Scores/HighScoresModal';
import { FiRefreshCw, FiBarChart2, FiLogOut } from 'react-icons/fi';
import { FiUser } from 'react-icons/fi';

export default function GamePage() {
  const { status, data } = useSession();

  console.log(data?.user?.image, 'sss')
  const router = useRouter();
  const [showScores, setShowScores] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  if (status === 'authenticated') {
    return (
      <div className="min-h-screen flex flex-col items-center bg-transparent sm:px-0">
        <header className="w-full flex flex-col items-center gap-2 pt-8 pb-4">
          {/* Até lg: título e avatar juntos centralizados */}
          <div className="w-full flex flex-row items-center justify-center gap-2 lg:hidden">
            <h1 className="text-2xl font-bold tracking-widest font-mono uppercase bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent select-none mb-0">MEMORIZER</h1>
            <span className="bg-black/40 px-4 py-1 rounded text-cyan-100 font-mono text-sm flex items-center gap-2">
              {data?.user?.image ? (
                <img src={data.user.image} alt={data.user.name || 'Avatar'} className="w-7 h-7 rounded-full border-2 border-cyan-400 shadow" />
              ) : (
                <FiUser size={28} className="text-cyan-400 bg-cyan-900 rounded-full p-1 border-2 border-cyan-400 shadow w-7 h-7" />
              )}
            </span>
          </div>
          {/* lg+: título centralizado, avatar e botões embaixo justify-between */}
          <div className="w-full hidden lg:block">
            <div className="flex flex-col items-center">
              <h1 className="text-2xl font-bold tracking-widest font-mono uppercase bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent select-none mb-2 text-center">MEMORIZER</h1>
            </div>
            <div className="flex flex-row items-center justify-between max-w-3xl mx-auto mt-2">
              <span className="bg-black/40 px-4 py-1 rounded text-cyan-100 font-mono text-sm flex items-center gap-2">
                {data?.user?.image ? (
                  <img src={data.user.image} alt={data.user.name || 'Avatar'} className="w-7 h-7 rounded-full border-2 border-cyan-400 shadow" />
                ) : (
                  <FiUser size={28} className="text-cyan-400 bg-cyan-900 rounded-full p-1 border-2 border-cyan-400 shadow w-7 h-7" />
                )}
                <span className="hidden lg:inline">{data?.user?.name}</span>
              </span>
              {/* Menu no header apenas em lg+ */}
              <div className="hidden lg:flex gap-6 bg-[#23243a]/80 px-4 py-2 shadow border border-cyan-900 rounded-lg">
                <div className="flex flex-col items-center">
                  <button title="New Game" onClick={() => window.location.reload()} className="p-2 text-cyan-300 hover:text-cyan-100 transition-colors cursor-pointer" aria-label="New Game">
                    <FiRefreshCw size={20} />
                  </button>
                  <span className="text-xs text-cyan-200 mt-1 font-mono select-none">Novo Jogo</span>
                </div>
                <div className="flex flex-col items-center">
                  <button title="Score Board" onClick={() => setShowScores(true)} className="p-2 text-cyan-300 hover:text-cyan-100 transition-colors cursor-pointer" aria-label="Score Board">
                    <FiBarChart2 size={20} />
                  </button>
                  <span className="text-xs text-cyan-200 mt-1 font-mono select-none">Placar</span>
                </div>
                <div className="flex flex-col items-center">
                  <button title="Logout" onClick={() => signOut()} className="p-2 text-cyan-300 hover:text-red-400 transition-colors cursor-pointer" aria-label="Logout">
                    <FiLogOut size={20} />
                  </button>
                  <span className="text-xs text-cyan-200 mt-1 font-mono select-none">Sair</span>
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="flex flex-col items-center justify-center flex-1 w-full pb-16">
          <div className="w-full">
            <GameBoard showScores={showScores} setShowScores={setShowScores} />
            {/* Menu após o conteúdo dos cards até lg */}
            <div className="flex gap-10 sm:gap-6 bg-[#23243a]/80 py-2 shadow w-full justify-center lg:hidden max-w-full rounded-none border-0 fixed left-0 right-0 bottom-0 z-50 h-16">
              <div className="flex flex-col items-center">
                <button title="New Game" onClick={() => window.location.reload()} className="p-2 text-cyan-300 hover:text-cyan-100 transition-colors cursor-pointer" aria-label="New Game">
                  <FiRefreshCw size={20} />
                </button>
                <span className="text-xs text-cyan-200 mt-1 font-mono select-none">Novo Jogo</span>
              </div>
              <div className="flex flex-col items-center">
                <button title="Score Board" onClick={() => setShowScores(true)} className="p-2 text-cyan-300 hover:text-cyan-100 transition-colors cursor-pointer" aria-label="Score Board">
                  <FiBarChart2 size={20} />
                </button>
                <span className="text-xs text-cyan-200 mt-1 font-mono select-none">Placar</span>
              </div>
              <div className="flex flex-col items-center">
                <button title="Logout" onClick={() => signOut()} className="p-2 text-cyan-300 hover:text-red-400 transition-colors cursor-pointer" aria-label="Logout">
                  <FiLogOut size={20} />
                </button>
                <span className="text-xs text-cyan-200 mt-1 font-mono select-none">Sair</span>
              </div>
            </div>
          </div>
        </main>
        <HighScoresModal open={showScores} onClose={() => setShowScores(false)} />
      </div>
    );
  }

  return null;
} 