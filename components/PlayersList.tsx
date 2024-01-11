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
              className={`relative ${
                view === "grid"
                  ? "divide-2 grow text-center"
                  : "flex py-4  justify-between"
              }`}
            >
              <div className="flex space-x-4">
                <p className="flex">{player.name}</p>
                {turnNumber === i && view !== "grid" && (
                  <Image
                    src="/dice.svg"
                    width={30}
                    height={30}
                    alt="Picture of the author"
                  />
                )}
              </div>
              <div>
                {view === "grid" && (
                  <ul className="divide-y-2">
                    {player.history.slice(1).map((historyItem, i) => {
                      return (
                        <li key={i} className="">
                          {formatNumber(historyItem)}
                        </li>
                      );
                    })}
                  </ul>
                )}
                <p className="ml-auto font-bold">
                  {formatNumber(player.score)}
                </p>
              </div>
              {view === "list" && (
                <div
                  className="h-2 bg-slate-400 absolute bottom-0 left-0 block max-w-full"
                  style={{ width: `${(player.score / 10000) * 100}%` }}
                ></div>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}
