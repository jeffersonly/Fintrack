import React, {useState} from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import {
  IconButton, makeStyles
} from '@material-ui/core';
import { withRouter, useHistory } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import TransactionTableS from '../Components/Spending/TransactionTableS'; 
import { Create } from '@material-ui/icons';
import CreateSpendingModal from '../Components/Modals/CreateSpendingModal';
//import Dropzone from '../Components/Dropzone/Dropzone';
//import CreateTransaction from '../Components/Spending/CreateTransaction';

const Container = styled.div`
  margin-left: 35px;
  margin-right: 35px;
  margin-top: 80px;
  font-family: Roboto;
`;

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "rgb(1, 114, 71)",
    }
  },
});

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    width: "100%",
    marginBottom: "20px",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  create: {
    backgroundColor: "#ace1af",
    '&:hover': {
      backgroundColor: "#ace1af",
      opacity: 0.8
    },
  }
});


function Transactions() {
  const classes = useStyles();
  const history = useHistory();
  const [showMore, setShowMore] = useState(false);
  return (
    <div>
    <Container>
      <Grid container spacing={3}>
        <Grid item xs = {1}>
          <IconButton className="table-icon" onClick={() => setShowMore(true) /*history.push('/spendings')*/}>
            <Create />
          </IconButton>
        </Grid>
        <Grid item xs>
            <TransactionTableS />
        </Grid>
        {/* 
        <Grid item xs>
          <Dropzone />
          <CreateTransaction />
        </Grid>
        */}
      </Grid>
    </Container>
    <CreateSpendingModal
    closeMore={() => setShowMore(!showMore)} 
    openMore={showMore}
   />
   </div>
  );
}

export default withRouter(Transactions);