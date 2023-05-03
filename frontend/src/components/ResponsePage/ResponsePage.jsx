import { useDispatch, useSelector } from 'react-redux'
import './ResponsePage.css'
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchQuestions, selectQuestions } from '../../store/questionReducer';
import ResponsePane from '../ResponsePane/ResponsePane';
import csrfFetch from '../../store/csrf';

export default function ResponsePage (props) {

    const {formId} = useParams()

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchQuestions(formId));
    },[dispatch])

    const [refs, setRefs] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [attendStatus, setAttendStatus] = useState(null);

    const questions = useSelector(selectQuestions(formId));

    function postResponse() {

        const keys = Object.keys(refs);

        const submission = { submission: 
            {
                formId,
                name,
                email,
                status: attendStatus,
                responses: []
            }
        }

        keys.forEach(key => {
            const ref = refs[key];
            // console.log("START")
            // console.log(ref.current.value, "val")
            // console.log(ref.current.id, "ID")
            // debugger
            submission['submission']['responses'].push({questionId: ref.current.dataset.questionId, answer: ref.current.value})
        });

        // console.log(submission);

        csrfFetch('/api/submissions',{
            method: 'POST',
            body: JSON.stringify(submission)
        }).then((data) => {
            setSubmitted(true);
        })
    }

    // if(Object.values(refs).length >=2) {
    //     debugger;
    // }

    function listQuestions() {
        if(attendStatus === "accept") {

            return (<>
            {questions.length > 0 ? "Amazing! Please answer these event related questions" : null}
            <br/>
            <br/>
            {questions.map((q) => {
                return(
                    <ResponsePane key={q.id} question={q} setRefs={setRefs} refs={refs}/>
                )})}
                </>)
        }
    }

    if(submitted) {
        return <h1>Thank you for your submission!</h1>
    }

    

    return (
        <div className="response-wrapper">
            <div className="r-name-email-wrapper">
                <div className="res-sub-input">
                    <label htmlFor="name">Name: </label>
                    <input type="text" value={name} id='name' onChange={(e)=> {setName(e.target.value)}}/>
                </div>
                <div className="res-sub-input">
                    <label htmlFor="email">Email: </label>
                    <input type="text" value={email} id='name' onChange={(e)=> {setEmail(e.target.value)}}/>
                </div>
                <div className="res-sub-input-radio">
                    <input id='yes' type='radio' value='accept' checked={attendStatus === "accept"} onChange={(e) => {setAttendStatus(e.target.value)}}/>
                    <label htmlFor="yes">Attending</label>
                </div>
            
                <div className="res-sub-input-radio">
                    <input id='no' type='radio' value='decline' checked={attendStatus === "decline"} onChange={(e) => {setAttendStatus(e.target.value)}}/>
                    <label htmlFor="no">Can't Make it</label>
                </div>
            </div>

            {listQuestions()}
            <button onClick={postResponse} disabled={!attendStatus}>Submit</button>
        </div>
    )
}