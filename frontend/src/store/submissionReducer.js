// 

import csrfFetch from "./csrf";
import { receiveResponses } from "./responseReducer";

export const RECEIVE_SUBMISSIONS = 'RECEIVE_SUBMISSIONS';

export function receiveSubmissions(submissions) {
    return {
        type: RECEIVE_SUBMISSIONS,
        submissions
    }
}

// selectors

export function selectSubmissions(formId) {
    return function(state) {
        if (state && state.submissions) {
            // debugger
            return Object.values(state.submissions).filter((sub) => {
                return parseInt(sub.formId) === parseInt(formId);
            })
        } else {
            return [];
        }
    }
}

// thunk actions

export function fetchSubmissions(formId) {
    return async function(dispatch) {
        const response = await csrfFetch(`/api/${formId}/submissions`);
        const data = await response.json();
        dispatch(receiveSubmissions(data.submissions));
        dispatch(receiveResponses(data.responses));
        return response;
    }
    
}
// csrfFetch

export default function submissionReducer(state = {}, action) {
    let nextState = {...state};

    switch (action.type) {
        case RECEIVE_SUBMISSIONS:
            // the || accounts for when we attempt to grab submissions but there aren't any there
            return (action.submissions || state);
        default:
            return state;
    }
}