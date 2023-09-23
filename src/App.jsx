import QuizBox from "./QuizBox";
import "./App.css";
import StartButton from "./StartButton";
import { createPortal } from "react-dom";
import { useState, useRef,useEffect } from "react";

function App() {
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [timer, settimer] = useState(15);
  let interval = useRef();

  useEffect(() => {
    if(timer < 1){
      clearInterval(interval.current)
    }
  },[timer])

  function increaseTimer() {
    settimer((p) => p - 1);
  }

  function increaseCount(){
    interval.current = setInterval(increaseTimer, 1000);
  }

  return (
    <div className="container">
      <StartButton
        interval={interval}
        onClick={() => {
          setShowQuizModal(true);
          increaseCount()
        }}
      />
      {showQuizModal &&
        createPortal(
          <QuizBox
            settimer={settimer}
            timer={timer}
            setShowQuizModal={setShowQuizModal}
            increaseCount={increaseCount}
          />,
          document.getElementById("quiz_modal")
        )}
    </div>
  );
}

export default App;
