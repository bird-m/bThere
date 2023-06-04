import csrfFetch from "./csrf";
import { REMOVE_SESSION } from "./session";

// action constants and methods
export const RECEIVE_FORMS = 'RECEIVE_FORMS';
export const RECEIVE_FORM = 'RECEIVE_FORM'
export const REMOVE_FORM = 'REMOVE_FORM'

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

export function removeForm(formId) {
    return {
        type: REMOVE_FORM,
        formId
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

export function selectForm(formId) {

    return function(state) {
        // debugger
        if(state && state.forms && state.forms[formId]) {
            return state.forms[formId];
        } else {
            return null;
        }
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

export function postForm(form, formId = "") {
    return async function(dispatch) {

        let path = '/api/forms'
        let verb = 'POST'
        let formPackage = form;
        
        if(formId) {
            path = path + `/${formId}`;
            verb = 'PATCH';
        }

        if (!(form instanceof FormData)) {
            formPackage = JSON.stringify(form);
        }

        // debugger;
        const response = await csrfFetch(path, {
            method: verb,
            body: formPackage
        })
        const data = await response.json();
        dispatch(receiveForm(data));
        if (response.ok) {
            return data;
        } else {
            return response;
        }
        
    }
}

export function deleteForm(formId) {
    return async function (dispatch) {
        const response = await csrfFetch(`/api/forms/${formId}`, {
            method: 'DELETE'
        })
        dispatch(removeForm(formId));
        return response;
    }
}

export function fetchForm(formId) {
    return async function (dispatch) {
        const response = await csrfFetch(`/api/forms/${formId}`)
        const data = await response.json()
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
        case REMOVE_FORM:
            delete nextState[action.formId]
            return nextState;
        case REMOVE_SESSION:
            return {};
        default:
            return state;
    }
}