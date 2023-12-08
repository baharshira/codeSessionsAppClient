import './CodeBlockButton.css';

const CodeBlockButton = (props) => {


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