import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteQuestion, fetchQuestion, postQuestion, selectQuestion } from "../../store/questionReducer";
import './QuestionPane.css'
import { AiFillEdit } from 'react-icons/ai'
import { FaCheck } from 'react-icons/fa'
import { AiFillDelete } from 'react-icons/ai'
import ghLogo from "../../images/github-mark-white.png"

export default function QuestionPane({ question, formId }) {
    // console.log(formId, "FORM ID IN QP")

    const [editMode, setEditMode] = useState(false);
    const [prompt, setPrompt] = useState(question.prompt);
    const [description, setDescription] = useState(question.description);

    const formRef = useRef(null);
    const dispatch = useDispatch();

    function updateQuestion(e) {
        e.preventDefault()
        let updatedQuestion = {
            question: {
                prompt,
                description
            }
        }

        dispatch(postQuestion(updatedQuestion, question.id))
        setEditMode(false);
    }

    // 008001

    function injectIcons() {
        if (editMode) {
            return (
                <>
                    <div></div>
                    <button className="qp-mod-icon qp-save-icon svg-button"><FaCheck /></button>
                </>)
        }
        else {
            return (<>
                <div className="qp-mod-icon qp-del-icon" onClick={() => { dispatch(deleteQuestion(question.id)) }}><AiFillDelete /></div>
                <div className="qp-mod-icon qp-edit-icon" onClick={() => setEditMode(true)}><AiFillEdit /></div>
            </>)
        }
    }

    // let a = {question: {formId: 1, prompt: "updated another",required: true, description: "hd"}}

    // return null;
    return (
        <form id="myForm" className="qp-wrapper" ref={formRef} onSubmit={(e) => { updateQuestion(e) }}>

            <div className="qp-mod-button-wrapper">
                {injectIcons()}
            </div>
            <div className="qp">
                <div className="qp-ele">
                    {(editMode) ? <input placeholder="enter the question here" required type="text" value={prompt} onChange={(e) => { setPrompt(e.target.value) }} /> : <h2>{prompt}</h2>}

                </div>

                {!description && !(editMode) ? null :
                    <div className="qp-ele">
                        {(editMode) ? <textarea placeholder="enter a description here" value={description} onChange={(e) => { setDescription(e.target.value) }} /> : <h2>{description}</h2>}
                    </div>
                }
            </div>
        </form>);
}