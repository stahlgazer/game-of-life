import React, { useState, useCallback, useRef } from "react";
import produce from "immer";

let count = 0
const numRows = 35;
const numCols = 35;
const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];
const emptyGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }
  return rows;
};

function Buttons(props) {
  const [running, setRunning] = useState(false);
  const runningRef = useRef(running);


  runningRef.current = running;

  const simulate = useCallback(() => {
    if (!runningRef.current) {
      return;
    }
    count+=1
    props.setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                neighbors += g[newI][newK];
              }
            });
            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });
    setTimeout(simulate, 200);
  }, [props]);

  return (
    <div className="Buttons">
      <button
        onClick={() => {
          setRunning(!running);
          runningRef.current = true;
          simulate();
        }}
      >
        {running ? "Stop" : "Start"}
      </button>
      <button
        onClick={() => {
          props.setGrid(emptyGrid);
          count = 0
        }}
      >
        Clear
      </button>
      <p>Generation #: {count}</p>
    </div>
  );
}

export default Buttons;
