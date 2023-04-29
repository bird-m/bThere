import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './FormConfigSidePanel.css'

export default function FormConfigSidePanel (props) {

    return (
        <div className="form-config-panel-wrapper">
            <Link to="/forms">Forms Page</Link>
            <Link to="#">Questions</Link>
            <Link to="#">Invitees</Link>
        </div>
    );
}