import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { generate } from 'shortid';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import QuickTransaction from '../Components/Cards/QuickTransaction';
import TransactionTable from '../Components/Tables/TransactionTable'; 
import MonthlyExpenses from '../Components/Tables/MonthlyExpenses'; 
import './Summary.css';

function Summary () {

  const getTodayDate = () => {
    const today = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    const date = monthNames[(today.getMonth())] + " " + today.getDate() + ", " + today.getFullYear();
    return date;
  }

  const [rows, setRows] = useState([
    {
      id: "1",
      date: "9/24/2020",
      transaction: "birthday gift",
      pay: "Credit",
      amount: "30"
    },
    {
      id: "2",
      date: "10/23/2020",
      transaction: "test",
      pay: "Cash",
      amount: "5"
    },
    {
      id: "3",
      date: "11/10/2020",
      transaction: "test2",
      pay: "Debit",
      amount: "10"
    },
    {
      id: "4",
      date: "1/15/2021",
      transaction: "test3",
      pay: "Credit",
      amount: "20"
    }
  ]);

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
          <MonthlyExpenses rows={[
            {
              id: generate(),
              date: "9/30/20",
              expense: "Rent",
              value: "600"
            },
          ]}/>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <QuickTransaction 
            onSubmit={data => {
              setRows(currentRows => [
                {
                  id: generate(),
                  date: data[0],
                  transaction: data[1],
                  pay: data[3].charAt(0).toUpperCase() + data[3].slice(1),
                  amount: data[2]
                },
                ...currentRows
              ]);
            }}
          />
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={8}>
          <TransactionTable rows={rows}/>
        </Grid>
      </Grid>
    </div>
  );
}
 
export default withRouter(Summary);