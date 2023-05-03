import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './FormConfigSidePanel.css'

export default function FormConfigSidePanel ({setMode}) {

    return (
        <div className="form-config-panel-wrapper">
            <div className="sp-nav-div">Home</div>
            <div onClick={() => {setMode("questions")}} className="sp-nav-div">Add Questions</div>
            <div onClick={() => {setMode("responses")}} className="sp-nav-div">View Responses</div>


            {/* <Link to="/forms">Forms Page</Link>
            <Link to="#" onClick={() => {setMode("questions")}}>Questions</Link>
            <Link to="#" onClick={() => {setMode("responses")}}>Responses</Link> */}
            {/* <Link to="#" onClick={setMode("invitees")} >Invitees</Link> */}
        </div>
    );
}