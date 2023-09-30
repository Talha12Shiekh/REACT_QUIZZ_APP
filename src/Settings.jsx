import React, { useEffect, useState } from "react";
import "./quixBox.css";
import AddNewQuestionModal from "./AddNewQuestionModal";
import SecondModal from "./SecondModal";
const TIME_VALUE = "changedTime";
import { AiFillDelete } from "react-icons/ai";

const getValue = () => {
  let localItem = localStorage.getItem(TIME_VALUE);
  if (localItem) {
    return JSON.parse(localItem);
  }
};

const Settings = ({ questions, settimervalue, setquestions }) => {
  let questionLength =
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident maxime ipsam officia! ipsam officia! off ";

  const [value, setvalue] = useState(+getValue());

  const [editedQUiz,setEditedQuiz] = useState(null)

  const [question, setquestion] = useState("");

  const [options, setoptions] = useState({
    option1: "",
    option2: "",
    option3: "",
    option4: "",
  });

  useEffect(() => {
    if(editedQUiz !== null){
      setquestion(editedQUiz.question);
      setoptions({
        option1:editedQUiz.options[0],
        option2:editedQUiz.options[1],
        option3:editedQUiz.options[2],
        option4:editedQUiz.options[3],
      });
    }
  },[editedQUiz])

  let answer = "";

  const [showModal, setshowModal] = useState(false);

  const handleChange = (e) => {
    setvalue(Number(e.target.value));
  };

  const handleDelete = (ind) => {
    let newQuestions = [...questions];
    const deletedQuestions = newQuestions.filter((_, index) => index !== ind);
    setquestions(deletedQuestions);
  };

  const handleEdit = (editind) => {
    let newQuestions = [...questions];
    setshowModal(true);
    const quizToEdit = newQuestions.find((_, index) => index == editind);
    setEditedQuiz(quizToEdit)
  
  };

  useEffect(() => {
    localStorage.setItem(TIME_VALUE, JSON.stringify(value));
    settimervalue(value);
  }, [value]);

  return (
    <>
      <SecondModal isOpen={showModal}>
        <AddNewQuestionModal
          answer={answer}
          question={question}
          setquestion={setquestion}
          options={options}
          setoptions={setoptions}
          setshowModal={setshowModal}
          setquestions={setquestions}
        />
      </SecondModal>
      <div className="settings_container">
        <div className="top_content_container">
          <div className="time_manage_container">
            <p>Time :</p>
            <select value={value} onChange={handleChange}>
              <option value="15">15</option>
              <option value="30">30</option>
              <option value="45">45</option>
              <option value="60">60</option>
            </select>
          </div>
          <div>
            <button onClick={(_) => setshowModal(true)}>Add Question</button>
          </div>
        </div>

        <div className="heading_container">
          <h1>Settings</h1>
        </div>
        <div className="setting_questions">
          {questions.map(({ question }, index) => {
            return (
              <div
                className="single_question"
                onClick={() => handleEdit(index)}
              >
                <h2>{index + 1}</h2>
                <div>
                  {question.length > questionLength.length
                    ? question.slice(0, questionLength.length)
                    : question}
                </div>
                <button onClick={() => handleDelete(index)}>
                  <AiFillDelete size={30} color="white" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Settings;
