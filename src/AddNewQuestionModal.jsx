import React, { useState } from "react";
import { TIME_VALUE } from "./Settings";

const SingleOptionInput = ({ option, value, name, onChange }) => {
  return (
    <div className="single_option_input">
      <input type="radio" value={value} name={name} />
      <input
        type="text"
        onChange={onChange}
        value={value}
        placeholder={`Option ${option}`}
      />
    </div>
  );
};

const AddNewQuestionModal = React.forwardRef(({
  answer,
  setquestions,
  setshowModal,
  options,
  setoptions,
  question,
  setquestion,
  setedited,
  edited,
  editIndex,
  questions,
  seteditIndex,
  settimer,
  increaseCount
},ref) => {
  let allOptions = document.querySelectorAll("input[type='radio']");

  let timervalue = localStorage.getItem(TIME_VALUE)

  let number = 0;
  const { option1, option2, option3, option4 } = options;

  const emptyFields = () => {
    setshowModal(false);
    setquestion("");
    setoptions({
      option1: "",
      option2: "",
      option3: "",
      option4: "",
    });
  };

  const handleAddQuestions = () => {
    allOptions.forEach((input) => {
      if (input.checked) {
        answer = input.nextElementSibling.value;
      }
    });
    let newQuestion = {
      question,
      options: [option1, option2, option3, option4],
      answer: answer,
      numb: number++,
    };
    if (
      question !== "" &&
      answer !== "" &&
      option1 !== "" &&
      option2 !== "" &&
      option3 !== "" &&
      option4 !== ""
    ) {
      if (edited) {
        let newQuestions = [...questions];
        newQuestions[editIndex] = {
          ...newQuestions[editIndex],
          question,
          options: [option1, option2, option3, option4],
          answer,
        };
        setquestions(newQuestions);
        setedited(false);
        seteditIndex(null);
        emptyFields()
      } else {
        setquestions((prev) => [...prev, newQuestion]);
        emptyFields()
      }
      allOptions.forEach((option) => {
        if (option.checked) {
          option.checked = false;
        }
      });
    } else {
      if (question == "") {
        alert("Please provide the question");
      } else if (
        option1 == "" ||
        option2 == "" ||
        option3 == "" ||
        option4 == ""
      ) {
        alert("Please provide the correct option");
      } else {
        let isAnswered = true;
        allOptions.forEach((option) => {
          if (!option.checked) {
            isAnswered = false;
          }
        });
        if (!isAnswered) {
          alert("Please specify the correct answer also");
        }
      }
    }

    settimer(+timervalue);
    increaseCount();
  };

  const checkCloseModal = () => {
    if (
      question == "" &&
      option1 == "" &&
      option2 == "" &&
      option3 == "" &&
      option4 == "" &&
      answer == ""
    ) {
      setshowModal(false);
    } else {
      handleAddQuestions();
    }
  };

  return (
    <div className="add_modal_container">
      <div className="cross" onClick={checkCloseModal}>
        &times;
      </div>
      <h1>{edited ? "Edit" : "Add"} New Question</h1>
      <input
        className="question_input"
        value={question}
        onChange={(e) => setquestion(e.target.value)}
        placeholder="Question"
        type="text"
      />
      <h2>Options</h2>
      <SingleOptionInput
        value={options.option1}
        onChange={(e) =>
          setoptions((prev) => ({ ...prev, option1: e.target.value }))
        }
        name="options"
        option={"1"}
      />
      <SingleOptionInput
        value={options.option2}
        onChange={(e) =>
          setoptions((prev) => ({ ...prev, option2: e.target.value }))
        }
        name="options"
        option={"2"}
      />
      <SingleOptionInput
        value={options.option3}
        onChange={(e) =>
          setoptions((prev) => ({ ...prev, option3: e.target.value }))
        }
        name="options"
        option={"3"}
      />
      <SingleOptionInput
        value={options.option4}
        onChange={(e) =>
          setoptions((prev) => ({ ...prev, option4: e.target.value }))
        }
        name="options"
        option={"4"}
      />
      <button onClick={handleAddQuestions}>
        {edited ? "Edit" : "Add"} Question
      </button>
    </div>
  );
});

export default AddNewQuestionModal;
