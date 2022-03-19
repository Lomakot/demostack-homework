import React, { useEffect, useState, MouseEventHandler } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay,faPause } from '@fortawesome/free-solid-svg-icons'
import LoopButton from './LoopButton';
import { LoopItem } from './LoopItem';
import './App.css';
import { Node } from 'typescript';

const App: React.FC = () => {

  const [mainLoopPlaying,setMainLoopPlaying] = useState(false)

  const [beat,setBeat] = useState<number>(0);

  const beatTimer = () => {return setInterval(()=>{setBeat(beat=>beat+1)},8000)}

  const [timer,setTimer] = useState<NodeJS.Timer>(beatTimer)

  const toggle: MouseEventHandler = (event:React.MouseEvent<HTMLButtonElement>) => {
    setMainLoopPlaying(!mainLoopPlaying);
  }

  //start a timer and increase beat or clear timer if stopped
  useEffect(()=>{
    if(mainLoopPlaying){
      clearInterval(timer)
      setBeat(beat=>beat+1)
      setTimer(beatTimer())
    } else {
      clearInterval(timer)
    }
  },[mainLoopPlaying])

  //clear interval when component mounts and unmounts
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
            {<FontAwesomeIcon icon={mainLoopPlaying? faPause:faPlay} />}
          </button>
          <label className='beat-label'>Beat: {beat}</label>
        </div>
        <div className='loop-buttons-container'>
          {loopItems.map((item)=><LoopButton key={item.id} beat={beat} toggleIsPlaying={toggleIsPlaying} item={item} mainLoopPlaying={mainLoopPlaying}/>)}
        </div>
      </header>
    </div>
  );
}

export default App;
