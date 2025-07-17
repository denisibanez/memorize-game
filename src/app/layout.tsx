import "./globals.css";
import React, { ReactNode } from "react";
import { AuthProvider } from "@/providers/auth";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#18192a] min-h-screen font-mono relative overflow-x-hidden">
        {/* Blobs/light effects in the background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute left-1/4 top-1/3 w-96 h-96 bg-purple-700 opacity-30 rounded-full blur-3xl" />
          <div className="absolute right-1/4 bottom-1/4 w-96 h-96 bg-cyan-400 opacity-30 rounded-full blur-3xl" />
        </div>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
