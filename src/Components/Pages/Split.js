import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import SpendingsButton from '../Components/Spending/Button';
import SplitButton from '../Components/Split/Button';

const Container = styled.div`
  margin-left: 35px;
  margin-right: 35px;
  margin-top: 80px;
  font-family: Roboto;
`;

function Split() {
  return (
    <Container>
          <SplitButton />
    </Container>
  );
}

export default withRouter(Split);