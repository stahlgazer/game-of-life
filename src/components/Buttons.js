import React, {useState} from 'react';

function Buttons() {
    const[running, setRunning] = useState(false)
  return (
    <div className="Buttons">
      <button onClick={() => {
          setRunning(!running)
      }}>{running ? 'Stop' : 'Start'}</button>
      <button>Clear</button>
    </div>
  );
}

export default Buttons;