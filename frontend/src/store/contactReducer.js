import csrfFetch from "./csrf";

const RECEIVE_CONTACT = 'RECEIVE_CONTACT';

function receiveContact(contact) {
    return {
        type: RECEIVE_CONTACT,
        contact
    }
}

export const RECEIVE_CONTACTS = 'RECEIVE_CONTACTS';

function receiveContacts(contacts) {
    return {
        type: RECEIVE_CONTACTS,
        contacts
    }
}

export const REMOVE_CONTACT = 'REMOVE_CONTACT';

function removeContact(contactId) {
    return {
        type: REMOVE_CONTACT,
        contactId
    }
}

export function selectContacts(state) {
    if(state && state.contacts) {
        return Object.values(state.contacts)
    } else {
        return [];
    }
}

export function postContact(contact) {
    return async function (dispatch) {
        const response = await csrfFetch('/api/contacts', {
            method: 'POST',
            body: JSON.stringify(contact)
        });
        const data = await response.json();
        dispatch(receiveContact(data));
        return response;
    }
}

export function deleteContact(contactId) {
    return async function(dispatch) {
        const response = await csrfFetch(`/api/contacts/${contactId}`,{
            method: 'DELETE'
        })
        dispatch(removeContact(contactId));
        return response;
    }
}

export function fetchContacts() {
    return async function(dispatch) {
        const response = await csrfFetch('/api/contacts');
        const data = await response.json();
        return dispatch(receiveContacts(data));
    }
}

export default function contactReducer(state = {}, action) {
    let nextState = {...state}

    switch (action.type) {
        case RECEIVE_CONTACTS:
            return action.contacts;
        case RECEIVE_CONTACT:
            // debugger;
            nextState[action.contact.id] = action.contact;
            return nextState;
        case REMOVE_CONTACT:
            delete nextState[action.contactId];
            return nextState;
        default:
            return state;
    }
}