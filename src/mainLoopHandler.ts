import React, { MouseEventHandler } from "react"

export const startPlaying: MouseEventHandler = (event:React.MouseEvent<HTMLButtonElement>) => {
    console.log("starting loop")
}
export const stopPlaying: MouseEventHandler = (event:React.MouseEvent<HTMLButtonElement>) => {
    console.log("stoping loop")
}

//module.exports = {startPlaying,stopPlaying}