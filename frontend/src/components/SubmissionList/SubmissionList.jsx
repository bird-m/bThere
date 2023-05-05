import { useDispatch, useSelector } from 'react-redux'
import './SubmissionList.css'
import { useEffect } from 'react';
import { fetchSubmissions, selectSubmissions } from '../../store/submissionReducer';
// import SubmissionPane from '../SubmissionPane/SubmissionPane';
import { useState } from 'react';
import { formatDate } from '../../util/util';
// import {AiOutlineClose} from 'react-icons/ai'
import {BsCheck2Circle} from 'react-icons/bs'
import {BsXSquare} from 'react-icons/bs'
import {BiDownload} from 'react-icons/bi'
import { selectResponsesByForm } from '../../store/responseReducer';
// import stream from 'stream-browserify';
// import {stringify} from 'csv-stringify';

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
    const responses = useSelector(selectResponsesByForm(form.id));

    console.log(responses);

    function generateCsvData() {
        let header = ['SubmissionTime','SubmitterName','SubmitterEmail','SubmitterStatus']
        let questionHeader = []
        let questionIds = [];
        
        if(form && questions && submissions) {
            // debugger;
            questions.forEach((q, ix) => {
                questionHeader.push(q.prompt);
                questionIds.push(q.id);
            })
        }

        console.log(questionIds, "QIDs");

        header = header.concat(questionHeader)

        // prime header
        let csv = deComma(header).join(',') + '\n'

        submissions.forEach(sub => {
            const row = [
                sub.createdAt,
                sub.name,
                sub.email,
                sub.status
            ]

            // console.log("RUNNING");
            // console.log(responses, "Responses");
            let subResponses = responses.filter((r)=> {
                // console.log(sub.id, "SUBID");
                // console.log(r.submissionId, "RSUBID");
                return parseInt(sub.id) === parseInt(r.submissionId);
            })

            console.log(subResponses, "subResponses");

            const resRow = []
            
            questionIds.forEach((qId)=> {
                let found = false
                for (let index = 0; index < subResponses.length; index++) {
                    const r = subResponses[index];
                    if(parseInt(r.questionId) === parseInt(qId)) {
                        resRow.push(r.answer)
                        found = true;
                        break;
                    }
                }
                if(!found) {
                    resRow.push(" ")
                }
            })

            console.log(resRow, "RESROW");

            // console.log(subResponses, "srrrrr")

            // questionIds.forEach((id) => {
                
            // })

            // debugger;
            
            // debugger;
            const preCsv = row.concat(resRow)
            // debugger;
            csv = csv + deComma(preCsv).join(",") + '\n';
            // debugger;
        });

        console.log(csv);
        return csv;
    }

    function deComma(array) {
        return array.map((e) => {
            return e.replace(/,/g, "");
        })
    }

    function downloadCsv() {
        const csvData = generateCsvData();

        const blob = new Blob([csvData], { type: 'text/csv' });
          const url = URL.createObjectURL(blob);
          return url;
      }

    return (
        <div className="sub-list-wrapper">
            <div className="sl-download-div"><a download={`${form.title}_response_list.csv`} href={downloadCsv()}><BiDownload/></a></div>
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