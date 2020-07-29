import React, { useState } from "react";
import produce from "immer";
import Buttons from "./Buttons";

const numRows = 25;
const numCols = 25;

function Grid() {
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }
    return rows;
  });
  //   console.log(grid);
  return (
    <>
      <div
        className="Grid"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols}, 15px)`,
        }}
      >
        {grid.map((rows, i) =>
          rows.map((col, k) => (
            <div
              key={`${i}-${k}`}
              onClick={() => {
                const newGrid = produce(grid, (gridCopy) => {
                  gridCopy[i][k] = grid[i][k] ? 0 : 1;
                });
                setGrid(newGrid);
              }}
              style={{
                width: 15,
                height: 15,
                backgroundColor: grid[i][k] ? "purple" : undefined,
                border: "solid 1px gray",
              }}
            />
          ))
        )}
      </div>
      <Buttons grid={grid} setGrid={setGrid} />
    </>
  );
}

export default Grid;
