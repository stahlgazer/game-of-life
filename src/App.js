import React, { useState } from "react";
import produce from 'immer';
import "./App.css";

const numRows = 50;
const numCols = 50;

function App() {
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }
    return rows;
  });
  console.log(grid);
  return (
    <div className="App" style={{display: 'grid', gridTemplateColumns: `repeat(${numCols}, 10px)`}}>
      {grid.map((rows, i) =>
        rows.map((col, k) => (
          <div key={`${i}-${k}`}
          onClick={() => {
            const newGrid = produce(grid, gridCopy => {
              gridCopy[i][k] = 1;
            })
            setGrid(newGrid)
          }}
            style={{
              width: 10,
              height: 10,
              backgroundColor: grid[i][k] ? "purple" : undefined,
              border: 'solid 1px black'
            }}
          />
        ))
      )}
    </div>
  );
}

export default App;
