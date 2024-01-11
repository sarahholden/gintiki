import React, {
  Dispatch,
  EventHandler,
  FormEventHandler,
  SetStateAction,
  useState,
} from "react";

import { Player } from "@/types/types";
import { formatNumber, useLocalStorageState } from "../lib/utils";
import { AddScore } from "./AddScore";
import { PlayersList } from "./PlayersList";

export function Game({
  players,
  setPlayers,
  winningScore,
  handleResetClick,
  turnNumber,
  switchTurn,
}: {
  players: Player[];
  setPlayers: Dispatch<SetStateAction<Player[]>>;
  winningScore: number;
  handleResetClick: FormEventHandler;
  turnNumber: number;
  switchTurn: () => void;
}) {
  const currentPlayer = players[turnNumber];
  const [winningMessage, setWinningMessage] = useState<null | string>(null);
  const [view, setView] = useState("list");

  const onSaveScore = (score: number) => {
    const playersDupe = [...players];
    const playerToUpdate = playersDupe[turnNumber];

    playerToUpdate.score += score;
    playerToUpdate.history = [...playerToUpdate.history, score];

    if (playerToUpdate.score >= winningScore) {
      setWinningMessage(
        `${playerToUpdate.name} wins the game with a score of ${formatNumber(
          playerToUpdate.score
        )}`
      );
    }

    setPlayers(playersDupe);
    switchTurn();
  };

  function toggleView() {
    setView(`${view === "grid" ? "list" : "grid"}`);
  }

  return (
    <section className="mx-auto max-w-md">
      {/* <p>Current Player is {players[turnNumber].name}</p> */}
      <button aria-label="Show List View" onClick={toggleView}>
        {view === "grid" ? (
          <>
            <span className="sr-only">Show List View</span>
            List View
          </>
        ) : (
          <>
            <span className="sr-only">Show History</span>
            History
          </>
        )}
      </button>

      <PlayersList players={players} turnNumber={turnNumber} view={view} />

      {winningMessage ? (
        <div className="winning-score">
          <p>{winningMessage}</p>
        </div>
      ) : (
        <AddScore
          currentPlayer={currentPlayer}
          onSaveScore={onSaveScore}
          turnNumber={turnNumber}
        />
      )}
      <div>
        <button onClick={handleResetClick} className="btn">
          Reset Game
        </button>
      </div>
    </section>
  );
}
