import './Modal.css'
import OverLay from "./OverLay";


const Modal = (props) => {
    /**
     * Render Modal
     * @description Renders a modal dialog with a title, body, and close button.
     * @param {string} props.title - The title of the modal.
     * @param {Function} props.closeModal - The function to be called when the modal is closed.
     * @returns The element representing the Modal.
     */
    return (
        <OverLay>
            <div className={'modal'}>
                <div className={'modal-header'}>
                    <div className={'modal-title'}>
                        {props.title}
                    </div>
                    <button
                        onClick={props.closeModal}
                        className={'close-modal-button'}>
                        X
                    </button>
                </div>
                <div className={'modal-body'}>
                    {props.children}
                </div>
            </div>
        </OverLay>
    )
}

export default Modal;