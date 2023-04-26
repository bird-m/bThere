import csrfFetch from "./csrf";

// action constants and methods
export const RECEIVE_FORMS = 'RECEIVE_FORMS';

export function receiveForms(forms) {
    return {
        type: RECEIVE_FORMS,
        forms
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
        dispatch(receiveForms(data))
        return response;
    }
}

export default function formReducer(state = {}, action) {
    // debugger
    switch(action.type) {
        case RECEIVE_FORMS:
            return action.forms;
        default:
            return state;
    }
}