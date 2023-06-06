import './ModalMsg.css'

export default function ModalMsg({closeModal}) {


    return (
        <div className="ep-wrapper">
            <div className="ep-title">Please note - though this site functions on mobile, work is in progress to make it FULLY mobile optimized to my standards.<br/><br/>
            <span className='warning-cta'>
            Proceed accordingly!</span></div>
            <button className='ep-button' onClick={closeModal}>CLOSE</button>
        </div>
    )
}