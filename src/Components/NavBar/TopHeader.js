import React from 'react';
import styled from 'styled-components';

const Header = styled.div`
  background-color: rgb(1, 114, 71);
  position: fixed;
  width: 100%;
  height: 90px;
  text-align: center;
  color: white;
  font-family: Roboto;
  top: 0;
  z-index: 1;
`;

const Title = styled.div`
  font-size: 30px;
  padding-top: 20px;
`;

function TopHeader () {
  return (
    <Header>
      <Title>FinTrack</Title>
    </Header>
  );
}
  
  export default TopHeader;