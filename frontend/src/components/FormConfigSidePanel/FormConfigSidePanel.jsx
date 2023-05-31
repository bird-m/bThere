import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './FormConfigSidePanel.css'
import checkLogo from '../../images/check-logo.png'

export default function FormConfigSidePanel({ setMode, navOptions }) {

    return (
        <div className="form-config-panel-wrapper">

            <div className="banner-img-wrapper">
            <Link to="/">
                <img className='banner-img' src={checkLogo} />
            </Link>
            </div>

            {/* <div className="sp-nav-div">Forms</div>
                <div className="sp-nav-div">Contacts</div>
                <hr className='sp-divider'/>

                <div className="sp-nav-div">Form Title</div> */}

            {navOptions.map((o, ix) => {
                return (
                    <div key={ix} onClick={() => { setMode(o) }} className="sp-nav-div">{o}</div>
                )
            })}
        </div>
    );
}