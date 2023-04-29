import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestion, selectQuestion } from "../../store/questionReducer";
import './QuestionPane.css'

export default function QuestionPane ({question}) {
    // console.log(props);

    // debugger;


    const [prompt, setPrompt] = useState(question.prompt);
    const [description, setDescription] = useState(question.description);

    
    function wipe () {
        console.log("unmounting");
    }

    useEffect(() => {
        return wipe
    },[])
    
    // return null;
    return (<div className="qp-wrapper">
        <div className="qp">
            <div className="qp-ele">
                <h2>{prompt}</h2>
            </div>
            <div className="qp-ele">
                <h2>{description}</h2>
            </div>
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