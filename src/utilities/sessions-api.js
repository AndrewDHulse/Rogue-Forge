import sendRequest from "./send-request";
const BASE_URL = '/api/sessions';

export async function createSession(sessionData){
    return sendRequest(`${BASE_URL}/new`, 'POST', sessionData)
}

export async function getAllSessions(){
    return sendRequest(`${BASE_URL}/index`, 'GET');
}  

export async function getById(id){
    return sendRequest(`${BASE_URL}/details/${id}`);
}

export async function deleteSession(id) {
    return sendRequest(`${BASE_URL}/delete/${id}`, 'DELETE');
}