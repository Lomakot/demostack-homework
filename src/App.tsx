import React, { useEffect, useState, MouseEventHandler } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay,faPause } from '@fortawesome/free-solid-svg-icons'
import LoopButton from './LoopButton';
import { LoopItem } from './LoopItem';
import './App.css';

const App: React.FC = () => {

  const [mainLoopPlaying,setMainLoopPlaying] = useState(false)

  const [beat,setBeat] = useState<number>(0);

  function createBeatTimer(){
    return setInterval(()=>{setBeat(beat=>beat+1)},8000);
  }

  const [timer,setTimer] = useState<NodeJS.Timer>(createBeatTimer)

  const toggle: MouseEventHandler = (event:React.MouseEvent<HTMLButtonElement>) => {
    setMainLoopPlaying(!mainLoopPlaying);
  }

  //start a timer and increase beat or clear timer if stopped
  useEffect(()=>{
    //console.log("in useeffect for mainlooplaying:" + mainLoopPlaying.toString())
    if(mainLoopPlaying){
      clearInterval(timer)
      setBeat(beat=>beat+1)
      const interval = createBeatTimer()
      setTimer(interval)
    } else {
      clearInterval(timer)
    }
  },[mainLoopPlaying])

  //clear interval when component mounts and unmounts
  useEffect(()=>{
    //console.log("called the clear interval function")
    clearInterval(timer);
    return () => clearInterval(timer)
  }, [])

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
