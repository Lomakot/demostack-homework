import React, { useEffect, useState, MouseEventHandler } from 'react';
import LoopButton from './LoopButton';
import { LoopItem } from './LoopItem';
import './App.css';
import { Node } from 'typescript';

const App: React.FC = () => {

  const [mainLoopPlaying,setMainLoopPlaying] = useState(false)

  const [beat,setBeat] = useState<number>(0);

  const beatTimer = () => setInterval(()=>{setBeat(beat=>beat+1)},3000)

  const [timer,setTimer] = useState<NodeJS.Timer>(beatTimer)

  const toggle: MouseEventHandler = (event:React.MouseEvent<HTMLButtonElement>) => {
    if(!mainLoopPlaying){
      setTimer(beatTimer)
    } else {
      clearInterval(timer);
    }
    setMainLoopPlaying(!mainLoopPlaying);
  }

  //clear interval when component unmounts
  useEffect(()=>{
    clearInterval(timer);
    return () => clearInterval(timer)
  },[])

  //initialize all the items with corresponding songs
  const [loopItems,setLoopItems]  = useState<LoopItem[]>(Array.from(Array(9)).map((e,i)=>i+1).map((id)=>{
    return { id:id, musicFile:(id).toString()+".mp3", isPlaying:false}
  }))

  //handler for updating the loop items list
  const toggleIsPlaying = (id:number,forced?:boolean) => {
    setLoopItems(loopItems.map((e)=>
      e.id === id ? {...e, isPlaying:forced?forced:(!e.isPlaying)}:{...e}
    ))
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className='main-button-div'>
          <button className="main-button" onClick={toggle}>
            {mainLoopPlaying?"Stop":"Play"}
          </button>
          <label className='beat-label'>Beat: {beat}</label>
        </div>
        <div className='loop-buttons-container'>
          {loopItems.map((item)=><LoopButton key={item.id} beat={beat} toggleIsPlaying={toggleIsPlaying} item={item}/>)}
        </div>
      </header>
    </div>
  );
}

export default App;
