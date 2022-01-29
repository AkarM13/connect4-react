import React from "react";

type Props = {
  player: number;
  roundsWon: number;
  isItTheirTurn: boolean;
};
export default function PlayerCard({
  player,
  roundsWon,
  isItTheirTurn,
}: Props) {
  return (
    <div className="mx-16">
      <div className="flex items-center">
        <span className="text-4xl font-body font-semibold text-primary">
          PLAYER {player}
        </span>

        <div
          className={`ml-4 w-6 h-6 rounded-full ${
            player === 1 ? "bg-connectRed" : "bg-connectYellow"
          } ${isItTheirTurn ? "opacity-100" : "opacity-90"}`}
        ></div>
      </div>

      <div className="mt-4 shadow-card p-6 bg-white flex justify-center items-center text-5xl rounded-lg font-bold text-description">
        {roundsWon}
      </div>
    </div>
  );
}
