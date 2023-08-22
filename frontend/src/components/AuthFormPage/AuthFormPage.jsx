import { useDispatch, useSelector } from 'react-redux';
import './AuthFormPage.css'
import { useEffect, useState } from 'react';
import { isValidEmail, logIt } from '../../util/util'
import { loggedInUser, login, sendOtp, signup, verifyOtp } from '../../store/session';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png'
import checkLogo from '../../images/check-logo.png'
import PhoneInput from 'react-phone-number-input/input';
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
    const [phone, setPhone] = useState('');
    const [lastSubmittedPhone, setLastSubmittedPhone] = useState(false);
    const [code, setCode] = useState("");

    const dispatch = useDispatch();

    if (sessionUser) return <Redirect to="/forms" />;

    function handleSubmit(e) {
        setErrors([]);
        // e.preventDefault(); 
        // console.log(mode, "MODE!");
        if (!e) {
            // console.log("fake login");
            dispatch(login('demo@user.io', 'password'));
            return;
        } else {
            e.preventDefault();
        }

        if (!emailEntry && lastSubmittedPhone) {
            debugger;
            dispatch(verifyOtp(lastSubmittedPhone, code))
        }
        else if (!emailEntry) {
            // debugger;
            dispatch(sendOtp(phone))
                .then(getSubmittedPhone)
                .catch(errorHandle);
        }
        else if (mode === 'login') {
            // console.log("attempting login");
            dispatch(login(email, password)).catch(errorHandle)
            // .catch((res) => res.json()).then((data) => {console.log(data)});
        } else if (mode === 'signup') {
            // console.log("attempting signup");
            dispatch(signup(email, password, phone)).catch(errorHandle);
        }

    }

    function getSubmittedPhone(res) {
        res.json().then(data => {
            console.log(data, 'DATA!')
            setLastSubmittedPhone(data['phone']);
        })
    }

    function errorHandle(res) {
        res.json().then(data => {
            setErrors(data.errors);
            setShowErrorModal(true);
        })
    }

    function toggleEntry(e) {
        setEmailEntry((prev) => {
            const toEmail = !prev;

            if(toEmail) {
                setLastSubmittedPhone(false);
                setPhone('');
            }

            return toEmail;
        })
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
                                    <br /><br />
                                    <div className="toggle-div" onClick={toggleEntry}>
                                        <div id='emailToggle' className={`toggle-option ${emailEntry && 'toggled'}`}>
                                            Email & Password</div>
                                        <div id='smsToggle' className={`toggle-option ${!emailEntry && 'toggled'}`}>SMS</div>
                                    </div>
                                </span>
                                {emailEntry && <span>
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
                                </span>}
                                {!emailEntry && <span>
                                    <span className='auth-element'>
                                        <label htmlFor='phone'>US PHONE NUMBER</label>

                                        <PhoneInput
                                            id="phone"
                                            value={phone}
                                            onChange={setPhone}
                                            defaultCountry="US"
                                            countries={['US']} // Only allow the United States
                                            placeholder="enter US phone number"
                                        />
                                    </span>
                                    {lastSubmittedPhone &&
                                        <span className='auth-element'>
                                            <label htmlFor="otp">ENTER CODE:</label>

                                            <input required type="text" id="otp" name="otp" placeholder="e.g., 123456" value={code} onChange={(e) => {setCode(e.target.value)}}/>
                                        </span>
                                    }
                                    <span className='auth-element'>
                                        <button className='auth-button'>{mode === "login" ? "SIGN IN" : "SIGN UP"}</button>
                                    </span>
                                </span>


                                }
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