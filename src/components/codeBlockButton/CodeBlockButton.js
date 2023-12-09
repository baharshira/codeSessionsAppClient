import './CodeBlockButton.css';

// CodeBlockButton component for displaying a button associated with a code block
const CodeBlockButton = (props) => {
    /**
     * Render CodeBlockButton
     * @description Renders a button with the specified title and handles the onClick event.
     * @param {string} props.title - The title of the code block associated with the button.
     * @param {Function} props.onClick - The function to be called when the button is clicked, passing the title as a parameter.
     * @returns The element representing the CodeBlockButton.
     */
    return (
        <button
            className={'code-block-button'}
            onClick={()=>{props.onClick(props.title)}}
        >
            {props.title}
        </button>
    )
}


export default CodeBlockButton;