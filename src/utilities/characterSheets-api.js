import sendRequest from "./send-request";
const BASE_URL = '/api/sheets';

export async function createTemplate(sessionId, templateData) {
    return sendRequest(`${BASE_URL}/createTemplate/${sessionId}`, 'POST', templateData);
}