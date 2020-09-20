import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
 
const Container = styled.div`
  margin-left: 35px;
  margin-right: 35px;
  margin-top: 80px;
  font-family: Roboto;
`;

function Spendings () {
  return (
    <Container>
      <h1>Spendings</h1>
    </Container>
  );
}
 
export default withRouter(Spendings);