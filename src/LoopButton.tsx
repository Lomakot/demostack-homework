import React, { useEffect, useState } from 'react';
const song1 = require("./static/music/1.mp3")
const song2 = require("./static/music/2.mp3")
const song3 = require("./static/music/3.mp3")
const song4 = require("./static/music/4.mp3")
const song5 = require("./static/music/5.mp3")
const song6 = require("./static/music/6.mp3")
const song7 = require("./static/music/7.mp3")
const song8 = require("./static/music/8.mp3")
const song9 = require("./static/music/9.mp3")


interface LoopItem{
    id: number
    musicFile: string
}
type LoopButtonProps = {
    item: LoopItem
}

const LoopButton:React.FC<LoopButtonProps> = ({item}) => {

    const [audio,setAudio] = useState<HTMLAudioElement>(new Audio(song1));

    const [playing, setPlaying] = useState<boolean>(false);
    
    const toggle = () => setPlaying(!playing);
    useEffect(() => {
        playing ? audio.play() : audio.pause();
        },
        [playing]
    );
    
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
        
        audio.addEventListener('ended', () => setPlaying(false));
        return () => {
        audio.removeEventListener('ended', () => setPlaying(false));
        };
    }, []);
    return (
            <button className="loop-button" onClick={()=>{toggle()}}>{item.id}</button>
      );
}
  
  export default LoopButton;
  