import { useDispatch, useSelector } from 'react-redux'
import './ResponsePage.css'
import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchQuestions, selectQuestions } from '../../store/questionReducer';
import ResponsePane from '../ResponsePane/ResponsePane';
import csrfFetch from '../../store/csrf';
import { SubmitterInputPane } from '../SubmitterInputPane/SubmitterInputPane';
import { fetchForm, selectForm } from '../../store/formReducer';

export default function ResponsePage (props) {

    const {formId} = useParams()

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchQuestions(formId));
        dispatch(fetchForm(formId));
    },[dispatch])

    const [refs, setRefs] = useState({});
    const [submitted, setSubmitted] = useState(false);
    
    const questions = useSelector(selectQuestions(formId));
    const form = useSelector(selectForm(formId));

    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [attendStatus, setAttendStatus] = useState(null);

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

            return (
                <>
                <div className="ql-header">
                    {questions.length > 0 ? "Amazing! Please answer these event related questions" : null}
                </div>
            <div className="ql-added-questions no-gap">

                {questions.map((q) => {
                    return(
                        <ResponsePane key={q.id} question={q} setRefs={setRefs} refs={refs}/>
                    )})}
            </div>
            </>)
        }
    }

    if(submitted) {
        return (
            <div className="rp-thank-you-wrapper">
                <div className="rp-thank-you">
                    Thank you for your RSVP!
                    <div className="rp-cta">
                        <Link to="/">Learn</Link> how to create your own RSVPs!
                    </div>
                </div>
            </div>
        )
    }

    function injectHeader() {
        if(form && form.title) {
            return (
                <div className="rpage-header">{form.title}<br/>
                    <div className="rpage-des">
                        {form.description}
                    </div>
                </div>
            )
        }
    }

    return (
        <div className="response-wrapper">


            {injectHeader()}

            <SubmitterInputPane name={name} setName={setName} email={email} setEmail={setEmail} attendStatus={attendStatus} setAttendStatus={setAttendStatus} allowInput={true}/>
            {listQuestions()}
            <button onClick={postResponse} disabled={!attendStatus}>Submit</button>
        </div>
    )
}