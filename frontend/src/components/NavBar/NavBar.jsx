import { Link, useHistory } from 'react-router-dom';
import "./NavBar.css"
import checkLogo from '../../images/check-logo.png'
import { logout } from "../../store/session"
import { useDispatch, useSelector } from "react-redux"
import bThereLogo from '../../images/bThere-white.png'


export default function NavBar (props) {

    const sessionUser = useSelector((state) => (state.session.user));
    const dispatch = useDispatch();
    const history = useHistory();
    
    function handleClick(e) {
        if(sessionUser) {
            dispatch(logout())
        } else {
            history.push("/login");
        }
    }

    return (
        <div className="nav-wrapper">
            <div className="nav-left">
                <img className="nav-logo" src={checkLogo}/>
                <img className="bthere-nav-logo-text" src={bThereLogo}/>
            </div>
            <div className="nav-mid">
        
            </div>
            <div className="nav-right">
                
                <Link to="#" onClick ={handleClick}>{sessionUser ? "Logout" : "Login"}</Link>
            </div>
        </div>
    )
}