import React from 'react';
import WhiteLogo from '../../Images/whitelogo.svg';
//import BoldLogo from '../../Images/boldlogo.svg';
import './TopHeader.css';

function TopHeader () {
  return (
    <div className="topheader">
      <img src={WhiteLogo} align="center" alt="logo" className="topheader-logo"/>
    </div>
  );
}
  
export default TopHeader;