import './CodeBlockPage.css';
import CodeBlock from "../../components/codeBlock/CodeBlock";
import Button from "../../components/Button/Button";
import {useState} from "react";
import {checkCodeBlockSolutionByTitle, saveCodeBlockSolutionByTitle} from "../../services/codeBlocksService";
import CodeEditor from "../../components/codeBlock/CodeEditor";


const CodeBlockPage = (props) => {

    const [solution, setSolution] = useState(props.codeBlock[0].code);


    const checkCodeBlock = async () => {
        const correct = await checkCodeBlockSolutionByTitle(props.codeBlock[0].title, solution);
        if (correct){
            alert('Correct!');
        } else {
            alert('Incorrect!');
        }

    }


    const saveCodeBlock = async () => {
        const saved = await saveCodeBlockSolutionByTitle(props.codeBlock[0].title, solution);
        if (saved){
            alert('Saved!');
        } else {
            alert('Did not save!');
        }

    }



    return (
        <div
            className={'code-block-page'}
        >
            <h1
                className={'code-block-page-header'}
            >{props.codeBlock[0].title}</h1>
            <Button
                buttonType={'back'}
                onClick={()=>{props.setSelectedCodeBlock(null)}}
            >
                Back
            </Button>
            <CodeEditor
                code={solution}
                setSolution={setSolution}
            />
            <Button
                buttonType={'save'}
                onClick={saveCodeBlock}
            >
                Save
            </Button>
            <Button
                buttonType={'check'}
                onClick={checkCodeBlock}
            >
                Check
            </Button>

        </div>
    )
}

export default CodeBlockPage;