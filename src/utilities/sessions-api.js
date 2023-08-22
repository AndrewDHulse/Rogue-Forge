import sendRequest from "./send-request";
const BASE_URL = '/api/sessions';

export async function createSession(sessionData){
    return sendRequest(`${BASE_URL}/new`, 'POST', sessionData)
}

export async function getAllSessions(){
    return sendRequest(`${BASE_URL}/index`, 'GET');
}  