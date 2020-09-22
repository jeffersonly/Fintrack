import React from 'react';
import styled from 'styled-components';


import { BrowserRouter as Router, Link, Route, Switch, withRouter } from 'react-router-dom';
import SpendingsButton from '../Components/Spending/Button'; 

const Container = styled.div`
  margin-left: 35px;
  margin-right: 35px;
  margin-top: 80px;
  font-family: Roboto;
`;

function Spendings() {
  return (
    <Container>
          <SpendingsButton />
    </Container>
  );
}

export default withRouter(Spendings);