import { useState } from 'react'
import './SubmitterInputPane.css'

export function SubmitterInputPane ({name, setName, email, setEmail, attendStatus, setAttendStatus, disable}) {
    
    

    return (
        <div className="si-wrapper">
                <div className="si-input">
                    <label htmlFor="name">Name: </label>
                    <input type="text" value={name} id='name' onChange={(e)=> {setName(e.target.value)}} disabled={disable}/>
                </div>
                <div className="si-input">
                    <label htmlFor="email">Email: </label>
                    <input type="text" value={email} id='name' onChange={(e)=> {setEmail(e.target.value)}} disabled={disable}/>
                </div>
                <div className="si-input-radio">
                    <input id='yes' type='radio' value='accept' checked={attendStatus === "accept"} onChange={(e) => {setAttendStatus(e.target.value)}} disabled={disable}/>
                    <label htmlFor="yes">Attending</label>
                </div>
            
                <div className="si-input-radio">
                    <input id='no' type='radio' value='decline' checked={attendStatus === "decline"} onChange={(e) => {setAttendStatus(e.target.value)}} disabled={disable}/>
                    <label htmlFor="no">Can't Make it</label>
                </div>
        </div>
    )
}