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

    const questions = useSelector(selectQuestions(formId));

    function postResponse() {

        const keys = Object.keys(refs);

        const submission = { submission: 
            {
                formId,
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

    if(submitted) {
        return <h1>Thank you for your submission!</h1>
    }

    return (
        <div className="response-wrapper">
            {questions.map((q) => {
                return(
                <ResponsePane key={q.id} question={q} setRefs={setRefs} refs={refs}/>
                )})}
            <button onClick={postResponse}>Submit</button>
        </div>
    )
}