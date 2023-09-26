import React, { useEffect, useState,useRef} from "react";
import { questions } from "./question";
import "./quixBox.css";

const SecondSingleQuiz = React.forwardRef(
  (
    {
      option,
      currentindex,
      resetOptions,
      setResetOptions,
      setshowNextButton,
      disableAllOptions,
      setdisableAllOptions,
      optionSelected,
      setoptionSelected,
      setscore,
      options,
    },ref
  ) => {
    const [isCorrect, setisCorrect] = useState(null);
  const [className, setclassName] = useState("");
  const [iconclassName, seticonclassName] = useState(null);
  const singleQuizRef = useRef();

  const correctAnswer = questions[currentindex].answer;
  let allQuizes = document.querySelectorAll(".single_quiz");

  function findAnswer(answer) {
    clearInterval(ref.current)
    if (!optionSelected) {
      setoptionSelected(true);
      setResetOptions(false);
      setshowNextButton(true);
      
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
      seticonclassName(true)
    } else if (isCorrect == null) {
      setclassName("");
      seticonclassName(null)
    } else if (!isCorrect) {
      setclassName("red");
      seticonclassName(false)
      for(let i = 0;i<allQuizes.length;i++){
        if(allQuizes[i].innerText == correctAnswer){
          allQuizes[i].style.backgroundColor = "lightgreen"
        }
      }
    }
    if (resetOptions) {
      setisCorrect(null);
      seticonclassName(null)
    }

    if (optionSelected) {
      setdisableAllOptions(true);
    } else {
      setdisableAllOptions(false);
    }
  }, [isCorrect, resetOptions]);

  function iconClassName(){
    if(iconclassName == null){
      return "hidden"
    }else if(iconclassName){
      return "showTickIcon"
    }else {
      return "showCrossIcon"
    }
  }

    return (
      <div
        className={`single_quiz ${className} ${
          disableAllOptions ? "pointer_events" : ""
        }`}
        ref={singleQuizRef}
        onClick={() => findAnswer(option)}
      >
        <div>{option}</div>
        <div>
        <div className={`icon_contianer ${iconClassName()}`}>{iconclassName ? "✓" : "✖"}</div>
        </div>
      </div>
    );
  }
);

export default SecondSingleQuiz;
