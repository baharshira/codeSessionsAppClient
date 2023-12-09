import './CodeBlockPage.css';
import CodeBlock from "../../components/codeBlock/CodeBlock";
import Button from "../../components/Button/Button";
import {useState} from "react";
import {checkCodeBlockSolutionByTitle, saveCodeBlockSolutionByTitle} from "../../services/codeBlocksService";
import CodeEditor from "../../components/codeBlock/CodeEditor";
import Modal from "../../components/Modal/Modal";

/**
 * Code Block Page Component
 * @description A React component representing a page for a specific code block.
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.codeBlock - An array containing details of the code block to be displayed.
 * @param {boolean} props.isStudent - A boolean indicating whether the user is a student.
 * @param {Function} props.setSelectedCodeBlock - A function to set the selected code block to null.
 * @returns The element representing the Code Block Page.
 */
const CodeBlockPage = (props) => {
    // State for managing the solution, modal state, and solution correctness
    const [solution, setSolution] = useState(props.codeBlock[0].code);
    const [modalOpen, setModalOpen] = useState(false);
    const [solutionCorrect, setSolutionCorrect] = useState(false);

    /**
     * Check Code Block
     * @description Validates the current solution for the code block and displays correctness feedback in a modal.
     * @returns {void}
     */
    const checkCodeBlock = async () => {
        const correct = await checkCodeBlockSolutionByTitle(props.codeBlock[0].title, solution);
        setModalOpen(true)
        setSolutionCorrect(correct);
    }

    /**
     * Save Code Block
     * @description Saves the current solution for the code block and provides a confirmation or error alert.
     * @returns {void}
     */
    const saveCodeBlock = async () => {
        const saved = await saveCodeBlockSolutionByTitle(props.codeBlock[0].title, solution);
        if (saved){
            alert('Saved!');
        } else {
            alert('Did not save!');
        }

    }

    // Structure representing the Code Block Page
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
                isStudent={props.isStudent}
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
            {modalOpen && <Modal
                closeModal={()=>{setModalOpen(false)}}
                title={solutionCorrect ? 'Correct!' : 'Incorrect!'}
            >
                <div className={'modal-emoji'}>
                    {solutionCorrect ? <span>🥳</span> : <span>😟</span>}
                </div>
            </Modal>
            }

        </div>
    )
}

export default CodeBlockPage;