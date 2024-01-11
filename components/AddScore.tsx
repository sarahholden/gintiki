import React, { ChangeEvent, FormEvent, useState } from "react";
import { Player } from "@/types/types";
import { formatNumber } from "../lib/utils";

export function AddScore({
  currentPlayer,
  onSaveScore,
  turnNumber,
}: {
  currentPlayer: Player;
  onSaveScore: (score: number) => void;
  turnNumber: number;
}) {
  const [scoreToAdd, setScoreToAdd] = useState("");

  const formattedScore = formatNumber(scoreToAdd);

  const handleScoreSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (scoreToAdd) {
      onSaveScore(parseInt(scoreToAdd));
      setScoreToAdd("");
    }
  };

  const handleNumberClick = (e: React.MouseEvent<HTMLFieldSetElement>) => {
    const newValue = (e.target as HTMLButtonElement).value;

    if (newValue === undefined) return;

    const updatedScore =
      newValue === "X"
        ? scoreToAdd.substring(0, scoreToAdd.length - 1)
        : scoreToAdd + newValue;
    setScoreToAdd(updatedScore);
  };

  // Event delegation + value

  return (
    <form onSubmit={(e) => handleScoreSubmit(e)} className="add-board">
      <label htmlFor="score">Add Points for {currentPlayer.name}</label>
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
      <div className="add-board__submit-row flex justify-between mb-4">
        <input
          type="number"
          id="score"
          name="score"
          placeholder="0"
          required
          className="sr-only"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setScoreToAdd(e.target.value);
          }}
          value={scoreToAdd}
        />
        <p>{scoreToAdd ? formatNumber(scoreToAdd) : <span>0</span>}</p>
        <button type="submit" className="btn btn--primary">
          Save Points
        </button>
      </div>
    </form>
  );
}
