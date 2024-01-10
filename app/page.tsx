"use client";

import { Game } from "@/components/Game";
import Header from "@/components/Header";
import React, { useState } from "react";
import { StartScreen } from "@/components/StartScreen";
import { generateUniqueKey } from "../lib/utils";
import { Player } from "@/types/types";

export const newPlayer = {
  name: "",
  id: generateUniqueKey("p"),
  score: 0,
  history: [0],
};

export default function Home() {
  const [players, setPlayers] = useState([{ ...newPlayer }]);
  const [gameStarted, setGameStarted] = useState(false);
  const [winningScore, setWinningScore] = useState(10000);

  const handleResetClick = () => {
    setGameStarted(false);
    setPlayers([{ ...newPlayer }]);
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
