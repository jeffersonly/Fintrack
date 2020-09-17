import React from 'react';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import QuickTransaction from '../Components/HomePage/QuickTransaction';
import TransactionTable from '../Components/HomePage/TransactionTable'; 
import './Summary.css';

function Summary () {

  const getTodayDate = () => {
    const today = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    const date = monthNames[(today.getMonth())] + " " + today.getDate() + ", " + today.getFullYear();
    return date;
  }

  return (
    <div className="homepage">
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <h2 className="homepage-welcome">Welcome User!</h2>
          <h5 className="homepage-todaydate">Today: {getTodayDate()}</h5>
          <div className="homepage-cal DayPicker">
            <DayPicker
              showOutsideDays
              todayButton="Go to Today"
            />
          </div>
        </Grid>
        <Grid item xs={1} />
        <Grid item xs= {3}>
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={3}>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <QuickTransaction />
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={8}>
          <TransactionTable />
        </Grid>
      </Grid>
    </div>
  );
}
 
export default withRouter(Summary);