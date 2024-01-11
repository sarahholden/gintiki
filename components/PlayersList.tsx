import Image from "next/image";
import { Player } from "@/types/types";
import { formatNumber } from "../lib/utils";

export function PlayersList({
  players,
  turnNumber,
  view,
}: {
  players: Player[];
  turnNumber: number;
  view: string;
}) {
  return (
    <>
      <ul
        className={`list-none border-black border-y-2 ${
          view === "grid"
            ? "flex divide-x-2 border-x-2 border-x-black"
            : "divide-y-2 "
        }`}
      >
        {players.map((player, i) => {
          return (
            <li
              key={player.id}
              className={`${
                view === "grid" ? "divide-2 grow text-center" : "flex py-4"
              }`}
            >
              {turnNumber === i && view !== "grid" && (
                <Image
                  src="/dice.svg"
                  width={30}
                  height={30}
                  alt="Picture of the author"
                />
              )}
              <p className="flex-auto">{player.name}</p>
              <div>
                {view === "grid" && (
                  <ul className="divide-y-2">
                    {player.history.slice(1).map((historyItem, i) => {
                      return (
                        <li key={i} className="">
                          {historyItem}
                        </li>
                      );
                    })}
                  </ul>
                )}
                <p className="ml-auto font-bold">
                  {formatNumber(player.score)}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
