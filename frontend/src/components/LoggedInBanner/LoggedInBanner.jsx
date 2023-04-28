import { Link } from "react-router-dom/cjs/react-router-dom.min";
import checkLogo from '../../images/check-logo.png'
import './LoggedInBanner.css'
import { useSelector } from "react-redux";
import { loggedInUser } from "../../store/session";

export function LoggedInBanner (props) {

    const sessionUser = useSelector(loggedInUser);
    
    return (
        <div className="logged-in-banner-wrapper">
            <Link to="/">
                <img src={checkLogo}/>
            </Link>
            <div>{sessionUser.email}</div>
        </div>
    )
}

{/* <div className="form-nav form-page-nav">
                <Link to="/">
                    <img src={checkLogo} className="fp-logo"/>
                </Link>
                <div className="fp-account">{sessionUser.email}</div>
            </div> */}