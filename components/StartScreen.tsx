import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Player } from "@/types/types";
import { generateUniqueKey } from "../lib/utils";
import { playerTemplate } from "../app/page";

export function StartScreen({
  players,
  setPlayers,
  setGameStarted,
}: {
  players: Player[];
  setPlayers: Dispatch<SetStateAction<Player[]>>;
  setGameStarted: Dispatch<SetStateAction<boolean>>;
}) {
  const [error, setError] = useState<null | string>(null);

  const validatePlayerNames = () => {
    const hasEmptyName = players.some((player) => player.name === "");
    if (hasEmptyName) {
      setError("Fill out each player's name before continuing.");
      return false;
    }
    return true;
  };

  const handleStartClick = () => {
    if (validatePlayerNames()) {
      setGameStarted(true);
    }
  };

  const handleAddSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPlayers([...players, { ...playerTemplate, id: generateUniqueKey("p") }]);
  };

  const handleChange = (e: FormEvent<HTMLInputElement>, i: number) => {
    const value = e.currentTarget.value;
    const playersCopy = [...players];
    [...players][i].name = value;
    setPlayers(playersCopy);
    setError(null);
    validatePlayerNames();
  };

  const handleDelete = (i: number) => {
    if (players.length === 1) {
      setError("You must have at least one player");
      return;
    }
    setError(null);
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
            <div key={player.id} className="flex space-x-4">
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
                <span className="sr-only">Delete</span>X
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
              disabled={error ? true : false}
            >
              Start Game
            </button>
            {error && <p>{error}</p>}
          </div>
        </div>
      </form>
    </>
  );
}
