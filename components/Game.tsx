import React, {
  Dispatch,
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
}: {
  players: Player[];
  setPlayers: Dispatch<SetStateAction<Player[]>>;
  winningScore: number;
  handleResetClick: FormEventHandler;
}) {
  const [turnNumber, setTurnNumber] = useState(0);
  const currentPlayer = players[turnNumber];
  const [status, setStatus] = useState<null | string>(null);

  const onSaveScore = (score: number) => {
    const playersDupe = [...players];
    const playerToUpdate = playersDupe[turnNumber];

    playerToUpdate.score += score;
    playerToUpdate.history = [...playerToUpdate.history, score];

    if (playerToUpdate.score >= winningScore) {
      setStatus(
        `${playerToUpdate.name} wins the game with a score of ${formatNumber(
          playerToUpdate.score
        )}`
      );
    }

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
      <PlayersList players={players} turnNumber={turnNumber} />
      {status ? (
        <div className="winning-score">
          <p>{status}</p>
        </div>
      ) : (
        <AddScore currentPlayer={currentPlayer} onSaveScore={onSaveScore} />
      )}
      <div>
        <button onClick={handleResetClick}>Reset Game</button>
      </div>
    </section>
  );
}
