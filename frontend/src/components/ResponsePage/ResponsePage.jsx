import { useDispatch, useSelector } from 'react-redux'
import './ResponsePage.css'
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchQuestions, selectQuestions } from '../../store/questionReducer';
import ResponsePane from '../ResponsePane/ResponsePane';
import csrfFetch from '../../store/csrf';
import { SubmitterInputPane } from '../SubmitterInputPane/SubmitterInputPane';
import { fetchForm, selectForm } from '../../store/formReducer';

export default function ResponsePage(props) {

    const [refs, setRefs] = useState({});


    const { formId } = useParams()

    const dispatch = useDispatch();
    // const location = useLocation();

    useEffect(() => {
        dispatch(fetchQuestions(formId));
        dispatch(fetchForm(formId));
    }, [dispatch])

    const [submitted, setSubmitted] = useState(false);

    const questions = useSelector(selectQuestions(formId));
    const form = useSelector(selectForm(formId));

    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [attendStatus, setAttendStatus] = useState(null);
    const [restricted, setRestricted] = useState(true);
    const [goodAttempt, setGoodAttempt] = useState(true);
    const [emailPass, setEmailPass] = useState("");
    const [failedAttempt, setFailedAttempt] = useState("");

    useEffect(() => {
        if (form) {
            setRestricted(form.restricted);
        }
    }, [form])

    function postResponse() {

        const keys = Object.keys(refs);

        const submission = {
            submission:
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
            submission['submission']['responses'].push({ questionId: ref.current.dataset.questionId, answer: ref.current.value })
        });

        csrfFetch('/api/submissions', {
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
        if (attendStatus === "accept" && questions.length > 0) {

            return (
                <>
                    <div className="ql-header">
                        {questions.length > 0 ? "Amazing! Please answer these event related questions" : null}
                    </div>
                    <div className="ql-added-questions no-gap">

                        {questions.map((q) => {
                            return (
                                <ResponsePane key={q.id} question={q} setRefs={setRefs} refs={refs} />
                            )
                        })}
                    </div>
                </>)
        }
    }

    async function checkEmail() {
        console.log(emailPass, "This is email pass");
        if(!emailPass) {
            setGoodAttempt(false);
            setFailedAttempt(emailPass)
        } else {
            console.log("HERE!");
            const res = await csrfFetch(`/api/check/${formId}/${emailPass}`, {method: "POST", body: JSON.stringify({email: emailPass})})
            const passed = await res.json()
            console.log(passed, "PASS RESULT IS....")
            setRestricted(!passed);
            setGoodAttempt(passed);
            if (!passed) setFailedAttempt(emailPass);
            if (passed) setEmail(emailPass);
        }
    }

    if (submitted) {
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
        if (form && form.title) {
            return (
                <div className="rpage-header">{form.title}<br />
                    <div className="rpage-des">
                        {form.description}
                    </div>
                </div>
            )
        }
    }

    function restriction() {
        if (form && restricted) {
            return (
                <>
                <div className='restriction-message'>Hold it right there! You need to be on the list to submit this form. Please enter your email - if you're on the list we'll show the form.</div>
                    <input className='email-password' placeholder='enter your email' value={emailPass} onChange={(e) => {setEmailPass(e.target.value)}}/>
                    <button onClick={checkEmail}>Request Form</button>
                    
                    {!goodAttempt ?
                        <div className="restricted"> {failedAttempt} was not a match - feel free to try again</div>: ""}
                </>
            )
        } else if (form) {
            return (
                <>
                    {injectHeader()}
                    <SubmitterInputPane name={name} setName={setName} email={email} setEmail={setEmail} attendStatus={attendStatus} setAttendStatus={setAttendStatus} allowInput={true} />
                    {listQuestions()}
                    <button onClick={postResponse} disabled={!attendStatus}>Submit</button>
                </>
            )
        }
    }


    return (
        <div className="response-wrapper">
            {restriction()}
        </div>
    )
}