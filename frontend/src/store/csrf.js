import { logIt, debug } from "../util/util";

export default async function csrfFetch(url, options={}) {
    options.method ||= 'GET';
    options.headers ||= {};

    if ((options.method).toUpperCase() !== 'GET') {
    
        options.headers['Content-Type'] ||= 'application/json';
        options.headers['X-CSRF-Token'] = sessionStorage.getItem('X-CSRF-Token');
    }

    const response = await fetch(url, options);

    if(response.status >= 400) {
        throw response;
    }

    return response;
}

export async function restoreCSRF() {
    
    const response = await csrfFetch('/api/session');
    
    if(response.ok) {
    
        storeCSRFToken(response)
        return response;
    } else {
        throw response;
    }

    return response;
}

export function storeCSRFToken(response) {
    const csrfToken = response.headers.get('X-CSRF-Token');
    // logIt(csrfToken, "CSRF!");
    if (csrfToken) {
        sessionStorage.setItem('X-CSRF-Token', csrfToken);
    }
}