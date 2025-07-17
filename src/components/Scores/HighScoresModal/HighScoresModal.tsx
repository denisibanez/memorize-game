"use client";
import React from "react";

interface Score {
  name: string;
  time: number;
}

export interface HighScoresModalProps {
  open: boolean;
  onClose: () => void;
}

function formatTime(seconds: number) {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}m ${s}s`;
}

export default function HighScoresModal({
  open,
  onClose,
}: HighScoresModalProps) {
  if (!open) return null;
  let scores: Score[] = [];
  if (typeof window !== "undefined") {
    scores = JSON.parse(localStorage.getItem("memory-scores") || "[]");
    scores = scores.sort((a, b) => a.time - b.time).slice(0, 10);
  }
  return (
    <div
      role="dialog"
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-[#23243a]/80 rounded-lg px-5 py-8 min-w-[320px] max-w-[340px] border border-cyan-900/40 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg text-white font-bold mb-4 text-center tracking-wider uppercase">
          Fastest memorizers
        </h2>
        <ol className="text-sm">
          {scores.length === 0 && (
            <li className="text-gray-400">No scores yet.</li>
          )}
          {scores.map((score, idx) => (
            <li
              key={idx}
              className="flex justify-between py-1 border-b border-cyan-900/30 last:border-b-0 font-mono"
            >
              <span
                className={`font-semibold ${idx === 0 ? "text-purple-400" : idx === 1 ? "text-cyan-300" : idx === 2 ? "text-blue-400" : "text-cyan-100"}`}
              >
                {idx + 1}. {score.name}
              </span>
              <span
                className={`font-semibold ${idx === 0 ? "text-purple-400" : idx === 1 ? "text-cyan-300" : idx === 2 ? "text-blue-400" : "text-cyan-100"}`}
              >
                {formatTime(score.time)}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
