import sendRequest from "./send-request";
const BASE_URL = '/api/sheets';

export async function createTemplate(sessionId, templateData) {
    return sendRequest(`${BASE_URL}/createTemplate/${sessionId}`, 'POST', templateData);
}


export async function createCharacterSheet(templateId, formData){
    return sendRequest(`${BASE_URL}/createSheet/${templateId}`, 'POST', formData )
}

export async function showTemplate(templateId){
    return sendRequest(`${BASE_URL}/showTemplate/${templateId}`, 'GET')

}

export async function showTemplatesForSession(sessionId) {
    return sendRequest(`${BASE_URL}/showTemplatesForSession/${sessionId}`, 'GET')
}