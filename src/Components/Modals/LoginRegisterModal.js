import './AuthModal.css';
import React, {useState, useEffect} from 'react';
import { Auth } from 'aws-amplify';
import { Modal } from 'react-bootstrap';
import InputField from '../InputFields/InputField';

function LoginRegisterModal(props) {
    //modal related states
    const [show, setShow] = useState(props.openModal);
    const [loginTabSelected, setLoginTabSelected] = useState(props.loginModalShown);
    const [registerTabSelected, setRegisterTabSelected] = useState(props.registerModalShown);
    const [confirmAccountTabSelected, setConfirmAcountTabSelected] = useState(props.confirmAccountModalShown);
    const [resetConfirmCodeTabSelected, setResetConfirmCodeTabSelected] = useState(props.resendConfirmCodeModalShown);

    //Handle Modal Events 
    function closeModal() {
        clearForm();
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

    function openResendConfirmCodeModal() {
        clearForm();
        props.onSelectResendConfirmCodeModal();
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
        setResetConfirmCodeTabSelected(props.resendConfirmCodeModalShown);
    }, [props.openModal, props.loginModalShown, props.registerModalShown, props.confirmAccountModalShown, props.resendConfirmCodeModalShown]);

    //Handle Input Data
    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
        confirmpassword: "",
        confirmationcode: ""
    });
    const [passwordErrorShown, setPasswordErrorShown] = useState(false);
    const [authError, setAuthError] = useState("");

    //generate react refs for input fields based on tab selected
    function generateReactRefs() {
        if(loginTabSelected || confirmAccountTabSelected) {
            return [React.createRef(), React.createRef()];
        }

        if(resetConfirmCodeTabSelected) {
            return [React.createRef()];
        }

        return [React.createRef(), React.createRef(), React.createRef(), React.createRef()];
    }

    //inputref needed for each input to reference it
    const inputRefs = React.useRef(generateReactRefs());

    //update data hook with input data
    const handleChange = (name, value) => {
        setData(prevData => ({...prevData, [name]: value}));
        setPasswordErrorShown(false);
        setAuthError("");
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
            //log in user
            Auth.signIn(data.username, data.password)
            .then(res => window.location = "/summary")
            .catch(err => setAuthError(err.message));
        }

        if(registerTabSelected) {
            //check if passwords match, if they don't show error message
            if(data.password !== data.confirmpassword) {
                //display error
                setPasswordErrorShown(true);
                return;
            }

            //sign up user
            Auth.signUp(data.username, data.password, data.email)
            .then(res => openConfirmAccountModal())
            .catch(err => setAuthError(err.message));
        }

        if(confirmAccountTabSelected) {
            //confirm user registration
            Auth.confirmSignUp(data.username, data.confirmationcode)
            .then(res => openLoginModal())
            .catch(err => setAuthError(err.message));
        }

        if(resetConfirmCodeTabSelected) {
            //send new confirm code to user
            Auth.resendSignUp(data.username)
            .then(res => openConfirmAccountModal())
            .catch(err => setAuthError(err.message));
        }
    }

    //clears data & values from forms
    function clearForm() {
        for(let i = 0; i < inputRefs.current.length; i++) {
            if(inputRefs.current[i].current === null) { break; }
            inputRefs.current[i].current.clearValue();
        }
        setData({});
        setAuthError("");
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
                    <button className="modal-link-btn" type="button" onClick={openResendConfirmCodeModal}>Resend Code</button>
                    <button className="modal-action-btn" type="submit">Confirm</button>
                </>
            )
        }

        if(resetConfirmCodeTabSelected) {
            return(
                <>
                    <button className="modal-link-btn" type="button" onClick={openConfirmAccountModal}>Back</button>
                    <button className="modal-action-btn" type="submit">Send</button>
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
                    {passwordErrorShown && (
                        <p className="input-error-msg"  style={{marginTop: '-30px'}}>Passwords do not match.</p>
                    )}

                    <InputField 
                        ref={inputRefs.current[3]}
                        name="confirmpassword"
                        label="Confirm Password"
                        type="password"
                        onChange={handleChange}
                        validation={"required|min:8|max:99"}
                    />  
                    {passwordErrorShown && (
                        <p className="input-error-msg" style={{marginTop: '-30px'}}>Passwords do not match.</p>
                    )}

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
                        name="confirmationcode"
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

        if(resetConfirmCodeTabSelected) {
            return(
                <>
                    <InputField 
                        ref={inputRefs.current[0]}
                        name="username"
                        label="Enter Username"
                        onChange={handleChange}
                        validation={"required|min:1|max:128"}
                    />

                    <p className="tab-informative-text">
                        Send a new confirmation code to the email that you registered with!
                        <br/>
                        A new confirmation code will be sent to your email.
                        <br/>
                        You can use the new code to confirm your account.
                    </p>
                </>
            )
        }

        return null;
    }

    //renders header button tabs
    function renderHeaderButtons() {
        if(resetConfirmCodeTabSelected) {
            return (
                <>
                    <button 
                        className={`tab-title-btn ${resetConfirmCodeTabSelected ? 'selected':'notSelected'}`}
                        onClick={openResendConfirmCodeModal}
                    >
                        <span>Resend Confirmation Code</span>
                    </button>
                </>
            )
        }

        return (
            <>
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
            </>
        )
    }

    return (
        <>
            <Modal show={show} onHide={closeModal}>
                
                <Modal.Header closeButton className="auth-modal-header">
                    {renderHeaderButtons()}
                </Modal.Header>

                <form id="auth-form" onSubmit={submitForm}>
                    <Modal.Body>
                        {authError && (
                            <p className="error-msg">{authError}</p>
                        )}
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