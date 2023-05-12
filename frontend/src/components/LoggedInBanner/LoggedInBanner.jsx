import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import checkLogo from '../../images/check-logo.png'
import './LoggedInBanner.css'
import { useDispatch, useSelector } from "react-redux";
import { loggedInUser, logout } from "../../store/session";

export function LoggedInBanner (props) {

    const sessionUser = useSelector(loggedInUser);
    const dispatch = useDispatch();
    const history = useHistory();

    function handleClick(e) {
        dispatch(logout())
        history.push("/")
    }
    
    return (
        <div className="logged-in-banner-wrapper">
            <Link to="/">
                <img src={checkLogo}/>
            </Link>
            <div className="ban-email">
                
                {sessionUser.email}
                <span className="banner-logout">
                <Link to="#" onClick={(e) => {handleClick(e)}} >Log Out</Link></span>
            </div>
        </div>
    )
}

{/* <div className="form-nav form-page-nav">
                <Link to="/">
                    <img src={checkLogo} className="fp-logo"/>
                </Link>
                <div className="fp-account">{sessionUser.email}</div>
            </div> */}