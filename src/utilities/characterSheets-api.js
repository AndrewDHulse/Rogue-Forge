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

export async function showCharacterSheetsforUser(userId){
    return sendRequest(`${BASE_URL}/showCharacterSheets/${userId}`, 'GET')
}

export async function getField(templateFieldId){
    return sendRequest(`${BASE_URL}/getField/${templateFieldId}`, 'GET');
}

export async function deleteTemplate(templateId){
    return sendRequest(`${BASE_URL}/deleteTemplate/${templateId}`, 'DELETE');
}

export async function deleteCharacterSheet(characterSheetId){
    return sendRequest(`${BASE_URL}/deleteCharacterSheet/${characterSheetId}`, 'DELETE')
}

export async function updateCharacterSheet(characterSheetId, updatedCharacterSheet) {
    return sendRequest(`${BASE_URL}/editSheet/${characterSheetId}`, 'PUT', updatedCharacterSheet);
}