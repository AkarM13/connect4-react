import React from "react";
import Cell from "./Cell";

export default function Row({ row, play }: any) {
  return (
    <tr>
      {row.map((cell: any, i: any) => (
        <Cell key={i} value={cell} columnIndex={i} play={play} />
      ))}
    </tr>
  );
}
