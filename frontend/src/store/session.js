import { debug, logIt } from "../util/util";
import csrfFetch from "./csrf";

export const CREATE_SESSION = 'session/CREATE_SESSION';

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

export function login(email, password) {
    return function (dispatch) {

        csrfFetch('/api/session',{
            method: 'POST',
            body: JSON.stringify({email, password})
        }).then ((data) => {
            return data.json();
        }).then((user) => {
            return dispatch(createSession(user));
        })
    }
}

export function deleteSession() {
    return function (dispatch) {
        csrfFetch('/api/session', {
            method: 'DELETE'
        }).then ((response) => {
            return dispatch(deleteSession());
        })
    }
}


export default function sessionReducer (state = {user: null}, action) {
    let nextState = {...state};
    
    switch(action.type) {
        case CREATE_SESSION:
            debugger;
            return action.session;
        case REMOVE_SESSION:
            return {user: null};
        default:
            return state;
    }
}