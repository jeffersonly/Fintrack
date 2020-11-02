import React from 'react';
import { Grid, makeStyles} from '@material-ui/core';
import { withRouter } from 'react-router-dom';

import CreateSaving from '../Components/Cards/CreateSaving';
import SavingTable from '../Components/Tables/SavingTable';

const useStyles = makeStyles({
  container: {
    marginLeft: "35px",
    marginRight: "35px",
    marginTop: "80px",
    fontFamily: "Roboto"
  }
});

function Savings() {

  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs>
          <SavingTable />
        </Grid>
        <Grid item xs={3}>
          <CreateSaving />
        </Grid>
      </Grid>
    </div>
  );
}

export default withRouter(Savings);