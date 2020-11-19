import React from 'react';
import BoldLogo from '../../Images/boldlogo.svg';
import './TopHeader.css';

function TopHeader () {
  return (
    <div className="topheader">
      <img src={BoldLogo} align="center" alt="logo" className="topheader-logo"/>
    </div>
  );
}
  
export default TopHeader;