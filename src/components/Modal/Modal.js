import './Modal.css'
import OverLay from "./OverLay";


const Modal = (props) => {
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