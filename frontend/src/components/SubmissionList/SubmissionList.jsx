import { useDispatch, useSelector } from 'react-redux'
import './SubmissionList.css'
import { useEffect } from 'react';
import { fetchSubmissions, selectSubmissions } from '../../store/submissionReducer';
import SubmissionPane from '../SubmissionPane/SubmissionPane';
import { useState } from 'react';

export default function SubmissionList ({form, questions}) {

    const dispatch = useDispatch();
    const [columnCount, setColumnCount] = useState(questions.length + 1);
    // const
    
    useEffect(() => {
        dispatch(fetchSubmissions(form.id));
    }, [dispatch])

    useEffect(() => {
        if ((questions.length + 1) !== columnCount) {
            setColumnCount(questions.length + 1);
        }
    }, [questions])

    const submissions = useSelector(selectSubmissions(form.id));


    return (
        <table className="sl-wrapper">
            <thead>
                <tr className="sl-q-wrapper">
                    <th>Submission Time</th>
                    {questions.map((q) => {
                        return <th>{q.prompt}</th>
                    })}
                </tr>
            </thead>
            {submissions.map((sub) => {
                return <SubmissionPane key={sub.id} submission={sub} questions={questions}/>
            })}
        </table>
    );
}