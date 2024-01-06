"use client";

import Header from "@/components/Header";
import Image from "next/image";
import React, {
  EventHandler,
  FormEvent,
  FormEventHandler,
  useState,
} from "react";

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
  const [turnNumber, setTurnNumber] = useState(1);
  const currentPlayer = players[turnNumber];

  const onSaveScore = (score: number) => {
    let playersDupe = [...players];
    playersDupe[turnNumber].score += score;
    setPlayers(playersDupe);
    console.log(score);
    console.log(players);
    switchTurn();
  };

  function switchTurn() {
    if (turnNumber < players.length - 1) {
      setTurnNumber(turnNumber + 1);
    } else {
      setTurnNumber(0);
    }
  }

  return (
    <>
      <PlayersList players={players} currentPlayer={currentPlayer} />
      <AddScore currentPlayer={currentPlayer} onSaveScore={onSaveScore} />
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
              {currentPlayer.id === player.id && `Dice!`}
              <p>{player.name}</p>
              <p>{player.score}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export function AddScore({
  currentPlayer,
  onSaveScore,
}: {
  currentPlayer: Player;
  onSaveScore: any;
}) {
  const [score, setScore] = useState(`${currentPlayer.score}`);

  const handleScoreSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (score) {
      onSaveScore(parseInt(score));
      setScore("");
    }
  };

  return (
    <form onSubmit={(e) => handleScoreSubmit(e)}>
      <label htmlFor="score">Score</label>
      <input
        type="number"
        id="score"
        name="score"
        placeholder="0"
        required
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setScore(e.target.value);
        }}
        value={score}
      />
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
