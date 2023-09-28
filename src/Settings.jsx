import React, { useEffect, useState } from "react";
import "./quixBox.css";
import AddNewQuestionModal from "./AddNewQuestionModal";
import SecondModal from "./SecondModal";
const TIME_VALUE = "changedTime";

const getValue = () => {
  let localItem = localStorage.getItem(TIME_VALUE);
  if (localItem) {
    return JSON.parse(localItem);
  }
};

const Settings = ({ questions, settimervalue ,setquestions}) => {
  let questionLength =
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident maxime ipsam officia! ipsam officia! off ";

  const [value, setvalue] = useState(+getValue());

  const [showModal, setshowModal] = useState(false);

  const handleChange = (e) => {
    setvalue(Number(e.target.value));
  };

  useEffect(() => {
    localStorage.setItem(TIME_VALUE, JSON.stringify(value));
    settimervalue(value);
  }, [value]);

  return (
    <>
      <SecondModal isOpen={showModal}>
        <AddNewQuestionModal setshowModal={setshowModal} setquestions={setquestions}/>
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
              <div className="single_question">
                <h2>{index + 1}</h2>
                <div>
                  {question.length > questionLength.length
                    ? question.slice(0, questionLength.length)
                    : question}
                </div>
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="3em"
                    height="3em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="white"
                      d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                    ></path>
                  </svg>
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
