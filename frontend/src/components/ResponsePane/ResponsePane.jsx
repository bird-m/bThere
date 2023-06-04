import { useEffect, useRef, useState } from 'react';
import './ResponsePane.css'

export default function ResponsePane ({question, setRefs, refs}) {

    const [response, setResponse] = useState("");
    const inputRef = useRef();

    useEffect(()=> {
        setRefs((prevRefs) => ({...prevRefs, [question.id]: inputRef}));
    }, [])

    return (
        <div className="rpane-wrapper">
            <label htmlFor={question.id}>{question.prompt}</label>
            {question.description}
            <textarea ref={inputRef} id={question.id} data-question-id={question.id}
            value={response} onChange={(e) => {setResponse(e.target.value)}}/>
        </div>
    );
}