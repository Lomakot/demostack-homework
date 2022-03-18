import React from 'react';
interface LoopItem{
    id: number
    musicFile: string
}
type Props = {
    item: LoopItem
}

const LoopButton:React.FC<Props> = ({item}) => {
    
    return (
        <button className="loop-button">
  
        </button>
      );
}
  
  export default LoopButton;
  