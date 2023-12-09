import axios from 'axios'

/**
 * Send Request
 * @description Sends an HTTP request based on the provided parameters.
 * @param {Object} params - The parameters for the HTTP request.
 * @param {string} params.method - The HTTP method (e.g., 'get', 'post').
 * @param {string} params.url - The URL for the HTTP request.
 * @param {Object} [params.body] - The request body (optional, applicable for 'post' method).
 * @returns {Promise<Object>} A promise that resolves to an object containing the result and status of the HTTP request.
 */

export const sendRequest = async (params) => {
    try {
        // set the params object
        const {method, url, body} = params;

        // Variable to store the result of the HTTP request
        let result;

        // Switch statement to handle different HTTP methods
        switch (method) {
            case 'post':
                result = await axios.post(url, body)
                break;
            case 'get':
                result = await axios.get(url);
                break;
            default:
                throw new Error('not allowed http method');

        }
        // Logging the result of the HTTP request
        console.log(`result of url: ${url} is`, JSON.stringify(result))

        // Returning an object containing the result and status
        return {
            result: result.data,
            status: result.status
        };

    } catch (error) {
        // Handling errors and logging details
        console.error(`Error sending request \n${error.stack}`)
        console.log(`error.response is: ${JSON.stringify(error.response)}`)

        // Returning the error response
        return error.response;
    }

}
