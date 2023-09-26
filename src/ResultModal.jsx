import { forwardRef } from "react";
import { questions } from "./question";

const ResultModal = forwardRef(function ResultModal(
  { increaseCount, settimer, score, setshowResultModal },
  ref
) {
  function initScore() {
    if (score <= 3) {
      return "GOOD";
    } else if (score == 0) {
      return "SORRY";
    } else {
      return "EXCELLENT";
    }
  }
  return (
      <div className="resultModal">
        <h1>{initScore()} !</h1>
        <h2 className="title">
          You Scored {score} out of {questions.length}
        </h2>
        <button
          onClick={() => {
            setshowResultModal(false);
            settimer(15);
            clearInterval(ref.current);
            increaseCount();
          }}
        >
          Restart
        </button>
      </div>
  );
});

export default ResultModal;
