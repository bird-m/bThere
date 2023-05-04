import './SubmissionResponseModal.css'

export default function SubmissionResponseModal ({responses, setModal}) {



    return (
        <div className="sub-modal-wrapper">
            <div className="sub-inner-modal-wrapper">
                {responses.map((r) => {
                    return <>{r.answer}<br/></>
                })}
            </div>
        </div>
    )
}