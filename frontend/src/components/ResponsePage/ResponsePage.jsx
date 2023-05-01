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

    const questions = useSelector(selectQuestions(formId));

    function submitResponse() {

    }

    async function postResponse() {
        const response = await csrfFetch('/')
    }

    // if(Object.values(refs).length >=2) {
    //     debugger;
    // }

    return (
        <div className="response-wrapper">
            {questions.map((q) => {
                return(
                <ResponsePane key={q.id} question={q} setRefs={setRefs} refs={refs}/>
                )})}
            <button onClick={() => {debugger}}>Submit</button>
        </div>
    )
}