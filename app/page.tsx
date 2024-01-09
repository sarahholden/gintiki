"use client";

import { Game } from "@/components/Game";
import Header from "@/components/Header";
import React, { useState } from "react";
import { Player } from "@/types/types";

const newPlayerInitial = {
  name: "",
  id: Math.floor(Math.random() * 100),
  score: 0,
};

export function StartScreen({
  players,
  setPlayers,
  setGameStarted,
}: {
  players: Player[];
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [index, setIndex] = useState(0);
  const handleStartClick = () => {
    setGameStarted(true);
  };

  const handleAddSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("here");
    console.log(players);
    setPlayers([
      ...players,
      {
        name: "",
        id: Math.floor(Math.random() * 100),
        score: 0,
      },
    ]);
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>, i: number) => {
    const value = e.currentTarget.value;
    const playersCopy = [...players];
    playersCopy[i].name = value;
    setPlayers(playersCopy);
  };

  const handleDelete = (i: number) => {
    const deleteVal = [...players];
    deleteVal.splice(i, 1);
    setPlayers(deleteVal);
  };

  return (
    <>
      <h2 className="mb-4">Start a new game!</h2>
      <form onSubmit={(e) => handleAddSubmit(e)}>
        <div>
          {players.map((player, i) => (
            <div className="hello" key={player?.id ? player.id : i}>
              <div className="mb-4">
                <label htmlFor={`player-${i}`} className="sr-only">
                  Player ${i + 1} Name
                </label>
                <input
                  type="text"
                  id={`player-${i}`}
                  name={`player-${i}`}
                  className="border border-black px-4 py-2"
                  placeholder={`Player ${i + 1} name`}
                  value={player?.name ?? ""}
                  onChange={(e) => handleChange(e, i)}
                  required
                  autoFocus
                />
              </div>
              <button type="button" onClick={() => handleDelete(i)}>
                Delete
              </button>
            </div>
          ))}

          <div>
            <button type="submit" className="btn btn--secondary mr-3">
              Add Another
            </button>
            <button
              type="button"
              onClick={handleStartClick}
              className="btn btn--primary"
            >
              Start Game
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default function Home() {
  const [players, setPlayers] = useState([
    {
      name: "",
      id: Math.floor(Math.random() * 100),
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
