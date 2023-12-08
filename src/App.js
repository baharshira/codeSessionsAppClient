import './App.css';
import HomePage from "./pages/homePage/HomePage";
import {useEffect, useState} from "react";
import {getCodeBlockByTitle, getCodeBlocksTitles} from "./services/codeBlocksService";
import CodeBlockPage from "./pages/codeBlockPage/CodeBlockPage";

function App() {

    const [titles, setTitles] = useState([]);
    const [selectedCodeBlock, setSelectedCodeBlock] = useState(null);


    const getTitles = async () => {
        try {
            const result = await getCodeBlocksTitles();
            const titles = result.titles.map((obj) => obj.title);
            setTitles(titles);
        } catch (error) {
            console.error('Error fetching titles:', error);
        }
    };

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


    useEffect(() => {
        console.log(`inside use effect`)
        getTitles();
    }, []);

    return (
        <div className={'app'}>
            {!selectedCodeBlock && <HomePage
                titles={titles}
                setSelectedCodeBlock={setSelectedCodeBlock}
                getCodeBlock={getCodeBlock}
            />}
            {selectedCodeBlock &&
                <CodeBlockPage
                    codeBlock={selectedCodeBlock}
                    setSelectedCodeBlock={setSelectedCodeBlock}
                />
            }
        </div>
    );
}

export default App;
