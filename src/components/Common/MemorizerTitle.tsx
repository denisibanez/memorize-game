import React from "react";

export default function MemorizerTitle({
  className = "",
}: {
  className?: string;
}) {
  return (
    <h1
      className={`text-2xl font-bold tracking-widest font-mono uppercase bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent select-none ${className}`}
    >
      MEMORIZER
    </h1>
  );
}
