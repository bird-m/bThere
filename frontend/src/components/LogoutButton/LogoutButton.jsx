import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import { Redirect } from 'react-router-dom';


export default function LogoutButton () {
    const sessionUser = useSelector((state) => (state.session.user));
    const dispatch = useDispatch();

    function handleClick(e) {
        dispatch(logout())
        return (<Redirect to="/" />)
    }
    
    if(sessionUser) {
        return <button onClick={handleClick}>Logout</button>
    } else {
        return null
    }
}