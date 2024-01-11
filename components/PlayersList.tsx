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
      {view === "grid" ? (
        <ul className="list-none divide-black border-y-2 flex divide-x-2 border-x-2 border-black">
          {players.map((player, i) => {
            return (
              <li
                key={player.id}
                className="relative divide-2 divide-black grow text-center flex flex-col"
              >
                <p className="text-center">{player.name}</p>
                <div className="grow flex flex-col">
                  <ul className="divide-y-2 divide-black grow">
                    {player.history.slice(1).map((historyItem, i) => {
                      return (
                        <li key={i} className="">
                          {formatNumber(historyItem)}
                        </li>
                      );
                    })}
                  </ul>
                  <p className="font-bold border-t-2 border-black">
                    {formatNumber(player.score)}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <ul className="list-none border-black border-y-2 divide-y-2">
          {players.map((player, i) => {
            return (
              <li
                key={player.id}
                className="relative flex py-4 justify-between"
              >
                <div className="flex space-x-4">
                  <p className="flex">{player.name}</p>
                  {turnNumber === i && (
                    <Image
                      src="/dice.svg"
                      width={30}
                      height={30}
                      alt="Picture of the author"
                    />
                  )}
                </div>
                <div>
                  <p className="ml-auto">{formatNumber(player.score)}</p>
                </div>
                <div
                  className="h-2 bg-slate-400 duration-400 absolute bottom-0 left-0 transition-[width] block max-w-full"
                  style={{ width: `${(player.score / 10000) * 100}%` }}
                ></div>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
