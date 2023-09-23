import React from 'react';
import "./App.css"

const StartButton = ({onClick,interval}) => {
  return (
    <div>
      <button onClick={onClick} className='start_btn'>Start Quiz</button>
    </div>
  )
}

export default StartButton
