import { Link } from "react-router-dom/cjs/react-router-dom.min"
import "./NavBar.css"
import logo from '../../images/logo.png'
import { logout } from "../../store/session"
import { useDispatch, useSelector } from "react-redux"

export default function NavBar (props) {

    const sessionUser = useSelector((state) => (state.session.user));
    const dispatch = useDispatch();
    // console.log(sessionUser, "SU");

    return (
        <div className="nav-wrapper">
            <div className="nav-left">
                <img className="nav-logo" src={logo}/>
                <Link to="#">RSVPify for...</Link>
                <Link to="#">Features</Link>
                <Link to="#">Pricing</Link>
            </div>
            <div className="nav-right">
                <Link to="#">Sales</Link>
                <Link to="#">Support</Link>
                <Link to="#">Blog</Link>
                <Link to="/login">Login</Link>
                <Link to="/login"><button className="nav-button">Create My Event</button></Link>
            </div>
        </div>
    )
}