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
    const [contactFieldsDisabled, setContactFieldsDisabled] = useState(false);
    const [submitMsg, setSubmitMsg] = useState();

    useEffect(() => {
        if (form) {
            setRestricted(form.restricted);
        }
    }, [form])

    function postResponse() {
        if (!attendStatus) {
            setSubmitMsg("Please indicate your attendance!");
            return null;
        } else if (!name || !email) {
            setSubmitMsg("Please enter name and email!");
            return null;
        }

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

        if (keys.length > 0 && refs[keys[0]].current) {
            keys.forEach(key => {
                const ref = refs[key];
                submission['submission']['responses'].push({ questionId: ref.current.dataset.questionId, answer: ref.current.value })
            });
        }

        csrfFetch('/api/submissions', {
            method: 'POST',
            body: JSON.stringify(submission)
        }).then((data) => {
            setSubmitted(true);
        })
    }

    function listQuestions() {
        // only list the questions if the user can attend the event and the event host has created supplemental questions
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

    async function checkEmail(e) {
        e.preventDefault();
        if (!emailPass) {
            setGoodAttempt(false);
            setFailedAttempt(emailPass)
        } else {
            const res = await csrfFetch(`/api/check/${formId}/${emailPass}`, { method: "POST", body: JSON.stringify({ email: emailPass }) })
            const passed = await res.json()
            setRestricted(!passed);
            setGoodAttempt(passed);
            if (!passed) setFailedAttempt(emailPass);
            if (passed) {
                setEmail(emailPass);
                setName(passed.name)
                setContactFieldsDisabled(true);
            }
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

    function getRollout() {
        return (
            <>
                {listQuestions()}
                <button onClick={postResponse}>Submit</button>
                {submitMsg && <div className='form-submit-error'>{submitMsg}</div>}
            </>
        )
    }

    function restriction() {
        if (form && restricted) {
            return (
                <>
                    <form className='restriction-form' onSubmit={(e) => { checkEmail(e) }}>
                        <div className='restriction-message'>Hold it right there! You need to be on the list to submit this form. Please enter your email - if you're on the list we'll show the form.</div>
                        <input type='email' required className='email-password' placeholder='enter your email' value={emailPass} onChange={(e) => { setEmailPass(e.target.value) }} />
                        <button>Request Form</button>
                    </form>
                    {!goodAttempt ?
                        <div className="restricted"> {failedAttempt} was not a match - feel free to try again</div> : ""}
                </>
            )
        } else if (form) {
            return (
                <>
                    {injectHeader()}
                    <SubmitterInputPane disabled={contactFieldsDisabled} name={name} setName={setName} email={email} setEmail={setEmail} attendStatus={attendStatus} setAttendStatus={setAttendStatus} allowInput={true} setSubmitMsg={setSubmitMsg} />
                    {getRollout()}
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