import { debug, logIt } from "../util/util";
import csrfFetch, { storeCSRFToken } from "./csrf";


// action constants and functions
export const CREATE_SESSION = 'session/CREATE_SESSION';

export const currentUser = 'currentUser';

export function createSession(user) {
    return {
        type: CREATE_SESSION,
        session: user
    }
}

export const REMOVE_SESSION = 'session/REMOVE_SESSION';

export function removeSession() {
    return {
        type: REMOVE_SESSION
    }
}

export const CREATE_SIGNUP = 'CREATE_SIGNUP'

export function createSignup(user) {
    return {
        type: CREATE_SIGNUP
    }
}

// thunk actions

export function login(email, password) {
    return async function (dispatch) {

        const response = await csrfFetch('/api/session',{
            method: 'POST',
            body: JSON.stringify({email, password})
        });

        const data = await response.json();
        storeCurrentUser(data);
        dispatch(createSession(data));
        return response;
    }
}

export function restoreSession() {
    return async function (dispatch) {
        const response = await csrfFetch('/api/session')
        storeCSRFToken(response);
        const data = await response.json();
        //store current user
        console.log(data, "restoration data");
        dispatch(createSession(data));
        return response;
    }
}

export function deleteSession() {
    return async function (dispatch) {
        const response = await csrfFetch('/api/session', {
            method: 'DELETE'
        });
        dispatch(removeSession());
        return response;
    }
}

export function storeCurrentUser(user) {
    if (user) {
        sessionStorage.setItem('currentUser', JSON.stringify(user)); 
    } else {
        sessionStorage.removeItem('currentUser');
    }
}

export function signup (email, password) {
    return async function (dispatch) {
        const response = await csrfFetch('/api/users',{
            method: 'POST',
            body: JSON.stringify({email, password})
        });

        const data = await response.json();
        storeCurrentUser(data);
        dispatch(createSession(data));
        return response;
    }
}

// Reducer

const initialState = JSON.parse(sessionStorage.getItem('currentUser'));

export default function sessionReducer (state = initialState, action) {
    let nextState = {...state};
    console.log("in session reducer");
    switch(action.type) {
        case CREATE_SESSION:
            // debugger;
            return action.session;
        case REMOVE_SESSION:
            return {user: null};
        default:
            return state;
    }
}


// export function restoreSession() {
//     return async function (dispatch) {
//         const response = await csrfFetch('/api/session');
//         console.log("restoring session");
//         storeCSRFToken(response);
//         const user = await response.json();
//         storeCurrentUser(user);
//         dispatch(createSession(user));
//         return response;
//     }
// }

// function storeCurrentUser (user) {
//     if (user) {
//         sessionStorage.setItem('currentUser', JSON.stringify(user));
//     } else {
//         sessionStorage.removeItem('currentUser')
//     }
    
// }