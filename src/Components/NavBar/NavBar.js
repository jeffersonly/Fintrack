import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import LoginRegisterModal from '../Modals/LoginRegisterModal';
import ForgotResetPwdModal from '../Modals/ForgotResetPwdModal';
import './NavBar.css';

function NavBar(props) {

  const [showLoginRegisterModal, setShowLoginRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showConfirmAccountModal, setConfirmAccountModal] = useState(false);
  const [showResendConfirmCodeModal, setResendConfirmCodeModal] = useState(false);

  const [showForgotResetPwdModal, setShowForgetResetPwdModal] = useState(false);
  const [showForgotPwdModal, setShowForgotPwdModal] = useState(false);
  const [showResetPwdModal, setShowResetPwdModal] = useState(false);

  function handleShowLoginModal() {
    setShowLoginRegisterModal(true);
    setShowLoginModal(true);
    setShowRegisterModal(false);
    setConfirmAccountModal(false);
    setResendConfirmCodeModal(false);

    setShowForgetResetPwdModal(false);
    setShowForgotPwdModal(false);
    setShowResetPwdModal(false);
  }

  function handleShowRegisterModal() {
    setShowLoginRegisterModal(true);
    setShowLoginModal(false);
    setShowRegisterModal(true);
    setConfirmAccountModal(false);
    setResendConfirmCodeModal(false);

    setShowForgetResetPwdModal(false);
    setShowForgotPwdModal(false);
    setShowResetPwdModal(false);
  }

  function handleShowConfirmAccountModal() {
    setShowLoginRegisterModal(true);
    setShowLoginModal(false);
    setShowRegisterModal(false);
    setConfirmAccountModal(true);
    setResendConfirmCodeModal(false);

    setShowForgetResetPwdModal(false);
    setShowForgotPwdModal(false);
    setShowResetPwdModal(false);
  }

  function handleShowResendConfirmCodeModal() {
    setShowLoginRegisterModal(true);
    setShowLoginModal(false);
    setShowRegisterModal(false);
    setConfirmAccountModal(false);
    setResendConfirmCodeModal(true);

    setShowForgetResetPwdModal(false);
    setShowForgotPwdModal(false);
    setShowResetPwdModal(false);
  }

  function handleShowForgotPwdModal() {
    setShowLoginRegisterModal(false);
    setShowLoginModal(false);
    setShowRegisterModal(false);
    setConfirmAccountModal(false);
    setResendConfirmCodeModal(false);

    setShowForgetResetPwdModal(true);
    setShowForgotPwdModal(true);
    setShowResetPwdModal(false);
  }

  function handleShowResetPwdModal() {
    setShowLoginRegisterModal(false);
    setShowLoginModal(false);
    setShowRegisterModal(false);
    setConfirmAccountModal(false);
    setResendConfirmCodeModal(false);

    setShowForgetResetPwdModal(true);
    setShowForgotPwdModal(false);
    setShowResetPwdModal(true);
  }

  useEffect(() => {
    if (props.openLoginModal) {
      handleShowLoginModal();
    }
  }, [props.openLoginModal]);

  return (
    <Navbar sticky="top" collapseOnSelect expand="lg" variant="dark" className="app-navbar">
      {/* Nav Bar Items */}
      <Navbar.Brand>
        <h1 className="navbar-brandname">FinTrack</h1>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" className="navbar-toggle"/>
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link onClick={handleShowLoginModal}> Login </Nav.Link>
          <Nav.Link onClick={handleShowRegisterModal}> Register </Nav.Link>
        </Nav>
      </Navbar.Collapse>

      {/* Modals */}
      <LoginRegisterModal 
        openModal={showLoginRegisterModal}
        onChangeModalState={() => setShowLoginRegisterModal(!showLoginRegisterModal)}
        loginModalShown={showLoginModal}
        onSelectLoginModal={() => handleShowLoginModal()}
        registerModalShown={showRegisterModal}
        onSelectRegisterModal={() => handleShowRegisterModal()}
        confirmAccountModalShown={showConfirmAccountModal}
        onSelectConfirmAccountModal={() => handleShowConfirmAccountModal()}
        resendConfirmCodeModalShown={showResendConfirmCodeModal}
        onSelectResendConfirmCodeModal={() => handleShowResendConfirmCodeModal()}
        onOpenForgetResetPwdModal={() => handleShowForgotPwdModal()}
      />

      <ForgotResetPwdModal 
        openModal={showForgotResetPwdModal}
        onChangeModalState={() => setShowForgetResetPwdModal(!showForgotResetPwdModal)}
        forgotPwdModalShown={showForgotPwdModal}
        onSelectForgotPwdModal={() => handleShowForgotPwdModal()}
        resetPwdModalShown={showResetPwdModal}
        onSelectResetPwdModal={() => handleShowResetPwdModal()}
        onOpenLoginRegisterModal={() => handleShowLoginModal()}
      />
    </Navbar>
  );
}

export default NavBar;