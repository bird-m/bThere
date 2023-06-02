import { useState } from 'react'
import './SubmitterInputPane.css'

export function SubmitterInputPane ({name, setName, email, setEmail, attendStatus, setAttendStatus, disabled, setSubmitMsg, radioDisabled}) {
    
    function handleAttend(e) {
        setSubmitMsg(null);
        setAttendStatus(e.target.value);
    }

    function handleName(e) {
        setSubmitMsg(null);
        setName(e.target.value);
    }

    function handleEmail(e) {
        setSubmitMsg(null);
        setEmail(e.target.value);
    }

    return (
        <div className="si-wrapper">
            <div className="si-contents-wrapper">
                <div className="si-text-input">
                    <div className="si-input">
                        <label htmlFor="name">Name: </label>
                        <input type="text" value={name} id='name' onChange={(e)=> {handleName(e)}} disabled={disabled}/>
                    </div>
                    <div className="si-input">
                        <label htmlFor="email">Email: </label>
                        <input type="text" value={email} id='name' onChange={(e)=> {handleEmail(e)}} disabled={disabled}/>
                    </div>
                </div>
                <div className="si-radio-input">
                    <div className="si-input-radio">
                        <input id='yes' type='radio' value='accept' checked={attendStatus === "accept"} onChange={(e) => {handleAttend(e)}} disabled={radioDisabled}/>
                        <label htmlFor="yes">Attending</label>
                    </div>
                
                    <div className="si-input-radio">
                        <input id='no' type='radio' value='decline' checked={attendStatus === "decline"} onChange={(e) => {handleAttend(e)}} disabled={radioDisabled} />
                        <label htmlFor="no">Can't Make it</label>
                    </div>
                </div>
            </div>
        </div>
    )
}