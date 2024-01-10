import Image from "next/image";
import { Player } from "@/types/types";
import { formatNumber } from "../lib/utils";

export function PlayersList({
  players,
  turnNumber,
}: {
  players: Player[];
  turnNumber: number;
}) {
  return (
    <>
      <p>Current Player is {players[turnNumber].name}</p>
      <ul className="list-none border-black border-b-2">
        {players.map((player, i) => {
          return (
            <li key={player.id} className="flex border-black border-t-2">
              {turnNumber === i && (
                <Image
                  src="/dice.svg"
                  width={30}
                  height={30}
                  alt="Picture of the author"
                />
              )}
              <p className="flex-auto">{player.name}</p>
              <div>
                <p className="ml-auto">{formatNumber(player.score)}</p>
                <div>
                  {player.history.map((turnScore, i) => {
                    return (
                      <span key={i} className="bg-red-100">
                        {turnScore}
                      </span>
                    );
                  })}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
