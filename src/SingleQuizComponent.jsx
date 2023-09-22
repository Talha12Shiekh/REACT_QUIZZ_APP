import React, { useEffect, useState } from "react";
import "./App.css";
import { questions } from "./question";

const SingleQuizComponent = ({
  option,
  currentindex,
  resetOptions,
  setResetOptions,
  setshowNextButton,
  disableAllOptions,
  setdisableAllOptions,
  optionSelected,
  setoptionSelected,
  setscore
}) => {
  const [isCorrect, setisCorrect] = useState(null);

  const [className, setclassName] = useState("");

  function findAnswer(answer) {
    if (!optionSelected) {
      setoptionSelected(true);
      setResetOptions(false);
      setshowNextButton(true);
      const correctAnswer = questions[currentindex].answer;
      const clickedOption = answer;
      if (clickedOption === correctAnswer) {
        setisCorrect(true);
        setscore(p => p + 1);
      } else {
        setisCorrect(false);
      }
    }
  }

  useEffect(() => {
    if (isCorrect) {
      setclassName("green");
    } else if (isCorrect == null) {
      setclassName("");
    } else if (!isCorrect) {
      setclassName("red");
    }
    if (resetOptions) {
      setisCorrect(null);
    }

    if (optionSelected) {
      setdisableAllOptions(true);
    } else {
      setdisableAllOptions(false);
    }
  }, [isCorrect, resetOptions]);

  return (
    <div
      className={`singleQuiz ${className} ${
        disableAllOptions ? "pointer_events" : ""
      }`}
      onClick={() => findAnswer(option)}
    >
      {option}
    </div>
  );
};

export default SingleQuizComponent;
