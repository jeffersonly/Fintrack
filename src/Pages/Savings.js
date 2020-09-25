import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import CreateSaving from '../Components/Saving/CreateSaving';
import {
  Button, makeStyles, TextField 
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import SavingTableS from '../Components/Saving/SavingTableS'; 

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


function Savings() {
  const classes = useStyles();

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
            <SavingTableS />
        </Grid>
        <Grid item xs>
          <CreateSaving />
        </Grid>
      </Grid>
    </Container>
  );
}

export default withRouter(Savings);