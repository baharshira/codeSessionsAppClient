import './Modal.css'

const OverLay = (props) => {
    return (
        <div className="overlay">
            {props.children}
        </div>
    )
}

export default OverLay;