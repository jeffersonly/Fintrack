import './AuthModal.css';
import React, {useState, useEffect} from 'react';
import { Modal } from 'react-bootstrap';
import InputField from '../InputFields/InputField';

function LoginRegisterModal(props) {
    //modal related states
    const [show, setShow] = useState(props.openModal);
    const [loginTabSelected, setLoginTabSelected] = useState(props.loginModalShown);
    const [registerTabSelected, setRegisterTabSelected] = useState(props.registerModalShown);
    const [confirmAccountTabSelected, setConfirmAcountTabSelected] = useState(props.confirmAccountModalShown);

    //Handle Modal Events 
    function closeModal() {
        clearForm()
        props.onChangeModalState();
    }

    function openLoginModal() {
        clearForm();
        props.onSelectLoginModal();
    }

    function openRegisterModal() {
        clearForm();
        props.onSelectRegisterModal();
    }

    function openConfirmAccountModal() {
        clearForm();
        props.onSelectConfirmAccountModal();
    }

    function openForgotResetPwdModal() {
        clearForm();
        props.onOpenForgetResetPwdModal();
    }

    useEffect(() => {
        setShow(props.openModal);
        setLoginTabSelected(props.loginModalShown);
        setRegisterTabSelected(props.registerModalShown)
        setConfirmAcountTabSelected(props.confirmAccountModalShown);
    }, [props.openModal, props.loginModalShown, props.registerModalShown, props.confirmAccountModalShown]);

    //Handle Input Data
    const [data, setData] = React.useState({});

    //generate react refs for input fields based on tab selected
    function generateReactRefs() {
        if(loginTabSelected || confirmAccountTabSelected) {
            return [React.createRef(), React.createRef()];
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
        if(loginTabSelected) {
            console.log("Login Activated");
        }

        if(registerTabSelected) {
            console.log("Register Activated");
        }

        if(confirmAccountTabSelected) {
            console.log("Confirm Account Activated");
        }

        console.log(data);
    }

    //clears data & values from forms
    function clearForm() {
        for(let i = 0; i < inputRefs.current.length; i++) {
            if(inputRefs.current[i].current === null) { break; }
            inputRefs.current[i].current.clearValue();
        }
        setData({});
    }

    //renders footer buttons that connect modals and do auth actions
    function renderModalFooterBtns() {
        if(loginTabSelected) {
            return (
                <>
                    <button className="modal-link-btn" type="button" onClick={openForgotResetPwdModal}>Forgot Password</button>
                    <button className="modal-action-btn" type="submit">Login</button>
                </>
            )
        }

        if(registerTabSelected) {
            return(
                <>
                    <button className="modal-action-btn" type="submit">Register</button>
                </>
            )
        }

        if(confirmAccountTabSelected) {
            return(
                <>
                    <button className="modal-action-btn" type="submit">Confirm</button>
                </>
            )
        }

        return null;
    }

    //renders input fields based on modal selected
    function renderInputFields() {
        if(loginTabSelected) {
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
                        name="password"
                        label="Enter Password"
                        type="password"
                        onChange={handleChange}
                        validation={"required|min:8|max:99"}
                    />
                </>
            )
        }

        if(registerTabSelected) {
            return(
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
                        name="email"
                        label="Enter Email"
                        onChange={handleChange}
                        validation={"required|email"}
                    />

                    <InputField 
                        ref={inputRefs.current[2]}
                        name="password"
                        label="Enter Password"
                        type="password"
                        onChange={handleChange}
                        validation={"required|min:8|max:99"}
                    />  

                    <InputField 
                        ref={inputRefs.current[3]}
                        name="confirm-password"
                        label="Confirm Password"
                        type="password"
                        onChange={handleChange}
                        validation={"required|min:8|max:99"}
                    />  

                    <p className="tab-informative-text">
                        Upon registering a confirmation code will be sent to your email. 
                        <br/>
                        The confirmation code is valid for 24 hours. 
                        <br/>
                        Use the code to confirm your account registration!
                    </p>
                </>
            )
        }

        if(confirmAccountTabSelected) {
            return(
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
                        validation={"required"}
                    />

                    <p className="tab-informative-text">
                        Confirm your account here after registering.
                        <br/>
                        After confirming your account you will be logged in!
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

                <form id="auth-form" onSubmit={submitForm}>
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

export default LoginRegisterModal;