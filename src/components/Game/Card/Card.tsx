"use client";
import React from "react";
import Image from "next/image";

interface CardProps {
  image: string;
  flipped: boolean;
  matched: boolean;
  onClick: () => void;
}

export default function Card({ image, flipped, matched, onClick }: CardProps) {
  return (
    <button
      type="button"
      role="button"
      tabIndex={0}
      aria-label="Memory Card"
      className={`md:h-24 md:w-32
        [@media(min-width:320px)]:h-16
        [@media(min-width:390px)]:h-24
        [@media(min-width:430px)]:h-28
        [@media(min-width:430px)]:h-28
        [@media(min-width:640px), @media(max-width: 768px)]:h-40
        cursor-pointer perspective select-none`}
      onClick={() => {
        if (!flipped && !matched) onClick();
      }}
      disabled={flipped || matched}
    >
      <div
        className={`relative w-full h-full transition-transform duration-300 ${
          flipped || matched ? "rotate-y-180" : ""
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front (image) */}
        <div
          className={`absolute w-full h-full backface-hidden rounded-md overflow-hidden border bg-[#23243a] flex items-center justify-center ${matched ? "border-purple-400" : "border-cyan-400"}`}
          style={{ transform: "rotateY(180deg)" }}
        >
          <Image
            src={image}
            alt="Memory Card"
            width={120}
            height={120}
            className="object-cover w-full h-full rounded-md p-1"
          />
        </div>
        {/* Back */}
        <div
          className={`absolute w-full h-full backface-hidden rounded-md bg-[#18192a] border flex items-center justify-center hover:border-cyan-300 transition-colors ${matched ? "border-purple-400" : "border-cyan-400"}`}
        >
          <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
            <circle
              cx="24"
              cy="24"
              r="22"
              stroke="url(#grad1)"
              strokeWidth="4"
              fill="url(#grad2)"
            />
            <path d="M24 14L32 34H16L24 14Z" fill="url(#grad1)" />
            <defs>
              <linearGradient
                id="grad1"
                x1="0"
                y1="0"
                x2="48"
                y2="48"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#67e8f9" />
                <stop offset="1" stopColor="#a78bfa" />
              </linearGradient>
              <radialGradient id="grad2" cx="0.5" cy="0.5" r="0.5">
                <stop stopColor="#18192a" />
                <stop offset="1" stopColor="#23243a" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </button>
  );
}
