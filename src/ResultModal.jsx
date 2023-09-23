import "./App.css";
import Modal from "./Modal";
import { questions } from "./question";

const ResultModal = ({score,setshowResultModal}) => {
    function initScore(){
        if(score <= 3){
            return "GOOD"
        }else if(score == 0){
            return "SORRY"
        }else {
            return "EXCELLENT"
        }
    }
    return <Modal>
        <div className="resultModal">
            <h1>{initScore()} !</h1>
            <h2 className='title'>You Scored {score} out of {questions.length}</h2>
            <button onClick={() => setshowResultModal(false)}>Restart</button>
        </div>
    </Modal>
}

export default ResultModal;