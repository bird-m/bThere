export const RECEIVE_RESPONSES = 'RECEIVE_RESPONSES';

export function receiveResponses(responses) {
    return {
        type: RECEIVE_RESPONSES,
        responses
    }
}

export function selectResponses(submissionId) {
    return function(state) {
        if (state && state.responses) {
            return Object.values(state.responses).filter((res) => {
                return parseInt(res.submissionId) === parseInt(submissionId);
            })
        } else {
            return [];
        }
    }
}

export function selectResponsesByQuestionId(submissionId) {
    return function(state) {
        if(state && state.responses) {
            
            const keys = Object.keys(state.responses)
            const output = {}

            keys.forEach((k) => {
                const response = state.responses[k];
                if(parseInt(response.submissionId) === parseInt(submissionId)) {
                    output[response.questionId] = response.answer
                }
            })

            return output
        } else {
            return {};
        }
    }
}

export default function responseReducer(state = {}, action) {
    switch(action.type) {
        case RECEIVE_RESPONSES:
            return action.responses;
        default: 
            return state;
    }
}