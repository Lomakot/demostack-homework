import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay,faPause } from '@fortawesome/free-solid-svg-icons'
import { LoopItem,Synchronizer } from './LoopItem';
const song1 = require("./static/music/1.mp3")
const song2 = require("./static/music/2.mp3")
const song3 = require("./static/music/3.mp3")
const song4 = require("./static/music/4.mp3")
const song5 = require("./static/music/5.mp3")
const song6 = require("./static/music/6.mp3")
const song7 = require("./static/music/7.mp3")
const song8 = require("./static/music/8.mp3")
const song9 = require("./static/music/9.mp3")

type LoopButtonProps = {
    item: LoopItem
    isPlaying?: boolean
    synchronizer: Synchronizer
}

const LoopButton:React.FC<LoopButtonProps> = ({item, synchronizer}) => {

    const [audio,setAudio] = useState<HTMLAudioElement>(new Audio(song1));

    const [isPlaying,setIsPlaying] = useState(false)

    const toggleIsPlaying = () => {
        setIsPlaying(!isPlaying)
    }
    //connect to synchronizer
    useEffect(() => {
        if(!isPlaying){
            synchronizer.removeSong(audio)
        } else {
            synchronizer.addSong(audio)
        }
    },
        [isPlaying]
    );


    useEffect(()=>{
        //audio.loop = true;
    },[audio])
    
    //choose audio file per item
    useEffect(() => {
        switch(item.musicFile){
            case "1.mp3":{
                setAudio(new Audio(song1))
                break
            }
            case "2.mp3":{
                setAudio(new Audio(song2))
                break
            }
            case "3.mp3":{
                setAudio(new Audio(song3))
                break
            }
            case "4.mp3":{
                setAudio(new Audio(song4))
                break
            }
            case "5.mp3":{
                setAudio(new Audio(song5))
                break
            }
            case "6.mp3":{
                setAudio(new Audio(song6))
                break
            }
            case "7.mp3":{
                setAudio(new Audio(song7))
                break
            }
            case "8.mp3":{
                setAudio(new Audio(song8))
                break
            }
            case "9.mp3":{
                setAudio(new Audio(song9))
                break
            }
        }
        
    }, []);
    return (
            <button disabled={item.id===4} style={isPlaying?{backgroundColor:"#27c950"}:undefined} className="loop-button" onClick={toggleIsPlaying}><FontAwesomeIcon icon={isPlaying? faPause:faPlay} /></button>
      );
}
  
  export default LoopButton;
  