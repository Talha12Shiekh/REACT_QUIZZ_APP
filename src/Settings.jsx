import React, { useEffect, useState } from "react";
import "./quixBox.css";
import AddNewQuestionModal from "./AddNewQuestionModal";
import SecondModal from "./SecondModal";
const TIME_VALUE = "changedTime";
import { AiFillDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";

const getValue = () => {
  let localItem = localStorage.getItem(TIME_VALUE);
  if (localItem) {
    return JSON.parse(localItem);
  }
};

const Settings = ({ questions, settimervalue, setquestions }) => {
  let questionLength =
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident maxime ipsam officia! fkadj";

  const [value, setvalue] = useState(+getValue());

  const [editedQUiz,setEditedQuiz] = useState(null)

  const [question, setquestion] = useState("");

  const [editanswer,seteditanswer]  = useState("")

  const [options, setoptions] = useState({
    option1: "",
    option2: "",
    option3: "",
    option4: "",
  });

  const [edited,setedited] = useState(false);

  const [editIndex,seteditIndex] = useState(null);

  let allOptions = document.querySelectorAll("input[type='radio']");

  useEffect(() => {
    if(editanswer){
      allOptions.forEach(option => {
        if(option.nextElementSibling.value == editanswer){
          option.checked = true
        }
      }) 
    }
  },[editanswer])

  useEffect(() => {
    if(editedQUiz !== null){
      setquestion(editedQUiz.question);
      setoptions({
        option1:editedQUiz.options[0],
        option2:editedQUiz.options[1],
        option3:editedQUiz.options[2],
        option4:editedQUiz.options[3],
      });
      seteditanswer(editedQUiz.answer)
    }
  },[editedQUiz])

  let answer = "";

  const [showModal, setshowModal] = useState(false);

  const handleChange = (e) => {
    setvalue(Number(e.target.value));
  };

  const handleDelete = (ind) => {
    if(questions.length == 1) return alert("There should be at least one question") ;
    let newQuestions = [...questions];
    const deletedQuestions = newQuestions.filter((_, index) => index !== ind);
    setquestions(deletedQuestions);
  };

  const handleEdit = (editind) => {
    let newQuestions = [...questions];
    setshowModal(true);
    const quizToEdit = newQuestions.find((_, index) => index == editind);
    const edit_index = newQuestions.findIndex((_, index) => index == editind);
    setEditedQuiz(quizToEdit);
    seteditIndex(edit_index);
    setedited(true)
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
          edited={edited}
          setedited={setedited}
          editIndex={editIndex}
          questions={questions}
          seteditIndex={seteditIndex}
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
                key={index}
                className="single_question"
              >
                <h2>{index + 1}</h2>
                <div>
                  {question.length > questionLength.length
                    ? question.slice(0, questionLength.length) + "..."
                    : question}
                </div>
                <button className="dlt_btn" onClick={() => handleDelete(index)}>
                  <AiFillDelete size={30} color="white" />
                </button>
                <button className="edit_btn" onClick={() => handleEdit(index)}>
                  <FiEdit2 size={30} color="black" />
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
