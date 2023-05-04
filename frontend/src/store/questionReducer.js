import csrfFetch from "./csrf";

// action constants and methods
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';

export function receiveQuestions (questions) {
    // debugger
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

export const REMOVE_QUESTION = 'REMOVE_QUESTION'

export function removeQuestion(questionId) {
    return {
        type: REMOVE_QUESTION,
        questionId
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

// need to put in the right path
// export function postQuestion() {
//     return async function (dispatch) {
//         const response = await csrfFetch('')
//     }
// }

export function postQuestion(question, questionId = "") {
    return async function (dispatch) {

        let path = '/api/questions';
        let verb = 'POST'

        // debugger;

        if(questionId) {
            path = path + `/${questionId}`;
            verb = 'PATCH';
        }

        const response = await csrfFetch(path,{
            method: verb,
            body: JSON.stringify(question)
        });
        const data = await response.json();
        dispatch(receiveQuestion(data));
        return response;
    }
}

export function deleteQuestion(questionId) {
    return async function (dispatch) {
        let response = await csrfFetch(`/api/questions/${questionId}`,{
            method: 'DELETE'
        });
        // let data = await response.json();
        dispatch(removeQuestion(questionId));
        return response;
    }
}

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
            return action.questions || state;
        case RECEIVE_QUESTION:
            nextState[action.question.id] = action.question;
            return nextState;
        case REMOVE_QUESTION:
            delete nextState[action.questionId];
            return nextState;
        default:
            return state;
    }
}