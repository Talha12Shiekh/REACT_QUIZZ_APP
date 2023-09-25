import React, { useEffect, useState } from "react";
import SingleQuizComponent from "./SingleQuizComponent";
import { questions } from "./question";
import Modal from "./Modal"
import ResultModal from "./ResultModal"
import { createPortal } from 'react-dom';
import SecondSingleQuiz from "./SecondSingleQuiz";

const SecondQuizBox = React.forwardRef(
  ({ settimer, timer, increaseCount }, ref) => {
    const [currentindex, setcurrentindex] = useState(0);
    const [currentQuestions, setcurrentQuestions] = useState(
      questions[currentindex]
    );
    let allQuizes = document.querySelectorAll(".singleQuiz");
    const [resetOptions, setResetOptions] = useState(false);
    const [showNextButton, setshowNextButton] = useState(false);
    const [disableAllOptions, setdisableAllOptions] = useState(false);
    const [optionSelected, setoptionSelected] = useState(false);
    const [showResultModal, setshowResultModal] = useState(false);
    const [score, setscore] = useState(0);

    const increaseQuestions = () => {
        settimer(15)
        clearInterval(ref.current);
        increaseCount()
        setResetOptions(true);
        setshowNextButton(false);
        setoptionSelected(false);
        setdisableAllOptions(false);
        if (currentindex >= questions.length - 1) {
          setshowResultModal(true);
          setcurrentindex(0)
        } else {
          setcurrentindex((c) => c + 1);
        }
      };
    
      useEffect(() => {
        setcurrentQuestions(questions[currentindex]);
      }, [currentindex]);
    
      let correctAnswer = currentQuestions.answer;
    
      useEffect(() => {
        if(timer == 0){
          setdisableAllOptions(true);
          setshowNextButton(true);
          for(let i = 0;i<allQuizes.length;i++){
            if(allQuizes[i].innerText == correctAnswer){
              allQuizes[i].style.backgroundColor = "lightgreen"
            }
          }
        }
      },[timer])
    
      function initTimer(){
         if(timer < 10){
          return "0" + timer;
        }else {
          return timer;
        }
      }

    return (
        <>
        {showResultModal && createPortal(<ResultModal setshowResultModal={setshowResultModal} score={score}/>,document.getElementById("result_modal"))}
      <div className="quix_box_container">
        <header className="quix_box_top_content">
          <div>
            <h1>Answer the questions</h1>
          </div>
          <div>
            <div>
              <h2>
              Time {timer == 0 ? "Off" : "Left"} <span>{initTimer()}</span> 
              </h2>
            </div>
          </div>
        </header>
        <div className="question_container">
          <h1>{currentQuestions.numb}. {currentQuestions.question}</h1>
        </div>
        <main>
        {currentQuestions.options.map((option, index) => {
            return (
              <SecondSingleQuiz
              currentindex={currentindex}
              key={index}
              resetOptions={resetOptions}
              setResetOptions={setResetOptions}
              disableAllOptions={disableAllOptions}
              setdisableAllOptions={setdisableAllOptions}
              setshowNextButton={setshowNextButton}
              optionSelected={optionSelected}
              setoptionSelected={setoptionSelected}
              option={option}
              setscore={setscore}
              ref={ref}
              options={currentQuestions.options}
              />
            );
          })}
        </main>
        <footer className="quiz_bottom_content">
          <div>{currentindex + 1} of {questions.length} questions</div>
          <div>
            <button
            style={{ display: showNextButton ? "" : "none" }}
            onClick={increaseQuestions}
            >Next Que</button>
          </div>
        </footer>
      </div>
      </>
    );
  }
);

export default SecondQuizBox;
