import { useDispatch, useSelector } from 'react-redux'
import './SubmissionList.css'
import { useEffect } from 'react';
import { fetchSubmissions, selectSubmissions } from '../../store/submissionReducer';
import SubmissionPane from '../SubmissionPane/SubmissionPane';
import { useState } from 'react';
import { formatDate } from '../../util/util';
// import {AiOutlineClose} from 'react-icons/ai'
import {BsCheck2Circle} from 'react-icons/bs'
import {BsXSquare} from 'react-icons/bs'

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

    // if (submissions && submissions[1].createdAt) {
    //     formatDate(submi)
    // }

    return (
        <div className="sub-list-wrapper">
            
            <div className="sub-row-wrapper sub-row-header">
                <div className="sl-cell">Submission Time</div>
                <div className="sl-cell">Name</div>
                <div className="sl-cell">Email</div>
                <div className="sl-cell">RSVP</div>
            </div>

            {submissions.map((sub) => {
                return(
                    <div key={sub.id} className="sub-row-wrapper">
                        
                        <div className="sl-cell">
                            <div className="sl-inner-cell">{sub.createdAt}</div>
                        </div>    
                        <div className="sl-cell">
                            <div className="sl-inner-cell">{sub.name}</div></div>
                        <div className="sl-cell">
                            <div className="sl-inner-cell">{sub.email}</div></div>
                        <div className="sl-cell">
                            <div className="sl-inner-cell sl-inner-icons">{sub.status === "accept" ? 
                                <> <div className="sl-icon sl-green"> <BsCheck2Circle/></div>Attending</> : 
                                <> <div className='sl-icon sl-red'><BsXSquare/></div>Can't make it</>}
                            </div>
                        </div>
                            
                    </div>
                )
            })}
        </div>
    )

    return null
    // return (
    //     <div className="sl-wrapper">
    //         <div>
    //             <tr className="sl-q-wrapper">
    //                 <th>Submission Time</th>
    //                 {questions.map((q) => {
    //                     return <th>{q.prompt}</th>
    //                 })}
    //             </tr>
    //         </div>
    //         {submissions.map((sub) => {
    //             return <SubmissionPane key={sub.id} submission={sub} questions={questions}/>
    //         })}
    //     </div>
    // );
}