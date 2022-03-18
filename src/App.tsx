import React, { useEffect, useState } from 'react';
import LoopButton from './LoopButton';
import './App.css';
import {startPlaying,stopPlaying} from './mainLoopHandler'

const App: React.FC = () => {

  const [loopItems]  = useState(Array.from(Array(9)).map((e,i)=>i+1).map((id)=>{
    return { id:id, musicFile:(id).toString()+".mp3"}
  }))

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
        <div>
          {loopItems.map((item)=><LoopButton key={item.id} item={item}/>)}
        </div>
      </header>
    </div>
  );
}

export default App;
