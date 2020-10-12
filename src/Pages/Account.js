import React, { useState } from 'react';
import { Button, Divider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Row, Col } from 'react-bootstrap';
import { Auth } from 'aws-amplify';
import './Account.css';
import Profile from '../Components/Cards/Profile';
import Receipts from '../Components/Cards/Receipts';

const theme = createMuiTheme ({
  palette: {
    secondary: {
      main: "#ff0000",
    }
  }
})

function Account() {

  const [background, setBackground] = useState({prof: "#f5f5f5", notif: "", receipt: "", split: ""});
  const [page, setPage] = useState({prof: true, notif: false, receipt: false, split: false})

  const handleClick = (pg) => {
    var back = {
      "prof": "",
      "notif": "",
      "receipt": "",
      "split": ""
    }
    var page = {
      "prof": false,
      "notif": false,
      "receipt": false,
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
  }

  function getCard() {
    if (page["prof"] === true) {
      return (
        <Profile />
      )
    }
    if (page["receipt"] === true) {
      return (
        <Receipts />
      )
    }
  }
  
  return (
    <div className="account">
      <Row>
        <Col xs={3} md={2} className="account-left-panel">
          <ThemeProvider theme={theme}>
            <div>
              <b className="account-section">USER SETTINGS</b>
            </div>
            <Button 
              className="account-button-top account-button-bottom" 
              fullWidth
              onClick={() => handleClick("prof")}
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
              onClick={() => handleClick("notif")}
              style={{backgroundColor: background["notif"], outline: "none"}}
            >
              Notifications
            </Button>
            <Divider />
            <div className="account-section-pad">
              <b className="account-section">HISTORY</b>
            </div>
            <Button 
              className="account-button-top"
              fullWidth
              onClick={() => handleClick("receipt")}
              style={{backgroundColor: background["receipt"], outline: "none"}}
            >
              Receipts
            </Button>
            <Button 
              className="account-button-bottom"
              fullWidth
              onClick={() => handleClick("split")}
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
        </Col>
        <Col xs={1} md={1} className="account-left-panel">
          <Divider orientation="vertical"/>
        </Col>
        <Col xs={8} md={9} className="account-right-panel" >
          {getCard()}
        </Col>
      </Row>
    </div>
  );
}

export default Account;