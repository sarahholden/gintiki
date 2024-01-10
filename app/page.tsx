"use client";

import { Game } from "@/components/Game";
import Header from "@/components/Header";
import React, { useState } from "react";
import { StartScreen } from "@/components/StartScreen";
import { generateUniqueKey } from "../lib/utils";

export default function Home() {
  const [players, setPlayers] = useState([
    {
      name: "",
      id: generateUniqueKey("p"),
      score: 0,
    },
  ]);
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <main>
      {gameStarted && players?.length > 0 ? (
        <Game players={players} setPlayers={setPlayers} />
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
