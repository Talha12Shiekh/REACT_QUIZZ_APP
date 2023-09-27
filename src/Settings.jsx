import React from "react";
import "./quixBox.css";

const Settings = ({questions}) => {
    let questionLength = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident maxime ipsam officia! ipsam officia! off "
  return (
    <div className="settings_container">
        <div className="time_manage_container">
            <p>Time :</p>
      <select>
        <option value="volvo">20</option>
        <option value="saab">30</option>
        <option value="mercedes">40</option>
        <option value="audi">60</option>
      </select>
      </div>
      <div className="heading_container">
        <div>
            <h1>Settings</h1>
        </div>
        <div>
            <button>Add Question</button>
        </div>
      </div>
      <div className="setting_questions">
        {
            questions.map(({question},index) => {
                return <div className="single_question">
                <h2>{index + 1}</h2>
                <div>{question.length > questionLength.length ? question.slice(0,questionLength.length) : question}</div>
                <button>
                <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24"><path fill="white" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
                </button>
            </div>
            })
        }
        </div>
    </div>
  );
};

export default Settings;
