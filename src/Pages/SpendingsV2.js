import React, { useState} from 'react';
import styled from 'styled-components';
import { withRouter, useHistory } from 'react-router-dom';
//import SpendingsButton from '../Components/Spending/Button'; 
import Dropzone from '../Components/Dropzone/Dropzone';
import CreateSpending from '../Components/Cards/CreateSpending';
import Grid from '@material-ui/core/Grid';
import { ArrowBack } from '@material-ui/icons';
import {
  IconButton
} from '@material-ui/core';
import CreateSpendingModal from '../Components/Modals/CreateSpendingModal';

const Container = styled.div`
  margin-left: 35px;
  margin-right: 35px;
  margin-top: 80px;
  font-family: Roboto;
`;

function Spendings() {
  const history = useHistory();
  const [showMore, setShowMore] = useState(false);
  return (
    <div>
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={1}>
          <IconButton className="table-icon" onClick={() => history.push('/spendings')}>
            <ArrowBack />
          </IconButton>
        </Grid>
        <Grid item xs>
          <Dropzone />
        </Grid>
        <Grid item xs>
          <CreateSpending />
        </Grid>
      </Grid>
    </Container>
     <CreateSpendingModal
     closeMore={() => setShowMore(!showMore)} 
     openMore={showMore}
    />
   </div>
  );
}

export default withRouter(Spendings);