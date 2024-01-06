"use client";

import Header from "@/components/Header";
import Image from "next/image";
import { FormEvent, useState } from "react";

export type Player = {
  name: string;
  score: number;
  id: number;
};

// Track turn number 0 - 3
// Track players, including their score
const initialPlayers = [
  {
    name: "Sarah",
    score: 0,
    id: 132123123,
  },
  {
    name: "Andrew",
    score: 0,
    id: 132163123,
  },
  {
    name: "Ella",
    score: 0,
    id: 1321123,
  },
];

export function Game() {
  const [players, setPlayers] = useState(initialPlayers);
  const [turnNumber, setTurnNumber] = useState(0);
  const currentPlayer = players[turnNumber];
  return (
    <>
      <PlayersList players={players} currentPlayer={currentPlayer} />
      <AddScore currentPlayer={currentPlayer} />
    </>
  );
}

export function PlayersList({
  players,
  currentPlayer,
}: {
  players: Player[];
  currentPlayer: Player;
}) {
  return (
    <>
      <p>Current Player is {currentPlayer.name}</p>
      <ul className="list-none font-bold">
        {players.map((player) => {
          return (
            <li key={player.id}>
              <p>{player.name}</p>
              <p>{player.score}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export function AddScore({ currentPlayer }: { currentPlayer: Player }) {
  const handleScoreSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.target);
  };
  return (
    <form onSubmit={(e) => handleScoreSubmit(e)}>
      <label htmlFor="score">Score</label>
      <input type="number" id="score" name="score" placeholder="0" required />
      <button type="submit">Save Points</button>
    </form>
  );
}

export default function Home() {
  return (
    <main>
      <Game />
    </main>
  );
}
