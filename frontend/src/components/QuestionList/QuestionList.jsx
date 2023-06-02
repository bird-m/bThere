import { useDispatch, useSelector } from "react-redux";
import { fetchQuestions, postQuestion, selectQuestions } from "../../store/questionReducer";
import { useEffect } from "react";
import QuestionPane from "../QuestionPane/QuestionPane";
import './QuestionList.css'
import { SubmitterInputPane } from "../SubmitterInputPane/SubmitterInputPane";
import { useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { fetchForm } from "../../store/formReducer";

export function QuestionList() {

    const {formId} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchQuestions(formId))
    }, [dispatch])

    const questions = useSelector(selectQuestions(formId));

    const [showQpane, setShowQpane] = useState(false);

    const [prompt, setPrompt] = useState("");
    const [description, setDescription] = useState("");

    function handleSave(e) {
        e.preventDefault();
        let newQuestion = {
            question: {
                prompt,
                description,
                formId
            }
        }

        dispatch(postQuestion(newQuestion));
        setPrompt("");
        setDescription("");
        setShowQpane(false);
    }

    function handleCancel(e) {
        e.preventDefault();
        setPrompt("");
        setDescription("");
        setShowQpane(false)
    }

    function injectQ() {
        return (
            <div className="qp-wrapper">
                <div className="ql-create">
                    <div className="ql-header">Create New Question</div><br />
                    <form onSubmit={(e) => handleSave(e)}>
                        <div className="qp-ele">
                            <label htmlFor="create-prompt">Question: </label>
                            <input value={prompt} id="create-prompt" required onChange={(e) => { setPrompt(e.target.value) }} />
                        </div>
                        <div className="qp-ele">
                            <label htmlFor="create-des">Description: </label>
                            <textarea value={description} id="create-des" onChange={(e) => { setDescription(e.target.value) }} />
                        </div>
                        <div className="qp-save-cancel">
                            <input type="submit" className="save-button" id="save-button" value="Save"/>
                            {/* <button className="save-button" onClick={(e) => {handleSave(e)}}>Save</button> */}
                            <button className="cancel-button" onClick={(e) => {handleCancel(e)}}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <div className="ql-list">

            <div className="ql-header">
                Required Questions
            </div>

            <SubmitterInputPane disabled={true} radioDisabled={true}/>


            {showQpane ? null : <button onClick={() => { setShowQpane(true) }}>Add Question</button>}

            {showQpane ? injectQ() : null}

            <div className="ql-header">
                {(questions && questions.length > 0) ? "Your Additional Questions" : null}
            </div>
            <div className="ql-added-questions">

                {questions.map((q) => {
                    return <QuestionPane key={q.id} question={q} formId={formId} />
                })}
            </div>
        </div>
    );
}