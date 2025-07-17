'use client';
import React, { useEffect, useRef, useState } from 'react';
import { FiClock } from 'react-icons/fi';
import { FaTrophy } from 'react-icons/fa';

interface TimerProps {
  running: boolean;
  onFinish?: (seconds: number) => void;
  resetTrigger?: any;
  scores?: number[];
}

export default function Timer({ running, onFinish, resetTrigger, scores = [] }: TimerProps) {
  const [ms, setMs] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setMs((prev) => prev + 10);
      }, 10);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  useEffect(() => {
    setMs(0);
  }, [resetTrigger]);

  useEffect(() => {
    if (!running && ms > 0 && onFinish) {
      onFinish(Math.floor(ms / 1000));
    }
    // eslint-disable-next-line
  }, [running]);

  const format = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    const centiseconds = Math.floor((ms % 1000) / 10).toString().padStart(2, '0');
    return `${minutes}:${seconds}.${centiseconds}`;
  };

  // Determinar cor do timer e do troféu conforme colocação
  let timerColor = 'text-cyan-300';
  let trophyGradient = '';
  let showTrophy = false;
  if (scores.length > 0) {
    const currentSec = ms / 1000;
    const sorted = [...scores].sort((a, b) => a - b);
    if (currentSec <= sorted[0]) {
      timerColor = 'text-purple-400';
      trophyGradient = 'from-yellow-300 via-yellow-200 to-yellow-500'; // Ouro
      showTrophy = true;
    } else if (currentSec <= sorted[1]) {
      timerColor = 'text-cyan-300';
      trophyGradient = 'from-gray-300 via-gray-100 to-gray-400'; // Prata
      showTrophy = true;
    } else if (currentSec <= sorted[2]) {
      timerColor = 'text-blue-400';
      trophyGradient = 'from-amber-700 via-yellow-400 to-yellow-700'; // Bronze
      showTrophy = true;
    } else {
      timerColor = 'text-cyan-100';
      showTrophy = false;
    }
  }

  return (
    <span className={`text-2xl font-bold flex items-center gap-2 font-mono ${timerColor} sm:mb-6`}>
      <FiClock className={timerColor} size={24} />
      {format(ms)}
      {showTrophy && (
        <FaTrophy
          size={22}
          className="ml-2"
          style={{
            background: `linear-gradient(90deg, var(--tw-gradient-stops))`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            ...(trophyGradient ? { '--tw-gradient-from': trophyGradient.split(' ')[0], '--tw-gradient-stops': trophyGradient } : {})
          } as React.CSSProperties}
        />
      )}
    </span>
  );
} 