import './ErrorPane.css'

export default function ErrorPane({errors, closeModal}) {


    return (
        <div className="ep-wrapper">
            <div className="ep-title">{`Your submission is invalid for the following reason${(errors.length > 1) ? "s" : ""}:`}</div>
            {errors.map((e, ix) => {
                return (<div key={ix} className="ep-error">
                    {e}
                </div>)
            })}
            <button className='ep-button' onClick={closeModal}>CLOSE</button>
        </div>
    )
}