import './Modal.css'

// OverLay component for displaying an overlay background
const OverLay = (props) => {
    /**
     * Render OverLay
     * @description Renders an overlay background with the provided children.
     * @return an element representing the OverLay.
     */
    return (
        <div className="overlay">
            {props.children}
        </div>
    )
}

export default OverLay;
