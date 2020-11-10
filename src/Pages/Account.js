import React, { useState } from 'react';
import { Button, Divider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Row, Col } from 'react-bootstrap';
import { Auth } from 'aws-amplify';
import './Account.css';
import Profile from '../Components/Cards/Profile';
import Goals from '../Components/Cards/Goals';
import { Navbar, Nav } from 'react-bootstrap';

const theme = createMuiTheme ({
  palette: {
    secondary: {
      main: "#ff0000",
    }
  }
})

function Account() {

  const [background, setBackground] = useState({prof: "#f5f5f5", goal: "", split: ""});
  const [page, setPage] = useState({prof: true, goal: false, split: false});
  const [expanded, setExpanded] = useState(false);

  const handleClick = (pg) => {
    var back = {
      "prof": "",
      "goal": "",
      "split": ""
    }
    var page = {
      "prof": false,
      "goal": false,
      "split": false
    }
    for (var btn in back) {
      if (pg === btn) {
        back[pg] = "#f5f5f5";
        page[pg] = true;
      }
    }
    setBackground(back);
    setPage(page);
  }

  function signOut() {
    Auth.signOut()
    .then(window.location = '/')
    .catch(err => console.log("Error signing out: ", err));

    sessionStorage.clear();
  }

  function getCard() {
    if (page["prof"] === true) {
      return (
        <Profile />
      )
    }
    if (page["goal"] === true) {
      return (
        <Goals />
      )
    }
  }
  
  return (
    <div className="account">
      <Row>
        <Col xs={3} md={2} className="account-left-panel">
          <Navbar className="account-navbar" collapseOnSelect expand="lg" expanded={expanded}>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")}/>
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="flex-column account-nav">
                <ThemeProvider theme={theme}>
                  <div>
                    <b className="account-section">USER SETTINGS</b>
                  </div>
                  <Button 
                    className="account-button-top account-button-bottom" 
                    fullWidth
                    onClick={() => {
                      handleClick("prof");
                      setExpanded(false);
                    }}
                    style={{backgroundColor: background["prof"], outline: "none"}}
                  >
                    Profile
                  </Button>
                  <Divider />
                  <div className="account-section-pad">
                    <b className="account-section">APP SETTINGS</b>
                  </div>
                  <Button 
                    className="account-button-top account-button-bottom"
                    fullWidth
                    onClick={() => {
                      handleClick("goal");
                      setExpanded(false);
                    }}
                    style={{backgroundColor: background["goal"], outline: "none"}}
                  >
                    Goals
                  </Button>
                  <Divider />
                  <div className="account-section-pad">
                    <b className="account-section">HISTORY</b>
                  </div>
                  <Button 
                    className="account-button-bottom"
                    fullWidth
                    onClick={() => {
                      handleClick("split");
                      setExpanded(false);
                    }}
                    style={{backgroundColor: background["split"], outline: "none"}}
                  >
                    Bill Splits
                  </Button>
                  <Divider />
                  <Button 
                    className="account-logout" 
                    color="secondary"
                    fullWidth 
                    onClick={signOut}
                    style={{outline: "none"}}
                  >
                    Logout
                  </Button>
                </ThemeProvider>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Col>
        <Col xs={1} md={1} className="account-left-panel account-divider">
          <Divider className="d-none d-lg-block" orientation="vertical"/>
        </Col>
        <Col xs={8} md={9} className="account-right-panel" >
          {getCard()}
        </Col>
      </Row>
    </div>
  );
}

export default Account;