import React, { useEffect, useState, MouseEventHandler } from 'react';
import LoopButton from './LoopButton';
import './App.css';

const App: React.FC = () => {

  const [mainLoopPlaying,setMainLoopPlaying] = useState(false)

  const toggle: MouseEventHandler = (event:React.MouseEvent<HTMLButtonElement>) => {
    setMainLoopPlaying(!mainLoopPlaying);
  }

  const [loopItems]  = useState(Array.from(Array(9)).map((e,i)=>i+1).map((id)=>{
    return { id:id, musicFile:(id).toString()+".mp3"}
  }))

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <button className="main-buttons" onClick={toggle}>
            {mainLoopPlaying?"Stop":"Play"}
          </button>
        </div>
        <div className='loop-buttons-container'>
          {loopItems.map((item)=><LoopButton key={item.id} item={item}/>)}
        </div>
      </header>
    </div>
  );
}

export default App;
