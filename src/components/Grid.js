import React, { useState } from "react";
import produce from "immer";
import Buttons from "./Buttons";

function Grid() {
  const [rowSize, setRowSize] = useState(25);
  const [colSize, setColSize] = useState(25);
  const handleCol = (e) => {
    setColSize(e.target.value);
  };
  const handleRow = (e) => {
    setRowSize(e.target.value);
  };
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < rowSize; i++) {
      rows.push(Array.from(Array(colSize), () => 0));
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
          gridTemplateColumns: `repeat(${colSize}, 15px)`,
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
      <Buttons
        grid={grid}
        setGrid={setGrid}
        rowSize={rowSize}
        colSize={colSize}
        handleCol={handleCol}
        handleRow={handleRow}
      />
    </>
  );
}

export default Grid;
