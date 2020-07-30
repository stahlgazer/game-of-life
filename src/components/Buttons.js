import React, { useState, useCallback, useRef } from "react";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import produce from "immer";
import { FormLabel } from "@material-ui/core";

let count = 0;
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

function Buttons(props) {
  const emptyGrid = () => {
    const rows = [];
    for (let i = 0; i < props.rowSize; i++) {
      rows.push(Array.from(Array(props.colSize), () => 0));
    }
    return rows;
  };
  const [running, setRunning] = useState(false);
  const runningRef = useRef(running);
  const [speed, setSpeed] = useState(200);
  const [slow, setSlow] = useState(false);

  const handleSlow = () => {
    setSlow(!slow);
    speed === 200 ? setSpeed(500) : setSpeed(200);
  };
  runningRef.current = running;

  const simulate = useCallback(() => {
    if (!runningRef.current) {
      return;
    }
    count += 1;
    props.setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < props.rowSize; i++) {
          for (let k = 0; k < props.colSize; k++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (
                newI >= 0 &&
                newI < props.rowSize &&
                newK >= 0 &&
                newK < props.colSize
              ) {
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
    setTimeout(simulate, speed);
  }, [props, speed]);

  return (
    <div className="Buttons">
      <h3>Current Generation: {count}</h3>
      <Button
        color="primary"
        variant="contained"
        onClick={() => {
          setRunning(!running);
          runningRef.current = true;
          simulate();
        }}
      >
        {running ? "Stop" : "Start"}
      </Button>
      <Button
        color="secondary"
        variant="contained"
        disabled={running}
        onClick={() => {
          props.setGrid(emptyGrid);
          count = 0;
        }}
      >
        Clear
      </Button>
      <Button
        variant="contained"
        disabled={running}
        onClick={() => {
          count = 0;
          const rows = [];
          for (let i = 0; i < props.rowSize; i++) {
            rows.push(
              Array.from(Array(props.colSize), () =>
                Math.random() >= 0.5 ? 1 : 0
              )
            );
          }
          props.setGrid(rows);
        }}
      >
        Randomize Cells
      </Button>
      <form>
        <label>Slow Speed</label>
        <Switch
          color="secondary"
          disabled={running}
          checked={slow}
          onChange={handleSlow}
          name="checked"
          inputProps={{ "aria-label": "secondary checkbox" }}
        />
      </form>
      <form>
        <FormLabel style={{ margin: "10px" }}>Amount of Rows</FormLabel>
        <Select value={props.rowSize} onChange={props.handleRow}>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={35}>35</MenuItem>
          <MenuItem value={40}>40</MenuItem>
        </Select>
        <FormLabel style={{ margin: "10px" }}>Amount of Columns</FormLabel>
        <Select value={props.colSize} onChange={props.handleCol}>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={35}>35</MenuItem>
          <MenuItem value={40}>40</MenuItem>
        </Select>
        <Button
          style={{ margin: "10px" }}
          color="primary"
          size="small"
          variant="contained"
          disabled={running}
          onClick={() => {
            props.setGrid(emptyGrid);
            count = 0;
          }}
        >
          Adjust Grid Size
        </Button>
      </form>
    </div>
  );
}

export default Buttons;
