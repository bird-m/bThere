import { Link, useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import './FormConfigSidePanel.css'
import checkLogo from '../../images/check-logo.png'

export default function FormConfigSidePanel({ navOptions, form }) {

    const history = useHistory();

    const location = useLocation();

    console.log(location.pathname, "pathname");

    function assignNavClass(pathname) {
        if(pathname === location.pathname) {
            return "sp-nav-div sp-nav-div-selected"
        } else {
            return "sp-nav-div"
        }
    }

    return (
        <div className="form-config-panel-wrapper">
            <div className="banner-img-wrapper">
                <Link to="/">
                    <img className='banner-img' src={checkLogo} />
                </Link>
            </div>

            {form?.title && <div className="sp-nav-div sp-form-title">
                {form.title}
            </div>}
                
            {form?.title && <hr className='sp-divider' />}


            {form && Object.entries(navOptions).map(([viewableLink, path]) => {
                return (
                    <div key={viewableLink} onClick={() => { history.push(path) }} className={assignNavClass(path)}>{viewableLink}</div>
                )
            })}
        </div>
    );
}