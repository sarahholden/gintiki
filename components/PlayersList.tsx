import Image from "next/image";
import { Player } from "@/types/types";
import { formatNumber } from "../lib/utils";

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
              <p className="ml-auto">{formatNumber(player.score)}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
}
