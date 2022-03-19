import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay,faPause } from '@fortawesome/free-solid-svg-icons'
import { LoopItem } from './LoopItem';
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
    toggleIsPlaying: Function
    beat: number
    mainLoopPlaying: boolean
}

const LoopButton:React.FC<LoopButtonProps> = ({item,toggleIsPlaying,beat,mainLoopPlaying}) => {

    const [audio,setAudio] = useState<HTMLAudioElement>(new Audio(song1));

    //reset and start playing with the beat
    useEffect(() => {
        audio.currentTime = 0
        if(item.isPlaying){
            audio.play();
        }
    },
        [beat]
    );
    //pause single
    useEffect(() => {
        if(!item.isPlaying){
            audio.pause();
        }
    },
        [item.isPlaying]
    );
    //pause all
    useEffect(() => {
        if(!mainLoopPlaying){
            audio.pause();
        }
    },[mainLoopPlaying]);

    useEffect(()=>{
        audio.loop = true;
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
            <button style={item.isPlaying?{backgroundColor:"#27c950"}:undefined} className="loop-button" onClick={()=>toggleIsPlaying(item.id)}><FontAwesomeIcon icon={item.isPlaying? faPause:faPlay} /></button>
      );
}
  
  export default LoopButton;
  