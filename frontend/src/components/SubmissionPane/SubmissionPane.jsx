import { useSelector } from 'react-redux'
import './SubmissionPane.css'
import { selectResponses, selectResponsesByQuestionId } from '../../store/responseReducer'

export default function SubmissionPane ({submission, questions}) {

    // console.log(submission.id, "SUB ID")
    const responses = useSelector(selectResponses(submission.id))
    // console.log(responses, "Responses");
    // console.log(submission       .created_, "submitted at")

    const newReponses = useSelector(selectResponsesByQuestionId(submission.id));
    // console.log(newReponses, "NEW RESPONSES");

    return (
        <tr className="sp-wrapper">
            <td>{submission.createdAt}</td>
            {responses.map((res) => {
                return <td>{res.answer}</td>
            })}
        </tr>
    )
}



