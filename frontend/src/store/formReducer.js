import csrfFetch from "./csrf";

// action constants and methods
export const RECEIVE_FORMS = 'RECEIVE_FORMS';
export const RECEIVE_FORM = 'RECEIVE_FORM'

export function receiveForms(forms) {
    return {
        type: RECEIVE_FORMS,
        forms
    }
}

export function receiveForm(form) {
    return {
        type: RECEIVE_FORM,
        form
    }
}

//selector

export function selectAllForms (state) {
    if(state && state.forms) {
        return Object.values(state.forms)
    } else {
        return ["loading"];
    }
}

// thunk actions

export function fetchForms() {
    return async function(dispatch) {
        const response = await csrfFetch('/api/forms');
        const data = await response.json();
        dispatch(receiveForms(data));
        return response;
    }
}

export function postForm(form) {
    return async function(dispatch) {
        const response = await csrfFetch('api/forms', {
            method: 'POST',
            body: JSON.stringify(form)
        })
        const data = await response.json();
        dispatch(receiveForm(data));
        return response;
    }
}

export default function formReducer(state = {}, action) {
    let nextState = {...state}
    
    switch(action.type) {
        case RECEIVE_FORMS:
            return action.forms;
        case RECEIVE_FORM:
            nextState[action.form.id] = action.form;
            return nextState;
        default:
            return state;
    }
}