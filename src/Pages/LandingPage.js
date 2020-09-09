import './LandingPage.css';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import WalletSVG from '../Images/wallet.svg';

function LandingPage() {
    return (
        <>
            <div className="landing-page-1">
                <Container >
                    <Row>
                        <Col sm={6}>
                            <div className="landing-page-text-container">
                                <h1 className="landing-header-text">FinTrack</h1>
                                <h2 className="landing-text">Track Your Expenses</h2>
                                <a className="landing-btn" href="#landing-page-2">Get Started</a>
                            </div>
                            
                        </Col>
                        <Col sm={6}>
                            <img src={WalletSVG} alt="landing page img" className="landing-page-img"/>
                        </Col>
                    </Row>
                    <div class="wave wave1"></div>
                    <div class="wave wave2"></div>
                    <div class="wave wave3"></div>
                    <div class="wave wave4"></div>
                </Container>
            </div>
            
            <div className="landing-page-2" id="landing-page-2">
                <div class="wave wave1"></div>
                <div class="wave wave2"></div>
                <div class="wave wave3"></div>
                <div class="wave wave4"></div>
            </div>
        </>
    );
}

export default LandingPage;