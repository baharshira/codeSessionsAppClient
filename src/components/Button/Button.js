import './Button.css';

// Button component with dynamic class names and event handling
const Button = (props) => {
    return (
        <button
            // Dynamic class names based on the buttonType prop
            className={`${props.buttonType}-button`}
            // Event handler for click events
            onClick={props.onClick}
        >
            {/* Rendering the content of the button */}
            {props.children}
        </button>
    )
}

export default Button;