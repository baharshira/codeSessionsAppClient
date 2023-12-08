import './Button.css';

const Button = (props) => {
    return (
        <button
            className={`${props.buttonType}-button`}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    )
}

export default Button;