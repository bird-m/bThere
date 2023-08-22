import { useDispatch, useSelector } from 'react-redux';
import './AuthFormPage.css'
import { useEffect, useState } from 'react';
import { isValidEmail, logIt } from '../../util/util'
import { loggedInUser, login, signup } from '../../store/session';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png'
import checkLogo from '../../images/check-logo.png'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Modal from '../Modal/Modal';
import ErrorPane from '../ErrorPane/ErrorPane';

export default function AuthFormPage(props) {

    const { mode } = props;
    const sessionUser = useSelector(loggedInUser);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [emailEntry, setEmailEntry] = useState(true);

    const dispatch = useDispatch();

    if (sessionUser) return <Redirect to="/forms" />;

    function handleSubmit(e) {
        setErrors([]);
        // e.preventDefault(); 
        // console.log(mode, "MODE!");
        if (!e) {
            // console.log("fake login");
            dispatch(login('demo@user.io', 'password'));
        }
        else if (mode === 'login') {
            e.preventDefault();
            // console.log("attempting login");
            dispatch(login(email, password)).catch(errorHandle)
            // .catch((res) => res.json()).then((data) => {console.log(data)});
        } else if (mode === 'signup') {
            e.preventDefault();
            // console.log("attempting signup");
            dispatch(signup(email, password)).catch(errorHandle);
        }

    }

    function errorHandle(res) {
        res.json().then(data => {
            setErrors(data.errors);
            setShowErrorModal(true);
        })
    }

    function toggleEntry(e) {
        setEmailEntry((prev) => !prev)
    }

    return (
        <div className="wrapper">
            {showErrorModal && <Modal closeModal={() => { setShowErrorModal(false) }} content={<ErrorPane errors={errors} closeModal={() => { setShowErrorModal(false) }} />} />}
            <div className='auth-body'>
                <div className="auth-pane">
                    <div className="auth-header">
                        <Link className="auth-header" to="/"><img className='logo' src={checkLogo} /></Link>
                        <span className='cta'>
                            {mode === "login" ? "Sign in to your account" : "Sign up to create your event."}
                        </span> <br />
                        {mode === "login" ? <a href='/signup'>Or sign up here</a> : ""}
                    </div>
                    <div className="auth-form">
                        <form onSubmit={handleSubmit} >
                            <div className="form-fields">
                                <span className='auth-element'>
                                    {mode === "login" ? "Login" : "Sign up"} with...
                                    <br/><br/>
                                    <div className="toggle-div" onClick={toggleEntry}>
                                    <div id='emailToggle' className={`toggle-option ${emailEntry && 'toggled'}`}>
                                            Email & Password</div>
                                        <div id='smsToggle' className={`toggle-option ${!emailEntry && 'toggled'}`}>SMS</div>
                                    </div>
                                </span>
                                <span className='auth-element'>
                                    <label htmlFor='email'>EMAIL ADDRESS</label>
                                    <input type='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                                </span>
                                <span className='auth-element'>
                                    <label htmlFor='password'>PASSWORD</label>
                                    <input type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                                </span>
                                <span className='auth-element'>
                                    <button className='auth-button'>{mode === "login" ? "SIGN IN" : "SIGN UP"}</button>
                                </span>
                            </div>
                        </form>
                        <span className='auth-element'>
                            <button className='auth-button' onClick={() => (handleSubmit(false))}>DEMO USER {mode === "login" ? "SIGN IN" : "SIGN UP"}</button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}