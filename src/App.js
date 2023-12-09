import './App.css';
import HomePage from "./pages/homePage/HomePage";
import {useEffect, useState} from "react";
import {getCodeBlockByTitle, getCodeBlocksTitles} from "./services/codeBlocksService";
import CodeBlockPage from "./pages/codeBlockPage/CodeBlockPage";

function App() {
    // State variables for managing user mode, code block titles, and selected code block
    const [isStudent, setIsStudent] = useState(true);
    const [titles, setTitles] = useState([]);
    const [selectedCodeBlock, setSelectedCodeBlock] = useState(null);


    /**
     * Change User State
     * @description Toggles the user mode between Student and Mentor.
     */
    const changeUserState = () => {
        setIsStudent(prevState => !prevState);
    }

    /**
     * Get Code Block Titles
     * @description Fetches the list of code block titles from the server.
     */
    const getTitles = async () => {
        try {
            const result = await getCodeBlocksTitles();
            const titles = result.titles.map((obj) => obj.title);
            setTitles(titles);
        } catch (error) {
            console.error('Error fetching titles:', error);
        }
    };


    /**
     * Get Code Block
     * @description Fetches the details of a specific code block by title from the server.
     * @param {string} title - The title of the code block to fetch.
     */
    const getCodeBlock = async (title) => {
        console.log(`inside getCodeBlockBody`)
        try {
            const result = await getCodeBlockByTitle(title)
            console.log(`result of getCodeBlockByTitle:`, result);
            setSelectedCodeBlock(result); // Assuming the server response contains the code block body
        } catch (error) {
            console.error(`Error fetching code block body for ${title}:`, error);
        }
    };

    // useEffect hook to fetch code block titles on component mount
    useEffect(() => {
        console.log(`inside use effect`)
        getTitles();
    }, []);

    // Structure representing the main application
    return (
        <div className={'app'}>
            {!selectedCodeBlock && <HomePage
                titles={titles}
                setSelectedCodeBlock={setSelectedCodeBlock}
                getCodeBlock={getCodeBlock}
                changeUserState={changeUserState}
                userState={isStudent ? 'Student' : 'Mentor'}
            />}
            {selectedCodeBlock &&
                <CodeBlockPage
                    codeBlock={selectedCodeBlock}
                    setSelectedCodeBlock={setSelectedCodeBlock}
                    isStudent={isStudent}
                />
            }
        </div>
    );
}

export default App;