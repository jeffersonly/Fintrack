import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './HomeNav.css';

function HomeNav () {

  const [color, setColor] = useState({sum: "rgb(1, 114, 71)", spend: "black", save: "black", split: "black", acc: "black"});

  //doesn't work when you use browser to navigate back and forth
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
      <div className="homepage-nav-bar">
        <div className="homepage-tab-container">
          <Button 
            className="homepage-nav-bar-button homepage-nav-bar-button-top"
            component={Link}
            to={"/summary"}
            onClick={() => handleClick("sum")}
            style={{color: color["sum"]}}
            size="large"
          >
            Summary
          </Button>
          <Button 
            className="homepage-nav-bar-button homepage-nav-bar-button-top"
            component={Link}
            to={"/spendings"}
            onClick={() => handleClick("spend")}
            style={{color: color["spend"]}}
            size="large"
          >
            Spendings
          </Button>
          <Button 
            className="homepage-nav-bar-button homepage-nav-bar-button-top"
            component={Link}
            to={"/savings"}
            onClick={() => handleClick("save")}
            style={{color: color["save"]}}
            size="large"
          >
            Savings
          </Button>
          <Button 
            className="homepage-nav-bar-button homepage-nav-bar-button-bottom"
            component={Link}
            to={"/split"}
            onClick={() => handleClick("split")}
            style={{color: color["split"]}}
            size="large"
          >
            Split the Bill
          </Button>
          <Button 
            className="homepage-nav-bar-button homepage-nav-bar-button-bottom"
            component={Link}
            to={"/account"}
            onClick={() => handleClick("acc")}
            style={{color: color["acc"]}}
            size="large"
          >
            Account
          </Button>
        </div>
      </div>
      <hr className="homepage-divider" />
    </div>
  );
}

export default HomeNav;