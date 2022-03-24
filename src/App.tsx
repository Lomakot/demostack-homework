import React, { useEffect, useState, MouseEventHandler } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay,faPause } from '@fortawesome/free-solid-svg-icons'
import LoopButton from './LoopButton';
import { LoopItem } from './LoopItem';
import './App.css';

const loopItemsArr = Array.from(Array(9)).map((e,i)=>i+1).map((id)=>{
  return { id:id, musicFile:(id).toString()+".mp3", isPlaying:false}
})

const App: React.FC = () => {

  const [mainLoopPlaying,setMainLoopPlaying] = useState(false)

  const [beat,setBeat] = useState<number>(0);

  //initialize all the items with corresponding songs
  const [loopItems,setLoopItems]  = useState<LoopItem[]>(loopItemsArr)

  function createBeatTimer(){
    return setInterval(()=>{setBeat(beat=>beat+1)},8000);
  }

  const [timer,setTimer] = useState<NodeJS.Timer>(createBeatTimer)

  const toggle: MouseEventHandler = (event:React.MouseEvent<HTMLButtonElement>) => {
    setMainLoopPlaying(!mainLoopPlaying);
  }

  //start a timer and increase beat or clear timer if stopped
  useEffect(()=>{
    //we want to only start if one of the squares is green, otherwise dont.
    startStopPlaying()
  },[mainLoopPlaying])

  const startStopPlaying = () => {
    let isGreen = false
    loopItems.forEach((loopItem)=>{loopItem.isPlaying?isGreen=true:void(0)})
    if(mainLoopPlaying && isGreen){
      clearInterval(timer)
      setBeat(beat=>beat+1)
      const interval = createBeatTimer()
      setTimer(interval)
    } else {
      clearInterval(timer)
    }
  }

  //clear interval when component mounts and unmounts
  useEffect(()=>{
    //console.log("called the clear interval function")
    clearInterval(timer);
    return () => clearInterval(timer)
  }, [])

  //handler for updating the loop items list
  const toggleIsPlaying = (id:number,forced?:boolean) => {
    // this doesnt make the components depending on this array to update, only changing the array point does.
    // const index = loopItems.findIndex((loopItem) => loopItem.id === id)
    // loopItems[index] = { ...loopItems[index], isPlaying:forced?forced:!loopItems[index].isPlaying}
    // setLoopItems(loopItems)
    const newLoopItems = loopItems.map((loopItem)=>{
      if(loopItem.id===id){
        loopItem.isPlaying = forced?forced:!loopItem.isPlaying
      }
      return loopItem
    })
    setLoopItems(newLoopItems)
    const numOfPlayingSongs = loopItems.reduce((prevSum,c)=>prevSum+(c.isPlaying?1:0),0)
    //only check if to start or stop if 1 or 0 songs
    if(numOfPlayingSongs<2){
      startStopPlaying()
    }
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
