import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './FormConfigSidePanel.css'

export default function FormConfigSidePanel ({setMode}) {

    return (
        <div className="form-config-panel-wrapper">
            <Link to="/forms">Forms Page</Link>
            <Link to="#" onClick={() => {setMode("questions")}}>Questions</Link>
            <Link to="#" onClick={() => {setMode("responses")}}>Responses</Link>
            {/* <Link to="#" onClick={setMode("invitees")} >Invitees</Link> */}
        </div>
    );
}