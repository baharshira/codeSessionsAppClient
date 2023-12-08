import axios from 'axios'

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
