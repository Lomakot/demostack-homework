import React, { useEffect, useState, MouseEventHandler } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay,faPause } from '@fortawesome/free-solid-svg-icons'
import LoopButton from './LoopButton';
import { LoopItem, Synchronizer } from './LoopItem';
import './App.css';

const loopItemsArr = Array.from(Array(9)).map((e,i)=>i+1).map((id)=>{
  return { id:id, musicFile:(id).toString()+".mp3"}
})

const synchronizer = new Synchronizer()

const App: React.FC = () => {

  const [mainLoopPlaying,setMainLoopPlaying] = useState(false)

  const [timeDelay,setTimeDelay] = useState(0)

  

  //initialize all the items with corresponding songs
  const [loopItems,setLoopItems]  = useState<LoopItem[]>(loopItemsArr)

  const [timer,setTimer] = useState<number>(0)

  const toggle: MouseEventHandler = (event:React.MouseEvent<HTMLButtonElement>) => {
    setMainLoopPlaying(!mainLoopPlaying);
  }

  //start and stop synchronizer
  useEffect(()=>{
    if(mainLoopPlaying)
      synchronizer.start()
    else
      synchronizer.stop()
  },[mainLoopPlaying])

  //clear interval when component mounts and unmounts
  useEffect(()=>{
    //console.log("called the clear interval function")
    clearInterval(timer);
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <div className='main-button-div'>
          <button className="main-button" onClick={toggle}>
            {<FontAwesomeIcon icon={mainLoopPlaying? faPause:faPlay} />}
          </button>
        </div>
        <div className='loop-buttons-container'>
          {loopItems.map((item)=><LoopButton synchronizer={synchronizer} key={item.id} item={item} />)}
        </div>
      </header>
    </div>
  );
}

export default App;
