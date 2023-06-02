import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import './LoggedInBanner.css'
import { useDispatch, useSelector } from "react-redux";
import { loggedInUser, logout } from "../../store/session";
import checkLogo from '../../images/check-logo.png'

export function LoggedInBanner ({setTab}) {

    const sessionUser = useSelector(loggedInUser);
    const dispatch = useDispatch();
    const history = useHistory();

    function handleClick(e) {
        dispatch(logout())
        history.push("/")
    }
    
    return (
        <div className="logged-in-banner-wrapper">
            <div className="li-banner-nav">
                <div className="li-banner-nav-icon"> <img src={checkLogo}/></div>

                <div className="li-banner-nav-option" onClick={() => {history.push("/forms")}}> <div>Home</div></div>
                <div className="li-banner-nav-option" onClick={() => {history.push("/address-book")}}><div>Address Book</div></div>
            </div>
            <div className="ban-email">
                
                {sessionUser.email}
                <span className="banner-logout">
                <Link to="#" onClick={(e) => {handleClick(e)}} >Log Out</Link></span>
            </div>
        </div>
    )
}