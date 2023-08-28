import { getToken } from './users-service';

export default async function sendRequest(url, method = 'GET', payload = null) {
    const options = { method };
    if (payload) {
        options.headers = { 'Content-Type': 'application/json' };
        options.body = JSON.stringify(payload);
    }
    const token = getToken();
    if (token) {
        options.headers ||= {};
        options.headers.Authorization = `Bearer ${token}`;
    }
    const res = await fetch(url, options);

    // Check if the response status is between 200 and 299 (successful)
    if (res.ok) {
        return res.json(); // Read the JSON once and return it
    } else {
        // If not successful, parse the response JSON for error details
        try {
            const errorData = await res.json();
            throw new Error(errorData.message || 'An error occurred.');
        } catch (error) {
            // If parsing JSON fails, fall back to a generic error message
            throw new Error('An error occurred.');
        }
    }
}