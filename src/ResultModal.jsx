import "./App.css";
import Modal from "./Modal";
import { questions } from "./question";

const ResultModal = ({score,setshowResultModal}) => {
    return <Modal>
        <div className="resultModal">
            <h1>{score <= 3 ? "GOOD" : "CONGRADULATIONS"} !</h1>
            <h2 className='title'>You Scored {score} out of {questions.length}</h2>
            <button onClick={() => setshowResultModal(false)}>Restart</button>
        </div>
    </Modal>
}

export default ResultModal;