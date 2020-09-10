import './LandingPage.css';
import React from 'react';
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap';
import WalletSVG from '../Images/wallet.svg';

import FillFormsSVG from '../Images/fillforms.svg';
import FinanceSVG from '../Images/finance.svg';
import InvestSVG from '../Images/invest.svg';
import InvestingSVG from '../Images/investing.svg';

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
                    <div className="wave wave1"></div>
                    <div className="wave wave2"></div>
                    <div className="wave wave3"></div>
                    <div className="wave wave4"></div>
                </Container>
            </div>
            
            <div className="landing-page-2" id="landing-page-2">
                <div className="wave wave1"></div>
                <div className="wave wave2"></div>
                <div className="wave wave3"></div>
                <div className="wave wave4"></div>

                <div className="tabs-container">
                    <Tabs defaultActiveKey="FinTrack" id="landing-page-tabs" bsPrefix="tabs">
                        <Tab eventKey="FinTrack" title="FinTrack">
                            <div className="tab-info-container">
                                <p className="tab-info">
                                    With credit cards and advancing technology, spending money becomes easier and easier. 
                                    When paying with cash, people can visually see how much they are spending; on the other hand, 
                                    when paying with credit cards and advancing technology, people are not as aware of their spendings. 
                                    FinTrack is an application providing users with the ability to track their expenses.
                                </p>
                            </div>
                            <div className="tab-pic-container">
                                <img src={InvestSVG} alt="landing page img" className="landing-page-img"/>
                            </div>
                        </Tab>
                        <Tab eventKey="First Step" title="First Step">
                            <div className="tab-info-container">
                                <p className="tab-info">
                                    Create an account and sign in to get started on your FinTrack journey! 
                                </p>
                            </div>
                            <div className="tab-pic-container">
                                <img src={FillFormsSVG} alt="landing page img" className="landing-page-img"/>
                            </div>
                        </Tab>
                        <Tab eventKey="Next Step" title="Next Steps">
                            <div className="tab-info-container">
                                <p className="tab-info">
                                    Input your monthly and daily expenses. Analyze your spending habits and learn where to cut back. 
                                    Keep track of bills to make sure things are paid off on time. Accumulating debt and interest tends to not end out well!
                                </p>
                            </div>
                            <div className="tab-pic-container">
                                <img src={FinanceSVG} alt="landing page img" className="landing-page-img"/>
                            </div>
                        </Tab>
                        <Tab eventKey="Final Step" title="Final Step">
                            <div className="tab-info-container">
                                <p className="tab-info">
                                    Track your spending habits and make sure your bills are being paid off! 
                                    View how your spending habits vary over time, what your typical expenses are, and determine how you can save money.
                                </p>
                            </div>
                            <div className="tab-pic-container">
                                <img src={InvestingSVG} alt="landing page img" className="landing-page-img"/>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </>
    );
}

export default LandingPage;