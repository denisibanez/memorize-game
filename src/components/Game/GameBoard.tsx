'use client';
import React, { useEffect, useState } from 'react';
import Card from './Card';
import Timer from './Timer';
import { useSession } from 'next-auth/react';
import HighScoresModal from '../Scores/HighScoresModal';
import { FaTrophy } from 'react-icons/fa';
import { FiRefreshCw, FiBarChart2 } from 'react-icons/fi';
import ConfettiExplosion from 'react-confetti-explosion';

interface CardType {
  id: number;
  image: string;
  flipped: boolean;
  matched: boolean;
}

function shuffle<T>(array: T[]): T[] {
  let arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

async function fetchImages(seed: string): Promise<string[]> {
  const urls: string[] = [];
  for (let i = 0; i < 6; i++) {
    urls.push(`https://picsum.photos/seed/${seed}_${i}/120/120`);
  }
  return urls;
}

interface GameBoardProps {
  showScores: boolean;
  setShowScores: (open: boolean) => void;
}

export default function GameBoard({ showScores, setShowScores }: GameBoardProps) {
  const { data } = useSession();
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [isBusy, setIsBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [resetTimer, setResetTimer] = useState(0);
  const [victory, setVictory] = useState(false);
  const [victoryTime, setVictoryTime] = useState<number | null>(null);

  // Seed para as imagens dos cards, só no client
  const [baseSeed, setBaseSeed] = useState<string | null>(null);

  useEffect(() => {
    if (baseSeed === null && typeof window !== 'undefined') {
      setBaseSeed(Math.random().toString(36).substring(2, 10));
    }
  }, [baseSeed]);

  useEffect(() => {
    if (!baseSeed) return;
    async function setupBoard() {
      setLoading(true);
      const images = await fetchImages(baseSeed as string);
      const cardList: CardType[] = shuffle(
        images
          .concat(images)
          .map((img, idx) => ({
            id: idx,
            image: img,
            flipped: false,
            matched: false,
          }))
      );
      setCards(cardList);
      setFlippedIndices([]);
      setIsBusy(false);
      setVictory(false);
      setVictoryTime(null);
      setRunning(false);
      setResetTimer((v) => v + 1);
      setLoading(false);
    }
    setupBoard();
  }, [baseSeed]);

  useEffect(() => {
    if (!victory && cards.length && cards.every((c) => c.matched)) {
      setVictory(true);
      setRunning(false);
    }
  }, [cards, victory]);

  useEffect(() => {
    if (victory && victoryTime && data?.user?.name) {
      const scores = JSON.parse(localStorage.getItem('memory-scores') || '[]');
      scores.push({ name: data.user.name, time: victoryTime });
      localStorage.setItem('memory-scores', JSON.stringify(scores));
    }
  }, [victory, victoryTime, data?.user?.name]);

  const handleRestart = () => {
    window.location.reload();
  };

  const handleCardClick = (idx: number) => {
    if (isBusy) return;
    if (cards[idx].flipped || cards[idx].matched) return;
    if (flippedIndices.length === 2) return;
    if (!running) setRunning(true);

    const newCards = cards.map((c, i) =>
      i === idx ? { ...c, flipped: true } : c
    );
    const newFlipped = [...flippedIndices, idx];
    setCards(newCards);
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setIsBusy(true);
      const [firstIdx, secondIdx] = newFlipped;
      if (newCards[firstIdx].image === newCards[secondIdx].image) {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c, i) =>
              i === firstIdx || i === secondIdx ? { ...c, matched: true } : c
            )
          );
          setFlippedIndices([]);
          setIsBusy(false);
        }, 700);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c, i) =>
              i === firstIdx || i === secondIdx ? { ...c, flipped: false } : c
            )
          );
          setFlippedIndices([]);
          setIsBusy(false);
        }, 900);
      }
    }
  };

  const handleTimerFinish = (seconds: number) => {
    setVictoryTime(seconds);
  };

  function formatTime(seconds: number) {
    if (seconds < 60) return `${seconds}s`;
    const m = Math.floor(seconds / 60);
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}m ${s}s`;
  }

  if (loading || !baseSeed) {
    return <div className="text-white">Carregando cartas...</div>;
  }

  // Pega os scores do localStorage para passar para o Timer
  let scores: number[] = [];
  if (typeof window !== 'undefined') {
    scores = JSON.parse(localStorage.getItem('memory-scores') || '[]').map((s: any) => s.time).sort((a: number, b: number) => a - b).slice(0, 3);
  }

  return (
    <div className="flex flex-col items-center w-full">
      <Timer running={running && !victory && !showScores} onFinish={handleTimerFinish} resetTrigger={resetTimer} scores={scores} />
      <div className="relative  w-full flex justify-center">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 w-full md:max-w-fit justify-center gap-2 p-4 sm:mt-8 mb-24 sm:mb-0">
          {cards.map((card, idx) => (
            <Card
              key={card.id}
              image={card.image}
              flipped={card.flipped}
              matched={card.matched}
              onClick={() => handleCardClick(idx)}
            />
          ))}
        </div>
        {victory && (
          <>
            {/* Confetti global, centralizado na tela toda */}
            <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[999]">
              <ConfettiExplosion force={0.7} duration={2200} particleCount={120} width={window.innerWidth} />
            </div>
            {/* Overlay de vitória */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black/80 px-8 py-8 flex flex-col items-center w-full h-full justify-center">
                <FaTrophy size={48} className="text-purple-400 mb-2 drop-shadow-lg" />
                <div className="text-2xl font-bold text-white mb-2 flex flex-col items-center">
                  <span className="text-purple-300">You won{victoryTime !== null ? <span className='text-cyan-300'> in {formatTime(victoryTime)}</span> : ''}!</span>
                </div>
                <div className="mt-2 flex gap-6 justify-center">
                  <button
                    onClick={handleRestart}
                    className="flex items-center gap-1 text-cyan-300 hover:text-cyan-100 text-base font-medium cursor-pointer bg-transparent border-none p-0 m-0 shadow-none transition-colors"
                    style={{ outline: 'none' }}
                  >
                    <FiRefreshCw size={18} /> Play again
                  </button>
                  <button
                    onClick={() => setShowScores(true)}
                    className="flex items-center gap-1 text-cyan-300 hover:text-cyan-100 text-base font-medium cursor-pointer bg-transparent border-none p-0 m-0 shadow-none transition-colors"
                    style={{ outline: 'none' }}
                  >
                    <FiBarChart2 size={18} /> Score board
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <HighScoresModal open={showScores} onClose={() => setShowScores(false)} />
    </div>
  );
} 