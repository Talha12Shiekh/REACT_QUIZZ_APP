import React, { useState } from "react";

const SingleOptionInput = ({ option, value, name, onChange }) => {
  return (
    <div className="single_option_input">
      <input type="radio" value={value} name={name} />
      <input type="text" onChange={onChange} value={value} placeholder={`Option ${option}`} />
    </div>
  );
};

const AddNewQuestionModal = ({answer, setquestions,setshowModal,options,setoptions,question,setquestion,setedited,seteditedIndex }) => {
  
  // let answer = ""
  let allOptions = document.querySelectorAll("input[type='radio']");

  let number = 1;

  const handleAddQuestions = () => {
    const { option1, option2, option3, option4 } = options;
    allOptions.forEach((input) => {
      if (input.checked) {
        answer = input.nextElementSibling.value;
      }
    });
    let newQuestion = {
        question,
        options: [option1, option2, option3, option4],
        answer:answer,
        numb: number++,
    };
    if (question.length !== 0 && answer.length !== 0 && option1.length !== 0 && option2.length !== 0 && option3.length !== 0 && option4.length !== 0) {
        setquestions((prev) => [...prev,  newQuestion ]);
    }else{
        alert("Please ! Fill the credentials")
    }
    setshowModal(false)
  };

  return (
    <div className="add_modal_container">
      <h1>Add New Question</h1>
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
      <button onClick={handleAddQuestions}>Add Question</button>
    </div>
  );
};

export default AddNewQuestionModal;
