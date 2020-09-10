import './AuthModal.css';
import React, {useState, useEffect} from 'react';
import { Modal } from 'react-bootstrap';

function ForgotResetPwdModal(props) {
    const [show, setShow] = useState(props.openModal);
    const [forgotPwdTabSelected, setForgotPwdTabSelected] = useState(props.forgotPwdModalShown);
    const [resetPwdTabSelected, setResetPwdTabSelected] = useState(props.resetPwdModalShown);

    function closeModal() {
        props.onChangeModalState();
    }

    function openForgotPwdModal() {
        props.onSelectForgotPwdModal();
    }

    function openResetPwdModal() {
        props.onSelectResetPwdModal();
    }

    function openLoginRegisterModal() {
        props.onOpenLoginRegisterModal();
    }

    useEffect(() => {
        setShow(props.openModal);
        setForgotPwdTabSelected(props.forgotPwdModalShown);
        setResetPwdTabSelected(props.resetPwdModalShown);
    }, [props.openModal, props.forgotPwdModalShown, props.resetPwdModalShown]);

    //Authentication Events (Login, Register, Confirm Account)
    function handleForgotPwd() {
        console.log("Forgot Password Event");
    }

    function handleResetPwd() {
        console.log("Reset Password Event");
    }

    function renderModalFooterBtns() {
        if(forgotPwdTabSelected) {
            return (
                <>
                    <button className="modal-link-btn" onClick={openLoginRegisterModal}>Back</button>
                    <button className="modal-action-btn" onClick={handleForgotPwd}>Submit</button>
                </>
            )
        }

        if(resetPwdTabSelected) {
            return (
                <>
                    <button className="modal-action-btn" onClick={handleResetPwd}>Reset</button>
                </>
            )
        }

        return null;
    }

    return (
        <>
            <Modal show={show} onHide={closeModal}>
                <Modal.Header closeButton className="auth-modal-header">
                    <button 
                        className={`tab-title-btn ${forgotPwdTabSelected ? 'selected':'notSelected'}`}
                        onClick={openForgotPwdModal}
                    >
                        <span>Forgot Password</span>
                    </button>

                    <button 
                        className={`tab-title-btn ${resetPwdTabSelected ? 'selected':'notSelected'}`}
                        onClick={openResetPwdModal}
                    >
                        <span>Reset Password</span>
                    </button>
                </Modal.Header>

                <Modal.Body>
                    Input Fields
                </Modal.Body>

                <Modal.Footer>
                    {renderModalFooterBtns()}
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ForgotResetPwdModal;