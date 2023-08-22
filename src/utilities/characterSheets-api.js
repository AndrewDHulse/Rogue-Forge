import sendRequest from "./send-request";
const BASE_URL = '/api/sheets';

export async function createTemplate(templateData){
    return sendRequest(`${BASE_URL}/createTemplate`, 'POST', templateData)
}