import StartButton from "./StartButton";
import { useState, useRef, useEffect } from "react";
import SecondQuizBox from "./SecondQuizBox";
import { Routes, Route, useNavigate, Link, useLocation } from "react-router-dom";
import ResultModal from "./ResultModal";
import Settings, { TIME_VALUE } from "./Settings";
import { questions as DefaultQuestions } from "./question";
const LOCAL_QUESTIONS = "local_questions"

const getQuestions = () => {
  const local_questions = localStorage.getItem(LOCAL_QUESTIONS);
  if(local_questions){
    return JSON.parse(local_questions)
  }else {
    return null
  }
}

function App() {
  const [timervalue,settimervalue] = useState(15);
  let localTime = localStorage.getItem(TIME_VALUE);
  const [timer, settimer] = useState(+localTime);
  let interval = useRef();
  const [score, setscore] = useState(0);
  const [questions,setquestions] = useState(getQuestions() !== null ? getQuestions() : DefaultQuestions);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem(LOCAL_QUESTIONS,JSON.stringify(questions))
  },[questions])

  useEffect(() => {
    if (timer < 1) {
      clearInterval(interval.current);
    }
  }, [timer]);

  function increaseTimer() {
    settimer((p) => p - 1);
  }

  function increaseCount() {
    interval.current = setInterval(increaseTimer, 1000);
  }

  useEffect(() => {
    settimer(timervalue);
    setscore(0)
    navigate("/");
  }, []);

  const currentLocation = useLocation();
  const [location,setlocation] = useState(currentLocation.pathname);

  useEffect(() => {
    setlocation(currentLocation.pathname);
  },[currentLocation.pathname])

  return (
    <div className="container">
      {location !== "/Settings" && <Link to="Settings" className="settings_button_container">
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M19.5 12c0-.23-.01-.45-.03-.68l1.86-1.41c.4-.3.51-.86.26-1.3l-1.87-3.23a.987.987 0 0 0-1.25-.42l-2.15.91c-.37-.26-.76-.49-1.17-.68l-.29-2.31c-.06-.5-.49-.88-.99-.88h-3.73c-.51 0-.94.38-1 .88l-.29 2.31c-.41.19-.8.42-1.17.68l-2.15-.91c-.46-.2-1-.02-1.25.42L2.41 8.62c-.25.44-.14.99.26 1.3l1.86 1.41a7.343 7.343 0 0 0 0 1.35l-1.86 1.41c-.4.3-.51.86-.26 1.3l1.87 3.23c.25.44.79.62 1.25.42l2.15-.91c.37.26.76.49 1.17.68l.29 2.31c.06.5.49.88.99.88h3.73c.5 0 .93-.38.99-.88l.29-2.31c.41-.19.8-.42 1.17-.68l2.15.91c.46.2 1 .02 1.25-.42l1.87-3.23c.25-.44.14-.99-.26-1.3l-1.86-1.41c.03-.23.04-.45.04-.68zm-7.46 3.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5s-1.57 3.5-3.5 3.5z"
            />
          </svg>
          <span>Settings</span>
        </button>
      </Link>}
      <Routes>
        <Route path="/">
          <Route
            index
            element={
                <StartButton
                  interval={interval}
                  onClick={() => {
                    increaseCount();
                  }}
                />
            }
          />
          <Route
            path="quizModal"
            element={
              <SecondQuizBox
                settimer={settimer}
                timer={timer}
                increaseCount={increaseCount}
                ref={interval}
                score={score}
                setscore={setscore}
                questions={questions}
                timervalue={timervalue}
              />
            }
          />
          <Route
            path="ResultModal"
            element={
              <ResultModal
                increaseCount={increaseCount}
                settimer={settimer}
                ref={interval}
                score={score}
                setscore={setscore}
                timervalue={timervalue}
                questions={questions}
              />
            }
          />
          <Route
            path="Settings"
            element={
              <Settings
                questions={questions}
                setquestions={setquestions}
                settimervalue={settimervalue}
                settimer={settimer}
                increaseCount={increaseCount}
                ref={interval}
              />
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
