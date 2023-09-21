import React, { useEffect, useState } from "react";
import SingleQuizComponent from "./SingleQuizComponent";
import { questions } from "./question";

const QuizBox = () => {
  const [currentindex, setcurrentindex] = useState(0);
  const [currentQuestions, setcurrentQuestions] = useState(
    questions[currentindex]
  );
  const [resetOptions, setResetOptions] = useState(false);
  const [showNextButton, setshowNextButton] = useState(false);
  const [disableAllOptions, setdisableAllOptions] = useState(false);
  const [optionSelected, setoptionSelected] = useState(false);

  const increaseQuestions = () => {
    setResetOptions(true);
    setshowNextButton(false);
    setoptionSelected(false);
    if (currentindex >= questions.length - 1) {
      setcurrentindex(0);
    } else {
      setcurrentindex((c) => c + 1);
    }
  };

  useEffect(() => {
    setcurrentQuestions(questions[currentindex]);
  }, [currentindex]);

  return (
    <>
      <div className="quizBox">
        <div className="quiz_top_content">
          <h1>Answer the questions</h1>
        </div>
        <div className="question">
          <h1>
            {currentQuestions.numb}. {currentQuestions.question}
          </h1>
        </div>
        <div className="options">
          {currentQuestions.options.map((option, index) => {
            return (
              <SingleQuizComponent
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
              />
            );
          })}
        </div>
        <div className="quiz_options">
          <div className="questions_info">
            {currentindex + 1} of {questions.length} questions
          </div>
          <div className="next_btn">
            <button
              style={{ display: showNextButton ? "" : "none" }}
              onClick={increaseQuestions}
            >
              Next Que
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizBox;
