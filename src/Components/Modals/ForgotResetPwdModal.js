import './AuthModal.css';
import React, {useState, useEffect} from 'react';
import { Modal } from 'react-bootstrap';
import InputField from '../InputFields/InputField';

function ForgotResetPwdModal(props) {
    //modal related states
    const [show, setShow] = useState(props.openModal);
    const [forgotPwdTabSelected, setForgotPwdTabSelected] = useState(props.forgotPwdModalShown);
    const [resetPwdTabSelected, setResetPwdTabSelected] = useState(props.resetPwdModalShown);

    //Handle Modal Events 
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

    //Handle Input Data
    const [data, setData] = React.useState({});

    //generate react refs for input fields based on tab selected
    function generateReactRefs() {
        if(forgotPwdTabSelected) {
            return [React.createRef()];
        }

        return [React.createRef(), React.createRef(), React.createRef(), React.createRef()];
    }

    //inputref needed for each input to reference it
    const inputRefs = React.useRef(generateReactRefs());

    //update data hook with input data
    const handleChange = (name, value) => {
        setData(prevData => ({...prevData, [name]: value}));
    }

    //submit form event, checks to see if form has errors
    const submitForm = (e) => {
        e.preventDefault();

        //check to see if there are errors (input validation)
        let isValid = true;

        for(let i = 0; i < inputRefs.current.length; i++) {
            if(inputRefs.current[i].current === null) { break; }
            const valid = inputRefs.current[i].current.validate();
            if(!valid) {
                isValid = false;
            }
        }

        if(!isValid) {
            return;
        }

        //if no errors => do actions on form submit based on what modal is active (Login, Register, Confirm)
        if(forgotPwdTabSelected) {
            console.log("Forgot password Action");
        }

        if(resetPwdTabSelected) {
            console.log("Reset Password Action");
        }
        console.log(data);
    }

    //renders footer buttons that connect modals and do auth actions
    function renderModalFooterBtns() {
        if(forgotPwdTabSelected) {
            return (
                <>
                    <button className="modal-link-btn" type="button" onClick={openLoginRegisterModal}>Back</button>
                    <button className="modal-action-btn" type="submit">Submit</button>
                </>
            )
        }

        if(resetPwdTabSelected) {
            return (
                <>
                    <button className="modal-action-btn" type="submit">Reset</button>
                </>
            )
        }

        return null;
    }

    //renders input fields based on modal selected
    function renderInputFields() {
        if(forgotPwdTabSelected) {
            return (
                <>
                    <InputField 
                        ref={inputRefs.current[0]}
                        name="username"
                        label="Enter Username"
                        onChange={handleChange}
                        validation={"required|min:1|max:128"}
                    />

                    <p className="tab-informative-text">
                        Enter the username of the account for which you want to recover.
                        <br/>
                        A confirmation code will be sent to the email correlated to the account. 
                        <br/>
                        Use the confirmation code to reset your passsword.
                    </p>
                </>
            )
        }

        if(resetPwdTabSelected) {
            return (
                <>
                    <InputField 
                        ref={inputRefs.current[0]}
                        name="username"
                        label="Enter Username"
                        onChange={handleChange}
                        validation={"required|min:1|max:128"}
                    />

                    <InputField 
                        ref={inputRefs.current[1]}
                        name="confirmation code"
                        label="Enter Confirmation Code"
                        onChange={handleChange}
                    />

                    <InputField 
                        ref={inputRefs.current[2]}
                        name="new-password"
                        label="Enter New Password"
                        type="password"
                        onChange={handleChange}
                        validation={"required|min:8|max:99"}
                    />  

                    <InputField 
                        ref={inputRefs.current[3]}
                        name="confirm-new-password"
                        label="Confirm New Password"
                        type="password"
                        onChange={handleChange}
                        validation={"required|min:8|max:99"}
                    />

                    <p className="tab-informative-text">
                        Upon successfully reseting your password, you will be prompted to log in!
                    </p>
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

                <form onSubmit={submitForm}>
                    <Modal.Body>
                        {renderInputFields()}
                    </Modal.Body>
                    <Modal.Footer>
                        {renderModalFooterBtns()}
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}

export default ForgotResetPwdModal;