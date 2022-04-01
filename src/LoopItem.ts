import React from 'react';

export interface LoopItem{
    id: number
    musicFile: string
}

export class Synchronizer{
    songs:HTMLAudioElement[];
    timer: number | undefined
    delay: number
    running: boolean
    count: number = 0
    constructor(){
      this.songs = []
      this.timer = undefined
      this.delay = 0
      this.running = false
      this.count++
    }
  
    addSong(song:HTMLAudioElement){
      this.songs.push(song)
    }
    removeSong(song:HTMLAudioElement){
      song.pause()
      this.songs.splice(this.songs.indexOf(song),1)
    }

    start(){
        //calculate delay, play and set new play in 8 seconds
        if(!this.running){
            const launchTime = (new Date()).getTime()
            this.play()
            //console.log(this.delay)
            this.timer = setTimeout(()=>{
                const runTime = (new Date()).getTime()
                this.delay = runTime - launchTime - 8000
                //console.log("syncNum"+this.count+" "+launchTime.toString() + "-" + runTime.toString() + "=" + this.delay)
                this.running = false
                this.start()
            },8000-this.delay) as unknown as number
        }
    }

    private play(){
        //let songsPlaying = ""
        for(let song of this.songs){
            song.currentTime = 0;
            song.play();
            //songsPlaying+=(song.src+",")
        }
        //console.log(songsPlaying)
        this.running = true
    }

    stop(){
        clearInterval(this.timer)
        for(let song of this.songs){
            song.pause();
        }
        this.running = false
    }
  }