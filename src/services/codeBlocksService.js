import {sendRequest} from "./httpClient";


const urls = {
    // getCodeBlocksTitles: 'http://localhost:3001/api/codeBlocks/titles',
    // getCodeBlockByTitle: `http://localhost:3001/api/codeBlocks/`,
    // checkCodeBlockSolutionByTitle: 'http://localhost:3001/api/codeBlocks/check/',
    // saveCodeBlockSolutionByTitle: 'http://localhost:3001/api/codeBlocks/save/'
    getCodeBlocksTitles: 'https://code-session-app-server.onrender.com/api/codeBlocks/titles',
    getCodeBlockByTitle: `https://code-session-app-server.onrender.com/api/codeBlocks/`,
    checkCodeBlockSolutionByTitle: 'https://code-session-app-server.onrender.com/api/codeBlocks/check/',
    saveCodeBlockSolutionByTitle: 'https://code-session-app-server.onrender.com/api/codeBlocks/save/'

}


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

