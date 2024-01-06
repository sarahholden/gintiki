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
  const [turnNumber, setTurnNumber] = useState(0);
  const currentPlayer = players[turnNumber];

  const onSaveScore = (score: number) => {
    let playersDupe = [...players];
    playersDupe[turnNumber].score += score;
    setPlayers(playersDupe);
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
    <section className="mx-auto max-w-md">
      <PlayersList players={players} currentPlayer={currentPlayer} />
      <AddScore currentPlayer={currentPlayer} onSaveScore={onSaveScore} />
    </section>
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
      <ul className="list-none border-black border-b-2">
        {players.map((player) => {
          return (
            <li key={player.id} className="flex border-black border-t-2">
              {currentPlayer.id === player.id && (
                <Image
                  src="/dice.svg"
                  width={30}
                  height={30}
                  alt="Picture of the author"
                />
              )}
              <p className="flex-auto">{player.name}</p>
              <p className="ml-auto">{player.score}</p>
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
  const [score, setScore] = useState(
    `${currentPlayer.score !== 0 ? currentPlayer.score.toString() : ""}`
  );

  const handleScoreSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (score) {
      onSaveScore(parseInt(score));
      setScore("");
    }
  };

  const handleNumberClick = (e: React.MouseEvent<HTMLFieldSetElement>) => {
    const newValue = (e.target as HTMLButtonElement).value;

    if (newValue === undefined) return;

    const newScore =
      newValue === "X"
        ? score.substring(0, score.length - 1)
        : score + newValue;
    setScore(newScore);
  };

  // Event delegation + value

  return (
    <form onSubmit={(e) => handleScoreSubmit(e)} className="add-board">
      <label htmlFor="score">Score</label>
      <fieldset
        className="add-board__buttons"
        onClick={(e) => handleNumberClick(e)}
      >
        <button type="button" value="1">
          1
        </button>
        <button type="button" value="2">
          2
        </button>
        <button type="button" value="3">
          3
        </button>
        <button type="button" value="4">
          4
        </button>
        <button type="button" value="5">
          5
        </button>
        <button type="button" value="6">
          6
        </button>
        <button type="button" value="7">
          7
        </button>
        <button type="button" value="8">
          8
        </button>
        <button type="button" value="9">
          9
        </button>
        <button type="button" value="0">
          0
        </button>
        <button type="button" value="X">
          &lt;
        </button>
      </fieldset>
      <div className="add-board__submit-row">
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
        <button type="submit" className="btn btn--primary">
          Save Points
        </button>
      </div>
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
