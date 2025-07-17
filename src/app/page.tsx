"use client";
import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import MemorizerTitle from "@/components/Common/MemorizerTitle/MemorizerTitle";

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/game");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Carregando...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent">
      <div className="bg-[#23243a] bg-opacity-90 p-12 rounded-xl shadow-lg flex flex-col items-center relative z-10">
        <MemorizerTitle className="text-3xl mb-8" />
        <button
          className="w-64 py-2 mt-2 mb-4 bg-cyan-400 hover:bg-cyan-300 text-[#18192a] font-semibold rounded transition-all duration-200 shadow-md"
          onClick={() => signIn("google")}
        >
          Sign in with Google
        </button>
        <div className="mt-6 flex flex-col items-center">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
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
    </div>
  );
}
