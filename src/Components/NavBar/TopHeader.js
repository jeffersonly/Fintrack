import React from 'react';
import styled from 'styled-components';
import { Auth } from 'aws-amplify';

const Header = styled.div`
  background-color: rgb(1, 114, 71);
  color: white;
  font-family: Roboto;
  height: 90px;
  position: fixed;
  text-align: center;
  top: 0;
  width: 100%;
  z-index: 100;
`;

const Title = styled.div`
  font-size: 30px;
  padding-top: 20px;
`;

function signOut() {
  Auth.signOut()
  .then(window.location = '/')
  .catch(err => console.log("Error signing out: ", err));
}

function TopHeader () {
  return (
    <Header>
      <Title>FinTrack</Title>
      <button onClick={signOut}>Log Out</button>
    </Header>
  );
}
  
  export default TopHeader;