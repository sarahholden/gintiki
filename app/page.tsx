"use client";

import { Game } from "@/components/Game";
import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import { StartScreen } from "@/components/StartScreen";
import { generateUniqueKey, useLocalStorageState } from "../lib/utils";
import { Player } from "@/types/types";

// Should probably just use a class instead
export const playerTemplate = {
  name: "",
  score: 0,
  history: [0],
};

export default function Home() {
  const [players, setPlayers] = useLocalStorageState("gintiki:players", [
    { ...playerTemplate, id: generateUniqueKey("p") },
  ]);

  const [gameStarted, setGameStarted] = useLocalStorageState(
    "gintiki:gameStarted",
    false
  );
  const [turnNumber, setTurnNumber] = useLocalStorageState(
    "gintiki:turnNumber",
    0
  );
  const [winningScore, setWinningScore] = useState(10000);

  const handleResetClick = () => {
    setGameStarted(false);
    const newPlayer = { ...playerTemplate, id: generateUniqueKey("p") };
    setPlayers([newPlayer]);
    setTurnNumber(0);
  };

  function switchTurn() {
    if (turnNumber < players.length - 1) {
      setTurnNumber(turnNumber + 1);
    } else {
      setTurnNumber(0);
    }
  }

  return (
    <main>
      {gameStarted && players?.length > 0 ? (
        <Game
          players={players}
          setPlayers={setPlayers}
          winningScore={winningScore}
          handleResetClick={handleResetClick}
          turnNumber={turnNumber}
          switchTurn={switchTurn}
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
