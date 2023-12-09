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
        const {method, url, body} = params;
        let result;
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
        console.log(`result of url: ${url} is`, JSON.stringify(result))
        return {
            result: result.data,
            status: result.status
        };
    } catch (error) {
        console.error(`Error sending request \n${error.stack}`)
        console.log(`error.response is: ${JSON.stringify(error.response)}`)
        return error.response;
    }

}
