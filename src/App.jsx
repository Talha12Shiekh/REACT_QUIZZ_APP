import QuizBox from "./QuizBox";
import StartButton from "./StartButton";
import { createPortal } from "react-dom";
import { useState, useRef, useEffect } from "react";
import SecondQuizBox from "./SecondQuizBox";
import Modal from "./Modal";

function App() {
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [timer, settimer] = useState(15);
  let interval = useRef();

  useEffect(() => {
    if (timer < 1) {
      clearInterval(interval.current);
    }
  }, [timer]);

  function increaseTimer() {
    settimer((p) => p - 1);
  }

  function increaseCount() {
    interval.current = setInterval(increaseTimer, 1000);
  }

  return (
    <div className="container">
      <StartButton
        interval={interval}
        onClick={() => {
          setShowQuizModal(true);
          increaseCount();
        }}
      />
      {showQuizModal &&
        createPortal(
          <Modal>
            <SecondQuizBox
              settimer={settimer}
              timer={timer}
              setShowQuizModal={setShowQuizModal}
              increaseCount={increaseCount}
              ref={interval}
            />
          </Modal>,

          document.getElementById("quiz_modal")
        )}
    </div>
  );
}

export default App;
