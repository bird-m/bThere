import { useDispatch, useSelector } from 'react-redux';
import './LoginFormPage.css'
import { useEffect, useState } from 'react';
import {isValidEmail, logIt} from '../../util/util'
import { login } from '../../store/session';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

export default function LoginFormPage (props) {

    const sessionUser = useSelector((state) => (state.session.user))

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();

    if(sessionUser) {
        return <Redirect to="/"/>;
    }


    

    function handleSubmit (e) {
        e.preventDefault();
        
        let validEmail = isValidEmail(email);
        let validPassword = password.length >= 7;
        setErrors([]);
        
        if (validEmail && validPassword) {
            dispatch(login(email, password));
        } else if (!validEmail && !validPassword) {
            console.log("seconds");
            setErrors(['Please retry with a valid email and a password longer than 6 characters.']);
        } else if (!validEmail) {
            setErrors(['Please retry with a valid email.'])
        } else if(!validPassword) {
            setErrors(['Please retry with a password longer than 7 characters.']);
        }
    }

    // function serverLogin() {
    //     return dispatch(login(email, password))
    //         .catch(async (res) => {
    //             let data;
    //             try {
    //                 data = await res.clone().json();
    //             } catch {
    //                 data = await res.text()
    //             }

    //             if(data?.errors) setErrors(data.errors);
    //             else if (data) setErrors([data]);
    //             else setErrors([res.statusText]);
    //         });
    // }
    
    return (
        <>
            <div className='login-modal'>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='email'>Email:</label>
                    <input type='text' id='email' value={email} onChange={(e)=> setEmail(e.target.value)}/>
                    <label htmlFor='password'>Password:</label>
                    <input type='password' id='password' value={password} onChange={(e)=> setPassword(e.target.value)}/>
                    <input type='submit' value='Login'/>
                </form>
                <ul>
                    {errors.map((error) => (<li key={error}>{error}</li>))}
                </ul>
            </div>
        </>
    );
}