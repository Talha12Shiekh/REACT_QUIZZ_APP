import React from 'react';
import "./quixBox.css"
import { Link } from 'react-router-dom';

const StartButton = ({onClick,interval}) => {
  return (
    <Link to="quizModal">
      <button onClick={onClick} className='start_btn'>Start Quiz</button>
    </Link>
  )
}

export default StartButton
