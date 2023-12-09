import {sendRequest} from "./httpClient";


const urls = {
    getCodeBlocksTitles: 'https://code-session-app-server.onrender.com/api/codeBlocks/titles',
    getCodeBlockByTitle: `https://code-session-app-server.onrender.com/api/codeBlocks/`,
    checkCodeBlockSolutionByTitle: 'https://code-session-app-server.onrender.com/api/codeBlocks/check/',
    saveCodeBlockSolutionByTitle: 'https://code-session-app-server.onrender.com/api/codeBlocks/save/'

}

/**
 * Get Code Blocks Titles
 * @description Fetches code block titles from the Code Blocks API.
 * @returns {Promise<Array<string>|undefined>} A promise that resolves to an array of code block titles or undefined in case of an error.
 */

export const getCodeBlocksTitles = async () => {
    const response = await sendRequest({
        url: urls.getCodeBlocksTitles,
        method: 'get'
    });
    if (response.status === 200){
        return response.result;
    } else {
        console.error('Error fetching titles:', response.result);
    }
}

/**
 * Get Code Block By Title
 * @description Fetches a specific code block by title from the Code Blocks API.
 * @param {string} title - The title of the code block to fetch.
 * @returns {Promise<Object|undefined>} A promise that resolves to the code block object or undefined in case of an error.
 */

export const getCodeBlockByTitle = async (title) => {
    const response = await sendRequest({
        url: urls.getCodeBlockByTitle + title,
        method: 'get'
    });
    if (response.status === 200){
        return response.result.codeBlock;
    } else {
        console.error(`Error fetching code block body for ${title}:`, response.result);
    }
}

/**
 * Check Code Block Solution By Title
 * @description Sends a solution for a specific code block to the Code Blocks API for validation.
 * @param {string} title - The title of the code block.
 * @param {string} solution - The solution to be checked.
 * @returns {Promise<boolean|undefined>} A promise that resolves to true if the solution is correct, false otherwise, or undefined in case of an error.
 */

export const checkCodeBlockSolutionByTitle = async (title, solution) => {
    const response = await sendRequest({
        url: urls.checkCodeBlockSolutionByTitle + title,
        method: 'post',
        body: {
            solution
        }
    });
    if (response.status === 200){
        return true;
    } else {
        console.error(`Error checking solution for ${title}:`, response.result);
        return false;
    }
}

/**
 * Save Code Block Solution By Title
 * @description Saves a solution for a specific code block to the Code Blocks API.
 * @param {string} title - The title of the code block.
 * @param {string} solution - The solution to be saved.
 * @returns {Promise<boolean|undefined>} A promise that resolves to true if the solution is saved successfully, false otherwise, or undefined in case of an error.
 */

export const saveCodeBlockSolutionByTitle = async (title, solution) => {
    const response = await sendRequest({
        url: urls.saveCodeBlockSolutionByTitle + title,
        method: 'post',
        body: {
            solution
        }
    });
    if (response.status === 200){
        return response.result;
    } else {
        console.error(`Error saving solution for ${title}:`, response.result);
    }
}

