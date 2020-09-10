import './NavBar.css';
import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import LoginRegisterModal from '../Modals/LoginRegisterModal';

function NavBar() {
    const [showLoginRegisterModal, setShowLoginRegisterModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showConfirmAccountModal, setConfirmAccountModal] = useState(false);

    function handleShowLoginModal() {
        setShowLoginRegisterModal(true);
        setShowLoginModal(true);
        setShowRegisterModal(false);
        setConfirmAccountModal(false);
    }

    function handleShowRegisterModal() {
        setShowLoginRegisterModal(true);
        setShowLoginModal(false);
        setShowRegisterModal(true);
        setConfirmAccountModal(false);
    }

    function handleShowConfirmAccountModal() {
        setShowLoginRegisterModal(true);
        setShowLoginModal(false);
        setShowRegisterModal(false);
        setConfirmAccountModal(true);
    }

    return (
        <Navbar sticky="top" collapseOnSelect expand="lg" variant="dark" className="navbar">
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
            />
        </Navbar>
    );
}

export default NavBar;