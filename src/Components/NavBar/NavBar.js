import './NavBar.css';
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

function NavBar() {
    return (
        <Navbar sticky="top" collapseOnSelect expand="lg" variant="dark" className="navbar">
            <Navbar.Brand>
                <h1 className="navbar-brandname">FinTrack</h1>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" className="navbar-toggle"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link> Login </Nav.Link>
                    <Nav.Link> Register </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;