import QuizBox from './QuizBox'
import './App.css'
import StartButton from './StartButton'
import { createPortal } from 'react-dom';
import {useState} from "react";

function App() {
  const [showQuizModal, setShowQuizModal] = useState(false);
  return (
    <div className="container">
      <StartButton onClick={() => setShowQuizModal(true)}/>
      {showQuizModal && createPortal(
        <QuizBox setShowQuizModal={setShowQuizModal}/>,
        document.getElementById("quiz_modal")
      )}
    </div>
  )
}

export default App
