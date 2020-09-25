import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import CreateTransaction from '../Components/Spending/CreateTransaction';
import {
  Button, makeStyles, TextField
} from '@material-ui/core';
import { withRouter, useHistory } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import TransactionTableS from '../Components/Spending/TransactionTableS'; 

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
  let searchIcon=<SearchIcon />;
  let submitIcon=<Button
                  className={classes.create}
                  variant="contained"
                  disableElevation
                  size="large"
                  style={{fontSize: "12px"}}
                >
                  SEARCH
                </Button>
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Button
            className={classes.back}
            onClick={() => history.push('/spendings')}
            variant="contained"
            disableElevation
            size="large"
            style={{ width: "100%", fontSize: "16px", marginBottom: "20px" }}
          >
            ← Back
          </Button>
        </Grid>
        <Grid item xs={7}>
          <TextField
              className={classes.textfield}
              variant="outlined"
              placeholder="Search"
              fullWidth
              InputLabelProps={{shrink: true,}}
              InputProps={{startAdornment: searchIcon, endAdornment: submitIcon}}
            />
            <TransactionTableS />
        </Grid>
        <Grid item xs>
          <CreateTransaction />
        </Grid>
      </Grid>
    </Container>
  );
}

export default withRouter(Transactions);