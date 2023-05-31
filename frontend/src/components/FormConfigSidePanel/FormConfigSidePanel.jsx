import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './FormConfigSidePanel.css'
import checkLogo from '../../images/check-logo.png'

export default function FormConfigSidePanel({navOptions }) {

    const history = useHistory();

    console.log(navOptions, "navOptions");

    return (
        <div className="form-config-panel-wrapper">
            <div className="banner-img-wrapper">
            <Link to="/">
                <img className='banner-img' src={checkLogo} />
            </Link>
            </div>

            {Object.entries(navOptions).map(([viewableLink, path]) => {
                return (
                    <div key={viewableLink} onClick={() => { history.push(path) }} className="sp-nav-div">{viewableLink}</div>
                )
            })}
        </div>
    );
}