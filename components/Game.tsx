import React, {
  Dispatch,
  FormEventHandler,
  SetStateAction,
  useState,
} from "react";

import { Player } from "@/types/types";
import { formatNumber } from "../lib/utils";
import { AddScore } from "./AddScore";
import { PlayersList } from "./PlayersList";

// Track turn number 0 - 3
// Track players, including their score

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

  const clearGame = () => {
    setTurnNumber(0);
    setStatus(null);
  };

  const onSaveScore = (score: number) => {
    const playersDupe = [...players];
    const currentPlayer = playersDupe[turnNumber];
    playersDupe[turnNumber].score += score;
    setPlayers(playersDupe);

    if (playersDupe[turnNumber].score >= winningScore) {
      setStatus(
        `${currentPlayer.name} wins the game with a score of ${formatNumber(
          currentPlayer.score
        )}`
      );
    }

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
