import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteQuestion, fetchQuestion, postQuestion, selectQuestion } from "../../store/questionReducer";
import './QuestionPane.css'

export default function QuestionPane ({question}) {
    // console.log(formId, "QuestionPane");

    // debugger;

    const [editMode, setEditMode] = useState(false);
    const [prompt, setPrompt] = useState(question.prompt);
    const [description, setDescription] = useState(question.description);

    
    const dispatch = useDispatch();

    function updateQuestion () {
        let updatedQuestion = {question: {
            prompt,
            description
        }}
        debugger
        dispatch(postQuestion(updatedQuestion, question.id))
        setEditMode(false);
    }

    // let a = {question: {formId: 1, prompt: "updated another",required: true, description: "hd"}}
    
    // return null;
    return (<div className="qp-wrapper">
        <div className="qp">
            <div className="qp-ele">
                {editMode ? <input type="text" value={prompt} onChange={(e) => {setPrompt(e.target.value)}}/> : <h2>{prompt}</h2>}
                
            </div>
            <div className="qp-ele">
                {editMode ? <textarea onChange={(e) => {setDescription(e.target.value)}}>{description}</textarea> : <h2>{description}</h2>}
                
            </div>
            <button onClick={() => {dispatch(deleteQuestion(question.id))}}>Delete</button>
            <button onClick={() => setEditMode(true)}>Edit</button>
            {editMode ? <button onClick={updateQuestion}>Save</button> : ""}
            
        </div>
    </div>);
}

// useEffect(() => {
//     if(question) {
//         setPrompt(question.prompt);
//         setDescription(question.description);
//     }
// }, [question])

{/* <div className="qp-ele">
<label htmlFor="prompt">Question:</label>
<input id="prompt" type="text" placeholder="enter question here"/>
</div>
<div className="qp-ele">
<label htmlFor="description">Description:</label>
<input id="description" type="text" placeholder="enter description here"/>
</div> */}