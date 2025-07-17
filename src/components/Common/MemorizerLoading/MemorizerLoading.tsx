import React from "react";

export default function MemorizerLoading({
  className = "",
}: {
  className?: string;
}) {
  return (
    <h1
      aria-busy="true"
      aria-label="Loading"
      className={`relative text-[48px] font-bold tracking-widest font-mono uppercase select-none bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(270deg, #67e8f9, #60a5fa, #a78bfa, #f472b6, #67e8f9)",
        backgroundSize: "200% 200%",
        animation: "gradient-move 2s linear infinite",
      }}
    >
      MEMORIZER
      <style jsx>{`
        @keyframes gradient-move {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </h1>
  );
}
