import csrfFetch from "./csrf";

// action constants and methods
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';

export function receiveQuestions (questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

export const RECEIVE_QUESTION = 'RECEIVE_QUESTION';

export function receiveQuestion(question) {
    return {
        type: RECEIVE_QUESTION,
        question
    }
}

//selector

export function selectQuestion(questionId) {
    return function(state) {
        if(state && state.questions && state.questions[questionId]) {
            return state.questions[questionId];
        } else {
            return null;
        }
    }
}

export function selectQuestions(formId) {
    return function (state) {
        if (state && state.questions) {
            // debugger;
            return Object.values(state.questions).filter((q) => {
                return q.formId === parseInt(formId);
            })
        } else {
            return [];
        }
    }
}

// export function selectFormQuestions(formId) {
//     if (state && state.questions && state.questions[formId]) {
//         return Object.values
//     }
// }

// thunk actions

export function fetchQuestions(formId) {
    return async function(dispatch) {
        const response = await csrfFetch(`/api/${formId}/questions`);
        const data = await response.json()
        dispatch(receiveQuestions(data));
        return response;
    }
}

export function fetchQuestion(questionId) {
    return async function(dispatch) {
        const response = await csrfFetch(`/api/questions/${questionId}`)
        const data = await response.json();
        dispatch(receiveQuestion(data));
        return response;
    }
}

export default function questionReducer(state = {}, action) {
    let nextState = {...state};

    switch(action.type) {

        case RECEIVE_QUESTIONS:
            return action.questions;
        case RECEIVE_QUESTION:
            nextState[action.question.id] = action.question;
            return nextState;
        default:
            return state;
    }
}