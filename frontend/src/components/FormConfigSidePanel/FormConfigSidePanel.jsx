import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './FormConfigSidePanel.css'

export default function FormConfigSidePanel ({setMode, navOptions}) {

    return (
        <div className="form-config-panel-wrapper">

            {navOptions.map((o, ix) => {
                return (
                    <div key={ix} onClick={() => {setMode(o)}} className="sp-nav-div">{o}</div>
                )
            })}
        </div>
    );
}