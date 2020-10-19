import React from 'react';
import CreateSaving from '../Components/Saving/CreateSaving';
import { Button, Grid, makeStyles, TextField } from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import SavingTableS from '../Components/Saving/SavingTableS'; 

const useStyles = makeStyles({
  container: {
    marginLeft: "35px",
    marginRight: "35px",
    marginTop: "80px",
    fontFamily: "Roboto"
  },
  createbutton: {
    backgroundColor: "#ace1af",
    fontSize: "12px",
    '&:focus': {
      outline: "none"
    },
    '&:hover': {
      backgroundColor: "#ace1af",
      opacity: 0.8
    },
  },
  textfield: {
    paddingBottom: "30px"
  }
});

function Savings() {
  const classes = useStyles();
  let searchIcon= <SearchIcon />;
  let submitIcon= <Button
                    className={classes.createbutton}
                    variant="contained"
                    disableElevation
                    size="large"
                  >
                    SEARCH
                  </Button>

  return (
    <div className={classes.container}>
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
    </div>
  );
}

export default withRouter(Savings);