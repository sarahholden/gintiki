"use client";

import { Game } from "@/components/Game";
import Header from "@/components/Header";
import React, { useState } from "react";
import { StartScreen } from "@/components/StartScreen";
import { generateUniqueKey } from "../lib/utils";
import { Player } from "@/types/types";

// Should probably just use a class instead
export const newPlayer = {
  name: "",
  score: 0,
  history: [0],
};

export default function Home() {
  const duplicatePlayer = { ...newPlayer, id: generateUniqueKey("p") };
  const [players, setPlayers] = useState([duplicatePlayer]);
  const [gameStarted, setGameStarted] = useState(false);
  const [winningScore, setWinningScore] = useState(10000);

  const handleResetClick = () => {
    setGameStarted(false);
    const duplicatePlayer = { ...newPlayer, id: generateUniqueKey("p") };
    setPlayers([duplicatePlayer]);
  };

  return (
    <main>
      {gameStarted && players?.length > 0 ? (
        <Game
          players={players}
          setPlayers={setPlayers}
          winningScore={winningScore}
          handleResetClick={handleResetClick}
        />
      ) : (
        <StartScreen
          players={players}
          setPlayers={setPlayers}
          setGameStarted={setGameStarted}
        />
      )}
    </main>
  );
}
