import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, withStyles } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Summary from '../../Pages/Summary';
import Spendings from '../../Pages/Spendings';
import Expenses from '../../Pages/Expenses';
import Transactions from '../../Pages/Transactions';
import Savings from '../../Pages/Savings';

const TabContainer = styled.div`
  display: flex;
  justify-content: space-around;
  position: fixed;
  width: 100%;
  background-color: white;
  z-index: 1;
  height: 55px;
`;

const Divider = styled.hr`
  height: 3px;
  background-color: rgb(1, 114, 71);
  border-style: none;
  margin-top: 40px;
  position: fixed;
  width: 100%;
  z-index: 1;
`;

const NavTab = styled.div`
  padding-top: 90px;
  padding-bottom: 15px;
  text-align: center;
  background-color: white;
  font-size: 15px;
  cursor: pointer;
  font-weight: bold;
`;

const FixedMenu = styled.div`
position: fixed;
top: 0;
width: 100%;
`;

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "rgb(1, 114, 71)",
    },
  },
});

const styles = ({ theme }) => ({
  default: {
    '&:hover': {
      color: "rgb(1, 114, 71)",
      backgroundColor: "white",
    },
  },
});

function NavBar({ classes, ...props }) {

  const [color, setColor] = useState({ sum: "rgb(1, 114, 71)", spend: "black", save: "black", split: "black", acc: "black" });

  //doesn't work when you use browser to navigate back and forth
  //also need to fix hover
  const handleClick = (pg) => {
    var obj = {
      "sum": "black",
      "spend": "black",
      "save": "black",
      "split": "black",
      "acc": "black"
    }
    for (var btn in obj) {
      if (pg === btn) {
        obj[pg] = "rgb(1, 114, 71)";
      }
    }
    setColor(obj);
  }

  return (
    <div>
      <Router>
        <div>
          <ThemeProvider theme={theme}>
            <NavTab>
              <TabContainer>
                <Button
                  className={classes.default}
                  component={Link}
                  to={"/summary"}
                  onClick={() => handleClick("sum")}
                  style={{ color: color["sum"] }}
                  size="large"
                >
                  Summary
                </Button>
                <Button
                  className={classes.default}
                  component={Link}
                  to={"/spendings"}
                  onClick={() => handleClick("spend")}
                  style={{ color: color["spend"] }}
                  size="large"
                >
                  Spendings
                </Button>
                <Button
                  className={classes.default}
                  component={Link}
                  to={"/savings"}
                  onClick={() => handleClick("save")}
                  style={{ color: color["save"] }}
                  size="large"
                >
                  Savings
                </Button>
                <Button
                  className={classes.default}
                  component={Link}
                  to={"/split"}
                  onClick={() => handleClick("split")}
                  style={{ color: color["split"] }}
                  size="large"
                >
                  Split the Bill
                </Button>
                <Button
                  className={classes.default}
                  component={Link}
                  to={"/account"}
                  onClick={() => handleClick("acc")}
                  style={{ color: color["acc"] }}
                  size="large"
                >
                  Account
                </Button>
              </TabContainer>
            </NavTab>
          </ThemeProvider>
          <Divider />
          <Switch>
            <Route exact path="/summary">
              <Summary />
            </Route>
            <Route path="/transactions">
              <Transactions />
            </Route>
            <Route path="/expenses">
              <Expenses />
            </Route>
            <Route path="/spendings">
              <Spendings />
            </Route>
            <Route path="/savings">
              <Savings />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default withStyles(styles)(NavBar);