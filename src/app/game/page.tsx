"use client";
import React, { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import GameBoard from "../../components/Game/GameBoard";
import HighScoresModal from "../../components/Scores/HighScoresModal";
import Header from "../../components/Common/Header";
import GameMenu from "../../components/Common/GameMenu";

export default function GamePage() {
  const { status, data } = useSession();

  console.log(data?.user?.image, "sss");
  const router = useRouter();
  const [showScores, setShowScores] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Carregando...
      </div>
    );
  }

  if (status === "authenticated") {
    return (
      <div className="min-h-screen flex flex-col items-center bg-transparent sm:px-0">
        <Header
          user={{
            image: data?.user?.image ?? undefined,
            name: data?.user?.name ?? undefined,
          }}
          onNewGame={() => window.location.reload()}
          onShowScores={() => setShowScores(true)}
          onLogout={() => signOut()}
        />
        <main className="flex flex-col items-center justify-center flex-1 w-full pb-16">
          <div className="w-full">
            <GameBoard showScores={showScores} setShowScores={setShowScores} />
            {/* Menu após o conteúdo dos cards até lg */}
            <div className="lg:hidden">
              <GameMenu
                onNewGame={() => window.location.reload()}
                onShowScores={() => setShowScores(true)}
                onLogout={() => signOut()}
                variant="mobile"
              />
            </div>
          </div>
        </main>
        <HighScoresModal
          open={showScores}
          onClose={() => setShowScores(false)}
        />
      </div>
    );
  }

  return null;
}
