import './AuthModal.css';
import React, {useState, useEffect} from 'react';
import { Modal } from 'react-bootstrap';

function LoginRegisterModal(props) {
    const [show, setShow] = useState(props.openModal);
    const [loginTabSelected, setLoginTabSelected] = useState(props.loginModalShown);
    const [registerTabSelected, setRegisterTabSelected] = useState(props.registerModalShown);
    const [confirmAccountTabSelected, setConfirmAcountTabSelected] = useState(props.confirmAccountModalShown);

    function closeModal() {
        props.onChangeModalState();
    }

    function openLoginModal() {
        props.onSelectLoginModal();
    }

    function openRegisterModal() {
        props.onSelectRegisterModal();
    }

    function openConfirmAccountModal() {
        props.onSelectConfirmAccountModal();
    }

    useEffect(() => {
        setShow(props.openModal);
        setLoginTabSelected(props.loginModalShown);
        setRegisterTabSelected(props.registerModalShown)
        setConfirmAcountTabSelected(props.confirmAccountModalShown);
    }, [props.openModal, props.loginModalShown, props.registerModalShown, props.confirmAccountModalShown]);

    function renderModalFooterBtns() {
        if(loginTabSelected) {
            return (
                <>
                    <button className="modal-link-btn" onClick={closeModal}>Forgot Password</button>
                    <button className="modal-action-btn">Login</button>
                </>
            )
        }

        if(registerTabSelected) {
            return(
                <>
                    <button className="modal-action-btn">Register</button>
                </>
            )
        }

        if(confirmAccountTabSelected) {
            return(
                <>
                    <button className="modal-action-btn">Confirm</button>
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
                        className={`tab-title-btn ${loginTabSelected ? 'selected':'notSelected'}`}
                        onClick={openLoginModal}
                    >
                        <span>Login</span>
                    </button>

                    <button 
                        className={`tab-title-btn ${registerTabSelected ? 'selected':'notSelected'}`}
                        onClick={openRegisterModal}
                    >
                        <span>Register</span>
                    </button>

                    <button 
                        className={`tab-title-btn ${confirmAccountTabSelected ? 'selected':'notSelected'}`}
                        onClick={openConfirmAccountModal}
                    >
                        <span>Confirm Account</span>
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

export default LoginRegisterModal;