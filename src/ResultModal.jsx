import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import "./quixBox.css"

const ResultModal = forwardRef(function ResultModal(
  { increaseCount, settimer, score,setscore,timervalue,questions },
  ref
) {
  function initScore() {
    if (score == 0) {
      return "SORRY";
    } else if (score <= 3) {
      return "GOOD";
    } else {
      return "EXCELLENT";
    }
  }

  const navigate = useNavigate()

  return (
      <div className="resultModal">
        <h1>{initScore()} !</h1>
        <h2 className="title">
          You Scored {score} out of {questions.length}
        </h2>
        <button
          onClick={() => {
            settimer(timervalue);
            clearInterval(ref.current);
            increaseCount();
            navigate("/quizModal");
            setscore(0)
          }}
        >
          Restart
        </button>
      </div>
  );
});

export default ResultModal;
