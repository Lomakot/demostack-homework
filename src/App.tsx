import React from 'react';
import './App.css';
import {startPlaying,stopPlaying} from './mainLoopHandler'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <button className="main-buttons" onClick={startPlaying}>
            Play
          </button>
          <button className="main-buttons" onClick={stopPlaying}>
            Stop
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
